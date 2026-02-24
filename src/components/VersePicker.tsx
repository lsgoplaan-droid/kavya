import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { fetchRandomVerse, type VerseCollection } from '../services/verseService';
import { colors, spacing, radius, font } from '../constants/theme';

interface Props {
  onVersePicked: (text: string, source: string) => void;
}

const CATEGORIES: { label: string; value: VerseCollection }[] = [
  { label: 'All', value: 'all' },
  { label: 'Bhagavad Gita', value: 'Bhagavad Gita' },
  { label: 'Thirukkural', value: 'Thirukkural' },
  { label: 'Divya Prabandham', value: 'Naalayira Divya Prabandham' },
];

export function VersePicker({ onVersePicked }: Props) {
  const [selected, setSelected] = useState<VerseCollection>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [lastSource, setLastSource] = useState<string | null>(null);

  const handleRandom = async () => {
    setIsLoading(true);
    try {
      const verse = await fetchRandomVerse(selected);
      setLastSource(verse.source);
      onVersePicked(verse.text, verse.source);
    } catch {
      // silently fall back — verseService already handles fallback internally
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Category chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.value}
            style={[styles.chip, selected === cat.value && styles.chipActive]}
            onPress={() => setSelected(cat.value)}
          >
            <Text style={[styles.chipText, selected === cat.value && styles.chipTextActive]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Random button + source badge */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.randomBtn, isLoading && styles.randomBtnLoading]}
          onPress={handleRandom}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Text style={styles.randomBtnText}>🎲 Random Verse</Text>
          )}
        </TouchableOpacity>

        {lastSource && !isLoading && (
          <View style={styles.sourceBadge}>
            <Text style={styles.sourceBadgeText}>{lastSource}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  chips: {
    gap: spacing.xs,
    paddingHorizontal: 1,
  },
  chip: {
    paddingVertical: 5,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: font.sizeXs,
    color: colors.textSecondary,
    fontWeight: font.weightMedium,
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  randomBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minWidth: 130,
    alignItems: 'center',
  },
  randomBtnLoading: {
    opacity: 0.6,
  },
  randomBtnText: {
    color: colors.primary,
    fontSize: font.sizeSm,
    fontWeight: font.weightSemibold,
  },
  sourceBadge: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.full,
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
  },
  sourceBadgeText: {
    color: colors.primaryDark,
    fontSize: font.sizeXs,
    fontWeight: font.weightMedium,
  },
});
