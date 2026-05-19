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
  };

  const DICTS = { en: EN };

  /* ---------- ENGINE ---------- */
  const STORAGE_KEY = 'stavpraha-lang';
  const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE', 'TEXTAREA']);
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

  function lookup(text, lang) {
    if (!text || lang === 'cs') return null;
    const dict = DICTS[lang];
    if (!dict) return null;
    const key = normalize(text);
    if (!key) return null;
    return Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : null;
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
    /* For React (v2) or any other dynamic content: re-apply after React mounts,
       then start the observer to catch later updates. Staggered re-applies because
       Babel-in-browser + React mount timing is unpredictable. */
    if (document.querySelector('#root')) {
      [300, 800, 1600, 3000].forEach(t => setTimeout(() => applyLang(currentLang), t));
      setTimeout(startObserver, 1200);
      setTimeout(() => { if (!document.querySelector('.lang-toggle')) injectToggle(); }, 1800);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
