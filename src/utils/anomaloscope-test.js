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

export const evaluateAnomaloscopeResults = (adjustments) => {
  const avgRed = adjustments.reduce((sum, a) => sum + a.red, 0) / adjustments.length;
  const avgYellow = adjustments.reduce((sum, a) => sum + a.yellow, 0) / adjustments.length;
  
  const { normalRedRange, protanRed, deutanGreen } = ANOMALOSCOPE_CONFIG.diagnosisThresholds;
  
  const diagnosis = {
    type: "Normal",
    severity: "None",
    confidence: 0
  };

  if (avgRed > protanRed) {
    diagnosis.type = "Protanomalía";
    diagnosis.severity = avgRed > 90 ? "Severa" : "Moderada";
    diagnosis.confidence = Math.min(100, (avgRed - protanRed) * 2);
  } else if ((100 - avgRed) > deutanGreen) {
    diagnosis.type = "Deuteranomalía";
    diagnosis.severity = avgRed < 20 ? "Severa" : "Moderada";
    diagnosis.confidence = Math.min(100, ((100 - avgRed) - deutanGreen) * 2);
  } else if (avgRed < normalRedRange[0] || avgRed > normalRedRange[1]) {
    diagnosis.type = "Anomalía no clasificada";
    diagnosis.severity = "Leve";
    diagnosis.confidence = 50;
  }

  return {
    diagnosis: `${diagnosis.type} (${diagnosis.severity})`,
    confidence: diagnosis.confidence,
    metrics: {
      avgRed: avgRed.toFixed(1),
      avgYellow: avgYellow.toFixed(1),
      attempts: adjustments.length
    }
  };
};