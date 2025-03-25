import { useState } from "react";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import emailjs from "@emailjs/browser";
import "../styles/pages/Contact.css"

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const templateParams = {
        from_name: formData.get("fullName"),
        from_email: formData.get("email"),
        message: formData.get("message"),
        to_name: "ColorVision Team",
      };

      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      if (result.status === 200) {
        addToast({
          title: "Message sent successfully!",
          description: "We'll get back to you soon.",
          color: "success",
          variant: "flat",
          timeout: 5000,
        })
        e.target.reset();
      }

    } catch (error) {
      console.error("Email error:", error);
      addToast({
        title: "Failed to send message",
        description: "Please try again later or contact us through alternative means.",
        color: "danger",
        variant: "flat",
        timeout: 5000,
      })
    } finally {
      setIsLoading(false);
    }
  }

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
    return true;
  }

  const validateRequired = (value) => {
    return value.trim() ? true : "This field is required";
  }

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
        <Form className="flex-1 w-full max-w-[420px] p-6 border-1.5 rounded-xl shadow-2xl " onSubmit={onSubmit}>
          <Input
            isRequired
            validate={validateRequired}
            label="Full Name"
            labelPlacement="outside"
            name="fullName"
            placeholder="Enter your full name"
            isDisabled={isLoading}
          />
          <Input
            isRequired
            validate={validateEmail}
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            isDisabled={isLoading}
          />
          <Textarea
            isRequired
            validate={validateRequired}
            label="Message"
            labelPlacement="outside"
            name="message"
            placeholder="Write your message here"
            minRows={3}
            isDisabled={isLoading}
          />
          <div className="flex gap-4 w-full">
            <Button className="w-full" color="primary" type="submit" isLoading={isLoading} isDisabled={isLoading}>
              {isLoading ? "Sending..." : "Submit"}
            </Button>
            <Button type="reset" variant="bordered" isDisabled={isLoading}>
              Reset
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
