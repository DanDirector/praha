// All page sections
const { useState: useS, useEffect: useE, useRef: useR } = React;

// ============================================
// NAV
// ============================================
function Nav() {
  return (
    <nav className="nav">
      <a href="#top" className="nav-logo" data-cursor="hover">
        <span className="nav-logo-mark"></span>
        <span>StavPraha</span>
      </a>
      <ul className="nav-links">
        <li><a href="#sluzby">Služby</a></li>
        <li><a href="#portfolio">Reference</a></li>
        <li><a href="#proces">Proces</a></li>
        <li><a href="#kalkulator">Kalkulačka</a></li>
        <li><a href="#kontakt">Kontakt</a></li>
      </ul>
      <a href="#kontakt" className="nav-cta" data-cursor="hover">Nezávazná poptávka →</a>
    </nav>
  );
}

// ============================================
// HERO
// ============================================
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="hero-meta">
          <span>StavPraha · 2026</span>
          <span>Praha a okolí · CZ</span>
          <span>↓ Scroll</span>
        </div>
        <div className="hero-spacer"></div>
        <h1 className="hero-title reveal">
          Rekonstrukce<br />
          bytů, koupelen<br />
          a domů <em>v Praze</em><br />
          bez chaosu.
        </h1>
        <div className="hero-strip"></div>
        <div className="hero-bottom">
          <p className="hero-sub reveal">
            Přehledný rozpočet, jasný postup, jeden kontakt a realizace od zaměření po předání. Více než deset profesí pod jednou střechou — od bourání po úklid a předání hotového prostoru.
          </p>
          <div className="hero-ctas">
            <a href="#kalkulator" className="btn btn-accent" data-cursor="accent" data-cursor-label="Spočítat">
              Získat orientační kalkulaci
              <span className="btn-arrow"></span>
            </a>
            <a href="#" className="btn btn-outline" data-cursor="hover">
              WhatsApp
              <span className="btn-arrow"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MARQUEE
// ============================================
function Marquee() {
  const items = ['Rekonstrukce', 'Koupelny', 'Elektroinstalace', 'Fasády', 'Štuky', 'Obklady', 'Kanceláře'];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="marquee-item">{it}</span>
        ))}
      </div>
    </div>
  );
}

// ============================================
// ABOUT
// ============================================
function About() {
  return (
    <section id="o-nas">
      <div className="container">
        <div className="section-label mono reveal">[01] / O nás</div>
        <div className="about-grid">
          <div className="about-lead reveal">
            Stavební a rekonstrukční práce <em>pro byty, domy a komerční prostory</em> v Praze a okolí. Pracujeme s předem domluveným rozsahem, orientačním rozpočtem a průběžnou komunikací.
          </div>
          <div className="about-side">
            <div className="about-stat reveal">
              <div className="about-stat-num">10<em>+</em></div>
              <div className="about-stat-label">profesí pod jednou střechou — bourání, elektro, voda, obklady, štuky, podlahy, dveře, úklid</div>
            </div>
            <div className="about-stat reveal">
              <div className="about-stat-num">1</div>
              <div className="about-stat-label">kontakt po celou dobu zakázky — bez přeposílání mezi řemeslníky</div>
            </div>
            <div className="about-stat reveal">
              <div className="about-stat-num"><em>0</em></div>
              <div className="about-stat-label">skrytých položek v rozpočtu — co domluvíme, to platí</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// FEARS (concerns list)
// ============================================
function Fears() {
  return (
    <section id="obavy">
      <div className="container">
        <div className="section-label mono reveal">[02] / Obavy</div>
        <h2 className="display medium reveal" style={{ marginBottom: 'var(--space-3)', maxWidth: '20ch' }}>
          Čeho se lidé při rekonstrukci nejčastěji obávají?
        </h2>
        <div className="list-rows">
          {window.FEARS.map((f, i) => (
            <div key={i} className="list-row reveal" data-cursor="hover">
              <div className="list-row-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="list-row-text">{f.text}</div>
              <div className="list-row-meta">→ {f.meta}</div>
            </div>
          ))}
        </div>
        <p className="reveal" style={{ marginTop: 'var(--space-3)', fontSize: '20px', maxWidth: '60ch', color: 'var(--fg-muted)' }}>
          Proto pracujeme s předem domluveným rozsahem, orientačním rozpočtem, průběžnou komunikací a předáním hotové práce.
        </p>
      </div>
    </section>
  );
}

// ============================================
// SERVICES
// ============================================
function Services() {
  const [hover, setHover] = useS(null);
  const [pos, setPos] = useS({ x: 0, y: 0 });
  const wrapRef = useR(null);

  useE(() => {
    const move = (e) => setPos({ x: e.clientX + 24, y: e.clientY - 110 });
    if (hover !== null) {
      window.addEventListener('mousemove', move);
      return () => window.removeEventListener('mousemove', move);
    }
  }, [hover]);

  return (
    <section id="sluzby" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <div className="section-label mono reveal">[03] / Služby</div>
        <h2 className="display big reveal" style={{ marginBottom: 'var(--space-3)' }}>
          Co děláme
        </h2>
        <div className="services-list" ref={wrapRef}>
          {window.SERVICES.map((s, i) => (
            <div
              key={s.slug}
              className="service-item reveal"
              data-cursor="accent"
              data-cursor-label="→ Více"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="service-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="service-name">{s.name}</div>
              <div className="service-desc">{s.desc}</div>
              <div className="service-tags">
                {s.tags.map(t => <span key={t} className="service-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      {hover !== null && (
        <div className={'service-preview active'} style={{ left: pos.x, top: pos.y }}>
          <img src={window.SERVICES[hover].img} alt="" />
        </div>
      )}
    </section>
  );
}

// ============================================
// PORTFOLIO
// ============================================
function Portfolio() {
  return (
    <section id="portfolio">
      <div className="container">
        <div className="section-label mono reveal">[04] / Reference</div>
        <h2 className="display big reveal" style={{ marginBottom: 'var(--space-3)' }}>
          Realizované<br />projekty.
        </h2>
        <div className="portfolio-grid">
          {window.PORTFOLIO.map((p, i) => (
            <div key={i} className={`port-card port-${i + 1} reveal`} data-cursor="accent" data-cursor-label="View">
              <img src={p.img} alt={p.title} />
              <div className="port-card-meta">
                <div className="port-card-title">{p.title}</div>
                <div className="port-card-tag">{p.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// BEFORE / AFTER
// ============================================
function BeforeAfter() {
  const [pos, setPos] = useS(50);
  const wrapRef = useR(null);

  const onMove = (clientX) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  };
  const onMouseMove = (e) => onMove(e.clientX);
  const onTouchMove = (e) => onMove(e.touches[0].clientX);

  return (
    <section>
      <div className="container">
        <div className="section-label mono reveal">[05] / Před a po</div>
        <h2 className="display medium reveal" style={{ marginBottom: 'var(--space-3)' }}>
          Jak může rekonstrukce<br />změnit váš byt.
        </h2>
        <div
          className="ba-wrap reveal"
          ref={wrapRef}
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
          data-cursor="hover"
        >
          <img src={window.BEFORE_AFTER.before} alt="Před" />
          <div className="ba-after-clip" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
            <img src={window.BEFORE_AFTER.after} alt="Po" />
          </div>
          <div className="ba-handle" style={{ left: `${pos}%` }}></div>
          <div className="ba-label" style={{ left: 16 }}>Před</div>
          <div className="ba-label" style={{ right: 16 }}>Po</div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROCESS
// ============================================
function Process() {
  return (
    <section id="proces" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <div className="section-label mono reveal">[06] / Proces</div>
        <div className="process">
          <div className="process-side reveal">
            <h2>Jak<br />probíhá<br /><em>spolupráce.</em></h2>
            <p style={{ marginTop: 'var(--space-2)', color: 'var(--fg-muted)', maxWidth: '34ch' }}>
              Šest jasných kroků od první zprávy po předání hotového prostoru.
            </p>
          </div>
          <div className="process-steps">
            {window.PROCESS.map((p, i) => (
              <div key={i} className="process-step reveal">
                <div className="process-step-head">
                  <span className="process-step-num">STEP / {String(i + 1).padStart(2, '0')}</span>
                  <span className="mono" style={{ color: 'var(--fg-muted)' }}>{['1–2 dny','1–3 dny','2–5 dní','3–7 dní','týdny','1–2 dny'][i]}</span>
                </div>
                <h3 className="process-step-title">{p.title}</h3>
                <p className="process-step-text">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// ADVANTAGES
// ============================================
function Advantages() {
  return (
    <section id="vyhody">
      <div className="container">
        <div className="section-label mono reveal">[07] / Výhody</div>
        <h2 className="display big reveal" style={{ marginBottom: 'var(--space-3)' }}>
          Naše výhody.
        </h2>
        <div className="list-rows">
          {window.ADVANTAGES.map((a, i) => (
            <div key={i} className="list-row reveal" data-cursor="hover" style={{ gridTemplateColumns: '80px 1fr 1fr' }}>
              <div className="list-row-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="list-row-text">{a.title}</div>
              <div style={{ color: 'var(--fg-muted)', fontSize: 14, maxWidth: '46ch' }}>{a.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// CALCULATOR
// ============================================
function Calc() {
  const [type, setType] = useS('flat');
  const [area, setArea] = useS('');

  const prices = { flat: 14000, house: 15500 };
  const a = parseFloat(area);
  const valid = !isNaN(a) && a >= 10;
  const estimate = valid ? a * prices[type] : 0;

  return (
    <section id="kalkulator">
      <div className="container">
        <div className="section-label mono reveal">[08] / Kalkulačka</div>
        <div className="calc reveal">
          <div className="calc-grid">
            <div className="calc-head">
              <h2>Orientační<br /><em>cena</em><br />rekonstrukce.</h2>
              <p>Výpočet slouží jen pro první orientaci. Finální cena závisí na konzultaci, zaměření a přesném rozsahu prací.</p>
            </div>
            <div className="calc-form">
              <div className="calc-field">
                <span className="calc-label">Typ objektu</span>
                <div className="calc-select-row">
                  <button className={`calc-chip ${type === 'flat' ? 'active' : ''}`} onClick={() => setType('flat')} data-cursor="hover">Byt</button>
                  <button className={`calc-chip ${type === 'house' ? 'active' : ''}`} onClick={() => setType('house')} data-cursor="hover">Dům</button>
                </div>
              </div>
              <div className="calc-field">
                <span className="calc-label">Plocha (m²)</span>
                <input
                  className="calc-input"
                  type="number"
                  min="10"
                  placeholder="0"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  data-cursor="text"
                />
              </div>
              <div className="calc-result">
                <span className="calc-result-label">Orientační cena</span>
                <div className="calc-result-value">
                  {valid ? (
                    <><em>{estimate.toLocaleString('cs-CZ')}</em> Kč</>
                  ) : (
                    <span style={{ opacity: 0.4 }}>— — — Kč</span>
                  )}
                </div>
                <p className="calc-note">Sazba {prices[type].toLocaleString('cs-CZ')} Kč/m². Nejde o závaznou nabídku.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SPACES
// ============================================
function Spaces() {
  return (
    <section id="prostory">
      <div className="container">
        <div className="section-label mono reveal">[09] / Prostory</div>
        <h2 className="display medium reveal" style={{ marginBottom: 'var(--space-3)' }}>
          Pro jaké prostory<br />se práce hodí.
        </h2>
        <div className="spaces-grid">
          {window.SPACES.map((s, i) => (
            <div key={i} className="space-chip reveal" data-cursor="hover">
              <div className="space-glyph">{s.glyph}</div>
              <div className="space-name">{s.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// REVIEWS
// ============================================
function Reviews() {
  return (
    <section id="reference" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <div className="section-label mono reveal">[10] / Reference</div>
        <h2 className="display medium reveal" style={{ marginBottom: 'var(--space-3)' }}>
          Co zákazníci<br /><em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>obvykle oceňují</em>.
        </h2>
        <div className="reviews">
          {window.REVIEWS.map((r, i) => (
            <div key={i} className="review reveal">
              <div className="review-quote-mark">"</div>
              <div className="review-text">{r.text}</div>
              <div className="review-author">
                <div className="review-avatar"><img src={r.img} alt={r.name} /></div>
                <div>
                  <div className="review-author-name">{r.name}</div>
                  <div className="review-author-stage">{r.stage}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// CERTIFICATES
// ============================================
function Certs() {
  return (
    <section id="certifikaty">
      <div className="container">
        <div className="section-label mono reveal">[11] / Certifikáty</div>
        <h2 className="display medium reveal" style={{ marginBottom: 'var(--space-3)' }}>
          Licence a<br />pojištění.
        </h2>
        <div className="certs-grid">
          {window.CERTS.map((c, i) => (
            <div key={i} className="cert reveal" data-cursor="hover">
              <div className="cert-icon">{c.code}</div>
              <div>
                <div className="cert-name">{c.name}</div>
                <div className="cert-meta">{c.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// TEAM
// ============================================
function Team() {
  return (
    <section id="tym">
      <div className="container">
        <div className="section-label mono reveal">[12] / Tým</div>
        <h2 className="display big reveal" style={{ marginBottom: 'var(--space-3)' }}>
          Lidé za<br />zakázkou.
        </h2>
        <div className="team-grid">
          {window.TEAM.map((t, i) => (
            <div key={i} className="team-card reveal" data-cursor="hover">
              <div className="team-photo"><img src={t.img} alt={t.name} /></div>
              <div className="team-name">{t.name}</div>
              <div className="team-role">{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// PARTNERS
// ============================================
function Partners() {
  return (
    <section id="partneri" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <div className="section-label mono reveal">[13] / Partneři</div>
        <h2 className="display medium reveal" style={{ marginBottom: 'var(--space-3)' }}>
          Materiály a značky.
        </h2>
        <p className="reveal" style={{ color: 'var(--fg-muted)', marginBottom: 'var(--space-3)', maxWidth: '60ch' }}>
          Materiály a značky lze zvolit podle rozpočtu, dostupnosti a požadovaného výsledku.
        </p>
        <div className="partners reveal">
          {window.PARTNERS.map((p, i) => (
            <div key={i} className="partner-box"><span>{p}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// BLOG
// ============================================
function Blog() {
  return (
    <section id="blog">
      <div className="container">
        <div className="section-label mono reveal">[14] / Blog</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-3)', flexWrap: 'wrap', gap: 16 }}>
          <h2 className="display big reveal">
            Aktuálně<br />ze stavby.
          </h2>
          <a href="#" className="btn btn-outline" data-cursor="hover">Všechny články <span className="btn-arrow"></span></a>
        </div>
        <div className="blog-list">
          {window.BLOG.map((b, i) => (
            <div key={i} className="blog-item reveal" data-cursor="hover">
              <div className="blog-date">{b.date}</div>
              <div className="blog-cat">{b.cat}</div>
              <div className="blog-title">{b.title}</div>
              <div className="blog-arrow"><span className="btn-arrow"></span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// FAQ
// ============================================
function Faq() {
  const [open, setOpen] = useS(0);
  return (
    <section id="faq" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <div className="section-label mono reveal">[15] / FAQ</div>
        <div className="faq-grid">
          <div className="reveal">
            <h2 className="display medium">
              Časté<br /><em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>otázky.</em>
            </h2>
            <p style={{ marginTop: 'var(--space-2)', color: 'var(--fg-muted)', maxWidth: '40ch' }}>
              Něco vám tu chybí? <a href="#kontakt" style={{ color: 'var(--fg)', textDecoration: 'underline' }}>Napište nám</a>.
            </p>
          </div>
          <div className="faq-list">
            {window.FAQ.map((f, i) => (
              <div key={i} className={`faq-item ${open === i ? 'open' : ''}`} onClick={() => setOpen(open === i ? -1 : i)} data-cursor="hover">
                <div className="faq-q">
                  <div className="faq-q-text">{f.q}</div>
                  <div className="faq-toggle">+</div>
                </div>
                <div className="faq-a">
                  <div className="faq-a-inner">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// CONTACT
// ============================================
function Contact() {
  return (
    <section id="kontakt">
      <div className="container">
        <div className="section-label mono reveal">[16] / Kontakt</div>
        <h2 className="contact-hero reveal">
          Pošlete<br />popis nebo <em>fotky.</em>
        </h2>
        <p className="reveal" style={{ fontSize: 'clamp(18px, 2vw, 24px)', maxWidth: '60ch', color: 'var(--fg-muted)', marginBottom: 'var(--space-3)' }}>
          Podle základních informací vám řekneme, jaký postup dává smysl a co bude potřeba upřesnit. Ozveme se s dalším postupem nebo orientační kalkulací.
        </p>
        <div className="contact-grid">
          <div className="contact-block reveal">
            <span className="contact-label">Telefon</span>
            <a href={`tel:${window.SITE.phone}`} className="contact-value" data-cursor="hover">{window.SITE.phone}</a>
          </div>
          <div className="contact-block reveal">
            <span className="contact-label">E-mail</span>
            <a href={`mailto:${window.SITE.email}`} className="contact-value" data-cursor="hover">{window.SITE.email}</a>
          </div>
          <div className="contact-block reveal">
            <span className="contact-label">WhatsApp</span>
            <a href={`https://wa.me/${window.SITE.whatsapp}`} className="contact-value" data-cursor="hover">{window.SITE.phone}</a>
          </div>
          <div className="contact-block reveal">
            <span className="contact-label">Lokalita</span>
            <span className="contact-value">Praha a okolí</span>
          </div>
        </div>
        <div className="reveal" style={{ marginTop: 'var(--space-3)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href={`mailto:${window.SITE.email}`} className="btn btn-accent" data-cursor="accent" data-cursor-label="Send">
            Získat nezávaznou kalkulaci <span className="btn-arrow"></span>
          </a>
          <a href={`https://wa.me/${window.SITE.whatsapp}`} className="btn btn-outline" data-cursor="hover">
            Napsat na WhatsApp <span className="btn-arrow"></span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================
// FOOTER
// ============================================
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-huge">StavPraha</div>
        <div className="footer-grid">
          <div>
            <h6>{window.SITE.companyName}</h6>
            <p style={{ fontSize: 14, opacity: 0.7, maxWidth: '36ch' }}>{window.SITE.tagline}</p>
            <p style={{ fontSize: 14, opacity: 0.7, marginTop: 8 }}>{window.SITE.location}</p>
          </div>
          <div>
            <h6>Hlavní služby</h6>
            <a href="#sluzby">Rekonstrukce bytu</a>
            <a href="#sluzby">Rekonstrukce koupelny</a>
            <a href="#sluzby">Obkladačské práce</a>
            <a href="#sluzby">Elektroinstalace</a>
            <a href="#sluzby">Rekonstrukce domu</a>
          </div>
          <div>
            <h6>Kontakt</h6>
            <a href={`tel:${window.SITE.phone}`}>{window.SITE.phone}</a>
            <a href={`mailto:${window.SITE.email}`}>{window.SITE.email}</a>
            <a href={`https://wa.me/${window.SITE.whatsapp}`}>WhatsApp</a>
            <span style={{ fontSize: 14, opacity: 0.7, display: 'block', padding: '4px 0' }}>{window.SITE.address}</span>
          </div>
          <div>
            <h6>Informace</h6>
            <span style={{ fontSize: 14, opacity: 0.7, display: 'block', padding: '4px 0' }}>IČO: {window.SITE.ico}</span>
            <span style={{ fontSize: 14, opacity: 0.7, display: 'block', padding: '4px 0' }}>{window.SITE.warrantyText}</span>
            <a href="#">Ochrana osobních údajů</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 StavPraha · All rights reserved</span>
          <span>Redesign · 2026</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Nav, Hero, Marquee, About, Fears, Services, Portfolio, BeforeAfter,
  Process, Advantages, Calc, Spaces, Reviews, Certs, Team, Partners,
  Blog, Faq, Contact, Footer,
});
