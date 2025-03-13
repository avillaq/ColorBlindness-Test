export const cambridgePlates = [
  { id: 1, imageUrl: "/src/assets/cambridge/cambridge-plates/plate1.webp", normalAnswer: "left", type: "control" },
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

export const evaluateCambridgeResults = (answers) => {
  const getScore = (ids) => {
    const relevant = answers.filter(a => ids.includes(a.plateId));
    return relevant.filter(a => a.correct).length / relevant.length;
  };

  const scores = {
    protan: getScore([2, 5, 9, 12]),
    deutan: getScore([3, 6, 10, 13]),
    tritan: getScore([4, 7, 11, 14]),
    control: getScore([1, 8])
  };

  const diagnosis = {
    type: 'Normal Color Vision',
    protanScore: Math.round(scores.protan * 100),
    deutanScore: Math.round(scores.deutan * 100),
    tritanScore: Math.round(scores.tritan * 100)
  };

  if (scores.control < 0.8) return { ...diagnosis, type: 'Invalid Test (Control Failed)' };

  const thresholds = {
    protan: 0.4,
    deutan: 0.4,
    tritan: 0.3
  };

  if (scores.protan <= thresholds.protan && scores.deutan <= thresholds.deutan) {
    diagnosis.type = scores.protan < scores.deutan ?
      'Protan Defect' : 'Deutan Defect';
  }

  if (scores.tritan <= thresholds.tritan) {
    diagnosis.type = 'Tritan Defect';
  }

  return diagnosis;
};