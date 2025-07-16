import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Mail } from "lucide-react";
import ChatbotAvatar from "@/assets/chatbot.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [buttonPulse, setButtonPulse] = useState(true);
  const [buttonShake, setButtonShake] = useState(false);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [inputName, setInputName] = useState("");
  const [chatHistory, setChatHistory] = useState<
    Array<{ sender: "bot" | "user"; text: string }>
  >([]);
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setButtonPulse(true);
      const timer = setTimeout(() => setButtonPulse(false), 1200);
      return () => clearTimeout(timer);
    } else {
      setButtonPulse(false);
    }
  }, [isOpen]);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    setButtonShake(true);
    setTimeout(() => setButtonShake(false), 400);
    if (!isOpen) {
      const storedName = localStorage.getItem("chatbotName");
      if (storedName) {
        setName(storedName);
        setStep(3);
        setChatHistory([
          {
            sender: "bot",
            text: `Hi ${storedName}! How can I help you today?`,
          },
          {
            sender: "bot",
            text: `Elan is currently offline, but you can contact him via Email or WhatsApp below.`,
          },
        ]);
      } else {
        setStep(0);
        setName("");
        setInputName("");
        setChatHistory([
          { sender: "bot", text: "Hi! How can I help you today?" },
        ]);
      }
      setUserInput("");
    }
  };

  return (
    <>
      <Button
        className={`fixed z-50 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 theme-green:bg-green-600 theme-green:hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 overflow-hidden ${
          isMobile ? "bottom-24 right-6" : "bottom-6 right-6"
        } ${!isOpen && buttonPulse ? "animate-pulse" : ""} ${
          buttonShake ? "animate-shake" : ""
        }`}
        onClick={handleButtonClick}
        style={{
          boxShadow:
            !isOpen && buttonPulse
              ? "0 0 0 8px rgba(59,130,246,0.15)"
              : undefined,
        }}
        aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
      >
        <span className="absolute inset-0 pointer-events-none animate-ripple" />
        {isOpen ? (
          <X className="w-6 h-6 animate-spin" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>

      {isOpen && (
        <div
          className={`fixed z-50 w-[380px] max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur border border-blue-100 dark:border-gray-800 flex flex-col overflow-hidden transition-all duration-500 animate-fade-in-down ${
            isMobile ? "bottom-40 right-6" : "bottom-12 right-6"
          }`}
          style={{
            minHeight: step === 0 ? "260px" : "400px",
            maxHeight: "520px",
          }}
        >
          <div className="flex items-center gap-3 px-5 pt-5 pb-3 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white">
            <img
              src={ChatbotAvatar}
              alt="Elan Chatbot Avatar"
              className="w-10 h-10 rounded-full border-2 border-white shadow flex-shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg">Elan's Chatbot</span>
              <span className="text-xs text-blue-100/80">
                Always here to help, even when offline!
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto hover:bg-blue-700 rounded-full p-2"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="border-b border-blue-300/30 mx-5" />

          <div className="flex-1 px-4 py-4 bg-gradient-to-br from-blue-100/60 via-white/80 to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 flex flex-col justify-between">
            <div
              className="mb-2 flex flex-col gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent"
              style={{
                maxHeight: "320px",
                overflowX: "hidden",
                minHeight: "60px",
              }}
            >
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === "bot" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2 rounded-2xl shadow text-sm ${
                      msg.sender === "bot"
                        ? "bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 text-white border border-blue-400"
                        : "bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-gray-700"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {step === 0 && (
                <>
                  <div className="flex justify-start">
                    <div className="max-w-[85%] px-4 py-2 rounded-2xl shadow text-sm bg-gradient-to-br from-blue-400 to-blue-500 text-white border border-blue-200/40">
                      May I know your name?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <form
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl shadow text-sm bg-white dark:bg-gray-900 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-gray-700"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (inputName.trim()) {
                          setName(inputName.trim());
                          localStorage.setItem("chatbotName", inputName.trim());
                          setChatHistory((prev) => [
                            ...prev,
                            { sender: "user", text: inputName.trim() },
                            {
                              sender: "bot",
                              text:
                                "Thank you, " +
                                inputName.trim() +
                                "! Happy to meet you!",
                            },
                            {
                              sender: "bot",
                              text: `Elan is currently offline, but you can contact him via Email or WhatsApp below.`,
                            },
                          ]);
                          setInputName("");
                          setStep(3);
                          if (inputRef.current) inputRef.current.focus();
                        }
                      }}
                    >
                      <input
                        type="text"
                        className="flex-1 bg-transparent outline-none px-2"
                        placeholder="Your name..."
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="px-4 py-1 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>

            {step === 3 && (
              <div className="flex flex-row items-center justify-end gap-2 mt-4 flex-wrap w-full">
                <a
                  href="mailto:elanchezhiyan.p@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 text-xs font-semibold"
                >
                  <Mail className="w-4 h-4" /> Email
                </a>
                <a
                  href="https://wa.me/919003123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white border border-green-500 text-xs font-semibold"
                >
                  WhatsApp
                </a>
                <a
                  href="tel:+919003123456"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-700 hover:bg-gray-800 text-white border border-gray-700 text-xs font-semibold"
                >
                  Phone
                </a>
              </div>
            )}
          </div>

          {step === 3 && (
            <div className="px-5 py-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-950 dark:to-gray-900 border-t border-blue-100 dark:border-gray-800">
              <Button
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="text-gray-600 dark:text-gray-400"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
