import { useState } from "react";
import { Card, CardBody } from "@heroui/card"
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import "../styles/pages/Contact.css"

export const Contact = () => {
  const [submitted, setSubmitted] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    setSubmitted(data);
  };


  return (
    <div className="contact-container">
      <div className="contact-hero">
        <div className="content-text">
          <h2>Contact Us</h2>
          <p>Have questions or feedback? Reach out to the ColorVision team for assistance with our online vision tests.</p>
        </div>
      </div>
      <div className="contact-content">
        <div className="flex-1">
          <p>We invite you to share your thoughts and ideas with us at ColorVision. Your feedback is crucial in enhancing our color vision testing tools and overall user experience. Whether you have found a feature that excites you, identified an area for improvement, or have a new idea, we’re eager to hear from you.</p>
          <p>Your contributions play a key role in our journey toward continual improvement, helping us refine our services and innovate to serve you better.</p>
          <p>Rest assured, our team thoroughly reviews every piece of feedback to ensure we exceed your expectations and enhance your experience on our site. With your input, we can make ColorVision an even more engaging and effective platform for everyone.</p>
        </div>
        <Form className="flex-1 w-full max-w-[420px] p-6 border-1.5 rounded-xl shadow-lg " onSubmit={onSubmit}>
          <Input
            isRequired
            errorMessage="Please enter a valid email"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
          />
          <Button type="submit" variant="bordered">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}
