export const SEGMENTS = [
  {
    id: 1, source: "Save your progress before exiting the game.",
    correct: "Spremite svoj napredak prije izlaska iz igre.",
    variants: [
      { target: "Spremite svoj napredak prije izlaska.", hasError: true, category: "Accuracy", subcategory: "Omission", severity: "Major", explanation: "'Iz igre' (from the game) was omitted." },
      { target: "Sačuvajte svoj napredak prije izlaska iz igre.", hasError: true, category: "Compliance", subcategory: "Glossary not used", severity: "Minor", explanation: "'Sačuvajte' is non-standard -- 'Spremite' is the approved term." },
      { target: "Spremite svoj napredak prije izlaska iz igre.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Accurate and natural." },
    ]
  },
  {
    id: 2, source: "Your account has been deleted due to suspicious activity.",
    correct: "Vaš je račun izbrisan zbog sumnjive aktivnosti.",
    variants: [
      { target: "Vaš je račun izbrisan zbog sumnjive aktivnosti.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Accurate and natural." },
      { target: "Vaš je račun izbrisan zbog sumljive aktivnosti.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "'Sumljive' is misspelled -- should be 'sumnjive'." },
      { target: "Vaš je račun izbrisan zbog sumnjive aktivnosti", hasError: true, category: "Language", subcategory: "Punctuation", severity: "Minor", explanation: "Missing full stop at the end of the sentence." },
    ]
  },
  {
    id: 3, source: "Collect all 5 crystals to unlock the final level.",
    correct: "Sakupi svih 5 kristala za otključavanje završne razine.",
    variants: [
      { target: "Sakupi svih 5 kristala za otključavanje završne razine.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Clean and accurate." },
      { target: "Sakupi sve 5 kristale za otključavanje završne razine.", hasError: true, category: "Language", subcategory: "Grammar/Syntax", severity: "Minor", explanation: "'Sve 5 kristale' is incorrect -- should be 'svih 5 kristala' (genitive plural)." },
      { target: "Sakupi svih 5 kristala za otkljucavanje završne razine.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "'Otkljucavanje' is missing the diacritic -- should be 'otključavanje'." },
    ]
  },
  {
    id: 4, source: "Warning: Low battery. Charge your device.",
    correct: "Upozorenje: Baterija je slaba. Napunite svoj uređaj.",
    variants: [
      { target: "Upozorenje: Baterija je slaba. Napunite vaš uređaj.", hasError: true, category: "Language", subcategory: "Grammar/Syntax", severity: "Minor", explanation: "'Vaš uređaj' should be 'svoj uređaj' -- the reflexive possessive is required when the possessor is the subject of the imperative." },
      { target: "Upozorenje Baterija je slaba. Napunite svoj uređaj.", hasError: true, category: "Language", subcategory: "Punctuation", severity: "Minor", explanation: "Missing colon after 'Upozorenje'." },
      { target: "Upozorenje: Baterija je slaba. Napunite svoj uređaj.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Clean and accurate." },
    ]
  },
  {
    id: 5, source: "Are you sure you want to delete this character?",
    correct: "Jeste li sigurni da želite izbrisati ovog lika?",
    variants: [
      { target: "Jeste li sigurni da želite izbrisati ovog lika?", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Accurate and natural." },
      { target: "Jeste li sigurni da želite izbrisati ovog lika", hasError: true, category: "Language", subcategory: "Punctuation", severity: "Minor", explanation: "Missing question mark at the end." },
      { target: "Jeste li sigurni da želite obrisati ovog lika?", hasError: true, category: "Compliance", subcategory: "Glossary not used", severity: "Minor", explanation: "'Obrisati' is non-standard here -- 'izbrisati' is the approved term." },
    ]
  },
  {
    id: 6, source: "Complete the mission to earn 500 gold coins.",
    correct: "Završi misiju da zaradiš 500 zlatnika.",
    variants: [
      { target: "Završi misiju da zaradiš 500 zlatnika.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Accurate and natural." },
      { target: "Završi misiju da zaradiš 5000 zlatnika.", hasError: true, category: "Accuracy", subcategory: "Numbers", severity: "Critical", explanation: "500 was changed to 5000 -- a critical number error." },
    ]
  },
  {
    id: 7, source: "Hey! You totally crushed that level!",
    correct: "Hej! Izvrsno si savladao tu razinu!",
    variants: [
      { target: "Hej! Izvrsno ste savladali tu razinu!", hasError: true, category: "Style", subcategory: "Wrong register", severity: "Major", explanation: "Casual 'Hey!' source needs informal 'si' form -- 'ste' is too formal." },
      { target: "Hej Izvrsno si savladao tu razinu!", hasError: true, category: "Language", subcategory: "Punctuation", severity: "Minor", explanation: "Missing exclamation mark after 'Hej'." },
      { target: "Hej! Izvrsno si savladao tu razinu!", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Casual tone matches source." },
    ]
  },
  {
    id: 8, source: "The sword deals 120 damage per hit.",
    correct: "Mač nanosi 120 štete po udarcu.",
    variants: [
      { target: "Mač nanosi 120 štete po udarcu.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Accurate and natural." },
      { target: "Mač nanosi 1200 štete po udarcu.", hasError: true, category: "Accuracy", subcategory: "Numbers", severity: "Critical", explanation: "120 was changed to 1200 -- a critical number error." },
    ]
  },
  {
    id: 9, source: "Members can access the shared inventory.",
    correct: "Članovi mogu pristupiti dijeljenom inventaru.",
    variants: [
      { target: "Članovi mogu pristupiti dijeljenom inventaru.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Clean and accurate." },
      { target: "Članovi mogu pristupiti dijeljenom inventaru ceha.", hasError: true, category: "Accuracy", subcategory: "Addition", severity: "Minor", explanation: "'Ceha' (guild) was added -- not present in the source." },
      { target: "Članovi mogu pristupti dijeljenom inventaru.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "'Pristupti' is a typo -- should be 'pristupiti'." },
    ]
  },
  {
    id: 10, source: "Press START to begin the adventure.",
    correct: "Pritisnite START za početak avanture.",
    variants: [
      { target: "Pritisnite START za početak avanture.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Accurate and natural." },
      { target: "Pritisnite START za početak avanture", hasError: true, category: "Language", subcategory: "Punctuation", severity: "Minor", explanation: "Missing full stop at the end." },
    ]
  },
  {
    id: 11, source: "The potion restores 50 points instantly.",
    correct: "Napitak odmah vraća 50 bodova.",
    variants: [
      { target: "Napitak odmah vraća 50 bodova.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Clean and accurate." },
      { target: "Napitak odmah vraća 500 bodova.", hasError: true, category: "Accuracy", subcategory: "Numbers", severity: "Critical", explanation: "50 was changed to 500 -- a critical number error." },
      { target: "Napitak odmah vraca 50 bodova.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "'Vraca' is missing the diacritic -- should be 'vraća'." },
    ]
  },
  {
    id: 12, source: "You are disconnected.",
    correct: "Odspojeni ste.",
    variants: [
      { target: "Otspojen ste.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "'Otspojen' is misspelled -- should be 'Odspojeni'." },
      { target: "Odspojeni ste.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Clean and accurate." },
      { target: "Odspojeni ste", hasError: true, category: "Language", subcategory: "Punctuation", severity: "Minor", explanation: "Missing full stop at the end." },
    ]
  },
  {
    id: 13, source: "Invite your friends and earn bonus rewards!",
    correct: "Pozovi svoje prijatelje i osvoji bonus nagrade!",
    variants: [
      { target: "Pozovi svoje prijatelje i osvoji bonus nagrade!", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Natural and accurate." },
      { target: "Pozovi svoje prijatelje i osvoji bonus nagrade", hasError: true, category: "Language", subcategory: "Punctuation", severity: "Minor", explanation: "Missing exclamation mark at the end." },
      { target: "Pozovi prijatelje i osvoji bonus nagrade!", hasError: true, category: "Accuracy", subcategory: "Omission", severity: "Minor", explanation: "'Svoje' (your) was omitted." },
    ]
  },
  {
    id: 14, source: "New season starts on December 25th.",
    correct: "Nova sezona počinje 25. prosinca.",
    variants: [
      { target: "Nova sezona počinje 25. prosinca.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Date correctly formatted for Croatian." },
      { target: "Nova sezona počinje 25 prosinca.", hasError: true, category: "Language", subcategory: "Punctuation", severity: "Minor", explanation: "Missing full stop after '25' -- Croatian date format requires '25.'." },
    ]
  },
  {
    id: 15, source: "Achievement unlocked: Master of Shadows!",
    correct: "Postignuće otključano: Majstor Sjena!",
    variants: [
      { target: "Postignuće otključano: Majstor Sjena!", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Clean and accurate." },
      { target: "Postignuće otključano Majstor Sjena!", hasError: true, category: "Language", subcategory: "Punctuation", severity: "Minor", explanation: "Missing colon after 'otključano'." },
      { target: "Postignuce otključano: Majstor Sjena!", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "'Postignuce' is missing the diacritic -- should be 'Postignuće'." },
    ]
  },
  {
    id: 16, source: "Your skills are transferable across all game modes.",
    correct: "Vaše su vještine prenosive kroz sve načine igre.",
    variants: [
      { target: "Vaše vještine su prenosiv kroz sve načine igre.", hasError: true, category: "Language", subcategory: "Grammar/Syntax", severity: "Major", explanation: "'Prenosiv' does not agree with 'vještine' -- should be 'prenosive'." },
      { target: "Vaše su vještine prenosive kroz sve načine igre.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Correct agreement and natural word order." },
    ]
  },
  {
    id: 17, source: "Click here to learn more about our privacy policy.",
    correct: "Kliknite ovdje da biste saznali više o našoj politici privatnosti.",
    variants: [
      { target: "Kliknite ovdje da biste saznali više o našoj politici privatnosti.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Accurate and natural." },
      { target: "Kliknite ovdje da biste saznali vise o našoj politici privatnosti.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "'Vise' is missing the diacritic -- should be 'više'." },
      { target: "Kliknite ovdje da biste saznali više o nasoj politici privatnosti.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "'Nasoj' is missing the diacritic -- should be 'našoj'." },
    ]
  },
  {
    id: 18, source: "The event ends in 3 days, 4 hours and 12 minutes.",
    correct: "Događaj završava za 3 dana, 4 sata i 12 minuta.",
    variants: [
      { target: "Događaj završava za 3 dana, 4 sata i 12 minuta.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Numbers and time correctly formatted." },
      { target: "Događaj završava za 3 dana, 4 sata i 120 minuta.", hasError: true, category: "Accuracy", subcategory: "Numbers", severity: "Critical", explanation: "12 was changed to 120 -- a critical number error." },
      { target: "Događaj završava za 3 dana 4 sata i 12 minuta.", hasError: true, category: "Language", subcategory: "Punctuation", severity: "Minor", explanation: "Missing comma after '3 dana'." },
    ]
  },
  {
    id: 19, source: "Tap the screen to jump over obstacles.",
    correct: "Dodirnite zaslon kako biste preskočili prepreke.",
    variants: [
      { target: "Dodirnite zaslon kako biste prekočili prepreke.", hasError: true, category: "Language", subcategory: "Spelling/Typos", severity: "Minor", explanation: "'Prekočili' is misspelled -- should be 'preskočili'." },
      { target: "Dodirnite zaslon kako biste preskočili prepreke.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Natural and accurate." },
    ]
  },
  {
    id: 20, source: "You have new messages from your teammates.",
    correct: "Imate nove poruke od svojih suigrača.",
    variants: [
      { target: "Imate nove poruke od svojih suigrači.", hasError: true, category: "Language", subcategory: "Grammar/Syntax", severity: "Minor", explanation: "'Suigrači' should be 'suigrača' (genitive plural after 'od')." },
      { target: "Imate nove poruke od svojih suigrača.", hasError: false, category: null, subcategory: null, severity: null, explanation: "No errors. Clean and accurate." },
    ]
  },
];


export const CATEGORIES = ["Accuracy", "Compliance", "Language", "Style", "Terminology"];
export const SEVERITIES = ["Minor", "Major", "Critical"];
