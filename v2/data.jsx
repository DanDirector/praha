// Data extracted from stavpraha.com (DanDirector/praha repo)

const SITE = {
  companyName: 'StavPraha',
  tagline: 'Stavební a rekonstrukční práce pro byty, domy a komerční prostory',
  primaryCity: 'Praha',
  location: 'Praha a okolí',
  phone: '+420 777 000 000',
  email: 'info@stavpraha.com',
  whatsapp: '420777000000',
  ico: '00000000',
  address: 'Praha a okolí',
  warrantyText: 'Záruka dle typu prací a smlouvy',
};

const SERVICES = [
  { slug: 'rekonstrukce-bytu', name: 'Rekonstrukce bytu', desc: 'Kompletní i částečné úpravy bytů od přípravy po předání.', tags: ['Byty', 'Na klíč'], img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80' },
  { slug: 'rekonstrukce-koupelny', name: 'Rekonstrukce koupelny', desc: 'Nové rozvody, obklady, sanita a dokončovací práce na klíč.', tags: ['Koupelny', 'WC'], img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=80' },
  { slug: 'obkladacske-prace', name: 'Obkladačské práce', desc: 'Pokládka obkladů a dlažby pro koupelny, kuchyně i podlahy.', tags: ['Dlažba', 'Obklady'], img: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=900&q=80' },
  { slug: 'elektroinstalace', name: 'Elektroinstalace', desc: 'Úpravy rozvodů, zásuvek, osvětlení a revize podle typu zakázky.', tags: ['Elektro', 'Revize'], img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80' },
  { slug: 'hodinovy-manzel', name: 'Hodinový manžel', desc: 'Drobné opravy, montáže a údržba domácnosti podle domluvy.', tags: ['Opravy', 'Montáž'], img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80' },
  { slug: 'rekonstrukce-kancelari', name: 'Rekonstrukce kanceláří', desc: 'Úpravy kanceláří a komerčních prostor s jasným harmonogramem.', tags: ['Office', 'B2B'], img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80' },
  { slug: 'kosmeticky-remont', name: 'Kosmetické opravy', desc: 'Drobné opravy povrchů, malování a dokončovací práce.', tags: ['Malování'], img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=80' },
  { slug: 'zatepleni-fasady', name: 'Zateplení fasád', desc: 'Zateplení a fasádní práce podle stavu domu a zvoleného systému.', tags: ['Fasády', 'Tepelná izolace'], img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80' },
  { slug: 'stukovani-omitky', name: 'Štukatérské práce', desc: 'Omítky, štukování a příprava stěn pro malování nebo obklady.', tags: ['Omítky', 'Štuk'], img: 'https://images.unsplash.com/photo-1503594384566-461fe158e797?auto=format&fit=crop&w=900&q=80' },
  { slug: 'rekonstrukce-domu', name: 'Rekonstrukce domů', desc: 'Úpravy rodinných domů, interiérů i navazujících stavebních prací.', tags: ['RD', 'Komplet'], img: 'https://images.unsplash.com/photo-1564540583246-934409427776?auto=format&fit=crop&w=900&q=80' },
];

const FEARS = [
  { text: 'Že se cena během prací nečekaně navýší', meta: 'Fixní rozsah' },
  { text: 'Že nebude jasné, kdo za zakázku odpovídá', meta: 'Jeden kontakt' },
  { text: 'Že se práce protáhnou bez vysvětlení', meta: 'Harmonogram' },
  { text: 'Že po řemeslnících zůstane nepořádek', meta: 'Úklid v ceně' },
  { text: 'Že nebude jasné, co je a není v ceně', meta: 'Rozpočet předem' },
];

const ADVANTAGES = [
  { title: 'Přehledný rozpočet před začátkem prací', text: 'Rozsah prací, materiál a termín domlouváme předem, aby bylo jasné, co je součástí zakázky.' },
  { title: 'Možnost návrhu podle rozsahu zakázky', text: 'Podle typu prací pomůžeme upřesnit dispozici, materiály a výsledný vzhled ještě před zahájením realizace.' },
  { title: 'Orientační odhad ceny online', text: 'Zadejte pár údajů a získáte první orientační rozpočet, který můžeme následně upřesnit podle reálného rozsahu.' },
  { title: 'Záruka dle typu prací a smlouvy', text: 'Záruční podmínky a odpovědnost za provedené práce nastavujeme podle konkrétní zakázky a použitých materiálů.' },
  { title: 'Materiály podle dohody a rozpočtu', text: 'Materiály vybíráme podle rozsahu prací, požadované kvality a domluveného rozpočtu.' },
  { title: 'Ukázky prací podle typu zakázky', text: 'Při domluvě pomohou fotografie, reference a ukázky podobných realizací podle rozsahu plánovaných prací.' },
];

const PROCESS = [
  { title: 'Pošlete popis nebo fotky', text: 'Stačí základní informace o prostoru, lokalitě a tom, co chcete změnit.' },
  { title: 'Upřesníme rozsah a možnosti', text: 'Projdeme návaznosti, materiál, termín podle dostupnosti a možná omezení.' },
  { title: 'Domluvíme zaměření', text: 'U větších zakázek ověříme stav prostoru, rozvodů, podkladu a přístupu.' },
  { title: 'Připravíme rozpočet a postup', text: 'Rozsah prací domluvíme předem, aby bylo jasné, co je a není součástí.' },
  { title: 'Realizace a průběžná komunikace', text: 'Během prací držíme jeden kontakt a podle potřeby posíláme průběžné informace.' },
  { title: 'Úklid, kontrola a předání', text: 'Zakázku uzavírá kontrola provedených prací a předání hotového prostoru.' },
];

const REVIEWS = [
  { text: 'Férovou domluvu před začátkem prací a jasnější představu o ceně a rozsahu.', name: 'Martin', stage: 'Před zahájením', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
  { text: 'Průběžnou komunikaci během realizace a jeden kontakt pro domluvu.', name: 'Lucie', stage: 'Během prací', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80' },
  { text: 'Čistší předání prostoru a srozumitelný další postup po dokončení.', name: 'Honza', stage: 'Předání', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
];

const SPACES = [
  { name: 'Kuchyně', glyph: '◐' },
  { name: 'Koupelna', glyph: '◇' },
  { name: 'Přístavba', glyph: '◑' },
  { name: 'Obytný prostor', glyph: '◧' },
  { name: 'Podkroví', glyph: '◮' },
  { name: 'Sklep', glyph: '◨' },
  { name: 'Ložnice', glyph: '◍' },
];

const PARTNERS = [
  'KNAUF', 'CEMIX', 'BAUMIT', 'HORNBACH', 'RAKO', 'SIKO', 'JIKA', 'WEBER',
];

const CERTS = [
  { name: 'Živnostenské oprávnění', code: 'ŽL', meta: 'Stavební činnost' },
  { name: 'Pojištění odpovědnosti', code: 'INS', meta: 'Profesní pojištění' },
  { name: 'Členství v cechu', code: 'CCH', meta: 'Cech malířů a lakýrníků' },
  { name: 'Energetický auditor', code: 'EA', meta: 'Zateplení fasád' },
];

const TEAM = [
  { name: 'Daniel', role: 'Zakladatel · Vedení zakázek', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80' },
  { name: 'Tomáš', role: 'Stavbyvedoucí', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80' },
  { name: 'Pavel', role: 'Obkladač · Štukatér', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80' },
  { name: 'Jana', role: 'Koordinátor projektů', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
];

const BLOG = [
  { date: '12 / 05 / 26', cat: 'Rekonstrukce', title: 'Kolik stojí rekonstrukce panelového bytu v roce 2026' },
  { date: '28 / 04 / 26', cat: 'Koupelna', title: 'Bytové jádro vs. zděná koupelna: srovnání nákladů' },
  { date: '15 / 04 / 26', cat: 'Materiály', title: 'Velkoformátová dlažba — kdy se vyplatí a kdy ne' },
  { date: '03 / 04 / 26', cat: 'Proces', title: 'Co musí být ve smlouvě o dílo: 7 bodů, na které lidé zapomínají' },
  { date: '21 / 03 / 26', cat: 'Fasáda', title: 'Zateplení fasády bytového domu: na co se ptát realizátora' },
];

const FAQ = [
  { q: 'Kolik stojí rekonstrukce bytu v Praze?', a: 'Orientačně může částečná rekonstrukce začínat od 3 500 Kč/m² a kompletní rekonstrukce od 8 000 Kč/m². Výsledná cena závisí na stavu bytu, rozsahu prací, materiálech a možnostech realizace.' },
  { q: 'Jak dlouho rekonstrukce bytu trvá?', a: 'Termín závisí na rozsahu, stavu bytu, dostupnosti materiálů a návaznosti profesí. Menší úpravy mohou být kratší, kompletní rekonstrukce vyžaduje podrobnější harmonogram.' },
  { q: 'Může být byt během rekonstrukce obývaný?', a: 'Záleží na rozsahu prací. U menších úprav to někdy možné je, u zásahů do koupelny, rozvodů, podlah nebo více místností bývá praktičtější byt dočasně vyklidit.' },
  { q: 'Můžu dodat vlastní materiál?', a: 'Ano, materiál může dodat klient nebo jej lze vybrat společně podle rozpočtu a požadovaného výsledku. Vhodnost materiálu je dobré ověřit před zahájením prací.' },
  { q: 'Řešíte i elektro, vodu a odpady?', a: 'Ano, podle rozsahu rekonstrukce lze řešit elektro, vodu a odpady. Revize a odborné úkony se řeší podle typu zakázky a požadavků.' },
  { q: 'Dostanu smlouvu, fakturu a záruku?', a: 'Zakázku je vhodné řešit s jasným rozsahem prací, rozpočtem, fakturou a záručními podmínkami podle typu provedených prací a smlouvy.' },
];

const PORTFOLIO = [
  { title: 'Byt 3+kk · Vinohrady', tag: 'Kompletní rekonstrukce', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80' },
  { title: 'Koupelna · Smíchov', tag: 'Na klíč', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80' },
  { title: 'Kancelář · Karlín', tag: 'Komerční prostor', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80' },
  { title: 'Rodinný dům · Praha-západ', tag: 'Interiér + fasáda', img: 'https://images.unsplash.com/photo-1564540583246-934409427776?auto=format&fit=crop&w=1400&q=80' },
];

const BEFORE_AFTER = {
  before: 'https://images.unsplash.com/photo-1503594384566-461fe158e797?auto=format&fit=crop&w=1600&q=80',
  after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
};

Object.assign(window, {
  SITE, SERVICES, FEARS, ADVANTAGES, PROCESS, REVIEWS, SPACES, PARTNERS,
  CERTS, TEAM, BLOG, FAQ, PORTFOLIO, BEFORE_AFTER,
});
