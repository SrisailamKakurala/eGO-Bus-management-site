import React, { useState } from "react";
import EmailForm from "../../components/specific/email/EmailForm";

const SendEmail = () => {
  return (
    <div className="h-full p-6 bg-red-500 text-white rounded-lg">
      <h1 className="text-4xl font-bold mb-6">Throw an Email</h1>
      <hr className="border-t-1 border-gray-300 my-4 mx-auto" />
      
      {/* Email Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <EmailForm />
      </div>
    </div>
  );
};

export default SendEmail;
