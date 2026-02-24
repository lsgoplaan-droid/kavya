import { supabase } from '../lib/supabase';
import { logger } from '../lib/logger';
import { VERSES, type Verse } from '../constants/verses';

const TAG = 'verseService';

export type VerseCollection =
  | 'all'
  | 'Bhagavad Gita'
  | 'Thirukkural'
  | 'Naalayira Divya Prabandham';

export async function fetchRandomVerse(collection: VerseCollection): Promise<Verse> {
  logger.info(TAG, 'fetchRandomVerse', { collection });
  try {
    let query = supabase
      .from('verses')
      .select('text, source, language');

    if (collection !== 'all') {
      query = query.eq('collection', collection);
    }

    const { data, error } = await query;

    if (error) throw error;
    if (!data || data.length === 0) throw new Error('No verses found for this collection');

    const pick = data[Math.floor(Math.random() * data.length)];
    logger.info(TAG, 'fetchRandomVerse ok (supabase)', { source: pick.source, totalRows: data.length });
    return {
      text: pick.text,
      source: pick.source,
      language: pick.language as Verse['language'],
    };
  } catch (err) {
    logger.warn(TAG, 'fetchRandomVerse supabase failed — using local fallback', { error: String(err) });
    const pool = buildLocalPool(collection);
    return pool[Math.floor(Math.random() * pool.length)];
  }
}

function buildLocalPool(collection: VerseCollection): Verse[] {
  if (collection === 'all') return VERSES;

  const filtered = VERSES.filter((v) => {
    if (collection === 'Bhagavad Gita') return v.source.startsWith('Bhagavad Gita');
    if (collection === 'Thirukkural') return v.source.startsWith('Thirukkural');
    if (collection === 'Naalayira Divya Prabandham') return v.source.startsWith('Thiruppavai');
    return false;
  });

  return filtered.length > 0 ? filtered : VERSES;
}
