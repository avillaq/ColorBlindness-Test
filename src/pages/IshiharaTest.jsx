import { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import "../styles/pages/IshiharaTest.css";
import ishiharaImage from "../assets/ishihara-test.webp"

export const IshiharaTest = () => {
  const [showTest, setShowTest] = useState(false);

  return (
    <div className={`ishihara-test-container ${showTest ? "gap-4" : "gap-12"}`}>
      <div className="content-text">
        <h2>Ishihara Test</h2>
        {!showTest && <p>Use the Ishihara Test to detect red-green color deficiencies. Quick and reliable assessment for your color vision health.</p>}
      </div>
      <div className={`content-ishihara-test ${showTest ? "text-right" : "text-center"}`}>
        {!showTest && <Button color="primary" onPress={() => setShowTest(true)}>Start Test</Button>}
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
