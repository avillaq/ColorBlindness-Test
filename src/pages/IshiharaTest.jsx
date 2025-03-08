import { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { InputOtp } from "@heroui/input-otp";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { ishiharaPlates, evaluateIshiharaResults } from "../utils/ishihara-test";
import "../styles/pages/IshiharaTest.css";

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

  const handleNext = () => {
    if (ishiharaPlates[currentPlate].id === 11 || ishiharaPlates[currentPlate].id === 14) {
      alert("Please select an option before proceeding");
      return;
    }
    console.log(valueInput);
    
    handleAnswer(valueInput);
  };

  const handleUnsure = () => {
    handleAnswer("unsure"); 
  };

  const resetTest = () => {
    setCurrentPlate(0);
    setAnswers([]);
    setResults(null);
  };

  if (results) {
    return (
      <div className="ishihara-test-container">
        <Results results={results} />
        <Button color="primary" onPress={() => window.location.reload()}>
          Restart Test
        </Button>
      </div>
    );
  }

  return (
    <div className={`ishihara-test-container ${showTest ? "gap-3" : "gap-12"}`}>
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
              <Button size="sm" isIconOnly color="primary" variant="light" onPress={() => {setShowTest(false); resetTest();}} >
                <box-icon name="x" size="lg" color="gray" animation="tada-hover"></box-icon>
              </Button>
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
                                  <InputOtp length={2} isReadOnly value={valueInput}/>
                                </div>

                                <Button isIconOnly color="danger" onPress={() => setValueInput("")}>
                                  <box-icon name="x" color="white"></box-icon>
                                </Button>
                              </div>

                              <div className="grid grid-cols-3 gap-2 mt-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                                  <Button key={num} onPress={() => {if(valueInput.length < 2) setValueInput(`${valueInput}${num}`);}}>{num}</Button>
                                ))}
                                <Button color="warning" onPress={handleUnsure}>Unsure</Button>
                                <Button color="primary" onPress={handleNext} isDisabled={!valueInput}>Next</Button>
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
                                      <Button color="primary" onPress={() => handleAnswer("traceable")}>Green Line</Button>
                                      <Button color="primary" onPress={() => handleAnswer("gray")}>Gray Line</Button>
                                      <Button color="primary" onPress={() => handleAnswer("blue & green")}>Blue & Green Line</Button>
                                      <Button color="primary" onPress={() => handleAnswer("blue")}>Blue Line</Button>
                                      <Button color="warning" onPress={handleUnsure}>Unsure</Button>
                                    </>
                                    :
                                    <>
                                      <Button color="primary" onPress={() => handleAnswer("red")}>Red Line</Button>
                                      <Button color="primary" onPress={() => handleAnswer("purple")}>Purple Line</Button>
                                      <Button color="primary" onPress={() => handleAnswer("red & gray")}>Red & Gray Line</Button>
                                      <Button color="primary" onPress={() => handleAnswer("purple & red")}>Purple & Red Line</Button>
                                      <Button color="warning" onPress={handleUnsure}>Unsure</Button>
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
  )
}


const Results = ({ results }) => (
  <div className="results-container">
    <h2>Test Results</h2>
    <p><strong>Accuracy:</strong> {results.accuracy}</p>
    <p><strong>Correct Answers:</strong> {results.correct}/14</p>
    <p><strong>Incorrect Answers:</strong> {results.incorrect}/14</p>
    <p><strong>Diagnosis:</strong> {results.diagnosis}</p>
    <details>
      <summary>Technical Details</summary>
      <p>Basic plates correct (1-11): {results.details.basicCorrect}</p>
      <p>Protan matches: {results.details.protanMatches}</p>
      <p>Deutan matches: {results.details.deutanMatches}</p>
    </details>
  </div>
);