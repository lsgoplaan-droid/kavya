import { useState, useCallback, useEffect } from 'react';
import { getHistory, deleteHistory, clearHistory } from '../storage/historyStore';
import type { HistoryEntry } from '../types';

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const data = await getHistory();
    setHistory(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const deleteEntry = useCallback(async (id: string) => {
    await deleteHistory(id);
    setHistory((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const clearAll = useCallback(async () => {
    await clearHistory();
    setHistory([]);
  }, []);

  return { history, isLoading, refresh, deleteEntry, clearAll };
}
