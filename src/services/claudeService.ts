import Anthropic from '@anthropic-ai/sdk';
import { POETRY_SYSTEM_PROMPT } from '../constants/prompts';
import { logger } from '../lib/logger';
import type { TranslationResult } from '../types';

const TAG = 'claudeService';
const MODEL = 'claude-sonnet-4-6';

function parseClaudeResponse(rawText: string): TranslationResult {
  // Strip markdown code fences if Claude wraps the JSON despite instructions
  const cleaned = rawText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  try {
    const parsed = JSON.parse(cleaned);
    return {
      originalText: parsed.originalText ?? '',
      lines: Array.isArray(parsed.lines) ? parsed.lines : [],
      poeticMeaning: parsed.poeticMeaning ?? '',
      tamilMeaning: parsed.tamilMeaning ?? '',
      hindiMeaning: parsed.hindiMeaning ?? '',
      context: {
        identified: parsed.context?.identified ?? false,
        workTitle: parsed.context?.workTitle ?? null,
        author: parsed.context?.author ?? null,
        chapterOrSection: parsed.context?.chapterOrSection ?? null,
        period: parsed.context?.period ?? null,
        tradition: parsed.context?.tradition ?? null,
        notes: parsed.context?.notes ?? null,
      },
      detectedLanguage: parsed.detectedLanguage ?? 'Tamil',
    };
  } catch {
    logger.warn(TAG, 'JSON parse failed — returning raw text as poeticMeaning', { rawLength: rawText.length });
    return {
      originalText: '',
      lines: [],
      poeticMeaning: rawText,
      tamilMeaning: '',
      hindiMeaning: '',
      context: { identified: false },
      detectedLanguage: 'Unknown',
      parseError: true,
    };
  }
}

export async function translateText(
  inputText: string,
  apiKey: string
): Promise<TranslationResult> {
  if (!inputText.trim()) {
    throw new Error('No text provided for translation.');
  }

  const t0 = Date.now();
  logger.info(TAG, 'translateText start', { chars: inputText.length, model: MODEL });

  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

  try {
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 4096,
      system: POETRY_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Please translate and interpret the following verse (Tamil, Hindi, or Sanskrit):\n\n${inputText}`,
        },
      ],
    });

    const rawText =
      message.content[0].type === 'text' ? message.content[0].text : '';

    const result = parseClaudeResponse(rawText);
    logger.info(TAG, 'translateText success', {
      ms: Date.now() - t0,
      detectedLang: result.detectedLanguage,
      parseError: result.parseError ?? false,
      inputTokens: message.usage.input_tokens,
      outputTokens: message.usage.output_tokens,
    });
    return result;
  } catch (err) {
    logger.error(TAG, 'translateText failed', { ms: Date.now() - t0, error: String(err) });
    throw err;
  }
}

export async function translateImage(
  base64Image: string,
  mimeType: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif',
  apiKey: string
): Promise<TranslationResult> {
  const t0 = Date.now();
  logger.info(TAG, 'translateImage start', { mimeType, base64Len: base64Image.length, model: MODEL });

  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

  try {
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 4096,
      system: POETRY_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mimeType,
                data: base64Image,
              },
            },
            {
              type: 'text',
              text: 'This image contains a poem or verse in Tamil, Hindi, or Sanskrit. Please extract the text from the image, detect the language, then translate and interpret it. Follow the JSON response format exactly.',
            },
          ],
        },
      ],
    });

    const rawText =
      message.content[0].type === 'text' ? message.content[0].text : '';

    const result = parseClaudeResponse(rawText);
    logger.info(TAG, 'translateImage success', {
      ms: Date.now() - t0,
      detectedLang: result.detectedLanguage,
      parseError: result.parseError ?? false,
      inputTokens: message.usage.input_tokens,
      outputTokens: message.usage.output_tokens,
    });
    return result;
  } catch (err) {
    logger.error(TAG, 'translateImage failed', { ms: Date.now() - t0, error: String(err) });
    throw err;
  }
}
