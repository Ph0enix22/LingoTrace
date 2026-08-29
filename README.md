# LingoTrace

**Find out which of your languages is quietly shaping the one you're learning.**

## What is this

Most grammar checkers tell you *what's* wrong. LingoTrace tries to tell you *why* — by tracing a mistake back to a specific language you already know.

When a multilingual learner writes in a new language, their existing languages leak through: word order, vocabulary choices, register, grammar. A Hindi speaker learning Korean might default to Hindi's SOV structure without realizing it's actually *correct* there — but slip into English's SVO order instead. A generic grammar tool just says "wrong word order." LingoTrace tries to say *which* of your languages is responsible, and explain the correct pattern in terms of what you already know, instead of teaching every learner the same generic correction.

You give it your known languages, your target language, and a sentence. It gives back a breakdown of *where* your other languages are showing up, and *why*.

## Key features

- **Language profile** — pick the languages you already know and the one you're learning, from an 18-language list spanning major world and South Asian languages.
- **Roleplay scenarios** — instead of one fixed writing prompt, pick from four preset scenarios (introducing yourself, running late, ordering food, meeting a partner's parents) to write about, or jump straight in with one of three curated sample sentences.
- **Voice input** — speak your response instead of typing, using the browser's native Speech Recognition API. Automatically matches the recognition language to your target language.
- **Analysis dashboard** — for each sentence, you get:
  - Natural and literal English translations, with pronunciation
  - A likely source language for the interference, with a confidence score
  - Four independently-scored interference dimensions — word order, vocabulary, register, grammar — as animated bars
  - A plain-language explanation of what's happening and why
  - A word-by-word breakdown of your sentence (meaning, pronunciation, grammatical role)
  - Specific problem phrases you can click into for a targeted fix
  - A few natural alternative phrasings
  - A short targeted exercise, plus an interactive multiple-choice quiz on the pattern you just got wrong
- **Comparison mode** — analyze the same sentence against two different known-language profiles side by side, to see how the diagnosis changes depending on what languages you bring to it.
- **Shareable result card** — export your analysis as a clean, downloadable PNG summary (sentence, scores, key takeaway), or screenshot it directly from the app.
- **Session recap** — after your second sentence in a session, see how many you've analyzed and whether your average interference is trending up or down.

## Tech stack

- **[Next.js](https://nextjs.org)** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **[Google Gemini API](https://ai.google.dev)** via the `@google/genai` SDK
- **Web Speech API** (`SpeechRecognition`) for voice input — native browser API, no extra dependency

No database, no backend beyond a single API route — all state lives in React for the duration of a session.

## Setup

```bash
git clone <this-repo>
cd lingotrace
npm install
```

Create `.env.local` in the project root:

```
GOOGLE_API_KEY=your_gemini_api_key_here
```

Get a free key from [Google AI Studio](https://aistudio.google.com/apikey).

Then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How it works

1. **Profile** — you select your known languages and pick a target language.
2. **Challenge** — you pick a scenario (or a sample) and write or speak a sentence in the target language.
3. **Analysis** — your known languages, target language, scenario, and sentence are sent to a single API route (`/api/analyze`), which prompts Gemini to act as a computational linguist: identify interference patterns, score them independently across four dimensions, name the most likely source language among the ones you know, and generate the translation, word breakdown, exercise, and quiz — all in one structured JSON response, validated and clamped server-side before it reaches the UI.
4. **Dashboard** — the response renders as the full breakdown described above. Repeated identical requests (same languages, target, scenario, and sentence) are served from an in-memory cache instead of re-calling Gemini.

## Known limitations

- **Response time varies** — Gemini analysis typically takes 8–35 seconds, occasionally longer under high API demand. There's a loading experience to cover the wait, but it's not instant.
- **Voice input browser support varies** — the Web Speech API works well in Chrome and Edge; Safari and Firefox have little to no support. The mic button hides itself automatically on unsupported browsers rather than showing a broken control.
- **Free-tier API limits** — if you're running this on a free-tier Gemini API key, heavy use (especially Comparison Mode, which fires two requests at once) can hit rate limits faster than single-analysis use.
- **No persistence** — session recap and comparison history live only in memory for the current browser session; refreshing the page clears them.

## Credits

Built for the **Prometheus August AI Challenge**.
