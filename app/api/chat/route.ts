import { streamText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

const deepseek = createOpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
})

export async function POST(req: Request) {
  const { messages, personalityType, big5Scores, testType } = await req.json()

  let systemPrompt = `You are a helpful and friendly assistant. Provide concise and useful information.`

  if (testType === "MBTI" && personalityType) {
    systemPrompt = `You are a professional MBTI personality counseling assistant. The user has been identified as ${personalityType} personality type.

Your role is to:
- Provide personalized advice based on their MBTI type
- Help them understand their strengths and growth areas
- Offer practical strategies for personal and professional development
- Answer questions about relationships, career, and life decisions through the lens of their personality type
- Be supportive, insightful, and encouraging

Key traits of ${personalityType}:
- Strategic thinker with natural drive for implementing ideas
- Independent and determined
- Values competence and efficiency
- Prefers working alone or in small groups
- Future-focused and goal-oriented
- Can be perfectionistic and critical

Always tailor your responses to their specific personality type and provide actionable insights.`
  } else if (testType === "BIG5" && big5Scores) {
    const { O, C, E, A, N } = big5Scores
    systemPrompt = `You are a professional Big 5 personality analysis assistant. The user has completed a Big 5 personality test with the following scores (each trait is scored out of a maximum of 60, where a higher score indicates more of that trait):
- Openness to Experience (O): ${O}/60
- Conscientiousness (C): ${C}/60
- Extraversion (E): ${E}/60
- Agreeableness (A): ${A}/60
- Neuroticism (N): ${N}/60

Based on these scores, provide a comprehensive summary of their personality. Explain what each score generally indicates and how these traits might combine to describe their overall personality. Offer insights into potential strengths, challenges, and general tendencies. Keep the language professional and insightful.`
  }

  const result = await streamText({
    model: deepseek("deepseek-reasoner"),
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    temperature: 0.7,
    maxTokens: 1000,
  })

  return result.toDataStreamResponse()
}
