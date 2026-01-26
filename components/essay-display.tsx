"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy, RefreshCw } from "lucide-react"

interface EssayDisplayProps {
  essay: string
  onReset: () => void
}

export function EssayDisplay({ essay, onReset }: EssayDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(essay)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          당신의 1월 회고록
        </h2>
        <p className="text-muted-foreground">
          1월의 이야기가 완성되었습니다
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-sm">
        <div className="prose prose-lg max-w-none">
          {essay.split("\n\n").map((paragraph, index) => (
            <p
              key={index}
              className="text-foreground leading-relaxed mb-4 last:mb-0 font-serif"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          onClick={handleCopy}
          variant="outline"
          className="flex items-center gap-2 bg-transparent"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              복사되었습니다
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              텍스트 복사하기
            </>
          )}
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          className="flex items-center gap-2 bg-transparent"
        >
          <RefreshCw className="w-4 h-4" />
          다시 만들기
        </Button>
      </div>
    </div>
  )
}
