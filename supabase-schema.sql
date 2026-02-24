-- ============================================================
-- Kavya App — Supabase Schema
-- Run this in Supabase SQL Editor (supabase.com → your project → SQL Editor)
-- ============================================================

-- VERSES TABLE
create table public.verses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  text text not null,
  source text not null,
  language text not null,   -- 'Tamil' | 'Hindi' | 'Sanskrit' | 'Telugu' | etc.
  collection text not null, -- 'Bhagavad Gita' | 'Thirukkural' | 'Naalayira Divya Prabandham' | ...
  religion text not null default 'Hindu',
  enabled boolean default true
);

-- FEEDBACK TABLE
create table public.feedback (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  rating integer check (rating between 1 and 5),
  comment text,
  verse_source text,
  detected_language text,
  input_method text
);

-- ROW LEVEL SECURITY
alter table public.verses enable row level security;
alter table public.feedback enable row level security;

create policy "Public can read enabled verses"
  on public.verses for select
  using (enabled = true);

create policy "Public can insert feedback"
  on public.feedback for insert
  with check (true);

create policy "Public can read feedback"
  on public.feedback for select
  using (true);

-- ============================================================
-- SEED DATA
-- ============================================================

insert into public.verses (text, source, language, collection, religion) values

-- Bhagavad Gita (Sanskrit)
(
  $$कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।
मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥$$,
  'Bhagavad Gita 2.47', 'Sanskrit', 'Bhagavad Gita', 'Hindu'
),
(
  $$न जायते म्रियते वा कदाचित्
नायं भूत्वा भविता वा न भूयः।
अजो नित्यः शाश्वतोऽयं पुराणो
न हन्यते हन्यमाने शरीरे॥$$,
  'Bhagavad Gita 2.20', 'Sanskrit', 'Bhagavad Gita', 'Hindu'
),
(
  $$यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।
अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥$$,
  'Bhagavad Gita 4.7', 'Sanskrit', 'Bhagavad Gita', 'Hindu'
),
(
  $$अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।
तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥$$,
  'Bhagavad Gita 9.22', 'Sanskrit', 'Bhagavad Gita', 'Hindu'
),
(
  $$सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।
अहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥$$,
  'Bhagavad Gita 18.66', 'Sanskrit', 'Bhagavad Gita', 'Hindu'
),

-- Thirukkural (Tamil)
(
  $$அகர முதல எழுத்தெல்லாம் ஆதி
பகவன் முதற்றே உலகு.$$,
  'Thirukkural 1', 'Tamil', 'Thirukkural', 'Hindu'
),
(
  $$கற்றதனால் ஆய பயனென்கொல் வாலறிவன்
நற்றாள் தொழாஅர் எனின்.$$,
  'Thirukkural 2', 'Tamil', 'Thirukkural', 'Hindu'
),
(
  $$மலர்மிசை ஏகினான் மாணடி சேர்ந்தார்
நிலமிசை நீடுவாழ் வார்.$$,
  'Thirukkural 3', 'Tamil', 'Thirukkural', 'Hindu'
),
(
  $$வேண்டுதல் வேண்டாமை இலானடி சேர்ந்தார்க்கு
யாண்டும் இடும்பை இல.$$,
  'Thirukkural 4', 'Tamil', 'Thirukkural', 'Hindu'
),
(
  $$கற்க கசடறக் கற்பவை கற்றபின்
நிற்க அதற்குத் தக.$$,
  'Thirukkural 391', 'Tamil', 'Thirukkural', 'Hindu'
),

-- Naalayira Divya Prabandham — Thiruppavai (Andal)
(
  $$மார்கழித் திங்கள் மதிநிறைந்த நன்னாளால்
நீராடப் போதுவீர் போதுமினோ நேரிழையீர்
சீர்மல்கும் ஆய்ப்பாடிச் செல்வச் சிறுமீர்காள்
கூர்வேல் கொடுந்தொழிலன் நந்தகோபன் குமரன்
ஏரார்ந்த கண்ணி யசோதை இளஞ்சிங்கம்
கார்மேனி செங்கண் கதிர்மதியம் போல்முகத்தான்
நாராயணனே நமக்கே பறை தருவான்
பாரோர் புகழப் படிந்தேலோர் எம்பாவாய்.$$,
  'Thiruppavai, Pasuram 1', 'Tamil', 'Naalayira Divya Prabandham', 'Hindu'
),
(
  $$வையத்து வாழ்வீர்காள் நாமும் நம் பாவைக்கு
செய்யும் கிரிசைகள் கேளீரோ பாற்கடலுள்
பையத் துயின்ற பரமன் அடிபாடி
நெய்யுண்ணோம் பாலுண்ணோம் நாட்காலே நீராடி
மையிட்டு எழுதோம் மலரிட்டு நாம் முடியோம்
ஒய்யார மாடோம் ஒலிமணி தாழ்வோம்
தையல் நல்லாடை தலைவழியே ஒரீஇ
வையம் புகழ்ந்தாட வாரீரோ எம்பாவாய்.$$,
  'Thiruppavai, Pasuram 2', 'Tamil', 'Naalayira Divya Prabandham', 'Hindu'
),

-- Naalayira Divya Prabandham — Periyalwar Thirumozhi
(
  $$பல்லாண்டு பல்லாண்டு பல்லாயிரத்தாண்டு
பலகோடி நூறாயிரம் பல்லாண்டு
வல்லினை ஆழி வலம்புரி என்னும்
கல்லினை கால்களால் காத்தருள்வானே.$$,
  'Periyalwar Thirumozhi 1.1.1', 'Tamil', 'Naalayira Divya Prabandham', 'Hindu'
),

-- Naalayira Divya Prabandham — Tiruvoimozhi (Nammalwar)
(
  $$உயர்வற உயர்நலம் உடையவன் எவன் அவன்
மயர்வற மதிநலம் அருளினன் எவன் அவன்
அயர்வறும் அமரர்கள் அதிபதி எவன் அவன்
துயரறு சுடரடி தொழுது எழு என் மனனே.$$,
  'Tiruvoimozhi 1.1.1', 'Tamil', 'Naalayira Divya Prabandham', 'Hindu'
);

-- ============================================================
-- To add more verses later, just INSERT into the verses table
-- from the Supabase Table Editor or with SQL like:
--
-- insert into public.verses (text, source, language, collection, religion) values
--   ('verse text here', 'Source Name', 'Tamil', 'Thirukkural', 'Hindu');
-- ============================================================
