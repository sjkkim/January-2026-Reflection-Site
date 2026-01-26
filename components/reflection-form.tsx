"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// interface Answers {
//   q1: string
//   q2: string
//   q2Reason: string
//   q3: string
//   q4: string
//   q5: string
//   q6: string
//   q7: string
//   q8: string
//   q9: string
//   q10_1: string
//   q10_2: string
//   q10_3: string
//   q11: string
//   q12: string
//   q13: string
// }

export interface Answers {
  q1: string
  q2: string
  q2Reason: string
  q3: string
  q4: string
  q5: string
  q6: string
  q7: string
  q8: string
  q9: string
  q10_1: string
  q10_2: string
  q10_3: string
  q11: string
  q12: string
  q13: string
}

interface ReflectionFormProps {
  onGenerate: (answers: Answers) => void
  isLoading: boolean
}

export function ReflectionForm({ onGenerate, isLoading }: ReflectionFormProps) {
  const [answers, setAnswers] = useState<Answers>({
    q1: "",
    q2: "",
    q2Reason: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10_1: "",
    q10_2: "",
    q10_3: "",
    q11: "",
    q12: "",
    q13: "",
  })

  const updateAnswer = (key: keyof Answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate(answers)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Q1 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          1. 2026년 1월을 한 문장으로 표현하면?
        </Label>
        <Input
          value={answers.q1}
          onChange={(e) => updateAnswer("q1", e.target.value)}
          placeholder="예: 새로운 시작을 준비하는 달이었다"
          className="bg-input border-border focus:ring-ring"
        />
      </div>

      {/* Q2 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          2. 이 달의 전반적인 감정은?
        </Label>
        <RadioGroup
          value={answers.q2}
          onValueChange={(value) => updateAnswer("q2", value)}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="좋았던 날이 많았다" id="q2-1" />
            <Label htmlFor="q2-1" className="font-normal cursor-pointer">좋았던 날이 많았다</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="무난했다" id="q2-2" />
            <Label htmlFor="q2-2" className="font-normal cursor-pointer">무난했다</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="힘든 날이 더 많았다" id="q2-3" />
            <Label htmlFor="q2-3" className="font-normal cursor-pointer">힘든 날이 더 많았다</Label>
          </div>
        </RadioGroup>
        <Input
          value={answers.q2Reason}
          onChange={(e) => updateAnswer("q2Reason", e.target.value)}
          placeholder="이유가 있다면... (선택)"
          className="bg-input border-border mt-2"
        />
      </div>

      {/* Q3 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          3. 1월에 가장 기억에 남는 사건은?
        </Label>
        <Textarea
          value={answers.q3}
          onChange={(e) => updateAnswer("q3", e.target.value)}
          placeholder="어떤 일이 있었나요?"
          className="bg-input border-border min-h-[100px]"
        />
      </div>

      {/* Q4 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          4. 그 일이 왜 기억에 남았나요?
        </Label>
        <RadioGroup
          value={answers.q4}
          onValueChange={(value) => updateAnswer("q4", value)}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="기뻐서" id="q4-1" />
            <Label htmlFor="q4-1" className="font-normal cursor-pointer">기뻐서</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="힘들어서" id="q4-2" />
            <Label htmlFor="q4-2" className="font-normal cursor-pointer">힘들어서</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="나를 바꿔서" id="q4-3" />
            <Label htmlFor="q4-3" className="font-normal cursor-pointer">나를 바꿔서</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="그냥 오래 남아서" id="q4-4" />
            <Label htmlFor="q4-4" className="font-normal cursor-pointer">그냥 오래 남아서</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Q5 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          5. 이번 달의 나는 어떤 사람이었나요?
        </Label>
        <Input
          value={answers.q5}
          onChange={(e) => updateAnswer("q5", e.target.value)}
          placeholder="예: 조용히 생각이 많았던 사람"
          className="bg-input border-border"
        />
      </div>

      {/* Q6 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          6. 이번 달 잘한 선택 하나는?
        </Label>
        <Textarea
          value={answers.q6}
          onChange={(e) => updateAnswer("q6", e.target.value)}
          placeholder="스스로 칭찬하고 싶은 선택이 있다면..."
          className="bg-input border-border min-h-[80px]"
        />
      </div>

      {/* Q7 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          7. 이번 달 아쉬운 선택 하나는?
        </Label>
        <Textarea
          value={answers.q7}
          onChange={(e) => updateAnswer("q7", e.target.value)}
          placeholder="다르게 했으면 좋았을 것 같은 일이 있다면..."
          className="bg-input border-border min-h-[80px]"
        />
      </div>

      {/* Q8 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          8. 1월에 가장 많이 떠오른 사람은? (선택)
        </Label>
        <Input
          value={answers.q8}
          onChange={(e) => updateAnswer("q8", e.target.value)}
          placeholder="이름이나 관계 (예: 엄마, 친구 이름)"
          className="bg-input border-border"
        />
      </div>

      {/* Q9 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          9. 그 사람과 관련해 남기고 싶은 감정 한 가지는?
        </Label>
        <Input
          value={answers.q9}
          onChange={(e) => updateAnswer("q9", e.target.value)}
          placeholder="예: 고마움, 미안함, 그리움..."
          className="bg-input border-border"
        />
      </div>

      {/* Q10 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          10. 1월의 일상 키워드 3개
        </Label>
        <div className="flex gap-3">
          <Input
            value={answers.q10_1}
            onChange={(e) => updateAnswer("q10_1", e.target.value)}
            placeholder="키워드 1"
            className="bg-input border-border"
          />
          <Input
            value={answers.q10_2}
            onChange={(e) => updateAnswer("q10_2", e.target.value)}
            placeholder="키워드 2"
            className="bg-input border-border"
          />
          <Input
            value={answers.q10_3}
            onChange={(e) => updateAnswer("q10_3", e.target.value)}
            placeholder="키워드 3"
            className="bg-input border-border"
          />
        </div>
      </div>

      {/* Q11 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          11. 이번 달 가장 에너지를 쓴 곳은?
        </Label>
        <RadioGroup
          value={answers.q11}
          onValueChange={(value) => updateAnswer("q11", value)}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="일" id="q11-1" />
            <Label htmlFor="q11-1" className="font-normal cursor-pointer">일</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="사람" id="q11-2" />
            <Label htmlFor="q11-2" className="font-normal cursor-pointer">사람</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="나 자신" id="q11-3" />
            <Label htmlFor="q11-3" className="font-normal cursor-pointer">나 자신</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="아무 데도 못 썼다" id="q11-4" />
            <Label htmlFor="q11-4" className="font-normal cursor-pointer">아무 데도 못 썼다</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Q12 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          12. 1월을 지나며 알게 된 나에 대한 사실 하나
        </Label>
        <Textarea
          value={answers.q12}
          onChange={(e) => updateAnswer("q12", e.target.value)}
          placeholder="새롭게 발견한 나의 모습이 있다면..."
          className="bg-input border-border min-h-[100px]"
        />
      </div>

      {/* Q13 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          13. 다음 달의 나에게 해주고 싶은 말
        </Label>
        <Input
          value={answers.q13}
          onChange={(e) => updateAnswer("q13", e.target.value)}
          placeholder="2월의 나에게..."
          className="bg-input border-border"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-6 text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {isLoading ? "1월을 정리하는 중…" : "회고록 만들기"}
        </Button>
      </div>
    </form>
  )
}
