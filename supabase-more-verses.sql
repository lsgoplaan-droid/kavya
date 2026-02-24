-- ============================================================
-- Kavya App — Additional Verses
-- Run this in Supabase SQL Editor to expand the verse pool.
-- Safe to run multiple times — duplicates will be skipped
-- because of the ON CONFLICT DO NOTHING clause.
-- ============================================================

-- Add a unique constraint on (source) so we can use ON CONFLICT
ALTER TABLE public.verses
  ADD CONSTRAINT verses_source_unique UNIQUE (source);

-- ── Additional Bhagavad Gita verses ──────────────────────────────────────────
INSERT INTO public.verses (text, source, language, collection, religion) VALUES

($$नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः।
न चैनं क्लेदयन्त्यापो न शोषयति मारुतः॥$$,
 'Bhagavad Gita 2.23', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$परित्राणाय साधूनां विनाशाय च दुष्कृताम्।
धर्मसंस्थापनार्थाय संभवामि युगे युगे॥$$,
 'Bhagavad Gita 4.8', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।
आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥$$,
 'Bhagavad Gita 6.5', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय।
मयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव॥$$,
 'Bhagavad Gita 7.7', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः।
स यत्प्रमाणं कुरुते लोकस्तदनुवर्तते॥$$,
 'Bhagavad Gita 3.21', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$यत्करोषि यदश्नासि यज्जुहोषि ददासि यत्।
यत्तपस्यसि कौन्तेय तत्कुरुष्व मदर्पणम्॥$$,
 'Bhagavad Gita 9.27', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$अहमात्मा गुडाकेश सर्वभूताशयस्थितः।
अहमादिश्च मध्यं च भूतानामन्त एव च॥$$,
 'Bhagavad Gita 10.20', 'Sanskrit', 'Bhagavad Gita', 'Hindu')

ON CONFLICT (source) DO NOTHING;

-- ── Additional Thirukkural verses ─────────────────────────────────────────────
INSERT INTO public.verses (text, source, language, collection, religion) VALUES

-- Chapter 1 — Katavul Vaazhthu (Kurals 5–10)
($$இருள்சேர் இருவினையும் சேரா இறைவன்
பொருள்சேர் புகழ்புரிந்தார் மாட்டு.$$,
 'Thirukkural 5', 'Tamil', 'Thirukkural', 'Hindu'),

($$பொறிவாயில் ஐந்தவித்தான் பொய்தீர் ஒழுக்க
நெறிநின்றார் நீடுவாழ் வார்.$$,
 'Thirukkural 6', 'Tamil', 'Thirukkural', 'Hindu'),

($$தனக்குவமை இல்லாதான் தாள்சேர்ந்தார்க்கு அல்லால்
மனக்கவலை மாற்றல் அரிது.$$,
 'Thirukkural 7', 'Tamil', 'Thirukkural', 'Hindu'),

($$அறவாழி அந்தணன் தாள்சேர்ந்தார்க் கல்லால்
பிறவாழி நீந்தல் அரிது.$$,
 'Thirukkural 8', 'Tamil', 'Thirukkural', 'Hindu'),

($$கோளில் பொறியில் குணமிலவே எண்குணத்தான்
தாளை வணங்காத் தலை.$$,
 'Thirukkural 9', 'Tamil', 'Thirukkural', 'Hindu'),

($$பிறவிப் பெருங்கடல் நீந்துவர் நீந்தார்
இறைவன் அடிசேரா தார்.$$,
 'Thirukkural 10', 'Tamil', 'Thirukkural', 'Hindu'),

-- Chapter 2 — Vaan Sirappu (The Greatness of Rain)
($$வான்நின்று உலகம் வழங்கி வருதலால்
தான்அமிழ்தம் என்றுணர்க வான்.$$,
 'Thirukkural 11', 'Tamil', 'Thirukkural', 'Hindu'),

-- Chapter 3 — Neetham (Righteousness / Virtue)
($$ஒழுக்கம் விழுப்பம் தரலான் ஒழுக்கம்
உயிரினும் ஓம்பப் படும்.$$,
 'Thirukkural 21', 'Tamil', 'Thirukkural', 'Hindu'),

-- Chapter 40 — Kelviyunarvudaimai (Learning)
($$எண்ணென்ப ஏனை எழுத்தென்ப இவ்விரண்டும்
கண்ணென்ப வாழும் உயிர்க்கு.$$,
 'Thirukkural 392', 'Tamil', 'Thirukkural', 'Hindu'),

-- Chapter 43 — Meiporul Unartal (Perceiving Truth)
($$எப்பொருள் யார்யார்வாய்க் கேட்பினும் அப்பொருள்
மெய்ப்பொருள் காண்பதறிவு.$$,
 'Thirukkural 423', 'Tamil', 'Thirukkural', 'Hindu')

ON CONFLICT (source) DO NOTHING;

-- ============================================================
-- HOW TO ADD MORE VERSES (any religion, any collection):
--
-- INSERT INTO public.verses (text, source, language, collection, religion)
-- VALUES
--   ('verse text here', 'Bible — Psalm 23:1', 'Other', 'Bible', 'Christian'),
--   ('verse text here', 'Quran 2:255 (Ayat al-Kursi)', 'Other', 'Quran', 'Islam'),
--   ('verse text here', 'Guru Granth Sahib, Japji 1', 'Other', 'Guru Granth Sahib', 'Sikh');
--
-- The app will automatically pick up new collections in the "All" category.
-- To add a new named chip (e.g., "Bible") in the UI, update
-- src/components/VersePicker.tsx → CATEGORIES array.
-- ============================================================
