import {Accordion, AccordionItem} from "@heroui/accordion";
import "../styles/pages/FAQ.css"

export const FAQ = () => {
  return (
    <div className="faq-container">
      <div className="faq-hero">
        <div className="content-text">
          <h2>Frequently Asked Questions (FAQ)</h2>
          <p>Find answers to common questions faq our color vision tests. Get support and insights for your inquiries.</p>
        </div>
      </div>
      <div className="faq-content">
        <Accordion variant="bordered">
          <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
            <p>Hola</p>
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
            <p>Hola</p>
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
            <p>Hola</p>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}