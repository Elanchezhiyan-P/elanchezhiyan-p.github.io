import React, { useState, useEffect } from "react";
import { X, Palette, Volume2, VolumeX, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThemeSettingsProps {
  onClose: () => void;
}

export const ThemeSettings: React.FC<ThemeSettingsProps> = ({ onClose }) => {
  const [themeColor, setThemeColor] = useState("blue");
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const savedThemeColor = localStorage.getItem("themeColor") || "blue";
    const savedAnimations = localStorage.getItem("animations") !== "false";
    const savedSound = localStorage.getItem("sound") === "true";

    setThemeColor(savedThemeColor);
    setAnimationsEnabled(savedAnimations);
    setSoundEnabled(savedSound);

    // Apply saved theme on load
    applyTheme(savedThemeColor);
  }, []);

  const applyTheme = (color: string) => {
    const root = document.documentElement;
    // Remove both theme classes first
    root.classList.remove("theme-blue", "theme-green");
    if (color === "green") {
      // Green neon theme
      root.style.setProperty("--primary", "142 69% 58%"); // Green primary
      root.style.setProperty("--primary-foreground", "355 7% 97%");
      root.classList.add("theme-green");
    } else {
      // Blue theme (default)
      root.style.setProperty("--primary", "217.2 91.2% 59.8%"); // Blue primary
      root.style.setProperty("--primary-foreground", "222.2 84% 4.9%");
      root.classList.add("theme-blue");
    }
  };

  const handleThemeColorChange = (color: string) => {
    setThemeColor(color);
    localStorage.setItem("themeColor", color);
    applyTheme(color);
  };

  const handleAnimationsToggle = () => {
    const newValue = !animationsEnabled;
    setAnimationsEnabled(newValue);
    localStorage.setItem("animations", newValue.toString());

    // Apply/remove animation classes from body
    if (newValue) {
      document.body.classList.remove("animations-disabled");
    } else {
      document.body.classList.add("animations-disabled");
    }
  };

  const handleSoundToggle = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    localStorage.setItem("sound", newValue.toString());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="glass rounded-lg p-6 w-full max-w-md mx-4 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <Palette className="w-5 h-5 mr-2" />
            Theme Settings
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Theme Color */}
          <div>
            <h3 className="font-medium mb-3">Theme Color</h3>
            <div className="flex space-x-3">
              <button
                onClick={() => handleThemeColorChange("blue")}
                className={`w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center transition-all ${
                  themeColor === "blue"
                    ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-white dark:ring-offset-gray-800"
                    : ""
                }`}
              >
                {themeColor === "blue" && (
                  <div className="w-4 h-4 bg-white rounded-full" />
                )}
              </button>
              <button
                onClick={() => handleThemeColorChange("green")}
                className={`w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center transition-all ${
                  themeColor === "green"
                    ? "ring-2 ring-green-400 ring-offset-2 ring-offset-white dark:ring-offset-gray-800"
                    : ""
                }`}
              >
                {themeColor === "green" && (
                  <div className="w-4 h-4 bg-white rounded-full" />
                )}
              </button>
            </div>
          </div>

          {/* Animations */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              <span className="font-medium">Animations</span>
            </div>
            <Button
              variant={animationsEnabled ? "default" : "outline"}
              size="sm"
              onClick={handleAnimationsToggle}
            >
              {animationsEnabled ? "Enabled" : "Disabled"}
            </Button>
          </div>

          {/* Sound Effects */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 mr-2" />
              ) : (
                <VolumeX className="w-5 h-5 mr-2" />
              )}
              <span className="font-medium">Sound Effects</span>
            </div>
            <Button
              variant={soundEnabled ? "default" : "outline"}
              size="sm"
              onClick={handleSoundToggle}
            >
              {soundEnabled ? "On" : "Off"}
            </Button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={onClose} className="w-full">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};
