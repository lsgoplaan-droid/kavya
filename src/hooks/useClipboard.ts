import { useCallback } from 'react';
import * as Clipboard from 'expo-clipboard';

export function useClipboard() {
  const pasteFromClipboard = useCallback(async (): Promise<string> => {
    const text = await Clipboard.getStringAsync();
    return text ?? '';
  }, []);

  return { pasteFromClipboard };
}
