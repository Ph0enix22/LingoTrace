"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/* -------------------------------------------------------
   ICONS — one shared line-icon style (24x24, stroke-only,
   currentColor, round caps/joins) used everywhere an icon
   appears: score categories, panel headers, the mic button,
   chip checkmarks, and status glyphs. Nothing here mixes in
   emoji or a second icon style.
------------------------------------------------------- */

function Icon({
  children,
  className = "h-5 w-5",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

type IconProps = { className?: string };

function IconMic({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z" />
      <path d="M19 11a7 7 0 0 1-14 0" />
      <path d="M12 18v3" />
    </Icon>
  );
}

function IconSwap({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M3 12h18" />
      <path d="M16 7l5 5-5 5" />
      <path d="M8 7L3 12l5 5" />
    </Icon>
  );
}

function IconBookOpen({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M12 6.5c-1.6-1.3-3.9-1.8-6.5-1.8a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1c2.6 0 4.9.5 6.5 1.8 1.6-1.3 3.9-1.8 6.5-1.8a1 1 0 0 0 1-1v-11a1 1 0 0 0-1-1c-2.6 0-4.9.5-6.5 1.8Z" />
      <path d="M12 6.5v13" />
    </Icon>
  );
}

function IconMessageCircle({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </Icon>
  );
}

function IconCheckSquare({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </Icon>
  );
}

function IconGlobe({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.8 5.9 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.9-3.8-9s1.3-6.4 3.8-9Z" />
    </Icon>
  );
}

function IconTarget({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </Icon>
  );
}

function IconCheck({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </Icon>
  );
}

function IconCheckCircle({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </Icon>
  );
}

function IconVolume({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      <path d="M16.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 6a8.5 8.5 0 0 1 0 12" />
    </Icon>
  );
}

function IconClose({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </Icon>
  );
}

function IconShare({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="M8.2 10.7l7.6-4.4" />
      <path d="M8.2 13.3l7.6 4.4" />
    </Icon>
  );
}

function IconDownload({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M12 4v11" />
      <path d="M7.5 11.5L12 16l4.5-4.5" />
      <path d="M5 19.5h14" />
    </Icon>
  );
}

function IconTrendDown({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M7 7l10 10" />
      <path d="M17 9V17H9" />
    </Icon>
  );
}

function IconTrendUp({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M7 17L17 7" />
      <path d="M9 7h8v8" />
    </Icon>
  );
}

function IconMinus({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M6 12h12" />
    </Icon>
  );
}

function IconAlert({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M10.3 3.9 2.7 17.5A2 2 0 0 0 4.4 20.5h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </Icon>
  );
}

/* -------------------------------------------------------
   VOICE INPUT (Web Speech API) — minimal local typings so
   we don't need a @types package for an experimental API.
------------------------------------------------------- */

interface SpeechRecognitionResultLike {
  [index: number]: { transcript: string };
}

interface SpeechRecognitionEventLike extends Event {
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionErrorEventLike extends Event {
  error: string;
}

interface SpeechRecognitionLike extends EventTarget {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  }
}

// Maps our language picker labels to BCP-47 recognition locales.
const MIC_LANGUAGE_MAP: Record<string, string> = {
  English: "en-US",
  Hindi: "hi-IN",
  Kannada: "kn-IN",
  Tamil: "ta-IN",
  Telugu: "te-IN",
  Bengali: "bn-IN",
  Marathi: "mr-IN",
  Urdu: "ur-IN",
  Spanish: "es-ES",
  French: "fr-FR",
  German: "de-DE",
  Portuguese: "pt-PT",
  "Mandarin Chinese": "zh-CN",
  Japanese: "ja-JP",
  Korean: "ko-KR",
  Arabic: "ar-SA",
  Russian: "ru-RU",
  Italian: "it-IT",
};

function MicButton({
  targetLanguage,
  onTranscript,
}: {
  targetLanguage: string;
  onTranscript: (text: string) => void;
}) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    // Feature detection has to happen post-mount, not during render: `window`
    // doesn't exist on the server, and computing this during the client's
    // first render (e.g. via a useState initializer) would mismatch the
    // server-rendered HTML and trigger a hydration error.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(
      typeof window !== "undefined" &&
        !!(window.SpeechRecognition || window.webkitSpeechRecognition)
    );

    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  if (!supported) return null;

  function handleClick() {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Ctor) return;

    const recognition = new Ctor();
    recognition.lang = MIC_LANGUAGE_MAP[targetLanguage] ?? "";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      if (transcript) onTranscript(transcript);
      setListening(false);
    };

    recognition.onerror = (event) => {
      setPermissionError(
        event.error === "not-allowed" || event.error === "permission-denied"
          ? "Microphone access was denied. You can still type your answer."
          : "Voice input didn't catch that — please try again or type instead."
      );
      setListening(false);
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    setPermissionError(null);
    setListening(true);
    recognition.start();
  }

  return (
    <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleClick}
        aria-label={listening ? "Stop voice input" : "Start voice input"}
        title={listening ? "Stop voice input" : "Speak your answer"}
        className={`flex h-11 w-11 items-center justify-center rounded-full shadow-warm-sm ring-1 transition duration-150 ease-out hover:scale-[1.02] ${
          listening
            ? "bg-rose-500 text-white ring-rose-500 animate-pulse"
            : "bg-white text-stone-500 ring-stone-200 hover:text-stone-800 hover:ring-stone-300"
        }`}
      >
        <IconMic className="h-5 w-5" />
      </button>

      {listening && (
        <span className="flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600 shadow-warm-sm">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-rose-500" />
          Listening...
        </span>
      )}

      {!listening && permissionError && (
        <span className="max-w-[220px] rounded-xl bg-amber-50 px-3 py-2 text-right text-xs font-medium text-amber-700 shadow-warm-sm">
          {permissionError}
        </span>
      )}
    </div>
  );
}

type Screen = "landing" | "profile" | "challenge" | "dashboard" | "comparison";

type InterferenceScores = {
  word_order: number;
  vocabulary: number;
  register: number;
  grammar: number;
};

type WordBreakdown = {
  original: string;
  meaning: string;
  pronunciation: string;
  grammatical_role: string;
};

type HighlightedToken = {
  segment: string;
  issue_type: string;
  suggestion: string;
  explanation: string;
};

type AnalysisResult = {
  natural_translation: string;
  literal_translation: string;
  pronunciation: string;

  word_breakdown: WordBreakdown[];

  interference_scores: InterferenceScores;

  primary_source_language: string;
  source_language_confidence: number;

  explanation: string;

  highlighted_tokens: HighlightedToken[];

  natural_alternatives: string[];

  key_takeaway: string;

  targeted_exercise: string;

  practice_question: string;
  practice_options: string[];
  practice_answer: number;
  practice_explanation: string;
};

const LANGUAGES = [
  "English",
  "Hindi",
  "Kannada",
  "Tamil",
  "Telugu",
  "Bengali",
  "Marathi",
  "Urdu",
  "Spanish",
  "French",
  "German",
  "Portuguese",
  "Mandarin Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Russian",
  "Italian",
];

type Scenario = {
  id: string;
  label: string;
  prompt: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "introduce",
    label: "New friend",
    prompt: "Introduce yourself to a new friend.",
  },
  {
    id: "late",
    label: "Running late",
    prompt: "You just arrived late to a friend's house — explain why.",
  },
  {
    id: "restaurant",
    label: "Lost in translation",
    prompt: "You're ordering food and the waiter doesn't understand you — try again.",
  },
  {
    id: "parents",
    label: "Meeting the parents",
    prompt: "You're meeting your partner's parents for the first time.",
  },
];

type Sample = {
  label: string;
  knownLanguages: string[];
  targetLanguage: string;
  sentence: string;
};

const SAMPLES: Sample[] = [
  {
    label: "English + Hindi → Korean",
    knownLanguages: ["English", "Hindi"],
    targetLanguage: "Korean",
    sentence: "나는 매우 배고픈입니다 그리고 나는 밥을 먹고 싶다",
  },
  {
    label: "English + Tamil → Japanese",
    knownLanguages: ["English", "Tamil"],
    targetLanguage: "Japanese",
    sentence: "わたしは とても うれしい です そして わたしは がっこうに いきたい です",
  },
  {
    label: "English + Spanish → French",
    knownLanguages: ["English", "Spanish"],
    targetLanguage: "French",
    sentence: "Je suis très excité pour voir mes amis nouveaux demain.",
  },
];

function overallAverage(scores: InterferenceScores): number {
  return (
    (scores.word_order + scores.vocabulary + scores.register + scores.grammar) /
    4
  );
}

const SCORE_META: Record<
  keyof InterferenceScores,
  {
    label: string;
    icon: (props: IconProps) => ReactNode;
  }
> = {
  word_order: {
    label: "Word Order",
    icon: IconSwap,
  },
  vocabulary: {
    label: "Vocabulary",
    icon: IconBookOpen,
  },
  register: {
    label: "Register",
    icon: IconMessageCircle,
  },
  grammar: {
    label: "Grammar",
    icon: IconCheckSquare,
  },
};

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");

  const [knownLanguages, setKnownLanguages] = useState<string[]>([]);
  const [targetLanguage, setTargetLanguage] = useState<string | null>(null);
  const [sentence, setSentence] = useState("");
  const [scenario, setScenario] = useState<Scenario>(SCENARIOS[0]);

  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [sessionHistory, setSessionHistory] = useState<InterferenceScores[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [compareMode, setCompareMode] = useState(false);
  const [compareLanguages, setCompareLanguages] = useState<string[]>([]);
  const [comparison, setComparison] = useState<{
    a: AnalysisResult;
    b: AnalysisResult;
  } | null>(null);
  const [comparisonLoading, setComparisonLoading] = useState(false);
  const [comparisonError, setComparisonError] = useState<string | null>(null);

  function toggleKnownLanguage(lang: string) {
    setKnownLanguages((prev) =>
      prev.includes(lang)
        ? prev.filter((l) => l !== lang)
        : [...prev, lang]
    );

    if (targetLanguage === lang) {
      setTargetLanguage(null);
    }
  }

  async function handleAnalyze() {
    if (!sentence.trim()) return;

    setScreen("dashboard");
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          knownLanguages,
          targetLanguage,
          sentence,
          scenario: scenario.prompt,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.error || "The analysis request failed."
        );
      }

      const result = data as AnalysisResult;
      setAnalysis(result);
      setSessionHistory((prev) => [...prev, result.interference_scores]);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong analyzing your sentence."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleUseSample(sample: Sample) {
    setKnownLanguages(sample.knownLanguages);
    setTargetLanguage(sample.targetLanguage);
    setSentence(sample.sentence);
  }

  function handleToggleCompareMode() {
    setCompareMode((prev) => !prev);
    setCompareLanguages([]);
    setComparison(null);
    setComparisonError(null);
  }

  function toggleCompareLanguage(lang: string) {
    setCompareLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  }

  async function handleCompare() {
    if (!sentence.trim() || compareLanguages.length === 0) return;

    setScreen("comparison");
    setComparisonLoading(true);
    setComparisonError(null);
    setComparison(null);

    try {
      const body = (languages: string[]) =>
        JSON.stringify({
          knownLanguages: languages,
          targetLanguage,
          sentence,
          scenario: scenario.prompt,
        });

      const [resA, resB] = await Promise.all([
        fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: body(knownLanguages),
        }),
        fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: body(compareLanguages),
        }),
      ]);

      const [dataA, dataB] = await Promise.all([resA.json(), resB.json()]);

      if (!resA.ok || !resB.ok) {
        throw new Error(
          dataA?.error || dataB?.error || "The comparison request failed."
        );
      }

      setComparison({
        a: dataA as AnalysisResult,
        b: dataB as AnalysisResult,
      });
    } catch (err) {
      console.error(err);
      setComparisonError(
        err instanceof Error
          ? err.message
          : "Something went wrong comparing profiles."
      );
    } finally {
      setComparisonLoading(false);
    }
  }

  function handleTryAnother() {
    setSentence("");
    setAnalysis(null);
    setError(null);
    setComparison(null);
    setComparisonError(null);
    setScreen("challenge");
  }

  function handleStartOver() {
    setKnownLanguages([]);
    setTargetLanguage(null);
    setSentence("");
    setScenario(SCENARIOS[0]);
    setAnalysis(null);
    setSessionHistory([]);
    setError(null);
    setCompareMode(false);
    setCompareLanguages([]);
    setComparison(null);
    setComparisonError(null);
    setScreen("landing");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8f7f3] text-stone-900">
      {/* Background decoration */}
      <div className="pointer-events-none fixed -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-teal-200/30 blur-3xl" />

      <div className="pointer-events-none fixed -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-rose-200/30 blur-3xl" />

      <div className="pointer-events-none fixed bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-amber-200/20 blur-3xl" />

      <header className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-10">
        <button
          onClick={handleStartOver}
          className="flex items-center gap-2 text-sm font-bold tracking-tight text-stone-800"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-900 text-xs text-white">
            LT
          </span>

          LingoTrace
        </button>

        {screen !== "landing" && (
          <span className="hidden rounded-full bg-white px-4 py-2 text-xs font-semibold text-stone-500 shadow-warm-sm ring-1 ring-stone-200 sm:block">
            Cross-Linguistic Learning
          </span>
        )}
      </header>

      <main className="relative z-10 flex min-h-[calc(100vh-90px)] flex-col items-center px-5 pb-16 sm:px-8">
        {screen === "landing" && (
          <Landing onStart={() => setScreen("profile")} />
        )}

        {screen === "profile" && (
          <Profile
            knownLanguages={knownLanguages}
            targetLanguage={targetLanguage}
            onToggleKnown={toggleKnownLanguage}
            onSelectTarget={setTargetLanguage}
            onBack={() => setScreen("landing")}
            onContinue={() => setScreen("challenge")}
          />
        )}

        {screen === "challenge" && targetLanguage && (
          <Challenge
            targetLanguage={targetLanguage}
            sentence={sentence}
            onChangeSentence={setSentence}
            scenario={scenario}
            onSelectScenario={setScenario}
            onBack={() => setScreen("profile")}
            onAnalyze={handleAnalyze}
            onUseSample={handleUseSample}
            compareMode={compareMode}
            onToggleCompareMode={handleToggleCompareMode}
            compareLanguages={compareLanguages}
            onToggleCompareLanguage={toggleCompareLanguage}
            onCompare={handleCompare}
          />
        )}

        {screen === "dashboard" && targetLanguage && (
          <Dashboard
            sentence={sentence}
            targetLanguage={targetLanguage}
            loading={loading}
            error={error}
            analysis={analysis}
            sessionHistory={sessionHistory}
            onRetry={handleAnalyze}
            onTryAnother={handleTryAnother}
            onStartOver={handleStartOver}
          />
        )}

        {screen === "comparison" && targetLanguage && (
          <ComparisonDashboard
            sentence={sentence}
            targetLanguage={targetLanguage}
            languagesA={knownLanguages}
            languagesB={compareLanguages}
            loading={comparisonLoading}
            error={comparisonError}
            comparison={comparison}
            onTryAnother={handleTryAnother}
            onStartOver={handleStartOver}
          />
        )}
      </main>
    </div>
  );
}

/* -------------------------------------------------------
   LANDING
------------------------------------------------------- */

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex w-full max-w-5xl flex-1 flex-col items-center justify-center py-12 text-center">
      <div className="mb-7 rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-sm font-semibold text-teal-700 shadow-warm-sm">
        LingoTrace · Language Transfer Intelligence
      </div>

      <h1 className="font-display max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.02em] text-stone-900 sm:text-7xl">
        Your other languages are
        <span className="block bg-gradient-to-r from-orange-500 via-rose-500 to-violet-500 bg-clip-text text-transparent">
          already in the room.
        </span>
      </h1>

      <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-500 sm:text-xl">
        LingoTrace detects how the languages you already know
        may influence the way you write in a new language.
      </p>

      <div className="mt-9 flex flex-wrap justify-center gap-2 text-sm text-stone-400">
        <span className="rounded-full bg-white px-4 py-2 shadow-warm-sm ring-1 ring-stone-200">
          English
        </span>
        <span className="rounded-full bg-white px-4 py-2 shadow-warm-sm ring-1 ring-stone-200">
          हिन्दी
        </span>
        <span className="rounded-full bg-white px-4 py-2 shadow-warm-sm ring-1 ring-stone-200">
          ಕನ್ನಡ
        </span>
        <span className="rounded-full bg-white px-4 py-2 shadow-warm-sm ring-1 ring-stone-200">
          中文
        </span>
        <span className="rounded-full bg-white px-4 py-2 shadow-warm-sm ring-1 ring-stone-200">
          日本語
        </span>
      </div>

      <button
        onClick={onStart}
        className="mt-10 rounded-2xl bg-stone-900 px-9 py-4 text-base font-bold text-white shadow-warm-md transition duration-150 ease-out hover:scale-[1.02] hover:shadow-warm-lg"
      >
        Start tracing
        <span className="ml-3">→</span>
      </button>
    </div>
  );
}

/* -------------------------------------------------------
   LANGUAGE PROFILE
------------------------------------------------------- */

function LanguageChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ease-out ${
        selected
          ? "bg-stone-900 text-white shadow-warm-md"
          : "bg-white text-stone-600 shadow-warm-sm ring-1 ring-stone-200 hover:-translate-y-0.5 hover:ring-stone-300"
      }`}
    >
      {selected && <IconCheck className="h-3.5 w-3.5" />}
      {label}
    </button>
  );
}

function Profile({
  knownLanguages,
  targetLanguage,
  onToggleKnown,
  onSelectTarget,
  onBack,
  onContinue,
}: {
  knownLanguages: string[];
  targetLanguage: string | null;
  onToggleKnown: (lang: string) => void;
  onSelectTarget: (lang: string) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const targetOptions = LANGUAGES.filter(
    (lang) => !knownLanguages.includes(lang)
  );

  const canContinue =
    knownLanguages.length > 0 && !!targetLanguage;

  return (
    <div className="flex w-full max-w-4xl flex-1 flex-col justify-center py-10">
      <div className="mb-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
          Step 01 · Your language profile
        </p>

        <h2 className="font-display text-4xl font-black tracking-tight text-stone-900">
          Tell us where your language journey starts.
        </h2>

        <p className="mt-3 max-w-2xl text-stone-500">
          We use your existing languages as possible sources of
          linguistic transfer.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-7 shadow-warm-sm ring-1 ring-stone-200">
          <div className="mb-5">
            <IconGlobe className="h-6 w-6 text-teal-600" />

            <h3 className="font-display mt-4 text-xl font-bold">
              Languages you know
            </h3>

            <p className="mt-1 text-sm text-stone-500">
              Select everything that applies.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((lang) => (
              <LanguageChip
                key={lang}
                label={lang}
                selected={knownLanguages.includes(lang)}
                onClick={() => onToggleKnown(lang)}
              />
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-stone-900 p-7 text-white shadow-warm-dark">
          <div className="mb-5">
            <IconTarget className="h-6 w-6 text-white/80" />

            <h3 className="font-display mt-4 text-xl font-bold">
              Your target language
            </h3>

            <p className="mt-1 text-sm text-stone-400">
              What are you learning?
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {targetOptions.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onSelectTarget(lang)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ease-out ${
                  targetLanguage === lang
                    ? "bg-white text-stone-900"
                    : "bg-white/10 text-stone-300 hover:bg-white/20"
                }`}
              >
                {targetLanguage === lang && <IconCheck className="h-3.5 w-3.5" />}
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-9 flex items-center justify-between">
        <button
          onClick={onBack}
          className="font-semibold text-stone-400 transition-colors duration-150 hover:text-stone-700"
        >
          ← Back
        </button>

        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-7 py-3.5 font-bold text-white shadow-warm-md transition duration-150 ease-out hover:scale-[1.02] hover:shadow-warm-lg disabled:cursor-not-allowed disabled:scale-100 disabled:from-stone-200 disabled:to-stone-200 disabled:text-stone-400 disabled:shadow-none"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   CHALLENGE
------------------------------------------------------- */

function ScenarioCard({
  scenario,
  selected,
  onClick,
}: {
  scenario: Scenario;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl p-4 text-left transition-colors duration-300 ease-out ${
        selected
          ? "bg-stone-900 text-white shadow-warm-md"
          : "bg-white text-stone-700 shadow-warm-sm ring-1 ring-stone-200 hover:ring-stone-300"
      }`}
    >
      <span
        className={`text-sm font-bold ${
          selected ? "text-white" : "text-stone-900"
        }`}
      >
        {scenario.label}
      </span>

      <p
        className={`mt-1 line-clamp-2 text-xs leading-5 ${
          selected ? "text-stone-300" : "text-stone-500"
        }`}
      >
        {scenario.prompt}
      </p>
    </button>
  );
}

function Challenge({
  targetLanguage,
  sentence,
  onChangeSentence,
  scenario,
  onSelectScenario,
  onBack,
  onAnalyze,
  onUseSample,
  compareMode,
  onToggleCompareMode,
  compareLanguages,
  onToggleCompareLanguage,
  onCompare,
}: {
  targetLanguage: string;
  sentence: string;
  onChangeSentence: (s: string) => void;
  scenario: Scenario;
  onSelectScenario: (scenario: Scenario) => void;
  onBack: () => void;
  onAnalyze: () => void;
  onUseSample: (sample: Sample) => void;
  compareMode: boolean;
  onToggleCompareMode: () => void;
  compareLanguages: string[];
  onToggleCompareLanguage: (lang: string) => void;
  onCompare: () => void;
}) {
  const compareOptions = LANGUAGES.filter((lang) => lang !== targetLanguage);
  const canCompare = sentence.trim().length > 0 && compareLanguages.length > 0;
  return (
    <div className="flex w-full max-w-3xl flex-1 flex-col justify-center py-10">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
        Step 02 · Write naturally
      </p>

      <h2 className="font-display text-4xl font-black tracking-tight">
        Let&apos;s see how your languages show up.
      </h2>

      <p className="mt-3 text-stone-500">
        Don&apos;t overthink it. Write the sentence the way
        you would naturally say it.
      </p>

      <div className="mt-6">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
          Pick a scenario:
        </span>

        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {SCENARIOS.map((s) => (
            <ScenarioCard
              key={s.id}
              scenario={s}
              selected={scenario.id === s.id}
              onClick={() => onSelectScenario(s)}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
          Try a sample:
        </span>
        {SAMPLES.map((sample) => (
          <button
            key={sample.label}
            type="button"
            onClick={() => onUseSample(sample)}
            className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-600 shadow-warm-sm ring-1 ring-stone-200 transition duration-150 ease-out hover:scale-[1.02] hover:ring-teal-300"
          >
            {sample.label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <button
          type="button"
          onClick={onToggleCompareMode}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-colors duration-300 ease-out ${
            compareMode
              ? "bg-stone-900 text-white shadow-warm-sm"
              : "bg-white text-stone-600 shadow-warm-sm ring-1 ring-stone-200 hover:ring-stone-300"
          }`}
        >
          <IconSwap className="h-3.5 w-3.5" />
          {compareMode
            ? "Comparing against a second profile"
            : "Compare with a second profile"}
        </button>

        {compareMode && (
          <div className="mt-3 animate-[fade-slide-in_250ms_ease-out] rounded-2xl bg-white p-5 shadow-warm-sm ring-1 ring-stone-200">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Second profile&apos;s known languages
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {compareOptions.map((lang) => (
                <LanguageChip
                  key={lang}
                  label={lang}
                  selected={compareLanguages.includes(lang)}
                  onClick={() => onToggleCompareLanguage(lang)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-warm-lg ring-1 ring-stone-200">
        <div className="border-b border-stone-100 bg-stone-50 px-7 py-5">
          <span className="rounded-full bg-teal-100 px-3 py-1.5 text-xs font-bold text-teal-700">
            {targetLanguage}
          </span>

          <p
            key={scenario.id}
            className="mt-4 animate-[fade-slide-in_300ms_ease-out] text-lg font-bold"
          >
            {scenario.prompt}
          </p>
        </div>

        <div className="relative">
          <textarea
            value={sentence}
            onChange={(e) => onChangeSentence(e.target.value)}
            placeholder={`Write your response in ${targetLanguage}...`}
            rows={7}
            className="w-full resize-none border-0 p-7 pr-20 text-xl outline-none placeholder:text-stone-300"
            autoFocus
          />
          <MicButton targetLanguage={targetLanguage} onTranscript={onChangeSentence} />
        </div>

        <div className="flex items-center justify-between border-t border-stone-100 px-7 py-5">
          <span className="text-xs text-stone-400">
            {sentence.length} characters
          </span>

          {compareMode ? (
            <button
              onClick={onCompare}
              disabled={!canCompare}
              className="rounded-xl bg-stone-900 px-7 py-3 font-bold text-white transition duration-150 ease-out hover:scale-[1.02] hover:shadow-warm-md disabled:cursor-not-allowed disabled:scale-100 disabled:bg-stone-200 disabled:text-stone-400 disabled:shadow-none"
            >
              Compare profiles →
            </button>
          ) : (
            <button
              onClick={onAnalyze}
              disabled={!sentence.trim()}
              className="rounded-xl bg-stone-900 px-7 py-3 font-bold text-white transition duration-150 ease-out hover:scale-[1.02] hover:shadow-warm-md disabled:cursor-not-allowed disabled:scale-100 disabled:bg-stone-200 disabled:text-stone-400 disabled:shadow-none"
            >
              Trace my sentence →
            </button>
          )}
        </div>
      </div>

      <button
        onClick={onBack}
        className="mt-6 w-fit font-semibold text-stone-400 transition-colors duration-150 hover:text-stone-700"
      >
        ← Back
      </button>
    </div>
  );
}

/* -------------------------------------------------------
   SCORE
------------------------------------------------------- */

function ScoreCard({
  scoreKey,
  value,
}: {
  scoreKey: keyof InterferenceScores;
  value: number;
}) {
  const meta = SCORE_META[scoreKey];
  const ScoreIcon = meta.icon;

  const score = Math.max(
    0,
    Math.min(100, Math.round(value || 0))
  );

  let level = "Minimal";

  if (score >= 70) level = "Strong";
  else if (score >= 40) level = "Moderate";
  else if (score >= 15) level = "Low";

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-stone-100 text-stone-700">
            <ScoreIcon className="h-4 w-4" />
          </div>

          <p className="text-sm font-bold text-stone-700">
            {meta.label}
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-black">{score}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
            {level}
          </p>
        </div>
      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-stone-100">
        <div
          className="h-full origin-left animate-[fill-bar_550ms_ease-out] rounded-full bg-gradient-to-r from-teal-400 via-orange-400 to-rose-500"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   SHARE CARD — renders a clean, self-contained PNG summary
   via the Canvas API. No image-export library: canvas ships
   in every browser, so this stays dependency-free.
------------------------------------------------------- */

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Wraps on spaces like normal text, but falls back to a hard
// character break for any single "word" wider than maxWidth
// (matters for scripts like Japanese that may have no spaces).
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";

  function breakByChar(word: string): string {
    let chunk = "";
    for (const ch of word) {
      const test = chunk + ch;
      if (ctx.measureText(test).width > maxWidth && chunk) {
        lines.push(chunk);
        chunk = ch;
      } else {
        chunk = test;
      }
    }
    return chunk;
  }

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width <= maxWidth) {
      line = testLine;
      continue;
    }
    if (line) {
      lines.push(line);
      line = "";
    }
    line =
      ctx.measureText(word).width <= maxWidth ? word : breakByChar(word);
  }
  if (line) lines.push(line);
  return lines;
}

function drawLines(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  y: number,
  lineHeight: number
): number {
  let cursorY = y;
  for (const line of lines) {
    ctx.fillText(line, x, cursorY);
    cursorY += lineHeight;
  }
  return cursorY;
}

type ShareCardData = {
  sentence: string;
  targetLanguage: string;
  scores: InterferenceScores;
  keyTakeaway: string;
};

async function drawShareCard(canvas: HTMLCanvasElement, data: ShareCardData) {
  const width = 1080;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  await document.fonts.ready;

  const rootStyle = getComputedStyle(document.documentElement);
  const displayFont = rootStyle.getPropertyValue("--font-fraunces") || "serif";
  const sansFont =
    rootStyle.getPropertyValue("--font-geist-sans") || "sans-serif";

  const pad = 64;
  const cardX = pad;
  const cardY = pad;
  const cardW = width - pad * 2;
  const contentW = cardW - 120;

  // First pass: measure only, so the canvas height fits this specific
  // card's content instead of leaving a fixed, often-empty gap below.
  ctx.font = `700 46px ${displayFont}`;
  const sentenceLines = wrapText(ctx, `“${data.sentence}”`, contentW);

  ctx.font = `700 24px ${displayFont}`;
  const takeawayLines = wrapText(ctx, data.keyTakeaway, contentW - 64);
  const takeawayBoxHeight = 64 + takeawayLines.length * 32;

  const contentHeight =
    76 + // header top offset
    56 + // brand row
    84 + // target-language badge row
    sentenceLines.length * 56 +
    24 + // gap after sentence
    4 * 78 + // 4 score rows (label + track + gap)
    14 + // gap before takeaway box
    takeawayBoxHeight +
    76; // footer line + bottom breathing room

  const cardH = contentHeight + 40;
  const height = cardH + pad * 2;
  canvas.width = width;
  canvas.height = height;

  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#ccfbf1");
  bg.addColorStop(0.5, "#fdf6ec");
  bg.addColorStop(1, "#fecdd3");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.shadowColor = "rgba(194, 65, 12, 0.25)";
  ctx.shadowBlur = 60;
  ctx.shadowOffsetY = 30;
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, cardX, cardY, cardW, cardH, 40);
  ctx.fill();
  ctx.restore();

  const contentX = cardX + 60;
  let cursorY = cardY + 76;

  ctx.fillStyle = "#1c1917";
  roundRect(ctx, contentX, cursorY - 38, 56, 56, 14);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.textBaseline = "middle";
  ctx.font = `700 22px ${sansFont}`;
  ctx.fillText("LT", contentX + 15, cursorY - 10);
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = "#1c1917";
  ctx.font = `700 30px ${sansFont}`;
  ctx.fillText("LingoTrace", contentX + 74, cursorY);

  cursorY += 56;

  ctx.fillStyle = "#99f6e4";
  roundRect(ctx, contentX, cursorY, 210, 44, 22);
  ctx.fill();
  ctx.fillStyle = "#0f766e";
  ctx.font = `700 17px ${sansFont}`;
  ctx.textBaseline = "middle";
  ctx.fillText(`Learning ${data.targetLanguage}`, contentX + 18, cursorY + 23);
  ctx.textBaseline = "alphabetic";

  cursorY += 84;

  ctx.fillStyle = "#1c1917";
  ctx.font = `700 46px ${displayFont}`;
  cursorY = drawLines(ctx, sentenceLines, contentX, cursorY, 56) + 24;

  const scoreEntries: [keyof InterferenceScores, string][] = [
    ["word_order", "Word Order"],
    ["vocabulary", "Vocabulary"],
    ["register", "Register"],
    ["grammar", "Grammar"],
  ];

  for (const [key, label] of scoreEntries) {
    const value = Math.max(0, Math.min(100, Math.round(data.scores[key] || 0)));

    ctx.fillStyle = "#44403c";
    ctx.font = `700 20px ${sansFont}`;
    ctx.fillText(label, contentX, cursorY);

    ctx.fillStyle = "#1c1917";
    ctx.font = `800 20px ${sansFont}`;
    const valueText = String(value);
    ctx.fillText(valueText, contentX + contentW - ctx.measureText(valueText).width, cursorY);

    cursorY += 16;

    ctx.fillStyle = "#f1f5f4";
    roundRect(ctx, contentX, cursorY, contentW, 16, 8);
    ctx.fill();

    const barGradient = ctx.createLinearGradient(contentX, 0, contentX + contentW, 0);
    barGradient.addColorStop(0, "#2dd4bf");
    barGradient.addColorStop(0.5, "#fb923c");
    barGradient.addColorStop(1, "#f43f5e");
    ctx.fillStyle = barGradient;
    roundRect(ctx, contentX, cursorY, Math.max(16, (contentW * value) / 100), 16, 8);
    ctx.fill();

    cursorY += 46;
  }

  cursorY += 14;

  ctx.fillStyle = "#fef3c7";
  roundRect(ctx, contentX, cursorY, contentW, takeawayBoxHeight, 24);
  ctx.fill();

  ctx.fillStyle = "#b45309";
  ctx.font = `700 14px ${sansFont}`;
  ctx.fillText("REMEMBER THIS", contentX + 32, cursorY + 34);

  ctx.fillStyle = "#1c1917";
  ctx.font = `700 24px ${displayFont}`;
  drawLines(ctx, takeawayLines, contentX + 32, cursorY + 68, 32);

  ctx.fillStyle = "#a8a29e";
  ctx.font = `600 16px ${sansFont}`;
  ctx.fillText(
    "Detected with LingoTrace — cross-linguistic interference analysis",
    contentX,
    cardY + cardH - 40
  );
}

function ShareModal({
  sentence,
  targetLanguage,
  analysis,
  onClose,
}: {
  sentence: string;
  targetLanguage: string;
  analysis: AnalysisResult;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    drawShareCard(canvas, {
      sentence,
      targetLanguage,
      scores: analysis.interference_scores,
      keyTakeaway: analysis.key_takeaway,
    }).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [sentence, targetLanguage, analysis]);

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "lingotrace-result.png";
    a.click();
  }

  // Rendered via a portal straight into <body> — this modal is `fixed`,
  // but a `fixed` element nested inside an ancestor that establishes its
  // own stacking context (here, <main className="relative z-10">) is
  // still capped by that ancestor's z-index when compared to unrelated
  // siblings like <header className="relative z-20">. No z-index value
  // on the modal itself can escape that; a portal sidesteps it entirely.
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-6 backdrop-blur-sm animate-[fade-slide-in_200ms_ease-out]"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[2rem] bg-white p-6 shadow-warm-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-xl font-black">Share your result</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-stone-400 transition-colors duration-150 hover:text-stone-800"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl ring-1 ring-stone-200">
          <canvas ref={canvasRef} className="block w-full" />
        </div>

        {!ready && (
          <p className="mt-3 text-center text-xs text-stone-400">
            Rendering your card...
          </p>
        )}

        <button
          onClick={handleDownload}
          disabled={!ready}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-6 py-3 font-bold text-white transition duration-150 ease-out hover:scale-[1.02] hover:shadow-warm-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          <IconDownload className="h-4 w-4" />
          Download image
        </button>

        <p className="mt-3 text-center text-xs text-stone-400">
          Or screenshot this card directly.
        </p>
      </div>
    </div>,
    document.body
  );
}

/* -------------------------------------------------------
   DASHBOARD
------------------------------------------------------- */

function SessionRecap({ sessionHistory }: { sessionHistory: InterferenceScores[] }) {
  if (sessionHistory.length < 2) return null;

  const current = overallAverage(sessionHistory[sessionHistory.length - 1]);
  const previous = overallAverage(sessionHistory[sessionHistory.length - 2]);
  const delta = Math.round(current - previous);

  let TrendIcon = IconMinus;
  let trendColor = "text-stone-500";
  let trendText = "About the same as your last sentence.";

  if (delta <= -3) {
    TrendIcon = IconTrendDown;
    trendColor = "text-emerald-600";
    trendText = `Down ${Math.abs(delta)} pts vs your last sentence — nice.`;
  } else if (delta >= 3) {
    TrendIcon = IconTrendUp;
    trendColor = "text-amber-600";
    trendText = `Up ${delta} pts vs your last sentence.`;
  }

  return (
    <div className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl bg-white px-6 py-4 shadow-warm-sm ring-1 ring-stone-200">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-xs font-black text-teal-700">
          {sessionHistory.length}
        </span>
        <p className="text-sm font-bold text-stone-700">
          sentences analyzed this session
        </p>
      </div>

      <div className="hidden h-4 w-px bg-stone-200 sm:block" />

      <div className={`flex items-center gap-1.5 text-sm font-bold ${trendColor}`}>
        <TrendIcon className="h-4 w-4" />
        {trendText}
      </div>
    </div>
  );
}

function Dashboard({
  sentence,
  targetLanguage,
  loading,
  error,
  analysis,
  sessionHistory,
  onRetry,
  onTryAnother,
  onStartOver,
}: {
  sentence: string;
  targetLanguage: string;
  loading: boolean;
  error: string | null;
  analysis: AnalysisResult | null;
  sessionHistory: InterferenceScores[];
  onRetry: () => void;
  onTryAnother: () => void;
  onStartOver: () => void;
}) {
  const [selectedIssue, setSelectedIssue] =
    useState<HighlightedToken | null>(null);

  const [miniAnswer, setMiniAnswer] = useState<number | null>(null);
  const [miniChecked, setMiniChecked] = useState(false);

  const [selectedAnswer, setSelectedAnswer] =
    useState<number | null>(null);

  const [checked, setChecked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  if (loading) {
  const miniQuestion =
    targetLanguage === "Mandarin Chinese"
      ? "Which English sentence sounds more natural?"
      : targetLanguage === "Japanese"
      ? "Which sentence sounds more natural in everyday conversation?"
      : targetLanguage === "Spanish"
      ? "Which sentence sounds more natural?"
      : "Which sentence sounds more natural?";

  const miniOptions =
    targetLanguage === "Mandarin Chinese"
      ? [
          "I very like this.",
          "I really like this.",
          "I like very this.",
        ]
      : targetLanguage === "Japanese"
      ? [
          "I am like this.",
          "I really like this.",
          "Really I like this.",
        ]
      : targetLanguage === "Spanish"
      ? [
          "I really like this.",
          "I like really this.",
          "Really I this like.",
        ]
      : [
          "I very like this.",
          "I really like this.",
          "I like very this.",
        ];

  const correctMiniAnswer = 1;

  return (
    <div className="flex w-full max-w-4xl flex-1 flex-col justify-center py-8">
      {/* ------------------------------------------------
          LOADING HEADER
      ------------------------------------------------ */}

      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-stone-900 text-xl font-black text-white shadow-xl shadow-stone-300">
          <span className="animate-pulse">LT</span>
        </div>

        <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-teal-600">
          LingoTrace is working
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          Tracing your language fingerprint...
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-stone-500">
          While we compare your sentence with the languages you
          know, try this tiny challenge.
        </p>
      </div>

      {/* ------------------------------------------------
          PROGRESS
      ------------------------------------------------ */}

      <div className="mx-auto mt-8 w-full max-w-2xl">
        <div className="flex items-center justify-between text-xs font-bold text-stone-400">
          <span>Analyzing</span>
          <span className="animate-pulse">Working...</span>
        </div>

        <div className="mt-2 h-3 overflow-hidden rounded-full bg-stone-200">
          <div className="h-full w-[72%] animate-[loadingBar_2.8s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-teal-400 via-orange-400 to-rose-500" />
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          <div className="text-center text-[10px] font-bold text-teal-600">
            <div className="mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-full bg-teal-100">
              ✓
            </div>
            Sentence
          </div>

          <div className="text-center text-[10px] font-bold text-teal-600">
            <div className="mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-full bg-teal-100">
              ✓
            </div>
            Vocabulary
          </div>

          <div className="text-center text-[10px] font-bold text-orange-500">
            <div className="mx-auto mb-1 flex h-7 w-7 animate-pulse items-center justify-center rounded-full bg-orange-100">
              •
            </div>
            Grammar
          </div>

          <div className="text-center text-[10px] font-bold text-stone-300">
            <div className="mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-full bg-stone-100">
              ○
            </div>
            Insights
          </div>
        </div>
      </div>

      {/* ------------------------------------------------
          INTERACTIVE MINI CHALLENGE
      ------------------------------------------------ */}

      <div className="mx-auto mt-8 w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-stone-200">
        <div className="border-b border-stone-100 bg-gradient-to-r from-teal-50 to-orange-50 px-6 py-5 sm:px-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-600">
                While we trace
              </p>

              <h3 className="mt-1 text-xl font-black text-stone-900">
                Quick language challenge
              </h3>
            </div>

            <div className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-stone-500 shadow-sm">
              +1 learning point
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-7">
          <p className="text-sm font-bold text-stone-400">
            {targetLanguage}
          </p>

          <p className="mt-2 text-lg font-bold leading-7 text-stone-800">
            {miniQuestion}
          </p>

          <div className="mt-5 grid gap-3">
            {miniOptions.map((option, index) => {
              const isSelected = miniAnswer === index;
              const isCorrect =
                miniChecked && index === correctMiniAnswer;

              let optionClass =
                "border-stone-200 bg-stone-50 hover:border-teal-300 hover:bg-teal-50";

              if (!miniChecked && isSelected) {
                optionClass =
                  "border-teal-400 bg-teal-50 ring-2 ring-teal-100";
              }

              if (miniChecked && isCorrect) {
                optionClass =
                  "border-emerald-400 bg-emerald-50";
              }

              if (
                miniChecked &&
                isSelected &&
                index !== correctMiniAnswer
              ) {
                optionClass =
                  "border-rose-300 bg-rose-50";
              }

              return (
                <button
                  key={option}
                  type="button"
                  disabled={miniChecked}
                  onClick={() => setMiniAnswer(index)}
                  className={`rounded-2xl border p-4 text-left text-sm font-semibold text-stone-700 transition ${optionClass}`}
                >
                  <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-black shadow-sm">
                    {String.fromCharCode(65 + index)}
                  </span>

                  {option}
                </button>
              );
            })}
          </div>

          {!miniChecked ? (
            <button
              type="button"
              disabled={miniAnswer === null}
              onClick={() => setMiniChecked(true)}
              className="mt-5 rounded-xl bg-stone-900 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400"
            >
              Check answer
            </button>
          ) : (
            <div
              className={`mt-5 rounded-2xl p-4 ${
                miniAnswer === correctMiniAnswer
                  ? "bg-emerald-50 text-emerald-800"
                  : "bg-amber-50 text-amber-800"
              }`}
            >
              <p className="font-black">
                {miniAnswer === correctMiniAnswer
                  ? "🎉 Nice! You spotted it."
                  : "Almost! The natural choice is B."}
              </p>

              <p className="mt-1 text-sm leading-6 opacity-80">
                Natural English usually uses “really like”
                rather than “very like.”
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------
          CURRENT SENTENCE
      ------------------------------------------------ */}

      <div className="mx-auto mt-5 flex w-full max-w-2xl items-center gap-4 rounded-2xl border border-stone-200 bg-white/70 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-sm">
          ✦
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-wider text-stone-400">
            Your sentence
          </p>

          <p className="mt-1 truncate text-sm font-bold text-stone-700">
            “{sentence}”
          </p>
        </div>

        <div className="ml-auto hidden text-xs font-bold text-stone-300 sm:block">
          {targetLanguage}
        </div>
      </div>

      {/* ------------------------------------------------
          SMALL FOOTER
      ------------------------------------------------ */}

      <p className="mt-6 text-center text-xs font-medium text-stone-400">
        Your answer is being analyzed securely on the server.
      </p>
    </div>
  );
}

  if (error) {
    return (
      <div className="flex w-full max-w-xl flex-1 flex-col items-center justify-center text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100">
          <IconAlert className="h-7 w-7 text-rose-500" />
        </div>

        <h2 className="font-display text-3xl font-black">
          We couldn&apos;t analyze that.
        </h2>

        <p className="mt-3 text-stone-500">{error}</p>

        <div className="mt-7 flex gap-3">
          <button
            onClick={onRetry}
            className="rounded-xl bg-stone-900 px-6 py-3 font-bold text-white transition duration-150 ease-out hover:scale-[1.02] hover:shadow-warm-md"
          >
            Try again
          </button>

          <button
            onClick={onStartOver}
            className="rounded-xl bg-white px-6 py-3 font-bold text-stone-600 ring-1 ring-stone-200 transition duration-150 ease-out hover:scale-[1.02] hover:shadow-warm-sm"
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="w-full max-w-5xl py-8">
      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <button
            onClick={onStartOver}
            className="mb-5 text-sm font-bold text-stone-400 transition-colors duration-150 hover:text-stone-700"
          >
            ← Start over
          </button>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
            Analysis complete
          </p>

          <h1 className="font-display mt-2 text-4xl font-black tracking-tight sm:text-5xl">
            Your language fingerprint.
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white px-4 py-2 text-sm font-bold text-stone-600 shadow-warm-sm ring-1 ring-stone-200">
            Learning {targetLanguage}
          </div>

          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-sm font-bold text-white shadow-warm-sm transition duration-150 ease-out hover:scale-[1.02] hover:shadow-warm-md"
          >
            <IconShare className="h-4 w-4" />
            Share result
          </button>
        </div>
      </div>

      <SessionRecap sessionHistory={sessionHistory} />

      {/* Sentence hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-stone-900 p-7 text-white shadow-warm-dark sm:p-10">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-teal-500/20 blur-3xl" />

        <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
          Your sentence
        </p>

        <p className="font-display relative mt-5 break-words text-3xl font-bold leading-tight sm:text-5xl">
          “{sentence}”
        </p>

        {analysis.pronunciation && (
          <p className="relative mt-6 flex items-center gap-2 text-base italic text-stone-400">
            <IconVolume className="h-4 w-4 shrink-0" />
            {analysis.pronunciation}
          </p>
        )}
      </section>

      {/* Translation */}
      <section className="mt-8 grid gap-6 md:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[2rem] bg-white p-7 shadow-warm-md ring-1 ring-stone-200 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-600">
            Natural translation
          </p>

          <p className="font-display mt-4 text-3xl font-black leading-tight text-stone-900">
            {analysis.natural_translation}
          </p>

          {analysis.literal_translation && (
            <div className="mt-7 border-t border-stone-100 pt-5">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Literal meaning
              </p>

              <p className="mt-2 text-stone-500">
                {analysis.literal_translation}
              </p>
            </div>
          )}
        </div>

        <div className="rounded-[2rem] bg-gradient-to-br from-teal-600 to-cyan-700 p-7 text-white shadow-warm-lg sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-100">
            Likely language influence
          </p>

          <p className="font-display mt-4 text-3xl font-black">
            {analysis.primary_source_language}
          </p>

          <div className="mt-6">
            <div className="flex justify-between text-xs font-bold text-teal-100">
              <span>Confidence</span>
              <span>
                {analysis.source_language_confidence}%
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full origin-left animate-[fill-bar_550ms_ease-out] rounded-full bg-white"
                style={{
                  width: `${analysis.source_language_confidence}%`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Scores */}
      <section className="mt-8 rounded-[2rem] bg-white p-7 shadow-warm-md ring-1 ring-stone-200 sm:p-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
            Interference profile
          </p>

          <h2 className="font-display mt-2 text-2xl font-black">
            Where your other languages may be showing up.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {(
            Object.keys(SCORE_META) as (keyof InterferenceScores)[]
          ).map((key) => (
            <ScoreCard
              key={key}
              scoreKey={key}
              value={analysis.interference_scores[key]}
            />
          ))}
        </div>
      </section>

      {/* Explanation */}
      <section className="mt-8 grid gap-6 md:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[2rem] bg-white p-7 shadow-warm-md ring-1 ring-stone-200 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
            Linguistic insight
          </p>

          <h2 className="font-display mt-2 text-2xl font-black">
            What&apos;s happening?
          </h2>

          <p className="mt-5 text-base leading-8 text-stone-600">
            {analysis.explanation}
          </p>
        </div>

        <div className="rounded-[2rem] bg-amber-100 p-7 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
            Remember this
          </p>

          <p className="font-display mt-4 text-xl font-black leading-7 text-stone-900">
            {analysis.key_takeaway}
          </p>
        </div>
      </section>

      {/* Highlighted issues */}
      {analysis.highlighted_tokens.length > 0 && (
        <section className="mt-8 rounded-[2rem] bg-white p-7 shadow-warm-md ring-1 ring-stone-200 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-500">
            Focus areas
          </p>

          <h2 className="font-display mt-2 text-2xl font-black">
            The interesting bits.
          </h2>

          <div className="mt-7 grid gap-4">
            {analysis.highlighted_tokens.map(
              (item, index) => (
                <button
                  key={`${item.segment}-${index}`}
                  onClick={() => setSelectedIssue(item)}
                  className="group flex w-full items-center justify-between rounded-2xl border border-stone-200 p-6 text-left transition duration-150 ease-out hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-50 hover:shadow-warm-sm"
                >
                  <div>
                    <p className="text-lg font-black">
                      “{item.segment}”
                    </p>

                    <p className="mt-1 text-sm text-stone-500">
                      {item.issue_type}
                    </p>
                  </div>

                  <span className="text-xl text-stone-300 transition-colors duration-150 group-hover:text-rose-500">
                    →
                  </span>
                </button>
              )
            )}
          </div>

          {selectedIssue && (
            <div className="mt-5 rounded-2xl bg-stone-900 p-6 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-rose-300">
                    {selectedIssue.issue_type}
                  </p>

                  <p className="mt-2 text-xl font-black">
                    “{selectedIssue.segment}”
                  </p>
                </div>

                <button
                  onClick={() => setSelectedIssue(null)}
                  aria-label="Close"
                  className="text-stone-400 transition-colors duration-150 hover:text-white"
                >
                  <IconClose className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-4 leading-7 text-stone-300">
                {selectedIssue.explanation}
              </p>

              <div className="mt-5 rounded-xl bg-white/10 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Try instead
                </p>

                <p className="mt-1 font-bold">
                  {selectedIssue.suggestion}
                </p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Word breakdown */}
      {analysis.word_breakdown.length > 0 && (
        <section className="mt-8 rounded-[2rem] bg-white p-7 shadow-warm-md ring-1 ring-stone-200 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-600">
            Word by word
          </p>

          <h2 className="font-display mt-2 text-2xl font-black">
            Pull the sentence apart.
          </h2>

          <div className="mt-7 overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="border-b border-stone-200 text-xs uppercase tracking-wider text-stone-400">
                  <th className="px-4 py-4">Original</th>
                  <th className="px-4 py-4">Meaning</th>
                  <th className="px-4 py-4">Pronunciation</th>
                  <th className="px-4 py-4">Role</th>
                </tr>
              </thead>

              <tbody>
                {analysis.word_breakdown.map(
                  (word, index) => (
                    <tr
                      key={index}
                      className="border-b border-stone-100 last:border-0"
                    >
                      <td className="px-4 py-5 font-black">
                        {word.original}
                      </td>

                      <td className="px-4 py-5 text-stone-600">
                        {word.meaning}
                      </td>

                      <td className="px-4 py-5 text-stone-400">
                        {word.pronunciation}
                      </td>

                      <td className="px-4 py-5 text-sm text-stone-500">
                        {word.grammatical_role}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Alternatives */}
      {analysis.natural_alternatives.length > 0 && (
        <section className="mt-8 rounded-[2rem] bg-white p-7 shadow-warm-md ring-1 ring-stone-200 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
            Fluent alternatives
          </p>

          <h2 className="font-display mt-2 text-2xl font-black">
            Other natural ways to say it.
          </h2>

          <div className="mt-7 grid gap-4">
            {analysis.natural_alternatives.map(
              (alternative, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-2xl bg-stone-50 p-6"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-900 text-sm font-bold text-white">
                    {index + 1}
                  </span>

                  <p className="font-bold text-stone-700">
                    {alternative}
                  </p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* Targeted exercise */}
      <section className="mt-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-600 to-fuchsia-600 p-7 text-white shadow-warm-lg sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-200">
          Targeted practice
        </p>

        <h2 className="font-display mt-2 text-2xl font-black">
          Train the pattern.
        </h2>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-violet-100">
          {analysis.targeted_exercise}
        </p>
      </section>

      {/* Interactive challenge */}
      {analysis.practice_options.length === 3 && (
        <section className="mt-8 rounded-[2rem] bg-stone-900 p-7 text-white shadow-warm-dark sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
            Quick challenge
          </p>

          <h2 className="font-display mt-2 text-2xl font-black">
            Can you spot the natural form?
          </h2>

          <p className="mt-6 text-lg font-semibold leading-8">
            {analysis.practice_question}
          </p>

          <div className="mt-7 grid gap-4">
            {analysis.practice_options.map(
              (option, index) => {
                const isCorrect =
                  index === analysis.practice_answer;

                const isSelected =
                  index === selectedAnswer;

                let classes =
                  "w-full rounded-2xl border p-5 text-left transition-colors duration-300 ease-out ";

                if (!checked) {
                  classes +=
                    isSelected
                      ? "border-teal-400 bg-teal-400/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10";
                } else if (isCorrect) {
                  classes +=
                    "border-emerald-400 bg-emerald-400/10";
                } else if (isSelected) {
                  classes +=
                    "border-rose-400 bg-rose-400/10";
                } else {
                  classes +=
                    "border-white/10 bg-white/5 opacity-60";
                }

                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (!checked) {
                        setSelectedAnswer(index);
                      }
                    }}
                    className={classes}
                  >
                    <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>

                    {option}
                  </button>
                );
              }
            )}
          </div>

          {!checked && (
            <button
              disabled={selectedAnswer === null}
              onClick={() => setChecked(true)}
              className="mt-6 rounded-xl bg-white px-6 py-3 font-bold text-stone-900 transition duration-150 ease-out hover:scale-[1.02] disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-30"
            >
              Check answer
            </button>
          )}

          {checked && (
            <div className="mt-6 rounded-2xl bg-white/10 p-5">
              <p className="flex items-center gap-2 font-black">
                {selectedAnswer === analysis.practice_answer ? (
                  <>
                    <IconCheckCircle className="h-5 w-5 text-emerald-400" />
                    Correct!
                  </>
                ) : (
                  "Not quite — keep learning!"
                )}
              </p>

              <p className="mt-2 leading-7 text-stone-300">
                {analysis.practice_explanation}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Bottom */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={onTryAnother}
          className="rounded-2xl bg-white px-7 py-3.5 font-bold text-stone-800 shadow-warm-sm ring-1 ring-stone-200 transition duration-150 ease-out hover:scale-[1.02] hover:shadow-warm-md"
        >
          Trace another sentence →
        </button>
      </div>

      {shareOpen && (
        <ShareModal
          sentence={sentence}
          targetLanguage={targetLanguage}
          analysis={analysis}
          onClose={() => setShareOpen(false)}
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------
   COMPARISON MODE — same sentence analyzed against two
   different known-language profiles, side by side. Two
   parallel calls to the existing /api/analyze endpoint;
   no new backend route needed.
------------------------------------------------------- */

function ComparisonResultPanel({
  label,
  languages,
  loading,
  analysis,
}: {
  label: string;
  languages: string[];
  loading: boolean;
  analysis: AnalysisResult | null;
}) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-warm-md ring-1 ring-stone-200 sm:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-600">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-stone-500">
        {languages.length > 0 ? languages.join(" + ") : "No languages selected"}
      </p>

      {loading && (
        <div className="mt-10 flex flex-col items-center justify-center gap-3 py-10 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-stone-200 border-t-teal-500" />
          <p className="text-xs font-semibold text-stone-400">Analyzing...</p>
        </div>
      )}

      {!loading && analysis && (
        <>
          <div className="mt-5 rounded-2xl bg-stone-50 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Likely influence
            </p>
            <p className="font-display mt-1 text-xl font-black text-stone-900">
              {analysis.primary_source_language}
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-4">
            {(Object.keys(SCORE_META) as (keyof InterferenceScores)[]).map(
              (key) => (
                <ScoreCard
                  key={key}
                  scoreKey={key}
                  value={analysis.interference_scores[key]}
                />
              )
            )}
          </div>

          <div className="mt-5 border-t border-stone-100 pt-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Explanation
            </p>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              {analysis.explanation}
            </p>
          </div>

          <div className="mt-5 rounded-2xl bg-amber-100 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
              Remember this
            </p>
            <p className="mt-1 text-sm font-bold text-stone-900">
              {analysis.key_takeaway}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function ComparisonDashboard({
  sentence,
  targetLanguage,
  languagesA,
  languagesB,
  loading,
  error,
  comparison,
  onTryAnother,
  onStartOver,
}: {
  sentence: string;
  targetLanguage: string;
  languagesA: string[];
  languagesB: string[];
  loading: boolean;
  error: string | null;
  comparison: { a: AnalysisResult; b: AnalysisResult } | null;
  onTryAnother: () => void;
  onStartOver: () => void;
}) {
  return (
    <div className="w-full max-w-6xl py-8">
      <div className="mb-10">
        <button
          onClick={onStartOver}
          className="mb-5 text-sm font-bold text-stone-400 transition-colors duration-150 hover:text-stone-700"
        >
          ← Start over
        </button>

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
          Comparison
        </p>

        <h1 className="font-display mt-2 text-4xl font-black tracking-tight sm:text-5xl">
          Two profiles, one sentence.
        </h1>
      </div>

      <section className="relative overflow-hidden rounded-[2rem] bg-stone-900 p-7 text-white shadow-warm-dark sm:p-10">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-teal-500/20 blur-3xl" />

        <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
          Your sentence
        </p>

        <p className="font-display relative mt-5 break-words text-3xl font-bold leading-tight sm:text-5xl">
          “{sentence}”
        </p>

        <p className="relative mt-4 text-sm font-semibold text-stone-400">
          Target language: {targetLanguage}
        </p>
      </section>

      {error && (
        <div className="mt-8 flex items-center gap-3 rounded-2xl bg-rose-50 p-6 text-rose-600">
          <IconAlert className="h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold">{error}</p>
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <ComparisonResultPanel
          label="Profile A"
          languages={languagesA}
          loading={loading}
          analysis={comparison?.a ?? null}
        />
        <ComparisonResultPanel
          label="Profile B"
          languages={languagesB}
          loading={loading}
          analysis={comparison?.b ?? null}
        />
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={onTryAnother}
          className="rounded-2xl bg-white px-7 py-3.5 font-bold text-stone-800 shadow-warm-sm ring-1 ring-stone-200 transition duration-150 ease-out hover:scale-[1.02] hover:shadow-warm-md"
        >
          Try another sentence →
        </button>
      </div>
    </div>
  );
}
