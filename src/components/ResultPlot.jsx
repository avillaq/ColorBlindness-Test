import { useRef, useEffect } from 'react';
import { FARNSWORTH_D15_CONFIG } from '../utils/farnsworthD15-test';

export const ResultPlot = ({ arrangement }) => {
  const cieLABCanvasRef = useRef(null);
  const originalCaps = FARNSWORTH_D15_CONFIG.caps;

  useEffect(() => {
    if (!cieLABCanvasRef.current || !arrangement?.length) return;

    const canvas = cieLABCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);

    // Dibujar fondo
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // Configurar ejes de coordenadas
    const padding = 30;
    const plotWidth = width - 2 * padding;
    const plotHeight = height - 2 * padding;

    // Encontrar los límites de los valores a/b para todos los discos
    let minA = Infinity, maxA = -Infinity, minB = Infinity, maxB = -Infinity;
    originalCaps.forEach(cap => {
      minA = Math.min(minA, cap.cieLabValues.a);
      maxA = Math.max(maxA, cap.cieLabValues.a);
      minB = Math.min(minB, cap.cieLabValues.b);
      maxB = Math.max(maxB, cap.cieLabValues.b);
    });

    // Añadir un margen del 10% a los límites
    const rangeA = maxA - minA;
    const rangeB = maxB - minB;
    minA -= rangeA * 0.1;
    maxA += rangeA * 0.1;
    minB -= rangeB * 0.1;
    maxB += rangeB * 0.1;

    // Función para convertir valores CIE Lab a coordenadas del canvas
    const aToX = (a) => padding + ((a - minB) / (maxB - minB)) * plotWidth;
    const bToY = (b) => padding + ((b - minA) / (maxA - minA)) * plotHeight;

    // Dibujar el orden ideal (línea gris punteada)
    const idealOrder = [...originalCaps].sort((a, b) => a.id - b.id);

    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();

    const firstIdealCap = idealOrder[0];
    ctx.moveTo(
      aToX(firstIdealCap.cieLabValues.a),
      bToY(firstIdealCap.cieLabValues.b)
    );

    for (let i = 1; i < idealOrder.length; i++) {
      const cap = idealOrder[i];
      ctx.lineTo(
        aToX(cap.cieLabValues.a),
        bToY(cap.cieLabValues.b)
      );
    }

    // Cerrar el círculo
    ctx.lineTo(
      aToX(firstIdealCap.cieLabValues.a),
      bToY(firstIdealCap.cieLabValues.b)
    );

    ctx.stroke();
    ctx.setLineDash([]);

    // Dibujar el orden del usuario (línea sólida)
    if (arrangement.length > 1) {
      ctx.strokeStyle = '#1e40af';
      ctx.lineWidth = 2;
      ctx.beginPath();

      const firstCap = arrangement[0];
      ctx.moveTo(
        aToX(firstCap.cieLabValues.a),
        bToY(firstCap.cieLabValues.b)
      );

      for (let i = 1; i < arrangement.length; i++) {
        const cap = arrangement[i];
        ctx.lineTo(
          aToX(cap.cieLabValues.a),
          bToY(cap.cieLabValues.b)
        );
      }

      ctx.stroke();
    } 

    // Points for each cap
    originalCaps.forEach(cap => {a
      const x = aToX(cap.cieLabValues.a);
      const y = bToY(cap.cieLabValues.b);

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

    // Ideal
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width - 120, 20);
    ctx.lineTo(width - 80, 20);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillText('Ideal Order', width - 75, 20);

    // User
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width - 120, 45);
    ctx.lineTo(width - 80, 45);
    ctx.stroke();
    ctx.fillText('Your Order', width - 75, 45);

  }, [arrangement, originalCaps]);

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
    <canvas
      ref={cieLABCanvasRef}
      width={280}
      height={350}
    />
  );
};