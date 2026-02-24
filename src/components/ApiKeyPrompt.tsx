import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors, spacing, radius, font } from '../constants/theme';

interface Props {
  onSave: (key: string) => Promise<void>;
}

export function ApiKeyPrompt({ onSave }: Props) {
  const [key, setKey] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!key.trim()) return;
    setSaving(true);
    try {
      await onSave(key);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save key';
      Alert.alert('Invalid Key', msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.overlay}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'android' ? 24 : 0}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Welcome to Kavya</Text>
          <Text style={styles.subtitle}>
            Enter your Anthropic API key to get started. Your key is stored
            securely on this device only.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="sk-ant-api03-..."
            placeholderTextColor={colors.textMuted}
            value={key}
            onChangeText={setKey}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={[styles.button, (!key.trim() || saving) && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={!key.trim() || saving}
          >
            <Text style={styles.buttonText}>
              {saving ? 'Saving...' : 'Save & Continue'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL('https://console.anthropic.com/settings/keys')}
          >
            <Text style={styles.link}>Don't have a key? Get one here →</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 999,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: font.sizeXl,
    fontWeight: font.weightBold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: font.sizeSm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: font.sizeMd,
    color: colors.textPrimary,
    backgroundColor: colors.surfaceAlt,
    marginBottom: spacing.md,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: font.sizeMd,
    fontWeight: font.weightSemibold,
  },
  link: {
    color: colors.primary,
    fontSize: font.sizeSm,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
