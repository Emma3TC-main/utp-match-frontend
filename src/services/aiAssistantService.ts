import { apiClient } from "../lib/apiClient";
import { unwrapData } from "../lib/apiResponse";
import { endpoints } from "../lib/endpoints";

type AiAskResponseDto = {
  answer?: string;
  provider?: string;
  model?: string;
  latencyMs?: number;
};

type AskInput = {
  question: string;
  studentProfileId?: string;
  careerIds?: string[];
  syllabusIds?: string[];
  maxContextItems?: number;
};

export type AiAssistantAnswer = {
  answer: string;
  provider?: string;
  model?: string;
  latencyMs?: number;
};

function compactAnswer(value: string): string {
  const cleaned = value.replace(/\s+/g, " ").trim();

  if (cleaned.length <= 220) {
    return cleaned;
  }

  return `${cleaned.slice(0, 217).trim()}...`;
}

export const aiAssistantService = {
  async ask(input: AskInput): Promise<AiAssistantAnswer> {
    const json = await apiClient.post<unknown, AskInput>(endpoints.ai.ask, {
      question: input.question,
      studentProfileId: input.studentProfileId,
      careerIds: input.careerIds ?? [],
      syllabusIds: input.syllabusIds ?? [],
      maxContextItems: input.maxContextItems ?? 4,
    });

    const data = unwrapData<AiAskResponseDto>(json);

    return {
      answer: compactAnswer(data.answer ?? ""),
      provider: data.provider,
      model: data.model,
      latencyMs: data.latencyMs,
    };
  },
};
