import { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { InputOtp } from "@heroui/input-otp";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { DescriptionCarouselTest } from "../components/DescriptionCarouselTest";
import { DescriptionStepperTest } from "../components/DescriptionStepperTest";
import { DescriptionGridTest } from "../components/DescriptionGridTest";
import { Progress } from "@heroui/progress";
import { ishiharaPlates, evaluateIshiharaResults } from "../utils/ishihara-test";
import { pdf } from '@react-pdf/renderer';
import { ResultsPDF } from '../components/ResultsPDF';
import ReactCompareImage from 'react-compare-image';
import "../styles/pages/IshiharaTest.css";
import ishiharaTestOriginalPlate from "../assets/ishihara/ishihara-test-original.webp";
import ishiharaNormalVisionProta from "../assets/ishihara/ishihara-normal-prota.webp";
import ishiharaNormalVisionDeutera from "../assets/ishihara/ishihara-normal-deutera.webp";
import ishiharaProtanopia from "../assets/ishihara/ishihara-protanopia.webp";
import ishiharaDeuteranopia from "../assets/ishihara/ishihara-deuteranopia.webp";

export const IshiharaTest = () => {
  const [showTest, setShowTest] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [currentPlate, setCurrentPlate] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState(null);
  const [valueInput, setValueInput] = useState("");

  const handleAnswer = (answer) => {
    const newAnswer = {
      id: ishiharaPlates[currentPlate].id,
      response: answer.trim().toLowerCase()
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setValueInput("");

    if (currentPlate < ishiharaPlates.length - 1) {
      setCurrentPlate(currentPlate + 1);
    } else {
      const evaluation = evaluateIshiharaResults(updatedAnswers, ishiharaPlates);
      setResults(evaluation);
    }
  };

  const resetTest = () => {
    setCurrentPlate(0);
    setAnswers([]);
    setResults(null);
  };

  const handleDownloadPDF = async () => {
    const blob = await pdf(<ResultsPDF results={results} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ishihara-test-results-${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (results) {
    return (
      <div className="ishihara-test-hero">
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
                      <p className="text-success">{results.correct}/{ishiharaPlates.length}</p>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <h4>Incorrect Answers</h4>
                      <p className="text-danger">{results.incorrect}/{ishiharaPlates.length}</p>
                    </CardBody>
                  </Card>
                </div>

                <Card className="mt-4">
                  <CardBody>
                    <h4>Technical Details</h4>
                    <div className="technical-details">
                      <div>
                        <p>Basic Plates Correct (1-11):</p>
                        <p>{results.details.basicCorrect}/11</p>
                      </div>
                      <div>
                        <p>Protan Indicators:</p>
                        <p>{results.details.protanMatches}/3</p>
                      </div>
                      <div>
                        <p>Deutan Indicators:</p>
                        <p>{results.details.deutanMatches}/3</p>
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
    <div className="ishihara-test-container">
      <div className={`ishihara-test-hero ${showTest ? "gap-3" : "gap-12"}`}>
        <div className="content-text">
          <h2>Ishihara Test</h2>
          {!showTest && <p>Use the Ishihara Test to detect red-green color deficiencies. Quick and reliable assessment for your color vision health.</p>}
        </div>
        <div className={`content-ishihara-test ${showTest ? "text-right" : "text-center"}`}>
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
                <Progress aria-label="Loading..." size="sm" className="mb-4" value={((currentPlate + 1) / ishiharaPlates.length) * 100} />
                <Card className="h-[610px] md:h-[428px]">
                  <CardBody className="cardbody-test">
                    <div className="ishihara-test-plates">
                      <Image
                        alt={`Ishihara Test Plate ${currentPlate + 1}`}
                        src={ishiharaPlates[currentPlate].imageUrl}
                        radius="full"
                      />
                    </div>
                    <div className="ishihara-test-controls">
                      <Card>
                        <CardBody>
                          {
                            (ishiharaPlates[currentPlate].id !== 11 && ishiharaPlates[currentPlate].id !== 14)
                              ?
                              <>
                                <div className="flex justify-between gap-5 items-center">
                                  <div className="flex gap-2 items-center">

                                    <p>Enter number:</p>
                                    <InputOtp length={2} isReadOnly value={valueInput} />
                                  </div>

                                  <Button isIconOnly color="danger" onPress={() => setValueInput("")}>
                                    <box-icon name="x" color="white"></box-icon>
                                  </Button>
                                </div>

                                <div className="grid grid-cols-3 gap-2 mt-4">
                                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                                    <Button key={num} onPress={() => { if (valueInput.length < 2) setValueInput(`${valueInput}${num}`); }}>{num}</Button>
                                  ))}
                                  <Button color="warning" onPress={() => handleAnswer("unsure")}>Unsure</Button>
                                  <Button color="primary" isDisabled={!valueInput} onPress={() => handleAnswer(valueInput)}>Next</Button>
                                </div>
                              </>
                              :
                              <>
                                <p className="text-center">What did you see?</p>
                                <div className="grid grid-cols-1 gap-2 mt-4 w-[250px]">
                                  {
                                    (ishiharaPlates[currentPlate].id === 11)
                                      ?
                                      <>
                                        <Button color="primary" onPress={() => handleAnswer("green")}>Green Line</Button>
                                        <Button color="primary" onPress={() => handleAnswer("gray")}>Gray Line</Button>
                                        <Button color="primary" onPress={() => handleAnswer("blue & green")}>Blue & Green Line</Button>
                                        <Button color="primary" onPress={() => handleAnswer("blue")}>Blue Line</Button>
                                        <Button color="warning" onPress={() => handleAnswer("unsure")}>Unsure</Button>
                                      </>
                                      :
                                      <>
                                        <Button color="primary" onPress={() => handleAnswer("purple & red")}>Purple & Red Line</Button>
                                        <Button color="primary" onPress={() => handleAnswer("red")}>Red Line</Button>
                                        <Button color="primary" onPress={() => handleAnswer("purple")}>Purple Line</Button>
                                        <Button color="primary" onPress={() => handleAnswer("red & gray")}>Red & Gray Line</Button>
                                        <Button color="warning" onPress={() => handleAnswer("unsure")}>Unsure</Button>
                                      </>
                                  }
                                </div>
                              </>
                          }
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
        <div className="description-ishihara-test">
          <div className="description-ishihara-section">
            <h2>What is ISHIHARA TEST?</h2>
            <div className="flex flex-col items-center lg:flex-row gap-8">
              <div className="flex-1">
                <p>The Ishihara Test is one of the most well-known and widely used methods for detecting color blindness, particularly red-green color vision deficiencies. It was developed in 1917 by Dr. Shinobu Ishihara, a Japanese ophthalmologist, and has since been used globally for over a century.</p>
                <p>The test consists of a series of circular plates, known as Ishihara plates, each containing a pattern of colored dots. Within these patterns, numbers or shapes are embedded using colors that appear distinct to individuals with normal vision but may be difficult or impossible to distinguish for those with color blindness. The test is simple, non-invasive, and can be administered in just a few minutes.</p>
                <p>By analyzing a person’s ability to recognize the numbers or shapes in the plates, the Ishihara Test can help determine whether they have a color vision deficiency and, in some cases, the severity of the condition. However, it does not provide a full diagnosis of all types of color blindness.</p>
              </div>
              <Image
                src={ishiharaTestOriginalPlate}
                alt="Ishihara test original plate"
                width={430}
                height={280}
                className="flex-1"
              />
            </div>
          </div>
          <div className="description-ishihara-section">
            <h2>Types of Deficiencies Detected</h2>
            <DescriptionCarouselTest
              carouselItems={[
                {
                  title: "Red-Green Color Blindness",
                  description: <><p>Red-green color blindness is the primary type detected by the Ishihara Test, consisting of two main variations: Deuteranopia/Deuteranomaly and Protanopia/Protanomaly. These deficiencies affect how individuals perceive red and green hues, causing confusion between them in everyday scenarios.</p> <p>People with red-green blindness struggle with tasks needing color differentiation, such as reading traffic signals or choosing matching clothing.</p></>,
                  visual: <div className="rounded-lg overflow-hidden"><ReactCompareImage leftImage={ishiharaNormalVision} rightImage={ishiharaProtanopia} /></div>
                },
                {
                  title: "Deuteranopia",
                  description: <><p>Deuteranopia occurs when the green-sensitive cones (M-cones) in the eye are absent or don't function correctly, altering how people perceive green light and shades around it.</p> <p>Those with deuteranopia often confuse colors like green, red, brown, and orange, particularly in dim lighting. This makes daily tasks more challenging, such as understanding color-coded signs, choosing matching clothes, or identifying objects by color.</p> <p>Deuteranomaly, a milder form, involves green cones functioning abnormally, causing less severe confusion but still affecting tasks where accurate color recognition is essential for daily life.</p></>,
                  visual: <div className="rounded-lg overflow-hidden"><ReactCompareImage leftImage={ishiharaNormalVisionDeutera} rightImage={ishiharaDeuteranopia} /></div>
                },
                {
                  title: "Protanopia",
                  description: <><p>Protanopia arises from the absence of red-sensitive cones (L-cones), leading to difficulty distinguishing reds from greens and other related shades. This condition affects color perception significantly.</p> <p>Individuals with Protanopia often perceive reds as much darker than those with normal color vision, which can cause confusion between red, black, and brown hues, especially in low light.</p><p>Protanomaly, a milder variant, leads to reduced red sensitivity, where reds may appear less vibrant, especially in dim lighting. This can impact tasks like reading road signs, choosing clothing, or interpreting charts.</p></>,
                  visual: <div className="rounded-lg overflow-hidden"><ReactCompareImage leftImage={ishiharaNormalVisionProta} rightImage={ishiharaProtanopia} /></div>
                }
              ]}
            />
          </div>
          <div className="description-ishihara-section">
            <h2>How the Ishihara Test Works?</h2>
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
              <div className="w-ful lg:w-7/12">
                <p>The Ishihara Test is designed to detect red-green color blindness by showing a series of plates filled with colored dots. Each plate forms numbers or shapes using dots in contrasting colors, which are easily identifiable by those with normal vision but difficult for individuals with red-green color deficiencies.</p>
                <p>For the most accurate results, the test should be taken in a well-lit setting with neutral lighting to prevent any color distortion. Adjusting digital screens to ensure proper color rendering is also crucial. The test is quick, non-invasive, and typically takes only a few minutes to complete, making it both convenient and accessible.</p>
                <p>Users view each plate and attempt to identify the numbers or shapes hidden within the dots. Those with normal color vision will easily recognize the figures, while individuals with color blindness may either misidentify the figures or fail to see them altogether.</p>
                <p>This simple process allows the test to distinguish between normal vision and red-green color blindness with a high degree of accuracy.</p>
              </div>
              <div className="w-full lg:w-5/12">
                <DescriptionStepperTest
                  steps={[
                    { title: "Detection", description: "The Ishihara Test uses colored dot patterns to detect red-green color blindness based on the user's ability to recognize numbers or shapes." },
                    { title: "Convenience", description: "This fast, non-invasive test can be completed in minutes, ensuring convenient testing in well-lit environments." },
                    { title: "Accuracy", description: "The test reliably distinguishes between normal vision and red-green color blindness by analyzing the user's responses to the color plates." }
                  ]}
                />
              </div>

            </div>
          </div>
          <div className="description-ishihara-section">
            <h2>Limitations of the Ishihara Test</h2>
            <div>
              <DescriptionGridTest
                gridItems={[
                  { title: "Detection Range", description: "The Ishihara Test detects only red-green color blindness and cannot identify types like blue-yellow (Tritanopia) or complete color blindness (Achromatopsia). Additional tests are needed for a full diagnosis." },
                  { title: "Accuracy in Mild Cases", description: "Mild forms of color blindness, such as Protanomaly or Deuteranomaly, may not be accurately detected by the Ishihara Test. This can lead to misdiagnosis or an incomplete understanding of a person's color vision capabilities." },
                  { title: "User Limitations", description: "The test requires recognizing numbers or patterns, which can be difficult for young children or individuals with learning challenges. Misunderstanding the instructions can result in inaccurate test outcomes." },
                  { title: "Environmental Factors", description: "Test results can be affected by lighting conditions, print quality, or screen settings in digital versions. Variability in testing environments can lead to incorrect diagnoses, highlighting the need for standardized conditions." }
                ]}
              />
            </div>
          </div>
          <div className="description-ishihara-section">
            <div className="disclaimer-container">
              <div className="min-w-6">
                <box-icon name="info-circle" color="#64748b"></box-icon>
              </div>
              <p className="disclaimer">
                NOTE: The Ishihara Test is a screening tool, not a definitive diagnosis. If you suspect you have a color vision deficiency, it is recommended to consult an eye care professional for further evaluation and additional tests, such as the Anomaloscope or Farnsworth D-15 Test, which provide a more comprehensive analysis of color vision.
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  )
}