export interface Verse {
  text: string;
  source: string;
  language: 'Tamil' | 'Hindi' | 'Sanskrit';
}

export const VERSES: Verse[] = [
  // ── Bhagavad Gita (Sanskrit) — 12 verses ─────────────────────────────────
  {
    text: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    source: 'Bhagavad Gita 2.47',
    language: 'Sanskrit',
  },
  {
    text: 'न जायते म्रियते वा कदाचित्\nनायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे॥',
    source: 'Bhagavad Gita 2.20',
    language: 'Sanskrit',
  },
  {
    text: 'नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः।\nन चैनं क्लेदयन्त्यापो न शोषयति मारुतः॥',
    source: 'Bhagavad Gita 2.23',
    language: 'Sanskrit',
  },
  {
    text: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥',
    source: 'Bhagavad Gita 4.7',
    language: 'Sanskrit',
  },
  {
    text: 'परित्राणाय साधूनां विनाशाय च दुष्कृताम्।\nधर्मसंस्थापनार्थाय संभवामि युगे युगे॥',
    source: 'Bhagavad Gita 4.8',
    language: 'Sanskrit',
  },
  {
    text: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥',
    source: 'Bhagavad Gita 6.5',
    language: 'Sanskrit',
  },
  {
    text: 'मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय।\nमयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव॥',
    source: 'Bhagavad Gita 7.7',
    language: 'Sanskrit',
  },
  {
    text: 'यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः।\nस यत्प्रमाणं कुरुते लोकस्तदनुवर्तते॥',
    source: 'Bhagavad Gita 3.21',
    language: 'Sanskrit',
  },
  {
    text: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥',
    source: 'Bhagavad Gita 9.22',
    language: 'Sanskrit',
  },
  {
    text: 'यत्करोषि यदश्नासि यज्जुहोषि ददासि यत्।\nयत्तपस्यसि कौन्तेय तत्कुरुष्व मदर्पणम्॥',
    source: 'Bhagavad Gita 9.27',
    language: 'Sanskrit',
  },
  {
    text: 'अहमात्मा गुडाकेश सर्वभूताशयस्थितः।\nअहमादिश्च मध्यं च भूतानामन्त एव च॥',
    source: 'Bhagavad Gita 10.20',
    language: 'Sanskrit',
  },
  {
    text: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥',
    source: 'Bhagavad Gita 18.66',
    language: 'Sanskrit',
  },

  // ── Thirukkural (Tamil) — 15 verses ──────────────────────────────────────
  // Chapter 1 — Katavul Vaazhthu (In Praise of God)
  {
    text: 'அகர முதல எழுத்தெல்லாம் ஆதி\nபகவன் முதற்றே உலகு.',
    source: 'Thirukkural 1',
    language: 'Tamil',
  },
  {
    text: 'கற்றதனால் ஆய பயனென்கொல் வாலறிவன்\nநற்றாள் தொழாஅர் எனின்.',
    source: 'Thirukkural 2',
    language: 'Tamil',
  },
  {
    text: 'மலர்மிசை ஏகினான் மாணடி சேர்ந்தார்\nநிலமிசை நீடுவாழ் வார்.',
    source: 'Thirukkural 3',
    language: 'Tamil',
  },
  {
    text: 'வேண்டுதல் வேண்டாமை இலானடி சேர்ந்தார்க்கு\nயாண்டும் இடும்பை இல.',
    source: 'Thirukkural 4',
    language: 'Tamil',
  },
  {
    text: 'இருள்சேர் இருவினையும் சேரா இறைவன்\nபொருள்சேர் புகழ்புரிந்தார் மாட்டு.',
    source: 'Thirukkural 5',
    language: 'Tamil',
  },
  {
    text: 'பொறிவாயில் ஐந்தவித்தான் பொய்தீர் ஒழுக்க\nநெறிநின்றார் நீடுவாழ் வார்.',
    source: 'Thirukkural 6',
    language: 'Tamil',
  },
  {
    text: 'தனக்குவமை இல்லாதான் தாள்சேர்ந்தார்க்கு அல்லால்\nமனக்கவலை மாற்றல் அரிது.',
    source: 'Thirukkural 7',
    language: 'Tamil',
  },
  {
    text: 'அறவாழி அந்தணன் தாள்சேர்ந்தார்க் கல்லால்\nபிறவாழி நீந்தல் அரிது.',
    source: 'Thirukkural 8',
    language: 'Tamil',
  },
  {
    text: 'கோளில் பொறியில் குணமிலவே எண்குணத்தான்\nதாளை வணங்காத் தலை.',
    source: 'Thirukkural 9',
    language: 'Tamil',
  },
  {
    text: 'பிறவிப் பெருங்கடல் நீந்துவர் நீந்தார்\nஇறைவன் அடிசேரா தார்.',
    source: 'Thirukkural 10',
    language: 'Tamil',
  },
  // Chapter 2 — Vaan Sirappu (The Greatness of Rain)
  {
    text: 'வான்நின்று உலகம் வழங்கி வருதலால்\nதான்அமிழ்தம் என்றுணர்க வான்.',
    source: 'Thirukkural 11',
    language: 'Tamil',
  },
  // Chapter 3 — Neetham (Righteousness)
  {
    text: 'ஒழுக்கம் விழுப்பம் தரலான் ஒழுக்கம்\nஉயிரினும் ஓம்பப் படும்.',
    source: 'Thirukkural 21',
    language: 'Tamil',
  },
  // Chapter 40 — Kelviyunarvudaimai (Learning)
  {
    text: 'கற்க கசடறக் கற்பவை கற்றபின்\nநிற்க அதற்குத் தக.',
    source: 'Thirukkural 391',
    language: 'Tamil',
  },
  {
    text: 'எண்ணென்ப ஏனை எழுத்தென்ப இவ்விரண்டும்\nகண்ணென்ப வாழும் உயிர்க்கு.',
    source: 'Thirukkural 392',
    language: 'Tamil',
  },
  // Chapter 43 — Meiporul Unartal (Perceiving Truth)
  {
    text: 'எப்பொருள் யார்யார்வாய்க் கேட்பினும் அப்பொருள்\nமெய்ப்பொருள் காண்பதறிவு.',
    source: 'Thirukkural 423',
    language: 'Tamil',
  },

  // ── Naalayira Divya Prabandham (Tamil) — 4 verses ────────────────────────
  // Thiruppavai (Andal)
  {
    text: 'மார்கழித் திங்கள் மதிநிறைந்த நன்னாளால்\nநீராடப் போதுவீர் போதுமினோ நேரிழையீர்\nசீர்மல்கும் ஆய்ப்பாடிச் செல்வச் சிறுமீர்காள்\nகூர்வேல் கொடுந்தொழிலன் நந்தகோபன் குமரன்\nஏரார்ந்த கண்ணி யசோதை இளஞ்சிங்கம்\nகார்மேனி செங்கண் கதிர்மதியம் போல்முகத்தான்\nநாராயணனே நமக்கே பறை தருவான்\nபாரோர் புகழப் படிந்தேலோர் எம்பாவாய்.',
    source: 'Thiruppavai, Pasuram 1',
    language: 'Tamil',
  },
  {
    text: 'வையத்து வாழ்வீர்காள் நாமும் நம் பாவைக்கு\nசெய்யும் கிரிசைகள் கேளீரோ பாற்கடலுள்\nபையத் துயின்ற பரமன் அடிபாடி\nநெய்யுண்ணோம் பாலுண்ணோம் நாட்காலே நீராடி\nமையிட்டு எழுதோம் மலரிட்டு நாம் முடியோம்\nஒய்யார மாடோம் ஒலிமணி தாழ்வோம்\nதையல் நல்லாடை தலைவழியே ஒரீஇ\nவையம் புகழ்ந்தாட வாரீரோ எம்பாவாய்.',
    source: 'Thiruppavai, Pasuram 2',
    language: 'Tamil',
  },
  // Periyalwar Thirumozhi (Periyalwar)
  {
    text: 'பல்லாண்டு பல்லாண்டு பல்லாயிரத்தாண்டு\nபலகோடி நூறாயிரம் பல்லாண்டு\nவல்லினை ஆழி வலம்புரி என்னும்\nகல்லினை கால்களால் காத்தருள்வானே.',
    source: 'Periyalwar Thirumozhi 1.1.1',
    language: 'Tamil',
  },
  // Tiruvoimozhi (Nammalwar)
  {
    text: 'உயர்வற உயர்நலம் உடையவன் எவன் அவன்\nமயர்வற மதிநலம் அருளினன் எவன் அவன்\nஅயர்வறும் அமரர்கள் அதிபதி எவன் அவன்\nதுயரறு சுடரடி தொழுது எழு என் மனனே.',
    source: 'Tiruvoimozhi 1.1.1',
    language: 'Tamil',
  },
];

export function getRandomVerse(): Verse {
  return VERSES[Math.floor(Math.random() * VERSES.length)];
}
