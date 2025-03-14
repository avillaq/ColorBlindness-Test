export const cambridgePlates = [
  { id: 1, imageUrl: "/src/assets/cambridge/cambridge-plates/plate1.webp", normalAnswer: "left", type: "test" },
  { id: 2, imageUrl: "/src/assets/cambridge/cambridge-plates/plate2.webp", normalAnswer: "right", type: "test" },
  { id: 3, imageUrl: "/src/assets/cambridge/cambridge-plates/plate3.webp", normalAnswer: "bottom", type: "test" },
  { id: 4, imageUrl: "/src/assets/cambridge/cambridge-plates/plate4.webp", normalAnswer: "top", type: "test" },
  { id: 5, imageUrl: "/src/assets/cambridge/cambridge-plates/plate5.webp", normalAnswer: "right", type: "test" },
  { id: 6, imageUrl: "/src/assets/cambridge/cambridge-plates/plate6.webp", normalAnswer: "top", type: "test" },
  { id: 7, imageUrl: "/src/assets/cambridge/cambridge-plates/plate7.webp", normalAnswer: "bottom", type: "test" },
  { id: 8, imageUrl: "/src/assets/cambridge/cambridge-plates/plate8.webp", normalAnswer: "top", type: "test" },
  { id: 9, imageUrl: "/src/assets/cambridge/cambridge-plates/plate9.webp", normalAnswer: "left", type: "test" },
  { id: 10, imageUrl: "/src/assets/cambridge/cambridge-plates/plate10.webp", normalAnswer: "top", type: "test" },
  { id: 11, imageUrl: "/src/assets/cambridge/cambridge-plates/plate11.webp", normalAnswer: "bottom", type: "test" },
  { id: 12, imageUrl: "/src/assets/cambridge/cambridge-plates/plate12.webp", normalAnswer: "right", type: "test" },
  { id: 13, imageUrl: "/src/assets/cambridge/cambridge-plates/plate13.webp", normalAnswer: "right", type: "test" },
  { id: 14, imageUrl: "/src/assets/cambridge/cambridge-plates/plate14.webp", normalAnswer: "left", type: "test" },
];

export const evaluateCambridgeResults = (answers, plates) => {
  let correct = 0;

  answers.forEach(answer => {
    const plate = plates.find(p => p.id === answer.id);
    const normalizedAnswer = answer.response.toLowerCase().trim();

    if (normalizedAnswer === plate.normalAnswer.toLowerCase()) {
      correct++;
    }
  });

  let diagnosis = "";
  if (correct >= 10) {
    diagnosis = "Normal color vision";
  } else if (correct >= 7) {
    diagnosis = "Color vision deficiency";
  } else {
    diagnosis = "Inconclusive results (requires further testing)";
  }

  return {
    accuracy: `${((correct / plates.length) * 100).toFixed(2)}%`,
    total: plates.length,
    correct,
    incorrect: plates.length - correct,
    diagnosis
  };
};