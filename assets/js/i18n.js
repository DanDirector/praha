/* i18n: CS <-> EN translator for both /old/ and /v2/ sites.
   Approach: dictionary of Czech-source strings (text node or normalized innerHTML)
   mapped to English. DOM walker swaps content; originals are cached so switching
   back to CS restores them verbatim. A MutationObserver re-applies translation
   when the v2 React app re-renders. Language preference is stored in localStorage,
   so it's shared between / and /v2/ (same domain).                                  */
(function () {
  'use strict';

  /* ---------- DICTIONARY (Czech source -> English) ---------- */
  /* Key types:
       - text-node strings (no HTML)
       - element innerHTML when the element contains <br>/<strong>/<em>/<span>/<a>
     Whitespace is normalized (collapsed) before lookup.                              */
  const EN = {
    /* navbar + footer common */
    'Úvod': 'Home',
    'Služby': 'Services',
    'Reference': 'Reviews',
    'Kontakt': 'Contact',
    'Kontaktujte nás': 'Get in touch',
    'Napsat na WhatsApp': 'Message on WhatsApp',
    'Hlavní služby': 'Main services',
    'Informace': 'Info',
    'Telefon': 'Phone',
    'E-mail': 'E-mail',
    'WhatsApp': 'WhatsApp',
    'Adresa:': 'Address:',
    'Telefon:': 'Phone:',
    'E-mail:': 'E-mail:',
    'WhatsApp:': 'WhatsApp:',
    'IČO:': 'Reg. No.:',
    'Ochrana osobních údajů': 'Privacy policy',
    'Záruka dle typu prací a smlouvy': 'Warranty per work type and contract',
    'Praha a okolí': 'Prague and surroundings',
    'Praha': 'Prague',
    'bude doplněno': 'to be added',
    'Telefon bude doplněn': 'Phone to be added',
    'E-mail bude doplněn': 'E-mail to be added',
    'a okolí': 'and surroundings',

    /* "new version" banner */
    'NOVÉ': 'NEW',
    'Vyzkoušejte naši novou verzi webu': 'Try our new website',
    'Přejít na novou verzi webu': 'Go to the new website version',
    'Vyzkoušejte naši starou verzi webu': 'Try our previous website version',
    'Zpět na klasickou verzi': 'Back to the classic version',

    /* HERO (homepage) */
    'Rekonstrukce <strong>bytů, koupelen a domů</strong> v Praze bez zbytečného chaosu':
      'Renovation of <strong>apartments, bathrooms and houses</strong> in Prague — without the chaos',
    'Přehledný rozpočet, jasný postup, jeden kontakt a realizace od zaměření po předání.':
      'Clear budget, transparent process, one point of contact, and delivery from survey to handover.',
    'Získat orientační kalkulaci': 'Get a rough estimate',
    'Spočítat orientační cenu': 'Estimate the price',

    /* FEATURES strip (br-separated short labels) */
    'Přehledný<br>rozpočet': 'Clear<br>budget',
    'Jasný<br>postup': 'Transparent<br>process',
    'Jeden<br>kontakt': 'One<br>contact',
    'Fotodokumentace<br>průběhu': 'Progress<br>photo log',
    'Záruka<br>dle smlouvy': 'Warranty<br>per contract',

    /* FEARS section */
    'Čeho se lidé při rekonstrukci nejčastěji obávají?':
      'What people most often worry about during a renovation',
    'Že se cena během prací nečekaně navýší': 'That the price will suddenly grow during the work',
    'Že nebude jasné, kdo za zakázku odpovídá': 'That it won’t be clear who’s responsible',
    'Že se práce protáhnou bez vysvětlení': 'That the work will drag on with no explanation',
    'Že po řemeslnících zůstane nepořádek': 'That the workers will leave a mess behind',
    'Že nebude jasné, co je a není v ceně': 'That it won’t be clear what is and isn’t included',
    'Proto pracujeme s předem domluveným rozsahem, orientačním rozpočtem, průběžnou komunikací a předáním hotové práce.':
      'That’s why we work with a scope agreed up front, a rough budget, ongoing communication, and a proper handover at the end.',

    /* "Naše výhody" */
    'Naše výhody': 'Why us',
    'Přehledný rozpočet před začátkem prací': 'Clear budget before work starts',
    'Rozsah prací, materiál a termín domlouváme předem, aby bylo jasné, co je součástí zakázky.':
      'We agree the scope, materials and schedule in advance, so it’s always clear what the job covers.',
    'Možnost návrhu podle rozsahu zakázky': 'Optional design based on project scope',
    'Podle typu prací pomůžeme upřesnit dispozici, materiály a výsledný vzhled ještě před zahájením realizace.':
      'Depending on the project, we help refine layout, materials and final look before work begins.',
    'Orientační odhad ceny online': 'Online price estimator',
    'Zadejte pár údajů a získáte první orientační rozpočet, který můžeme následně upřesnit podle reálného rozsahu.':
      'Enter a few details and get a first ballpark budget; we refine it later based on the real scope.',
    'Záruka dle typu prací a smlouvy': 'Warranty matched to the work and contract',
    'Záruční podmínky a odpovědnost za provedené práce nastavujeme podle konkrétní zakázky a použitých materiálů.':
      'Warranty terms and liability are set based on each specific project and the materials used.',
    'Materiály podle dohody a rozpočtu': 'Materials chosen by agreement and budget',
    'Materiály vybíráme podle rozsahu prací, požadované kvality a domluveného rozpočtu.':
      'We pick materials based on scope, required quality and the agreed budget.',
    'Ukázky prací podle typu zakázky': 'Sample work for your project type',
    'Při domluvě pomohou fotografie, reference a ukázky podobných realizací podle rozsahu plánovaných prací.':
      'Photos, references and samples of similar past jobs help guide the conversation.',

    /* "Naše služby" cards */
    'Naše služby': 'Our services',
    'Rekonstrukce bytu': 'Apartment renovation',
    'Kompletní i částečné úpravy bytů od přípravy po předání.':
      'Full or partial apartment renovations, from prep to handover.',
    'Rekonstrukce koupelny': 'Bathroom renovation',
    'Nové rozvody, obklady, sanita a dokončovací práce na klíč.':
      'New plumbing, tiling, fixtures and turnkey finishing work.',
    'Obkladačské práce': 'Tiling work',
    'Pokládka obkladů a dlažby pro koupelny, kuchyně i podlahy.':
      'Wall and floor tiling for bathrooms, kitchens and floors.',
    'Elektroinstalace': 'Electrical installation',
    'Úpravy rozvodů, zásuvek, osvětlení a revize a odborné úkony podle typu zakázky.':
      'Wiring, sockets, lighting, inspections and other certified work as needed.',
    'Úpravy rozvodů, zásuvek, osvětlení a revize podle typu zakázky.':
      'Wiring, sockets, lighting and inspections as the project requires.',
    'Hodinový manžel': 'Handyman by the hour',
    'Drobné opravy, montáže a údržba domácnosti podle domluvy.':
      'Small repairs, assembly and home maintenance on request.',
    'Rekonstrukce kanceláří': 'Office renovation',
    'Úpravy kanceláří a komerčních prostor s jasným harmonogramem.':
      'Offices and commercial space with a clear schedule.',
    'Kosmetické opravy': 'Cosmetic repairs',
    'Drobné opravy povrchů, malování a dokončovací práce.':
      'Light surface repairs, painting and finishing work.',
    'Zateplení fasád': 'Facade insulation',
    'Zateplení fasády': 'Facade insulation',
    'Zateplení a fasádní práce podle stavu domu a zvoleného systému.':
      'Thermal insulation and facade work matched to the building.',
    'Štukatérské práce': 'Plastering work',
    'Omítky, štukování a příprava stěn pro malování nebo obklady.':
      'Plaster, stucco and wall prep for paint or tile.',
    'Rekonstrukce domů': 'House renovation',
    'Rekonstrukce domu': 'House renovation',
    'Úpravy rodinných domů, interiérů i navazujících stavebních prací.':
      'Family-house renovations, interiors and related construction work.',
    'Specializovaná renovace bytu.': 'Specialised apartment renovation.',
    'Specializovaná renovace koupelny na klíč.': 'Turnkey bathroom renovation.',
    'Obklady a dlažby podle domluveného rozsahu.': 'Tiling matched to the agreed scope.',
    'Elektroinstalace a opravy v Praze.': 'Electrical work and repairs in Prague.',
    'Hodinový manžel v Praze.': 'Handyman service in Prague.',
    'Úpravy prostor podle provozu klienta.': 'Spaces adapted to your operations.',
    'Materiál a úklid v ceně.': 'Materials and clean-up included.',
    'Zvýšení energetické efektivity budovy.': 'Improving the building’s energy performance.',
    'Strojní i ruční omítky všech typů.': 'Machine and hand plastering of every type.',
    'Kompletní rekonstrukce domů v Praze.': 'Complete house renovations in Prague.',
    'Na jakýkoli projekt se můžeme pustit již dnes':
      'Ready to start any project today',

    /* "Jak vzniká orientační cena" */
    'Jak vzniká orientační cena': 'How the rough price is built up',
    'Velikost prostoru': 'Size of the space',
    'Stav rozvodů a podkladu': 'Condition of wiring and substrate',
    'Bourací práce': 'Demolition work',
    'Rozsah dokončovacích prací': 'Scope of finishing work',
    'Zvolený materiál': 'Chosen materials',
    'Dostupnost, patro, výtah a odvoz suti': 'Access, floor, lift and debris removal',
    'Pošlete nám fotky a základní popis. Připravíme další postup.':
      'Send us photos and a short description. We’ll prepare the next steps.',

    /* CALCULATOR */
    'Orientační kalkulačka rekonstrukce': 'Renovation rough-price calculator',
    'Výpočet slouží jen pro první orientaci. Finální cena závisí na konzultaci, zaměření a přesném rozsahu prací.':
      'This is only an initial estimate. The final price depends on a consultation, on-site survey and the exact scope.',
    'Typ objektu': 'Property type',
    'Byt': 'Apartment',
    'Dům': 'House',
    'Plocha (m²)': 'Area (m²)',
    'Nejde o závaznou nabídku.': 'This is not a binding offer.',

    /* MINI PORTFOLIO */
    'Jak může rekonstrukce změnit váš byt': 'How a renovation can transform your apartment',
    'Byt před': 'Apartment before',
    'Byt po': 'Apartment after',

    /* "Jak probíhá spolupráce" */
    'Jak probíhá spolupráce': 'How we work together',
    'Pošlete popis nebo fotky': 'Send a description or photos',
    'Stačí základní informace o prostoru, lokalitě a tom, co chcete změnit.':
      'Basic information about the space, location and what you want to change is enough.',
    'Upřesníme rozsah a možnosti': 'We refine scope and options',
    'Projdeme návaznosti, materiál, termín podle dostupnosti a možná omezení.':
      'We go through dependencies, materials, scheduling and any constraints.',
    'Domluvíme zaměření': 'We arrange a site survey',
    'U větších zakázek ověříme stav prostoru, rozvodů, podkladu a přístupu.':
      'For larger jobs we verify the state of the space, wiring, substrate and access.',
    'Připravíme rozpočet a postup': 'We prepare the budget and plan',
    'Rozsah prací domluvíme předem, aby bylo jasné, co je a není součástí.':
      'The scope is agreed in advance, so it’s clear what is and isn’t included.',
    'Realizace a průběžná komunikace': 'Delivery and ongoing communication',
    'Během prací držíme jeden kontakt a podle potřeby posíláme průběžné informace.':
      'During the work we keep a single point of contact and share updates as needed.',
    'Úklid, kontrola a předání': 'Cleanup, check and handover',
    'Zakázku uzavírá kontrola provedených prací a předání hotového prostoru.':
      'The job ends with a check of the work and handover of the finished space.',

    /* "Co může být součástí zakázky" */
    'Co může být součástí zakázky': 'What can be part of the job',
    'Obvykle řešíme': 'Usually included',
    'Individuálně podle rozsahu': 'Per-project basis',
    'Elektro, voda, odpady podle potřeby': 'Electrical, water, drains as needed',
    'Obklady, dlažby, štuky, malování': 'Tiles, floor tiles, plaster, painting',
    'Podlahy, lišty, dveře': 'Floors, trims, doors',
    'Montáže a dokončovací práce': 'Assembly and finishing work',
    'Úklid a předání': 'Clean-up and handover',
    'Materiál': 'Materials',
    'Sanita': 'Bathroom fixtures',
    'Revize': 'Inspections',
    'Projekt / návrh': 'Project / design',
    'Odvoz suti': 'Debris removal',
    'Práce mimo běžný rozsah': 'Work outside the usual scope',

    /* REFERENCES */
    'Co zákazníci obvykle oceňují': 'What clients usually appreciate',
    'Férovou domluvu před začátkem prací a jasnější představu o ceně a rozsahu.':
      'A fair agreement before work starts and a clearer picture of price and scope.',
    'Průběžnou komunikaci během realizace a jeden kontakt pro domluvu.':
      'Ongoing communication during the work and a single point of contact.',
    'Čistší předání prostoru a srozumitelný další postup po dokončení.':
      'A cleaner handover and clear next steps after completion.',
    'Před zahájením': 'Before work starts',
    'Během prací': 'During the work',
    'Předání': 'Handover',

    /* CONTACT */
    'Zavolejte nám:': 'Call us:',
    'Rádi vám poradíme a domluvíme si osobní schůzku v Praze.':
      'Happy to advise and arrange an in-person meeting in Prague.',

    /* SPACES strip */
    'Pro jaké prostory se práce hodí': 'Spaces we work in',
    'Kuchyně': 'Kitchen',
    'Koupelna': 'Bathroom',
    'Přístavba': 'Extension',
    'Obytný prostor': 'Living space',
    'Podkroví': 'Attic',
    'Sklep': 'Basement',
    'Ložnice': 'Bedroom',

    /* PARTNERS */
    'Naši partneři': 'Our partners',
    'Materiály a značky lze zvolit podle rozpočtu, dostupnosti a požadovaného výsledku.':
      'Materials and brands can be chosen by budget, availability and the desired result.',

    /* CTA */
    'Chcete vědět, kolik může stát vaše rekonstrukce?':
      'Want to know what your renovation might cost?',
    'Pošlete nám základní informace, fotky prostoru a přibližný termín. Ozveme se s dalším postupem.':
      'Send us the basics, photos of the space and a rough timeline. We’ll get back with next steps.',

    /* sluzby.html extras */
    'Rekonstrukce Bytu Praha': 'Apartment renovation Prague',
    'Rekonstrukce koupelny Praha': 'Bathroom renovation Prague',

    /* kontakty/ */
    'Pošlete nám krátký popis prací, lokalitu zakázky a pokud můžete, přiložte fotografie prostoru. Pomůže nám to připravit další postup nebo orientační kalkulaci.':
      'Send us a short description of the work, the project location and photos of the space if you can. It helps us prepare next steps or a rough estimate.',
    'Lokalita': 'Location',
    'Pracovní doba': 'Working hours',
    'Dle domluvy a typu zakázky': 'By appointment and project type',
    'Co se stane po odeslání poptávky?': 'What happens after you send the inquiry?',
    '1. Ozveme se vám': '1. We get back to you',
    'Projdeme základní informace a ověříme, co přesně potřebujete.':
      'We review the basics and confirm what exactly you need.',
    '2. Upřesníme rozsah': '2. We refine the scope',
    'Doplníme důležité detaily k prostoru, materiálům, termínu a návaznostem.':
      'We fill in details about the space, materials, schedule and dependencies.',
    '3. Domluvíme zaměření nebo orientační kalkulaci': '3. Site survey or rough estimate',
    'Podle typu zakázky navrhneme další krok a způsob nacenění.':
      'Depending on the job we suggest the next step and pricing approach.',
    '4. Navrhneme další postup': '4. We propose the next steps',
    'Připravíme doporučený postup, časový rámec a další domluvu.':
      'We prepare a recommended plan, timeframe and what to agree next.',
    'Získat nezávaznou kalkulaci': 'Get a non-binding estimate',

    /* lead form (common labels — translate if/when they’re visible) */
    'Jméno': 'Name',
    'Telefon nebo e-mail': 'Phone or e-mail',
    'Stručný popis prací': 'Brief description',
    'Odeslat poptávku': 'Send inquiry',
    'Odesláno. Brzy se ozveme.': 'Sent. We’ll be in touch.',

    /* 404 */
    'Stránka nenalezena': 'Page not found',
    'Bohužel jsme tuto stránku nenašli.': 'Sorry, we couldn’t find this page.',
    'Zpět na hlavní stránku': 'Back to the homepage',

    /* ----------------------- v2 React site (sections.jsx) ----------------------- */
    'Kalkulačka': 'Calculator',
    'Nezávazná poptávka →': 'Free quote →',
    'Praha a okolí · CZ': 'Prague and around · CZ',
    'Rekonstrukce': 'Renovations',
    'Koupelny': 'Bathrooms',
    'Fasády': 'Facades',
    'Štuky': 'Plaster',
    'Obklady': 'Tiles',
    'Kanceláře': 'Offices',
    '[01] / O nás': '[01] / About',
    '[02] / Obavy': '[02] / Concerns',
    '[03] / Služby': '[03] / Services',
    '[04] / Projekty': '[04] / Projects',
    '[05] / Před a po': '[05] / Before and after',
    '[06] / Proces': '[06] / Process',
    '[07] / Výhody': '[07] / Advantages',
    '[08] / Kalkulačka': '[08] / Calculator',
    '[09] / Prostory': '[09] / Spaces',
    '[10] / Reference': '[10] / Reviews',
    '[11] / Partneři': '[11] / Partners',
    '[12] / Tým': '[12] / Team',
    '[13] / Certifikace': '[13] / Certificates',
    '[14] / Blog': '[14] / Blog',
    '[15] / FAQ': '[15] / FAQ',
    '[16] / Kontakt': '[16] / Contact',
    'Stavební a rekonstrukční práce <em>pro byty, domy a komerční prostory</em> v Praze a okolí. Pracujeme s předem domluveným rozsahem, orientačním rozpočtem a průběžnou komunikací.':
      'Construction and renovation <em>for apartments, houses and commercial spaces</em> in Prague and around. We work with a scope agreed up front, a rough budget and ongoing communication.',
    'profesí pod jednou střechou — bourání, elektro, voda, obklady, štuky, podlahy, dveře, úklid':
      'trades under one roof — demolition, electrical, plumbing, tiling, plaster, floors, doors, cleanup',
    'kontakt po celou dobu zakázky — bez přeposílání mezi řemeslníky':
      'single contact through the whole job — no hand-offs between trades',
    'skrytých položek v rozpočtu — co domluvíme, to platí':
      'hidden line items in the budget — what we agree is what you pay',
    'Co děláme': 'What we do',
    'Před': 'Before',
    'Po': 'After',
    'Šest jasných kroků od první zprávy po předání hotového prostoru.':
      'Six clear steps from first message to handover of the finished space.',
    'Naše výhody.': 'Why us.',
    'Více než deset profesí pod jednou střechou — od bourání po úklid a předání hotového prostoru.':
      'More than ten trades under one roof — from demolition to clean-up and handover.',
    'Přehledný rozpočet, jasný postup, jeden kontakt a realizace od zaměření po předání. Více než deset profesí pod jednou střechou — od bourání po úklid a předání hotového prostoru.':
      'Clear budget, transparent process, one contact, and delivery from survey to handover. More than ten trades under one roof — from demolition to clean-up and handover.',
    'Orientační cena': 'Estimated price',
    'Tým': 'Team',
    'Certifikace': 'Certificates',
    'Blog': 'Blog',
    'Stavební činnost': 'Construction work',
    'Profesní pojištění': 'Professional insurance',
    'Cech malířů a lakýrníků': 'Painters & decorators guild',
    'Zateplení fasád': 'Facade insulation',
    'Živnostenské oprávnění': 'Trade licence',
    'Pojištění odpovědnosti': 'Liability insurance',
    'Členství v cechu': 'Guild membership',
    'Energetický auditor': 'Energy auditor',
    'Zakladatel · Vedení zakázek': 'Founder · Project lead',
    'Stavbyvedoucí': 'Site manager',
    'Obkladač · Štukatér': 'Tiler · Plasterer',
    'Koordinátor projektů': 'Project coordinator',
    'Fixní rozsah': 'Fixed scope',
    'Jeden kontakt': 'One contact',
    'Harmonogram': 'Schedule',
    'Úklid v ceně': 'Clean-up included',
    'Rozpočet předem': 'Budget up front',
    'Office': 'Office',
    'B2B': 'B2B',
    'Byty': 'Apartments',
    'Na klíč': 'Turnkey',
    'WC': 'WC',
    'Dlažba': 'Floor tile',
    'Elektro': 'Electrical',
    'Opravy': 'Repairs',
    'Montáž': 'Assembly',
    'Malování': 'Painting',
    'Tepelná izolace': 'Thermal insulation',
    'Omítky': 'Plaster',
    'Štuk': 'Stucco',
    'RD': 'House',
    'Komplet': 'Full',
    'Interiér + fasáda': 'Interior + facade',
    'Komerční prostor': 'Commercial space',
    'Kompletní rekonstrukce': 'Full renovation',

    /* v2 FAQ */
    'Kolik stojí rekonstrukce bytu v Praze?': 'How much does an apartment renovation in Prague cost?',
    'Orientačně může částečná rekonstrukce začínat od 3 500 Kč/m² a kompletní rekonstrukce od 8 000 Kč/m². Výsledná cena závisí na stavu bytu, rozsahu prací, materiálech a možnostech realizace.':
      'As a rough guide, partial renovations start from about 3,500 CZK/m² and full renovations from 8,000 CZK/m². The final price depends on the apartment’s condition, scope, materials and how the work can be executed.',
    'Jak dlouho rekonstrukce bytu trvá?': 'How long does an apartment renovation take?',
    'Termín závisí na rozsahu, stavu bytu, dostupnosti materiálů a návaznosti profesí. Menší úpravy mohou být kratší, kompletní rekonstrukce vyžaduje podrobnější harmonogram.':
      'It depends on scope, the apartment’s condition, material availability and how trades line up. Small jobs can be quick; full renovations need a detailed schedule.',
    'Může být byt během rekonstrukce obývaný?': 'Can the apartment be lived in during the renovation?',
    'Záleží na rozsahu prací. U menších úprav to někdy možné je, u zásahů do koupelny, rozvodů, podlah nebo více místností bývá praktičtější byt dočasně vyklidit.':
      'It depends on the scope. For small jobs it can be possible; for bathroom, wiring, floor or multi-room work it’s usually more practical to vacate.',
    'Můžu dodat vlastní materiál?': 'Can I supply my own materials?',
    'Ano, materiál může dodat klient nebo jej lze vybrat společně podle rozpočtu a požadovaného výsledku. Vhodnost materiálu je dobré ověřit před zahájením prací.':
      'Yes — you can supply materials, or we pick them together based on budget and the result you want. It’s worth checking suitability before work starts.',
    'Řešíte i elektro, vodu a odpady?': 'Do you handle electrical, plumbing and drains?',
    'Ano, podle rozsahu rekonstrukce lze řešit elektro, vodu a odpady. Revize a odborné úkony se řeší podle typu zakázky a požadavků.':
      'Yes — electrical, water and drains are covered depending on scope. Inspections and certified work are arranged per project.',
    'Dostanu smlouvu, fakturu a záruku?': 'Will I get a contract, invoice and warranty?',
    'Zakázku je vhodné řešit s jasným rozsahem prací, rozpočtem, fakturou a záručními podmínkami podle typu provedených prací a smlouvy.':
      'Every job is run with a clear scope, budget, invoice and warranty terms matched to the work and contract.',

    /* v2 blog/cards */
    'Kolik stojí rekonstrukce panelového bytu v roce 2026':
      'How much does a panel-block renovation cost in 2026',
    'Bytové jádro vs. zděná koupelna: srovnání nákladů':
      'Prefab bathroom core vs. masonry bathroom: cost comparison',
    'Velkoformátová dlažba — kdy se vyplatí a kdy ne':
      'Large-format floor tile — when it pays off and when not',
    'Co musí být ve smlouvě o dílo: 7 bodů, na které lidé zapomínají':
      'What must be in a works contract: 7 points people forget',
    'Zateplení fasády bytového domu: na co se ptát realizátora':
      'Apartment-block facade insulation: what to ask your contractor',
    'Koupelna': 'Bathroom',
    'Materiály': 'Materials',
    'Proces': 'Process',
    'Fasáda': 'Facade',

    /* v2 hero & marquee bits */
    'bytů, koupelen': 'apartments, bathrooms',
    'a domů': 'and houses',
    'v Praze': 'in Prague',
    'Spočítat': 'Calculate',
    '→ Více': '→ More',
    'Realizované': 'Completed',
    'projekty.': 'projects.',

    /* small misc */
    'Telefon': 'Phone',
    'Lokalita zakázky': 'Job location',
    'Pošlete poptávku': 'Send the inquiry',
    'Otevřít WhatsApp': 'Open WhatsApp',
    'Zavřít': 'Close',
    'Více': 'More',
    'Méně': 'Less',
    'Detail': 'Details',
    'Zobrazit více': 'Show more',

    /* v2 — additional text-node fragments split by <br> / <em> */
    'bez chaosu.': 'no chaos.',
    'Jak': 'How',
    'probíhá': 'flows',
    'spolupráce.': 'the work.',
    'Pro jaké prostory': 'Spaces',
    'se práce hodí.': 'we work in.',
    'Co zákazníci': 'What clients',
    'obvykle oceňují': 'usually appreciate',
    'Licence a': 'Licences and',
    'pojištění.': 'insurance.',
    'Lidé za': 'People behind',
    'zakázkou.': 'the work.',
    'Materiály a značky.': 'Materials and brands.',
    'Aktuálně': 'Latest',
    'ze stavby.': 'from the site.',
    'Všechny články': 'All articles',
    'Časté': 'Frequent',
    'otázky.': 'questions.',
    'Něco vám tu chybí?': 'Anything missing?',
    'Napište nám': 'Write to us',
    'Pošlete': 'Send',
    'popis nebo': 'a description or',
    'fotky.': 'photos.',
    'Podle základních informací vám řekneme, jaký postup dává smysl a co bude potřeba upřesnit. Ozveme se s dalším postupem nebo orientační kalkulací.':
      'From the basics we’ll tell you what approach makes sense and what we still need to clarify. We’ll get back to you with next steps or a rough estimate.',
    'Lokalita': 'Location',
    'Získat nezávaznou kalkulaci': 'Get a non-binding estimate',
    'Stavební a rekonstrukční práce pro byty, domy a komerční prostory':
      'Construction and renovation for apartments, houses and commercial spaces',
    'Stavební a rekonstrukční práce pro byty, domy a komerční prostory.':
      'Construction and renovation for apartments, houses and commercial spaces.',

    /* v2 — section labels (matching real numbering in sections.jsx) */
    '[04] / Reference': '[04] / References',
    '[10] / Reference': '[10] / Reviews',
    '[11] / Certifikáty': '[11] / Certificates',
    '[13] / Partneři': '[13] / Partners',

    /* v2 — portfolio cards */
    'Byt 3+kk · Vinohrady': 'Apartment 3+kk · Vinohrady',
    'Koupelna · Smíchov': 'Bathroom · Smíchov',
    'Kancelář · Karlín': 'Office · Karlín',
    'Rodinný dům · Praha-západ': 'Family house · Prague-West',

    /* v2 — process timing labels */
    '1–2 dny': '1–2 days',
    '1–3 dny': '1–3 days',
    '2–5 dní': '2–5 days',
    '3–7 dní': '3–7 days',
    'týdny': 'weeks',

    /* v2 — calculator */
    'Orientační': 'Estimated',
    'cena': 'price',
    'rekonstrukce.': 'renovation.',
    'Sazba': 'Rate',
    '— — — Kč': '— — — CZK',
    ' Kč': ' CZK',

    /* v2 — about block */
    'O nás': 'About',
    'Obavy': 'Concerns',
    'Před a po': 'Before and after',
    'Proces': 'Process',
    'Výhody': 'Advantages',
    'Prostory': 'Spaces',
    'Partneři': 'Partners',
    'Certifikáty': 'Certificates',

    /* v2 — review stage chips & extras */
    'Stavba': 'Construction',
    'Marketing': 'Marketing',
    'Reviews': 'Reviews',

    /* before/after section h2 split parts */
    'Jak může rekonstrukce': 'How a renovation can',
    'změnit váš byt.': 'transform your apartment.',

    /* calc note (dynamic — match after Sazba {price} suffix) */
    'Kč/m². Nejde o závaznou nabídku.': 'CZK/m². Not a binding offer.',

    /* footer "huge" company word stays the same — no entry needed */

    /* ============ subpages — comprehensive translations ============ */
    'Stránka nebyla nalezena': 'Page not found',
    'Omlouváme se, ale požadovaná adresa neexistuje.':
      'Sorry — the requested page doesn’t exist.',
    'Zpět na úvodní stránku': 'Back to the homepage',
    'Elektroinstalace v Praze bezpečně a přehledně':
      'Electrical installation in Prague — safe and transparent',
    'Od výměny zásuvky po kompletní elektroinstalaci. Rozsah, termín a postup domluvíme podle konkrétní zakázky.':
      'From a single socket swap to a full wiring job. Scope, schedule and approach are agreed per project.',
    'Termín zásahu podle domluvy a dostupnosti':
      'Appointment by agreement and availability',
    'Jak k elektro pracím přistupujeme': 'How we approach electrical work',
    'Jasný rozsah prací': 'Clear scope of work',
    'Termín podle dostupnosti': 'Scheduled by availability',
    'Bezpečný postup podle zakázky': 'Safe procedure matched to the job',
    'Odborné úkony dle požadavků': 'Certified work as required',
    'Elektro práce řešíme podle rozsahu zakázky a požadavků na bezpečné provedení. Revize a odborné úkony se domlouvají podle typu prací.':
      'We handle electrical work based on project scope and safety requirements. Inspections and certified work are arranged per work type.',
    'Co služba zahrnuje': 'What the service covers',
    'Zásuvky a vypínače': 'Sockets and switches',
    'Jističe a rozvaděče': 'Breakers and distribution boards',
    'Rozvaděče a základní úpravy rozvodů': 'Distribution boards and basic wiring changes',
    'Osvětlení a příprava pro rekonstrukci': 'Lighting and pre-renovation prep',
    'Kdy tato služba dává smysl': 'When this service makes sense',
    'Při rekonstrukci bytu, koupelny nebo kuchyně':
      'During an apartment, bathroom or kitchen renovation',
    'Když potřebujete doplnit zásuvky, vypínače nebo osvětlení':
      'When you need extra sockets, switches or lighting',
    'Při přípravě rozvodů pro nové spotřebiče': 'When prepping wiring for new appliances',
    'Když je potřeba posoudit další postup odborného úkonu':
      'When you need a certified-work next-step assessment',
    'Ceník': 'Price list',
    'Služba': 'Service',
    'Výměna zásuvky': 'Socket replacement',
    'od 500 Kč': 'from 500 CZK',
    'Montáž jističe': 'Breaker installation',
    'od 800 Kč': 'from 800 CZK',
    'Odborné úkony a kontrola': 'Certified work and inspection',
    'individuálně': 'case-by-case',
    'Cena je orientační a závisí na rozsahu, stavu místa, materiálu a dostupnosti. U elektro prací se přesný postup stanovuje podle typu zakázky a požadavků na bezpečné provedení.':
      'Prices are indicative and depend on scope, site condition, materials and availability. For electrical work the exact approach is set per project and safety requirements.',
    'Poptávka': 'Inquiry',
    'Pošlete popis úkonu, fotky místa a lokalitu v Praze.':
      'Send a description of the task, site photos and your Prague location.',
    'Upřesnění rozsahu': 'Scope confirmation',
    'Domluvíme, co je možné udělat a zda jsou potřeba odborné úkony.':
      'We agree what can be done and whether certified work is needed.',
    'Práce provedeme podle domluveného rozsahu a bezpečného postupu.':
      'We carry out the work per the agreed scope and safe procedure.',
    'Místo zkontrolujeme, uklidíme a předáme domluvený výsledek.':
      'We check the site, clean up and hand over the agreed result.',
    'Potřebujete domluvit elektro práce? Zavolejte nebo napište.':
      'Need to arrange electrical work? Call or write.',
    'Domluvit termín': 'Book a slot',
    'Férovou domluvu před začátkem prací': 'A fair agreement before work starts',
    'Průběžnou komunikaci během realizace': 'Ongoing communication during the work',
    'Čistší předání prostoru': 'A cleaner handover',
    'Jasnější představu o ceně a rozsahu': 'A clearer view of price and scope',
    'Často kladené dotazy': 'Frequently asked questions',
    'Jak se určuje rozsah elektro prací?':
      'How is the scope of electrical work determined?',
    'Rozsah prací domluvíme předem podle popisu zakázky, stavu instalace a požadavků na bezpečné provedení.':
      'We agree the scope in advance based on the job description, the current installation and safety requirements.',
    'Řešíte revize a odborné úkony?': 'Do you handle inspections and certified work?',
    'Revize a odborné úkony řešíme podle typu zakázky a požadavků. Konkrétní postup potvrdíme po upřesnění rozsahu.':
      'Inspections and certified work depend on project type and requirements. The exact procedure is confirmed once scope is clarified.',
    'Můžete připravit elektroinstalaci při rekonstrukci?':
      'Can you prepare wiring during a renovation?',
    'Ano, podle rozsahu zakázky lze řešit zásuvky, vypínače, osvětlení, rozvaděče a přípravu pro další práce.':
      'Yes — depending on scope we cover sockets, switches, lighting, distribution boards and prep for follow-on work.',
    'Jak se určuje cena?': 'How is the price determined?',
    'Cena závisí na rozsahu, přístupu k rozvodům, potřebném materiálu a tom, zda jde o drobný úkon nebo větší část rekonstrukce.':
      'Price depends on scope, wiring access, materials needed and whether it’s a small task or part of a larger renovation.',
    'Materiál lze dodat po dohodě, pokud odpovídá požadavkům zakázky a bezpečnému provedení.':
      'Materials can be supplied by agreement, provided they meet the project’s safety requirements.',
    'Ano, rozsah prací, fakturaci a případnou záruku domlouváme podle typu zakázky.':
      'Yes — scope, invoicing and any warranty are arranged per project type.',
    'Hodinový manžel v Praze pro drobné opravy a montáže':
      'Handyman by the hour in Prague — small repairs and assembly',
    'Montáže, vrtání, seřízení, drobné opravy a pomoc v bytě. Rozsah, orientační cenu a termín podle domluvy a aktuální dostupnosti upřesníme předem.':
      'Mounting, drilling, adjusting, small repairs and help around the home. Scope, rough price and timing are agreed up front based on availability.',
    'Montáž poliček, TV, obrazů': 'Mounting shelves, TVs and pictures',
    'Výměna baterií, žárovek a drobných prvků podle rozsahu':
      'Swapping faucets, bulbs and small parts as needed',
    'Montáž nábytku (IKEA, Jysk, aj.)': 'Furniture assembly (IKEA, Jysk, etc.)',
    'Opravy kapajících kohoutků': 'Fixing dripping faucets',
    'Seřízení oken a dveří': 'Adjusting windows and doors',
    'Vrtání, hmoždinky a drobné montážní úkony':
      'Drilling, anchors and small mounting tasks',
    'Těsnění, silikonování, malá malba': 'Sealing, silicone and small touch-up painting',
    'Některé elektroinstalační, instalatérské nebo odborné zásahy mohou vyžadovat specialistu. V takovém případě doporučíme bezpečný další postup.':
      'Some electrical, plumbing or certified work may require a specialist. In that case we’ll recommend the safe next step.',
    'Termín podle domluvy a aktuální dostupnosti':
      'Timing by agreement and current availability',
    'Čas příjezdu podle domluveného termínu': 'Arrival time per the booked slot',
    'Orientační cena po popisu úkonu': 'Rough price after the task is described',
    'Nářadí a základní materiál podle domluvy': 'Tools and basic materials by agreement',
    'Úklid místa po dokončení práce': 'Site clean-up after the work is done',
    'Kdy se hodinový manžel hodí': 'When a handyman is the right call',
    'Když potřebujete rychle vyřešit více drobných úkonů najednou':
      'When you need to knock out several small tasks at once',
    'Při montáži nábytku, poliček, garnýží nebo doplňků':
      'For furniture, shelves, curtain rails or accessories',
    'Před pronájmem, prodejem nebo nastěhováním do bytu':
      'Before renting out, selling or moving into an apartment',
    'Když není jasné, zda stačí drobná oprava nebo odborný zásah':
      'When it’s unclear whether a small fix or certified work is needed',
    'Úkon': 'Task',
    'Cena od (Kč)': 'Price from (CZK)',
    'Výměna baterie': 'Faucet replacement',
    'Montáž nábytku': 'Furniture assembly',
    'od 700 Kč': 'from 700 CZK',
    'Hodina práce (univerzální)': 'Hour of work (general)',
    'od 650 Kč': 'from 650 CZK',
    'Výjezd mimo Prahu': 'Travel outside Prague',
    'Cena je orientační a závisí na rozsahu, stavu místa, materiálu a dostupnosti.':
      'Prices are indicative and depend on scope, site condition, materials and availability.',
    'Průběh objednávky': 'How the booking works',
    'Pošlete popis úkonů, fotky a lokalitu.':
      'Send a description of the tasks, photos and location.',
    'Domluvíme orientační cenu, materiál a vhodný termín.':
      'We agree a rough price, materials and a suitable slot.',
    'V domluveném termínu provedeme sjednané práce.':
      'At the agreed time we carry out the work.',
    'Zkontrolujeme výsledek, uklidíme místo a předáme hotovou práci.':
      'We check the result, clean up and hand over the finished work.',
    'Je potřeba připravit něco?': 'Do I need to prepare anything?',
    'Stačí zajistit přístup k místu opravy.':
      'Just make sure we have access to the repair site.',
    'Máte i náhradní díly?': 'Do you provide spare parts?',
    'Základní materiál lze domluvit předem. U specifických dílů je lepší poslat fotku nebo název výrobku.':
      'Basic materials can be agreed in advance. For specific parts it helps to send a photo or product name.',
    'Možnosti platby domluvíme předem podle typu zakázky a fakturace.':
      'Payment options are agreed up front based on job type and invoicing.',
    'Jak se domlouvá termín?': 'How is the appointment arranged?',
    'Termín závisí na typu úkonu, lokalitě a aktuální dostupnosti. Vždy ho potvrdíme při objednávce.':
      'Timing depends on the task, location and current availability. It’s always confirmed at booking.',
    'Děláte i elektro a instalatérské práce?':
      'Do you also do electrical and plumbing work?',
    'Drobné úkony lze posoudit podle situace. Některé elektroinstalační, instalatérské nebo odborné zásahy vyžadují specialistu.':
      'Small tasks can be assessed case-by-case. Some electrical, plumbing or certified work needs a specialist.',
    'Jak nejlépe popsat poptávku?': 'How should I describe the request?',
    'Napište seznam úkonů, lokalitu, přibližný termín a přiložte fotky místa. Pomůže to s orientační cenou i přípravou materiálu.':
      'Send a task list, the location, a rough date and photos of the site. It helps with the rough price and material prep.',
    'Potřebujete drobnou opravu nebo montáž?': 'Need a small repair or assembly job?',
    'Pošlete fotky a krátký popis. Domluvíme rozsah, orientační cenu a termín podle aktuální dostupnosti.':
      'Send photos and a brief description. We’ll agree scope, a rough price and timing based on availability.',
    'bytů, koupelen a domů': 'apartments, bathrooms and houses',
    'v Praze bez zbytečného chaosu': 'in Prague — without the chaos',
    'Přehledný': 'Clear',
    'rozpočet': 'budget',
    'Jasný': 'Transparent',
    'průběhu': 'progress',
    'Záruka': 'Warranty',
    'Kosmetické opravy v Praze podle domluveného rozsahu':
      'Cosmetic repairs in Prague — to the agreed scope',
    'Malování, drobné dokončovací práce a úklid řešíme podle stavu prostoru, rozsahu prací a aktuální dostupnosti.':
      'Painting, light finishing work and clean-up — handled based on the space, scope and availability.',
    'Materiál a úklid podle dohody': 'Materials and clean-up by agreement',
    'Materiál lze dodat po dohodě, případně pracujeme s materiálem klienta. Rozsah úklidu domluvíme předem.':
      'Materials can be supplied by agreement, or we can use yours. Clean-up scope is agreed up front.',
    'Co může být součástí prací': 'What the work can include',
    'Malování stěn a stropů': 'Painting walls and ceilings',
    'Drobné opravy prasklin a nerovností': 'Small crack and unevenness repairs',
    'Tmelení, broušení a příprava podkladu': 'Filling, sanding and surface prep',
    'Montáž lišt, krytek a drobných doplňků':
      'Installing trims, covers and small accessories',
    'Lokální opravy po stěhování nebo nájemnících':
      'Localised fixes after a move-out or tenants',
    'Zakrytí ploch a závěrečný úklid podle rozsahu':
      'Surface protection and final clean-up per scope',
    'Kdy kosmetické opravy dávají smysl': 'When cosmetic repairs make sense',
    'Před pronájmem nebo prodejem bytu': 'Before renting out or selling an apartment',
    'Po stěhování, montážích nebo menší rekonstrukci':
      'After a move, mounting work or a small renovation',
    'Když není potřeba kompletní rekonstrukce': 'When a full renovation isn’t needed',
    'Pro rychlé sjednocení vzhledu místnosti': 'For a quick unified room refresh',
    'Balíčky cen': 'Price packages',
    'Malý pokoj': 'Small room',
    'od 4 500 Kč': 'from 4,500 CZK',
    'Střední pokoj': 'Medium room',
    'od 6 900 Kč': 'from 6,900 CZK',
    'Velký pokoj': 'Large room',
    'od 9 900 Kč': 'from 9,900 CZK',
    'Cena je orientační a závisí na rozsahu, stavu místa, materiálu a dostupnosti. Materiál řešíme po dohodě podle konkrétní zakázky.':
      'Prices are indicative and depend on scope, site condition, materials and availability. Materials are handled by agreement per project.',
    'Ukázky prací': 'Work samples',
    'Konfigurátor ceny': 'Price configurator',
    'Pošlete popis místnosti, fotky a požadovaný výsledek.':
      'Send a description of the room, photos and the desired result.',
    'Domluvíme rozsah oprav, materiál, úklid a orientační cenu.':
      'We agree on the scope of repairs, materials, clean-up and a rough price.',
    'Provedeme sjednané opravy, malování nebo dokončovací práce.':
      'We carry out the agreed repairs, painting or finishing work.',
    'Zkontrolujeme výsledek a předáme uklizený prostor podle domluvy.':
      'We check the result and hand over a cleaned space as agreed.',
    'Časté dotazy': 'Frequently asked questions',
    'Termín podle rozsahu prací a aktuální dostupnosti upřesníme po popisu zakázky.':
      'Timing is confirmed based on scope and current availability once the job is described.',
    'Můžete dodat materiál?': 'Can you supply the materials?',
    'Materiál lze dodat po dohodě, případně použít materiál připravený klientem. Rozsah prací domluvíme předem.':
      'Materials can be supplied by agreement, or we use yours. The scope is agreed in advance.',
    'Jak řešíme materiál?': 'How are materials handled?',
    'Materiál řešíme po dohodě. Můžeme pracovat s vaším materiálem nebo domluvit základní materiál podle rozsahu zakázky.':
      'Materials are handled by agreement. We can use yours, or agree on basic materials based on the scope.',
    'Stačí poslat fotky?': 'Is sending photos enough?',
    'Pro orientační domluvu ano. U většího rozsahu může být potřeba zaměření nebo osobní konzultace.':
      'For a rough agreement, yes. For larger scope a site survey or in-person consultation may be needed.',
    'Děláte opravy po nájemnících?': 'Do you do repairs after tenants?',
    'Ano, často řešíme malování, lokální opravy, lišty, krytky a úpravy před dalším pronájmem.':
      'Yes — painting, spot repairs, trims, covers and tweaks before the next tenancy are a common job.',
    'Co ovlivňuje cenu?': 'What affects the price?',
    'Rozsah prací, stav podkladu, počet vrstev, materiál, dostupnost prostoru a požadovaný termín.':
      'Scope, substrate condition, number of coats, materials, site access and the requested deadline.',
    'Obkladačské práce v Praze s jasným rozsahem':
      'Tiling work in Prague — with a clear scope',
    'Obklady koupelen, kuchyní, podlah i stěn. Rozsah prací, materiál a postup domluvíme předem.':
      'Tiling for bathrooms, kitchens, floors and walls. Scope, materials and approach are agreed up front.',
    'Co obkladačské práce zahrnují': 'What tiling work covers',
    'Pokládka obkladů': 'Wall tiling',
    'Koupelna, kuchyň, WC': 'Bathroom, kitchen, WC',
    'Pokládka dlažby': 'Floor tiling',
    'Rekonstrukce sprchových koutů': 'Shower enclosure renovations',
    'Výměna staré dlažby': 'Replacing old floor tiles',
    'Pokládka mozaiky': 'Mosaic tiling',
    'Opravy po haváriích': 'Repairs after leaks or damage',
    'Spárování, silikonování': 'Grouting and silicone work',
    'Výhody našich služeb': 'Why work with us',
    'Jasný rozsah prací před začátkem': 'Clear scope before work starts',
    'Příprava podkladu podle stavu místnosti': 'Substrate prep matched to the room',
    'Domluva skladby, spár a detailů': 'Agreed layout, joints and detailing',
    'Materiál lze dodat po dohodě nebo pracovat s vaším':
      'Materials by agreement, or we use yours',
    'Smlouva, faktura a záruka dle typu prací a smlouvy':
      'Contract, invoice and warranty per work type',
    'Při rekonstrukci koupelny, WC nebo kuchyně':
      'During a bathroom, WC or kitchen renovation',
    'Když je potřeba vyměnit starou dlažbu nebo obklad':
      'When old floor or wall tile needs replacing',
    'U sprchových koutů, soklů a detailů kolem sanity':
      'For shower enclosures, plinths and fixture details',
    'Při dokončovacích pracích po rekonstrukci bytu':
      'For finishing work after an apartment renovation',
    'Typ práce': 'Work type',
    'Cena od (Kč/m²)': 'Price from (CZK/m²)',
    'Pokládka obkladu standardního': 'Standard wall tiling',
    'Mozaika / malý formát': 'Mosaic / small format',
    'Velkoformátové dlaždice': 'Large-format tiles',
    'Odstranění staré dlažby': 'Removal of old tiles',
    'Spárování / silikonování': 'Grouting / silicone',
    'Cena je orientační a závisí na rozsahu, stavu místa, materiálu a dostupnosti. U obkladů ji ovlivňuje hlavně formát dlažby, stav podkladu, řezání, spárování a množství detailů.':
      'Prices are indicative and depend on scope, site condition, materials and availability. For tiling, the main drivers are tile format, substrate, cutting, grouting and detail count.',
    'Náš postup práce': 'How we work',
    'Pošlete popis, rozměry a ideálně fotky místa.':
      'Send a description, measurements and ideally site photos.',
    'Domluvíme podklad, formát obkladu, detaily a orientační cenu.':
      'We agree the substrate, tile format, detailing and a rough price.',
    'Připravíme podklad, provedeme pokládku, spárování a silikonování.':
      'We prep the substrate, lay tiles, grout and silicone.',
    'Zkontrolujeme detaily a předáme hotovou práci.':
      'We check the details and hand over the finished work.',
    'Časté otázky': 'Frequently asked questions',
    'Jaký materiál doporučujete?': 'Which materials do you recommend?',
    'Materiál lze dodat po dohodě nebo pracovat s materiálem klienta. Výběr vždy přizpůsobíme rozpočtu a technickým požadavkům.':
      'Materials can be supplied by agreement or you can supply them. The choice is always matched to budget and technical requirements.',
    'Můžu dodat vlastní obklady?': 'Can I supply my own tiles?',
    'Ano, pokud je materiál vhodný pro daný podklad a rozsah prací. Detaily ověříme před zahájením.':
      'Yes — provided the material suits the substrate and scope. Details are verified before starting.',
    'Kolik dní trvá pokládka?': 'How many days does tiling take?',
    'Termín podle rozsahu prací a aktuální dostupnosti. Přesný postup stanovíme po zaměření a kontrole podkladu.':
      'Timing depends on scope and availability. The exact plan is set after a site survey and substrate check.',
    'Jak připravit místnost?': 'How should I prepare the room?',
    'Odstranit nábytek a staré krytiny, zbytek zajistíme my.':
      'Remove furniture and old coverings — we take care of the rest.',
    'Samozřejmě, obdržíte řádnou fakturu i smlouvu o dílo.':
      'Of course — you’ll receive a proper invoice and a works contract.',
    'Co nejvíc ovlivňuje cenu obkladačských prací?':
      'What drives tiling-work prices the most?',
    'Cena se mění podle formátu obkladů, rovnosti podkladu, množství řezů, rohů, lišt, spárování, silikonování a dostupnosti místa.':
      'Price varies with tile format, substrate flatness, the number of cuts, corners, trims, grouting, silicone work and site access.',
    'Chcete upřesnit rozsah obkladačských prací?':
      'Want to nail down the scope of tiling work?',
    'Pošlete nám fotky, rozměry a krátký popis. Řekneme vám, jaký postup a orientační rozpočet dávají smysl.':
      'Send photos, measurements and a short description. We’ll tell you what approach and rough budget make sense.',
    'Tato stránka stručně vysvětluje, jak pracujeme s údaji, které nám pošlete přes kontaktní formulář, e-mail, telefon nebo WhatsApp.':
      'This page briefly explains how we handle data you send via the contact form, e-mail, phone or WhatsApp.',
    'Údaje výše se doplňují z centrální konfigurace webu. Pokud jsou některé údaje zatím uvedené jako placeholder, musí je před spuštěním doplnit provozovatel webu.':
      'The details above are pulled from the site’s central config. Any placeholder values must be filled in by the site operator before going live.',
    'Jaké údaje zpracováváme': 'What data we process',
    'Pokud odešlete poptávku nebo nás kontaktujete, můžeme pracovat zejména s těmito údaji:':
      'If you send an inquiry or contact us, we may process the following data:',
    'jméno,': 'name,',
    'typ služby, o kterou máte zájem,': 'the type of service you’re interested in,',
    'popis zakázky, lokalita, přibližná plocha a požadovaný termín,':
      'job description, location, approximate area and desired timing,',
    'fotografie prostoru, pokud je dobrovolně přiložíte,':
      'photos of the space (if you choose to attach them),',
    'obsah další komunikace.': 'the contents of further correspondence.',
    'Proč údaje používáme': 'Why we use the data',
    'Údaje používáme za účelem odpovědi na vaši poptávku, domluvy dalšího postupu, přípravy orientační kalkulace a běžné komunikace související se zakázkou.':
      'We use the data to reply to your inquiry, agree on next steps, prepare a rough estimate and handle ordinary project-related communication.',
    'Jak dlouho údaje uchováváme': 'How long we keep the data',
    'Údaje uchováváme po dobu potřebnou k vyřízení poptávky a následné komunikaci. Pokud ze zakázky vznikne smluvní nebo účetní vztah, mohou být některé údaje uchovány déle podle zákonných povinností. Údaje nemažeme ani neuchováváme automaticky podle pevného veřejného termínu bez ohledu na situaci.':
      'We keep the data for as long as needed to handle the inquiry and follow-up. If a contractual or accounting relationship arises, some data may be retained longer to meet legal obligations. We don’t auto-delete or auto-retain data on a fixed public schedule regardless of context.',
    'Komu údaje předáváme': 'Who we share the data with',
    'Osobní údaje neprodáváme. V nezbytném rozsahu je můžeme sdílet s osobami, které pomáhají se zpracováním poptávky, technickým provozem webu nebo realizací zakázky. Vždy jen v rozsahu potřebném pro daný účel.':
      'We don’t sell personal data. We may share it, only to the extent necessary, with people who help process the inquiry, run the site technically or carry out the project — always only as much as the purpose requires.',
    'Na webu momentálně nejsou nastavené analytické nebo reklamní měřicí skripty. Web může používat běžné technické prvky potřebné pro načtení stránky, zobrazení fontů, knihoven a odeslání komunikace přes odkazy na telefon, e-mail nebo WhatsApp.':
      'The site currently has no analytics or advertising tracking. It may use ordinary technical elements needed to load the page, render fonts and libraries, and send messages via phone, e-mail or WhatsApp links.',
    'Pokud bude v budoucnu přidána analytika nebo reklamní měření, měla by být tato stránka aktualizována a podle potřeby doplněna i cookie lišta.':
      'If analytics or ad tracking are added later, this page should be updated and a cookie banner added if needed.',
    'Vaše práva': 'Your rights',
    'V souvislosti s osobními údaji se na nás můžete obrátit zejména s žádostí o:':
      'In relation to personal data you can contact us in particular to request:',
    'informaci, jaké údaje o vás zpracováváme,':
      'information about what data we process about you,',
    'opravu nepřesných údajů,': 'correction of inaccurate data,',
    'výmaz údajů, pokud už nejsou potřeba,': 'deletion of data that is no longer needed,',
    'omezení zpracování,': 'restriction of processing,',
    'námitku proti zpracování, pokud k tomu máte důvod.':
      'objection to processing if you have grounds for it.',
    'Pro dotazy k ochraně osobních údajů napište na': 'For privacy questions, write to',
    'Tento text je základní informační stránka pro lead-generation web. Nejde o právní poradenství a před ostrým spuštěním by ji měl zkontrolovat provozovatel nebo právník podle skutečného fungování firmy.':
      'This is a basic information page for a lead-generation site. It is not legal advice; before go-live it should be reviewed by the operator or a lawyer based on how the company actually operates.',
    'Rekonstrukce bytů v Praze': 'Apartment renovations in Prague',
    'Kompletní i částečné rekonstrukce bytů s přehledným rozpočtem, koordinací jednotlivých řemesel a předáním hotové práce.':
      'Full or partial apartment renovations — clear budget, trades coordinated under one roof and a proper handover.',
    'Přehledný rozpočet': 'Clear budget',
    'Koordinace řemeslníků': 'Tradesperson coordination',
    'Smlouva a jasný rozsah prací': 'Contract and a clear scope of work',
    'Fotodokumentace průběhu': 'Progress photo documentation',
    'Záruka dle typu prací': 'Warranty matched to the work type',
    'Co může zahrnovat rekonstrukce bytu': 'What an apartment renovation can include',
    'Bourací práce a příprava prostoru': 'Demolition and space prep',
    'Elektroinstalace, voda a odpady podle potřeby': 'Wiring, water and drains as needed',
    'Omítky, štuky a malování': 'Plaster, stucco and painting',
    'Podlahy, podklady a lišty': 'Floors, underlays and trims',
    'Koupelna a samostatné WC': 'Bathroom and separate WC',
    'Kuchyňská příprava pro linku a spotřebiče':
      'Kitchen prep for cabinets and appliances',
    'Dveře, zárubně, lišty a dokončovací práce': 'Doors, frames, trims and finishing work',
    'Koordinace profesí, úklid a předání bytu':
      'Coordinating trades, clean-up and apartment handover',
    'Typy bytů': 'Apartment types',
    'Panelový byt': 'Panel-block apartment',
    'Cihlový byt': 'Brick-built apartment',
    'Byt k pronájmu': 'Rental apartment',
    'Investiční byt': 'Investment apartment',
    'Orientační ceny': 'Indicative prices',
    'Poznámka': 'Note',
    'Částečná rekonstrukce': 'Partial renovation',
    'od 3 500 Kč/m²': 'from 3,500 CZK/m²',
    'Vybrané místnosti, povrchy, podlahy, malování nebo dílčí úpravy':
      'Selected rooms, surfaces, floors, painting or partial changes',
    'od 8 000 Kč/m²': 'from 8,000 CZK/m²',
    'Více profesí, rozvody, koupelna, podlahy a dokončovací práce':
      'Multiple trades, wiring, bathroom, floors and finishing work',
    'Rekonstrukce na klíč': 'Turnkey renovation',
    'Rozpočet podle stavu bytu, rozsahu prací a zvolených materiálů':
      'Budget based on the apartment’s condition, scope and chosen materials',
    'Uvedené částky jsou pouze orientační. Přesná cena závisí na stavu bytu, rozsahu prací, materiálech a možnostech realizace.':
      'The figures shown are indicative only. The exact price depends on the apartment, scope, materials and how the work can be executed.',
    'Co je dobré vědět před rekonstrukcí bytu':
      'Things worth knowing before an apartment renovation',
    'U starších bytů může cenu ovlivnit stav elektroinstalace, vody a odpadů.':
      'In older apartments, the state of wiring, water and drains can affect the price.',
    'U panelových bytů bývá důležité řešit bytové jádro, hluk a návaznost prací.':
      'In panel apartments, the prefab bathroom core, noise and trade sequencing matter.',
    'U bytů k pronájmu často dává smysl praktičtější a odolnější řešení.':
      'For rental apartments, a more practical and durable solution often makes sense.',
    'Přesný rozsah se nejlépe stanoví po fotkách, konzultaci nebo zaměření.':
      'The exact scope is best set after photos, a consultation or a site survey.',
    'Co může být v ceně a co se řeší zvlášť':
      'What can be in the price and what is handled separately',
    'Obvykle může zahrnovat': 'Usually included',
    'Příprava podkladů': 'Substrate prep',
    'Podlahy, omítky, malování': 'Floors, plaster, painting',
    'Individuálně podle dohody': 'Case-by-case by agreement',
    'Sanita a vybavení': 'Bathroom fixtures and equipment',
    'Dveře a zárubně': 'Doors and door frames',
    'Kuchyňská linka': 'Kitchen cabinetry',
    'Nadstandardní materiály': 'Premium materials',
    'Pošlete popis bytu, rozsah prací a ideálně fotografie současného stavu.':
      'Send a description of the apartment, the scope of work and ideally photos of the current state.',
    'Upřesníme očekávání, možnosti, priority a orientační rozsah prací.':
      'We’ll clarify expectations, options, priorities and a rough scope of work.',
    'Zaměření': 'Site survey',
    'Podle potřeby ověříme stav bytu, rozvody, podklady a přístup.':
      'As needed we check the apartment’s condition, wiring, substrates and access.',
    'Rozpočet': 'Budget',
    'Připravíme rozpočet a domluvíme, co je a není součástí zakázky.':
      'We prepare a budget and agree what is and isn’t part of the job.',
    'Koordinujeme návaznosti profesí a průběžně komunikujeme postup.':
      'We coordinate the trades and keep you posted on progress.',
    'Po kontrole předáme hotový prostor a domluvené podklady k zakázce.':
      'After inspection we hand over the finished space and any agreed documentation.',
    'Ukázky bytových řešení': 'Apartment-design samples',
    'Obytný prostor po modernizaci': 'Living space after modernisation',
    'Interiér bytu po rekonstrukci': 'Apartment interior post-renovation',
    'Podlahy, nábytek a dokončovací detaily': 'Floors, furniture and finishing details',
    'Často kladené otázky': 'Frequently asked questions',
    'Pošlete nám fotky bytu a popis prací':
      'Send us photos of the apartment and a description of the work',
    'Podle základních informací vám řekneme, jaký postup dává smysl a co bude potřeba upřesnit.':
      'Based on the basics we’ll tell you what approach makes sense and what still needs to be clarified.',
    'Rekonstrukce rodinných domů v Praze a okolí':
      'Family-house renovations in Prague and around',
    'Kompletní i částečné úpravy domů s přehledným rozsahem prací, rozpočtem a postupem od zaměření po předání.':
      'Full or partial house renovations — clear scope, budget and process from site survey to handover.',
    'Smlouva a rozsah prací': 'Contract and scope of work',
    'Koordinace profesí': 'Trade coordination',
    'Proč řešit rekonstrukci s námi?': 'Why renovate with us?',
    'Stará elektroinstalace a špatné rozvody?': 'Old wiring and bad utility runs?',
    'Navrhneme moderní řešení.': 'We’ll propose a modern fix.',
    'Nedostatek času na koordinaci řemeslníků?': 'No time to coordinate trades?',
    'Postaráme se o vše od A do Z.': 'We handle it end to end.',
    'Obavy z navýšení ceny?': 'Worried the price will balloon?',
    'Připravíme přehledný rozpočet a transparentní postup.':
      'We prepare a clear budget and a transparent process.',
    'Úvodní poptávka': 'Initial inquiry',
    'Pošlete základní informace o domě, fotky a představu o rozsahu.':
      'Send basic info about the house, photos and your idea of the scope.',
    'Konzultace a prohlídka': 'Consultation and walk-through',
    'Upřesníme technický stav, priority, přístup a návaznosti prací.':
      'We clarify the technical state, priorities, access and trade dependencies.',
    'Návrh rozsahu prací': 'Proposed scope of work',
    'Sepíšeme, co je potřeba řešit a co může počkat na další etapu.':
      'We write up what needs doing now and what can wait for a later phase.',
    'Orientační rozpočet': 'Indicative budget',
    'Připravíme rozpočet podle domluveného rozsahu, materiálů a dostupnosti.':
      'We prepare a budget based on agreed scope, materials and availability.',
    'Realizace po etapách': 'Phased delivery',
    'Práce koordinujeme podle návaznosti profesí a stavu domu.':
      'We coordinate the work based on trade sequencing and the house’s condition.',
    'Kontrola, úklid a předání': 'Inspection, clean-up and handover',
    'Hotové práce projdeme, uklidíme a předáme podle domluveného rozsahu.':
      'We walk through the completed work, clean up and hand over per the agreed scope.',
    'Co může zahrnovat rekonstrukce domu': 'What a house renovation can include',
    'Voda a topení': 'Water and heating',
    'Co nejčastěji řešíme u rodinných domů': 'What we most often tackle in family houses',
    'Elektroinstalace, voda a topení podle stavu domu':
      'Wiring, water and heating based on the house’s condition',
    'Koupelny, WC a kuchyňské přípravy': 'Bathrooms, WCs and kitchen prep',
    'Omítky, štuky, podlahy a malování': 'Plaster, stucco, floors and painting',
    'Zateplení a fasádní práce podle rozsahu': 'Insulation and facade work as required',
    'Dokončovací práce a úpravy interiéru': 'Finishing work and interior tweaks',
    'Příprava domu k bydlení nebo pronájmu':
      'Getting the house ready to live in or rent out',
    'Orientační cena rekonstrukce': 'Indicative renovation price',
    'Výpočet je pouze orientační. Přesná cena závisí na stavu domu, rozsahu prací, materiálech a návaznosti jednotlivých profesí.':
      'The figure is indicative only. The actual price depends on the house, scope, materials and trade sequencing.',
    'Co ovlivňuje cenu rekonstrukce domu': 'What drives a house-renovation price',
    'Technický stav domu': 'Technical state of the house',
    'Rozsah bouracích prací': 'Scope of demolition',
    'Stav rozvodů': 'State of the utility runs',
    'Plocha a počet místností': 'Area and number of rooms',
    'Typ materiálů': 'Material grade',
    'Návaznost profesí': 'Trade sequencing',
    'Chcete rekonstrukci domu naplánovat přehledně?':
      'Want to plan your house renovation cleanly?',
    'Jak dlouho trvá rekonstrukce?': 'How long does a renovation take?',
    'Délka rekonstrukce závisí na velikosti domu, rozsahu prací, stavu rozvodů, dostupnosti materiálu a návaznosti jednotlivých profesí. Termín proto upřesňujeme po konzultaci a zaměření.':
      'Duration depends on the size of the house, scope, the state of utility runs, material availability and trade sequencing. We confirm timing after consultation and a site survey.',
    'Zajišťujete i design?': 'Do you also handle design?',
    'Podle rozsahu zakázky můžeme pomoci s návrhem řešení, výběrem materiálů nebo koordinací navazujících prací.':
      'Depending on scope we can help with concept design, material selection or coordination of follow-on work.',
    'Plánujete rekonstrukci domu?': 'Planning a house renovation?',
    'Pošlete nám základní informace o domě, fotky a představu o rozsahu. Navrhneme další postup.':
      'Send us basic info about the house, photos and your idea of the scope. We’ll propose next steps.',
    'Rekonstrukce kanceláří a komerčních prostor v Praze':
      'Office and commercial-space renovations in Prague',
    'Úpravy kanceláří a komerčních prostor s jasným harmonogramem a ohledem na provoz.':
      'Office and commercial-space changes with a clear schedule and respect for ongoing operations.',
    'Klíčové výhody': 'Key advantages',
    'Jasný harmonogram': 'Clear schedule',
    'Možnost etapové realizace': 'Phased delivery option',
    'Práce podle provozu klienta': 'Work scheduled around your operations',
    'Příčky a drobné stavební úpravy': 'Partitions and small construction changes',
    'Elektro a osvětlení podle potřeby': 'Electrical and lighting as needed',
    'Podlahy a podkladové vrstvy': 'Floors and underlays',
    'Malování a povrchové úpravy': 'Painting and surface finishing',
    'Obklady a zázemí': 'Tiling and back-of-house',
    'Montáže': 'Mounting and assembly',
    'Dokončovací práce': 'Finishing work',
    'Pro jaké prostory se služba hodí': 'Which spaces this service suits',
    'Coworkingové prostory': 'Coworking spaces',
    'Menší gastro / zázemí podle rozsahu': 'Smaller hospitality / back-of-house per scope',
    'Co firmy nejčastěji řeší': 'What companies most often need',
    'Potřeba rychle upravit prostor před otevřením':
      'Need to fit out a space quickly before opening',
    'Omezení provozu během prací': 'Operational constraints during the work',
    'Koordinace více profesí': 'Coordinating multiple trades',
    'Čisté předání prostoru': 'A clean handover',
    'Úpravy podle rozpočtu': 'Changes tailored to the budget',
    'Jak minimalizujeme omezení provozu': 'How we minimise operational disruption',
    'U komerčních prostor je důležité plánovat práce tak, aby měly co nejmenší dopad na provoz klienta.':
      'In commercial spaces it’s key to plan the work for the smallest possible impact on client operations.',
    'Práce lze plánovat po etapách.': 'The work can be planned in phases.',
    'Harmonogram se domlouvá předem.': 'The schedule is agreed in advance.',
    'Některé práce lze řešit mimo hlavní provozní dobu podle možností.':
      'Some work can be done outside main operating hours where possible.',
    'Rozsah a termíny se potvrzují podle konkrétní zakázky.':
      'Scope and timing are confirmed per project.',
    'Lze práce rozdělit na etapy?': 'Can the work be split into phases?',
    'Ano, u kanceláří a provozoven často dává smysl rozdělit práce po částech, aby se prostor mohl používat alespoň v omezeném režimu.':
      'Yes — for offices and venues it often makes sense to split the work so the space stays at least partly usable.',
    'Můžete pracovat večer nebo o víkendu?': 'Can you work evenings or weekends?',
    'Podle rozsahu a pravidel objektu lze domluvit i méně rušivé termíny mimo běžnou provozní špičku.':
      'Depending on scope and building rules, less-disruptive slots outside peak hours can be agreed.',
    'Zajistíte více profesí najednou?': 'Can you coordinate several trades at once?',
    'Ano, u větších úprav je klíčová koordinace řemesel, návaznosti prací, materiálu a předávání informací.':
      'Yes — for larger jobs, coordinating trades, sequencing, materials and information flow is key.',
    'Pro jak velké prostory je služba vhodná?':
      'How large a space is the service suitable for?',
    'Služba je vhodná pro menší kanceláře, celé administrativní prostory, salony, ordinace, obchody i coworkingy.':
      'It suits small offices, whole administrative floors, salons, clinics, shops and coworking spaces.',
    'Jak vznikne rozpočet a harmonogram?': 'How are the budget and schedule built?',
    'Nejprve se upřesní provozní omezení, rozsah a stav prostoru. Poté lze připravit návrh harmonogramu a orientační rozpočet.':
      'We first clarify operational constraints, scope and the current state of the space. Then we can draft a schedule and rough budget.',
    'Rekonstrukce koupelny v Praze na klíč': 'Turnkey bathroom renovations in Prague',
    'Od demontáže staré koupelny přes nové rozvody vody a elektřiny, hydroizolaci, obklady a sanitu až po závěrečný úklid a předání.':
      'From stripping out the old bathroom through new water and power runs, waterproofing, tiling and fixtures to final clean-up and handover.',
    'Jeden kontakt pro celou zakázku': 'One contact for the whole project',
    'Hydroizolace a příprava podkladu': 'Waterproofing and substrate prep',
    'Obklady, sanita, osvětlení': 'Tiling, fixtures, lighting',
    'Demontáž starého vybavení a příprava prostoru':
      'Stripping old fixtures and preparing the space',
    'Odvoz suti a základní úklid po bouracích pracích':
      'Debris removal and basic clean-up after demolition',
    'Rozvody vody, odpadu a elektřiny podle potřeby':
      'Water, drain and electrical runs as needed',
    'Hydroizolace a příprava podkladu pod obklady':
      'Waterproofing and substrate prep for tiling',
    'Pokládka obkladů a dlažby': 'Wall and floor tiling',
    'Montáž sanity, baterií a koupelnového nábytku':
      'Installing fixtures, taps and bathroom furniture',
    'Osvětlení, zrcadla a dokončovací prvky': 'Lighting, mirrors and finishing pieces',
    'Závěrečný úklid a předání hotové koupelny':
      'Final clean-up and handover of the finished bathroom',
    'Pro jaké koupelny': 'Which bathrooms we work on',
    'Malé koupelny v paneláku': 'Small panel-block bathrooms',
    'Koupelnová jádra': 'Prefab bathroom cores',
    'Koupelny v cihlovém bytě': 'Bathrooms in brick-built apartments',
    'Samostatné WC': 'Separate WC',
    'Modernizace před pronájmem': 'Modernisation before letting',
    'Orientační balíčky': 'Indicative packages',
    'Malá koupelna': 'Small bathroom',
    'od 89 000 Kč': 'from 89,000 CZK',
    'Vhodné pro menší koupelny, WC nebo základní modernizaci.':
      'Suitable for small bathrooms, WCs or basic modernisation.',
    'Standardní koupelna': 'Standard bathroom',
    'od 119 000 Kč': 'from 119,000 CZK',
    'Kompletní rekonstrukce koupelny v běžném bytě.':
      'Full bathroom renovation in a typical apartment.',
    'Komfortní řešení': 'Comfort package',
    'od 149 000 Kč': 'from 149,000 CZK',
    'Rozšířený rozsah prací, kvalitnější materiály a více detailů.':
      'Wider scope, higher-grade materials and more detailing.',
    'Ceny jsou orientační. Přesný rozpočet závisí na velikosti koupelny, stavu rozvodů, podkladu, výběru sanity, obkladů a rozsahu prací.':
      'Prices are indicative. The final budget depends on the bathroom size, state of the runs, substrate, fixtures, tiling and scope.',
    'Proč je důležitá příprava podkladu a hydroizolace':
      'Why substrate prep and waterproofing matter',
    'U koupelny nerozhoduje jen finální vzhled. Důležité jsou i vrstvy a návaznosti, které po dokončení nejsou vidět.':
      'A bathroom isn’t just about the final look. The hidden layers and transitions that no one sees afterwards matter just as much.',
    'Podklad, spády a napojení': 'Substrate, slopes and connections',
    'Před pokládkou je potřeba řešit stav podkladu, rovinnost, spády, rohy a napojení kolem vany, sprchy nebo WC.':
      'Before tiling, the substrate condition, flatness, slopes, corners and connections around the tub, shower or WC need attention.',
    'Technicky připravená koupelna': 'A technically prepared bathroom',
    'Koupelna musí být správně připravená i technicky, proto se hydroizolace a příprava řeší před obklady.':
      'A bathroom needs proper technical prep — that’s why waterproofing and prep happen before tiling.',
    'Demontáž starého vybavení': 'Stripping old fixtures',
    'Příprava podkladu': 'Substrate prep',
    'Obklady a dlažba': 'Wall and floor tile',
    'Montáž sanity': 'Fixture installation',
    'Konkrétní sanita': 'Specific fixtures',
    'Koupelnový nábytek': 'Bathroom furniture',
    'Osvětlení a zrcadla': 'Lighting and mirrors',
    'Revize a odborné úkony': 'Inspections and certified work',
    'Jak probíhá rekonstrukce': 'How the renovation runs',
    'Pošlete rozměry, fotky současného stavu a základní představu o rozsahu.':
      'Send measurements, photos of the current state and your idea of the scope.',
    'Konzultace a zaměření': 'Consultation and site survey',
    'Upřesníme možnosti, stav prostoru, návaznosti a případné technické otázky.':
      'We clarify options, the state of the space, dependencies and any technical questions.',
    'Rozpočet a výběr rozsahu': 'Budget and scope choice',
    'Domluvíme, co bude součástí prací a co se bude řešit individuálně.':
      'We agree what is included in the work and what is handled separately.',
    'Demontáž a příprava': 'Strip-out and prep',
    'Proběhne demontáž, příprava podkladu a řešení návazností před novými vrstvami.':
      'We strip out, prep the substrate and resolve transitions before the new layers.',
    'Podle rozsahu se řeší rozvody, hydroizolace, obklady, dlažba a detaily.':
      'Depending on scope we handle the runs, waterproofing, tiling and detailing.',
    'Montáž, úklid a předání': 'Installation, clean-up and handover',
    'Namontuje se sanita a dokončovací prvky, prostor se uklidí a předá.':
      'We install fixtures and finishing pieces, clean up and hand over the space.',
    'Ukázky koupelnových řešení': 'Bathroom design samples',
    'Světlá koupelna se sprchovým koutem': 'Bright bathroom with a shower enclosure',
    'Koupelna s vanou a neutrálním obkladem': 'Bathroom with a tub and neutral tile',
    'Detail umyvadla, zrcadla a osvětlení': 'Detail: basin, mirror and lighting',
    'Kompaktní koupelna s úložným prostorem': 'Compact bathroom with storage',
    'Velkoformátový obklad a čisté linie': 'Large-format tile and clean lines',
    'Detail baterie, dlažby a dokončovacích prvků':
      'Detail: tap, tile and finishing pieces',
    'Kolik stojí rekonstrukce koupelny?': 'How much does a bathroom renovation cost?',
    'Orientační cena začíná u menších koupelen od 89 000 Kč. Výsledný rozpočet závisí na velikosti, stavu rozvodů, výběru materiálů a rozsahu prací.':
      'A rough starting price for smaller bathrooms is around 89,000 CZK. The final budget depends on size, the state of the runs, materials and scope.',
    'Jak dlouho trvá rekonstrukce koupelny?': 'How long does a bathroom renovation take?',
    'Doba realizace se odvíjí od rozsahu prací, stavu rozvodů, dostupnosti materiálu a technologických návazností. Termín se domlouvá po zaměření a schválení rozsahu.':
      'Duration depends on scope, the state of the runs, material availability and technical sequencing. Timing is agreed after the site survey and scope approval.',
    'Dá se použít vlastní sanita a obklady?': 'Can I use my own fixtures and tiles?',
    'Ano, materiál může dodat klient nebo jej lze vybrat společně podle rozpočtu a požadovaného výsledku. Vhodnost sanity a obkladů je dobré ověřit před začátkem prací.':
      'Yes — you can supply materials or we can pick them together by budget and target result. It’s worth checking suitability before starting.',
    'Řešíte i malé koupelny v paneláku?': 'Do you do small panel-block bathrooms?',
    'Ano, malé koupelny v panelových bytech a koupelnová jádra patří mezi běžné typy zakázek. Důležité je upřesnit rozměry, stav jádra a návaznost na rozvody.':
      'Yes — small panel-block bathrooms and prefab bathroom cores are a common job. The key is to pin down dimensions, the core’s state and the run connections.',
    'Je nutné měnit rozvody?': 'Do the runs need to be replaced?',
    'Není to vždy nutné, ale u starších koupelen může být výměna vody, odpadu nebo elektroinstalace vhodná. Stav se posuzuje podle konkrétní koupelny.':
      'Not always — but for older bathrooms, replacing water, drain or electrical runs may be advisable. State is assessed per bathroom.',
    'Co nejvíc ovlivňuje cenu koupelny?': 'What drives bathroom prices the most?',
    'Cenu nejvíc ovlivňuje velikost koupelny, stav rozvodů a podkladu, rozsah demontáže, výběr sanity, obkladů, dlažby a požadované dokončovací práce.':
      'The biggest drivers are size, the state of runs and substrate, demolition scope, fixture and tile choices and the required finishing work.',
    'Ano, zakázku je vhodné řešit s jasným rozsahem prací, rozpočtem, fakturou a záručními podmínkami podle typu prací a smlouvy.':
      'Yes — every job runs with a clear scope, budget, invoice and warranty terms tied to the work type and contract.',
    'Štukování a omítky v Praze pro byty a domy':
      'Plastering and stucco in Prague — for apartments and houses',
    'Ruční i strojní omítky, opravy stěn a příprava povrchů pro malbu nebo další dokončovací práce podle domluveného rozsahu.':
      'Hand and machine plastering, wall repairs and surface prep for painting or further finishing — to the agreed scope.',
    'Kdy štukování a omítky dávají smysl': 'When plaster and stucco make sense',
    'Nerovné nebo popraskané zdi': 'Uneven or cracked walls',
    'Spadaná omítka a staré vrstvy': 'Fallen plaster and old layers',
    'Hrubé přechody mezi panely': 'Rough transitions between panels',
    'Příprava povrchu před malováním, tapetami nebo obklady':
      'Surface prep before painting, wallpapering or tiling',
    'Štukování': 'Stucco',
    'Jemná omítka na hotové zdi': 'Fine plaster on a finished wall',
    'Hrubá omítka': 'Coarse plaster',
    'Strojní omítky': 'Machine plastering',
    'Ruční štuk': 'Hand stucco',
    'Vyrovnání stěn': 'Wall levelling',
    'Základní vyrovnání a penetrace': 'Basic levelling and priming',
    'Sádrové omítky dle přání': 'Gypsum plasters on request',
    'Výhody naší práce': 'Why work with us',
    'Příprava podkladu podle stavu stěn': 'Substrate prep matched to the wall’s condition',
    'Termín podle rozsahu, stavu stěn a technologických přestávek':
      'Timing per scope, wall condition and technical drying times',
    'Materiál a zakrytí ploch podle dohody':
      'Materials and surface protection by agreement',
    'Faktura a záruka dle typu prací a smlouvy':
      'Invoice and warranty per work type and contract',
    'Ukázky před/po': 'Before-and-after samples',
    'Štukování stěn': 'Wall stucco',
    'od 220 Kč/m²': 'from 220 CZK/m²',
    'od 260 Kč/m²': 'from 260 CZK/m²',
    'Vyrovnání nerovností': 'Levelling unevenness',
    'od 150 Kč/m²': 'from 150 CZK/m²',
    'Síťování + penetrace': 'Mesh + primer',
    'od 80 Kč/m²': 'from 80 CZK/m²',
    'Cena je orientační a závisí na rozsahu, stavu místa, materiálu a dostupnosti. Harmonogram ovlivňuje stav podkladu, vlhkost, schnutí vrstev a technologické přestávky.':
      'Prices are indicative and depend on scope, site condition, materials and availability. The schedule is shaped by the substrate, humidity, drying times and technical pauses.',
    'Náš proces': 'Our process',
    'Pošlete popis místností, přibližnou plochu a fotky stěn.':
      'Send a room description, the approximate area and photos of the walls.',
    'Domluvíme stav podkladu, materiál, zakrytí ploch a orientační cenu.':
      'We agree the substrate, materials, surface protection and a rough price.',
    'Připravíme podklad, provedeme omítky nebo štukování podle rozsahu.':
      'We prep the substrate and apply plaster or stucco per the agreed scope.',
    'Po technologických přestávkách zkontrolujeme povrch a předáme práci.':
      'After technical pauses we inspect the surface and hand over the work.',
    'Kolik vrstev doporučujete?': 'How many coats do you recommend?',
    'Obvykle stačí jedna štuková vrstva, ale posoudíme stav zdí na místě.':
      'Usually one stucco coat is enough, but we check the walls on site.',
    'Je nutné před tím penetrovat?': 'Does the wall need priming first?',
    'Ano, před štukováním je penetrace vhodná pro lepší přilnavost.':
      'Yes — priming before stucco helps adhesion.',
    'Můžete dodat i barvu/malíře?': 'Can you supply paint and a painter too?',
    'Ano, umíme navazující malířské práce i materiál.':
      'Yes — we can do follow-on painting and supply the materials.',
    'Jak připravit byt?': 'How should I prepare the apartment?',
    'Doporučujeme odstranit nábytek od zdí a zakrýt citlivé plochy.':
      'We recommend moving furniture away from walls and covering sensitive surfaces.',
    'Jak dlouho práce trvají?': 'How long does the work take?',
    'Termín podle rozsahu, stavu stěn a technologických přestávek. Schnutí vrstev může harmonogram prodloužit.':
      'Timing depends on scope, wall condition and drying pauses — layer drying can extend the schedule.',
    'Co nejvíc ovlivňuje cenu?': 'What drives the price the most?',
    'Rozsah ploch, stav podkladu, počet vrstev, materiál, přístup do prostoru a návazné dokončovací práce.':
      'The area, substrate condition, number of coats, materials, site access and any follow-on finishing.',
    'Zateplení fasád v Praze pro lepší komfort bydlení':
      'Facade insulation in Prague — for better living comfort',
    'Pomůžeme snížit tepelné ztráty a zlepšit komfort bydlení. Výsledná úspora závisí na stavu domu, typu izolace, kvalitě provedení a způsobu vytápění.':
      'We help cut heat losses and improve living comfort. The actual saving depends on the building, the insulation, the quality of execution and the heating system.',
    'Tepelné ztráty a komfort bydlení': 'Heat losses and living comfort',
    'Zateplení fasády pomáhá omezit únik tepla, zlepšit vnitřní komfort a chránit konstrukci domu. Konkrétní přínos vždy posuzujeme podle stavu objektu, zvolené izolace a způsobu užívání domu.':
      'Facade insulation helps cut heat loss, improve indoor comfort and protect the structure. The specific benefit is always assessed per building, insulation choice and how the building is used.',
    'Proč zateplit?': 'Why insulate?',
    'Menší tepelné ztráty': 'Lower heat losses',
    'Vyšší komfort a méně hluku': 'Better comfort and less noise',
    'Ochrana fasády a delší životnost domu': 'Facade protection and longer building life',
    'Materiály a skladba zateplení': 'Materials and insulation build-up',
    'Navrhujeme skladbu fasády podle stavu podkladu, typu domu a požadavků na tepelný komfort. Řešíme izolant, kotvení, armovací vrstvu, finální omítku i detaily kolem otvorů a soklu.':
      'We design the facade build-up based on the substrate, the building and the thermal-comfort target. That covers insulant, fixings, reinforcement, final render and details around openings and the plinth.',
    'Jak funguje zateplení': 'How insulation works',
    'Na schématu je vidět skladba stěny od nosné konstrukce až po finální omítku.':
      'The diagram shows the wall build-up from the structural layer through to the final render.',
    'Co zahrnuje zateplení fasády': 'What facade insulation covers',
    'Posoudíme stav fasády, rovinnost, soudržnost a místa, která vyžadují přípravu před lepením izolace.':
      'We assess the facade — flatness, cohesion and spots that need prep before the insulation is bonded.',
    'Návrh izolace': 'Insulation proposal',
    'Doporučíme vhodný typ izolantu a skladbu podle objektu, požadovaného výsledku a technických možností.':
      'We recommend the right insulant type and build-up for the building, target result and technical options.',
    'Příprava fasády': 'Facade prep',
    'Zajistíme očištění, opravy nesoudržných míst, penetraci a přípravu detailů pro další vrstvy.':
      'We handle cleaning, repairs to loose areas, priming and detailing prep for the next layers.',
    'Lepení a kotvení izolantu': 'Bonding and anchoring the insulation',
    'Izolaci lepíme a kotvíme podle zvolené skladby, podkladu a doporučeného technologického postupu.':
      'We bond and anchor the insulation to the chosen build-up, substrate and the recommended technical process.',
    'Armovací vrstva': 'Reinforcement layer',
    'Připravíme výztužnou vrstvu se síťovinou, rohovými profily a řešením namáhaných míst.':
      'We build the reinforcement layer with mesh, corner profiles and stress-point detailing.',
    'Finální omítka': 'Final render',
    'Po vyzrání vrstev dokončíme fasádu finální omítkou v domluvené struktuře a odstínu.':
      'Once the layers have cured we finish the facade with render in the agreed texture and colour.',
    'Detaily kolem oken, dveří a soklu': 'Details around windows, doors and plinth',
    'Zvláštní pozornost věnujeme napojení na parapety, ostění, dveře, soklovou část a další místa, kde rozhodují detaily provedení.':
      'We pay special attention to sills, jambs, doors, the plinth and other spots where the execution details count.',
    'Kalkulačka ceny': 'Price calculator',
    'Postup prací': 'How the work runs',
    'Návrh skladby': 'Build-up proposal',
    'Před realizací upřesníme rozsah prací, technologický postup, termín a podmínky vhodné pro lepení, armování a finální omítku.':
      'Before starting we clarify the scope, technical process, timing and conditions needed for bonding, reinforcement and the final render.',
    'Kolik stojí zateplení fasády za m²?': 'How much does facade insulation cost per m²?',
    'Cena závisí na ploše fasády, stavu podkladu, typu izolace, tloušťce materiálu, detailech kolem otvorů a zvolené finální omítce. Po upřesnění rozsahu připravíme orientační nebo položkový rozpočet.':
      'Price depends on facade area, substrate condition, insulation type, material thickness, opening details and the chosen render. After scope clarification we prepare a rough or itemised budget.',
    'Jaký typ izolace je vhodný?': 'Which type of insulation is suitable?',
    'Volba izolace závisí na typu domu, požadavcích na tepelný komfort, požární řešení, vlhkostní poměry a rozpočet. Nejprve posoudíme stav objektu a podle toho doporučíme vhodnou skladbu.':
      'The choice depends on building type, thermal comfort, fire requirements, moisture conditions and budget. We first assess the building, then recommend a suitable build-up.',
    'Jak dlouho realizace trvá?': 'How long does the work take?',
    'Délka prací se odvíjí od velikosti fasády, členitosti domu, přípravy podkladu, technologických přestávek a počasí. Termín vždy upřesňujeme podle konkrétní zakázky.':
      'Duration tracks facade size, building geometry, substrate prep, technical pauses and weather. Timing is always confirmed per project.',
    'Dá se zateplovat v každém počasí?': 'Can insulation be done in any weather?',
    'Ne. Lepení, armování i finální omítka potřebují vhodné teploty a suché podmínky. Silný déšť, vítr, mráz nebo vysoké teploty mohou postup prací ovlivnit.':
      'No. Bonding, reinforcement and final render need suitable temperatures and dry conditions. Heavy rain, wind, frost or extreme heat can affect progress.',
    'Pracujete v Praze a okolí?': 'Do you work in Prague and around?',
    'Ano, zateplení fasád řešíme v Praze a okolí. Dostupnost a termín závisí na lokalitě, rozsahu a aktuálním harmonogramu.':
      'Yes — we cover Prague and around. Availability and timing depend on location, scope and our current schedule.',
    'Chcete zlepšit komfort domu a snížit tepelné ztráty?':
      'Want to boost your home’s comfort and cut heat losses?',
    /* ============ lead-form (dynamic, rendered by lead-form.js) ============ */
    'Získat nezávaznou kalkulaci prostoru': 'Get a non-binding space estimate',
    'Získat nezávaznou kalkulaci oprav': 'Get a non-binding repairs estimate',
    'Získat orientační cenu koupelny': 'Get a rough bathroom price',
    'Získat nezávaznou kalkulaci štukování': 'Get a non-binding plastering estimate',
    'Získat nezávaznou kalkulaci elektro prací': 'Get a non-binding electrical estimate',
    'Čím více informací pošlete, tím lépe dokážeme odhadnout další postup.':
      'The more you send us, the better we can estimate the next steps.',
    'Typ služby': 'Service type',
    'Lokalita / část Prahy': 'Location / part of Prague',
    'Přibližná plocha': 'Approximate area',
    'Kdy chcete práce řešit': 'When you want the work done',
    'Popis zakázky': 'Job description',
    'Fotografie prostoru': 'Photos of the space',
    'Volitelné. Fotky pomohou s orientačním posouzením, pokud bude formulář napojený na backend.':
      'Optional. Photos help with a rough assessment once the form is wired to a backend.',
    'Souhlasím se zpracováním údajů za účelem odpovědi na poptávku.':
      'I agree to my data being processed for the purpose of replying to this inquiry.',
    'Štukování / omítky': 'Plastering / stucco',
    'Rekonstrukce kanceláře / komerčního prostoru': 'Office / commercial-space renovation',
    'Jiné': 'Other',
    'Děkujeme, poptávku jsme přijali. Ozveme se vám s dalším postupem.':
      'Thanks — we’ve received your inquiry. We’ll be in touch with next steps.',
    'Formulář se nepodařilo odeslat. Zkuste to prosím znovu nebo nám napište na WhatsApp.':
      'The form couldn’t be sent. Please try again or message us on WhatsApp.',
    'Zkontrolujte prosím povinná pole a souhlas se zpracováním údajů.':
      'Please check the required fields and the data-processing consent.',

    /* lead-form placeholders */
    'Např. Praha 4, Vinohrady, okolí Prahy': 'E.g. Prague 4, Vinohrady, around Prague',
    'Např. 45 m², koupelna 4 m²': 'E.g. 45 m², bathroom 4 m²',
    'Např. co nejdříve, za měsíc, jaro': 'E.g. asap, in a month, spring',
    'Popište stručně prostor, aktuální stav, požadovaný rozsah a důležité detaily.':
      'Briefly describe the space, current state, required scope and important details.',
    'Počet pokojů': 'Number of rooms',
    'Jak pracujeme': 'How we work',

  };

  const DICTS = { en: EN };

  /* ---------- ENGINE ---------- */
  const STORAGE_KEY = 'stavpraha-lang';
  const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE']);
  const INLINE_TAGS = new Set(['BR', 'STRONG', 'EM', 'SPAN', 'A', 'SMALL', 'B', 'I', 'U', 'MARK']);
  const TRANSLATABLE_ATTRS = ['placeholder', 'title', 'alt', 'aria-label'];

  let currentLang = (function () {
    try { return localStorage.getItem(STORAGE_KEY) || 'cs'; } catch (_) { return 'cs'; }
  })();
  let suppress = false;
  let observer = null;
  let pendingApply = false;

  const origText = new WeakMap();
  const origHTML = new WeakMap();
  const origAttrs = new WeakMap();

  function normalize(s) {
    return (s || '')
      .replace(/&nbsp;/g, ' ')
      .replace(/ /g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* Regex fallback for dynamic strings (inline calc scripts inject text like
     "Odhadovaná cena: 1 500 000 Kč" — the embedded number prevents an exact
     dictionary match, so we substitute the static fragments instead). */
  function regexFallback(key, lang) {
    if (lang !== 'en') return null;
    if (/^(Odhadovaná cena|Orientační cena):/.test(key)) {
      return key
        .replace(/^Odhadovaná cena:/, 'Estimated price:')
        .replace(/^Orientační cena:/, 'Estimated price:')
        .replace(/ Kč(\b|$)/g, ' CZK')
        .replace(/(\d) (\d)/g, '$1,$2');
    }
    return null;
  }

  function lookup(text, lang) {
    if (!text || lang === 'cs') return null;
    const dict = DICTS[lang];
    if (!dict) return null;
    const key = normalize(text);
    if (!key) return null;
    if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    return regexFallback(key, lang);
  }

  function isInSkip(el) {
    let p = el;
    while (p && p !== document.body) {
      if (p.nodeType === 1) {
        if (SKIP_TAGS.has(p.tagName)) return true;
        const cl = p.classList;
        if (cl && (cl.contains('lang-toggle') || cl.contains('i18n-skip'))) return true;
        if (p.dataset && p.dataset.i18nSkip !== undefined) return true;
      }
      p = p.parentNode;
    }
    return false;
  }

  function isInlineOnly(el) {
    for (const c of el.childNodes) {
      if (c.nodeType === 1 && !INLINE_TAGS.has(c.tagName)) return false;
    }
    return true;
  }

  /* Try to translate an element via its innerHTML (handles <br> and inline children). */
  function tryTranslateElementHTML(el, lang) {
    if (!el || el.children.length === 0) return false;
    if (!isInlineOnly(el)) return false;
    if (isInSkip(el)) return false;

    if (!origHTML.has(el)) origHTML.set(el, el.innerHTML);
    const original = origHTML.get(el);

    if (lang === 'cs') {
      if (el.innerHTML !== original) el.innerHTML = original;
      return true;
    }
    const translated = lookup(original, lang);
    if (translated !== null) {
      if (el.innerHTML !== translated) el.innerHTML = translated;
      return true;
    }
    return false;
  }

  function translateTextNode(node, lang) {
    if (!node.nodeValue || !node.nodeValue.trim()) return;
    if (isInSkip(node.parentElement || node)) return;

    if (!origText.has(node)) origText.set(node, node.nodeValue);
    const original = origText.get(node);

    if (lang === 'cs') {
      if (node.nodeValue !== original) node.nodeValue = original;
      return;
    }
    const tr = lookup(original, lang);
    if (tr !== null) {
      const lead = original.match(/^\s*/)[0];
      const trail = original.match(/\s*$/)[0];
      node.nodeValue = lead + tr + trail;
    } else if (node.nodeValue !== original) {
      node.nodeValue = original;
    }
  }

  function translateAttrs(root, lang) {
    const selector = TRANSLATABLE_ATTRS.map(a => `[${a}]`).join(',');
    const els = root.querySelectorAll(selector);
    els.forEach(el => {
      if (isInSkip(el)) return;
      if (!origAttrs.has(el)) origAttrs.set(el, {});
      const cache = origAttrs.get(el);
      TRANSLATABLE_ATTRS.forEach(attr => {
        if (!el.hasAttribute(attr)) return;
        if (!(attr in cache)) cache[attr] = el.getAttribute(attr);
        const orig = cache[attr];
        if (lang === 'cs') {
          if (el.getAttribute(attr) !== orig) el.setAttribute(attr, orig);
          return;
        }
        const tr = lookup(orig, lang);
        el.setAttribute(attr, tr !== null ? tr : orig);
      });
    });
  }

  function walkAndTranslate(root, lang) {
    if (!root) return;

    /* Element-level pass first: catches <br>-split labels and elements with inline children. */
    const elements = root.querySelectorAll('*');
    elements.forEach(el => {
      if (el.children.length === 0) return;
      if (isInSkip(el)) return;
      const hasBr = Array.from(el.children).some(c => c.tagName === 'BR');
      const hasInline = isInlineOnly(el);
      if (hasBr || hasInline) tryTranslateElementHTML(el, lang);
    });

    /* Text-node pass for remaining leaf text. */
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.parentElement) return NodeFilter.FILTER_REJECT;
        if (SKIP_TAGS.has(node.parentElement.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(node => translateTextNode(node, lang));

    translateAttrs(root, lang);
  }

  function applyLang(lang) {
    suppress = true;
    document.documentElement.lang = lang;
    walkAndTranslate(document.body, lang);
    document.querySelectorAll('.lang-toggle button').forEach(b => {
      const active = b.dataset.lang === lang;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    /* Release suppression on next frame so observer doesn't immediately re-fire. */
    requestAnimationFrame(() => { suppress = false; });
  }

  function setLang(lang) {
    if (lang !== 'cs' && lang !== 'en') return;
    currentLang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
    applyLang(lang);
    document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang } }));
  }

  function scheduleReapply() {
    if (pendingApply || suppress) return;
    pendingApply = true;
    requestAnimationFrame(() => {
      pendingApply = false;
      if (!suppress) applyLang(currentLang);
    });
  }

  function startObserver() {
    if (observer) observer.disconnect();
    observer = new MutationObserver(mutations => {
      if (suppress) return;
      let relevant = false;
      for (const m of mutations) {
        if (m.type === 'childList' && (m.addedNodes.length || m.removedNodes.length)) {
          for (const n of m.addedNodes) {
            if (n.nodeType === 1 && n.classList && n.classList.contains('lang-toggle')) continue;
            relevant = true; break;
          }
          if (relevant) break;
        }
        if (m.type === 'characterData') { relevant = true; break; }
      }
      if (relevant) scheduleReapply();
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: false });
  }

  /* ---------- UI ---------- */
  function buildToggle() {
    const el = document.createElement('div');
    el.className = 'lang-toggle';
    el.setAttribute('role', 'group');
    el.setAttribute('aria-label', 'Language switcher');
    el.dataset.i18nSkip = '';
    el.innerHTML =
      '<button type="button" data-lang="cs" aria-pressed="true">CS</button>' +
      '<button type="button" data-lang="en" aria-pressed="false">EN</button>';
    el.addEventListener('click', e => {
      const btn = e.target.closest('button[data-lang]');
      if (!btn) return;
      e.preventDefault();
      setLang(btn.dataset.lang);
    });
    return el;
  }

  function injectToggle() {
    if (document.querySelector('.lang-toggle')) return;
    const toggle = buildToggle();
    const navbarCollapse = document.querySelector('.navbar .navbar-collapse');
    if (navbarCollapse) {
      navbarCollapse.appendChild(toggle);
      return;
    }
    /* v2 has a <header class="v2-nav"> or similar in sections.jsx — fall back to floating */
    toggle.classList.add('lang-toggle--floating');
    document.body.appendChild(toggle);
  }

  function injectStyles() {
    if (document.getElementById('i18n-styles')) return;
    const s = document.createElement('style');
    s.id = 'i18n-styles';
    s.textContent =
      '.lang-toggle{display:inline-flex;gap:.15rem;align-items:center;margin-left:.75rem;' +
      'background:#f1f3f5;padding:.2rem;border-radius:999px;font-size:.85rem;font-weight:600;' +
      'line-height:1;vertical-align:middle}' +
      '.lang-toggle button{appearance:none;border:0;background:transparent;color:#6c757d;' +
      'padding:.32rem .72rem;border-radius:999px;cursor:pointer;line-height:1;font:inherit;' +
      'font-weight:600;min-width:38px;text-align:center;transition:background .15s,color .15s}' +
      '.lang-toggle button.active{background:#0d6efd;color:#fff}' +
      '.lang-toggle button:not(.active):hover{color:#212529}' +
      '.lang-toggle--floating{position:fixed;top:1rem;right:1rem;z-index:99999;' +
      'background:rgba(20,20,20,.78);backdrop-filter:blur(10px);' +
      '-webkit-backdrop-filter:blur(10px);box-shadow:0 4px 16px rgba(0,0,0,.15)}' +
      '.lang-toggle--floating button{color:rgba(255,255,255,.72)}' +
      '.lang-toggle--floating button.active{background:#fff;color:#000}' +
      '.lang-toggle--floating button:not(.active):hover{color:#fff}' +
      '@media (max-width:991.98px){.navbar .lang-toggle{margin:.5rem 0 0 0;align-self:flex-start}}' +
      '/* Layout safety for translated content */' +
      '.navbar-nav .nav-link{white-space:nowrap}' +
      '.new-version-banner{flex-wrap:wrap;text-align:center}' +
      '.feature p{min-height:2.4em;line-height:1.2}' +
      '.service-card h5{line-height:1.25}' +
      '.section-title{overflow-wrap:break-word;word-break:normal;hyphens:auto}' +
      '.btn{white-space:normal}';
    document.head.appendChild(s);
  }

  function init() {
    injectStyles();
    injectToggle();
    applyLang(currentLang);
    /* MutationObserver runs on every page so dynamic content (e.g. inline calc
       scripts that write "Odhadovaná cena: X Kč" into the DOM) gets translated
       when the user interacts. The observer is debounced via requestAnimationFrame,
       so cost is minimal. */
    startObserver();
    /* React (v2) mount timing is unpredictable — re-apply across a few frames. */
    if (document.querySelector('#root')) {
      [300, 800, 1600, 3000].forEach(t => setTimeout(() => applyLang(currentLang), t));
      setTimeout(() => { if (!document.querySelector('.lang-toggle')) injectToggle(); }, 1800);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
