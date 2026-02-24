import { useState, useCallback } from 'react';
import { Platform, Alert } from 'react-native';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition';

export function useVoiceInput(onTranscript: (text: string) => void) {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useSpeechRecognitionEvent('start', () => {
    setIsRecording(true);
    setError(null);
  });

  useSpeechRecognitionEvent('end', () => setIsRecording(false));

  useSpeechRecognitionEvent('error', (event) => {
    const msg = event.message ?? event.error ?? 'Voice recognition failed';
    setError(msg);
    setIsRecording(false);
    Alert.alert('Voice Input Error', String(msg));
  });

  useSpeechRecognitionEvent('result', (event) => {
    const transcript = event.results?.[0]?.transcript;
    if (transcript) {
      onTranscript(transcript);
    }
  });

  const startRecording = useCallback(async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Not supported', 'Voice input is not available on web.');
      return;
    }
    setError(null);

    const { granted } = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!granted) {
      const msg = 'Microphone permission denied. Please enable it in Settings.';
      setError(msg);
      Alert.alert('Permission Required', msg);
      return;
    }

    const available = await ExpoSpeechRecognitionModule.isRecognitionAvailable();
    if (!available) {
      const msg = 'Speech recognition is not available on this device.';
      setError(msg);
      Alert.alert('Not Available', msg);
      return;
    }

    ExpoSpeechRecognitionModule.start({
      lang: 'ta-IN',
      interimResults: false,
      continuous: false,
      requiresOnDeviceRecognition: false,
    });
  }, []);

  const stopRecording = useCallback(() => {
    ExpoSpeechRecognitionModule.stop();
    setIsRecording(false);
  }, []);

  return { isRecording, error, startRecording, stopRecording };
}
