import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import type { InputMethod } from '../types';
import { colors, spacing, radius, font } from '../constants/theme';

interface Props {
  active: InputMethod;
  onChange: (method: InputMethod) => void;
}

const METHODS: { key: InputMethod; label: string; icon: string }[] = [
  { key: 'type', label: 'Type', icon: '⌨️' },
  { key: 'camera', label: 'Camera', icon: '📷' },
  { key: 'voice', label: 'Voice', icon: '🎤' },
  { key: 'paste', label: 'Paste', icon: '📋' },
];

export function InputMethodBar({ active, onChange }: Props) {
  return (
    <View style={styles.container}>
      {METHODS.map((m) => (
        <TouchableOpacity
          key={m.key}
          style={[styles.btn, active === m.key && styles.btnActive]}
          onPress={() => onChange(m.key)}
        >
          <Text style={styles.icon}>{m.icon}</Text>
          <Text style={[styles.label, active === m.key && styles.labelActive]}>
            {m.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  btnActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  icon: {
    fontSize: 20,
    marginBottom: 2,
  },
  label: {
    fontSize: font.sizeXs,
    color: colors.textSecondary,
    fontWeight: font.weightMedium,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: font.weightSemibold,
  },
});
