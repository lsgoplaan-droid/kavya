import { useState, useEffect, useCallback } from 'react';
import { getApiKey, saveApiKey, deleteApiKey } from '../storage/apiKeyStore';

export function useApiKey() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getApiKey().then((key) => {
      setApiKey(key);
      setIsLoading(false);
    });
  }, []);

  const saveKey = useCallback(async (key: string) => {
    const trimmed = key.trim();
    if (!trimmed.startsWith('sk-ant-')) {
      throw new Error('Invalid key format. Anthropic keys start with sk-ant-');
    }
    await saveApiKey(trimmed);
    setApiKey(trimmed);
  }, []);

  const removeKey = useCallback(async () => {
    await deleteApiKey();
    setApiKey(null);
  }, []);

  return {
    apiKey,
    isLoading,
    hasKey: !!apiKey,
    saveKey,
    removeKey,
  };
}
