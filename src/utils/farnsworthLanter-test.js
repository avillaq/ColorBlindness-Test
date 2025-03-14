// Source: https://www.colorlitelens.com/lantern-color-blind-test-more.html

export const FALANT_CONFIG = {
  combinations: [
    { id: 1, colors: ["green", "red"], type: "critical" },
    { id: 2, colors: ["white", "green"], type: "confusion" },
    { id: 3, colors: ["green", "white"], type: "confusion" },
    { id: 4, colors: ["green", "green"], type: "control" },
    { id: 5, colors: ["red", "green"], type: "critical" },
    { id: 6, colors: ["white", "red"], type: "confusion" },
    { id: 7, colors: ["white", "white"], type: "control" },
    { id: 8, colors: ["red", "white"], type: "confusion" },
    { id: 9, colors: ["red", "red"], type: "control" },
  ],
  exposureTime: 2000,
  maxErrors: 2
};

export const evaluateFarnsworthLanterResults = (answers, combinations) => {
  let criticalErrors = 0;
  let whiteConfusions = 0;
  let controlErrors = 0;

  answers.forEach((answer, index) => {
    const { type } = combinations[index];

    if (!answer.correct) {
      if (type === "critical") criticalErrors++;
      if (type === "control") controlErrors++;
      if (answer.response.includes("white") && !answer.expected.includes("white")) {
        whiteConfusions++;
      }
    }
  });

  const totalCorrect = answers.filter(a => a.correct).length;
  const accuracy = (totalCorrect / combinations.length) * 100;

  // Determine diagnosis based on answers
  const diagnosis = controlErrors > 0 ? "Invalid (Control Failed)" : criticalErrors > FALANT_CONFIG.maxErrors || whiteConfusions > 0 ? "Color Vision Deficiency Detected" : "Normal Color Vision";

  return {
    accuracy: accuracy.toFixed(1) + "%",
    correct: totalCorrect,
    incorrect: combinations.length - totalCorrect,
    diagnosis,
    details: {
      criticalErrors,
      whiteConfusions,
      controlErrors
    }
  };
};