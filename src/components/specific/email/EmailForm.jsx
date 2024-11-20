import React, { useState } from "react";
// import {sendEmail} from "../../../services/emailService";

const EmailForm = () => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real-world app, you'll integrate an email service API here
    console.log("Email Sent to:", recipient);
    console.log("Subject:", subject);
    console.log("Message:", message);

    // sendEmail(recipient, subject, message);

    // Clear form fields after sending email
    setRecipient("");
    setSubject("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black font-semibold">
      {/* Recipient Email */}
      <div>
        <label htmlFor="recipient" className="block text-gray-700 font-semibold">
          Recipient Email
        </label>
        <input
          type="email"
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Enter recipient's email"
          required
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-gray-700 font-semibold">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter email subject"
          required
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-gray-700 font-semibold">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          required
          rows="6"
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Send Email
        </button>
      </div>
    </form>
  );
};

export default EmailForm;
