import { useRef, useEffect } from 'react';
import { FARNSWORTH_D15_CONFIG } from '../utils/farnsworthD15-test';

export const ResultPlot = ({ arrangement }) => {
  const containerRef = useRef(null);
  const cieLABCanvasRef = useRef(null);
  const originalCaps = FARNSWORTH_D15_CONFIG.caps;

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(entries => {
      const [entry] = entries;
      if (!entry) return;
      const width = entry.contentRect.width;
      const canvas = cieLABCanvasRef.current;
      if (!canvas) return;
      
      const aspectRatio = 350 / 295;
      canvas.width = width;
      canvas.height = width * aspectRatio;

      drawPlot();
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);


  const drawPlot = () => {
    if (!cieLABCanvasRef.current || !arrangement?.length) return;

    const canvas = cieLABCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Find min and max values for a and b
    let minA = Infinity, maxA = -Infinity, minB = Infinity, maxB = -Infinity;
    originalCaps.forEach(cap => {
      minA = Math.min(minA, cap.cieLabValues.a);
      maxA = Math.max(maxA, cap.cieLabValues.a);
      minB = Math.min(minB, cap.cieLabValues.b);
      maxB = Math.max(maxB, cap.cieLabValues.b);
    });

    // Margin
    const rangeA = maxA - minA;
    const rangeB = maxB - minB;
    minA -= rangeA * 0.05;
    maxA += rangeA * 0.05;
    minB -= rangeB * 0.05;
    maxB += rangeB * 0.05;

    // CIE L*a*b* to canvas coordinates
    const aToX = (a) => ((a - minA) / (maxA - minA)) * height;
    const bToY = (b) => ((b - minB) / (maxB - minB)) * width;

    // Lines for user order 
    if (arrangement.length > 1) {
      ctx.strokeStyle = '#1e40af';
      ctx.lineWidth = 2;

      for (let i = 0; i < arrangement.length - 1; i++) {
        const currentCap = arrangement[i];
        const nextCap = arrangement[i + 1];

        const x1 = bToY(currentCap.cieLabValues.b);
        const y1 = aToX(currentCap.cieLabValues.a);
        const x2 = bToY(nextCap.cieLabValues.b);
        const y2 = aToX(nextCap.cieLabValues.a);

        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        const angle = Math.atan2(y2 - y1, x2 - x1);
        const headLength = 4;
        const arrowPoint = {
          x: midX,
          y: midY
        };

        ctx.beginPath();
        ctx.moveTo(midX + headLength * Math.cos(angle), midY + headLength * Math.sin(angle));
        ctx.lineTo(
          arrowPoint.x - headLength * Math.cos(angle - Math.PI / 6),
          arrowPoint.y - headLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(midX + headLength * Math.cos(angle), midY + headLength * Math.sin(angle));
        ctx.lineTo(
          arrowPoint.x - headLength * Math.cos(angle + Math.PI / 6),
          arrowPoint.y - headLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.stroke();
      }
    }

    // Points for each cap
    originalCaps.forEach(cap => {
      const y = aToX(cap.cieLabValues.a);
      const x = bToY(cap.cieLabValues.b);

      const userCapIndex = arrangement.findIndex(c => c.id === cap.id);
      const isInUserArrangement = userCapIndex >= 0;

      // circle
      ctx.fillStyle = cap.color;
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();

      // Border
      ctx.strokeStyle = isInUserArrangement ? '#000' : '#475569';
      ctx.lineWidth = isInUserArrangement ? 2 : 1;
      ctx.stroke();

      // Label
      ctx.fillStyle = getBrightness(cap.color) > 128 ? '#000' : '#fff';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(cap.label, x, y);
    });

    // Legend
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = '12px Arial';
    ctx.fillStyle = '#1e293b';

    // User
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(20, height - 20);
    ctx.lineTo(60, height - 20);
    ctx.stroke();
    ctx.fillText('Your Order', 65, height - 20);
  }

  useEffect(() => {
    drawPlot();
  }, [arrangement]);

  const getBrightness = (hexColor) => {
    const rgb = hexToRgb(hexColor);
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  };

  const hexToRgb = (hex) => {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
  };

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <canvas ref={cieLABCanvasRef} />
    </div>
  );
};