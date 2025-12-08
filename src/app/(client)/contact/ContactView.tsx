"use client";

import { motion } from "framer-motion";
import Message from "@/components/Message";
import { FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import BgShadow from "@/components/BgShadow";

// Quick messages list
const quickMessages = [
  "Hi! I’d like to collaborate with you.",
  "Hello! I have a project inquiry.",
  "Hey! Can we schedule a call?",
  "Hi! I want to know more about your work.",
];

export default function ContactView() {
  const [showDialog, setShowDialog] = useState(false);

  const handleSendMessage = (message: string) => {
    const encodedMsg = encodeURIComponent(message);
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMsg}`, "_blank");
    setShowDialog(false);
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen dark:text-gray-100"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, duration: 0.5 },
        },
      }}
      viewport={{ once: true }}
    >
      <div className="flex-grow md:px-40 md:py-20 lg:px-48 p-8 space-y-12">
        {/* Title */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-8">
            Contact Me.
          </h1>
        </motion.div>

        {/* Contact Form */}
        <Message />

        {/* WhatsApp Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-6 bg-gray-100 dark:bg-zinc-900 md:p-6 p-3 rounded-xl shadow-lg"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          <FaWhatsapp className="text-green-500 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">WhatsApp</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Chat with me instantly on WhatsApp.
            </p>
            <button
              onClick={() => setShowDialog(true)}
              className="mt-2 px-4 py-2 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition"
            >
              Send WhatsApp Message
            </button>
          </div>
        </motion.div>

        {/* Location Section */}
        <motion.div
          className="space-y-4"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-red-500 text-2xl" />
            <h2 className="text-lg font-semibold">Location</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Dompe, Sri Lanka</p>
          <div className="w-full h-72 rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="Dompe Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15842.44270113677!2d80.07815620000001!3d6.937047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae254db811ec285%3A0xf5c8112a0fce44a9!2sDompe%2C%20Sri%20Lanka!5e0!3m2!1sen!2ssg!4v1759002579118!5m2!1sen!2ssg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>

      {/* Quick Messages Dialog */}
      {showDialog && (
        <BgShadow align="justify-center" onClose={() => setShowDialog(false)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-6 w-[90%] md:w-[400px]"
          >
            <h3 className="text-lg font-semibold mb-4">Quick Messages</h3>
            <div className="space-y-3">
              {quickMessages.map((msg, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(msg)}
                  className="w-full px-4 py-2 text-left bg-gray-100 dark:bg-zinc-800 rounded-md hover:bg-green-100 hover:dark:bg-green-900 transition"
                >
                  {msg}
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 rounded-md hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </BgShadow>
      )}
    </motion.div>
  );
}
