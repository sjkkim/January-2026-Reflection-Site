// essay-display.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy, RefreshCw } from "lucide-react"

interface EssayDisplayProps {
  essay: string
  imageUrl: string | null
  onReset: () => void
}

export function EssayDisplay({ essay, imageUrl, onReset }: EssayDisplayProps) {
  const [copied, setCopied] = useState(false)
  const isInstagram = /Instagram/i.test(navigator.userAgent)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(essay)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">당신의 1월 회고록</h2>
        <p className="text-muted-foreground">
          1월의 이야기가 완성되었습니다
        </p>
      </div>

      {/* 저장 가능한 이미지 */}
      {imageUrl && (
        <div className="rounded-xl overflow-hidden shadow">
          <img
            src={imageUrl}
            alt="회고 결과 이미지"
            className="w-full"
          />
        </div>
      )}

      {/* 인스타 안내 */}
      {isInstagram && (
        <p className="text-center text-sm text-muted-foreground">
          📌 마음에 들면 이미지를 꾹 눌러 저장해 보세요.
        </p>
      )}

      {/* 텍스트 (접기) */}
      <details>
        <summary className="cursor-pointer text-sm text-muted-foreground">
          텍스트로 보기
        </summary>
        <div className="mt-4 space-y-4">
          {essay.split("\n\n").map((p, i) => (
            <p key={i} className="leading-relaxed font-serif">
              {p}
            </p>
          ))}
        </div>
      </details>

      {/* 액션 */}
      <div className="flex gap-3 justify-center pt-4">
        <Button variant="outline" onClick={handleCopy}>
          {copied ? "복사됨" : "텍스트 복사"}
        </Button>
        <Button variant="outline" onClick={onReset}>
          <RefreshCw className="w-4 h-4 mr-2" />
          다시 만들기
        </Button>
      </div>
    </div>
  )
}

