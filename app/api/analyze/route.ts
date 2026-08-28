import { GoogleGenerativeAI, SchemaType, Schema } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const responseSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    interference_scores: {
      type: SchemaType.OBJECT,
      properties: {
        word_order: {
          type: SchemaType.NUMBER,
          description:
            "0-100 integer. Score based only on sentence/clause ordering and structure evidence, independent of the other three dimensions.",
        },
        vocabulary: {
          type: SchemaType.NUMBER,
          description:
            "0-100 integer. Score based only on word choice, false friends, and calques, independent of the other three dimensions.",
        },
        register: {
          type: SchemaType.NUMBER,
          description:
            "0-100 integer. Score based only on formality/honorific/politeness-level evidence, independent of the other three dimensions.",
        },
        grammar: {
          type: SchemaType.NUMBER,
          description:
            "0-100 integer. Score based only on morphology, conjugation, particles, and agreement evidence, independent of the other three dimensions.",
        },
      },
      required: ["word_order", "vocabulary", "register", "grammar"],
    },
    primary_source_language: { type: SchemaType.STRING },
    explanation: { type: SchemaType.STRING },
    targeted_exercise: { type: SchemaType.STRING },
  },
  required: [
    "interference_scores",
    "primary_source_language",
    "explanation",
    "targeted_exercise",
  ],
};

function buildPrompt(
  knownLanguages: string[],
  targetLanguage: string,
  sentence: string
) {
  return `You are a computational linguist analyzing cross-linguistic interference (language transfer) in a learner's writing.

Learner's known languages: ${knownLanguages.join(", ")}
Target language they are learning: ${targetLanguage}
Learner's sentence in the target language: "${sentence}"

Task: Identify observable patterns in the sentence (word order, vocabulary choice, register/formality, grammar) that are consistent with transfer from one of the learner's known languages into the target language.

Rules:
- Never claim certainty about what the learner was "thinking" or intending. You have no access to their internal cognitive process. Frame every observation as an observable pattern or likelihood (e.g. "this word order pattern is consistent with...", "this construction resembles...", "this is a common transfer pattern from..."), not as a claim about their mental state.
- Score each of the four interference dimensions (word_order, vocabulary, register, grammar) independently and separately, on a 0-100 scale, where 0 means no detectable interference in that specific dimension and 100 means very strong, unambiguous interference in that specific dimension. Base each score only on the evidence relevant to that dimension — do not let your score for one dimension influence another.
- Do not default to giving all four dimensions the same score. Identical scores across all four are rare and only correct when you have independently verified, dimension by dimension, that each one genuinely warrants that exact value (e.g. a flawless native-like sentence can legitimately score 0 on all four; a sentence written entirely in the wrong language can legitimately score high on all four). For any sentence with actual content in the target language, look for specific per-dimension evidence and expect scores to differ across dimensions.
- Avoid lazy round-number placeholders (like 5, 10, 50) unless that number is genuinely what the evidence supports.
- primary_source_language must be one of the learner's known languages (${knownLanguages.join(", ")}), the one most likely responsible for the dominant interference pattern.
- explanation must be 1-2 plain-language sentences, written for a language learner (not a linguistics textbook), describing the pattern observed and why it looks like transfer from the primary source language.
- targeted_exercise must be one short, concrete follow-up question or prompt that gives the learner practice specifically targeting the detected interference pattern.
- Even if the sentence is very short or simple, still independently assess all four dimensions using whatever evidence is present (word choice, honorific/informal forms used, particles/endings present, clause structure). Only treat it as low-signal if it is truly empty or gibberish, and even then still explain your reasoning per dimension rather than defaulting to a single repeated number.

Respond with ONLY the JSON object matching the required schema. No markdown, no code fences, no extra commentary.`;
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GOOGLE_API_KEY is not set on the server." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { knownLanguages, targetLanguage, sentence } = body as {
      knownLanguages?: string[];
      targetLanguage?: string;
      sentence?: string;
    };

    if (
      !Array.isArray(knownLanguages) ||
      knownLanguages.length === 0 ||
      !targetLanguage ||
      !sentence
    ) {
      return NextResponse.json(
        {
          error:
            "Request must include knownLanguages (non-empty array), targetLanguage (string), and sentence (string).",
        },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.4,
      },
    });

    const prompt = buildPrompt(knownLanguages, targetLanguage, sentence);
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const parsed = JSON.parse(text);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Error in /api/analyze:", err);
    return NextResponse.json(
      { error: "Failed to analyze sentence." },
      { status: 500 }
    );
  }
}
