export const FARNSWORTH_D15_CONFIG = {
  referenceCapColor: "#3A4863",
  caps: [
    { id: 1, color: "#3A4863", isReference: true, label: "R", cieLabValues: { L: 41.8, a: -4.3, b: -22.1 } },
    { id: 2, color: "#3A5C8F", isReference: false, label: "2", cieLabValues: { L: 42.9, a: -6.2, b: -18.5 } },
    { id: 3, color: "#3B70AB", isReference: false, label: "3", cieLabValues: { L: 44.3, a: -7.9, b: -14.8 } },
    { id: 4, color: "#3B88B6", isReference: false, label: "4", cieLabValues: { L: 45.9, a: -10.6, b: -11.1 } },
    { id: 5, color: "#3BA3BC", isReference: false, label: "5", cieLabValues: { L: 47.4, a: -13.2, b: -6.8 } },
    { id: 6, color: "#3BBEB6", isReference: false, label: "6", cieLabValues: { L: 48.8, a: -15.3, b: -2.0 } },
    { id: 7, color: "#42C18B", isReference: false, label: "7", cieLabValues: { L: 49.8, a: -17.5, b: 3.7 } },
    { id: 8, color: "#63C164", isReference: false, label: "8", cieLabValues: { L: 50.5, a: -19.1, b: 8.9 } },
    { id: 9, color: "#88BD46", isReference: false, label: "9", cieLabValues: { L: 50.9, a: -14.7, b: 13.8 } },
    { id: 10, color: "#B1B231", isReference: false, label: "10", cieLabValues: { L: 50.7, a: -7.9, b: 18.0 } },
    { id: 11, color: "#D3A232", isReference: false, label: "11", cieLabValues: { L: 50.1, a: -0.2, b: 21.1 } },
    { id: 12, color: "#D98141", isReference: false, label: "12", cieLabValues: { L: 49.2, a: 7.6, b: 18.9 } },
    { id: 13, color: "#D66551", isReference: false, label: "13", cieLabValues: { L: 47.9, a: 14.6, b: 16.2 } },
    { id: 14, color: "#C85566", isReference: false, label: "14", cieLabValues: { L: 46.3, a: 21.1, b: 9.5 } },
    { id: 15, color: "#A25979", isReference: false, label: "15", cieLabValues: { L: 44.3, a: 14.8, b: -0.5 } },
    { id: 16, color: "#7B5B86", isReference: false, label: "16", cieLabValues: { L: 43.1, a: 4.2, b: -11.4 } }
  ],
  errorPatterns: {
    protan: [[15, 2], [14, 3], [13, 4], [12, 5], [11, 6], [10, 7], [9, 8]],
    deutan: [[15, 2], [14, 3], [13, 4], [12, 5], [11, 6], [10, 7]],
    tritan: [[3, 10], [4, 9], [5, 8], [6, 7], [14, 1], [13, 16], [12, 15]]
  }
};

const cieLabDistance = (color1, color2) => {
  const deltaL = color1.L - color2.L;
  const deltaA = color1.a - color2.a;
  const deltaB = color1.b - color2.b;
  return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
};

// Calcular la distancia en el espacio CIE Lab
const calculateConfusionAngle = (arrangement, config) => {
  // Implementación real del cálculo de ángulos de confusión
  // basada en estudios clínicos
  const indexSequence = arrangement.map(cap => cap.id);

  // Detectar cruces en ejes de confusión
  const crossingCount = {
    protan: 0,
    deutan: 0,
    tritan: 0
  };

  // Analizar el patrón de ordenamiento y compararlo con patrones típicos
  for (let i = 0; i < indexSequence.length - 1; i++) {
    const currentId = indexSequence[i];
    const nextId = indexSequence[i + 1];

    // Verificar cruces de líneas de confusión para cada tipo
    config.errorPatterns.protan.forEach(pair => {
      if ((currentId === pair[0] && nextId === pair[1]) ||
        (currentId === pair[1] && nextId === pair[0])) {
        crossingCount.protan++;
      }
    });

    config.errorPatterns.deutan.forEach(pair => {
      if ((currentId === pair[0] && nextId === pair[1]) ||
        (currentId === pair[1] && nextId === pair[0])) {
        crossingCount.deutan++;
      }
    });

    config.errorPatterns.tritan.forEach(pair => {
      if ((currentId === pair[0] && nextId === pair[1]) ||
        (currentId === pair[1] && nextId === pair[0])) {
        crossingCount.tritan++;
      }
    });
  }

  return crossingCount;
};

// Calcular el error total del arreglo
const calculateTotalError = (arrangement) => {
  let totalError = 0;

  // El orden correcto es secuencial: 1, 2, 3, ..., 15, 16
  for (let i = 0; i < arrangement.length - 1; i++) {
    const currentCap = arrangement[i];
    const nextCap = arrangement[i + 1];

    // Calcular el error como la distancia en el espacio CIE Lab
    totalError += cieLabDistance(
      currentCap.cieLabValues,
      nextCap.cieLabValues
    );
  }

  return totalError;
};

// Analizar el patrón para detectar deficiencias específicas
const detectDeficiencyPattern = (arrangement, config) => {
  const confusionAngles = calculateConfusionAngle(arrangement, config);

  // Determinar el tipo de deficiencia basado en la cantidad de cruces
  let deficiencyType = 'Normal';
  let confidence = 'High';

  const maxCrosses = Math.max(
    confusionAngles.protan,
    confusionAngles.deutan,
    confusionAngles.tritan
  );

  if (maxCrosses >= 3) {
    // Determinar el tipo predominante
    if (confusionAngles.protan > confusionAngles.deutan &&
      confusionAngles.protan > confusionAngles.tritan) {
      deficiencyType = 'Protan';
    } else if (confusionAngles.deutan > confusionAngles.protan &&
      confusionAngles.deutan > confusionAngles.tritan) {
      deficiencyType = 'Deutan';
    } else if (confusionAngles.tritan > confusionAngles.protan &&
      confusionAngles.tritan > confusionAngles.deutan) {
      deficiencyType = 'Tritan';
    } else if (confusionAngles.protan === confusionAngles.deutan &&
      confusionAngles.protan > confusionAngles.tritan) {
      deficiencyType = 'Red-Green';
      confidence = 'Medium';
    } else {
      deficiencyType = 'Mixed';
      confidence = 'Low';
    }
  }

  return {
    type: deficiencyType,
    confidence,
    crossings: confusionAngles
  };
};

export const evaluateFarnsworthD15Results = (arrangement, config) => {
  console.log("Arreglo: ",arrangement)
  // Calcular errores
  const correctOrder = [...config.caps];
  console.log("Orden Correcto", correctOrder);
  
  // Número de posiciones correctas
  let correctPositions = 0;
  for (let i = 0; i < arrangement.length; i++) {
    if (arrangement[i].id === correctOrder[i].id) {
      correctPositions++;
    }
  }

  correctPositions--; // Correct Positions without cap reference   

  // Calcular el error total
  const totalError = calculateTotalError(arrangement);

  // Detectar el patrón de deficiencia
  const deficiencyPattern = detectDeficiencyPattern(arrangement, config);

  // Calcular precisión general (como porcentaje)
  const accuracy = Math.max(0, 100 - Math.min(100, totalError / 5));

  // Determinación del diagnóstico
  let diagnosis = "Normal Color Vision";
  if (deficiencyPattern.type !== 'Normal') {
    diagnosis = `${deficiencyPattern.type} Color Deficiency`;
    if (totalError > 60) {
      diagnosis += " (Moderate to Severe)";
    } else if (totalError > 30) {
      diagnosis += " (Mild to Moderate)";
    } else {
      diagnosis += " (Mild)";
    }
  }

  return {
    testName: "Farnsworth D15 Test",
    accuracy: `${Math.round(accuracy)}%`,
    correct: correctPositions,
    incorrect: (arrangement.length - 1) - correctPositions,
    diagnosis: diagnosis,
    details: {
      deficiencyType: deficiencyPattern.type,
      confidenceLevel: deficiencyPattern.confidence,
      protanCrossings: deficiencyPattern.crossings.protan,
      deutanCrossings: deficiencyPattern.crossings.deutan,
      tritanCrossings: deficiencyPattern.crossings.tritan,
      totalError: Math.round(totalError)
    }
  };
};