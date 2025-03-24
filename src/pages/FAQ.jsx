import { Accordion, AccordionItem } from "@heroui/accordion";
import "../styles/pages/FAQ.css"

export const FAQ = () => {
  const faqItems = [
    {
      key: "1",
      title: "What types of color blindness tests are available on this platform?",
      content: "ColorVision offers several professional-grade color vision tests including the Ishihara Test, Farnsworth D-15 Test, Cambridge Color Test, Farnsworth Lantern Test and Anomaloscope Test. Each test is designed to detect different aspects of color vision deficiency."
    },
    {
      key: "2",
      title: "How accurate are online color blindness tests?",
      content: "While our online tests use clinically validated methods and patterns, they should be considered as screening tools rather than definitive diagnoses. Factors like screen calibration and lighting can affect results. For a definitive diagnosis, we recommend consulting an eye care professional."
    },
    {
      key: "3",
      title: "How should I prepare for taking a color vision test?",
      content: "For the most accurate results: 1) Use a well-calibrated screen, 2) Take the test in a well-lit room with natural lighting if possible, 3) Disable any blue light filters or night mode settings, 4) Ensure your screen brightness is at an appropriate level, and 5) Take the test when your eyes are not fatigued."
    },
    {
      key: "4",
      title: "Can color blindness be cured?",
      content: "Currently, there is no cure for inherited color blindness. However, there are various aids and adaptive technologies available, such as color-correcting glasses and digital tools, that can help manage color vision deficiency in daily life."
    },
    {
      key: "5",
      title: "How long do the tests take to complete?",
      content: "Test duration varies: The Ishihara Test typically takes 5-7 minutes, the Farnsworth D-15 Test about 10-15 minutes, Farnsworth Lantern Test takes 5-6 minutes  and the Cambridge Color Test approximately 15-20 minutes. The Anomaloscope Test usually requires 5-10 minutes to complete."
    },
    {
      key: "6",
      title: "Can I wear my glasses or contact lenses during the tests?",
      content: "Yes, you should wear your normal prescription glasses or contact lenses while taking the tests. However, avoid wearing tinted lenses or color-correcting glasses as these will affect the results."
    },
    {
      key: "7",
      title: "What's the difference between the various tests offered?",
      content: "Each test serves a specific purpose: The Ishihara Test is best for quick screening, the Farnsworth D-15 Test excels at detecting severity levels, the Cambridge Test provides precise measurements of color discrimination, Farnsworth Lantern Test is designed to evaluate color signal light recognition, particularly important for maritime and aviation industries and the Anomaloscope Test is particularly effective for red-green color vision deficiencies."
    },
    {
      key: "8",
      title: "How often should I take a color vision test?",
      content: "For most people, color vision remains stable throughout life. However, if you notice changes in your color perception or require regular screening for occupational purposes, we recommend testing annually or as advised by your eye care professional."
    },
    {
      key: "9",
      title: "Are the tests suitable for children?",
      content: "Yes, our tests can be used for children, particularly the Ishihara Test which is widely used for screening children. However, young children may need assistance and guidance while taking the tests. For children under 6, professional examination is recommended."
    },
    {
      key: "10",
      title: "What do the test results mean?",
      content: "Test results typically indicate whether your color vision is normal or if you have a specific type of color vision deficiency (protanopia, deuteranopia, or tritanopia) and its severity. Detailed explanations are provided with each test result."
    },
    {
      key: "11",
      title: "Can I save or share my test results?",
      content: "Yes, after completing any test, you can download a PDF report of your results. This report includes your test performance, diagnosis, and recommendations. You can share this report with your healthcare provider or employer if needed."
    },
    {
      key: "12",
      title: "What causes color blindness?",
      content: "Color blindness can be inherited (genetic) or acquired. Inherited color blindness is present from birth, while acquired color blindness can result from eye injuries, certain diseases, medication side effects, or aging. Some forms may be temporary while others are permanent."
    },
    {
      key: "13",
      title: "Do I need special equipment to take these tests?",
      content: "No special equipment is required, but you do need: 1) A device with a good quality display (computer, tablet, or smartphone), 2) Proper lighting conditions, and 3) A stable internet connection. We recommend using a larger screen for optimal test-taking experience."
    }
  ];

  return (
    <div className="faq-container">
      <div className="faq-hero">
        <div className="content-text">
          <h2>Frequently Asked Questions (FAQ)</h2>
          <p>Find answers to common questions about our color vision tests. Get support and insights for your inquiries.</p>
        </div>
      </div>
      <div className="faq-content">
        <Accordion variant="bordered">
          {faqItems.map(item => (
            <AccordionItem 
              key={item.key} 
              aria-label={`Question ${item.key}`} 
              title={item.title}
            >
              <p>{item.content}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}