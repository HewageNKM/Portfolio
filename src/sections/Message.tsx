import { motion } from "framer-motion";

export default function Message() {
  return (
    <motion.section
      id="message"
      className="w-full flex flex-col py-4 gap-6 md:px-10 px-8 mt-10"
      initial={{ opacity: 0 }}  // Section starts invisible
      whileInView={{ opacity: 1 }}  // Fades in when it comes into view
      transition={{ duration: 0.8 }}  // Duration for fade-in effect
      viewport={{ once: true }}  // Ensures animation only triggers once when it enters the viewport
    >
      {/* Heading Animation */}
      <motion.h2
        className="text-lg font-bold lg:text-xl"
        initial={{ y: -20, opacity: 0 }}  // Start with slightly moved up and invisible
        whileInView={{ y: 0, opacity: 1 }}  // Move to original position and fade in
        transition={{ duration: 0.6 }}  // Duration for heading animation
        viewport={{ once: true }}  // Trigger animation only once when in view
      >
        Message Me.
      </motion.h2>

      {/* Form Section */}
      <motion.form
        className="flex flex-col gap-4"
        initial={{ y: 20, opacity: 0 }}  // Start with slight downward movement and invisible
        whileInView={{ y: 0, opacity: 1 }}  // Move to original position and fade in
        transition={{ duration: 0.8, delay: 0.2 }}  // Animation duration with delay for smooth flow
        viewport={{ once: true }}  // Trigger animation only once
      >
        {/* Name Input */}
        <motion.label
          htmlFor="name"
          className="flex flex-col"
          initial={{ x: -20, opacity: 0 }}  // Start with slight left movement and invisible
          whileInView={{ x: 0, opacity: 1 }}  // Move to original position and fade in
          transition={{ duration: 0.6, delay: 0.4 }}  // Animation with delay for each field
          viewport={{ once: true }}  // Trigger animation only once
        >
          <p className="md:text-lg">
            Name <span className="text-red-500">*</span>
          </p>
          <input
            type="text"
            min={5}
            max={20}
            required
            placeholder="Name"
            className="p-2 rounded bg-gray-100 placeholder-gray-400 focus:ring-2"
          />
        </motion.label>

        {/* Subject Input */}
        <motion.label
          htmlFor="subject"
          className="flex flex-col"
          initial={{ x: -20, opacity: 0 }}  // Start with slight left movement and invisible
          whileInView={{ x: 0, opacity: 1 }}  // Move to original position and fade in
          transition={{ duration: 0.6, delay: 0.6 }}  // Slight delay for the next input
          viewport={{ once: true }}  // Trigger animation only once
        >
          <p className="md:text-lg">
            Subject <span className="text-red-500">*</span>
          </p>
          <input
            type="text"
            min={5}
            max={20}
            required
            placeholder="Subject"
            className="p-2 rounded bg-gray-100  placeholder-gray-400 focus:ring-2"
          />
        </motion.label>

        {/* Email Input */}
        <motion.label
          htmlFor="email"
          className="flex flex-col"
          initial={{ x: -20, opacity: 0 }}  // Start with slight left movement and invisible
          whileInView={{ x: 0, opacity: 1 }}  // Move to original position and fade in
          transition={{ duration: 0.6, delay: 0.8 }}  // Further delay for next input field
          viewport={{ once: true }}  // Trigger animation only once
        >
          <p className="md:text-lg">
            Email <span className="text-red-500">*</span>
          </p>
          <input
            type="email"
            min={5}
            max={20}
            required
            placeholder="Your email"
            className="p-2 rounded bg-gray-100 placeholder-gray-400 focus:ring-2"
          />
        </motion.label>

        {/* Message Input */}
        <motion.label
          htmlFor="Message"
          className="flex flex-col"
          initial={{ x: -20, opacity: 0 }}  // Start with slight left movement and invisible
          whileInView={{ x: 0, opacity: 1 }}  // Move to original position and fade in
          transition={{ duration: 0.6, delay: 1 }}  // Delay for the final input
          viewport={{ once: true }}  // Trigger animation only once
        >
          <p className="md:text-lg">
            Message <span className="text-red-500">*</span>
          </p>
          <textarea
            rows={6}
            required
            placeholder="Your message"
            className="p-2 rounded bg-gray-100  placeholder-gray-400 focus:ring-2"
          />
        </motion.label>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="mt-4 py-2 px-6 bg-black text-white font-bold rounded hover:opacity-70 focus:outline-none focus:ring-2"
          whileHover={{ scale: 1.1 }}  // Button scales up when hovered
          transition={{ type: "spring", stiffness: 300 }}  // Spring effect for the scale
        >
          Send
        </motion.button>
      </motion.form>
    </motion.section>
  );
}
