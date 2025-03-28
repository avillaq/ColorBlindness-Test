import { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { DescriptionCarouselTest } from "../components/DescriptionCarouselTest";
import { DescriptionStepperTest } from "../components/DescriptionStepperTest";
import { DescriptionGridTest } from "../components/DescriptionGridTest";
import { Progress } from "@heroui/progress";
import { CAMBRIDGE_CONFIG, evaluateCambridgeResults } from "../utils/cambridge-test";
import { pdf } from '@react-pdf/renderer';
import { ResultsPDF } from '../components/ResultsPDF';
import { SEO } from "../components/SEO";
import ReactCompareImage from 'react-compare-image';
import cambridgeTestOriginal from "../assets/cambridge/cambridge-original.webp";
import cambridgeRedGreen from "../assets/cambridge/cambridge-red-green-blindness.webp";
import cambridgeNormalVisionDeutera from "../assets/cambridge/cambridge-normal-deutera.webp";
import cambridgeNormalVisionTrita from "../assets/cambridge/cambridge-normal-trita.webp";
import cambridgeDeuteranomaly from "../assets/cambridge/cambridge-deuteranomaly.webp";
import cambridgeTritanopia from "../assets/cambridge/cambridge-tritanopia.webp";
import "../styles/pages/TestItem.css";
import "../styles/pages/CambridgeTest.css";

export const CambridgeTest = () => {
  const [showTest, setShowTest] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [results, setResults] = useState(null);
  const [currentPlate, setCurrentPlate] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer) => {
    const newAnswer = {
      id: CAMBRIDGE_CONFIG[currentPlate].id,
      response: answer.trim().toLowerCase()
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentPlate < CAMBRIDGE_CONFIG.length - 1) {
      setCurrentPlate(currentPlate + 1);
    } else {
      const evaluation = evaluateCambridgeResults(updatedAnswers, CAMBRIDGE_CONFIG);
      setResults(evaluation);
    }
  };

  const resetTest = () => {
    setShowTest(false);
    setCurrentPlate(0);
    setAnswers([]);
    setResults(null);
  };

  const handleDownloadPDF = async () => {
    const blob = await pdf(<ResultsPDF results={results} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Cambridge-test-results-${new Date().toISOString().split('T')[0]}.pdf`;
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
                      <p className="text-success">{results.correct}/{CAMBRIDGE_CONFIG.length}</p>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <h4>Incorrect Answers</h4>
                      <p className="text-danger">{results.incorrect}/{CAMBRIDGE_CONFIG.length}</p>
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
          <Button color="primary" onPress={() => resetTest()}>
            Take Test Again
          </Button>
          <Button color="secondary" variant="ghost" onPress={handleDownloadPDF}>
            Download Report
          </Button>
        </div>
        <div className="flex flex-col items-center w-full mt-8">
          <h4 className="font-semibold mb-2">More Results</h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {
              CAMBRIDGE_CONFIG.map((plate, index) => (
                <Card key={`Ishihara result ${index}`} className="w-full max-w-[340px]">
                  <CardBody className="flex flex-col items-center gap-2">
                    <Image
                      alt={`Ishihara Test Plate ${plate.id}`}
                      src={plate.imageUrl}
                      radius="full"
                    />
                    <div className="bg-[#f8fafc] p-2 rounded-md w-full">
                      <p className="text-center">Correct Answer: <strong>{plate.normalAnswer.toUpperCase()}</strong></p>
                    </div>
                    <div className="bg-[#f8fafc] p-2 rounded-md w-full">
                      <p className="text-center">Your Answer: <strong>{answers[index].response.toUpperCase()}</strong></p>
                    </div>
                  </CardBody>
                </Card>
              ))
            }
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Cambridge Color Test"
        description="Take the advanced Cambridge Color Test online. This adaptive test measures color discrimination thresholds using sophisticated patterns to detect both acquired and inherited color vision deficiencies."
        keywords={[
          "cambridge color test",
          "color discrimination",
          "threshold testing",
          "advanced color vision",
          "color perception test",
          "chromatic sensitivity",
          "ccv test online"
        ]}
      />
      <div className="item-test-container">
        <div className={`item-test-hero ${showTest ? "gap-3" : "gap-12"}`}>
          <div className="content-text">
            <h2>Cambridge Color Test</h2>
            {!showTest && <p>Take the Cambridge Color Test online to assess your color vision precision. Understand how accurately you perceive subtle color differences.</p>}
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
                  <Button size="sm" isIconOnly color="primary" variant="light" onPress={() => { resetTest(); }} >
                    <box-icon name="x" size="lg" color="gray" animation="tada-hover"></box-icon>
                  </Button>
                  <Progress aria-label="Loading..." size="sm" className="mb-4" value={currentPlate + 1} maxValue={CAMBRIDGE_CONFIG.length} />
                  <Card className="h-[610px] md:h-[428px]">
                    <CardBody className="cardbody-test">
                      <div className="cambridge-test-plates">
                        <Image
                          alt={`Cambridge Plate ${currentPlate + 1}`}
                          src={CAMBRIDGE_CONFIG[currentPlate].imageUrl}
                          radius="full"
                        />
                      </div>
                      <div className="cambridge-test-controls">
                        <Card classNames={{ body: "px-0 sm:p-4" }}>
                          <CardBody>
                            <p className="text-center">Where is the missing piece of the ring?</p>
                            <div className="grid grid-cols-3 grid-rows-3 mt-4 gap-0 sm:gap-3">
                              <Button color="primary" size="lg" className="col-start-2" onPress={() => handleAnswer("top")}>Top</Button>
                              <Button color="primary" size="lg" className="col-start-3 row-start-2" onPress={() => handleAnswer("right")}>Right</Button>
                              <Button color="primary" size="lg" className="col-start-2 row-start-3" onPress={() => handleAnswer("bottom")}>Bottom</Button>
                              <Button color="primary" size="lg" className="col-start-1 row-start-2" onPress={() => handleAnswer("left")}>Left</Button>
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
              <h2>What is the Cambridge Color Test?</h2>
              <div className="flex flex-col items-center lg:flex-row gap-8">
                <div className="flex-1">
                  <p>The Cambridge Color Test was developed at the University of Cambridge, led by researchers J.D. Mollon, J.P. Reffin, and B.C. Regan. Created to advance color vision testing, it has since become an essential tool in both clinical and research fields for diagnosing color blindness and investigating color discrimination abilities.</p>
                  <p>The test's main purpose is to screen for color vision deficiencies, both inherited (congenital) and acquired. It evaluates how well individuals can distinguish between different colors and monitors changes in their color discrimination abilities. This makes it useful not only for diagnosing color blindness but also for tracking changes over time, such as those caused by medications or health conditions.</p>
                  <p>In terms of scientific validity, the Cambridge Color Test has been widely adopted in both clinical and research settings. It is recognized for its accuracy in providing quantitative data on color vision deficiencies and has contributed to a large body of research, offering normative data for various age groups. The test is also used in studies exploring how different medical conditions or environmental factors affect color vision. Because of its reliability, it remains a trusted tool for professionals studying and diagnosing color vision issues.</p>
                </div>
                <Image
                  src={cambridgeTestOriginal}
                  alt="Cambridge test plate"
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
                    title: "Red-Green Deficiencies (Protan, Deutan)",
                    description: <><p><strong>Protanopia</strong> - Known as red-blindness, individuals with protanopia have difficulty distinguishing red hues from other colors. The test evaluates how subjects perceive colors along the protan confusion line, measuring how their ability to distinguish between red and green is affected. Protanopes may confuse red with black or dark gray and struggle with shades involving red tones.</p> <p><strong>Deuteranopia</strong> - Individuals with deuteranopia have difficulty perceiving green tones. The test measures how well they can distinguish green from red. This deficiency makes everyday tasks such as recognizing traffic signals or choosing matching clothing colors more challenging.</p></>,
                    visual: <div className="rounded-lg overflow-hidden"><Image src={cambridgeRedGreen} /></div>
                  },
                  {
                    title: "Blue-Yellow Deficiencies (Tritan)",
                    description: <><p><strong>Tritanopia</strong> - Known as blue-yellow blindness, tritanopia is a rare form of color blindness where individuals experience difficulty distinguishing between blue and yellow hues. This type of color vision deficiency is assessed by measuring sensitivity along the tritan confusion line, which evaluates the person’s ability to differentiate between these two shades.</p> <p>People with tritanopia often confuse blue with green or yellow with violet, which can complicate everyday tasks, like identifying the blue sky versus green foliage or distinguishing ripe yellow bananas from unripe green ones. The Cambridge Color Test helps determine the extent to which individuals with tritanopia face challenges in recognizing blue-yellow color differences.</p></>,
                    visual: <div className="rounded-lg overflow-hidden"><ReactCompareImage leftImage={cambridgeNormalVisionTrita} rightImage={cambridgeTritanopia} /></div>
                  },
                  {
                    title: "Severity Detection",
                    description: <><p>The test checks how well a person can see small differences in colors, known as chromatic sensitivity. Based on this, it creates discrimination ellipses, which are visual shapes that show a person’s color vision abilities and how much their color vision differs from normal.</p> <p>Larger ellipses mean more severe color vision issues, showing that the person has trouble telling apart a wider range of colors. This can make daily tasks involving color, like sorting or recognizing items, more challenging. Smaller ellipses suggest a milder issue, where the person may only have difficulty with certain colors in specific settings, like matching similar shades, but can generally see most colors well.</p></>,
                    visual: <div className="rounded-lg overflow-hidden"><ReactCompareImage leftImage={cambridgeNormalVisionDeutera} rightImage={cambridgeDeuteranomaly} /></div>
                  }
                ]}
              />
            </div>
            <div className="description-item-section">
              <h2>How does the Cambridge Color Test Work?</h2>
              <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
                <div className="w-ful lg:w-7/12">
                  <p>The Cambridge Color Test uses a Landolt C stimulus, which is a circle with a gap (C-shape) that appears on the screen. The subject identifies the direction of the gap as the test adjusts the colors along the protan (red-green), deutan (green-red), and tritan (blue-yellow) confusion lines.</p>
                  <p>This setup allows the test to precisely assess color discrimination. The test is designed to be easy for both patients and practitioners. Patients simply respond by pressing a button to indicate the direction of the gap, making it accessible for all ages.</p>
                  <p>For accuracy, the test uses high-resolution stimuli, with colors generated at a fine scale to ensure precise measurements of color vision.</p>
                  <p>By introducing controlled variations in color and brightness, the test ensures that results are not influenced by factors like brightness differences, focusing solely on color vision. This makes it a reliable tool for diagnosing even subtle color vision deficiencies.</p>
                </div>
                <div className="w-full lg:w-5/12">
                  <DescriptionStepperTest
                    steps={[
                      { title: "Detection", description: "The Cambridge Color Test identifies color vision issues using a C-shaped figure (Landolt C) to test the user’s ability to spot the gap as colors change." },
                      { title: "Simplicity", description: "Users only need to press a button to indicate the gap’s direction, making it simple and suitable for everyone." },
                      { title: "Precision", description: "The test adjusts colors and controls brightness to measure color vision with high accuracy, detecting even minor deficiencies." }
                    ]}
                  />
                </div>

              </div>
            </div>
            <div className="description-item-section">
              <h2>Limitations of the Cambridge Color Test</h2>
              <div>
                <DescriptionGridTest
                  gridItems={[
                    { title: "Screen Calibration", description: "The accuracy of the Cambridge Color Test heavily relies on proper screen calibration. If the monitor is not calibrated correctly, it can lead to distorted color presentations, potentially affecting the test results. This highlights the importance of using well-calibrated equipment for accurate assessments." },
                    { title: "Environmental Factors", description: "Test outcomes can be influenced by external factors such as ambient lighting and screen quality. Poor lighting conditions or variations in screen settings can result in inaccurate discrimination of colors, underscoring the necessity for a controlled testing environment to ensure reliable results." },
                    { title: "User Limitations", description: "While the test is designed to be straightforward, it may still pose challenges for individuals with certain disabilities or cognitive difficulties. Users may struggle to focus on the colored stimuli or understand the test instructions, which can affect their performance and lead to misleading results." },
                    { title: "Comprehensive Diagnosis", description: "Although the Cambridge Color Test effectively identifies various color deficiencies, it may not capture all aspects of color vision. For a complete evaluation, it may need to be supplemented with a color blindness test that assesses other types of color blindness or visual functions." }
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
                  NOTE: The Cambridge Color Test is a highly advanced tool for evaluating color vision deficiencies, but it should not be used as a stand-alone diagnostic measure. If you suspect you have color blindness or acquired color vision loss, it is recommended to visit an eye care specialist for further testing and evaluation.
                </p>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}