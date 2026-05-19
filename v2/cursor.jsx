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

// Reveal — sets data-hidden initially on below-the-fold items, then removes
// on intersect. Uses data-attribute (not className) to avoid React reconciliation
// wiping it. A scroll listener acts as a fast-scroll safety net so the user
// can't out-scroll the IntersectionObserver and end up with a blank page.
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal, .reveal-letters'));
    const reveal = (el) => {
      el.removeAttribute('data-hidden');
      el.classList.add('is-visible');
    };
    const isNearOrInView = (el) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight + 100 && r.bottom > -100;
    };
    // Only hide elements that aren't already in or near the viewport — anything
    // visible on first paint stays visible immediately (no opacity flash).
    els.forEach(el => { if (!isNearOrInView(el)) el.setAttribute('data-hidden', '1'); });
    const checkInView = () => {
      els.forEach(el => {
        if (!el.hasAttribute('data-hidden')) return;
        if (isNearOrInView(el)) reveal(el);
      });
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) reveal(entry.target);
      });
    }, { threshold: 0.01, rootMargin: '0px 0px 100px 0px' });
    els.forEach(el => observer.observe(el));
    // Fast-scroll safety net: rAF-throttled scroll handler reveals anything
    // the user scrolls toward, even when the IntersectionObserver hasn't fired
    // yet (which can happen during very fast scrolls).
    let scrollRaf = null;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => { scrollRaf = null; checkInView(); });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // Run a few times early in case IO doesn't fire for above-the-fold items.
    requestAnimationFrame(() => requestAnimationFrame(checkInView));
    setTimeout(checkInView, 100);
    setTimeout(checkInView, 300);
    // Final hard safety net: anything still hidden after 1s, just show it.
    setTimeout(() => {
      els.forEach(el => el.hasAttribute('data-hidden') && reveal(el));
    }, 1000);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
    };
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
