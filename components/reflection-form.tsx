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
  q4Reason: string
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
    q4Reason: "",
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
          1. 나의 1월을 한 문장으로 표현해본다면?
        </Label>
        <Input
          value={answers.q1}
          onChange={(e) => updateAnswer("q1", e.target.value)}
          placeholder="지금 떠오르는 표현을 적어보세요"
          className="bg-input border-border focus:ring-ring"
        />
      </div>

      {/* Q2 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          2. 지난 한 달, 대체로 어땠나요?
        </Label>
        <RadioGroup
          value={answers.q2}
          onValueChange={(value) => updateAnswer("q2", value)}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="좋았던 날이 더 많았다" id="q2-1" 
            className="h-5 w-5
            border-2
            border-gray-400
            data-[state=checked]:border-primary"/>
            <Label htmlFor="q2-1" className="font-normal cursor-pointer">좋았던 날이 더 많았다</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="무난하고 잔잔했다" id="q2-2" 
            className="h-5 w-5
            border-2
            border-gray-400
            data-[state=checked]:border-primary"/>
            <Label htmlFor="q2-2" className="font-normal cursor-pointer">무난하고 잔잔했다</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="조금 지치는 날이 많았다" id="q2-3" 
            className="h-5 w-5
            border-2
            border-gray-400
            data-[state=checked]:border-primary"/>
            <Label htmlFor="q2-3" className="font-normal cursor-pointer">조금 지치는 날이 많았다</Label>
          </div>
        </RadioGroup>
        <Input
          value={answers.q2Reason}
          onChange={(e) => updateAnswer("q2Reason", e.target.value)}
          placeholder="그렇게 느낀 이유가 있다면 적어보세요"
          className="bg-input border-border mt-2"
        />
      </div>

      {/* Q3 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          3. 1월을 떠올리면 제일 먼저 생각나는 장면은?
        </Label>
        <Textarea
          value={answers.q3}
          onChange={(e) => updateAnswer("q3", e.target.value)}
          placeholder="떠오르는 장면이 있다면"
          className="bg-input border-border min-h-[100px]"
        />
      </div>

      {/* Q4 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          4. 그 장면이 유독 기억에 남은 이유는 무엇인가요?
        </Label>
        <RadioGroup
          value={answers.q4}
          onValueChange={(value) => updateAnswer("q4", value)}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="성취감을 느꼈기 때문에" id="q4-1" className="h-5 w-5
            border-2
            border-gray-400
            data-[state=checked]:border-primary"/>
            <Label htmlFor="q4-1" className="font-normal cursor-pointer">성취감을 느꼈기 때문에</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="조금 버거웠던 기억이라" id="q4-2" className="h-5 w-5
            border-2
            border-gray-400
            data-[state=checked]:border-primary"/>
            <Label htmlFor="q4-2" className="font-normal cursor-pointer">조금 버거웠던 기억이라</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="나를 조금 바꿔놓았기 때문에" id="q4-3" className="h-5 w-5
            border-2
            border-gray-400
            data-[state=checked]:border-primary"/>
            <Label htmlFor="q4-3" className="font-normal cursor-pointer">나를 조금 바꿔놓았기 때문에</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="특별한 이유는 없지만 잊히지 않아서" id="q4-4" className="h-5 w-5
            border-2
            border-gray-400
            data-[state=checked]:border-primary"/>
            <Label htmlFor="q4-4" className="font-normal cursor-pointer">특별한 이유는 없지만 잊히지 않아서</Label>
          </div>
        </RadioGroup>
        <Input
          value={answers.q4Reason}
          onChange={(e) => updateAnswer("q4Reason", e.target.value)}
          placeholder="왜 기억에 남았는지 적어보세요"
          className="bg-input border-border mt-2"
        />
      </div>

      {/* Q5 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          5. 1월의 나는 어떤 모습에 가장 가까웠나요?
        </Label>
        <Input
          value={answers.q5}
          onChange={(e) => updateAnswer("q5", e.target.value)}
          placeholder="ex) 묵묵하게 할 일을 해내던 사람"
          className="bg-input border-border"
        />
      </div>

      {/* Q6 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          6. 결과를 떠나, 1월의 나에게 '이 선택은 정말 잘했다' 싶은 것이 있나요?
        </Label>
        <Textarea
          value={answers.q6}
          onChange={(e) => updateAnswer("q6", e.target.value)}
          placeholder="스스로 괜찮다고 느낀 선택"
          className="bg-input border-border min-h-[80px]"
        />
      </div>

      {/* Q7 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          7. 다시 돌아간다면, 조금 다르게 시도해보고 싶은 순간이 있을까요?
        </Label>
        <Textarea
          value={answers.q7}
          onChange={(e) => updateAnswer("q7", e.target.value)}
          placeholder="아쉬웠던 순간 하나"
          className="bg-input border-border min-h-[80px]"
        />
      </div>

      {/* Q8 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          8. 1월 동안 유독 자주 떠올랐던 사람이 있었을까요? (선택)
        </Label>
        <Input
          value={answers.q8}
          onChange={(e) => updateAnswer("q8", e.target.value)}
          placeholder="이름이나 관계"
          className="bg-input border-border"
        />
      </div>

      {/* Q9 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          9. 그 사람을 떠올리면 가장 먼저 드는 감정은?
        </Label>
        <Input
          value={answers.q9}
          onChange={(e) => updateAnswer("q9", e.target.value)}
          placeholder="고마움, 미안함, 그리움 .."
          className="bg-input border-border"
        />
      </div>

      {/* Q10 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          10. 1월의 일상을 채웠던 키워드 3가지를 꼽아주세요.
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
          11. 이번 달 나의 에너지는 주로 어디에 머물렀나요?
        </Label>
        <RadioGroup
          value={answers.q11}
          onValueChange={(value) => updateAnswer("q11", value)}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="맡은 일을 처리하는 데 집중했다" id="q11-1" className="h-5 w-5
            border-2
            border-gray-400
            data-[state=checked]:border-primary"/>
            <Label htmlFor="q11-1" className="font-normal cursor-pointer">맡은 일을 처리하는 데 집중했다</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="주변 사람들과 시간을 보내는 데 썼다" id="q11-2" className="h-5 w-5
            border-2
            border-gray-400
            data-[state=checked]:border-primary"/>
            <Label htmlFor="q11-2" className="font-normal cursor-pointer">주변 사람들과 시간을 보내는 데 썼다</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="나만의 시간을 갖는 데 사용했다" id="q11-3" className="h-5 w-5
            border-2
            border-gray-400
            data-[state=checked]:border-primary"/>
            <Label htmlFor="q11-3" className="font-normal cursor-pointer">나만의 시간을 갖는 데 사용했다</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="정신없이 흘러가 버렸다" id="q11-4" className="h-5 w-5
            border-2
            border-gray-400
            data-[state=checked]:border-primary"/>
            <Label htmlFor="q11-4" className="font-normal cursor-pointer">정신없이 흘러가 버렸다</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Q12 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          12. 1월을 지나며 알게 된 나에 대한 사실 한 가지
        </Label>
        <Textarea
          value={answers.q12}
          onChange={(e) => updateAnswer("q12", e.target.value)}
          placeholder="ex) 마감 기한이 닥쳐야 집중력이 폭발한다는 걸 다시금 깨달음"
          className="bg-input border-border min-h-[100px]"
        />
      </div>

      {/* Q13 */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-foreground">
          13. 2월의 나에게, 미리 해주고 싶은 말 한마디
        </Label>
        <Input
          value={answers.q13}
          onChange={(e) => updateAnswer("q13", e.target.value)}
          placeholder="스스로에게 남기고 싶은 말"
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
