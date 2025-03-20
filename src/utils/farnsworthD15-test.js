export const FARNSWORTH_D15_CONFIG = {
  referenceCapColor: "#3A4863",
  caps: [
    { id: 1, color: "#3A4863", isReference: true, label: "R", cieLabValues: { L: 41.8, a: -4.3, b: -22.1 } },
    { id: 2, color: "#3A5C8F", isReference: false, label: "1", cieLabValues: { L: 42.9, a: -6.2, b: -18.5 } },
    { id: 3, color: "#3B70AB", isReference: false, label: "2", cieLabValues: { L: 44.3, a: -7.9, b: -14.8 } },
    { id: 4, color: "#3B88B6", isReference: false, label: "3", cieLabValues: { L: 45.9, a: -10.6, b: -11.1 } },
    { id: 5, color: "#3BA3BC", isReference: false, label: "4", cieLabValues: { L: 47.4, a: -13.2, b: -6.8 } },
    { id: 6, color: "#3BBEB6", isReference: false, label: "5", cieLabValues: { L: 48.8, a: -15.3, b: -2.0 } },
    { id: 7, color: "#42C18B", isReference: false, label: "6", cieLabValues: { L: 49.8, a: -17.5, b: 3.7 } },
    { id: 8, color: "#63C164", isReference: false, label: "7", cieLabValues: { L: 50.5, a: -19.1, b: 8.9 } },
    { id: 9, color: "#88BD46", isReference: false, label: "8", cieLabValues: { L: 50.9, a: -14.7, b: 13.8 } },
    { id: 10, color: "#B1B231", isReference: false, label: "9", cieLabValues: { L: 50.7, a: -7.9, b: 18.0 } },
    { id: 11, color: "#D3A232", isReference: false, label: "10", cieLabValues: { L: 50.1, a: -0.2, b: 21.1 } },
    { id: 12, color: "#D98141", isReference: false, label: "11", cieLabValues: { L: 49.2, a: 7.6, b: 18.9 } },
    { id: 13, color: "#D66551", isReference: false, label: "12", cieLabValues: { L: 47.9, a: 14.6, b: 16.2 } },
    { id: 14, color: "#C85566", isReference: false, label: "13", cieLabValues: { L: 46.3, a: 21.1, b: 9.5 } },
    { id: 15, color: "#A25979", isReference: false, label: "14", cieLabValues: { L: 44.3, a: 14.8, b: -0.5 } },
    { id: 16, color: "#7B5B86", isReference: false, label: "15", cieLabValues: { L: 43.1, a: 4.2, b: -11.4 } }
  ],
  errorPatterns: {
    protan: [[15, 2], [14, 3], [13, 4], [12, 5], [11, 6], [10, 7], [9, 8]],
    deutan: [[15, 2], [14, 3], [13, 4], [12, 5], [11, 6], [10, 7]],
    tritan: [[3, 10], [4, 9], [5, 8], [6, 7], [14, 1], [13, 16], [12, 15]]
  }
};

const cieLabDistance = (color1, color2) => {
  const kL = 1.0;
  const kA = 1.5;
  const kB = 1.0;

  const deltaL = (color1.L - color2.L) * kL;
  const deltaA = (color1.a - color2.a) * kA;
  const deltaB = (color1.b - color2.b) * kB;

  return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
};

// Calculate the confusion angles for a given arrangement
const calculateConfusionAngle = (arrangement, config) => {
  const indexSequence = arrangement.map(cap => cap.id);

  const crossingCount = {
    protan: 0,
    deutan: 0,
    tritan: 0
  };

  // Compare typical patterns for each type of color vision deficiency
  for (let i = 0; i < indexSequence.length - 1; i++) {
    const currentId = indexSequence[i];
    const nextId = indexSequence[i + 1];


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

// Calculate the total error
const calculateTotalError = (arrangement) => {
  let totalError = 0;

  for (let i = 0; i < arrangement.length - 1; i++) {
    const currentCap = arrangement[i];
    const nextCap = arrangement[i + 1];

    totalError += cieLabDistance(
      currentCap.cieLabValues,
      nextCap.cieLabValues
    );
  }

  return totalError;
};

// Analyze the arrangement to detect the type of color vision deficiency
const detectDeficiencyPattern = (arrangement, config) => {
  const confusionAngles = calculateConfusionAngle(arrangement, config);
  const totalCrossings = confusionAngles.protan + confusionAngles.deutan + confusionAngles.tritan;

  let deficiencyType = 'Normal';
  let confidence = 'High';

  const MAJOR_CROSSING_THRESHOLD = 2;
  const MINOR_CROSSING_THRESHOLD = 1;

  if (totalCrossings >= MAJOR_CROSSING_THRESHOLD) {
    const patterns = {
      protan: {
        count: confusionAngles.protan,
        threshold: 0.35 * totalCrossings
      },
      deutan: {
        count: confusionAngles.deutan,
        threshold: 0.35 * totalCrossings
      },
      tritan: {
        count: confusionAngles.tritan,
        threshold: 0.35 * totalCrossings
      }
    };

    if (patterns.protan.count >= patterns.protan.threshold) {
      deficiencyType = 'Protan';
      confidence = patterns.protan.count > patterns.protan.threshold * 1.5 ? 'High' : 'Medium';
    } else if (patterns.deutan.count >= patterns.deutan.threshold) {
      deficiencyType = 'Deutan';
      confidence = patterns.deutan.count > patterns.deutan.threshold * 1.5 ? 'High' : 'Medium';
    } else if (patterns.tritan.count >= patterns.tritan.threshold) {
      deficiencyType = 'Tritan';
      confidence = patterns.tritan.count > patterns.tritan.threshold * 1.5 ? 'High' : 'Medium';
    }

    const hasMultiplePatterns = Object.values(patterns)
      .filter(p => p.count >= MINOR_CROSSING_THRESHOLD).length > 1;

    if (hasMultiplePatterns) {
      deficiencyType = 'Mixed';
      confidence = 'Medium';
    }
  }

  return {
    type: deficiencyType,
    confidence,
    crossings: confusionAngles,
    details: {
      totalCrossings,
      patternStrength: totalCrossings / arrangement.length
    }
  };
};

export const evaluateFarnsworthD15Results = (arrangement, config) => {
  const totalError = calculateTotalError(arrangement);
  const deficiencyPattern = detectDeficiencyPattern(arrangement, config);

  const ERROR_THRESHOLDS = {
    SEVERE: 100,
    MODERATE: 60,
    MILD: 30
  };

// Calculate el error ideal
const idealArrangement = [...config.caps].sort((a, b) => a.id - b.id);
const idealError = calculateTotalError(idealArrangement);
const normalizedError = Math.max(0, (totalError - idealError) / idealError);

const accuracy = Math.max(0, 100 - (
  (normalizedError * 100) * 0.6 +
  (deficiencyPattern.details.patternStrength * 100) * 0.4
));

  let diagnosis = "Normal Color Vision";
  let severity = "None";

  if (deficiencyPattern.type !== 'Normal') {
    if (totalError > ERROR_THRESHOLDS.SEVERE) {
      severity = "Severe";
    } else if (totalError > ERROR_THRESHOLDS.MODERATE) {
      severity = "Moderate to Severe";
    } else if (totalError > ERROR_THRESHOLDS.MILD) {
      severity = "Mild to Moderate";
    } else {
      severity = "Mild";
    }

    diagnosis = `${deficiencyPattern.type} Color Vision Deficiency (${severity})`;
  }

  return {
    testName: "Farnsworth D15 Test",
    accuracy: `${Math.round(accuracy)}%`,
    diagnosis,
    details: {
      deficiencyType: deficiencyPattern.type,
      severity,
      confidence: deficiencyPattern.confidence,
      crossings: deficiencyPattern.crossings,
      totalError: Math.round(totalError),
      patternStrength: deficiencyPattern.details.patternStrength.toFixed(2),
      errorAnalysis: {
        totalCrossings: deficiencyPattern.details.totalCrossings,
        protanScore: deficiencyPattern.crossings.protan,
        deutanScore: deficiencyPattern.crossings.deutan,
        tritanScore: deficiencyPattern.crossings.tritan
      }
    }
  };
};