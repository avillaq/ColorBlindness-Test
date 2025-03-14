// Source: https://www.colorlitelens.com/lantern-color-blind-test-more.html

export const FALANT_CONFIG = {
  combinations: [
    { id: 1, colors: ["red", "green"], type: "critical" },
    { id: 2, colors: ["green", "red"], type: "critical" },
    { id: 3, colors: ["white", "red"], type: "confusion" },
    { id: 4, colors: ["red", "white"], type: "confusion" },
    { id: 5, colors: ["white", "green"], type: "confusion" },
    { id: 6, colors: ["green", "white"], type: "confusion" },
    { id: 7, colors: ["red", "red"], type: "control" },
    { id: 8, colors: ["green", "green"], type: "control" },
    { id: 9, colors: ["white", "white"], type: "control" }
  ],
  exposureTime: 2000,
  maxErrors: 2
};