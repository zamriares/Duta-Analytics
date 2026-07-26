import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 300;
const LOOP_START_INDEX = 4; // frame_0005.webp (0-indexed: 4)
const LOOP_END_INDEX = 19;  // frame_0020.webp (0-indexed: 19)

interface HeroFrameCanvasProps {
  onScrollProgress?: (data: {
    frameIndex: number;
    frameProgress: number;
    frameOpacity: number;
    textProgress: number;
    exitProgress: number;
  }) => void;
}

export function HeroFrameCanvas({ onScrollProgress }: HeroFrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    // Force manual scroll restoration so browser refresh always resets to top / frame_0005.webp
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      ScrollTrigger.clearScrollMemory("manual");
      window.scrollTo(0, 0);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const parentEl = canvas.parentElement || document.getElementById("hero") || document.body;

    // 1. Image Preloading Setup
    const loadedImages: HTMLImageElement[] = [];
    imagesRef.current = loadedImages;

    let isUserScrolling = false;
    let loopIndex = LOOP_START_INDEX;
    let loopDir = 1;
    let lastLoopTime = 0;
    const LOOP_INTERVAL_MS = 65; // ~15 FPS ping-pong loop speed

    let currentFrameIndex = LOOP_START_INDEX;
    let targetFrameIndex = LOOP_START_INDEX;
    let currentOpacity = 1.0;

    const renderFrame = (index: number, opacity: number = 1.0) => {
      if (!canvas || !ctx) return;

      const img = loadedImages[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Cover aspect ratio scaling math
      const scale = Math.max(cw / iw, ch / ih);
      const nw = iw * scale;
      const nh = ih * scale;
      const cx = (cw - nw) / 2;
      const cy = (ch - nh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.globalAlpha = opacity;
      ctx.drawImage(img, cx, cy, nw, nh);

      // Bottom-Right Dark Corner Mask Overlay
      if (opacity > 0) {
        const maskGrad = ctx.createRadialGradient(cw, ch, 0, cw, ch, Math.max(cw, ch) * 0.45);
        maskGrad.addColorStop(0, `rgba(9, 10, 15, ${0.95 * opacity})`);
        maskGrad.addColorStop(0.5, `rgba(9, 10, 15, ${0.4 * opacity})`);
        maskGrad.addColorStop(1, "transparent");
        ctx.fillStyle = maskGrad;
        ctx.fillRect(0, 0, cw, ch);
      }
      ctx.globalAlpha = 1.0;
    };

    const updateCanvasDimensions = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parentEl.clientWidth || window.innerWidth;
      const h = parentEl.clientHeight || window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      renderFrame(Math.round(currentFrameIndex), currentOpacity);
    };

    updateCanvasDimensions();

    // 2. Preload 300 WebP frames, rendering frame_0005.webp (index 4) immediately
    let count = 0;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(4, "0");
      img.src = `/assets/frames/frame_${frameNum}.webp`;

      img.onload = () => {
        count++;
        setLoadedCount(count);

        if (i === 5) {
          renderFrame(LOOP_START_INDEX, 1.0);
        }
      };

      img.onerror = () => {
        // Frame failed to load — no fallback available
      };

      loadedImages.push(img);
    }

    // 3. Complete 3-Step Pinned Scroll Orchestration:
    // Step 1 (0.00 -> 0.45): When idle, loops frame_0005 to frame_0020. On scroll down, continues frame_0020 -> frame_0300.
    // Step 2 (0.45 -> 0.80): WebP frames fade out to reveal dropping black dots background. Text REVEALS on top!
    // Step 3 (0.80 -> 1.00): Smooth transition into Dashboard section.
    const trigger = ScrollTrigger.create({
      trigger: "#hero",
      pin: true,
      pinSpacing: true,
      start: "top top",
      end: "+=220%",
      scrub: 0.15,
      onUpdate: (self) => {
        const p = self.progress;

        let frameProgress = 0;
        let frameOpacity = 1.0;
        let textProgress = 0;
        let exitProgress = 0;

        if (p <= 0.001) {
          isUserScrolling = false;
          frameProgress = 0;
          frameOpacity = 1.0;
          textProgress = 0;
          exitProgress = 0;
        } else if (p <= 0.45) {
          isUserScrolling = true;
          // Step 1: WebP frame sequence continues from frame_0020 -> frame_0300
          frameProgress = (p - 0.001) / 0.449;
          targetFrameIndex = LOOP_END_INDEX + Math.floor(frameProgress * (TOTAL_FRAMES - 1 - LOOP_END_INDEX));
          frameOpacity = 1.0;
          textProgress = 0;
          exitProgress = 0;
        } else if (p <= 0.80) {
          isUserScrolling = true;
          // Step 2: WebP frames fade out to reveal dropping black dots background; Text heading reveals!
          frameProgress = 1.0;
          targetFrameIndex = TOTAL_FRAMES - 1;
          frameOpacity = Math.max(0, 1 - (p - 0.45) / 0.15); // Fades out WebP image to show TechCanvas dropping dots
          textProgress = Math.min(1.0, (p - 0.45) / 0.20);   // Text reveals over dropping dots background
          exitProgress = 0;
        } else {
          isUserScrolling = true;
          // Step 3: Transition to Dashboard section
          frameProgress = 1.0;
          targetFrameIndex = TOTAL_FRAMES - 1;
          frameOpacity = 0;
          textProgress = 1.0;
          exitProgress = (p - 0.80) / 0.20;
        }

        currentOpacity = frameOpacity;

        if (onScrollProgress) {
          onScrollProgress({
            frameIndex: Math.round(targetFrameIndex),
            frameProgress,
            frameOpacity,
            textProgress,
            exitProgress,
          });
        }
      },
    });

    ScrollTrigger.refresh();

    // 4. Smooth Animation Loop handling Idle Ambient Ping-Pong (frames 5-20) and Active Scroll Transition
    let animationFrameId: number;

    const animateLoop = (timestamp: number) => {
      if (!isUserScrolling) {
        if (timestamp - lastLoopTime > LOOP_INTERVAL_MS) {
          lastLoopTime = timestamp;
          loopIndex += loopDir;
          if (loopIndex >= LOOP_END_INDEX) {
            loopIndex = LOOP_END_INDEX;
            loopDir = -1;
          } else if (loopIndex <= LOOP_START_INDEX) {
            loopIndex = LOOP_START_INDEX;
            loopDir = 1;
          }
        }
        currentFrameIndex = loopIndex;
        renderFrame(Math.round(loopIndex), currentOpacity);
      } else {
        const diff = targetFrameIndex - currentFrameIndex;
        if (Math.abs(diff) > 0.001 || Math.abs(currentOpacity) > 0.001) {
          currentFrameIndex += diff * 0.25;
          const clampedIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(LOOP_START_INDEX, Math.round(currentFrameIndex))
          );
          renderFrame(clampedIndex, currentOpacity);
        }
        // Keep loopIndex synced to current position so it resumes smoothly if scroll returns to top
        loopIndex = Math.min(LOOP_END_INDEX, Math.max(LOOP_START_INDEX, Math.round(currentFrameIndex)));
      }
      animationFrameId = requestAnimationFrame(animateLoop);
    };

    animationFrameId = requestAnimationFrame(animateLoop);

    // 5. Window Resize Handler
    const handleResize = () => {
      updateCanvasDimensions();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      trigger.kill();
    };
  }, [onScrollProgress]);

  return (
    <div className="hero-frame-wrapper" style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
      <canvas ref={canvasRef} id="hero-frame-canvas" className="hero-frame-canvas" />
      {loadedCount < TOTAL_FRAMES && (
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            right: "20px",
            fontSize: "0.7rem",
            fontFamily: "var(--font-mono, monospace)",
            color: "rgba(255, 255, 255, 0.4)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          {Math.round((loadedCount / TOTAL_FRAMES) * 100)}% PRELOADED
        </div>
      )}
    </div>
  );
}
