"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy, RefreshCw } from "lucide-react"
import { toPng } from "html-to-image"
import { Image } from "lucide-react"

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

  const saveImage = async () => {
    const node = document.getElementById("result-card")
    if (!node) return

    await document.fonts.ready
  
    const dataUrl = await toPng(node, {
      pixelRatio: 2,
      backgroundColor: "#F9F7F3",
    })
  
    const link = document.createElement("a")
    link.download = "2026-01-회고.png"
    link.href = dataUrl
    link.click()
  }

  const saveStoryImage = async () => {
    const node = document.getElementById("story-card")
    if (!node) return
  
    await document.fonts.ready
  
    const dataUrl = await toPng(node, {
      pixelRatio: 1, // 이미 1080px이라 1이면 충분
    })
  
    const link = document.createElement("a")
    link.download = "2026-01-회고-스토리.png"
    link.href = dataUrl
    link.click()
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

      <div 
      id="result-card"
      className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-sm">
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
        <Button
          onClick={saveImage}
          variant="outline"
          className="flex items-center gap-2 bg-transparent"
        >
          <Image className="w-4 h-4" />
          이미지로 저장하기
        </Button>
        <Button
          onClick={saveStoryImage}
          variant="outline"
          className="flex items-center gap-2 bg-transparent"
        >
        스토리용 이미지 저장
       </Button>

      </div>
      {/* 스토리 저장용 (화면에는 안 보임) */}
      <div
        id="story-card"
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          width: "1080px",
          height: "1920px",
          backgroundColor: "#F9F7F3",
          padding: "120px 100px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "serif",
        }}
      >
        <div>
          <h1 style={{ fontSize: "48px", marginBottom: "48px" }}>
            2026년 1월 회고
          </h1>

          {essay.split("\n\n").slice(0, 4).map((p, i) => (
            <p
              key={i}
              style={{
                fontSize: "34px",
                lineHeight: 1.6,
                marginBottom: "32px",
              }}
            >
              {p}
            </p>
          ))}
        </div>
        <div style={{ fontSize: "22px", opacity: 0.6 }}>
          monthly reflection
        </div>
      </div>
    </div>
  )
}
