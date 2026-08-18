"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  motion, useInView, useScroll, useTransform,
  AnimatePresence, useSpring,
} from "framer-motion";
import {
  Mail, Instagram, Linkedin,
  ArrowRight, ExternalLink,
  ChevronDown, ChevronLeft, ChevronRight,
} from "lucide-react";
import styles from "@/styles/ChapterInfos.module.css";
import WhatsAppButton from "@/utils/WhatsAppButton";

/* ─── client-only guard (prevents SSR hydration mismatch) ─── */
function ClientOnly({ children }) {
  const [ok, setOk] = useState(false);
  useEffect(() => setOk(true), []);
  return ok ? children : null;
}

/* ─── scroll hooks ─── */
function useScrolledPast(px = 80) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const fn = () => setPast(window.scrollY > px);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [px]);
  return past;
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const fn = () => {
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(ids[i]);
          return;
        }
      }
      setActive(ids[0]);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [ids]);
  return active;
}

/* ─── reveal on scroll ─── */
function Reveal({ children, delay = 0, y = 32, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   TOP NAV (slides in after hero)
═══════════════════════════════════════════════ */
const NAV = [
  { id: "about",      label: "About"      },
  { id: "events",     label: "Events"     },
  { id: "membership", label: "Membership" },
  { id: "contact",    label: "Contact"    },
];

function TopNavInner({ accent }) {
  const scrolled = useScrolledPast(80);
  const active   = useActiveSection(NAV.map(n => n.id));

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.nav key="nav"
          initial={{ y: -56, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -56, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className={styles.revampNav}
        >
          {NAV.map(({ id, label }) => (
            <button key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              className={styles.revampNavBtn}
              style={{
                background:   active === id ? `${accent}22` : "transparent",
                color:        active === id ? accent         : "rgba(255,255,255,0.45)",
                borderColor:  active === id ? `${accent}60` : "transparent",
              }}
            >
              {label}
            </button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

function TopNav({ accent }) {
  return <ClientOnly><TopNavInner accent={accent} /></ClientOnly>;
}

/* ═══════════════════════════════════════════════
   HERO  — original backdrop + logo watermark style
   restored, with parallax + refined typography
═══════════════════════════════════════════════ */
function Hero({ info }) {
  const cs     = info.ColorSchemes;
  const accent = cs.JoinFormBGColor;
  const ref    = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rawY   = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const y      = useSpring(rawY, { stiffness: 60, damping: 20 });
  const fade   = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const textY  = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} className={styles.heroWrap}>
      {/* ── The original magic: backdrop + logo as watermark ── */}
      <motion.div
        className={styles.heroBackdropLayer}
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)),
            url(${info.logo}),
            url(${info.backdropImg})
          `,
          backgroundRepeat:    "no-repeat, no-repeat, no-repeat",
          backgroundSize:      "cover, 32% auto, cover",
          backgroundPosition:  "center, 50% 60%, center",
          y,
        }}
      />

      {/* Bottom dark fade so text reads cleanly */}
      <div className={styles.heroFadeBottom} />

      {/* Accent color wash from bottom */}
      <div className={styles.heroAccentWash}
        style={{ background: `radial-gradient(ellipse 100% 50% at 50% 100%, ${accent}30 0%, transparent 65%)` }} />

      {/* Hero content */}
      <motion.div className={styles.heroBody} style={{ y: textY, opacity: fade }}>

        {/* Logo (crisp, no watermark blur) */}
        <motion.img src={info.logo} alt={info.title}
          className={styles.heroLogo}
          initial={{ opacity: 0, scale: 0.65, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Eyebrow */}
        <motion.p className={styles.heroEyebrow} style={{ color: accent }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.9 }}
        >
          IEEE DTU
        </motion.p>

        {/* Chapter title */}
        <motion.h1 className={`font-heading ${styles.heroTitle}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {info.title}
        </motion.h1>

        {/* Divider */}
        <motion.div className={styles.heroDivider} style={{ background: accent }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Tagline */}
        <motion.p className={styles.heroTagline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {info.about.content.substring(0, 120).trim()}…
        </motion.p>

        {/* CTAs */}
        <motion.div className={styles.heroCtas}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className={styles.ctaPrimary}
            style={{ background: accent }}
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore Chapter
          </button>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScdVzhcEbKrc61Y3aUzhK1NTybm7MpRfYNBvNAHSzV1tTpBzA/viewform"
            target="_blank" rel="noopener noreferrer"
            className={styles.ctaOutline}
            style={{ borderColor: `${accent}80`, color: "#fff" }}
          >
            Join IEEE DTU <ExternalLink size={14} />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className={styles.scrollCue}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
      >
        <motion.div animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}>
          <ChevronDown size={22} color="rgba(255,255,255,0.35)" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   ABOUT  — split: content left | slideshow right
═══════════════════════════════════════════════ */
function AboutSlideshow({ images, accent }) {
  const [idx, setIdx]     = useState(0);
  const [prev, setPrev]   = useState(null);
  const [anim, setAnim]   = useState(false);
  const [dir, setDir]     = useState(1);   // 1 = forward, -1 = back
  const [fill, setFill]   = useState(0);
  const intervalRef       = useRef(null);
  const DURATION          = 4000;

  const goTo = useCallback((next, direction = 1) => {
    if (next === idx) return;
    setDir(direction);
    setPrev(idx);
    setIdx(next);
    setAnim(true);
    setFill(0);
    setTimeout(() => setPrev(null), 700);
  }, [idx]);

  const goNext = useCallback(() => {
    goTo((idx + 1) % images.length, 1);
  }, [idx, images.length, goTo]);

  // Auto-advance with progress fill
  useEffect(() => {
    setFill(0);
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      setFill(Math.min(elapsed / DURATION, 1));
    }, 40);
    intervalRef.current = setTimeout(goNext, DURATION);
    return () => { clearInterval(tick); clearTimeout(intervalRef.current); };
  }, [idx, goNext]);

  // Slide variants: clip-path wipe + scale
  const variants = {
    enter:  d => ({ clipPath: d > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)", scale: 1.08, opacity: 0 }),
    center: { clipPath: "inset(0 0% 0 0%)", scale: 1, opacity: 1,
      transition: { clipPath: { duration: 0.7, ease: [0.22,1,0.36,1] }, scale: { duration: 0.7 }, opacity: { duration: 0.01 } } },
    exit:   d => ({ scale: 0.96, opacity: 0,
      transition: { duration: 0.5, ease: [0.22,1,0.36,1] } }),
  };

  return (
    <div className={styles.aboutSlideshow}>
      {/* Previous slide (stays visible behind) */}
      {prev !== null && (
        <div className={styles.slideshowSlide} style={{ zIndex: 1 }}>
          <img src={images[prev]} alt="" className={styles.slideshowImg} />
        </div>
      )}

      {/* Active slide — clip-path wipe in */}
      <AnimatePresence initial={false} custom={dir} mode="sync">
        <motion.div key={idx} custom={dir}
          variants={variants} initial="enter" animate="center" exit="exit"
          className={styles.slideshowSlide}
          style={{ zIndex: 2 }}
        >
          <img src={images[idx]} alt={`Slide ${idx + 1}`} className={styles.slideshowImg} />
          {/* Subtle vignette */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(0,0,0,0.18) 0%, transparent 60%, rgba(0,0,0,0.28) 100%)",
            pointerEvents: "none",
          }} />
        </motion.div>
      </AnimatePresence>

      {/* Counter */}
      <div className={styles.slideshowCounter} style={{ zIndex: 10 }}>
        {String(idx + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>

      {/* Dot nav */}
      <div className={styles.slideshowDots}>
        {images.map((_, i) => (
          <motion.button key={i}
            onClick={() => goTo(i, i > idx ? 1 : -1)}
            className={styles.slideshowDot}
            animate={{ width: i === idx ? 24 : 7, background: i === idx ? accent : "rgba(255,255,255,0.35)" }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className={styles.slideshowProgress}>
        <motion.div
          className={styles.slideshowProgressFill}
          style={{ background: accent, scaleX: fill, transformOrigin: "left" }}
        />
      </div>
    </div>
  );
}

function About({ info }) {
  const cs     = info.ColorSchemes;
  const accent = cs.JoinFormBGColor;
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className={styles.section}
      style={{ scrollMarginTop: 60, position: "relative", background: "rgba(6,4,14,0.82)" }}
    >
      <div className={styles.container} ref={ref}>

        {/* Section header */}
        <motion.div className={styles.sectionHeader}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className={styles.sectionLabel} style={{ color: accent }}>About the Chapter</p>
          <h2 className={`font-subheading ${styles.sectionHeading}`}
            style={{ color: cs.PrimaryTextColor }}>
            {info.about.heading}
          </h2>
          <div className={styles.headingRule} style={{ background: accent }} />
        </motion.div>

        {/* Split: left text | right slideshow */}
        <div className={styles.aboutSplit}>

          {/* LEFT — body + stats */}
          <motion.div className={styles.aboutLeft}
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22,1,0.36,1] }}
          >
            <p className={styles.aboutBody} style={{ color: cs.SecondaryTextColor }}>
              {info.about.content}
            </p>
          </motion.div>

          {/* RIGHT — unique clip-path wipe slideshow */}
          <motion.div
            initial={{ opacity: 0, x: 32, scale: 0.97 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22,1,0.36,1] }}
          >
            <AboutSlideshow images={info.images} accent={accent} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   EVENTS  — cinematic full-width carousel
   with thumbnail strip + keyboard + drag support
═══════════════════════════════════════════════ */
function Events({ info }) {
  const cs     = info.ColorSchemes;
  const accent = cs.JoinFormBGColor;
  const images = info.events.images || [];
  const total  = images.length;

  const [idx, setIdx]   = useState(0);
  const [dir, setDir]   = useState(1);
  const dragX           = useRef(0);

  const go = useCallback((newIdx) => {
    setDir(newIdx > idx ? 1 : -1);
    setIdx((newIdx + total) % total);
  }, [idx, total]);

  const prev = useCallback(() => go(idx - 1), [go, idx]);
  const next = useCallback(() => go(idx + 1), [go, idx]);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => { setDir(1); setIdx(i => (i + 1) % total); }, 4500);
    return () => clearInterval(t);
  }, [total]);

  // Keyboard
  useEffect(() => {
    const fn = e => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [prev, next]);

  const variants = {
    enter: d => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center:   { x: 0, opacity: 1 },
    exit: d => ({ x: d < 0 ? "100%" : "-100%", opacity: 0 }),
  };

  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="events" className={styles.section}
      style={{ background: "rgba(3,2,10,0.80)", scrollMarginTop: 60 }}
    >
      <div className={styles.container} ref={ref}>

        <motion.div className={styles.sectionHeader}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className={styles.sectionLabel} style={{ color: accent }}>Gallery</p>
          <h2 className={`font-subheading ${styles.sectionHeading}`}
            style={{ color: cs.PrimaryTextColor }}>
            {info.events.heading}
          </h2>
          <div className={styles.headingRule} style={{ background: accent }} />
        </motion.div>

        {/* Carousel */}
        <motion.div className={styles.carouselOuter}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.carouselFrame}
            onMouseDown={e => { dragX.current = e.clientX; }}
            onMouseUp={e => {
              const dx = e.clientX - dragX.current;
              if (dx > 60) prev(); else if (dx < -60) next();
            }}
            onTouchStart={e => { dragX.current = e.touches[0].clientX; }}
            onTouchEnd={e => {
              const dx = e.changedTouches[0].clientX - dragX.current;
              if (dx > 50) prev(); else if (dx < -50) next();
            }}
          >
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div key={idx} custom={dir}
                variants={variants} initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={styles.carouselSlide}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, { offset }) => {
                  if (offset.x > 60) prev(); else if (offset.x < -60) next();
                }}
              >
                <img src={images[idx]} alt={`Event ${idx + 1}`} className={styles.carouselPhoto} />

                {/* Bottom gradient */}
                <div className={styles.carouselGradient}
                  style={{ background: `linear-gradient(to top, ${accent}dd 0%, transparent 55%)` }}
                />

                {/* Counter */}
                <div className={styles.carouselCount}>
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>
                    &nbsp;/&nbsp;{String(total).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next buttons */}
            <button className={`${styles.carouselBtn} ${styles.carouselBtnPrev}`}
              onClick={prev}
              style={{ borderColor: `${accent}50` }}
            >
              <ChevronLeft size={22} />
            </button>
            <button className={`${styles.carouselBtn} ${styles.carouselBtnNext}`}
              onClick={next}
              style={{ borderColor: `${accent}50` }}
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Dot indicators */}
          <div className={styles.carouselDots}>
            {images.map((_, i) => (
              <motion.button key={i}
                onClick={() => go(i)}
                className={styles.carouselDot}
                animate={{
                  width:      i === idx ? 28 : 8,
                  background: i === idx ? accent : "rgba(255,255,255,0.25)",
                  opacity:    i === idx ? 1 : 0.6,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          {/* Thumbnail strip */}
          <div className={styles.thumbRow}>
            {images.map((src, i) => (
              <motion.button key={i}
                onClick={() => go(i)}
                className={styles.thumbBtn}
                animate={{
                  opacity: i === idx ? 1 : 0.4,
                  scale:   i === idx ? 1 : 0.94,
                }}
                transition={{ duration: 0.25 }}
                style={{
                  borderColor: i === idx ? accent : "transparent",
                  boxShadow:   i === idx ? `0 0 0 2px ${accent}` : "none",
                }}
              >
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MEMBERSHIP  — two cards + CTA
═══════════════════════════════════════════════ */
function Membership({ info }) {
  const cs     = info.ColorSchemes;
  const accent = cs.JoinFormBGColor;
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="membership" className={styles.section}
      style={{ background: "rgba(6,4,14,0.82)", scrollMarginTop: 60 }}
    >
      <div className={styles.container} ref={ref}>

        <motion.div className={styles.sectionHeader}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className={styles.sectionLabel} style={{ color: accent }}>Why Join</p>
          <h2 className={`font-subheading ${styles.sectionHeading}`}
            style={{ color: cs.PrimaryTextColor }}>
            {info.membership.heading}
          </h2>
          <div className={styles.headingRule} style={{ background: accent }} />
        </motion.div>

        {/* Two benefit cards */}
        <div className={styles.memberGrid}>
          {[
            { num: "01", title: "IEEE Global Access",    body: info.membership.content1 },
            { num: "02", title: "IEEE DTU Experience",   body: info.membership.content2 },
          ].map(({ num, title, body }, i) => (
            <motion.div key={i}
              className={styles.memberCard}
              style={{ borderColor: `${accent}25` }}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15 + i * 0.12 }}
              whileHover={{ y: -6, borderColor: `${accent}70`,
                boxShadow: `0 16px 48px rgba(0,0,0,0.45), 0 0 0 1px ${accent}40` }}
            >
              <span className={styles.memberNum} style={{ color: accent }}>{num}</span>
              <h3 className={`font-subheading ${styles.memberTitle}`}
                style={{ color: cs.PrimaryTextColor }}>{title}</h3>
              <p className={styles.memberBody} style={{ color: cs.SecondaryTextColor }}>{body}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div className={styles.memberCta}
          style={{
            borderColor: `${accent}35`,
            background:  `linear-gradient(135deg, ${accent}15 0%, rgba(255,255,255,0.02) 100%)`,
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.4 }}
        >
          <div>
            <p className={styles.memberCtaTitle} style={{ color: cs.PrimaryTextColor }}>
              Be Part of the IEEE-DTU Family
            </p>
            <p className={styles.memberCtaSub} style={{ color: cs.SecondaryTextColor }}>
              Join a community of innovators, engineers and leaders.
            </p>
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScdVzhcEbKrc61Y3aUzhK1NTybm7MpRfYNBvNAHSzV1tTpBzA/viewform"
            target="_blank" rel="noopener noreferrer"
            className={styles.ctaPrimary}
            style={{ background: accent, display: "flex", alignItems: "center", gap: 8 }}
          >
            Join Now <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CONTACT  — two-col: heading left | card right
═══════════════════════════════════════════════ */
function Contact({ info }) {
  const cs     = info.ColorSchemes;
  const accent = cs.JoinFormBGColor;
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className={styles.section}
      style={{ background: "rgba(3,2,10,0.80)", paddingBottom: "5.5rem", scrollMarginTop: 60 }}
    >
      <div className={styles.container} ref={ref}>
        <div className={styles.contactSplit}>

          {/* LEFT — label + heading + subtitle */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22,1,0.36,1] }}
          >
            <p className={styles.sectionLabel} style={{ color: accent }}>Connect</p>
            <h2 className={`font-subheading ${styles.sectionHeading}`}
              style={{ color: cs.PrimaryTextColor }}>
              Get in touch.
            </h2>
            <div className={styles.headingRule} style={{ background: accent }} />
            <p style={{
              color: "rgba(255,255,255,0.42)",
              fontSize: "0.97rem", lineHeight: 1.8,
              marginTop: "1.5rem", maxWidth: 340,
            }}>
              Have questions about IEEE DTU or want to collaborate?
              We'd love to hear from you.
            </p>
          </motion.div>

          {/* RIGHT — card */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22,1,0.36,1] }}
          >
            <div className={styles.contactCard}
              style={{ borderColor: `${accent}25`, background: cs.ContactBoxBG }}
            >
              {/* WhatsApp */}
              <WhatsAppButton style={{ borderRadius: 12, marginBottom: "1.25rem" }} />

              {/* Socials */}
              <p className={styles.contactMeta}
                style={{ color: cs.ContactBoxTextColor, margin: "0 0 0.75rem" }}>
                Follow us on
              </p>
              <div className={styles.socialRow}>
                {[
                  { href: "https://www.instagram.com/ieee.dtu/", Icon: Instagram, label: "Instagram" },
                  { href: "https://www.linkedin.com/company/ieee-dtu/", Icon: Linkedin, label: "LinkedIn" },
                ].map(({ href, Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className={styles.socialLink}
                    style={{ borderColor: "rgba(255,255,255,0.08)", color: cs.ContactBoxTextColor }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background  = `${accent}18`;
                      e.currentTarget.style.borderColor = `${accent}55`;
                      e.currentTarget.style.color       = "#fff";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background  = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.color       = cs.ContactBoxTextColor;
                    }}
                  >
                    <Icon size={18} /> {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════ */
export default function ChapterRoutes({ ChapterInformation: info }) {
  if (!info) return null;
  const accent = info.ColorSchemes.JoinFormBGColor;

  return (
    <div style={{ background: "#030208", fontFamily: "inherit", position: "relative" }}>
      {/* ── Persistent logo watermark behind ALL sections ── */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        <img
          src={info.logo}
          alt=""
          aria-hidden="true"
          style={{
            width: "clamp(280px, 45vw, 580px)",
            height: "clamp(280px, 45vw, 580px)",
            objectFit: "contain",
            opacity: 0.04,
            filter: "grayscale(1) blur(0px)",
            userSelect: "none",
          }}
        />
      </div>

      {/* All sections sit above the watermark */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <TopNav accent={accent} />
        <Hero       info={info} />
        <About      info={info} />
        <Events     info={info} />
        <Membership info={info} />
        <Contact    info={info} />
      </div>
    </div>
  );
}
