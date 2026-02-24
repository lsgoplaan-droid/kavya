import { useState, useCallback } from 'react';
import { translateText, translateImage } from '../services/claudeService';
import { addHistory } from '../storage/historyStore';
import { getApiKey } from '../storage/apiKeyStore';
import type { TranslationResult, InputMethod } from '../types';

interface TranslationState {
  result: TranslationResult | null;
  isLoading: boolean;
  error: string | null;
}

function getErrorMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'status' in err && err.status === 401) {
    return 'Invalid API key. Please update it in Settings.';
  }
  if (err instanceof Error) return err.message;
  return 'Translation failed. Please try again.';
}

export function useTranslation() {
  const [state, setState] = useState<TranslationState>({
    result: null,
    isLoading: false,
    error: null,
  });

  const translate = useCallback(
    async (text: string, inputMethod: InputMethod = 'type') => {
      const apiKey = await getApiKey();
      if (!apiKey) {
        setState((s) => ({ ...s, error: 'API key not set. Go to Settings.' }));
        return;
      }
      setState({ result: null, isLoading: true, error: null });
      try {
        const result = await translateText(text, apiKey);
        setState({ result, isLoading: false, error: null });
        await addHistory({
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          inputMethod,
          originalText: text,
          result,
        });
      } catch (err) {
        setState({ result: null, isLoading: false, error: getErrorMessage(err) });
      }
    },
    []
  );

  const translateFromImage = useCallback(
    async (
      base64: string,
      mimeType: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif',
      imageUri: string
    ) => {
      const apiKey = await getApiKey();
      if (!apiKey) {
        setState((s) => ({ ...s, error: 'API key not set. Go to Settings.' }));
        return;
      }
      setState({ result: null, isLoading: true, error: null });
      try {
        const result = await translateImage(base64, mimeType, apiKey);
        setState({ result, isLoading: false, error: null });
        await addHistory({
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          inputMethod: 'camera',
          originalText: result.originalText,
          result,
          imageUri,
        });
      } catch (err) {
        setState({ result: null, isLoading: false, error: getErrorMessage(err) });
      }
    },
    []
  );

  const clear = useCallback(() => {
    setState({ result: null, isLoading: false, error: null });
  }, []);

  return { ...state, translate, translateFromImage, clear };
}
