"use client";

import { useState, useRef, useEffect } from "react";
import { Send, MessageSquare, X, Minimize2, Loader2, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "@/lib/api-client";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hi! I'm Nadun's AI assistant. Ask me anything about his skills, projects, or experience!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Send basic history (last 10 messages) to keep context small
      const history = messages.slice(-10).map((m) => ({
        role: m.role === "user" ? "user" : "model",
        content: m.content,
      }));

      const response = await apiClient.post("/chat", {
        message: userMessage,
        history,
      });

      setMessages((prev) => [
        ...prev,
        { role: "bot", content: response.data.text },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Sorry, I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-4">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
                originX: 1,
                originY: 1,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 w-[calc(100vw-32px)] sm:w-[350px] md:w-[400px] h-[60vh] sm:h-[500px] max-h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-neutral-900 dark:bg-neutral-800 p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                  <div className="bg-white/10 p-2 rounded-full">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-md">Portfolio Assistant</h3>
                    <p className="text-xs text-neutral-400 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      Online
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Minimize2 size={18} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-neutral-950/50">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-br-none"
                          : "bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-bl-none shadow-sm"
                      }`}
                    >
                      {msg.role === "bot" ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown
                            components={{
                              p: ({ node, ...props }) => (
                                <p className="mb-2 last:mb-0" {...props} />
                              ),
                              ul: ({ node, ...props }) => (
                                <ul
                                  className="list-disc pl-4 mb-2 space-y-1"
                                  {...props}
                                />
                              ),
                              ol: ({ node, ...props }) => (
                                <ol
                                  className="list-decimal pl-4 mb-2 space-y-1"
                                  {...props}
                                />
                              ),
                              li: ({ node, ...props }) => (
                                <li className="text-sm" {...props} />
                              ),
                              strong: ({ node, ...props }) => (
                                <strong className="font-bold" {...props} />
                              ),
                              a: ({ node, ...props }) => (
                                <a
                                  className="text-blue-500 hover:underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  {...props}
                                />
                              ),
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 rounded-2xl rounded-bl-none shadow-sm">
                      <Loader2 className="w-5 h-5 animate-spin text-neutral-500" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="p-4 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800"
              >
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Nadun..."
                    className="w-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-700 transition-all border border-transparent hover:border-neutral-300 dark:hover:border-neutral-700"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 p-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Send size={16} />
                  </button>
                </div>
                <p className="text-[10px] text-center text-neutral-400 mt-2">
                  AI can make mistakes. Check important info.
                </p>
              </form>
              <div className="p-2 text-center border-t border-neutral-200 dark:border-neutral-700">
                <p className="text-[10px] text-neutral-400">
                  By using this chat, you agree to our{" "}
                  <a href="/terms" className="underline hover:text-neutral-500">
                    Terms
                  </a>
                  . AI can make mistakes.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow border-2 border-white dark:border-neutral-900"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.button>
      </div>
    </>
  );
}
