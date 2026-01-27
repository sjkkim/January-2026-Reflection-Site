import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  const { answers } = await req.json()

  const systemPrompt = `
당신은 사용자의 2026년 1월 회고 답변을 바탕으로,
사용자가 스스로에게 쓰는 1인칭 회고 에세이를 대신 써주는 역할입니다.

다음 기준을 반드시 지켜 글을 작성하세요.

- 글은 ‘요약’이나 ‘정리된 리포트’처럼 보이지 않게 작성하세요.
- 한 사람이 혼자 천천히 생각을 정리하며 써 내려간 에세이처럼 써주세요.
- 3~4개의 자연스러운 문단으로 구성하세요.
- 각 문단마다 감정의 흐름이 느껴지도록 작성하세요.
- ‘깨달음’, ‘망설임’, ‘뿌듯함’, ‘아쉬움’ 같은 내면의 감정을 자연스럽게 담아주세요.
- 문학적으로 과하지 않되, 담백하고 따뜻한 톤을 유지하세요.
- 글 전체는 1인칭 시점으로 작성하세요.
- 마지막 문단에서는 다음 달을 향한 짧은 다짐이나 마음가짐으로 마무리하세요.

출력 형식 규칙 (매우 중요):

- 에세이 본문을 먼저 작성하세요.
- 본문이 끝난 뒤 반드시 한 줄을 띄운 후,
- 아래 형식 그대로 마지막 줄을 추가하세요.

1월 한 줄 회고
"짧고 담백한 한 문장"

위 형식을 지키지 않으면 글은 완성되지 않은 것입니다.
`

  const userPrompt = `다음은 사용자의 2026년 1월 회고 답변입니다. 이 답변들을 바탕으로 따뜻한 회고 에세이를 작성해주세요:

1. 1월을 한 문장으로: ${answers.q1 || "(미답변)"}
2. 이 달의 전반적인 감정: ${answers.q2} ${answers.q2Reason ? `(이유: ${answers.q2Reason})` : ""}
3. 가장 기억에 남는 장면: ${answers.q3 || "(미답변)"}
4. 그 일이 기억에 남는 이유: ${answers.q4} ${answers.q4Reason ? `(이유: ${answers.q4Reason})` : ""}
5. 이번 달의 나는 어떤 사람이었나요: ${answers.q5 || "(미답변)"}
6. 잘한 선택: ${answers.q6 || "(미답변)"}
7. 아쉬운 선택: ${answers.q7 || "(미답변)"}
8. 가장 많이 떠오른 사람: ${answers.q8 || "(미답변)"}
9. 그 사람과 관련된 감정: ${answers.q9 || "(미답변)"}
10. 일상 키워드: ${[answers.q10_1, answers.q10_2, answers.q10_3].filter(Boolean).join(", ") || "(미답변)"}
11. 가장 에너지를 쓴 곳: ${answers.q11 || "(미답변)"}
12. 1월을 지나며 알게 된 나에 대한 사실 한 가지: ${answers.q12 || "(미답변)"}
13. 2월의 나에게, 미리 해주고 싶은 말 한마디: ${answers.q13 || "(미답변)"}`

  const { text } = await generateText({
    model: openai("gpt-4.1-mini"),
    system: systemPrompt,
    prompt: userPrompt,
    maxOutputTokens: 1000,
    temperature: 0.7,
  })

  return Response.json({ essay: text })
}
