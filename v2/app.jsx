// Main app
const { useState: uS, useEffect: uE } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accent": "#c8553d",
  "headingFont": "Inter",
  "density": 1
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  '#c8553d', // terracotta (default)
  '#1f5af0', // electric blue
  '#16a34a', // green
  '#eab308', // yellow
];

const FONT_OPTIONS = ['Inter', 'Space Grotesk', 'Fraunces', 'Instrument Serif'];

function App() {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to root
  uE(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', tweaks.theme);
    root.style.setProperty('--accent', tweaks.accent);
    root.style.setProperty('--accent-fg', tweaks.accent === '#eab308' ? '#0a0a0a' : '#ffffff');
    root.style.setProperty('--density', tweaks.density);
    if (tweaks.headingFont === 'Fraunces' || tweaks.headingFont === 'Instrument Serif') {
      root.style.setProperty('--font-display', `'${tweaks.headingFont}', serif`);
      root.style.setProperty('--display-weight', '600');
      root.style.setProperty('--display-tracking', '-0.02em');
    } else {
      root.style.setProperty('--font-display', `'${tweaks.headingFont}', system-ui, sans-serif`);
      root.style.setProperty('--display-weight', '700');
      root.style.setProperty('--display-tracking', '-0.04em');
    }
  }, [tweaks]);

  window.useReveal();
  window.useParallax();

  const {
    TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakSelect, TweakSlider,
  } = window;

  return (
    <>
      <window.ScrollProgress />
      <window.CustomCursor />
      <window.Nav />

      <window.Hero />
      <window.Marquee />
      <window.About />
      <window.Fears />
      <window.Services />
      <window.Portfolio />
      <window.BeforeAfter />
      <window.Process />
      <window.Advantages />
      <window.Calc />
      <window.Spaces />
      <window.Reviews />
      <window.Certs />
      <window.Team />
      <window.Partners />
      <window.Blog />
      <window.Faq />
      <window.Contact />
      <window.Footer />

      <a href={`https://wa.me/${window.SITE.whatsapp}`} className="wa-float" data-cursor="hover" aria-label="WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.6 6.32A7.85 7.85 0 0012.05 4a7.92 7.92 0 00-6.77 11.97L4 20l4.13-1.27a7.92 7.92 0 003.92 1h.01c4.36 0 7.92-3.55 7.92-7.91a7.86 7.86 0 00-2.38-5.5zM12.06 18.4h-.01a6.56 6.56 0 01-3.34-.92l-.24-.14-2.45.76.78-2.39-.16-.25a6.57 6.57 0 0110.2-8.13 6.51 6.51 0 011.93 4.64c0 3.62-2.95 6.57-6.57 6.57zm3.6-4.92c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.2-.5.64-.62.77-.11.13-.23.15-.43.05-.2-.1-.83-.31-1.59-.98a5.99 5.99 0 01-1.1-1.37c-.12-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.12.13-.2.2-.33.06-.13.03-.25-.02-.35-.05-.1-.44-1.06-.6-1.46-.16-.38-.32-.33-.44-.34h-.38c-.13 0-.34.05-.52.25-.18.2-.69.67-.69 1.64 0 .96.7 1.9.8 2.02.1.13 1.4 2.13 3.38 2.99.47.2.84.32 1.13.41.47.15.9.13 1.24.08.38-.06 1.17-.48 1.34-.94.16-.46.16-.86.11-.94-.05-.08-.18-.13-.38-.23z"/>
        </svg>
      </a>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Téma" />
        <TweakRadio
          label="Mode"
          options={['light', 'dark']}
          value={tweaks.theme}
          onChange={(v) => setTweak('theme', v)}
        />
        <TweakSection label="Akcentní barva" />
        <TweakColor
          label="Accent"
          options={ACCENT_OPTIONS}
          value={tweaks.accent}
          onChange={(v) => setTweak('accent', v)}
        />
        <TweakSection label="Typografie" />
        <TweakSelect
          label="Font nadpisů"
          options={FONT_OPTIONS}
          value={tweaks.headingFont}
          onChange={(v) => setTweak('headingFont', v)}
        />
        <TweakSection label="Hustota" />
        <TweakSlider
          label="Density"
          min={0.7}
          max={1.4}
          step={0.05}
          value={tweaks.density}
          onChange={(v) => setTweak('density', v)}
        />
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
