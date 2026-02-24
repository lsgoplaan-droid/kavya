import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { useHistory } from '../../src/hooks/useHistory';
import { HistoryCard } from '../../src/components/HistoryCard';
import { colors, spacing, font, radius } from '../../src/constants/theme';

export default function HistoryScreen() {
  const { history, isLoading, refresh, deleteEntry, clearAll } = useHistory();

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  const handleClearAll = () => {
    Alert.alert('Clear History', 'Delete all translation history?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear All', style: 'destructive', onPress: clearAll },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={styles.clearBtn}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>Loading...</Text>
        </View>
      ) : history.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyIcon}>📜</Text>
          <Text style={styles.emptyTitle}>No translations yet</Text>
          <Text style={styles.emptyText}>
            Your translated poems will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoryCard entry={item} onDelete={deleteEntry} />
          )}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        />
      )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: font.sizeXl,
    fontWeight: font.weightBold,
    color: colors.textPrimary,
  },
  clearBtn: {
    fontSize: font.sizeSm,
    color: colors.error,
    fontWeight: font.weightMedium,
  },
  list: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.xl,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: font.sizeLg,
    fontWeight: font.weightSemibold,
    color: colors.textPrimary,
  },
  emptyText: {
    fontSize: font.sizeSm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
