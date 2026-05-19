// Custom cursor + scroll progress
const { useState, useEffect, useRef } = React;

function CustomCursor() {
  const dotRef = useRef(null);
  const trailRef = useRef(null);
  const stateRef = useRef({
    x: 0, y: 0, tx: 0, ty: 0,
    targetX: 0, targetY: 0,
  });
  const [hoverMode, setHoverMode] = useState(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    const handleMove = (e) => {
      stateRef.current.targetX = e.clientX;
      stateRef.current.targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', handleMove);

    let rafId;
    const animate = () => {
      const s = stateRef.current;
      s.tx += (s.targetX - s.tx) * 0.15;
      s.ty += (s.targetY - s.ty) * 0.15;
      if (trailRef.current) {
        trailRef.current.style.left = s.tx + 'px';
        trailRef.current.style.top = s.ty + 'px';
      }
      rafId = requestAnimationFrame(animate);
    };
    animate();

    // Delegated hover detection
    const handleOver = (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t) {
        const mode = t.dataset.cursor;
        setHoverMode(mode);
        setLabel(t.dataset.cursorLabel || '');
      } else if (e.target.closest('a, button, .btn, .nav-cta, [role="button"]')) {
        setHoverMode('hover');
        setLabel('');
      } else {
        setHoverMode(null);
        setLabel('');
      }
    };
    document.addEventListener('mouseover', handleOver);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  let cls = 'cursor';
  if (hoverMode === 'hover') cls += ' is-hover';
  if (hoverMode === 'accent') cls += ' is-hover-accent';
  if (hoverMode === 'text') cls += ' is-text';

  return (
    <>
      <div ref={dotRef} className={cls}>
        {label && <span className="cursor-label">{label}</span>}
      </div>
      <div ref={trailRef} className="cursor-trail"></div>
    </>
  );
}

function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (scrolled / max) * 100 : 0;
      if (ref.current) ref.current.style.width = pct + '%';
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return <div ref={ref} className="scroll-progress"></div>;
}

// Reveal — sets data-hidden initially then removes on intersect.
// Uses data-attribute (not className) to avoid React reconciliation wiping it.
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal, .reveal-letters'));
    // Tag everything as hidden first
    els.forEach(el => el.setAttribute('data-hidden', '1'));
    const reveal = (el) => {
      el.removeAttribute('data-hidden');
      el.classList.add('is-visible');
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) reveal(entry.target);
      });
    }, { threshold: 0.01, rootMargin: '0px 0px 100px 0px' });
    els.forEach(el => observer.observe(el));
    const checkInView = () => {
      els.forEach(el => {
        if (!el.hasAttribute('data-hidden')) return;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight + 100 && r.bottom > -100) reveal(el);
      });
    };
    // Defer initial check so paint commits the hidden state first
    requestAnimationFrame(() => requestAnimationFrame(checkInView));
    setTimeout(checkInView, 300);
    // Last-resort safety: anything still hidden after 2s, show it
    setTimeout(() => {
      els.forEach(el => el.hasAttribute('data-hidden') && reveal(el));
    }, 2000);
    return () => observer.disconnect();
  }, []);
}

// Parallax hook — moves any [data-parallax="0.2"] elem on scroll
function useParallax() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-parallax]'));
    const update = () => {
      const vh = window.innerHeight;
      els.forEach(el => {
        const rect = el.getBoundingClientRect();
        const speed = parseFloat(el.dataset.parallax) || 0.2;
        const center = rect.top + rect.height / 2 - vh / 2;
        const offset = -center * speed;
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
}

Object.assign(window, { CustomCursor, ScrollProgress, useReveal, useParallax });
