import { Card, CardBody } from "@heroui/card";
import "../styles/pages/IshiharaTest.css";

export const IshiharaTest = () => {
  return (
    <div className="ishihara-test-container">
      <div className="content-text">
        <h2>Ishihara Test</h2>
        <p>Use the Ishihara Test to detect red-green color deficiencies. Quick and reliable assessment for your color vision health.</p>
      </div>
      <div className="content-ishihara-test">
        <Card>
          <CardBody className="cardbody-test">
            <div className="ishihara-test-plates">
              image goes here
            </div>
            <div className="ishihara-test-controls">
              controls go here
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
