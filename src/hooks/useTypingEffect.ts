/**
 * useTypingEffect
 *
 * Cycles through an array of strings with a typewriter effect.
 * Fully types each word, pauses, then deletes character-by-character,
 * before moving to the next word.
 */
import { useState, useEffect } from "react";

type Phase = "typing" | "pausing" | "deleting";

interface Options {
  typingSpeed?: number;   // ms per character while typing
  deletingSpeed?: number; // ms per character while deleting
  pauseTime?: number;     // ms to pause after fully typed
}

const useTypingEffect = (
  words: string[],
  { typingSpeed = 75, deletingSpeed = 40, pauseTime = 1800 }: Options = {}
) => {
  const [display, setDisplay]   = useState("");
  const [wordIdx, setWordIdx]   = useState(0);
  const [phase, setPhase]       = useState<Phase>("typing");

  useEffect(() => {
    const current = words[wordIdx] ?? "";

    // ── typing ────────────────────────────────────────────────────────────
    if (phase === "typing") {
      if (display === current) {
        const t = setTimeout(() => setPhase("deleting"), pauseTime);
        return () => clearTimeout(t);
      }
      const t = setTimeout(
        () => setDisplay(current.slice(0, display.length + 1)),
        typingSpeed
      );
      return () => clearTimeout(t);
    }

    // ── deleting ──────────────────────────────────────────────────────────
    if (phase === "deleting") {
      if (display === "") {
        setWordIdx((i) => (i + 1) % words.length);
        setPhase("typing");
        return;
      }
      const t = setTimeout(
        () => setDisplay(display.slice(0, -1)),
        deletingSpeed
      );
      return () => clearTimeout(t);
    }
  }, [display, phase, wordIdx, words, typingSpeed, deletingSpeed, pauseTime]);

  return { display, isTyping: phase === "typing" };
};

export default useTypingEffect;
