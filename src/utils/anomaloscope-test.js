export const ANOMALOSCOPE_CONFIG = {
  initialValues: {
    red: 40,  // 40% red
    green: 60, // 60% green
    yellow: 50 // 50% brightness
  },
  limits: {
    red: { min: 0, max: 100 },
    green: { min: 0, max: 100 },
    yellow: { min: 20, max: 80 }
  },
  maxAttempts: 3,
  diagnosisThresholds: {
    normalRedRange: [35, 45],
    protanRed: 80,
    deutanGreen: 70
  }
};

export const evaluateAnomaloscopeResults = (answers, config) => {
  const avgRed = answers.reduce((sum, a) => sum + a.red, 0) / answers.length;
  const avgYellow = answers.reduce((sum, a) => sum + a.yellow, 0) / answers.length;
  const consistency = Math.sqrt(answers.reduce((sum, a) => sum + Math.pow(a.red - avgRed, 2), 0) / answers.length);

  let diagnosis = {
    type: "Normal Color Vision",
    severity: "None",
    confidence: Math.max(0, 100 - Math.abs(avgRed - 40) * 1.5 - consistency * 2)
  };

  // Red-heavy mix suggests protanomaly (reduced red sensitivity)
  if (avgRed > 65) {
    diagnosis.type = "Protanomaly";
    diagnosis.severity = avgRed > 85 ? "Severe" : avgRed > 75 ? "Moderate" : "Mild";
  }
  // Green-heavy mix suggests deuteranomaly (reduced green sensitivity)
  else if (avgRed < 30) {
    diagnosis.type = "Deuteranomaly";
    diagnosis.severity = avgRed < 15 ? "Severe" : avgRed < 25 ? "Moderate" : "Mild";
  }
  // Small deviation could be mild anomaly
  else if (avgRed < 35 || avgRed > 45) {
    diagnosis.type = "Mild Color Vision Anomaly";
    diagnosis.severity = "Mild";
  }

  if (consistency > 15) {
    diagnosis.confidence = Math.max(0, diagnosis.confidence - 30);
  }

  return {
    testName: "Anomaloscope Test",
    accuracy: `${Math.round(diagnosis.confidence)}%`,
    correct: answers.filter(a => a.red >= 35 && a.red <= 45).length,
    incorrect: answers.length - answers.filter(a => a.red >= 35 && a.red <= 45).length,
    diagnosis: `${diagnosis.type} (${diagnosis.severity})`,
    details: {
      avgRed: avgRed.toFixed(2),
      avgYellow: avgYellow.toFixed(2),
      consistency: consistency.toFixed(2),
      confidence: diagnosis.confidence.toFixed(0)
    }
  };
};