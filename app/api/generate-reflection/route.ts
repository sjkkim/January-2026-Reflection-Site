import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  const { answers } = await req.json()

  const systemPrompt = `당신은 따뜻하고 공감적인 에세이 작가입니다. 사용자의 회고 답변을 바탕으로 2026년 1월에 대한 개인적인 회고 에세이를 작성해주세요.

규칙:
- 3-4개의 자연스러운 문단으로 작성하세요
- 부드럽고 따뜻한 한국어 문체를 사용하세요
- 존댓말(해요체나 합니다체)로 작성하세요
- 글머리 기호나 목록을 사용하지 마세요
- 질문 자체를 에세이에 포함하지 마세요
- 사용자를 판단하거나 평가하지 마세요
- 감정의 흐름과 자기 성찰에 집중하세요
- 2월을 향한 희망적인 마무리로 끝내세요
- 자연스럽게 답변들을 엮어서 하나의 이야기로 만드세요
추가 규칙:
- 글의 마지막에 반드시 ‘1월 한 줄 회고’를 한 줄로 추가하세요
- 한 줄 회고는 짧고 담백한 문장으로, 인용부호(" ") 안에 작성하세요
`

  const userPrompt = `다음은 사용자의 2026년 1월 회고 답변입니다. 이 답변들을 바탕으로 따뜻한 회고 에세이를 작성해주세요:

1. 1월을 한 문장으로: ${answers.q1 || "(미답변)"}
2. 이 달의 전반적인 감정: ${answers.q2} ${answers.q2Reason ? `(이유: ${answers.q2Reason})` : ""}
3. 가장 기억에 남는 사건: ${answers.q3 || "(미답변)"}
4. 그 일이 기억에 남는 이유: ${answers.q4 || "(미답변)"}
5. 이번 달의 나는 어떤 사람이었나요: ${answers.q5 || "(미답변)"}
6. 잘한 선택: ${answers.q6 || "(미답변)"}
7. 아쉬운 선택: ${answers.q7 || "(미답변)"}
8. 가장 많이 떠오른 사람: ${answers.q8 || "(미답변)"}
9. 그 사람과 관련된 감정: ${answers.q9 || "(미답변)"}
10. 일상 키워드: ${[answers.q10_1, answers.q10_2, answers.q10_3].filter(Boolean).join(", ") || "(미답변)"}
11. 가장 에너지를 쓴 곳: ${answers.q11 || "(미답변)"}
12. 알게 된 나에 대한 사실: ${answers.q12 || "(미답변)"}
13. 다음 달의 나에게 해주고 싶은 말: ${answers.q13 || "(미답변)"}`

  const { text } = await generateText({
    model: openai("gpt-4.1-mini"),
    system: systemPrompt,
    prompt: userPrompt,
    maxOutputTokens: 500,
    temperature: 0.7,
  })

  return Response.json({ essay: text })
}
