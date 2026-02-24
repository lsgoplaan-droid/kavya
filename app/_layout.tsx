import React from 'react';
import { Slot } from 'expo-router';
import { View, ActivityIndicator, Platform } from 'react-native';
import { useApiKey } from '../src/hooks/useApiKey';
import { ApiKeyPrompt } from '../src/components/ApiKeyPrompt';
import { colors } from '../src/constants/theme';

export default function RootLayout() {
  const { hasKey, isLoading, saveKey } = useApiKey();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1, backgroundColor: '#1a0f00', alignItems: 'center' }}>
        <View style={{ flex: 1, width: '100%', maxWidth: 480, backgroundColor: colors.background }}>
          <Slot />
          {!hasKey && <ApiKeyPrompt onSave={saveKey} />}
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Slot />
      {!hasKey && <ApiKeyPrompt onSave={saveKey} />}
    </View>
  );
}
