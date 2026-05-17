# StavPraha — мастер-шаблон для доведения сайта до продаваемого состояния

## Цель

Сделать сайт не как демо-заглушку и не как «недоделанный проект», а как **готовый универсальный сайт строительной/ремонтной компании в Праге**, который можно продать новому исполнителю и быстро адаптировать под него.

Финальная логика:

> Новый строитель покупает сайт → даёт логотип, телефон, WhatsApp, e-mail, адрес, фото работ, цены → сайт становится его рабочим сайтом.

Не нужно писать на публичных страницах, что сайт продаётся или что это демо. Это объясняется отдельно потенциальному покупателю. Сам сайт должен выглядеть как обычный готовый сайт строительной фирмы.

---

# 1. Что такое «готовый сайт» в этом случае

Готовый сайт — это не значит, что у него уже есть реальная строительная компания за спиной.

Готовый сайт — это значит:

1. все страницы выполнены в одном стиле;
2. нет пустых/полусырых страниц;
3. каждая услуга имеет нормальную продающую структуру;
4. везде есть понятный CTA;
5. везде единый footer, единые контакты, единая логика;
6. нет противоречивых обещаний;
7. нет случайных фраз, которые выглядят как временные тесты;
8. есть место под реальные фото, отзывы, контакты и логотип;
9. сайт можно быстро адаптировать под нового владельца.

---

# 2. Главная проблема текущего сайта

Сайт уже имеет сильную структуру, но он неравномерный:

- главная страница выглядит как продуманный лендинг;
- страницы Obkladačské práce и Štukování ближе всего к нормальным страницам услуг;
- Rekonstrukce koupelny имеет хороший каркас, но слишком короткая и с SEO-текстом, вставленным внизу;
- Rekonstrukce bytu выглядит как средний черновик;
- Kanceláře и Kontakty выглядят слишком пустыми;
- Zateplení fasád содержит слишком смелые утверждения;
- некоторые страницы выглядят как разные эксперименты по дизайну и структуре.

Задача — привести всё к одной системе.

---

# 3. Единый шаблон страницы услуги

Каждая страница услуги должна иметь одинаковую скелетную структуру.

## Блок 1. Hero

**Назначение:** сразу объяснить услугу, город, пользу и дать кнопку.

Структура:

```text
H1: [Služba] v Praze
Subtitle: Krátké vysvětlení, co přesně děláme a pro koho.
CTA 1: Nezávazná kalkulace zdarma
CTA 2: Napsat na WhatsApp
Mini-trust: Praha a okolí / Smlouva / Faktura / Záruka dle typu prací
```

Пример для ванной:

```text
H1: Rekonstrukce koupelny v Praze na klíč
Subtitle: Od demontáže staré koupelny přes nové rozvody, obklady a sanitu až po finální úklid a předání.
CTA: Získat nezávaznou kalkulaci
Mini-trust: Zaměření • Rozpočet • Realizace • Záruka
```

Пример для квартиры:

```text
H1: Rekonstrukce bytů v Praze bez zbytečného stresu
Subtitle: Kompletní i částečné rekonstrukce bytů — koordinace řemeslníků, přehledný rozpočet a jasný postup od zaměření po předání.
CTA: Získat nabídku zdarma
Mini-trust: Praha a okolí • Smlouva • Faktura • Fotodokumentace
```

---

## Блок 2. Быстрые преимущества

Не надо делать слишком громко. Лучше звучать профессионально и универсально.

Структура:

```text
3–6 карточек преимуществ
```

Универсальные варианты:

```text
Přehledný rozpočet před začátkem prací
Jeden kontakt pro celou zakázku
Možnost dodat materiál nebo pracovat s vaším
Fotodokumentace průběhu realizace
Smlouva, faktura a záruka dle typu prací
Úklid a předání hotové práce
```

Что лучше убрать или смягчить:

```text
Cash-back za zpoždění → Jasně domluvený termín ve smlouvě
ISO certifikace → Ověřený postup a práce podle domluveného rozsahu
3D / AR zdarma → Možnost návrhu podle rozsahu zakázky
5 let záruka → Záruka dle typu prací a smlouvy
Cenová nabídka do 1 minuty → Orientační odhad ceny online
```

---

## Блок 3. Что входит в услугу

Это один из самых важных блоков. Он делает страницу не пустой, а конкретной.

Структура:

```text
H2: Co služba zahrnuje
6–10 пунктов
```

Пример для ванной:

```text
Co zahrnuje rekonstrukce koupelny
- demontáž starého vybavení;
- odvoz suti a příprava prostoru;
- nové rozvody vody a elektřiny podle potřeby;
- hydroizolace a příprava podkladu;
- pokládka obkladů a dlažby;
- montáž sanity, baterií a nábytku;
- osvětlení, zrcadla a doplňky;
- závěrečný úklid a předání.
```

Пример для квартиры:

```text
Co může zahrnovat rekonstrukce bytu
- bourací a přípravné práce;
- nové rozvody elektřiny, vody a odpadu;
- omítky, štukování a malování;
- podlahy, obklady a dlažby;
- koupelna a WC;
- příprava kuchyňské části;
- dveře, lišty a dokončovací práce;
- koordinace jednotlivých profesí;
- závěrečný úklid a předání bytu.
```

---

## Блок 4. Для кого / какие объекты

Этот блок добавляет ощущение живой практики.

Структура:

```text
H2: Pro jaké objekty je služba vhodná
Карточки по типам объектов
```

Для квартир:

```text
Panelové byty
Cihlové byty
Novostavby
Byty k pronájmu
Investiční byty
Byty před prodejem
```

Для ванных:

```text
Malé koupelny v paneláku
Koupelnová jádra
Koupelny v cihlovém bytě
Samostatné WC
Bezbariérové koupelny
Modernizace před pronájmem
```

Для офисов:

```text
Kanceláře a open space
Ordinace a salony
Obchodní prostory
Coworkingy
Zázemí pro zaměstnance
Sociální zařízení
```

---

## Блок 5. Пакеты или ориентировочные цены

Цены нужны, но не надо обещать слишком точно. Лучше писать «orientačně» и «od».

Структура:

```text
H2: Orientační ceny
3 пакета или таблица
Пометка: přesná cena závisí na rozsahu, materiálu a stavu objektu.
```

Пример для ванной:

```text
Orientační cena rekonstrukce koupelny

Malá koupelna
od 89 000 Kč
Vhodné pro menší koupelny a základní výměnu vybavení.

Standardní koupelna
od 119 000 Kč
Nové rozvody, obklady, sanita, osvětlení a úklid.

Komfortní řešení
od 149 000 Kč
Lepší materiály, úprava dispozice, detaily na míru.

Přesná cena se stanoví po zaměření a výběru materiálů.
```

Пример для квартиры:

```text
Orientační cena rekonstrukce bytu

Částečná rekonstrukce
od ___ Kč/m²
Vhodné pro úpravu vybraných částí bytu.

Kompletní rekonstrukce
od ___ Kč/m²
Rozvody, povrchy, koupelna, podlahy a dokončovací práce.

Rekonstrukce na klíč
individuálně
Kompletní koordinace, materiály, harmonogram a předání.
```

Для страниц, где цены уже есть, надо привести их к одному визуальному стилю.

---

## Блок 6. Как проходит работа

Один из самых важных блоков для доверия.

Единый вариант для большинства страниц:

```text
Jak probíhá spolupráce

1. Nezávazná poptávka
Pošlete nám krátký popis prací, lokalitu a případně fotografie.

2. Konzultace a zaměření
Upřesníme rozsah prací a podle potřeby domluvíme zaměření na místě.

3. Rozpočet a termín
Připravíme orientační nebo položkový rozpočet a navrhneme termín realizace.

4. Realizace prací
Zajistíme materiál, řemeslníky a průběžnou komunikaci.

5. Předání a úklid
Po dokončení práce zkontrolujeme, uklidíme a předáme hotový výsledek.
```

---

## Блок 7. Галерея / ukázky prací

Если нет реальных фото, лучше не писать «naše reálné zakázky». Просто назвать блок нейтрально:

```text
Ukázky realizací
Inspirace a příklady prací, které lze doplnit vašimi skutečnými fotografiemi.
```

Если хочешь публично сделать сайт как боевой — не писать второе предложение, просто оставить:

```text
Ukázky realizací
```

Подписи к изображениям должны быть конкретными:

```text
Koupelna po rekonstrukci
Pokládka velkoformátové dlažby
Štukování stěn před malováním
Rekonstrukce bytu Praha
```

Не использовать:

```text
Image 1
before
after
Partner 1
```

---

## Блок 8. Отзывы

Отзывы должны выглядеть реалистично, но не слишком театрально.

Шаблон:

```text
„Rychlá domluva, čistá práce a dobrá komunikace během celé rekonstrukce. Výsledek odpovídal tomu, co jsme si domluvili.“

Petr, Praha 6
```

Лучше не писать слишком рекламно:

```text
Nejlepší firma v Praze, absolutně dokonalé, všechno bylo luxusní.
```

---

## Блок 9. FAQ

На каждой странице должно быть 4–6 вопросов.

Универсальные вопросы:

```text
Jak rychle můžete začít?
Záleží na rozsahu a aktuální dostupnosti. Menší práce lze často domluvit rychleji, větší rekonstrukce plánujeme podle harmonogramu.

Děláte práce i s materiálem?
Ano, můžeme zajistit materiál nebo pracovat s materiálem, který dodá zákazník.

Je možné získat cenu předem?
Ano, po upřesnění rozsahu připravíme orientační nebo položkový rozpočet.

Pracujete v celé Praze?
Ano, působíme v Praze a okolí. Konkrétní lokalitu ověříme při poptávce.

Dostanu fakturu a smlouvu?
Ano, podle rozsahu zakázky je možné připravit smlouvu o dílo a vystavit fakturu.
```

---

## Блок 10. Финальный CTA

Каждая страница должна заканчиваться одинаково.

```text
Chcete znát orientační cenu?
Pošlete nám krátký popis prací, lokalitu a několik fotografií. Ozveme se vám s dalším postupem.

CTA: Získat nezávaznou kalkulaci
CTA: Napsat na WhatsApp
```

---

# 4. Что надо сделать с главной страницей

Главная уже сильная, но требует чистки.

## Исправить hero

Текущий сильный, но слишком жёсткий по обещаниям. Лучше сделать универсальнее:

```text
H1: Rekonstrukce bytů, koupelen a domů v Praze
Subtitle: Přehledný rozpočet, jasný postup a realizace od zaměření po předání.
CTA: Spočítat orientační cenu
CTA: Napsat na WhatsApp
```

## Смягчить преимущества

Заменить:

```text
Fixní cena → Přehledný rozpočet
Cash-back za zpoždění → Jasně domluvený termín
3D / AR návrh → Možnost návrhu interiéru
Denní fotoreport → Průběžná fotodokumentace
5 let záruka → Záruka dle typu prací
```

## Убрать дубли услуг

На главной сейчас есть две похожие карточки по реконструкции квартиры. Должна быть одна:

```text
Rekonstrukce bytů
Rekonstrukce koupelen
Obkladačské práce
Elektroinstalace
Hodinový manžel
Rekonstrukce kanceláří
Kosmetické opravy
Zateplení fasád
Štukování a omítky
Rekonstrukce domů
```

## Переделать блок «партнёры»

Если нет реальных логотипов/договорённостей, лучше назвать:

```text
Materiály a značky, se kterými běžně pracujeme
```

И не писать, что есть партнёрские цены, если это не подтверждено.

---

# 5. Страница Rekonstrukce koupelny — как довести

Сейчас страница перспективная, но слишком короткая.

Добавить структуру:

```text
Hero
Výhody
Co zahrnuje rekonstrukce koupelny
Typy koupelen
Orientační ceny / balíčky
Jak pracujeme
Ukázky realizací
FAQ
Finální CTA
```

Готовый текстовый блок:

```text
Co zahrnuje rekonstrukce koupelny
Rekonstrukce koupelny může zahrnovat demontáž původního vybavení, úpravu rozvodů vody a elektřiny, hydroizolaci, pokládku obkladů a dlažby, montáž sanity, osvětlení, koupelnového nábytku a závěrečný úklid. Rozsah vždy upravíme podle stavu koupelny, rozpočtu a požadovaného standardu.
```

SEO-текст внизу разбить на нормальные секции, а не оставлять длинным полотном.

---

# 6. Страница Rekonstrukce bytu — как довести

Сейчас страница имеет каркас, но ей не хватает конкретики.

Добавить:

```text
Co zahrnuje rekonstrukce bytu
Typy bytů
Orientační ceny
Jak probíhá rekonstrukce
Časté otázky
```

Смягчить:

```text
ISO certifikace
Licencovaní řemeslníci
5 let záruka
```

Лучше:

```text
Smlouva a jasný rozsah prací
Ověřené profese podle typu zakázky
Záruka dle typu prací
```

Добавить блок:

```text
Rekonstrukce panelového i cihlového bytu
Každý typ bytu má svá specifika. U panelových bytů se často řeší koupelnové jádro, rozvody a podlahy. U cihlových bytů bývá důležitý stav omítek, elektroinstalace, dispozice a napojení jednotlivých profesí. Před začátkem vždy upřesníme rozsah a doporučíme vhodný postup.
```

---

# 7. Страница Obkladačské práce — использовать как эталон

Эта страница ближе всего к готовой.

Что поправить:

1. убрать сломанные символы;
2. добавить описание под карточки типов работ;
3. добавить блок про velkoformátové dlaždice;
4. добавить блок про hydroizolace;
5. выровнять FAQ по стилю;
6. привести CTA к общему виду.

Готовый дополнительный блок:

```text
Velkoformátové obklady a dlažba
U větších formátů je důležitá přesná příprava podkladu, správné lepidlo, rovinnost a pečlivé řezání. Pomůžeme s pokládkou velkoformátové dlažby v koupelně, chodbě, kuchyni i dalších prostorách.
```

---

# 8. Страница Štukování a omítky — почти готовая

Она тоже хорошая, но надо сделать аккуратнее.

Поправить:

```text
Rychlé dodání (1–2 dny pro byt)
```

на:

```text
Rychlý termín podle rozsahu prací
```

Добавить блок:

```text
Kdy je vhodné štukování nebo nová omítka
Štukování je vhodné při rekonstrukci bytu, po odstranění starých vrstev, před malováním nebo při opravě popraskaných a nerovných stěn. Podle stavu podkladu doporučíme penetraci, vyrovnání, síťování nebo novou omítku.
```

---

# 9. Страница Rekonstrukce kanceláří — надо дописать почти с нуля

Текущая страница слишком короткая.

Добавить:

```text
Co umíme upravit
- podlahy;
- příčky;
- malování;
- osvětlení;
- elektroinstalace;
- kuchyňky;
- toalety;
- recepce;
- zasedací místnosti;
- akustické úpravy.
```

Готовый блок:

```text
Rekonstrukce bez zbytečného omezení provozu
U kanceláří a komerčních prostor je důležité plánovat práce tak, aby co nejméně narušily běžný provoz. Podle rozsahu zakázky lze práce rozdělit na etapy, domluvit víkendové termíny nebo realizovat vybrané části mimo hlavní pracovní dobu.
```

Процесс:

```text
1. Konzultace provozu a rozsahu prací
2. Zaměření prostoru
3. Harmonogram a etapizace
4. Realizace prací
5. Úklid a předání prostoru
```

---

# 10. Страница Kontakty — надо сделать полноценной

Сейчас она слишком пустая.

Новая структура:

```text
H1: Kontaktujte nás
Subtitle: Pošlete nám popis prací, lokalitu a několik fotografií. Ozveme se vám s dalším postupem.

Kontaktní karty:
- Telefon
- WhatsApp
- E-mail
- Lokalita: Praha a okolí
- Pracovní doba

Formulář:
- Jméno
- Telefon
- E-mail
- Typ práce
- Lokalita
- Popis zakázky
- Možnost přiložit fotografie

Co se stane po odeslání poptávky:
1. Ozveme se vám
2. Upřesníme rozsah
3. Domluvíme zaměření nebo orientační kalkulaci
4. Navrhneme další postup
```

Готовый текст:

```text
Pošlete nám popis zakázky
Napište, jaký typ práce potřebujete, kde se objekt nachází a v jakém termínu byste chtěli začít. Pokud můžete, přiložte několik fotografií současného stavu — pomůže nám to rychleji odhadnout rozsah prací.
```

---

# 11. Страница Zateplení fasád — смягчить обещания

Текущая страница содержит слишком категоричные утверждения.

Заменить:

```text
Energetická úspora až 60 %
```

на:

```text
Pomůžeme snížit tepelné ztráty a zlepšit komfort bydlení
```

Заменить:

```text
Skutečné účty dokazují...
```

на:

```text
Výsledná úspora závisí na stavu domu, typu izolace, kvalitě provedení a způsobu vytápění.
```

Добавить:

```text
Co zahrnuje zateplení fasády
- kontrola stavu podkladu;
- návrh vhodné izolace;
- příprava fasády;
- lepení a kotvení izolantu;
- armovací vrstva;
- finální omítka;
- detaily kolem oken, dveří a soklu.
```

---

# 12. Kosmetické opravy — привести к нормальному офферу

Заменить:

```text
Objednat opravu zdarma
```

на:

```text
Získat nezávaznou nabídku
```

Убрать или ослабить:

```text
Právě probíhá akce na garsonky a malé byty
```

Лучше:

```text
Vhodné pro byty před pronájmem, prodejem nebo rychlým nastěhováním.
```

Добавить блок:

```text
Kdy se hodí kosmetická oprava
- před pronájmem bytu;
- po odchodu nájemníků;
- před prodejem nemovitosti;
- po menším poškození stěn nebo lišt;
- když není potřeba kompletní rekonstrukce.
```

---

# 13. Единый footer

Footer должен быть одинаковым на всех страницах.

Структура:

```text
StavPraha
Rekonstrukce bytů, koupelen a stavební práce v Praze a okolí.

Stránky:
- Úvod
- Rekonstrukce bytů
- Rekonstrukce koupelen
- Obklady
- Omítky
- Kontakt

Další služby:
- Kosmetické opravy
- Elektroinstalace
- Rekonstrukce kanceláří
- Zateplení fasád
- Hodinový manžel

Kontakt:
Telefon: [PHONE]
E-mail: [EMAIL]
WhatsApp: [WHATSAPP]
Lokalita: Praha a okolí

© 2026 StavPraha
```

Важно: контакты должны быть переменными, чтобы можно было заменить один раз и обновить весь сайт.

---

# 14. Переменные для white-label продажи

В коде/контенте лучше использовать одну систему переменных:

```text
[COMPANY_NAME]
[PHONE]
[EMAIL]
[WHATSAPP]
[ADDRESS]
[ICO]
[LOGO]
[PRIMARY_CITY]
[WARRANTY_TEXT]
[PHOTO_GALLERY]
[REVIEWS]
```

При продаже покупатель даёт данные, и ты заменяешь их по всему сайту.

---

# 15. Финальный порядок доработки

## Этап 1 — привести сайт к единой системе

1. Унифицировать header/footer.
2. Убрать дубли услуг на главной.
3. Сделать единый CTA.
4. Заменить спорные обещания на универсальные.
5. Сделать переменные для контактов.

## Этап 2 — довести основные страницы

1. Главная.
2. Rekonstrukce koupelny.
3. Rekonstrukce bytu.
4. Obkladačské práce.
5. Štukování a omítky.
6. Kontakty.

## Этап 3 — довести вторичные страницы

1. Rekonstrukce domu.
2. Rekonstrukce kanceláří.
3. Kosmetické opravy.
4. Zateplení fasád.
5. Elektroinstalace.
6. Hodinový manžel.

## Этап 4 — подготовить продажу

1. Подготовить короткое сообщение строителям.
2. Подготовить PDF/страницу с объяснением, что входит.
3. Собрать список потенциальных покупателей.
4. Предложить сайт как готовый пакет с адаптацией.

---

# 16. Как продавать сайт

Не продавать как «заброшенный проект».

Продавать как:

> Hotový web pro stavební / rekonstrukční firmu v Praze. Web je připravený k rychlé úpravě na konkrétní firmu — logo, telefon, e-mail, WhatsApp, fotografie, reference a ceny lze vyměnit podle vašich údajů.

По-русски:

> Готовый сайт для строительной/ремонтной компании в Праге. Его можно быстро адаптировать под конкретную фирму: заменить логотип, телефон, WhatsApp, e-mail, фотографии, отзывы и цены.

---

# 17. Главная формула проекта

Сайт должен выглядеть так:

> Это не шаблон из конструктора. Это готовый маркетинговый сайт под ремонтную компанию в Праге, где осталось заменить данные владельца.

Именно это надо довести.

