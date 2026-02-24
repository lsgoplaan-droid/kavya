import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { submitFeedback } from '../services/feedbackService';
import { colors, spacing, radius, font } from '../constants/theme';

interface Props {
  verseSource?: string | null;
  detectedLanguage?: string;
  inputMethod?: string;
}

export function FeedbackSection({ verseSource, detectedLanguage, inputMethod }: Props) {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!rating) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitFeedback({
        rating,
        comment: comment.trim() || undefined,
        verse_source: verseSource ?? undefined,
        detected_language: detectedLanguage,
        input_method: inputMethod,
      });
      setSubmitted(true);
    } catch (e) {
      setError('Could not save feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <View style={styles.container}>
        <Text style={styles.thankYou}>🙏 Thank you for your feedback!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rate this translation</Text>

      {/* Star rating */}
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)} style={styles.starBtn}>
            <Text style={[styles.star, rating !== null && star <= rating && styles.starFilled]}>
              {rating !== null && star <= rating ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Comment box — appears after rating selected */}
      {rating !== null && (
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment (optional)"
          placeholderTextColor={colors.textMuted}
          value={comment}
          onChangeText={setComment}
          multiline
          numberOfLines={2}
          maxLength={300}
        />
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity
        style={[styles.submitBtn, (!rating || submitting) && styles.submitBtnDisabled]}
        onPress={handleSubmit}
        disabled={!rating || submitting}
      >
        {submitting ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.submitBtnText}>Send Feedback</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  label: {
    fontSize: font.sizeSm,
    fontWeight: font.weightSemibold,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  stars: {
    flexDirection: 'row',
    gap: 4,
  },
  starBtn: {
    padding: 4,
  },
  star: {
    fontSize: 28,
    color: colors.border,
  },
  starFilled: {
    color: '#F59E0B',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.sm,
    fontSize: font.sizeSm,
    color: colors.textPrimary,
    backgroundColor: colors.surfaceAlt,
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: font.sizeXs,
    color: colors.error,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  submitBtnDisabled: {
    opacity: 0.4,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: font.sizeSm,
    fontWeight: font.weightSemibold,
  },
  thankYou: {
    fontSize: font.sizeMd,
    color: colors.success,
    fontWeight: font.weightMedium,
    textAlign: 'center',
    paddingVertical: spacing.sm,
  },
});
