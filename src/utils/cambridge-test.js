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

export const evaluateCambridgeResults = (results) => {
  const diagnosis = {
    type: "normal",
    severity: "normal vision",
    ellipseRatio: null
  };

  return diagnosis;
};