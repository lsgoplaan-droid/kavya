import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { HistoryEntry } from '../types';
import { colors, spacing, radius, font } from '../constants/theme';

interface Props {
  entry: HistoryEntry;
  onDelete: (id: string) => void;
}

const METHOD_ICON: Record<string, string> = {
  type: '⌨️',
  camera: '📷',
  voice: '🎤',
  paste: '📋',
};

export function HistoryCard({ entry, onDelete }: Props) {
  const date = new Date(entry.createdAt);
  const dateLabel = date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.meta}>
          <Text style={styles.icon}>{METHOD_ICON[entry.inputMethod] ?? '📝'}</Text>
          <Text style={styles.date}>{dateLabel}</Text>
        </View>
        <TouchableOpacity onPress={() => onDelete(entry.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.deleteBtn}>✕</Text>
        </TouchableOpacity>
      </View>

      {entry.originalText ? (
        <Text style={styles.tamilText} numberOfLines={2}>
          {entry.originalText}
        </Text>
      ) : null}

      <Text style={styles.meaning} numberOfLines={3}>
        {entry.result.poeticMeaning}
      </Text>

      {entry.result.context.identified && entry.result.context.workTitle ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{entry.result.context.workTitle}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  icon: {
    fontSize: 14,
  },
  date: {
    fontSize: font.sizeXs,
    color: colors.textMuted,
  },
  deleteBtn: {
    fontSize: 14,
    color: colors.textMuted,
    padding: spacing.xs,
  },
  tamilText: {
    fontSize: font.sizeMd,
    color: colors.textPrimary,
    fontWeight: font.weightMedium,
    lineHeight: 24,
  },
  meaning: {
    fontSize: font.sizeSm,
    color: colors.textSecondary,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  badgeText: {
    fontSize: font.sizeXs,
    color: colors.primary,
    fontWeight: font.weightSemibold,
  },
});
