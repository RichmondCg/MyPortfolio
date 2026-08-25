import { useEffect, useRef } from "react";

const BRUSH_RADIUS = 60;
const FADE_RATE = 0.008;
const FADE_DURATION = 3000;
const STAMP_STEP = 4;
const REVEAL_DURATION = 1500;

const TEXT_COLORS = ["#000000", "#FF8C00", "#4169E1", "#228B22"];

function PeelText({ text, className, revealDelay = 0 }) {
  const wrapRef = useRef(null);
  const fontRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");

    // Only text pixels, transparent background
    const layerA = document.createElement("canvas"); // current color text only
    const ctxA = layerA.getContext("2d");

    const layerB = document.createElement("canvas"); // next color text only
    const ctxB = layerB.getContext("2d");

    const mask = document.createElement("canvas");
    const mctx = mask.getContext("2d");

    let cssW = 0;
    let cssH = 0;
    let dpr = 1;
    let font = "900 100px sans-serif";
    let lastBrush = 0;
    let lastColorChange = 0;
    let lastX = null;
    let lastY = null;
    let raf = null;
    let currentColorIndex = 0;
    let nextColorIndex = 1;

    let velX = 0;
    let velY = 0;
    let prevX = null;
    let prevY = null;

    // Load reveal state (bottom-to-top "curtain up")
    let coverH = 0;
    let revealStarted = false;
    let revealComplete = false;
    let revealStartTime = 0;
    let revealRaf = null;
    let revealTimer = null;

    const setTransform = (c) => c.setTransform(dpr, 0, 0, dpr, 0, 0);

    const readFont = () => {
      if (fontRef.current) {
        font = window.getComputedStyle(fontRef.current).font;
      }
    };

    // Draw ONLY the text — transparent background
    const buildTextLayer = (c, colorIndex) => {
      c.clearRect(0, 0, cssW, cssH);
      c.fillStyle = TEXT_COLORS[colorIndex];
      c.font = font;
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText(text, cssW / 2, cssH / 2);
    };

    const resize = () => {
      cssW = wrap.clientWidth;
      cssH = wrap.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      [canvas, layerA, layerB, mask].forEach((c) => {
        c.width = Math.max(1, Math.floor(cssW * dpr));
        c.height = Math.max(1, Math.floor(cssH * dpr));
      });

      setTransform(ctx);
      setTransform(ctxA);
      setTransform(ctxB);
      setTransform(mctx);

      buildTextLayer(ctxA, currentColorIndex);
      buildTextLayer(ctxB, nextColorIndex);
      render();
    };

    const stamp = (x, y, px, py) => {
      const dx = x - px;
      const dy = y - py;
      const dist = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);
      const steps = Math.max(1, Math.ceil(dist / STAMP_STEP));

      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const sx = px + dx * t;
        const sy = py + dy * t;

        const speed = Math.hypot(velX, velY);
        const radiusBoost = Math.min(speed * 0.3, 40);
        const r = BRUSH_RADIUS + radiusBoost;

        const stretchX = r * (1 + Math.abs(Math.cos(angle)) * 0.8);
        const stretchY = r * 0.45 * (1 + Math.abs(Math.sin(angle)) * 0.4);

        const g = mctx.createRadialGradient(0, 0, 0, 0, 0, r);
        g.addColorStop(0, "rgba(255,255,255,1)");
        g.addColorStop(0.3, "rgba(255,255,255,0.95)");
        g.addColorStop(0.65, "rgba(255,255,255,0.6)");
        g.addColorStop(0.85, "rgba(255,255,255,0.2)");
        g.addColorStop(1, "rgba(255,255,255,0)");

        mctx.save();
        mctx.translate(sx, sy);
        mctx.rotate(angle);
        mctx.fillStyle = g;
        mctx.beginPath();
        mctx.ellipse(0, 0, stretchX, stretchY, 0, 0, Math.PI * 2);
        mctx.fill();
        mctx.restore();

        const speed2 = Math.hypot(velX, velY);
        if (speed2 > 2) {
          const dripX = sx - Math.cos(angle) * r * 0.5;
          const dripY = sy - Math.sin(angle) * r * 0.5;
          const dripR = r * 0.35;
          const dg = mctx.createRadialGradient(0, 0, 0, 0, 0, dripR);
          dg.addColorStop(0, "rgba(255,255,255,0.7)");
          dg.addColorStop(0.5, "rgba(255,255,255,0.3)");
          dg.addColorStop(1, "rgba(255,255,255,0)");
          mctx.save();
          mctx.translate(dripX, dripY);
          mctx.fillStyle = dg;
          mctx.beginPath();
          mctx.arc(0, 0, dripR, 0, Math.PI * 2);
          mctx.fill();
          mctx.restore();
        }

        if (speed2 > 5) {
          for (let r2 = 0; r2 < 2; r2++) {
            const rippleAngle = angle + (Math.random() - 0.5) * 1.2;
            const rippleDist = r * (0.7 + Math.random() * 0.5);
            const rx = sx + Math.cos(rippleAngle) * rippleDist;
            const ry = sy + Math.sin(rippleAngle) * rippleDist;
            const rippleR = r * (0.08 + Math.random() * 0.12);
            const rg = mctx.createRadialGradient(0, 0, 0, 0, 0, rippleR);
            rg.addColorStop(0, "rgba(255,255,255,0.5)");
            rg.addColorStop(1, "rgba(255,255,255,0)");
            mctx.save();
            mctx.translate(rx, ry);
            mctx.fillStyle = rg;
            mctx.beginPath();
            mctx.arc(0, 0, rippleR, 0, Math.PI * 2);
            mctx.fill();
            mctx.restore();
          }
        }
      }
    };

    const applyBrush = (x, y) => {
      if (prevX !== null) {
        velX = x - prevX;
        velY = y - prevY;
      }
      prevX = x;
      prevY = y;

      if (lastX != null) stamp(x, y, lastX, lastY);
      else stamp(x, y, x, y);

      lastX = x;
      lastY = y;
      lastBrush = performance.now();

      const now = performance.now();
      if (revealComplete && now - lastColorChange > 2000) {
        currentColorIndex = nextColorIndex;
        nextColorIndex = (nextColorIndex + 1) % TEXT_COLORS.length;
        mctx.clearRect(0, 0, cssW, cssH);
        buildTextLayer(ctxA, currentColorIndex);
        buildTextLayer(ctxB, nextColorIndex);
        lastColorChange = now;
      }

      ensureLoop();
    };

    const render = () => {
      ctx.clearRect(0, 0, cssW, cssH);

      // White background — never changes
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, cssW, cssH);

      // Draw layer B text (next color) at bottom
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(layerB, 0, 0, cssW, cssH);

      // Draw layer A text (current color) on top using temp canvas
      // so we can apply the peel mask only to layer A
      const temp = document.createElement("canvas");
      temp.width = canvas.width;
      temp.height = canvas.height;
      const tctx = temp.getContext("2d");
      tctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Draw layer A onto temp
      tctx.globalCompositeOperation = "source-over";
      tctx.drawImage(layerA, 0, 0, cssW, cssH);

      // Cut peel mask from layer A only
      tctx.globalCompositeOperation = "destination-out";
      tctx.drawImage(mask, 0, 0, cssW, cssH);

      // Composite masked layer A onto main canvas
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(temp, 0, 0, cssW, cssH);

      // Load reveal: white cover from the top edge downward (curtain up).
      // Text below coverH is visible; coverH shrinks from cssH to 0.
      if (coverH > 0) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, cssW, coverH);
      }
    };

    const loop = () => {
      mctx.globalCompositeOperation = "destination-out";
      mctx.fillStyle = `rgba(0,0,0,${FADE_RATE})`;
      mctx.fillRect(0, 0, cssW, cssH);
      mctx.globalCompositeOperation = "source-over";

      render();

      if (performance.now() - lastBrush < FADE_DURATION) {
        raf = requestAnimationFrame(loop);
      } else {
        currentColorIndex = 0;
        nextColorIndex = 1;
        lastColorChange = 0;
        lastX = null;
        lastY = null;
        prevX = null;
        prevY = null;
        velX = 0;
        velY = 0;
        mctx.clearRect(0, 0, cssW, cssH);
        buildTextLayer(ctxA, currentColorIndex);
        buildTextLayer(ctxB, nextColorIndex);
        render();
        raf = null;
      }
    };

    const ensureLoop = () => {
      if (raf == null) raf = requestAnimationFrame(loop);
    };

    const toLocal = (e) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onMove = (e) => {
      const { x, y } = toLocal(e);
      applyBrush(x, y);
    };

    const onTouchMove = (e) => {
      const t = e.touches[0];
      if (!t) return;
      const { x, y } = toLocal(t);
      applyBrush(x, y);
    };

    const ready = () => {
      readFont();
      resize();
    };

    // Bottom-to-top reveal ("curtain up") on load
    const startReveal = () => {
      if (revealStarted) return;
      revealStarted = true;
      revealStartTime = performance.now();
      coverH = cssH;

      const tickReveal = () => {
        const t = Math.min(
          1,
          (performance.now() - revealStartTime) / REVEAL_DURATION,
        );
        const eased = 1 - Math.pow(1 - t, 3);
        coverH = cssH * (1 - eased);
        render();
        if (t < 1) {
          revealRaf = requestAnimationFrame(tickReveal);
        } else {
          coverH = 0;
          revealComplete = true;
          revealRaf = null;
          render();
        }
      };
      revealRaf = requestAnimationFrame(tickReveal);
    };

    document.fonts.ready.then(ready);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    resize();

    revealTimer = setTimeout(startReveal, revealDelay);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (raf != null) cancelAnimationFrame(raf);
      if (revealRaf != null) cancelAnimationFrame(revealRaf);
      if (revealTimer != null) clearTimeout(revealTimer);
    };
  }, [text, revealDelay]);

  return (
    <div
      ref={wrapRef}
      className="peel-text-wrap relative"
      style={{ width: "100%", height: "100%", background: "#fff" }}
    >
      <span
        ref={fontRef}
        aria-hidden="true"
        className={`${className} invisible absolute inset-0`}
      />
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  );
}

export default PeelText;
