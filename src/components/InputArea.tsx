import React from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import type { InputMethod } from '../types';
import { InputMethodBar } from './InputMethodBar';
import { colors, spacing, radius, font } from '../constants/theme';

interface Props {
  method: InputMethod;
  text: string;
  imageUri: string | null;
  isRecording?: boolean;
  voiceError?: string | null;
  onMethodChange: (method: InputMethod) => void;
  onTextChange: (text: string) => void;
  onCameraPress: () => void;
  onGalleryPress: () => void;
  onClearImage: () => void;
  onStartRecording?: () => void;
  onStopRecording?: () => void;
}

export function InputArea({
  method,
  text,
  imageUri,
  isRecording = false,
  voiceError,
  onMethodChange,
  onTextChange,
  onCameraPress,
  onGalleryPress,
  onClearImage,
  onStartRecording,
  onStopRecording,
}: Props) {
  return (
    <View>
      <InputMethodBar active={method} onChange={onMethodChange} />

      {method === 'voice' ? (
        <View style={styles.voiceContainer}>
          <TouchableOpacity
            style={[styles.recordBtn, isRecording && styles.recordBtnActive]}
            onPress={isRecording ? onStopRecording : onStartRecording}
          >
            <Text style={styles.recordIcon}>{isRecording ? '⏹️' : '🎤'}</Text>
            <Text style={styles.recordLabel}>
              {isRecording ? 'Tap to stop' : 'Tap to speak'}
            </Text>
          </TouchableOpacity>
          {isRecording && (
            <Text style={styles.recordingHint}>Listening… speak your verse</Text>
          )}
          {voiceError ? (
            <Text style={styles.voiceError}>{voiceError}</Text>
          ) : null}
          {text ? (
            <TextInput
              style={styles.textInput}
              multiline
              value={text}
              onChangeText={onTextChange}
              textAlignVertical="top"
              autoCapitalize="none"
              autoCorrect={false}
            />
          ) : !isRecording ? (
            <Text style={styles.voiceHint}>
              Tap the mic and speak a Tamil, Hindi, or Sanskrit verse
            </Text>
          ) : null}
        </View>
      ) : method === 'camera' ? (
        imageUri ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
            <TouchableOpacity style={styles.clearImage} onPress={onClearImage}>
              <Text style={styles.clearImageText}>✕ Clear</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cameraPlaceholder}>
            <Text style={styles.cameraHint}>Choose an image source</Text>
            <View style={styles.cameraButtons}>
              <TouchableOpacity style={styles.cameraBtn} onPress={onCameraPress}>
                <Text style={styles.cameraBtnIcon}>📷</Text>
                <Text style={styles.cameraBtnLabel}>Take Photo</Text>
              </TouchableOpacity>
              <View style={styles.cameraDivider} />
              <TouchableOpacity style={styles.cameraBtn} onPress={onGalleryPress}>
                <Text style={styles.cameraBtnIcon}>🖼️</Text>
                <Text style={styles.cameraBtnLabel}>Upload Image</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      ) : (
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={6}
          placeholder={
            method === 'paste'
              ? 'Your pasted verse will appear here'
              : 'Enter a Tamil, Hindi, or Sanskrit poem / sloka...'
          }
          placeholderTextColor={colors.textMuted}
          value={text}
          onChangeText={onTextChange}
          textAlignVertical="top"
          autoCapitalize="none"
          autoCorrect={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: font.sizeLg,
    color: colors.textPrimary,
    backgroundColor: colors.surfaceAlt,
    minHeight: 140,
    lineHeight: 26,
  },
  cameraPlaceholder: {
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: radius.md,
    minHeight: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
    gap: spacing.md,
    paddingVertical: spacing.lg,
  },
  cameraHint: {
    fontSize: font.sizeSm,
    color: colors.textSecondary,
  },
  cameraButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cameraBtn: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.xs,
  },
  cameraBtnIcon: {
    fontSize: 36,
  },
  cameraBtnLabel: {
    fontSize: font.sizeSm,
    color: colors.textSecondary,
    fontWeight: font.weightMedium,
  },
  cameraDivider: {
    width: 1,
    height: 48,
    backgroundColor: colors.border,
  },
  imageContainer: {
    borderRadius: radius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: radius.md,
  },
  clearImage: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  clearImageText: {
    color: '#FFFFFF',
    fontSize: font.sizeSm,
    fontWeight: font.weightMedium,
  },
  voiceContainer: {
    gap: spacing.md,
  },
  recordBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 2,
    borderColor: colors.border,
  },
  recordBtnActive: {
    backgroundColor: '#FEE2E2',
    borderColor: colors.error,
  },
  recordIcon: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  recordLabel: {
    fontSize: font.sizeMd,
    color: colors.textSecondary,
    fontWeight: font.weightMedium,
  },
  recordingHint: {
    fontSize: font.sizeSm,
    color: colors.error,
    textAlign: 'center',
  },
  voiceHint: {
    fontSize: font.sizeSm,
    color: colors.textMuted,
    textAlign: 'center',
    paddingVertical: spacing.sm,
  },
  voiceError: {
    fontSize: font.sizeSm,
    color: colors.error,
    textAlign: 'center',
    paddingVertical: spacing.xs ?? 4,
  },
});
