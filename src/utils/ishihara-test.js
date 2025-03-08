// Source: https://web.stanford.edu/group/vista/wikiupload/0/0a/Ishihara.14.Plate.Instructions.pdf

export const ishiharaPlates = [
  { id: 1, imageUrl: "/src/assets/ishihara-plates/plate1.webp", normalAnswer: "12", deficientAnswer: "12", type: "control" },
  { id: 2, imageUrl: "/src/assets/ishihara-plates/plate2.webp", normalAnswer: "8", deficientAnswer: "3", type: "test" },
  { id: 3, imageUrl: "/src/assets/ishihara-plates/plate3.webp", normalAnswer: "5", deficientAnswer: "2", type: "test" },
  { id: 4, imageUrl: "/src/assets/ishihara-plates/plate4.webp", normalAnswer: "29", deficientAnswer: "70", type: "test" },
  { id: 5, imageUrl: "/src/assets/ishihara-plates/plate5.webp", normalAnswer: "74", deficientAnswer: "21", type: "test" },
  { id: 6, imageUrl: "/src/assets/ishihara-plates/plate6.webp", normalAnswer: "7", deficientAnswer: "X", type: "test" },
  { id: 7, imageUrl: "/src/assets/ishihara-plates/plate7.webp", normalAnswer: "45", deficientAnswer: "X", type: "test" },
  { id: 8, imageUrl: "/src/assets/ishihara-plates/plate8.webp", normalAnswer: "6", deficientAnswer: "X", type: "test" },
  { id: 9, imageUrl: "/src/assets/ishihara-plates/plate9.webp", normalAnswer: "X", deficientAnswer: "45", type: "test" },
  { id: 10, imageUrl: "/src/assets/ishihara-plates/plate10.webp", normalAnswer: "16", deficientAnswer: "X", type: "test" },
  { id: 11, imageUrl: "/src/assets/ishihara-plates/plate11.webp", normalAnswer: "green", deficientAnswer: "X", type: "test" },

  { id: 12, imageUrl: "/src/assets/ishihara-plates/plate12.webp", normalAnswer: "26", protanAnswer: "6", deutanAnswer: "2", type: "diagnostic" },
  { id: 13, imageUrl: "/src/assets/ishihara-plates/plate13.webp", normalAnswer: "42", protanAnswer: "2", deutanAnswer: "4", type: "diagnostic" },
  { id: 14, imageUrl: "/src/assets/ishihara-plates/plate14.webp", normalAnswer: "purple & red", protanAnswer: "purple", deutanAnswer: "red", type: "diagnostic" },
];

export const evaluateIshiharaResults = (answers, plates) => {
  let correct = 0;
  let basicCorrect = 0;
  let protanCount = 0;
  let deutanCount = 0;

  answers.forEach(answer => {
    const plate = plates.find(p => p.id === answer.id);
    const normalizedAnswer = answer.response.toLowerCase().trim();

    // Verify normal answers for plates 1-11
    if (normalizedAnswer === plate.normalAnswer.toLowerCase()) {
      correct++;
      if (plate.id <= 11) {
        basicCorrect++;
      }
      return;
    }

    // Verify diagnostic answers for plates 12-14
    if (plate.type === "diagnostic") {
      if (normalizedAnswer === plate.protanAnswer?.toLowerCase()) {
        protanCount++;
      }
      if (normalizedAnswer === plate.deutanAnswer?.toLowerCase()) {
        deutanCount++;
      }
    }
  });

  // Determine diagnosis based on answers
  let diagnosis = "";
  if (basicCorrect >= 10) {
    diagnosis = "Normal color vision";
  } else if (basicCorrect <= 7) {
    if (protanCount > deutanCount) {
      diagnosis = "Protanopia (difficulty seeing red)";
    } else if (deutanCount > protanCount) {
      diagnosis = "Deuteranopia (difficulty seeing green)";
    } else {
      diagnosis = "Mixed deficiency/inconclusive";
    }
  } else {
    diagnosis = "Inconclusive results (requires further testing)";
  }

  return {
    accuracy: `${((correct / plates.length) * 100).toFixed(2)}%`,
    correct,
    incorrect: plates.length - correct,
    diagnosis,
    details: {
      basicCorrect,
      protanMatches: protanCount,
      deutanMatches: deutanCount
    }
  };
};