import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const API_KEY_STORE_KEY = 'anthropic_api_key';

// If a key is bundled at build time (for shared/demo APKs), always use it.
export const BUNDLED_API_KEY: string | null =
  process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY ?? null;

export async function getApiKey(): Promise<string | null> {
  if (BUNDLED_API_KEY) return BUNDLED_API_KEY;
  if (Platform.OS === 'web') {
    return localStorage.getItem(API_KEY_STORE_KEY);
  }
  return SecureStore.getItemAsync(API_KEY_STORE_KEY);
}

export async function saveApiKey(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.setItem(API_KEY_STORE_KEY, key);
    return;
  }
  await SecureStore.setItemAsync(API_KEY_STORE_KEY, key);
}

export async function deleteApiKey(): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.removeItem(API_KEY_STORE_KEY);
    return;
  }
  await SecureStore.deleteItemAsync(API_KEY_STORE_KEY);
}
