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

    setAnswers([...answers, newAnswer]);

    if (currentPlate < ishiharaPlates.length - 1) {
      setCurrentPlate(currentPlate + 1);
    } else {
      const evaluation = evaluateIshiharaResults(answers, ishiharaPlates);
      setResults(evaluation);
    }
  };

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
              <Button size="sm" isIconOnly color="primary" variant="light" onPress={() => setShowTest(false)} >
                <box-icon name="x" size="lg" color="gray" animation="tada-hover"></box-icon>
              </Button>
              <Card className="h-[610px] md:h-[428px]">
                <CardBody className="cardbody-test">
                  <div className="ishihara-test-plates">
                    <Image
                      alt={`Ishihara Test Plate ${currentPlate + 1}`}
                      src={ishiharaPlates[currentPlate].imageUrl}
                      width={350}
                    />
                  </div>
                  <div className="ishihara-test-controls">
                    <Card>
                      <CardBody>
                        <div className="flex justify-between gap-5 items-center">
                          <div className="flex gap-2 items-center">
                            <p>Select number:</p>
                            <InputOtp length={2} isReadOnly value={valueInput} />
                          </div>
                          <Button isIconOnly color="danger" onPress={() => setValueInput("")}>
                            <box-icon name="x" color="white"></box-icon>
                          </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                            <Button key={num} onPress={() => setValueInput(`${valueInput}` + `${num}`)}>{num}</Button>
                          ))}
                          <Button color="primary" onPress={() => setCurrentPlate(prev => prev + 1)}>Unsure</Button>
                          <Button color="primary" onPress={() => setCurrentPlate(prev => prev + 1)}>Next</Button>
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
  )
}
