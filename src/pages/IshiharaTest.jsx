import { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import "../styles/pages/IshiharaTest.css";
import ishiharaImage from "../assets/ishihara-test.webp"

export const IshiharaTest = () => {
  const [showTest, setShowTest] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className={`ishihara-test-container ${showTest ? "gap-3" : "gap-12"}`}>
      <div className="content-text">
        <h2>Ishihara Test</h2>
        {!showTest && <p>Use the Ishihara Test to detect red-green color deficiencies. Quick and reliable assessment for your color vision health.</p>}
      </div>
      <div className={`content-ishihara-test ${showTest ? "text-right" : "text-center"}`}>
        {!showTest &&
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
        }
        {showTest &&
          <>
            <Button size="sm" isIconOnly color="primary" variant="light" onPress={() => setShowTest(false)} >
              <box-icon name="x" size="lg" color="gray" animation="tada-hover"></box-icon>
            </Button>
            <Card className="h-[610px] md:h-[428px]">
              <CardBody className="cardbody-test">
                <div className="ishihara-test-plates">
                  <Image
                    alt="Ishihara Test Plates"
                    src={ishiharaImage}
                    width={400}
                  />
                </div>
                <div className="ishihara-test-controls">
                  controls go here
                </div>
              </CardBody>
            </Card>
          </>
        }

      </div>
    </div>
  )
}
