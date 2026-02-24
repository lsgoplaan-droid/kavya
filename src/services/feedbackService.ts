import { supabase } from '../lib/supabase';
import { logger } from '../lib/logger';

const TAG = 'feedbackService';

export interface FeedbackPayload {
  rating: number;       // 1–5
  comment?: string;
  verse_source?: string | null;
  detected_language?: string;
  input_method?: string;
}

export async function submitFeedback(payload: FeedbackPayload): Promise<void> {
  logger.info(TAG, 'submitFeedback', { rating: payload.rating, input_method: payload.input_method });
  const { error } = await supabase.from('feedback').insert([payload]);
  if (error) {
    logger.error(TAG, 'submitFeedback failed', { error: error.message });
    throw new Error(error.message);
  }
  logger.info(TAG, 'submitFeedback ok');
}
