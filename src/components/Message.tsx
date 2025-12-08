"use client";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { apiClient } from "@/lib/api-client";
export default function Message() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [sending, setSending] = useState(false);

  //@ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      console.log("reCAPTCHA not ready!");
      toast.error("reCAPTCHA not ready!");
      return;
    }

    try {
      setSending(true);

      const recaptchaToken = await executeRecaptcha("message_form"); // Ensure the action string matches
      if (!recaptchaToken) {
        console.warn("reCAPTCHA token is empty or not generated!");
        toast.error("Could not verify reCAPTCHA. Try again.");
        return;
      }

      // Get Public IP
      const response = await axios.get("https://api.ipify.org?format=json");
      const publicIp = response.data.ip;

      const email = e.target.email.value;
      const subject = e.target.subject.value;
      const message = e.target.message.value;
      const clinetName = e.target.name.value;

      const newData = {
        recaptchaToken,
        mail: email,
        clinetName,
        subject: subject,
        message: message,
      };

      await apiClient.post(`/mails`, newData, {
        headers: {
          "X-Client-IP": publicIp,
        },
      });

      e.target.reset();
      toast.success("Message sent successfully!");
    } catch (err: any) {
      console.log(err);
      // Handled by interceptor, but we might want to ensure loading state is reset
      return;
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.section
      id="message"
      className="w-full flex flex-col gap-6 p-3 mt-10"
      initial={{ opacity: 0 }} // Section starts invisible
      whileInView={{ opacity: 1 }} // Fades in when it comes into view
      transition={{ duration: 0.8 }} // Duration for fade-in effect
      viewport={{ once: true }} // Ensures animation only triggers once when it enters the viewport
    >
      <Toaster position="top-right" />
      {/* Heading Animation */}
      <motion.h2
        className="text-lg dark:text-white text-black font-bold lg:text-xl"
        initial={{ y: -20, opacity: 0 }} // Start with slightly moved up and invisible
        whileInView={{ y: 0, opacity: 1 }} // Move to original position and fade in
        transition={{ duration: 0.6 }} // Duration for heading animation
        viewport={{ once: true }} // Trigger animation only once when in view
      >
        Message Me.
      </motion.h2>

      {/* Form Section */}
      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        initial={{ y: 20, opacity: 0 }} // Start with slight downward movement and invisible
        whileInView={{ y: 0, opacity: 1 }} // Move to original position and fade in
        transition={{ duration: 0.8, delay: 0.2 }} // Animation duration with delay for smooth flow
        viewport={{ once: true }} // Trigger animation only once
      >
        {/* Name Input */}
        <motion.label
          htmlFor="name"
          className="flex flex-col"
          initial={{ x: -20, opacity: 0 }} // Start with slight left movement and invisible
          whileInView={{ x: 0, opacity: 1 }} // Move to original position and fade in
          transition={{ duration: 0.6, delay: 0.4 }} // Animation with delay for each field
          viewport={{ once: true }} // Trigger animation only once
        >
          <p className="md:text-lg dark:text-white text-black">
            Name <span className="text-red-500">*</span>
          </p>
          <input
            disabled={sending}
            type="text"
            min={5}
            max={20}
            required
            placeholder="Name"
            name="name"
            className="p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 dark:bg-zinc-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:outline-none"
          />
        </motion.label>

        {/* Subject Input */}
        <motion.label
          htmlFor="subject"
          className="flex flex-col"
          initial={{ x: -20, opacity: 0 }} // Start with slight left movement and invisible
          whileInView={{ x: 0, opacity: 1 }} // Move to original position and fade in
          transition={{ duration: 0.6, delay: 0.6 }} // Slight delay for the next input
          viewport={{ once: true }} // Trigger animation only once
        >
          <p className="md:text-lg dark:text-white text-black">
            Subject <span className="text-red-500">*</span>
          </p>
          <input
            disabled={sending}
            type="text"
            name="subject"
            min={5}
            max={20}
            required
            placeholder="Subject"
            className="p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 dark:bg-zinc-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:outline-none"
          />
        </motion.label>

        {/* Email Input */}
        <motion.label
          htmlFor="email"
          className="flex flex-col"
          initial={{ x: -20, opacity: 0 }} // Start with slight left movement and invisible
          whileInView={{ x: 0, opacity: 1 }} // Move to original position and fade in
          transition={{ duration: 0.6, delay: 0.8 }} // Further delay for next input field
          viewport={{ once: true }} // Trigger animation only once
        >
          <p className="md:text-lg dark:text-white text-black">
            Email <span className="text-red-500">*</span>
          </p>
          <input
            disabled={sending}
            type="email"
            name="email"
            min={5}
            max={20}
            required
            placeholder="Your email"
            className="p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 dark:bg-zinc-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:outline-none"
          />
        </motion.label>

        {/* Message Input */}
        <motion.label
          htmlFor="Message"
          className="flex flex-col"
          initial={{ x: -20, opacity: 0 }} // Start with slight left movement and invisible
          whileInView={{ x: 0, opacity: 1 }} // Move to original position and fade in
          transition={{ duration: 0.6, delay: 1 }} // Delay for the final input
          viewport={{ once: true }} // Trigger animation only once
        >
          <p className="md:text-lg dark:text-white text-black">
            Message <span className="text-red-500">*</span>
          </p>
          <textarea
            disabled={sending}
            rows={6}
            name="message"
            required
            placeholder="Your message"
            className="p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 dark:bg-zinc-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:outline-none"
          />
        </motion.label>

        {/* Submit Button with spinner */}
        <motion.button
          disabled={sending}
          type="submit"
          className="mt-4 dark:text-black dark:bg-white flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide py-2 px-6 bg-black text-white font-bold rounded hover:opacity-70 focus:outline-none focus:ring-2"
        >
          {sending ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              Sending...
            </>
          ) : (
            "Send"
          )}
        </motion.button>
        {/* Email Display */}
        <motion.p
          className="text-center md:text-left text-sm md:text-base dark:text-gray-300 text-gray-700"
          initial={{ y: 20, opacity: 0 }} // Start with slight downward movement and invisible
          whileInView={{ y: 0, opacity: 1 }} // Move to original position and fade in
          transition={{ duration: 0.7, delay: 0.1 }} // Animation duration with a small delay
          viewport={{ once: true }} // Trigger animation only once
        >
          You can also reach me directly at:{" "}
          <a
            href="mailto:info@hewagenkm.com"
            className="font-semibold text-black dark:text-white hover:underline"
          >
            info@hewagenkm.com
          </a>
        </motion.p>
      </motion.form>
    </motion.section>
  );
}
