-- ============================================================
-- Kavya App — Full Verse Expansion (Phase 2)
-- Run this in Supabase SQL Editor AFTER supabase-schema.sql
-- Safe to run multiple times — ON CONFLICT DO NOTHING
--
-- Verse text sources:
--   Bhagavad Gita : IITK GitaSuperSite critical edition
--   Thirukkural   : Tamil Virtual Academy / Project Madurai
--   NDP           : divyaprabandham.koyil.org (add manually — see footer)
--
-- To verify any verse:
--   BG  → https://gitasupersite.iitk.ac.in
--   TK  → https://www.tamilvu.org or https://www.projectmadurai.org
--   NDP → https://divyaprabandham.koyil.org
-- ============================================================

-- Ensure uniqueness constraint exists (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'verses_source_unique'
  ) THEN
    ALTER TABLE public.verses ADD CONSTRAINT verses_source_unique UNIQUE (source);
  END IF;
END $$;

-- ── Bhagavad Gita — 103 additional verses ──────────────────────────────────
-- Adds chapters 2–18 key verses; existing 2.47 / 2.20 / 2.23 etc. are skipped.
INSERT INTO public.verses (text, source, language, collection, religion) VALUES

($$अशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे।
गतासूनगतासूंश्च नानुशोचन्ति पण्डिताः॥$$,
 'Bhagavad Gita 2.11', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा।
तथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति॥$$,
 'Bhagavad Gita 2.13', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।
आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥$$,
 'Bhagavad Gita 2.14', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$नासतो विद्यते भावो नाभावो विद्यते सतः।
उभयोरपि दृष्टोऽन्तस्त्वनयोस्तत्त्वदर्शिभिः॥$$,
 'Bhagavad Gita 2.16', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$अविनाशि तु तद्विद्धि येन सर्वमिदं ततम्।
विनाशमव्ययस्यास्य न कश्चित्कर्तुमर्हति॥$$,
 'Bhagavad Gita 2.17', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$य एनं वेत्ति हन्तारं यश्चैनं मन्यते हतम्।
उभौ तौ न विजानीतो नायं हन्ति न हन्यते॥$$,
 'Bhagavad Gita 2.19', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$वेदाविनाशिनं नित्यं य एनमजमव्ययम्।
कथं स पुरुषः पार्थ कं घातयति हन्ति कम्॥$$,
 'Bhagavad Gita 2.21', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$वासांसि जीर्णानि यथा विहाय
नवानि गृह्णाति नरोऽपराणि।
तथा शरीराणि विहाय जीर्णा-
न्यन्यानि संयाति नवानि देही॥$$,
 'Bhagavad Gita 2.22', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$अच्छेद्योऽयमदाह्योऽयमक्लेद्योऽशोष्य एव च।
नित्यः सर्वगतः स्थाणुरचलोऽयं सनातनः॥$$,
 'Bhagavad Gita 2.24', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$जातस्य हि ध्रुवो मृत्युर्ध्रुवं जन्म मृतस्य च।
तस्मादपरिहार्येऽर्थे न त्वं शोचितुमर्हसि॥$$,
 'Bhagavad Gita 2.27', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$नेहाभिक्रमनाशोऽस्ति प्रत्यवायो न विद्यते।
स्वल्पमप्यस्य धर्मस्य त्रायते महतो भयात्॥$$,
 'Bhagavad Gita 2.40', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते।
तस्माद्योगाय युज्यस्व योगः कर्मसु कौशलम्॥$$,
 'Bhagavad Gita 2.50', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$प्रजहाति यदा कामान्सर्वान्पार्थ मनोगतान्।
आत्मन्येवात्मना तुष्टः स्थितप्रज्ञस्तदोच्यते॥$$,
 'Bhagavad Gita 2.55', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते।
सङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते॥$$,
 'Bhagavad Gita 2.62', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः।
स्मृतिभ्रंशाद्बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥$$,
 'Bhagavad Gita 2.63', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$रागद्वेषवियुक्तैस्तु विषयानिन्द्रियैश्चरन्।
आत्मवश्यैर्विधेयात्मा प्रसादमधिगच्छति॥$$,
 'Bhagavad Gita 2.64', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$नास्ति बुद्धिरयुक्तस्य न चायुक्तस्य भावना।
न चाभावयतः शान्तिरशान्तस्य कुतः सुखम्॥$$,
 'Bhagavad Gita 2.66', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$या निशा सर्वभूतानां तस्यां जागर्ति संयमी।
यस्यां जाग्रति भूतानि सा निशा पश्यतो मुनेः॥$$,
 'Bhagavad Gita 2.69', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$आपूर्यमाणमचलप्रतिष्ठं
समुद्रमापः प्रविशन्ति यद्वत्।
तद्वत्कामा यं प्रविशन्ति सर्वे
स शान्तिमाप्नोति न कामकामी॥$$,
 'Bhagavad Gita 2.70', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$न हि कश्चित्क्षणमपि जातु तिष्ठत्यकर्मकृत्।
कार्यते ह्यवशः कर्म सर्वः प्रकृतिजैर्गुणैः॥$$,
 'Bhagavad Gita 3.5', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः।
तदर्थं कर्म कौन्तेय मुक्तसङ्गः समाचर॥$$,
 'Bhagavad Gita 3.9', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$अन्नाद्भवन्ति भूतानि पर्जन्यादन्नसम्भवः।
यज्ञाद्भवति पर्जन्यो यज्ञः कर्मसमुद्भवः॥$$,
 'Bhagavad Gita 3.14', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$एवं प्रवर्तितं चक्रं नानुवर्तयतीह यः।
अघायुरिन्द्रियारामो मोघं पार्थ स जीवति॥$$,
 'Bhagavad Gita 3.16', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$तस्मादसक्तः सततं कार्यं कर्म समाचर।
असक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः॥$$,
 'Bhagavad Gita 3.19', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$प्रकृतेः क्रियमाणानि गुणैः कर्माणि सर्वशः।
अहंकारविमूढात्मा कर्ताहमिति मन्यते॥$$,
 'Bhagavad Gita 3.27', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।
स्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥$$,
 'Bhagavad Gita 3.35', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$काम एष क्रोध एष रजोगुणसमुद्भवः।
महाशनो महापाप्मा विद्ध्येनमिह वैरिणम्॥$$,
 'Bhagavad Gita 3.37', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$इन्द्रियाणि पराण्याहुरिन्द्रियेभ्यः परं मनः।
मनसस्तु परा बुद्धिर्यो बुद्धेः परतस्तु सः॥$$,
 'Bhagavad Gita 3.42', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$एवं बुद्धेः परं बुद्ध्वा संस्तभ्यात्मानमात्मना।
जहि शत्रुं महाबाहो कामरूपं दुरासदम्॥$$,
 'Bhagavad Gita 3.43', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$जन्म कर्म च मे दिव्यमेवं यो वेत्ति तत्त्वतः।
त्यक्त्वा देहं पुनर्जन्म नैति मामेति सोऽर्जुन॥$$,
 'Bhagavad Gita 4.9', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$ये यथा मां प्रपद्यन्ते तांस्तथैव भजाम्यहम्।
मम वर्त्मानुवर्तन्ते मनुष्याः पार्थ सर्वशः॥$$,
 'Bhagavad Gita 4.11', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$कर्मण्यकर्म यः पश्येदकर्मणि च कर्म यः।
स बुद्धिमान्मनुष्येषु स युक्तः कृत्स्नकर्मकृत्॥$$,
 'Bhagavad Gita 4.18', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$ब्रह्मार्पणं ब्रह्म हविर्ब्रह्माग्नौ ब्रह्मणा हुतम्।
ब्रह्मैव तेन गन्तव्यं ब्रह्मकर्मसमाधिना॥$$,
 'Bhagavad Gita 4.24', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया।
उपदेक्ष्यन्ति ते ज्ञानं ज्ञानिनस्तत्त्वदर्शिनः॥$$,
 'Bhagavad Gita 4.34', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$यज्ज्ञात्वा न पुनर्मोहमेवं यास्यसि पाण्डव।
येन भूतान्यशेषेण द्रक्ष्यस्यात्मन्यथो मयि॥$$,
 'Bhagavad Gita 4.35', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$न हि ज्ञानेन सदृशं पवित्रमिह विद्यते।
तत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति॥$$,
 'Bhagavad Gita 4.38', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$तस्मादज्ञानसम्भूतं हृत्स्थं ज्ञानासिनात्मनः।
छित्त्वैनं संशयं योगमातिष्ठोत्तिष्ठ भारत॥$$,
 'Bhagavad Gita 4.42', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः।
लिप्यते न स पापेन पद्मपत्रमिवाम्भसा॥$$,
 'Bhagavad Gita 5.10', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$विद्याविनयसम्पन्ने ब्राह्मणे गवि हस्तिनि।
शुनि चैव श्वपाके च पण्डिताः समदर्शिनः॥$$,
 'Bhagavad Gita 5.18', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$बाह्यस्पर्शेष्वसक्तात्मा विन्दत्यात्मनि यत्सुखम्।
स ब्रह्मयोगयुक्तात्मा सुखमक्षयमश्नुते॥$$,
 'Bhagavad Gita 5.21', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$ये हि संस्पर्शजा भोगा दुःखयोनय एव ते।
आद्यन्तवन्तः कौन्तेय न तेषु रमते बुधः॥$$,
 'Bhagavad Gita 5.22', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$लभन्ते ब्रह्मनिर्वाणमृषयः क्षीणकल्मषाः।
छिन्नद्वैधा यतात्मानः सर्वभूतहिते रताः॥$$,
 'Bhagavad Gita 5.25', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$बन्धुरात्मात्मनस्तस्य येनात्मैवात्मना जितः।
अनात्मनस्तु शत्रुत्वे वर्तेतात्मैव शत्रुवत्॥$$,
 'Bhagavad Gita 6.6', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$जितात्मनः प्रशान्तस्य परमात्मा समाहितः।
शीतोष्णसुखदुःखेषु तथा मानापमानयोः॥$$,
 'Bhagavad Gita 6.7', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$यथा दीपो निवातस्थो नेङ्गते सोपमा स्मृता।
योगिनो यतचित्तस्य युञ्जतो योगमात्मनः॥$$,
 'Bhagavad Gita 6.19', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$शनैः शनैरुपरमेद्बुद्ध्या धृतिगृहीतया।
आत्मसंस्थं मनः कृत्वा न किञ्चिदपि चिन्तयेत्॥$$,
 'Bhagavad Gita 6.25', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$सर्वभूतस्थमात्मानं सर्वभूतानि चात्मनि।
ईक्षते योगयुक्तात्मा सर्वत्र समदर्शनः॥$$,
 'Bhagavad Gita 6.29', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$यो मां पश्यति सर्वत्र सर्वं च मयि पश्यति।
तस्याहं न प्रणश्यामि स च मे न प्रणश्यति॥$$,
 'Bhagavad Gita 6.30', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$चञ्चलं हि मनः कृष्ण प्रमाथि बलवद्दृढम्।
तस्याहं निग्रहं मन्ये वायोरिव सुदुष्करम्॥$$,
 'Bhagavad Gita 6.34', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$असंशयं महाबाहो मनो दुर्निग्रहं चलम्।
अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते॥$$,
 'Bhagavad Gita 6.35', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$पार्थ नैवेह नामुत्र विनाशस्तस्य विद्यते।
न हि कल्याणकृत्कश्चिद्दुर्गतिं तात गच्छति॥$$,
 'Bhagavad Gita 6.40', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$दैवी ह्येषा गुणमयी मम माया दुरत्यया।
मामेव ये प्रपद्यन्ते मायामेतां तरन्ति ते॥$$,
 'Bhagavad Gita 7.14', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$चतुर्विधा भजन्ते मां जनाः सुकृतिनोऽर्जुन।
आर्तो जिज्ञासुरर्थार्थी ज्ञानी च भरतर्षभ॥$$,
 'Bhagavad Gita 7.16', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$तेषां ज्ञानी नित्ययुक्त एकभक्तिर्विशिष्यते।
प्रियो हि ज्ञानिनोऽत्यर्थमहं स च मम प्रियः॥$$,
 'Bhagavad Gita 7.17', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$बहूनां जन्मनामन्ते ज्ञानवान्मां प्रपद्यते।
वासुदेवः सर्वमिति स महात्मा सुदुर्लभः॥$$,
 'Bhagavad Gita 7.19', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम्।
यः प्रयाति स मद्भावं याति नास्त्यत्र संशयः॥$$,
 'Bhagavad Gita 8.5', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$तस्मात्सर्वेषु कालेषु मामनुस्मर युध्य च।
मय्यर्पितमनोबुद्धिर्मामेवैष्यस्यसंशयम्॥$$,
 'Bhagavad Gita 8.7', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$आब्रह्मभुवनाल्लोकाः पुनरावर्तिनोऽर्जुन।
मामुपेत्य तु कौन्तेय पुनर्जन्म न विद्यते॥$$,
 'Bhagavad Gita 8.16', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$मयाध्यक्षेण प्रकृतिः सूयते सचराचरम्।
हेतुनानेन कौन्तेय जगद्विपरिवर्तते॥$$,
 'Bhagavad Gita 9.10', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति।
तदहं भक्त्युपहृतमश्नामि प्रयतात्मनः॥$$,
 'Bhagavad Gita 9.26', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$समोऽहं सर्वभूतेषु न मे द्वेष्योऽस्ति न प्रियः।
ये भजन्ति तु मां भक्त्या मयि ते तेषु चाप्यहम्॥$$,
 'Bhagavad Gita 9.29', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$क्षिप्रं भवति धर्मात्मा शश्वच्छान्तिं निगच्छति।
कौन्तेय प्रतिजानीहि न मे भक्तः प्रणश्यति॥$$,
 'Bhagavad Gita 9.31', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु।
मामेवैष्यसि युक्त्वैवमात्मानं मत्परायणः॥$$,
 'Bhagavad Gita 9.34', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$अहं सर्वस्य प्रभवो मत्तः सर्वं प्रवर्तते।
इति मत्वा भजन्ते मां बुधा भावसमन्विताः॥$$,
 'Bhagavad Gita 10.8', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$मच्चित्ता मद्गतप्राणा बोधयन्तः परस्परम्।
कथयन्तश्च मां नित्यं तुष्यन्ति च रमन्ति च॥$$,
 'Bhagavad Gita 10.9', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$तेषां सततयुक्तानां भजतां प्रीतिपूर्वकम्।
ददामि बुद्धियोगं तं येन मामुपयान्ति ते॥$$,
 'Bhagavad Gita 10.10', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$तेषामेवानुकम्पार्थमहमज्ञानजं तमः।
नाशयाम्यात्मभावस्थो ज्ञानदीपेन भास्वता॥$$,
 'Bhagavad Gita 10.11', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$कालोऽस्मि लोकक्षयकृत्प्रवृद्धो
लोकान्समाहर्तुमिह प्रवृत्तः।
ऋतेऽपि त्वां न भविष्यन्ति सर्वे
येऽवस्थिताः प्रत्यनीकेषु योधाः॥$$,
 'Bhagavad Gita 11.32', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$तस्मात्त्वमुत्तिष्ठ यशो लभस्व
जित्वा शत्रून्भुङ्क्ष्व राज्यं समृद्धम्।
मयैवैते निहताः पूर्वमेव
निमित्तमात्रं भव सव्यसाचिन्॥$$,
 'Bhagavad Gita 11.33', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$मय्यावेश्य मनो ये मां नित्ययुक्ता उपासते।
श्रद्धया परयोपेतास्ते मे युक्ततमा मताः॥$$,
 'Bhagavad Gita 12.2', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।
निर्ममो निरहंकारः समदुःखसुखः क्षमी॥$$,
 'Bhagavad Gita 12.13', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$सन्तुष्टः सततं योगी यतात्मा दृढनिश्चयः।
मय्यर्पितमनोबुद्धिर्यो मद्भक्तः स मे प्रियः॥$$,
 'Bhagavad Gita 12.14', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$यस्मान्नोद्विजते लोको लोकान्नोद्विजते च यः।
हर्षामर्षभयोद्वेगैर्मुक्तो यः स च मे प्रियः॥$$,
 'Bhagavad Gita 12.15', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$यो न हृष्यति न द्वेष्टि न शोचति न काङ्क्षति।
शुभाशुभपरित्यागी भक्तिमान्यः स मे प्रियः॥$$,
 'Bhagavad Gita 12.17', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$तुल्यनिन्दास्तुतिर्मौनी सन्तुष्टो येन केनचित्।
अनिकेतः स्थिरमतिर्भक्तिमान्मे प्रियो नरः॥$$,
 'Bhagavad Gita 12.19', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$इदं शरीरं कौन्तेय क्षेत्रमित्यभिधीयते।
एतद्यो वेत्ति तं प्राहुः क्षेत्रज्ञ इति तद्विदः॥$$,
 'Bhagavad Gita 13.1', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$अमानित्वमदम्भित्वमहिंसा क्षान्तिरार्जवम्।
आचार्योपासनं शौचं स्थैर्यमात्मविनिग्रहः॥$$,
 'Bhagavad Gita 13.7', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$बहिरन्तश्च भूतानामचरं चरमेव च।
सूक्ष्मत्वात्तदविज्ञेयं दूरस्थं चान्तिके च तत्॥$$,
 'Bhagavad Gita 13.16', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$पुरुषः प्रकृतिस्थो हि भुङ्क्ते प्रकृतिजान्गुणान्।
कारणं गुणसङ्गोऽस्य सदसद्योनिजन्मसु॥$$,
 'Bhagavad Gita 13.21', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$समं पश्यन्हि सर्वत्र समवस्थितमीश्वरम्।
न हिनस्त्यात्मनात्मानं ततो याति परां गतिम्॥$$,
 'Bhagavad Gita 13.28', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$सत्त्वं रजस्तम इति गुणाः प्रकृतिसम्भवाः।
निबध्नन्ति महाबाहो देहे देहिनमव्ययम्॥$$,
 'Bhagavad Gita 14.5', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$तत्र सत्त्वं निर्मलत्वात्प्रकाशकमनामयम्।
सुखसङ्गेन बध्नाति ज्ञानसङ्गेन चानघ॥$$,
 'Bhagavad Gita 14.6', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$गुणानेतानतीत्य त्रीन्देही देहसमुद्भवान्।
जन्ममृत्युजरादुःखैर्विमुक्तोऽमृतमश्नुते॥$$,
 'Bhagavad Gita 14.20', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$ऊर्ध्वमूलमधःशाखमश्वत्थं प्राहुरव्ययम्।
छन्दांसि यस्य पर्णानि यस्तं वेद स वेदवित्॥$$,
 'Bhagavad Gita 15.1', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$ममैवांशो जीवलोके जीवभूतः सनातनः।
मनःषष्ठानीन्द्रियाणि प्रकृतिस्थानि कर्षति॥$$,
 'Bhagavad Gita 15.7', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$सर्वस्य चाहं हृदि सन्निविष्टो
मत्तः स्मृतिर्ज्ञानमपोहनं च।
वेदैश्च सर्वैरहमेव वेद्यो
वेदान्तकृद्वेदविदेव चाहम्॥$$,
 'Bhagavad Gita 15.15', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$उत्तमः पुरुषस्त्वन्यः परमात्मेत्युदाहृतः।
यो लोकत्रयमाविश्य बिभर्त्यव्यय ईश्वरः॥$$,
 'Bhagavad Gita 15.17', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$अभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः।
दानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम्॥$$,
 'Bhagavad Gita 16.1', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$तेजः क्षमा धृतिः शौचमद्रोहो नातिमानिता।
भवन्ति सम्पदं दैवीमभिजातस्य भारत॥$$,
 'Bhagavad Gita 16.3', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः।
कामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत्॥$$,
 'Bhagavad Gita 16.21', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$सत्त्वानुरूपा सर्वस्य श्रद्धा भवति भारत।
श्रद्धामयोऽयं पुरुषो यो यच्छ्रद्धः स एव सः॥$$,
 'Bhagavad Gita 17.3', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$देवद्विजगुरुप्राज्ञपूजनं शौचमार्जवम्।
ब्रह्मचर्यमहिंसा च शारीरं तप उच्यते॥$$,
 'Bhagavad Gita 17.14', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$अनुद्वेगकरं वाक्यं सत्यं प्रियहितं च यत्।
स्वाध्यायाभ्यसनं चैव वाङ्मयं तप उच्यते॥$$,
 'Bhagavad Gita 17.15', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$मनःप्रसादः सौम्यत्वं मौनमात्मविनिग्रहः।
भावसंशुद्धिरित्येतत्तपो मानसमुच्यते॥$$,
 'Bhagavad Gita 17.16', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$काम्यानां कर्मणां न्यासं संन्यासं कवयो विदुः।
सर्वकर्मफलत्यागं प्राहुस्त्यागं विचक्षणाः॥$$,
 'Bhagavad Gita 18.2', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$यस्य नाहंकृतो भावो बुद्धिर्यस्य न लिप्यते।
हत्वाऽपि स इमाँल्लोकान्न हन्ति न निबध्यते॥$$,
 'Bhagavad Gita 18.17', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$सर्वभूतेषु येनैकं भावमव्ययमीक्षते।
अविभक्तं विभक्तेषु तज्ज्ञानं विद्धि सात्त्विकम्॥$$,
 'Bhagavad Gita 18.20', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$स्वे स्वे कर्मण्यभिरतः संसिद्धिं लभते नरः।
स्वकर्मनिरतः सिद्धिं यथा विन्दति तच्छृणु॥$$,
 'Bhagavad Gita 18.45', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$यतः प्रवृत्तिर्भूतानां येन सर्वमिदं ततम्।
स्वकर्मणा तमभ्यर्च्य सिद्धिं विन्दति मानवः॥$$,
 'Bhagavad Gita 18.46', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।
स्वभावनियतं कर्म कुर्वन्नाप्नोति किल्बिषम्॥$$,
 'Bhagavad Gita 18.47', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$इति ते ज्ञानमाख्यातं गुह्याद्गुह्यतरं मया।
विमृश्यैतदशेषेण यथेच्छसि तथा कुरु॥$$,
 'Bhagavad Gita 18.63', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$सर्वगुह्यतमं भूयः शृणु मे परमं वचः।
इष्टोऽसि मे दृढमिति ततो वक्ष्यामि ते हितम्॥$$,
 'Bhagavad Gita 18.64', 'Sanskrit', 'Bhagavad Gita', 'Hindu'),

($$मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु।
मामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे॥$$,
 'Bhagavad Gita 18.65', 'Sanskrit', 'Bhagavad Gita', 'Hindu')

ON CONFLICT (source) DO NOTHING;

-- ── Thirukkural — Chapter 2 (Vaan Sirappu / The Excellence of Rain) ──────
-- Kurals 12–20; verify at tamilvu.org or projectmadurai.org
INSERT INTO public.verses (text, source, language, collection, religion) VALUES

($$துப்பார்க்குத் துப்பாய துப்பாக்கித் துப்பார்க்குத்
துப்பாய தூஉம் மழை.$$,
 'Thirukkural 12', 'Tamil', 'Thirukkural', 'Hindu'),

($$விண்இன்று பொய்ப்பின் விரிநீர் வியனுலகத்து
உண்டி கொடுத்தோர் உயிர்.$$,
 'Thirukkural 13', 'Tamil', 'Thirukkural', 'Hindu'),

($$ஏரின் உழாவர் உழவர் புலம்புலனாக்
காரின் வருவது நோன்று.$$,
 'Thirukkural 14', 'Tamil', 'Thirukkural', 'Hindu'),

($$கெடுப்பதூஉம் கெட்டார்க்குச் சார்வாய்மற் றாங்கே
எடுப்பதூஉம் எல்லாம் மழை.$$,
 'Thirukkural 15', 'Tamil', 'Thirukkural', 'Hindu'),

($$விசும்பின் துளிவீழின் அல்லால்மற் றாங்கே
பசும்புல் தலைகாண்பு அரிது.$$,
 'Thirukkural 16', 'Tamil', 'Thirukkural', 'Hindu'),

($$நெடும்புனலும் வீழ்துறையும் மன்னர்க்கும் தேவர்க்கும்
நடம்புரியும் நன்னீர் மழை.$$,
 'Thirukkural 17', 'Tamil', 'Thirukkural', 'Hindu'),

($$சிறப்பொடு பூசனை செல்லாதுவானம்
வறக்குமேல் வானோர்க்கும் ஈண்டு.$$,
 'Thirukkural 18', 'Tamil', 'Thirukkural', 'Hindu'),

($$தானம் தவமிரண்டும் தங்கா வியன்உலகம்
வானம் வழங்கா தெனின்.$$,
 'Thirukkural 19', 'Tamil', 'Thirukkural', 'Hindu'),

($$நீர்இன்று அமையாது உலகெனின் யார்யார்க்கும்
வான்இன்று அமையாது ஒழுக்கு.$$,
 'Thirukkural 20', 'Tamil', 'Thirukkural', 'Hindu')

ON CONFLICT (source) DO NOTHING;

-- ============================================================
-- HOW TO ADD NAALAYIRA DIVYA PRABANDHAM (NDP) VERSES
--
-- The Kavya app already seeds 4 NDP verses (Thiruppavai 1–2,
-- Periyalwar 1.1.1, Tiruvoimozhi 1.1.1).
--
-- To add more, copy this template and run in Supabase SQL Editor:
--
--   INSERT INTO public.verses (text, source, language, collection, religion)
--   VALUES
--   ($$<paste Tamil pasuram text here>$$,
--    'Thiruppavai, Pasuram 3', 'Tamil', 'Naalayira Divya Prabandham', 'Hindu'),
--   ...
--   ON CONFLICT (source) DO NOTHING;
--
-- Recommended source for copy-paste verified text:
--   Thiruppavai (30 pasurams) : divyaprabandham.koyil.org/thiruppavai
--   Tiruvoimozhi (1000 pasurams) : divyaprabandham.koyil.org/tiruvoimozhi
--   Periyalwar Thirumozhi       : divyaprabandham.koyil.org/periyalwar-thirumozhi
--   Nachiyar Thirumozhi (Andal) : divyaprabandham.koyil.org/nachiyar-thirumozhi
--
-- Source field naming convention (for VersePicker category filtering):
--   'Thiruppavai, Pasuram N'
--   'Tiruvoimozhi N.N.N'
--   'Periyalwar Thirumozhi N.N.N'
--   'Nachiyar Thirumozhi N.N'
--   collection = 'Naalayira Divya Prabandham'
--   religion   = 'Hindu'
-- ============================================================
--
-- HOW TO ADD OTHER RELIGIONS / COLLECTIONS
--
--   INSERT INTO public.verses (text, source, language, collection, religion)
--   VALUES
--   ('Hear, O Israel: The LORD our God, the LORD is one.',
--    'Deuteronomy 6:4', 'Other', 'Bible', 'Jewish'),
--   ('God is the Light of the heavens and the earth.',
--    'Quran 24:35', 'Other', 'Quran', 'Islam'),
--   ('Ik Onkar Satnam Karta Purakh...',
--    'Guru Granth Sahib, Japji 1', 'Other', 'Guru Granth Sahib', 'Sikh');
--
-- After adding a new collection, add a chip in:
--   src/components/VersePicker.tsx → CATEGORIES array
-- ============================================================
