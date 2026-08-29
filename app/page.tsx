"use client";

import { useEffect, useRef, useState } from "react";

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
        className={`flex h-11 w-11 items-center justify-center rounded-full shadow-sm ring-1 transition ${
          listening
            ? "bg-rose-500 text-white ring-rose-500 animate-pulse"
            : "bg-white text-stone-500 ring-stone-200 hover:text-stone-800 hover:ring-stone-300 dark:bg-stone-800 dark:text-stone-300 dark:ring-stone-700 dark:hover:text-white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z" />
          <path d="M19 11a7 7 0 0 1-14 0" />
          <path d="M12 18v3" />
        </svg>
      </button>

      {listening && (
        <span className="flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600 shadow-sm dark:bg-rose-500/10 dark:text-rose-300">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-rose-500" />
          Listening...
        </span>
      )}

      {!listening && permissionError && (
        <span className="max-w-[220px] rounded-xl bg-amber-50 px-3 py-2 text-right text-xs font-medium text-amber-700 shadow-sm dark:bg-amber-500/10 dark:text-amber-300">
          {permissionError}
        </span>
      )}
    </div>
  );
}

type Screen = "landing" | "profile" | "challenge" | "dashboard";

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

const CHALLENGE_PROMPT = "Introduce yourself to a new friend.";

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

const ANALYSIS_STEPS = [
  "Checking word order...",
  "Checking vocabulary...",
  "Checking register...",
  "Checking grammar...",
];

function AnalyzingStatus() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ANALYSIS_STEPS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="mt-3 max-w-md text-stone-500 transition-opacity duration-300">
      {ANALYSIS_STEPS[index]}
    </p>
  );
}

const SCORE_META: Record<
  keyof InterferenceScores,
  {
    label: string;
    icon: string;
  }
> = {
  word_order: {
    label: "Word Order",
    icon: "↔",
  },
  vocabulary: {
    label: "Vocabulary",
    icon: "Aa",
  },
  register: {
    label: "Register",
    icon: "◌",
  },
  grammar: {
    label: "Grammar",
    icon: "文",
  },
};

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");

  const [knownLanguages, setKnownLanguages] = useState<string[]>([]);
  const [targetLanguage, setTargetLanguage] = useState<string | null>(null);
  const [sentence, setSentence] = useState("");

  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.error || "The analysis request failed."
        );
      }

      setAnalysis(data as AnalysisResult);
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

  function handleTryAnother() {
    setSentence("");
    setAnalysis(null);
    setError(null);
    setScreen("challenge");
  }

  function handleStartOver() {
    setKnownLanguages([]);
    setTargetLanguage(null);
    setSentence("");
    setAnalysis(null);
    setError(null);
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
          <span className="hidden rounded-full bg-white px-4 py-2 text-xs font-semibold text-stone-500 shadow-sm ring-1 ring-stone-200 sm:block">
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
            onBack={() => setScreen("profile")}
            onAnalyze={handleAnalyze}
            onUseSample={handleUseSample}
          />
        )}

        {screen === "dashboard" && targetLanguage && (
          <Dashboard
            sentence={sentence}
            targetLanguage={targetLanguage}
            loading={loading}
            error={error}
            analysis={analysis}
            onRetry={handleAnalyze}
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
      <div className="mb-7 rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm">
        LingoTrace · Language Transfer Intelligence
      </div>

      <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.04em] text-stone-900 sm:text-7xl">
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
        <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-stone-200">
          English
        </span>
        <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-stone-200">
          हिन्दी
        </span>
        <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-stone-200">
          ಕನ್ನಡ
        </span>
        <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-stone-200">
          中文
        </span>
        <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-stone-200">
          日本語
        </span>
      </div>

      <button
        onClick={onStart}
        className="mt-10 rounded-2xl bg-stone-900 px-9 py-4 text-base font-bold text-white shadow-xl shadow-stone-300 transition hover:-translate-y-1 hover:shadow-2xl active:translate-y-0"
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
      className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
        selected
          ? "bg-stone-900 text-white shadow-lg shadow-stone-200"
          : "bg-white text-stone-600 shadow-sm ring-1 ring-stone-200 hover:-translate-y-0.5 hover:ring-stone-300"
      }`}
    >
      {selected && <span className="mr-1.5">✓</span>}
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

        <h2 className="text-4xl font-black tracking-tight text-stone-900">
          Tell us where your language journey starts.
        </h2>

        <p className="mt-3 max-w-2xl text-stone-500">
          We use your existing languages as possible sources of
          linguistic transfer.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-stone-200">
          <div className="mb-5">
            <span className="text-2xl">🌍</span>

            <h3 className="mt-4 text-xl font-bold">
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

        <div className="rounded-3xl bg-stone-900 p-7 text-white shadow-xl">
          <div className="mb-5">
            <span className="text-2xl">🎯</span>

            <h3 className="mt-4 text-xl font-bold">
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
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  targetLanguage === lang
                    ? "bg-white text-stone-900"
                    : "bg-white/10 text-stone-300 hover:bg-white/20"
                }`}
              >
                {targetLanguage === lang && "✓ "}
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-9 flex items-center justify-between">
        <button
          onClick={onBack}
          className="font-semibold text-stone-400 transition hover:text-stone-700"
        >
          ← Back
        </button>

        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-7 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:from-stone-200 disabled:to-stone-200 disabled:text-stone-400 disabled:shadow-none"
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

function Challenge({
  targetLanguage,
  sentence,
  onChangeSentence,
  onBack,
  onAnalyze,
  onUseSample,
}: {
  targetLanguage: string;
  sentence: string;
  onChangeSentence: (s: string) => void;
  onBack: () => void;
  onAnalyze: () => void;
  onUseSample: (sample: Sample) => void;
}) {
  return (
    <div className="flex w-full max-w-3xl flex-1 flex-col justify-center py-10">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
        Step 02 · Write naturally
      </p>

      <h2 className="text-4xl font-black tracking-tight">
        Let&apos;s see how your languages show up.
      </h2>

      <p className="mt-3 text-stone-500">
        Don&apos;t overthink it. Write the sentence the way
        you would naturally say it.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
          Try a sample:
        </span>
        {SAMPLES.map((sample) => (
          <button
            key={sample.label}
            type="button"
            onClick={() => onUseSample(sample)}
            className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-600 shadow-sm ring-1 ring-stone-200 transition hover:-translate-y-0.5 hover:ring-teal-300"
          >
            {sample.label}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-stone-200">
        <div className="border-b border-stone-100 bg-stone-50 px-7 py-5">
          <span className="rounded-full bg-teal-100 px-3 py-1.5 text-xs font-bold text-teal-700">
            {targetLanguage}
          </span>

          <p className="mt-4 text-lg font-bold">
            {CHALLENGE_PROMPT}
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

          <button
            onClick={onAnalyze}
            disabled={!sentence.trim()}
            className="rounded-xl bg-stone-900 px-7 py-3 font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400"
          >
            Trace my sentence →
          </button>
        </div>
      </div>

      <button
        onClick={onBack}
        className="mt-6 w-fit font-semibold text-stone-400 hover:text-stone-700"
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

  const score = Math.max(
    0,
    Math.min(100, Math.round(value || 0))
  );

  let level = "Minimal";

  if (score >= 70) level = "Strong";
  else if (score >= 40) level = "Moderate";
  else if (score >= 15) level = "Low";

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-stone-100 text-xs font-black">
            {meta.icon}
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

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-stone-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-400 via-orange-400 to-rose-500 transition-all duration-1000"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   DASHBOARD
------------------------------------------------------- */

function Dashboard({
  sentence,
  targetLanguage,
  loading,
  error,
  analysis,
  onRetry,
  onTryAnother,
  onStartOver,
}: {
  sentence: string;
  targetLanguage: string;
  loading: boolean;
  error: string | null;
  analysis: AnalysisResult | null;
  onRetry: () => void;
  onTryAnother: () => void;
  onStartOver: () => void;
}) {
  const [selectedIssue, setSelectedIssue] =
    useState<HighlightedToken | null>(null);

  const [selectedAnswer, setSelectedAnswer] =
    useState<number | null>(null);

  const [checked, setChecked] = useState(false);

  if (loading) {
    return (
      <div className="flex w-full max-w-2xl flex-1 flex-col items-center justify-center text-center">
        <div className="relative mb-8 h-20 w-20">
          <div className="absolute inset-0 animate-ping rounded-full bg-teal-200 opacity-40" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-stone-900 text-2xl text-white">
            LT
          </div>
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
          LingoTrace is thinking
        </p>

        <h2 className="mt-3 text-3xl font-black">
          Tracing your languages...
        </h2>

        <AnalyzingStatus />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full max-w-xl flex-1 flex-col items-center justify-center text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-2xl">
          !
        </div>

        <h2 className="text-3xl font-black">
          We couldn&apos;t analyze that.
        </h2>

        <p className="mt-3 text-stone-500">{error}</p>

        <div className="mt-7 flex gap-3">
          <button
            onClick={onRetry}
            className="rounded-xl bg-stone-900 px-6 py-3 font-bold text-white"
          >
            Try again
          </button>

          <button
            onClick={onStartOver}
            className="rounded-xl bg-white px-6 py-3 font-bold text-stone-600 ring-1 ring-stone-200"
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
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <button
            onClick={onStartOver}
            className="mb-5 text-sm font-bold text-stone-400 hover:text-stone-700"
          >
            ← Start over
          </button>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
            Analysis complete
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
            Your language fingerprint.
          </h1>
        </div>

        <div className="rounded-full bg-white px-4 py-2 text-sm font-bold text-stone-600 shadow-sm ring-1 ring-stone-200">
          Learning {targetLanguage}
        </div>
      </div>

      {/* Sentence hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-stone-900 p-7 text-white shadow-2xl sm:p-10">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-teal-500/20 blur-3xl" />

        <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
          Your sentence
        </p>

        <p className="relative mt-5 break-words text-3xl font-bold leading-tight sm:text-5xl">
          “{sentence}”
        </p>

        {analysis.pronunciation && (
          <p className="relative mt-5 text-base italic text-stone-400">
            🔊 {analysis.pronunciation}
          </p>
        )}
      </section>

      {/* Translation */}
      <section className="mt-5 grid gap-5 md:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-stone-200 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-600">
            Natural translation
          </p>

          <p className="mt-4 text-3xl font-black leading-tight text-stone-900">
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

        <div className="rounded-[2rem] bg-gradient-to-br from-teal-600 to-cyan-700 p-7 text-white shadow-lg sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-100">
            Likely language influence
          </p>

          <p className="mt-4 text-3xl font-black">
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
                className="h-full rounded-full bg-white transition-all duration-700"
                style={{
                  width: `${analysis.source_language_confidence}%`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Scores */}
      <section className="mt-5 rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-stone-200 sm:p-8">
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
            Interference profile
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Where your other languages may be showing up.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
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
      <section className="mt-5 grid gap-5 md:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-stone-200 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
            Linguistic insight
          </p>

          <h2 className="mt-2 text-2xl font-black">
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

          <p className="mt-4 text-xl font-black leading-7 text-stone-900">
            {analysis.key_takeaway}
          </p>
        </div>
      </section>

      {/* Highlighted issues */}
      {analysis.highlighted_tokens.length > 0 && (
        <section className="mt-5 rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-stone-200 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-500">
            Focus areas
          </p>

          <h2 className="mt-2 text-2xl font-black">
            The interesting bits.
          </h2>

          <div className="mt-6 grid gap-3">
            {analysis.highlighted_tokens.map(
              (item, index) => (
                <button
                  key={`${item.segment}-${index}`}
                  onClick={() => setSelectedIssue(item)}
                  className="group flex w-full items-center justify-between rounded-2xl border border-stone-200 p-5 text-left transition hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-50"
                >
                  <div>
                    <p className="text-lg font-black">
                      “{item.segment}”
                    </p>

                    <p className="mt-1 text-sm text-stone-500">
                      {item.issue_type}
                    </p>
                  </div>

                  <span className="text-xl text-stone-300 transition group-hover:text-rose-500">
                    →
                  </span>
                </button>
              )
            )}
          </div>

          {selectedIssue && (
            <div className="mt-4 rounded-2xl bg-stone-900 p-6 text-white">
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
                  className="text-stone-400 hover:text-white"
                >
                  ×
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
        <section className="mt-5 rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-stone-200 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-600">
            Word by word
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Pull the sentence apart.
          </h2>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="border-b border-stone-200 text-xs uppercase tracking-wider text-stone-400">
                  <th className="px-3 py-3">Original</th>
                  <th className="px-3 py-3">Meaning</th>
                  <th className="px-3 py-3">Pronunciation</th>
                  <th className="px-3 py-3">Role</th>
                </tr>
              </thead>

              <tbody>
                {analysis.word_breakdown.map(
                  (word, index) => (
                    <tr
                      key={index}
                      className="border-b border-stone-100 last:border-0"
                    >
                      <td className="px-3 py-4 font-black">
                        {word.original}
                      </td>

                      <td className="px-3 py-4 text-stone-600">
                        {word.meaning}
                      </td>

                      <td className="px-3 py-4 text-stone-400">
                        {word.pronunciation}
                      </td>

                      <td className="px-3 py-4 text-sm text-stone-500">
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
        <section className="mt-5 rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-stone-200 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
            Fluent alternatives
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Other natural ways to say it.
          </h2>

          <div className="mt-6 grid gap-3">
            {analysis.natural_alternatives.map(
              (alternative, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-2xl bg-stone-50 p-5"
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
      <section className="mt-5 overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-600 to-fuchsia-600 p-7 text-white shadow-xl sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-200">
          Targeted practice
        </p>

        <h2 className="mt-2 text-2xl font-black">
          Train the pattern.
        </h2>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-violet-100">
          {analysis.targeted_exercise}
        </p>
      </section>

      {/* Interactive challenge */}
      {analysis.practice_options.length === 3 && (
        <section className="mt-5 rounded-[2rem] bg-stone-900 p-7 text-white shadow-xl sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
            Quick challenge
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Can you spot the natural form?
          </h2>

          <p className="mt-6 text-lg font-semibold leading-8">
            {analysis.practice_question}
          </p>

          <div className="mt-6 grid gap-3">
            {analysis.practice_options.map(
              (option, index) => {
                const isCorrect =
                  index === analysis.practice_answer;

                const isSelected =
                  index === selectedAnswer;

                let classes =
                  "w-full rounded-2xl border p-4 text-left transition ";

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
              className="mt-5 rounded-xl bg-white px-6 py-3 font-bold text-stone-900 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Check answer
            </button>
          )}

          {checked && (
            <div className="mt-5 rounded-2xl bg-white/10 p-5">
              <p className="font-black">
                {selectedAnswer === analysis.practice_answer
                  ? "🎉 Correct!"
                  : "Not quite — keep learning!"}
              </p>

              <p className="mt-2 leading-7 text-stone-300">
                {analysis.practice_explanation}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Bottom */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={onTryAnother}
          className="rounded-2xl bg-white px-7 py-3.5 font-bold text-stone-800 shadow-sm ring-1 ring-stone-200 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          Trace another sentence →
        </button>
      </div>
    </div>
  );
}