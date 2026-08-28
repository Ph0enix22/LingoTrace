"use client";

import { useState } from "react";

type Screen = "landing" | "profile" | "challenge" | "dashboard";

type InterferenceScores = {
  word_order: number;
  vocabulary: number;
  register: number;
  grammar: number;
};

type AnalysisResult = {
  interference_scores: InterferenceScores;
  primary_source_language: string;
  explanation: string;
  targeted_exercise: string;
};

const LANGUAGES = [
  "English",
  "Hindi",
  "Kannada",
  "Tamil",
  "Telugu",
  "Bengali",
  "Marathi",
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

const SCORE_META: Record<
  keyof InterferenceScores,
  { label: string; barClass: string; trackClass: string }
> = {
  word_order: {
    label: "Word Order",
    barClass: "bg-violet-500",
    trackClass: "bg-violet-100",
  },
  vocabulary: {
    label: "Vocabulary",
    barClass: "bg-teal-500",
    trackClass: "bg-teal-100",
  },
  register: {
    label: "Register",
    barClass: "bg-amber-500",
    trackClass: "bg-amber-100",
  },
  grammar: {
    label: "Grammar",
    barClass: "bg-rose-500",
    trackClass: "bg-rose-100",
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
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
    if (targetLanguage === lang) setTargetLanguage(null);
  }

  async function handleAnalyze() {
    setScreen("dashboard");
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ knownLanguages, targetLanguage, sentence }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = (await res.json()) as AnalysisResult;
      setAnalysis(data);
    } catch {
      setError("Something went wrong analyzing your sentence. Please try again.");
    } finally {
      setLoading(false);
    }
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
    <div className="relative flex flex-1 flex-col overflow-hidden bg-[#fffaf3]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-teal-200/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-rose-200/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl"
      />

      <main className="relative z-10 flex flex-1 flex-col items-center px-6 py-10 sm:px-10">
        {screen === "landing" && <Landing onStart={() => setScreen("profile")} />}

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

        {screen === "challenge" && (
          <Challenge
            targetLanguage={targetLanguage!}
            sentence={sentence}
            onChangeSentence={setSentence}
            onBack={() => setScreen("profile")}
            onAnalyze={handleAnalyze}
          />
        )}

        {screen === "dashboard" && (
          <Dashboard
            sentence={sentence}
            targetLanguage={targetLanguage!}
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

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
      <span className="rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium text-teal-700 shadow-sm ring-1 ring-teal-200">
        LingoTrace
      </span>
      <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-stone-900 sm:text-5xl">
        You don&rsquo;t learn a language from zero — you learn it through the
        languages you already know.
      </h1>
      <p className="max-w-xl text-lg text-stone-500">
        Write a sentence in your target language. We&rsquo;ll show you which of
        your other languages is quietly shaping it — and give you a targeted
        drill to fix it.
      </p>
      <p className="max-w-lg text-2xl text-stone-400">
        Hello · नमस्ते · ನಮಸ್ಕಾರ · こんにちは · 안녕하세요 · Bonjour
      </p>
      <button
        onClick={onStart}
        className="mt-2 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-rose-200 transition hover:shadow-xl hover:shadow-rose-300 active:scale-95"
      >
        Get Started
      </button>
    </div>
  );
}

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
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        selected
          ? "bg-stone-900 text-white shadow-md"
          : "bg-white text-stone-600 ring-1 ring-stone-200 hover:ring-stone-300"
      }`}
    >
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
  const targetOptions = LANGUAGES.filter((l) => !knownLanguages.includes(l));
  const canContinue = knownLanguages.length > 0 && !!targetLanguage;

  return (
    <div className="flex w-full max-w-2xl flex-1 flex-col justify-center gap-10 py-8">
      <div>
        <h2 className="text-2xl font-bold text-stone-900">
          What languages do you already speak?
        </h2>
        <p className="mt-1 text-stone-500">
          Select all that apply — these are the languages your writing pulls
          from.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
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

      <div>
        <h2 className="text-2xl font-bold text-stone-900">
          What are you learning right now?
        </h2>
        <p className="mt-1 text-stone-500">Pick one target language.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {targetOptions.length === 0 && (
            <p className="text-sm text-stone-400">
              Deselect a known language to see target options.
            </p>
          )}
          {targetOptions.map((lang) => (
            <LanguageChip
              key={lang}
              label={lang}
              selected={targetLanguage === lang}
              onClick={() => onSelectTarget(lang)}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm font-medium text-stone-400 hover:text-stone-600"
        >
          ← Back
        </button>
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-7 py-3 text-base font-semibold text-white shadow-md transition hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:from-stone-200 disabled:to-stone-200 disabled:text-stone-400 disabled:shadow-none"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function Challenge({
  targetLanguage,
  sentence,
  onChangeSentence,
  onBack,
  onAnalyze,
}: {
  targetLanguage: string;
  sentence: string;
  onChangeSentence: (s: string) => void;
  onBack: () => void;
  onAnalyze: () => void;
}) {
  return (
    <div className="flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 py-8">
      <span className="w-fit rounded-full bg-teal-100 px-3 py-1 text-sm font-medium text-teal-700">
        Writing in {targetLanguage}
      </span>
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100">
        <p className="text-sm font-medium uppercase tracking-wide text-stone-400">
          Your challenge
        </p>
        <p className="mt-2 text-2xl font-semibold text-stone-900">
          {CHALLENGE_PROMPT}
        </p>
      </div>

      <textarea
        value={sentence}
        onChange={(e) => onChangeSentence(e.target.value)}
        placeholder={`Write your response in ${targetLanguage}...`}
        rows={5}
        className="w-full resize-none rounded-2xl border border-stone-200 bg-white p-4 text-lg text-stone-900 shadow-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
      />

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm font-medium text-stone-400 hover:text-stone-600"
        >
          ← Back
        </button>
        <button
          onClick={onAnalyze}
          disabled={sentence.trim().length === 0}
          className="rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-7 py-3 text-base font-semibold text-white shadow-md transition hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:from-stone-200 disabled:to-stone-200 disabled:text-stone-400 disabled:shadow-none"
        >
          Analyze
        </button>
      </div>
    </div>
  );
}

function ScoreBar({
  scoreKey,
  value,
}: {
  scoreKey: keyof InterferenceScores;
  value: number;
}) {
  const meta = SCORE_META[scoreKey];
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium text-stone-700">{meta.label}</span>
        <span className="font-semibold text-stone-500">{clamped}</span>
      </div>
      <div className={`h-2.5 w-full overflow-hidden rounded-full ${meta.trackClass}`}>
        <div
          className={`h-full rounded-full ${meta.barClass} transition-all duration-700`}
          style={{ width: `${clamped}%` }}
        />
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
  return (
    <div className="flex w-full max-w-2xl flex-1 flex-col gap-6 py-8">
      <div>
        <button
          onClick={onStartOver}
          className="text-sm font-medium text-stone-400 hover:text-stone-600"
        >
          ← Start over
        </button>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100">
        <p className="text-sm font-medium uppercase tracking-wide text-stone-400">
          Your sentence in {targetLanguage}
        </p>
        <p className="mt-2 text-xl font-medium text-stone-900">
          &ldquo;{sentence}&rdquo;
        </p>
      </div>

      {loading && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-stone-400">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-rose-500" />
          <p className="text-sm font-medium">Analyzing your sentence...</p>
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-stone-100">
          <p className="text-stone-600">{error}</p>
          <button
            onClick={onRetry}
            className="rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg active:scale-95"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && analysis && (
        <>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100">
            <p className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-400">
              Interference Scores
            </p>
            <div className="flex flex-col gap-4">
              {(Object.keys(SCORE_META) as (keyof InterferenceScores)[]).map(
                (key) => (
                  <ScoreBar
                    key={key}
                    scoreKey={key}
                    value={analysis.interference_scores[key]}
                  />
                )
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-rose-50 p-6 shadow-sm ring-1 ring-violet-100">
            <p className="text-sm font-medium uppercase tracking-wide text-violet-500">
              Likely source
            </p>
            <p className="mt-1 text-2xl font-bold text-stone-900">
              {analysis.primary_source_language}
            </p>
            <p className="mt-3 text-stone-600">{analysis.explanation}</p>
          </div>

          <div className="rounded-2xl bg-teal-600 p-6 text-white shadow-sm">
            <p className="text-sm font-medium uppercase tracking-wide text-teal-100">
              Try this next
            </p>
            <p className="mt-2 text-lg font-medium">
              {analysis.targeted_exercise}
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onTryAnother}
              className="rounded-full bg-stone-900 px-7 py-3 text-base font-semibold text-white shadow-md transition hover:shadow-lg active:scale-95"
            >
              Try Another Sentence
            </button>
          </div>
        </>
      )}
    </div>
  );
}
