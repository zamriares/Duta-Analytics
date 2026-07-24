import { useEffect, useRef } from "react";

export function TechCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Grid & node interactive logic
    const gridSpacing = 40;
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Subtle enterprise background mesh grid
      ctx.strokeStyle = "rgba(230, 230, 232, 0.35)";
      ctx.lineWidth = 0.5;

      const cols = Math.ceil(width / gridSpacing);
      const rows = Math.ceil(height / gridSpacing);

      for (let i = 0; i <= cols; i++) {
        const x = i * gridSpacing;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let j = 0; j <= rows; j++) {
        const y = j * gridSpacing;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }



      // Interactive mouse ripple & particle nodes
      const nodeCount = Math.floor((width * height) / 25000);
      for (let k = 0; k < nodeCount; k++) {
        const nx = ((k * 137.5) % width);
        const ny = ((k * 293.7 + time * 15) % height);

        const dx = mouseX - nx;
        const dy = mouseY - ny;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let radius = 1.5;
        let opacity = 0.25;

        if (dist < 180) {
          radius = 1.5 + (180 - dist) * 0.015;
          opacity = 0.25 + (180 - dist) * 0.003;
        }

        ctx.fillStyle = `rgba(15, 17, 23, ${opacity})`;
        ctx.beginPath();
        ctx.arc(nx, ny, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="tech-canvas is-ready" />;
}
