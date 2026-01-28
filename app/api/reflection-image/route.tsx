import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { essay } = body

    if (!essay) {
      return new Response("No essay provided", { status: 400 })
    }

    const paragraphs: string[] = essay.split("\n\n").slice(0, 5)

    // ✅ Edge에서 폰트 로드 (fetch 방식)
    const titleFont = await fetch(
      new URL("/fonts/NotoSerifKR-Regular.woff2", req.url)
    ).then(res => res.arrayBuffer())
    
    const bodyFont = await fetch(
      new URL("/fonts/NotoSansKR-Regular.woff2", req.url)
    ).then(res => res.arrayBuffer())

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px",
            backgroundColor: "#fafafa",
          }}
        >
          {/* 제목 */}
          <div
            style={{
              fontFamily: "TitleFont",
              fontSize: 40,
              fontWeight: 400,
              marginBottom: 40,
              color: "#111",
            }}
          >
            2026년 1월 회고록
          </div>

          {/* 본문 */}
          {paragraphs.map((p: string, i: number) => (
            <div
              key={i}
              style={{
                fontFamily: "BodyFont",
                fontSize: 26,
                lineHeight: 1.7,
                marginBottom: 24,
                color: "#222",
                whiteSpace: "pre-wrap",
              }}
            >
              {p}
            </div>
          ))}

          {/* 워터마크 */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              right: 60,
              fontFamily: "BodyFont",
              fontSize: 16,
              color: "#999",
            }}
          >
            ✍️ 회고록 생성기
          </div>
        </div>
      ),
      {
        width: 1080,
        height: 1350,
        fonts: [
          {
            name: "TitleFont",
            data: titleFont,
            weight: 400,
          },
          {
            name: "BodyFont",
            data: bodyFont,
            weight: 400,
          },
        ],
      }
    )
  } catch (e) {
    console.error("IMAGE API ERROR:", e)
    return new Response("Failed to generate image", { status: 500 })
  }
}
