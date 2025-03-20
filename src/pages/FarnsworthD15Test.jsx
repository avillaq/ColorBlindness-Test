import { useState, useEffect } from "react";
import { Card, CardBody } from "@heroui/card";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { DescriptionCarouselTest } from "../components/DescriptionCarouselTest";
import { DescriptionStepperTest } from "../components/DescriptionStepperTest";
import { DescriptionGridTest } from "../components/DescriptionGridTest";
import { FARNSWORTH_D15_CONFIG, evaluateFarnsworthD15Results } from "../utils/farnsworthD15-test";
import { ResultPlot } from "../components/ResultPlot";
import { pdf } from '@react-pdf/renderer';
import { ResultsPDF } from '../components/ResultsPDF';
import ReactCompareImage from 'react-compare-image';
import farnsworthD15TestOriginal from "../assets/farnsworthD15/farnsworthD15-original.webp";
import farnsworthD15Example from "../assets/farnsworthD15/farnsworthD15-test-example.webp";
import farnsworthD15NormalVision from "../assets/farnsworthD15/farnsworthD15-normal.webp";
import farnsworthD15Protanopia from "../assets/farnsworthD15/farnsworthD15-protanopia.webp";
import farnsworthD15Tritanopia from "../assets/farnsworthD15/farnsworthD15-tritanopia.webp";
import D15NormalPattern from "../assets/farnsworthD15/D15-normal-pattern.webp";
import D15ProtanPattern from "../assets/farnsworthD15/D15-protan-pattern.webp";
import D15DeutanPattern from "../assets/farnsworthD15/D15-deutan-pattern.webp";
import D15TritanPattern from "../assets/farnsworthD15/D15-tritan-pattern.webp";
import D15MildDeutanPattern from "../assets/farnsworthD15/D15-mild-deutan-pattern.webp";
import D15MinorNormalPattern from "../assets/farnsworthD15/D15-minor-normal-pattern.webp";

import "../styles/pages/TestItem.css";
import "../styles/pages/FarnsworthD15Test.css";

export const FarnsworthD15Test = () => {
  const [showTest, setShowTest] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [results, setResults] = useState(null);
  const [referenceCap, setReferenceCap] = useState(null);
  const [colorCaps, setColorCaps] = useState([]);
  const [arrangement, setArrangement] = useState([]);

  useEffect(() => {
    if (showTest && colorCaps.length === 0 && arrangement.length === 0) {
      const reference = FARNSWORTH_D15_CONFIG.caps.find(cap => cap.isReference);
      const capsToArrange = FARNSWORTH_D15_CONFIG.caps.filter(cap => !cap.isReference);

      const shuffled = [...capsToArrange].sort(() => Math.random() - 0.5);

      setReferenceCap(reference);
      setColorCaps(shuffled);
      setArrangement([reference]);

    }
  }, [showTest, colorCaps.length, arrangement.length]);

  const moveCapToArrangement = (index) => {
    if (arrangement.length < 16) {
      const newArrangement = [...arrangement, colorCaps[index]];
      const newColorCaps = colorCaps.filter((_, i) => i !== index);

      setArrangement(newArrangement);
      setColorCaps(newColorCaps);
    }
  };

  const moveBackFromArrangement = (index) => {
    if (index === 0) return;

    const capToMove = arrangement[index];
    const newArrangement = arrangement.filter((_, i) => i !== index);
    const newColorCaps = [...colorCaps, capToMove];

    setArrangement(newArrangement);
    setColorCaps(newColorCaps);
  };

  const finishTest = () => {
    const results = evaluateFarnsworthD15Results(arrangement, FARNSWORTH_D15_CONFIG);
    setResults(results);
  };

  const resetTest = () => {
    setShowTest(false);
    setColorCaps([]);
    setArrangement([]);
    setResults(null);
  };

  const handleDownloadPDF = async () => {
    const blob = await pdf(<ResultsPDF results={results} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `farnsworthD15-test-results-${new Date().toISOString().split('T')[0]}.pdf`;
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
        <div className="mt-4 w-full max-w-[580px]">
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
                <Card className="mt-4">
                  <CardBody>
                    <h4>Key Findings</h4>
                    <div className="technical-details">
                      <div>
                        <p>Deficiency Type:</p>
                        <p>{results.details.deficiencyType}</p>
                      </div>
                      <div>
                        <p>Severity:</p>
                        <p>{results.details.severity}</p>
                      </div>
                      <div>
                        <p>Confidence:</p>
                        <p>{results.details.confidence}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
              <div className="flex flex-col items-center w-full">
                <h4 className="font-semibold mb-2">Color Arrangement Pattern</h4>
                <Card className="w-full">
                  <CardBody className="px-0 flex flex-col items-center">
                    <p>CIE Lab Color Space</p>
                    <ResultPlot arrangement={arrangement} />
                  </CardBody>
                </Card>
              </div>
              <div className="flex flex-col items-center w-full">
                <h4 className="font-semibold mb-2">Common patterns</h4>
                <div className="grid gap-3 grid-cols-1 grid-rows-6 sm:grid-cols-2 sm:grid-rows-3">
                  <Card>
                    <CardBody className="px-0 flex flex-col items-center">
                      <p>Normal</p>
                      <Image src={D15NormalPattern} />
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody className="px-0 flex flex-col items-center">
                      <p>Normal - Minor Error</p>
                      <Image src={D15MinorNormalPattern} />
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody className="px-0 flex flex-col items-center">
                      <p>Protan</p>
                      <Image src={D15ProtanPattern} />
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody className="px-0 flex flex-col items-center">
                      <p>Deutan</p>
                      <Image src={D15DeutanPattern} />
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody className="px-0 flex flex-col items-center">
                      <p>Mild Deutan</p>
                      <Image src={D15MildDeutanPattern} />
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody className="px-0 flex flex-col items-center">
                      <p>Tritan</p>
                      <Image src={D15TritanPattern} />
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
          <h2>Farnsworth D15 Test</h2>
          {!showTest && <p>Test your ability to distinguish color hues with the Farnsworth D15 Test. Evaluate your color perception and detect moderate to severe color vision deficiencies.</p>}
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
                <Card className="h-[660px] sm:h-[560px] lg:h-[520px] xl:h-[460px]">
                  <CardBody className="cardbody-test">
                    <div className="flex flex-col sm:p-4 gap-4 w-full h-full">
                      {referenceCap && (
                        <>
                          <div className="text-center mb-4">
                            <p>Arrange the color discs in order by selecting them below and adding them to your sequence.</p>
                            <p>Try to create a natural progression of colors, starting from the reference disc.</p>
                          </div>

                          <div className="arrangement-area">
                            {arrangement.map((cap, index) => (
                              <div
                                key={`arrangement-${cap.id}`}
                                className="color-cap"
                                style={{ backgroundColor: cap.color }}
                                onClick={() => index !== 0 && moveBackFromArrangement(index)}
                              >
                                {index === 0 && <span className="reference-marker">Reference</span>}
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-center items-center">
                            <box-icon name="right-arrow-circle" type="solid" color="#0066cc" size="md" rotate="270"></box-icon>
                          </div>
                          <div className="caps-selection-area">
                            {colorCaps.map((cap, index) => (
                              <div
                                key={`selection-${cap.id}`}
                                className="color-cap"
                                style={{ backgroundColor: cap.color }}
                                onClick={() => moveCapToArrangement(index)}
                              >
                              </div>
                            ))}
                          </div>

                          <div className="text-center mt-4">
                            <Button color="primary" isDisabled={arrangement.length !== 16} onPress={finishTest}>Complete Test</Button>
                          </div>
                        </>
                      )}
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
            <h2>What is Farnsworth D15 Test?</h2>
            <div className="flex flex-col items-center lg:flex-row gap-8">
              <div className="flex-1">
                <p>The Farnsworth D15 Test, also known as the Dichotomous D-15 Test, is a widely used tool to assess color discrimination abilities. Unlike general color blindness tests, this test is designed to detect moderate to severe deficiencies in color vision, particularly red-green and blue-yellow deficiencies. It provides a quick and effective way to determine whether an individual has difficulty distinguishing between certain hues.</p>
                <p>Developed by Dean Farnsworth in the 1940s as a simplified version of the Farnsworth-Munsell 100 Hue Test, the D15 Test was created for practical applications where accurate color vision is essential. It is commonly used in industries such as aviation, electrical work, transportation, and manufacturing, where color differentiation is critical for safety and efficiency.</p>
                <p>The test primarily assesses an individual’s ability to distinguish hues along different axes of color vision. It is often employed in occupational screenings, clinical evaluations, and research studies to identify individuals who may have difficulty with specific color-based tasks.</p>
              </div>
              <Image
                src={farnsworthD15TestOriginal}
                alt="Farnsworth D15 Test Original"
                width={430}
                height={280}
                className="flex-1"
              />
            </div>
          </div>
          <div className="description-item-section">
            <h2 className="text-center">Types of Deficiencies Detected</h2>
            <DescriptionCarouselTest
              carouselItems={[
                {
                  title: "Moderate to Severe Deficiencies",
                  description: <><p>The Farnsworth D15 Test is particularly useful for detecting moderate to severe color vision deficiencies. It identifies cases that may not be apparent in everyday life but can still affect performance in professional settings.</p> <p>People with moderate deficiencies may experience difficulty in distinguishing certain hues but can still function without major restrictions in most environments. However, those with severe deficiencies may struggle significantly with tasks that require accurate color perception, such as reading color-coded signals or differentiating between wiring colors in technical fields.</p></>,
                  visual: <div className="rounded-lg overflow-hidden"><Image src={farnsworthD15Example} /></div>
                },
                {
                  title: "Red-Green Deficiencies (Protanopia & Deuteranopia)",
                  description: <><p>The Farnsworth D15 Test is effective in identifying protanopia and deuteranopia, which are types of red-green color blindness. These conditions make it challenging to differentiate between red and green hues, which can be problematic in professions requiring precise color recognition.</p> <p>Individuals with protanopia (reduced sensitivity to red light) or deuteranopia (reduced sensitivity to green light) may misidentify or confuse shades within the red-green spectrum. This can lead to potential safety risks, particularly in industries such as transportation, electrical work, and aviation.</p> <p>By diagnosing red-green deficiencies, individuals can take necessary precautions, such as adjusting their work environment or seeking specialized accommodations.</p></>,
                  visual: <div className="rounded-lg overflow-hidden"><ReactCompareImage leftImage={farnsworthD15NormalVision} rightImage={farnsworthD15Protanopia} /></div>
                },
                {
                  title: "Blue-Yellow Deficiencies (Tritanopia)",
                  description: <><p>In addition to red-green deficiencies, the Farnsworth D15 Test can also detect blue-yellow deficiencies (tritanopia). This condition affects the ability to distinguish between blue and yellow hues, though it is less common than red-green deficiencies.</p> <p>Individuals with tritanopia may have difficulty differentiating between shades of blue, yellow, and violet. This can impact color-dependent tasks such as working with color-coded materials, distinguishing between certain safety signals, or identifying natural environmental cues.</p><p>Early detection of blue-yellow deficiencies allows individuals to adjust their working conditions or seek alternative solutions to prevent errors.</p></>,
                  visual: <div className="rounded-lg overflow-hidden"><ReactCompareImage leftImage={farnsworthD15NormalVision} rightImage={farnsworthD15Tritanopia} /></div>
                }
              ]}
            />
          </div>
          <div className="description-item-section">
            <h2>How Does the Farnsworth D15 Test Work?</h2>
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
              <div className="w-ful lg:w-7/12">
                <p>The Farnsworth D15 Test measures how well a person can see slight differences in colors. It does this by asking users to arrange color caps or tiles in order, from one shade to another, based on their hue. The test typically covers different sections of the color spectrum, with each set focusing on a specific range of colors, ensuring a thorough evaluation of the user’s color vision.</p>
                <p>The test starts with a group of color caps, each with small differences in hue. Users must line them up in a smooth transition from one color to the next. While it may seem easy, it requires close attention to detail, as many of the colors can look very similar, especially when they are part of the same color family.</p>
                <p>To get accurate results, the test should be done in a well-lit space with minimal distractions. Proper lighting ensures that the colors are seen correctly, making the test results more reliable. The Farnsworth D15 Test is simple to use and suitable for people of all ages, whether for work, professional assessments, or just to better understand their color vision abilities.</p>
              </div>
              <div className="w-full lg:w-5/12">
                <DescriptionStepperTest
                  steps={[
                    { title: "Arrangement", description: "The Farnsworth D15 Test asks users to arrange color caps or tiles in order, based on subtle differences in hue, from one shade to another." },
                    { title: "Challenge", description: "Although it seems simple, the test requires close attention to detail, as many colors appear very similar, especially within the same color family." },
                    { title: "Accuracy", description: "For the best results, the test should be taken in a well-lit environment with minimal distractions, ensuring the colors are seen clearly and accurately." }
                  ]}
                />
              </div>

            </div>
          </div>
          <div className="description-item-section">
            <h2>Limitations of the Farnsworth D15 Test</h2>
            <div>
              <DescriptionGridTest
                gridItems={[
                  { title: "Detection Range", description: "The Farnsworth D15 Test is great for detecting subtle hue-related deficiencies but doesn’t cover all types of color blindness. Specifically, it lacks focus on red-green deficiencies, which are the most common form of color blindness." },
                  { title: "Red-Green Limitations", description: "While the test excels in identifying subtle hue issues, it is not ideal for diagnosing red-green deficiencies. People with suspected red-green color blindness should take additional tests for a more accurate diagnosis." },
                  { title: "Comprehensive Diagnosis", description: "The Farnsworth D15 Test should not be used alone to diagnose all types of color blindness. For a complete evaluation, it needs to be supplemented with other tests that target a wider range of deficiencies." },
                  { title: "Professional Limitations", description: "For professionals in fields that require detailed color vision assessments, like aviation or electrical work, this test might not provide enough detail on red-green deficiencies. Supplementary tests are recommended to get a fuller understanding of color vision capabilities." }
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
                NOTE: The Farnsworth D15 Test is a screening tool for moderate to severe color vision deficiencies. It should be conducted under controlled lighting conditions for accurate results. If you suspect a color vision problem, consult an optometrist or ophthalmologist for further evaluation.
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  )
}