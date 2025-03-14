import { useState, useEffect, useRef } from "react";
import { Card, CardBody } from "@heroui/card";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { RadioGroup, Radio } from "@heroui/radio";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { DescriptionCarouselTest } from "../components/DescriptionCarouselTest";
import { DescriptionStepperTest } from "../components/DescriptionStepperTest";
import { DescriptionGridTest } from "../components/DescriptionGridTest";
import { Progress } from "@heroui/progress";
import { FALANT_CONFIG, evaluateFarnsworthLanterResults } from "../utils/farnsworthLanter-test";
import { pdf } from '@react-pdf/renderer';
import { ResultsPDF } from '../components/ResultsPDF';
import ReactCompareImage from 'react-compare-image';
import cambridgeTestOriginal from "../assets/cambridge/cambridge-original.webp";
import cambridgeRedGreen from "../assets/cambridge/cambridge-red-green-blindness.webp";
import cambridgeNormalVisionDeutera from "../assets/cambridge/cambridge-normal-deutera.webp";
import cambridgeNormalVisionTrita from "../assets/cambridge/cambridge-normal-trita.webp";
import cambridgeDeuteranomaly from "../assets/cambridge/cambridge-deuteranomaly.webp";
import cambridgeTritanopia from "../assets/cambridge/cambridge-tritanopia.webp";
import "../styles/pages/TestItem.css";
import "../styles/pages/FarnsworthLanternTest.css";

export const FarnsworthLanternTest = () => {
  const [showTest, setShowTest] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [colorUp, setColorUp] = useState("");
  const [colorDown, setColorDown] = useState("");
  const [results, setResults] = useState(null);
  const [currentTrial, setCurrentTrial] = useState(0);
  const [showLights, setShowLights] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [isPermanentLight, setIsPermanentLight] = useState(true);
  const timerRef = useRef(null);

  const farnsworthLanternPlates = [...FALANT_CONFIG.combinations]

  const evaluateTrial = () => {
    const expected = farnsworthLanternPlates[currentTrial].colors;
    const selectedColors = [colorUp, colorDown];
    const isCorrect = selectedColors.join() === expected.join();

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setAnswers([...answers, {
      trial: currentTrial + 1,
      correct: isCorrect,
      expected,
      response: [...selectedColors]
    }]);

    setColorUp("");
    setColorDown("");

    if (currentTrial < farnsworthLanternPlates.length - 1) {
      setCurrentTrial(prev => prev + 1);
      setShowLights(true);
      setIsPermanentLight(false);
    } else {
      const diagnosis = evaluateFarnsworthLanterResults(answers, farnsworthLanternPlates);
      setResults(diagnosis);
    }
  };

  useEffect(() => {
    if (showLights && !isPermanentLight) {
      timerRef.current = setTimeout(() => {
        setShowLights(false);
      }, FALANT_CONFIG.exposureTime);

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [showLights, isPermanentLight]);

  const resetTest = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setCurrentTrial(0);
    setShowLights(true);
    setIsPermanentLight(true);
    setAnswers([]);
    setColorUp("");
    setColorDown("");
    setResults(null);
  };

  const handleDownloadPDF = async () => {
    const blob = await pdf(<ResultsPDF results={results} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FarnsworthLanter-test-results-${new Date().toISOString().split('T')[0]}.pdf`;
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
                      <h4>Correct Answers</h4>
                      <p className="text-success">{results.correct}/{cambridgePlates.length}</p>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <h4>Incorrect Answers</h4>
                      <p className="text-danger">{results.incorrect}/{cambridgePlates.length}</p>
                    </CardBody>
                  </Card>
                </div>
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
          <h2>Farnsworth Lantern Test</h2>
          {!showTest && <p>Simulate real-world color recognition with the Farnsworth Lantern Test. Ideal for professions requiring accurate color identification.</p>}
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
                <Progress aria-label="Loading..." size="sm" className="mb-4" value={currentTrial + 1} maxValue={farnsworthLanternPlates.length} />
                <Card className="h-[610px] md:h-[428px]">
                  <CardBody className="cardbody-test">
                    <div className="FarnsworthLanter-test-plates">
                      <div className="flex flex-col items-center justify-center gap-20 bg-black rounded-lg h-full w-full">
                        {showLights && farnsworthLanternPlates[currentTrial].colors.map((color, i) => (
                          <div
                            key={i}
                            className={`falant-light ${isPermanentLight ? 'permanent' : ''} ${color}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="FarnsworthLanter-test-controls">
                      <Card classNames={{ body: "px-0 sm:p-4" }}>
                        <CardBody>
                          <div className="flex flex-col items-center gap-4 w-[285px] sm:w-[400px]">
                            <Card className="w-[260px] sm:w-full">
                              <CardBody>
                                <div className="flex flex-col items-center gap-3">
                                  <p className="text-center"><strong>UP</strong></p>
                                  <Divider />
                                  <div className="w-full">
                                    <RadioGroup classNames={{ wrapper: "justify-around" }} color="default" orientation="horizontal" value={colorUp} onValueChange={setColorUp}>
                                      <Radio size="sm" value="red">Red</Radio>
                                      <Radio size="sm" value="green">Green</Radio>
                                      <Radio size="sm" value="white">White</Radio>
                                    </RadioGroup>
                                  </div>
                                </div>
                              </CardBody>
                            </Card>
                            <Card className="w-[260px] sm:w-full">
                              <CardBody>
                                <div className="flex flex-col items-center gap-3">
                                  <p className="text-center"><strong>Down</strong></p>
                                  <Divider />
                                  <div className="w-full">
                                    <RadioGroup classNames={{ wrapper: "justify-around" }} color="default" orientation="horizontal" value={colorDown} onValueChange={setColorDown}>
                                      <Radio size="sm" value="red">Red</Radio>
                                      <Radio size="sm" value="green">Green</Radio>
                                      <Radio size="sm" value="white">White</Radio>
                                    </RadioGroup>
                                  </div>
                                </div>
                              </CardBody>
                            </Card>
                            <Button color="primary" isDisabled={!colorUp || !colorDown} onPress={() => evaluateTrial()}>Submit</Button>
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
            <h2>What is Farnsworth Lantern Test?</h2>
            <div className="flex flex-col items-center lg:flex-row gap-8">
              <div className="flex-1">
                <p>The Farnsworth Lantern Test or FALANT is a simple and practical test used to detect color vision problems, especially red-green color blindness. Developed in the 1940s by Dr. Dean Farnsworth (Commander, United States Navy) for the U.S. Navy, the test was created to ensure that sailors could accurately identify colored signal lights, which is crucial for safety and communication at sea. Today, the test is widely used in various industries where accurate color perception is essential, such as aviation, maritime navigation, and rail transportation.</p>
                <p>During the test, a person looks at pairs of colored lights displayed in a special lantern device. Each pair consists of two lights placed one above the other, and each light can be red, green, or white. The person being tested must identify the colors they see in each pair. This helps determine if they have difficulty distinguishing between these important signal colors, which could affect their ability to perform certain jobs safely.</p>
                <p>The Farnsworth Lantern Test is valued for its simplicity and effectiveness. It mimics real-world conditions by using colors commonly found in signal lights, making it a practical tool for occupational screening. While it effectively identifies moderate to severe red-green color vision deficiencies, it may not detect mild cases or other types of color blindness. Nevertheless, it remains an important test for ensuring that individuals in critical roles can accurately perceive essential visual signals.</p>
              </div>
              <Image
                src={cambridgeTestOriginal}
                alt="cambridge test plate"
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
                  title: "Protan Deficiency (Red-Blindness)",
                  description: <><p><strong>Protanopia</strong> - People with protanopia have difficulty seeing red light because their eyes lack functioning red cone cells. During the Farnsworth Lantern Test, they might easily confuse red lights with green or white lights, or, in some cases, not perceive the red light at all. This deficiency can significantly impact tasks that rely on accurate color identification.</p> <p><strong>Protanomaly</strong> - This is a milder form of red-blindness where the red cone cells are present but do not function as they should. Individuals with protanomaly experience reduced sensitivity to red light and often struggle to differentiate between red and green lights during the test. This difficulty can affect their ability to interpret essential visual cues correctly in real-world situations.</p></>,
                  visual: <div className="rounded-lg overflow-hidden"><Image src={cambridgeRedGreen} /></div>
                },
                {
                  title: "Deutan Deficiency (Green-Blindness)",
                  description: <><p><strong>Deuteranopia</strong> - Individuals with deuteranopia lack functioning green cone cells, making it difficult for them to perceive green light accurately. During the Farnsworth Lantern Test, they may frequently confuse green lights with red or white lights, leading to potential misinterpretation of important visual cues that rely on color differentiation, which is critical in safety-sensitive roles.</p><p><strong>Deuteranomaly</strong> - This is a milder form of green-blindness where green cone cells are present but do not function optimally. People with deuteranomaly have reduced sensitivity to green light, often struggling to distinguish between red and green lights during the test. This difficulty can be especially challenging in environments requiring precise color perception, impacting their performance in color-dependent tasks.</p></>,
                  visual: <div className="rounded-lg overflow-hidden"><ReactCompareImage leftImage={cambridgeNormalVisionTrita} rightImage={cambridgeTritanopia} /></div>
                },
                {
                  title: "Severity Detection",
                  description: <><p>Protanopia arises from the absence of red-sensitive cones (L-cones), leading to difficulty distinguishing reds from greens and other related shades. This condition impacts color perception significantly and can affect various tasks that rely on accurate color recognition.</p> <p>Color-deficient people might mistakenly identify a red light as "green" or vice versa, causing potential confusion. They may also incorrectly perceive a white light as red or green. When two lights of the same color but different brightness are shown, they may assume the brighter light is an entirely different color.</p><p>Individuals who are completely color-blind to red or green (dichromats) cannot distinguish any of these colors accurately and may resort to guessing randomly during the test.</p></>,
                  visual: <div className="rounded-lg overflow-hidden"><ReactCompareImage leftImage={cambridgeNormalVisionDeutera} rightImage={cambridgeDeuteranomaly} /></div>
                }
              ]}
            />
          </div>
          <div className="description-item-section">
            <h2>How does the Farnsworth Lantern Test Work?</h2>
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
              <div className="w-ful lg:w-7/12">
                <p>The Farnsworth Lantern Test checks color vision by recreating situations where people need to recognize red, green, and white lights. This is important in jobs like shipping and aviation. Originally designed for sailors, the test is now used in many fields where correct color recognition is crucial. During the test, a special device shows two lights, one on top of the other, with each light being red, green, or white.</p>
                <p>The person taking the test looks at each pair of lights and names the colors of the top and bottom lights. Each pair of lights is shown quickly, usually for about two seconds, so it feels like real-life signal lights, which are often brief. This quick timing also makes it harder to guess colors based on brightness and helps get a more accurate picture of someone’s color vision.</p>
                <p>In this Online Farnsworth Lantern Test, pairs of colored lights appear on your screen, and you select or type the colors you see. It is best to take this test in a well-lit room and on a device with good color display.</p>
              </div>
              <div className="w-full lg:w-5/12">
                <DescriptionStepperTest
                  steps={[
                    { title: "Display", description: "The Farnsworth Lantern Test presents pairs of colored lights, one above the other. Each light can be red, green, or white. Your task is to identify the colors of the top and bottom lights in each pair." },
                    { title: "Timing", description: "Lights appear briefly to mimic real-world signal conditions and test quick color differentiation." },
                    { title: "Accuracy", description: "For accurate results, take the test in a well-lit room with no screen glare and a color-accurate display." }
                  ]}
                />
              </div>

            </div>
          </div>
          <div className="description-item-section">
            <h2>Limitations of the Farnsworth Lantern Test</h2>
            <div>
              <DescriptionGridTest
                gridItems={[
                  { title: "Sensitivity to Mild Deficiencies", description: "The test may not detect mild color vision deficiencies, allowing some individuals with minor issues to pass. This can be a limitation in scenarios where even slight deficiencies could pose risks." },
                  { title: "Specificity", description: "Farnsworth Lantern Test primarily focuses on red-green color vision and does not effectively screen for blue-yellow deficiencies or other visual impairments." },
                  { title: "Environmental Factors", description: "Results can be influenced by ambient lighting conditions and the quality of the equipment used. Proper standardization is crucial for accurate assessments." },
                  { title: "Outdated Technology", description: "With advancements in color vision testing, the physical lantern devices may face maintenance issues, and the test may not be as widely used as newer, more comprehensive methods." }
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
                NOTE: The Farnsworth Lantern Test is primarily a functional assessment for occupational screening and is not a full diagnostic tool for color blindness. If you suspect a color vision deficiency, consult an eye care professional for further evaluation.
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  )
}