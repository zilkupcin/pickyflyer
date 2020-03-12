import React from "react";
import { ReactComponent as SuccessImg } from "../../images/success.svg";

const ContactUsSuccess = () => {
  return (
    <div className="success-message">
      <SuccessImg className="success-message__image" />
      <h5>Thank you for your inquiry, we'll get back to you shortly!</h5>
    </div>
  );
};

export default ContactUsSuccess;
