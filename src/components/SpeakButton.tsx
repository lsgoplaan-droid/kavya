import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import { colors, spacing, radius, font } from '../constants/theme';

interface Props {
  text: string;
}

export function SpeakButton({ text }: Props) {
  const [speaking, setSpeaking] = useState(false);

  const toggle = async () => {
    if (speaking) {
      await Speech.stop();
      setSpeaking(false);
    } else {
      setSpeaking(true);
      Speech.speak(text, {
        language: 'en',
        onDone: () => setSpeaking(false),
        onError: () => setSpeaking(false),
      });
    }
  };

  return (
    <TouchableOpacity style={[styles.btn, speaking && styles.btnActive]} onPress={toggle}>
      <Text style={styles.icon}>{speaking ? '⏹' : '🔊'}</Text>
      <Text style={[styles.label, speaking && styles.labelActive]}>
        {speaking ? 'Stop' : 'Listen'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    alignSelf: 'flex-end',
  },
  btnActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  icon: {
    fontSize: 16,
  },
  label: {
    fontSize: font.sizeSm,
    color: colors.textSecondary,
    fontWeight: font.weightMedium,
  },
  labelActive: {
    color: colors.primary,
  },
});
