import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApiKey } from '../../src/hooks/useApiKey';
import { clearHistory } from '../../src/storage/historyStore';
import { colors, spacing, radius, font } from '../../src/constants/theme';

export default function SettingsScreen() {
  const { apiKey, hasKey, saveKey, removeKey } = useApiKey();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [saving, setSaving] = useState(false);

  const maskedKey = apiKey
    ? `sk-ant-...${apiKey.slice(-4)}`
    : 'Not set';

  const handleSaveKey = async () => {
    if (!newKey.trim()) return;
    setSaving(true);
    try {
      await saveKey(newKey);
      setEditing(false);
      setNewKey('');
      Alert.alert('Saved', 'API key updated successfully.');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save key';
      Alert.alert('Error', msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteKey = () => {
    Alert.alert('Delete API Key', 'You will need to enter a new key to use the app.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await removeKey();
          setEditing(false);
        },
      },
    ]);
  };

  const handleClearHistory = () => {
    Alert.alert('Clear History', 'Delete all translation history?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear All',
        style: 'destructive',
        onPress: async () => {
          await clearHistory();
          Alert.alert('Done', 'History cleared.');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* API Key section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Anthropic API Key</Text>

          <View style={styles.card}>
            <View style={styles.keyRow}>
              <Text style={styles.keyLabel}>Current Key</Text>
              <Text style={styles.keyValue}>{maskedKey}</Text>
            </View>

            {editing ? (
              <View style={styles.editArea}>
                <TextInput
                  style={styles.input}
                  placeholder="sk-ant-api03-..."
                  placeholderTextColor={colors.textMuted}
                  value={newKey}
                  onChangeText={setNewKey}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus
                />
                <View style={styles.editButtons}>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => { setEditing(false); setNewKey(''); }}
                  >
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.saveBtn, (!newKey.trim() || saving) && styles.saveBtnDisabled]}
                    onPress={handleSaveKey}
                    disabled={!newKey.trim() || saving}
                  >
                    <Text style={styles.saveBtnText}>{saving ? 'Saving...' : 'Save'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.keyActions}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => setEditing(true)}>
                  <Text style={styles.actionBtnText}>
                    {hasKey ? 'Change Key' : 'Add Key'}
                  </Text>
                </TouchableOpacity>
                {hasKey && (
                  <TouchableOpacity style={styles.actionBtnDanger} onPress={handleDeleteKey}>
                    <Text style={styles.actionBtnDangerText}>Delete Key</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            <TouchableOpacity
              onPress={() => Linking.openURL('https://console.anthropic.com/settings/keys')}
            >
              <Text style={styles.link}>Get an API key at console.anthropic.com →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Data section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.dangerRow} onPress={handleClearHistory}>
              <Text style={styles.dangerLabel}>Clear Translation History</Text>
              <Text style={styles.dangerArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Admin section — web only */}
        {Platform.OS === 'web' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Admin</Text>
            <View style={styles.card}>
              <TouchableOpacity style={styles.dangerRow} onPress={() => router.push('/admin')}>
                <Text style={[styles.dangerLabel, { color: colors.primary }]} numberOfLines={1}>Feedback Dashboard</Text>
                <Text style={styles.dangerArrow}>›</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* About section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.card}>
            <View style={styles.aboutRow}>
              <Text style={styles.aboutLabel}>App</Text>
              <Text style={styles.aboutValue}>Kavya</Text>
            </View>
            <View style={styles.aboutRow}>
              <Text style={styles.aboutLabel}>Version</Text>
              <Text style={styles.aboutValue}>1.0.0</Text>
            </View>
            <View style={styles.aboutRow}>
              <Text style={styles.aboutLabel}>AI Model</Text>
              <Text style={styles.aboutValue}>Claude claude-sonnet-4-6</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: font.sizeXl,
    fontWeight: font.weightBold,
    color: colors.textPrimary,
  },
  content: {
    padding: spacing.md,
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  section: {
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: font.sizeXs,
    fontWeight: font.weightSemibold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingHorizontal: spacing.xs,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  keyLabel: {
    fontSize: font.sizeSm,
    color: colors.textSecondary,
  },
  keyValue: {
    fontSize: font.sizeSm,
    color: colors.textPrimary,
    fontWeight: font.weightMedium,
  },
  editArea: {
    gap: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: font.sizeMd,
    color: colors.textPrimary,
    backgroundColor: colors.surfaceAlt,
  },
  editButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  cancelBtn: {
    flex: 1,
    padding: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: colors.textSecondary,
    fontWeight: font.weightMedium,
  },
  saveBtn: {
    flex: 1,
    padding: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  saveBtnDisabled: {
    opacity: 0.5,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: font.weightSemibold,
  },
  keyActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionBtn: {
    flex: 1,
    padding: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
  },
  actionBtnText: {
    color: colors.primary,
    fontWeight: font.weightSemibold,
    fontSize: font.sizeSm,
  },
  actionBtnDanger: {
    flex: 1,
    padding: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
  },
  actionBtnDangerText: {
    color: colors.error,
    fontWeight: font.weightSemibold,
    fontSize: font.sizeSm,
  },
  link: {
    color: colors.primary,
    fontSize: font.sizeXs,
    textDecorationLine: 'underline',
  },
  dangerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dangerLabel: {
    fontSize: font.sizeMd,
    color: colors.error,
  },
  dangerArrow: {
    fontSize: 18,
    color: colors.textMuted,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aboutLabel: {
    fontSize: font.sizeSm,
    color: colors.textSecondary,
  },
  aboutValue: {
    fontSize: font.sizeSm,
    color: colors.textPrimary,
    fontWeight: font.weightMedium,
  },
});
