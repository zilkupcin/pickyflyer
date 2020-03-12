import React from "react";

const ContactUsForm = ({ onInput, onSend, name, email, message, error }) => {
  return (
    <div className="form__content">
      <h3 className="form__heading">Contact Us</h3>
      <h4 className="form__message">
        Got a question? Just type your message and we’ll get back to you as soon
        as possible
      </h4>
      <div className="input-container">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          onChange={onInput}
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={onInput}
        />
      </div>
      <div className="input-container">
        <textarea
          type="text"
          name="message"
          value={message}
          placeholder="Message"
          onChange={onInput}
        />
      </div>
      {error && <span className="input-error">{error}</span>}
      <button className="btn-main form__submit-btn" onClick={onSend}>
        Submit
      </button>
    </div>
  );
};

export default ContactUsForm;
