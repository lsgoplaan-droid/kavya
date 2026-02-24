import AsyncStorage from '@react-native-async-storage/async-storage';
import type { HistoryEntry } from '../types';

const HISTORY_KEY = '@tamil_poet:history';
const MAX_HISTORY = 100;

export async function getHistory(): Promise<HistoryEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryEntry[];
  } catch {
    return [];
  }
}

export async function addHistory(entry: HistoryEntry): Promise<void> {
  try {
    const existing = await getHistory();
    const updated = [entry, ...existing].slice(0, MAX_HISTORY);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // silently fail — history is non-critical
  }
}

export async function deleteHistory(id: string): Promise<void> {
  try {
    const existing = await getHistory();
    const updated = existing.filter((e) => e.id !== id);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // silently fail
  }
}

export async function clearHistory(): Promise<void> {
  await AsyncStorage.removeItem(HISTORY_KEY);
}
