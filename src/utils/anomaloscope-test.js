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
  
  const diagnosis = {
    type: "Normal Vision",
    severity: "Normal",
    confidence: 100 - Math.abs(avgRed - 40) * 2 // 40 = normal value
  };

  if (avgRed > config.diagnosisThresholds.protanRed) {
    diagnosis.type = "Protanomaly";
    diagnosis.severity = avgRed > 90 ? "Severe" : "Moderada";
  } else if (avgRed < config.diagnosisThresholds.deutanGreen) {
    diagnosis.type = "Deuteranomaly";
    diagnosis.severity = avgRed < 20 ? "Severe" : "Moderada";
  } else if (avgRed < 35 || avgRed > 45) {
    diagnosis.type = "Mild Anomaly";
    diagnosis.severity = "Mild";
  }

  return {
    testName: "Anomaloscope Test",
    accuracy: `${Math.max(0, 100 - Math.abs(avgRed - 40) * 2).toFixed(1)}%`,
    correct: answers.filter(a => a.red >= 35 && a.red <= 45).length,
    incorrect: answers.length - answers.filter(a => a.red >= 35 && a.red <= 45).length,
    diagnosis: `${diagnosis.type} (${diagnosis.severity})`,
    details: {
      avgRed: avgRed.toFixed(1),
      avgYellow: avgYellow.toFixed(1),
      attempts: answers.length,
      confidence: diagnosis.confidence.toFixed(1)
    }
  };
};