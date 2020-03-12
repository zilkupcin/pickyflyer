import React, { useState } from "react";
import ContactUsForm from "./ContactUsForm";
import Loader from "../Loader";
import ContactUsSuccess from "./ContactUsSuccess";
import { sendInquiry } from "../../api/parseCloud";

const ContactUs = () => {
  const [messageSent, setMessageSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    name === "name" && setName(value);
    name === "email" && setEmail(value);
    name === "message" && setMessage(value);
  };

  const handleSend = () => {
    const errorMessage = checkInputs();
    errorMessage && setError(errorMessage);
    !errorMessage && send();
  };

  const send = async () => {
    setIsSending(true);
    const params = {
      name,
      email,
      message
    };

    try {
      await sendInquiry(params);
      setMessageSent(true);
      setIsSending(false);
    } catch {
      setIsSending(false);
      setError("Error sending inquiry. Please try again.");
    }
  };

  const checkInputs = () => {
    if (name === "") return "Please enter your name.";
    if (!email.includes("@")) return "Please enter a valid email address.";
    if (message === "") return "Please enter a message.";
    return "";
  };

  if (isSending) {
    return (
      <div className="content wrapper">
        <div className="form">
          <Loader />
        </div>
      </div>
    );
  }

  if (messageSent) {
    return (
      <div className="content wrapper">
        <div className="form">
          <ContactUsSuccess />
        </div>
      </div>
    );
  }

  return (
    <div className="content wrapper">
      <div className="form">
        <ContactUsForm
          onInput={handleInput}
          onSend={handleSend}
          name={name}
          email={email}
          message={message}
          error={error}
        />
      </div>
    </div>
  );
};

export default ContactUs;
