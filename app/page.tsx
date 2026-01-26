"use client"

import { useState } from "react"
import { ReflectionForm } from "@/components/reflection-form"
import { EssayDisplay } from "@/components/essay-display"
import { Answers } from "@/components/reflection-form"

export default function Home() {
  const [essay, setEssay] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const handleGenerate = async (answers: Answers) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-reflection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      })
      const data = await response.json()
      setEssay(data.essay)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setEssay(null)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-3 font-serif text-balance">
            2026년 1월 회고록
          </h1>
          <p className="text-muted-foreground text-lg">
            질문에 답하면, 한 달의 이야기가 글이 됩니다
          </p>
        </header>

        {/* Main Content */}
        {essay ? (
          <EssayDisplay essay={essay} onReset={handleReset} />
        ) : (
          <ReflectionForm onGenerate={handleGenerate} isLoading={isLoading} />
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>당신의 1월이 어떤 모습이었든, 그 시간은 소중합니다.</p>
        </footer>
      </div>
    </main>
  )
}
