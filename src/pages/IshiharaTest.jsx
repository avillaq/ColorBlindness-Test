import { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { InputOtp } from "@heroui/input-otp";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import { ishiharaPlates, evaluateIshiharaResults } from "../utils/ishihara-test";
import { pdf } from '@react-pdf/renderer';
import { ResultsPDF } from '../components/ResultsPDF';
import "../styles/pages/IshiharaTest.css";
import ishiharaTestOriginalPlate from "../assets/ishihara-test-original.webp";

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
                <box-icon name="info-circle" color="#64748b"></box-icon>
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
          <div>
            <h2>Types of Deficiencies Detected</h2>
          </div>
          <div>
            <h2>How the Ishihara Test Works?</h2>
          </div>
          <div>
            <h2>Limitations of the Ishihara Test</h2>
          </div>
        </div>
      }
    </div>
  )
}