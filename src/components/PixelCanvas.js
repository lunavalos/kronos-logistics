"use client";
import {
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";

class Pixel {
  constructor(canvas, ctx, x, y, color, speed, delay) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = (Math.random() * 0.8 + 0.1) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInt = 2;
    this.maxSize =
      Math.random() * (this.maxSizeInt - this.minSize) + this.minSize;
    this.delay = delay;
    this.counter = 0;
    this.counterStep =
      Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  draw() {
    const offset = this.maxSizeInt * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + offset, this.y + offset, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

const PixelCanvas = forwardRef(function PixelCanvas(
  { colors = "#fca5a5,#f87171,#dc2626", gap = 8, speed = 30 },
  ref
) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const pixelsRef = useRef([]);
  const animationRef = useRef(null);
  const timePrevRef = useRef(0);

  const effectiveSpeed = Math.min(Math.max(speed, 0), 100) * 0.001;

  const initPixels = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const w = Math.floor(rect.width);
    const h = Math.floor(rect.height);
    if (w === 0 || h === 0) return;
    const ctx = canvasRef.current.getContext("2d");

    canvasRef.current.width = w;
    canvasRef.current.height = h;

    const colorsArr = colors.split(",");
    const pxs = [];
    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const color = colorsArr[Math.floor(Math.random() * colorsArr.length)];
        const dx = x - w / 2;
        const dy = y - h / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        pxs.push(
          new Pixel(canvasRef.current, ctx, x, y, color, effectiveSpeed, distance)
        );
      }
    }
    pixelsRef.current = pxs;
  }, [colors, gap, effectiveSpeed]);

  const doAnimate = useCallback((fnName) => {
    animationRef.current = requestAnimationFrame(() => doAnimate(fnName));
    const now = performance.now();
    const passed = now - timePrevRef.current;
    if (passed < 1000 / 60) return;
    timePrevRef.current = now - (passed % (1000 / 60));

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let allIdle = true;
    for (const pixel of pixelsRef.current) {
      pixel[fnName]();
      if (!pixel.isIdle) allIdle = false;
    }
    if (allIdle) cancelAnimationFrame(animationRef.current);
  }, []);

  const handleAnimation = useCallback(
    (name) => {
      cancelAnimationFrame(animationRef.current);
      timePrevRef.current = performance.now();
      animationRef.current = requestAnimationFrame(() => doAnimate(name));
    },
    [doAnimate]
  );

  // Expose appear/disappear methods to parent via ref
  useImperativeHandle(
    ref,
    () => ({
      appear: () => handleAnimation("appear"),
      disappear: () => handleAnimation("disappear"),
    }),
    [handleAnimation]
  );

  useEffect(() => {
    initPixels();
    const observer = new ResizeObserver(() => initPixels());
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [initPixels]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
});

export default PixelCanvas;
