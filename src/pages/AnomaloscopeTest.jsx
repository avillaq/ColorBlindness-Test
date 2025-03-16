import { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Slider } from "@heroui/slider";
import { DescriptionCarouselTest } from "../components/DescriptionCarouselTest";
import { DescriptionStepperTest } from "../components/DescriptionStepperTest";
import { DescriptionGridTest } from "../components/DescriptionGridTest";
import { Progress } from "@heroui/progress";
import { ANOMALOSCOPE_CONFIG, getRandomInitialValues, evaluateAnomaloscopeResults } from "../utils/anomaloscope-test";
import { pdf } from "@react-pdf/renderer";
import { ResultsPDF } from "../components/ResultsPDF";
import ReactCompareImage from "react-compare-image";
import anomaloscopeTestOriginal from "../assets/anomaloscope/anomaloscope-original.webp";
import anomaloscopeNormalVision from "../assets/anomaloscope/anomaloscope-normal.webp";
import anomaloscopeProtanopia from "../assets/anomaloscope/anomaloscope-protanopia.webp";
import anomaloscopeTritanopia from "../assets/anomaloscope/anomaloscope-tritanopia.webp";
import anomaloscopeRedGreen from "../assets/anomaloscope/anomaloscope-red-green-blindness.webp";
import "../styles/pages/TestItem.css";
import "../styles/pages/AnomaloscopeTest.css";

export const AnomaloscopeTest = () => {
  const [showTest, setShowTest] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [results, setResults] = useState(null);
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [controls, setControls] = useState(getRandomInitialValues());
  const [answers, setAnswers] = useState([]);

  const updateColorMix = (type, value) => {
    setControls(prev => {
      const newValues = { ...prev };
      if (type === "red") {
        newValues.red = value;
        newValues.green = 100 - value;
      }
      if (type === "yellow") newValues.yellow = value;
      return newValues;
    });
  };

  const handleAnswer = () => {
    const updatedAnswers = [...answers, controls];
    setAnswers(updatedAnswers);
    
    if (currentAttempt < ANOMALOSCOPE_CONFIG.maxAttempts - 1) {
      setCurrentAttempt(prev => prev + 1);
      setControls(getRandomInitialValues());
    } else {
      const diagnosis = evaluateAnomaloscopeResults(updatedAnswers);
      setResults(diagnosis);
    }
  };

  const resetTest = () => {
    setCurrentAttempt(0);
    setControls(getRandomInitialValues());
    setAnswers([]);
    setResults(null);
  };

  const handleDownloadPDF = async () => {
    const blob = await pdf(<ResultsPDF results={results} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Anomaloscope-test-results-${new Date().toISOString().split("T")[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (results) {
    return (
      <div className="item-test-hero">
        <div className="content-text">
          <h2>Test Results</h2>
          <p>Your color vision assessment results are ready.</p>
        </div>
        <div className="mt-4 w-full max-w-[550px]">
          <Card>
            <CardBody className="cardbody-results">
              <div className="results-summary">
                <div className="results-score">
                  <div className="score-circle">
                    <h3>{results.accuracy}</h3>
                    <p>Accuracy</p>
                  </div>
                </div>
                <div className="results-diagnosis">
                  <h3>Diagnosis</h3>
                  <p>{results.diagnosis}</p>
                </div>
              </div>

              <div className="results-details">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardBody>
                      <h4>Matches in Normal Range</h4>
                      <p className="text-success">{results.normalRange}/{ANOMALOSCOPE_CONFIG.maxAttempts}</p>
                      <span className="text-xs text-gray-500">(Normal: 35-45% red)</span>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <h4>Matches Outside Range</h4>
                      <p className="text-danger">{results.outOfRange}/{ANOMALOSCOPE_CONFIG.maxAttempts}</p>
                      <span className="text-xs text-gray-500">(Indicates possible deficiency)</span>
                    </CardBody>
                  </Card>
                </div>

                <Card className="mt-4">
                  <CardBody>
                    <h4>Analysis</h4>
                    <div className="analysis">
                      <div>
                        <p>Red-Green Ratio</p>
                        <p>{results.details.avgRed}% R / {(100 - results.details.avgRed).toFixed(1)}% G</p>
                      </div>
                      <div>
                        <p>Yellow Brightness</p>
                        <p>{results.details.avgYellow}%</p>
                      </div>
                      <div>
                        <p>Match Consistency</p>
                        <p>{results.details.matchConsistency}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
              <div className="disclaimer-container">
                <div className="min-w-6">
                  <box-icon name="info-circle" color="#64748b"></box-icon>
                </div>
                <p className="disclaimer">
                  NOTE: This test is not a substitute for professional medical evaluation.
                  Consult an eye specialist for confirmation.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="results-actions">
          <Button color="primary" onPress={() => window.location.reload()}>
            Take Test Again
          </Button>
          <Button color="secondary" variant="ghost" onPress={handleDownloadPDF}>
            Download Report
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="item-test-container">
      <div className={`item-test-hero ${showTest ? "gap-3" : "gap-12"}`}>
        <div className="content-text">
          <h2>Anomaloscope Test</h2>
          {!showTest && <p>Use our online Anomaloscope Test to detect and analyze color vision anomalies. Get precise insights into your color perception abilities.</p>}
        </div>
        <div className={`content-item-test ${showTest ? "text-right" : "text-center"}`}>
          {
            !showTest ?
              <>
                <Button color="primary" onPress={onOpen}>Start Test</Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">Instructions</ModalHeader>
                        <ModalBody>
                          <p className="mb-2">Before taking the test, it is necessary to prepare for the test by ensuring the following, for accurate results:</p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Keep your device's brightness high.</li>
                            <li>Close all the background tabs which may overshadow during the test.</li>
                            <li>Turn off the blue light filters, or any other modes on the device.</li>
                            <li>Take off glasses, and lenses from the eyes, and sit in a brightly lighted room.</li>
                            <li>Keep any reflections away from the screen.</li>
                          </ul>
                          <p className="mt-4">Now that you are ready to take the test, go through the steps one by one.</p>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="danger" variant="light" onPress={onClose}>
                            Cancel
                          </Button>
                          <Button color="primary" onPress={() => { setShowTest(true); onClose(); }}>
                            Start Test
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </>
              :
              <>
                <Button size="sm" isIconOnly color="primary" variant="light" onPress={() => { setShowTest(false); resetTest(); }} >
                  <box-icon name="x" size="lg" color="gray" animation="tada-hover"></box-icon>
                </Button>
                <Progress aria-label="Loading..." size="sm" className="mb-4" value={currentAttempt + 1} maxValue={ANOMALOSCOPE_CONFIG.maxAttempts} />
                <Card className="h-[610px] md:h-[428px]">
                  <CardBody className="cardbody-test">
                    <div className="anomaloscope-test-plates">
                      <p className="text-center mt-2 text-sm text-gray-600">Adjust the sliders until both squares match in color as closely as possible.</p>
                      <div className="color-fields">
                        <div
                          className="mix-field"
                          style={{
                            backgroundColor: `rgb(${Math.round(controls.red * 2.55)}, ${Math.round(controls.green * 2.55)}, 0)`
                          }}
                        >
                          <span>Mix (R+G)</span>
                        </div>
                        <div
                          className="test-field"
                          style={{
                            backgroundColor: `rgb(${Math.round(255 * (controls.yellow / 100))}, ${Math.round(255 * (controls.yellow / 100))}, 0)`
                          }}
                        >
                          <span>Test (Y)</span>
                        </div>
                      </div>
                    </div>

                    <div className="anomaloscope-test-controls">
                      <Card className="w-full max-w-[400px]" classNames={{ body: "px-0 sm:p-4" }}>
                        <CardBody>
                          <div className="flex flex-col items-center gap-4 p-4">
                            <Slider
                              defaultValue={controls.red}
                              label={`Red: ${controls.red}%`}
                              maxValue={100}
                              minValue={0}
                              size="sm"
                              hideValue={true}
                              onChange={(value) => updateColorMix("red", parseInt(value))}
                            />
                            <Slider
                              defaultValue={controls.yellow}
                              label={`Yellow: ${controls.yellow}%`}
                              maxValue={80}
                              minValue={20}
                              size="sm"
                              hideValue={true}
                              onChange={(value) => updateColorMix("yellow", parseInt(value))}
                            />
                            <Button color="primary" onPress={handleAnswer}>
                              {currentAttempt < 2 ? "Next attempt" : "Finish test"}
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </CardBody>
                </Card>
              </>
          }

        </div>
      </div>
      {
        !showTest &&
        <div className="description-item-test">
          <div className="description-item-section">
            <h2>What is the Anomaloscope Test?</h2>
            <div className="flex flex-col items-center lg:flex-row gap-8">
              <div className="flex-1">
                <p>The Anomaloscope Test was developed in the early 20th century, with its foundation built upon the work of Lord Rayleigh, who first introduced a color mixing apparatus, and Dr. Willibald Nagel, who invented the anomaloscope in 1907. This test became the gold standard for diagnosing color vision deficiencies by having users match spectral colors. In the test, the subject adjusts the brightness of colors to match a given target, making it highly effective in diagnosing red-green and blue-yellow color blindness.</p>
                <p>The Anomaloscope Test is divided into categories like the Rayleigh Match, which assesses red-green deficiencies, and the Engelking-Trendelenburg Match, which helps diagnose blue-yellow deficiencies. The Moreland Match focuses on blue-green hues. Each match uses precise spectral colors to quantify color vision capabilities.</p>
                <p>This test has been widely used in academic research to validate other color vision tests. Its scientific accuracy and reliability make it a key instrument in the diagnosis and classification of color blindness, ensuring its place as a trusted tool in both medical and occupational screenings. Its precision in detecting subtle deficiencies makes it unparalleled in color vision diagnostics.</p>
              </div>
              <Image
                src={anomaloscopeTestOriginal}
                alt="Anomaloscope test original"
                width={430}
                className="flex-1"
              />
            </div>
          </div>
          <div className="description-item-section">
            <h2 className="text-center">Types of Deficiencies Detected</h2>
            <DescriptionCarouselTest
              carouselItems={[
                {
                  title: "Red-Green Deficiencies (Rayleigh Match)",
                  description: <><p><strong>Protanopia</strong> - Protanopia refers to a difficulty in seeing red light. Individuals with this condition need a higher proportion of red in the mix to match yellow. This indicates that their red-sensitive cone cells in the retina may not be functioning properly. They struggle with distinguishing between reds, greens, and browns. As a result, tasks involving color recognition, such as reading traffic lights or selecting ripe fruit, can be more challenging.</p> <p><strong>Deuteranopia</strong> - Deuteranopia occurs when individuals have trouble with green light perception. They need more green light in the mix to match yellow. This deficiency, like protanopia, causes difficulty distinguishing reds and greens, as well as colors in between, such as orange.</p></>,
                  visual: <div className="rounded-lg overflow-hidden"><ReactCompareImage leftImage={anomaloscopeNormalVision} rightImage={anomaloscopeProtanopia} /></div>
                },
                {
                  title: "Blue-Yellow Deficiencies",
                  description: <><p><strong>Tritanopia (Moreland Match)</strong> - This rare deficiency affects the ability to perceive blue and yellow. Individuals with tritanopia often confuse blue with green and yellow with pink or red. The Moreland Match detects these color vision problems by testing how users distinguish between shades of blue and yellow.</p><p><strong>Engelking-Trendelenburg Match</strong> - This is another match used for diagnosing blue-yellow color blindness. This test involves matching cyan, blue, and green hues and helps identify if the individual struggles with differentiating those colors. Individuals with this deficiency may have trouble distinguishing between colors in nature, such as the blue of the sky and the green of trees, which can affect visual tasks outdoors.</p></>,
                  visual: <div className="rounded-lg overflow-hidden"><ReactCompareImage leftImage={anomaloscopeNormalVision} rightImage={anomaloscopeTritanopia} /></div>
                },
                {
                  title: "Severity Detection",
                  description: <><p><strong>Anomalous Trichromats</strong> - Individuals with mild color vision issues, called anomalous trichromats, need slight adjustments in red or green proportions to match colors. The test can detect these small shifts in perception, revealing minor difficulties in distinguishing certain shades, which can affect everyday activities like choosing clothing, reading color-coded charts, or even identifying food ripeness.</p> <p><strong>Dichromats</strong> - People with more severe deficiencies, known as dichromats, can match a wide range of red-green mixtures to yellow by adjusting brightness. This broader range of matches shows a more serious deficiency, often making it hard to distinguish between traffic lights, warning signs, or color-coded systems in daily life, leading to challenges in driving or workplace safety.</p></>,
                  visual: <div className="rounded-lg overflow-hidden"><Image src={anomaloscopeRedGreen} /></div>
                }
              ]}
            />
          </div>
          <div className="description-item-section">
            <h2>How does the Anomaloscope Test Work?</h2>
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
              <div className="w-ful lg:w-7/12">
                <p>The Anomaloscope Test identifies color vision problems by asking users to match colors. Users adjust the brightness of red and green lights until they match a yellow light. The goal is to find the right mix of red and green that makes the yellow light look the same on both sides. By adjusting both the brightness and proportion of the colors, the test shows how well a person can tell colors apart.</p>
                <p>The test uses pure colors like red, green, and yellow, allowing for very accurate adjustments. How well the person matches these colors reveals whether they have normal color vision or some level of color blindness. For red-green color blindness (Rayleigh Match), the user adjusts the red and green lights, while for blue-yellow deficiencies, a different match (Engelking-Trendelenburg Match) is used.</p>
                <p>People with normal vision can match colors easily with small adjustments. However, those with color vision deficiencies need to adjust the color proportions more, and those with more severe deficiencies can only adjust the brightness. This test helps identify both the type of color blindness and its severity.</p>
              </div>
              <div className="w-full lg:w-5/12">
                <DescriptionStepperTest
                  steps={[
                    { title: "Matching", description: "The Anomaloscope Test asks users to adjust the brightness of red and green lights to match a yellow light on both sides." },
                    { title: "Precision", description: "By using pure red, green, and yellow colors, the test allows for highly accurate adjustments, helping identify subtle color vision deficiencies." },
                    { title: "Diagnosis", description: "The test determines both the type and severity of color blindness, including red-green and blue-yellow deficiencies." }
                  ]}
                />
              </div>

            </div>
          </div>
          <div className="description-item-section">
            <h2>Limitations of the Anomaloscope Test</h2>
            <div>
              <DescriptionGridTest
                gridItems={[
                  { title: "Specific Focus", description: "The Anomaloscope Test primarily focuses on red-green deficiencies, making it less effective for diagnosing other forms of color blindness. For a complete diagnosis, additional tests may be required." },
                  { title: "Digital Precision", description: "Digital versions of the Anomaloscope Test are less precise than the traditional tool. RGB screens can’t perfectly replicate the pure light sources used in the original, reducing accuracy." },
                  { title: "Environmental Influence", description: "External factors, like lighting conditions and screen quality, can affect the accuracy of digital tests. To ensure reliable results, the test should be taken in a well-lit, controlled environment." },
                  { title: "Comprehensive Diagnosis", description: "Though effective for red-green and blue-yellow deficiencies, the Anomaloscope Test may not capture all types of color blindness. Supplementary tests are often needed for a full evaluation." }
                ]}
              />
            </div>
          </div>
          <div className="description-item-section">
            <div className="disclaimer-container">
              <div className="min-w-6">
                <box-icon name="info-circle" color="#64748b"></box-icon>
              </div>
              <p className="disclaimer">
                NOTE: The Anomaloscope Test is one of the most accurate tools for diagnosing red-green color blindness, but it should be conducted by an eye care professional for proper evaluation. If you suspect color vision deficiencies, consult an optometrist or ophthalmologist for further testing.
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  )
}