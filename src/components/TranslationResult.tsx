import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import type { TranslationResult as TResult } from '../types';
import { SpeakButton } from './SpeakButton';
import { colors, spacing, radius, font } from '../constants/theme';

interface Props {
  result: TResult;
}

export function TranslationResult({ result }: Props) {
  const { lines, poeticMeaning, tamilMeaning, hindiMeaning, context } = result;

  return (
    <View style={styles.container}>
      {/* Section 1: Line-by-line */}
      {lines.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Line by Line</Text>
          {lines.map((line, i) => (
            <View key={i} style={styles.linePair}>
              <Text style={styles.tamilLine}>{line.original}</Text>
              <Text style={styles.literalLine}>{line.literal}</Text>
              {i < lines.length - 1 && <View style={styles.lineDivider} />}
            </View>
          ))}
        </View>
      )}

      {/* Section 2: English poetic meaning */}
      {poeticMeaning ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Poetic Meaning — English</Text>
          <View style={styles.poeticBlock}>
            <View style={styles.poeticAccent} />
            <Text style={styles.poeticText}>{poeticMeaning}</Text>
          </View>
          <SpeakButton text={poeticMeaning} />
        </View>
      ) : null}

      {/* Section 3: Tamil meaning */}
      {tamilMeaning ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>கவிதையின் பொருள் — தமிழ்</Text>
          <View style={styles.poeticBlock}>
            <View style={[styles.poeticAccent, styles.tamilAccent]} />
            <Text style={styles.tamilMeaningText}>{tamilMeaning}</Text>
          </View>
          <SpeakButton text={tamilMeaning} />
        </View>
      ) : null}

      {/* Section 4: Hindi meaning */}
      {hindiMeaning ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>कविता का अर्थ — हिंदी</Text>
          <View style={styles.poeticBlock}>
            <View style={[styles.poeticAccent, styles.hindiAccent]} />
            <Text style={styles.hindiMeaningText}>{hindiMeaning}</Text>
          </View>
          <SpeakButton text={hindiMeaning} />
        </View>
      ) : null}

      {/* Section 5: Context */}
      {context.identified && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This Poem</Text>
          <View style={styles.contextCard}>
            {context.workTitle && (
              <ContextRow label="Work" value={context.workTitle} />
            )}
            {context.author && (
              <ContextRow label="Author" value={context.author} />
            )}
            {context.chapterOrSection && (
              <ContextRow label="Section" value={context.chapterOrSection} />
            )}
            {context.period && (
              <ContextRow label="Period" value={context.period} />
            )}
            {context.tradition && (
              <ContextRow label="Tradition" value={context.tradition} />
            )}
            {context.notes && (
              <View style={styles.notesRow}>
                <Text style={styles.notesLabel}>Notes</Text>
                <Text style={styles.notesText}>{context.notes}</Text>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

function ContextRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.contextRow}>
      <Text style={styles.contextLabel}>{label}</Text>
      <Text style={styles.contextValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: font.sizeSm,
    fontWeight: font.weightSemibold,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  linePair: {
    gap: 4,
  },
  lineDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: spacing.sm,
  },
  tamilLine: {
    fontSize: font.sizeLg,
    color: colors.textPrimary,
    fontWeight: font.weightMedium,
    lineHeight: 28,
  },
  literalLine: {
    fontSize: font.sizeMd,
    color: colors.textSecondary,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  poeticBlock: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  poeticAccent: {
    width: 3,
    backgroundColor: colors.primary,
    borderRadius: radius.full,
  },
  poeticText: {
    flex: 1,
    fontSize: font.sizeMd,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  tamilAccent: {
    backgroundColor: colors.accent,
  },
  tamilMeaningText: {
    flex: 1,
    fontSize: font.sizeMd,
    color: colors.textPrimary,
    lineHeight: 28,
  },
  hindiAccent: {
    backgroundColor: colors.success,
  },
  hindiMeaningText: {
    flex: 1,
    fontSize: font.sizeMd,
    color: colors.textPrimary,
    lineHeight: 28,
  },
  contextCard: {
    gap: spacing.sm,
  },
  contextRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  contextLabel: {
    fontSize: font.sizeSm,
    color: colors.textMuted,
    fontWeight: font.weightMedium,
    width: 72,
  },
  contextValue: {
    flex: 1,
    fontSize: font.sizeSm,
    color: colors.textPrimary,
    fontWeight: font.weightMedium,
  },
  notesRow: {
    gap: spacing.xs,
  },
  notesLabel: {
    fontSize: font.sizeSm,
    color: colors.textMuted,
    fontWeight: font.weightMedium,
  },
  notesText: {
    fontSize: font.sizeSm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
