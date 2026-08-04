import type { Language, LanguageCode } from '@backend/domain/types'

export const LANGUAGE_CODES = [
  'en',
  'hi',
  'ta',
  'bn',
  'mr',
  'te',
  'kn',
  'gu',
  'pa',
  'ml',
] as const satisfies readonly LanguageCode[]

export const languages: Language[] = [
  { code: 'en', endonym: 'English', englishName: 'English', script: 'Latin', status: 'live' },
  { code: 'hi', endonym: 'हिन्दी', englishName: 'Hindi', script: 'Devanagari', status: 'live' },
  { code: 'ta', endonym: 'தமிழ்', englishName: 'Tamil', script: 'Tamil', status: 'live' },
  { code: 'bn', endonym: 'বাংলা', englishName: 'Bengali', script: 'Bengali', status: 'live' },
  { code: 'mr', endonym: 'मराठी', englishName: 'Marathi', script: 'Devanagari', status: 'live' },
  { code: 'te', endonym: 'తెలుగు', englishName: 'Telugu', script: 'Telugu', status: 'live' },
  { code: 'kn', endonym: 'ಕನ್ನಡ', englishName: 'Kannada', script: 'Kannada', status: 'pilot' },
  { code: 'gu', endonym: 'ગુજરાતી', englishName: 'Gujarati', script: 'Gujarati', status: 'pilot' },
  { code: 'pa', endonym: 'ਪੰਜਾਬੀ', englishName: 'Punjabi', script: 'Gurmukhi', status: 'pilot' },
  { code: 'ml', endonym: 'മലയാളം', englishName: 'Malayalam', script: 'Malayalam', status: 'pilot' },
]

export const DEFAULT_LANGUAGE: LanguageCode = 'en'

/** Localised sentence frames used when composing an explanation. */
export const phrasebook: Record<
  LanguageCode,
  {
    approved: string
    rejected: string
    manual_review: string
    flagged: string
    because: string
    helped: string
    hurt: string
    nextSteps: string
  }
> = {
  en: {
    approved: 'Your application was approved.',
    rejected: 'Your application could not be approved.',
    manual_review: 'Your application needs a manual check.',
    flagged: 'This transaction was held for a security check.',
    because: 'The main reasons were:',
    helped: 'worked in your favour',
    hurt: 'worked against the application',
    nextSteps: 'What you can do next:',
  },
  hi: {
    approved: 'आपका आवेदन स्वीकृत हो गया है।',
    rejected: 'आपका आवेदन स्वीकृत नहीं हो सका।',
    manual_review: 'आपके आवेदन की मैनुअल जाँच बाकी है।',
    flagged: 'सुरक्षा जाँच के लिए यह लेन-देन रोका गया है।',
    because: 'मुख्य कारण ये थे:',
    helped: 'आपके पक्ष में रहा',
    hurt: 'आवेदन के विरुद्ध रहा',
    nextSteps: 'आप आगे यह कर सकते हैं:',
  },
  ta: {
    approved: 'உங்கள் விண்ணப்பம் அனுமதிக்கப்பட்டது.',
    rejected: 'உங்கள் விண்ணப்பம் அனுமதிக்க முடியவில்லை.',
    manual_review: 'உங்கள் விண்ணப்பம் கைமுறையாக சரிபார்க்கப்பட வேண்டும்.',
    flagged: 'பாதுகாப்பு சோதனைக்காக இந்த பரிவர்த்தனை நிறுத்தப்பட்டது.',
    because: 'முக்கிய காரணங்கள்:',
    helped: 'உங்களுக்கு சாதகமாக இருந்தது',
    hurt: 'விண்ணப்பத்திற்கு எதிராக இருந்தது',
    nextSteps: 'அடுத்து நீங்கள் செய்யக்கூடியது:',
  },
  bn: {
    approved: 'আপনার আবেদন অনুমোদিত হয়েছে।',
    rejected: 'আপনার আবেদন অনুমোদন করা যায়নি।',
    manual_review: 'আপনার আবেদনটি হাতে যাচাই করা প্রয়োজন।',
    flagged: 'নিরাপত্তা যাচাইয়ের জন্য এই লেনদেন আটকে রাখা হয়েছে।',
    because: 'প্রধান কারণগুলি ছিল:',
    helped: 'আপনার পক্ষে ছিল',
    hurt: 'আবেদনের বিপক্ষে ছিল',
    nextSteps: 'আপনি এরপর যা করতে পারেন:',
  },
  mr: {
    approved: 'तुमचा अर्ज मंजूर झाला आहे.',
    rejected: 'तुमचा अर्ज मंजूर होऊ शकला नाही.',
    manual_review: 'तुमच्या अर्जाची स्वतंत्र तपासणी बाकी आहे.',
    flagged: 'सुरक्षा तपासणीसाठी हा व्यवहार थांबवला आहे.',
    because: 'मुख्य कारणे अशी होती:',
    helped: 'तुमच्या बाजूने राहिले',
    hurt: 'अर्जाच्या विरोधात राहिले',
    nextSteps: 'तुम्ही पुढे हे करू शकता:',
  },
  te: {
    approved: 'మీ దరఖాస్తు ఆమోదించబడింది.',
    rejected: 'మీ దరఖాస్తును ఆమోదించలేకపోయాము.',
    manual_review: 'మీ దరఖాస్తుకు మాన్యువల్ తనిఖీ అవసరం.',
    flagged: 'భద్రతా తనిఖీ కోసం ఈ లావాదేవీ నిలిపివేయబడింది.',
    because: 'ప్రధాన కారణాలు:',
    helped: 'మీకు అనుకూలంగా ఉంది',
    hurt: 'దరఖాస్తుకు వ్యతిరేకంగా ఉంది',
    nextSteps: 'మీరు తరువాత చేయగలిగేది:',
  },
  kn: {
    approved: 'ನಿಮ್ಮ ಅರ್ಜಿ ಅನುಮೋದನೆಯಾಗಿದೆ.',
    rejected: 'ನಿಮ್ಮ ಅರ್ಜಿಯನ್ನು ಅನುಮೋದಿಸಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ.',
    manual_review: 'ನಿಮ್ಮ ಅರ್ಜಿಗೆ ಕೈಯಿಂದ ಪರಿಶೀಲನೆ ಬೇಕಿದೆ.',
    flagged: 'ಸುರಕ್ಷತಾ ಪರಿಶೀಲನೆಗಾಗಿ ಈ ವ್ಯವಹಾರವನ್ನು ತಡೆಹಿಡಿಯಲಾಗಿದೆ.',
    because: 'ಮುಖ್ಯ ಕಾರಣಗಳು:',
    helped: 'ನಿಮ್ಮ ಪರವಾಗಿತ್ತು',
    hurt: 'ಅರ್ಜಿಯ ವಿರುದ್ಧವಾಗಿತ್ತು',
    nextSteps: 'ಮುಂದೆ ನೀವು ಮಾಡಬಹುದಾದದ್ದು:',
  },
  gu: {
    approved: 'તમારી અરજી મંજૂર થઈ છે.',
    rejected: 'તમારી અરજી મંજૂર થઈ શકી નથી.',
    manual_review: 'તમારી અરજીની જાતે તપાસ બાકી છે.',
    flagged: 'સુરક્ષા તપાસ માટે આ વ્યવહાર રોકવામાં આવ્યો છે.',
    because: 'મુખ્ય કારણો આ હતાં:',
    helped: 'તમારા પક્ષમાં રહ્યું',
    hurt: 'અરજી વિરુદ્ધ રહ્યું',
    nextSteps: 'તમે આગળ આ કરી શકો છો:',
  },
  pa: {
    approved: 'ਤੁਹਾਡੀ ਅਰਜ਼ੀ ਮਨਜ਼ੂਰ ਹੋ ਗਈ ਹੈ।',
    rejected: 'ਤੁਹਾਡੀ ਅਰਜ਼ੀ ਮਨਜ਼ੂਰ ਨਹੀਂ ਹੋ ਸਕੀ।',
    manual_review: 'ਤੁਹਾਡੀ ਅਰਜ਼ੀ ਦੀ ਹੱਥੀਂ ਜਾਂਚ ਬਾਕੀ ਹੈ।',
    flagged: 'ਸੁਰੱਖਿਆ ਜਾਂਚ ਲਈ ਇਹ ਲੈਣ-ਦੇਣ ਰੋਕਿਆ ਗਿਆ ਹੈ।',
    because: 'ਮੁੱਖ ਕਾਰਨ ਇਹ ਸਨ:',
    helped: 'ਤੁਹਾਡੇ ਹੱਕ ਵਿੱਚ ਰਿਹਾ',
    hurt: 'ਅਰਜ਼ੀ ਦੇ ਖਿਲਾਫ਼ ਰਿਹਾ',
    nextSteps: 'ਤੁਸੀਂ ਅੱਗੇ ਇਹ ਕਰ ਸਕਦੇ ਹੋ:',
  },
  ml: {
    approved: 'നിങ്ങളുടെ അപേക്ഷ അനുവദിച്ചു.',
    rejected: 'നിങ്ങളുടെ അപേക്ഷ അനുവദിക്കാൻ കഴിഞ്ഞില്ല.',
    manual_review: 'നിങ്ങളുടെ അപേക്ഷ നേരിട്ട് പരിശോധിക്കേണ്ടതുണ്ട്.',
    flagged: 'സുരക്ഷാ പരിശോധനയ്ക്കായി ഈ ഇടപാട് തടഞ്ഞുവച്ചിരിക്കുന്നു.',
    because: 'പ്രധാന കാരണങ്ങൾ:',
    helped: 'നിങ്ങൾക്ക് അനുകൂലമായിരുന്നു',
    hurt: 'അപേക്ഷയ്ക്ക് പ്രതികൂലമായിരുന്നു',
    nextSteps: 'അടുത്തതായി നിങ്ങൾക്ക് ചെയ്യാവുന്നത്:',
  },
}
