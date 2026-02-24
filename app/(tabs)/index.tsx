import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from '../../src/hooks/useTranslation';
import { useClipboard } from '../../src/hooks/useClipboard';
import { useVoiceInput } from '../../src/hooks/useVoiceInput';
import { InputArea } from '../../src/components/InputArea';
import { TranslationResult } from '../../src/components/TranslationResult';
import { LoadingOverlay } from '../../src/components/LoadingOverlay';
import { VersePicker } from '../../src/components/VersePicker';
import { FeedbackSection } from '../../src/components/FeedbackSection';
import type { InputMethod } from '../../src/types';
import { colors, spacing, radius, font } from '../../src/constants/theme';

export default function TranslateScreen() {
  const { result, isLoading, error, translate, translateFromImage, clear } =
    useTranslation();
  const { pasteFromClipboard } = useClipboard();

  const [method, setMethod] = useState<InputMethod>('type');
  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [verseSource, setVerseSource] = useState<string | null>(null);

  const { isRecording, error: voiceError, startRecording, stopRecording } = useVoiceInput((transcript) => {
    setText(transcript);
    setVerseSource(null);
    clear();
  });

  const handleMethodChange = async (newMethod: InputMethod) => {
    setMethod(newMethod);
    setVerseSource(null);
    clear();
    if (newMethod === 'paste') {
      const pasted = await pasteFromClipboard();
      if (pasted) {
        setText(pasted);
      } else {
        Alert.alert('Clipboard empty', 'No text found in clipboard.');
      }
    }
  };

  const handleVersePicked = (verseText: string, source: string) => {
    setText(verseText);
    setVerseSource(source);
    setMethod('type');
    clear();
  };

  const handleCameraPress = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Permission needed',
        'Camera permission is required to photograph poems.'
      );
      return;
    }

    const picked = await ImagePicker.launchCameraAsync({
      mediaTypes: 'images',
      quality: 0.8,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!picked.canceled && picked.assets[0]) {
      const asset = picked.assets[0];
      setImageUri(asset.uri);
      const base64 = asset.base64!;
      const mimeType = (asset.mimeType as 'image/jpeg' | 'image/png') ?? 'image/jpeg';
      await translateFromImage(base64, mimeType, asset.uri);
    }
  };

  const handleGalleryPress = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Permission needed',
        'Photo library permission is required to upload images.'
      );
      return;
    }

    const picked = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      quality: 0.8,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!picked.canceled && picked.assets[0]) {
      const asset = picked.assets[0];
      setImageUri(asset.uri);
      const base64 = asset.base64!;
      const mimeType = (asset.mimeType as 'image/jpeg' | 'image/png') ?? 'image/jpeg';
      await translateFromImage(base64, mimeType, asset.uri);
    }
  };

  const handleTranslate = async () => {
    if (method === 'camera' && imageUri) return;
    if (!text.trim()) return;
    await translate(text, method);
  };

  const canTranslate =
    method === 'camera'
      ? !!imageUri && !result
      : text.trim().length > 0;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kavya</Text>
        <Text style={styles.headerSub}>Tamil · Hindi · Sanskrit — Powered by Claude AI</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputCard}>
          <InputArea
            method={method}
            text={text}
            imageUri={imageUri}
            isRecording={isRecording}
            voiceError={voiceError}
            onMethodChange={handleMethodChange}
            onTextChange={(t) => { setText(t); setVerseSource(null); clear(); }}
            onCameraPress={handleCameraPress}
            onGalleryPress={handleGalleryPress}
            onClearImage={() => { setImageUri(null); clear(); }}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
          />

          {method !== 'camera' && (
            <VersePicker onVersePicked={handleVersePicked} />
          )}

          {method !== 'camera' && (
            <TouchableOpacity
              style={[styles.translateBtn, !canTranslate && styles.translateBtnDisabled]}
              onPress={handleTranslate}
              disabled={!canTranslate || isLoading}
            >
              <Text style={styles.translateBtnText}>✨ Translate</Text>
            </TouchableOpacity>
          )}

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
        </View>

        {result && (
          <>
            <TranslationResult result={result} />
            <FeedbackSection
              verseSource={verseSource}
              detectedLanguage={result.detectedLanguage}
              inputMethod={method}
            />
          </>
        )}
      </ScrollView>

      {isLoading && <LoadingOverlay />}
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
    color: colors.primary,
  },
  headerSub: {
    fontSize: font.sizeXs,
    color: colors.textMuted,
    marginTop: 2,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    gap: spacing.md,
    paddingBottom: spacing.xxl,
  },
  inputCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  translateBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  translateBtnDisabled: {
    opacity: 0.4,
  },
  translateBtnText: {
    color: '#FFFFFF',
    fontSize: font.sizeMd,
    fontWeight: font.weightSemibold,
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    borderRadius: radius.md,
    padding: spacing.md,
  },
  errorText: {
    color: colors.error,
    fontSize: font.sizeSm,
  },
});
