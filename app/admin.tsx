import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { supabase } from '../src/lib/supabase';
import { logger, type LogEntry } from '../src/lib/logger';
import { colors, spacing, radius, font } from '../src/constants/theme';

const ADMIN_PASSWORD = process.env.EXPO_PUBLIC_ADMIN_PASSWORD ?? 'admin';

type AdminTab = 'feedback' | 'logs';

interface FeedbackRow {
  id: string;
  created_at: string;
  rating: number | null;
  comment: string | null;
  verse_source: string | null;
  detected_language: string | null;
  input_method: string | null;
}

const LEVEL_COLOR: Record<string, string> = {
  DEBUG: '#6B7280',
  INFO:  '#2563EB',
  WARN:  '#D97706',
  ERROR: '#DC2626',
};

export default function AdminPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [tab, setTab] = useState<AdminTab>('feedback');

  // ── Feedback state ────────────────────────────────────────────────────────
  const [rows, setRows] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // ── Logs state ────────────────────────────────────────────────────────────
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
      .then(({ data, error }) => {
        if (error) {
          setFetchError(error.message);
        } else {
          setRows((data as FeedbackRow[]) ?? []);
        }
        setLoading(false);
      });
  }, [authed]);

  const refreshLogs = useCallback(() => {
    setLogEntries(logger.getEntries());
  }, []);

  useEffect(() => {
    if (authed && tab === 'logs') refreshLogs();
  }, [authed, tab, refreshLogs]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const starsDisplay = (rating: number | null) => {
    if (!rating) return '—';
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  // ── Auth gate ─────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.authContainer}>
          <Text style={styles.authTitle}>Admin Dashboard</Text>
          <Text style={styles.authSub}>Kavya — Feedback & Logs Viewer</Text>
          <TextInput
            style={styles.authInput}
            placeholder="Enter admin password"
            placeholderTextColor={colors.textMuted}
            value={password}
            onChangeText={(t) => { setPassword(t); setAuthError(false); }}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={handleLogin}
          />
          {authError && <Text style={styles.authError}>Incorrect password</Text>}
          <TouchableOpacity style={styles.authBtn} onPress={handleLogin}>
            <Text style={styles.authBtnText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()} style={{ marginTop: spacing.md }}>
            <Text style={styles.backLink}>← Back to app</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── Admin view ────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kavya Admin</Text>
      </View>

      {/* Tab bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'feedback' && styles.tabBtnActive]}
          onPress={() => setTab('feedback')}
        >
          <Text style={[styles.tabBtnText, tab === 'feedback' && styles.tabBtnTextActive]}>
            Feedback ({rows.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'logs' && styles.tabBtnActive]}
          onPress={() => { setTab('logs'); refreshLogs(); }}
        >
          <Text style={[styles.tabBtnText, tab === 'logs' && styles.tabBtnTextActive]}>
            Logs ({logEntries.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── Feedback tab ───────────────────────────────────────────────────── */}
      {tab === 'feedback' && (
        <>
          {loading && (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )}
          {fetchError && (
            <View style={styles.centered}>
              <Text style={styles.authError}>{fetchError}</Text>
            </View>
          )}
          {!loading && !fetchError && rows.length === 0 && (
            <View style={styles.centered}>
              <Text style={styles.emptyText}>No feedback yet.</Text>
            </View>
          )}
          <FlatList
            data={rows}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.stars}>{starsDisplay(item.rating)}</Text>
                  <Text style={styles.dateText}>{formatDate(item.created_at)}</Text>
                </View>
                {item.comment ? (
                  <Text style={styles.comment}>"{item.comment}"</Text>
                ) : null}
                <View style={styles.meta}>
                  {item.verse_source && (
                    <Text style={styles.metaItem}>📖 {item.verse_source}</Text>
                  )}
                  {item.detected_language && (
                    <Text style={styles.metaItem}>🌐 {item.detected_language}</Text>
                  )}
                  {item.input_method && (
                    <Text style={styles.metaItem}>⌨️ {item.input_method}</Text>
                  )}
                </View>
              </View>
            )}
          />
        </>
      )}

      {/* ── Logs tab ───────────────────────────────────────────────────────── */}
      {tab === 'logs' && (
        <>
          <View style={styles.logsToolbar}>
            <TouchableOpacity style={styles.logsRefreshBtn} onPress={refreshLogs}>
              <Text style={styles.logsRefreshText}>↻ Refresh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.logsRefreshBtn, { backgroundColor: '#FEE2E2' }]}
              onPress={() => { logger.clear(); refreshLogs(); }}
            >
              <Text style={[styles.logsRefreshText, { color: colors.error }]}>Clear</Text>
            </TouchableOpacity>
            <Text style={styles.logsCount}>{logEntries.length} entries (newest first)</Text>
          </View>
          {logEntries.length === 0 ? (
            <View style={styles.centered}>
              <Text style={styles.emptyText}>No log entries yet. Use the app to generate logs.</Text>
            </View>
          ) : (
            <ScrollView contentContainerStyle={styles.logsContent}>
              {logEntries.map((entry, i) => (
                <View key={i} style={styles.logRow}>
                  <View style={styles.logHeader}>
                    <Text style={[styles.logLevel, { color: LEVEL_COLOR[entry.level] ?? '#333' }]}>
                      {entry.level}
                    </Text>
                    <Text style={styles.logTag}>[{entry.tag}]</Text>
                    <Text style={styles.logTs}>{entry.ts.slice(11, 23)}</Text>
                  </View>
                  <Text style={styles.logMessage}>{entry.message}</Text>
                  {entry.data ? (
                    <Text style={styles.logData}>{entry.data}</Text>
                  ) : null}
                </View>
              ))}
            </ScrollView>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // ── Auth ──────────────────────────────────────────────────────────────────
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  authTitle: {
    fontSize: font.sizeXxl,
    fontWeight: font.weightBold,
    color: colors.primary,
  },
  authSub: {
    fontSize: font.sizeSm,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  authInput: {
    width: '100%',
    maxWidth: 320,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: font.sizeMd,
    color: colors.textPrimary,
    backgroundColor: colors.surface,
  },
  authError: {
    color: colors.error,
    fontSize: font.sizeSm,
  },
  authBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  authBtnText: {
    color: '#FFFFFF',
    fontWeight: font.weightSemibold,
    fontSize: font.sizeMd,
  },
  backLink: {
    color: colors.primary,
    fontSize: font.sizeSm,
  },
  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 2,
  },
  headerTitle: {
    fontSize: font.sizeXl,
    fontWeight: font.weightBold,
    color: colors.textPrimary,
  },
  // ── Tab bar ───────────────────────────────────────────────────────────────
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: colors.primary,
  },
  tabBtnText: {
    fontSize: font.sizeSm,
    color: colors.textMuted,
    fontWeight: font.weightSemibold,
  },
  tabBtnTextActive: {
    color: colors.primary,
  },
  // ── Shared ────────────────────────────────────────────────────────────────
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: font.sizeMd,
    color: colors.textMuted,
    textAlign: 'center',
  },
  listContent: {
    padding: spacing.md,
    gap: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  // ── Feedback cards ────────────────────────────────────────────────────────
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stars: {
    fontSize: font.sizeLg,
    color: '#F59E0B',
    letterSpacing: 2,
  },
  dateText: {
    fontSize: font.sizeXs,
    color: colors.textMuted,
  },
  comment: {
    fontSize: font.sizeSm,
    color: colors.textPrimary,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: 2,
  },
  metaItem: {
    fontSize: font.sizeXs,
    color: colors.textSecondary,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  // ── Logs ──────────────────────────────────────────────────────────────────
  logsToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceAlt,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logsRefreshBtn: {
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  logsRefreshText: {
    fontSize: font.sizeXs,
    color: colors.primary,
    fontWeight: font.weightSemibold,
  },
  logsCount: {
    fontSize: font.sizeXs,
    color: colors.textMuted,
    marginLeft: 'auto',
  },
  logsContent: {
    padding: spacing.sm,
    gap: 4,
    paddingBottom: spacing.xxl,
  },
  logRow: {
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 2,
  },
  logHeader: {
    flexDirection: 'row',
    gap: spacing.xs,
    alignItems: 'center',
  },
  logLevel: {
    fontSize: 10,
    fontWeight: font.weightBold,
    fontFamily: 'monospace',
    minWidth: 40,
  },
  logTag: {
    fontSize: 10,
    color: colors.textSecondary,
    fontFamily: 'monospace',
  },
  logTs: {
    fontSize: 10,
    color: colors.textMuted,
    fontFamily: 'monospace',
    marginLeft: 'auto',
  },
  logMessage: {
    fontSize: font.sizeXs,
    color: colors.textPrimary,
    fontFamily: 'monospace',
  },
  logData: {
    fontSize: 10,
    color: colors.textSecondary,
    fontFamily: 'monospace',
    marginLeft: spacing.sm,
  },
});
