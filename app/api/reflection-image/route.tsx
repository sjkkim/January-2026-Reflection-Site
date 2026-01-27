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
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ fontSize: 36, fontWeight: 600, marginBottom: 40 }}>
            2026년 1월 회고록
          </div>

          {paragraphs.map((p: string, i: number) => (
            <div
              key={i}
              style={{
                fontSize: 24,
                lineHeight: 1.6,
                marginBottom: 24,
              }}
            >
              {p}
            </div>
          ))}

          <div
            style={{
              position: "absolute",
              bottom: 40,
              right: 60,
              fontSize: 16,
              color: "#999",
            }}
          >
            ✍️ 회고록 생성기 @__nov.__
          </div>
        </div>
      ),
      {
        width: 1080,
        height: 1350,
      }
    )
  } catch (e) {
    console.error("IMAGE API ERROR:", e)
    return new Response("Failed to generate image", { status: 500 })
  }
}
