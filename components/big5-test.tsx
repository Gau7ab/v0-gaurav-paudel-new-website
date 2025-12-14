"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AnimateOnScroll } from "@/components/scroll-animation"
import { ArrowRight } from "lucide-react"

interface Big5Question {
  id: number
  question: string
  trait: "O" | "C" | "E" | "A" | "N"
  subcategory: string // Added subcategory
}

interface Big5Scores {
  O: number // Openness to Experience
  C: number // Conscientiousness
  E: number // Extraversion
  A: number // Agreeableness
  N: number // Neuroticism
}

interface UserAnswer {
  questionId: number
  value: number
}

const likertOptions = [
  { label: "Strongly Disagree", value: 1 },
  { label: "Disagree", value: 2 },
  { label: "Neutral", value: 3 },
  { label: "Agree", value: 4 },
  { label: "Strongly Agree", value: 5 },
]

const big5Questions: Big5Question[] = [
  // Neuroticism (Emotional Stability) - N
  { id: 1, question: "I often feel nervous or anxious.", trait: "N", subcategory: "N1" },
  { id: 2, question: "I worry about things even when there's no reason.", trait: "N", subcategory: "N1" },
  { id: 3, question: "I easily get irritated by small things.", trait: "N", subcategory: "N2" },
  { id: 4, question: "I lose my temper quickly.", trait: "N", subcategory: "N2" },
  { id: 5, question: "I often feel sad or down for no clear reason.", trait: "N", subcategory: "N3" },
  { id: 6, question: "I frequently feel hopeless or discouraged.", trait: "N", subcategory: "N3" },
  { id: 7, question: "I often feel uncomfortable around others.", trait: "N", subcategory: "N4" },
  { id: 8, question: "I worry about being judged by others.", trait: "N", subcategory: "N4" },
  { id: 9, question: "I find it hard to resist temptations.", trait: "N", subcategory: "N5" },
  { id: 10, question: "I often act on impulse without thinking.", trait: "N", subcategory: "N5" },
  { id: 11, question: "I struggle to stay calm in difficult situations.", trait: "N", subcategory: "N6" },
  { id: 12, question: "I panic easily in stressful situations.", trait: "N", subcategory: "N6" },

  // Extraversion (Sociability and Enthusiasm) - E
  { id: 13, question: "I easily connect with others emotionally.", trait: "E", subcategory: "E1" },
  { id: 14, question: "I often express affection toward people I care about.", trait: "E", subcategory: "E1" },
  { id: 15, question: "I enjoy being in large groups or social events.", trait: "E", subcategory: "E2" },
  { id: 16, question: "I seek out company rather than being alone.", trait: "E", subcategory: "E2" },
  { id: 17, question: "I often take the lead in group situations.", trait: "E", subcategory: "E3" },
  { id: 18, question: "I enjoy being the center of attention.", trait: "E", subcategory: "E3" },
  { id: 19, question: "I like to keep busy with many activities.", trait: "E", subcategory: "E4" },
  { id: 20, question: "I live a fast-paced life.", trait: "E", subcategory: "E4" },
  { id: 21, question: "I enjoy taking risks for excitement.", trait: "E", subcategory: "E5" },
  { id: 22, question: "I get bored easily without stimulation.", trait: "E", subcategory: "E5" },
  { id: 23, question: "I feel enthusiastic and upbeat most of the time.", trait: "E", subcategory: "E6" },
  { id: 24, question: "I frequently experience joy and excitement.", trait: "E", subcategory: "E6" },

  // Openness to Experience (Creativity and Curiosity) - O
  { id: 25, question: "I enjoy letting my imagination run wild.", trait: "O", subcategory: "O1" },
  { id: 26, question: "I often daydream about different worlds or possibilities.", trait: "O", subcategory: "O1" },
  { id: 27, question: "I am deeply moved by art or music.", trait: "O", subcategory: "O2" },
  { id: 28, question: "I appreciate beauty in nature and creativity.", trait: "O", subcategory: "O2" },
  { id: 29, question: "I am very aware of my own emotions.", trait: "O", subcategory: "O3" },
  { id: 30, question: "I reflect deeply on how I feel.", trait: "O", subcategory: "O3" },
  { id: 31, question: "I enjoy trying new and unusual activities.", trait: "O", subcategory: "O4" },
  { id: 32, question: "I like breaking routines and experimenting with life.", trait: "O", subcategory: "O4" },
  { id: 33, question: "I enjoy exploring complex concepts and theories.", trait: "O", subcategory: "O5" },
  { id: 34, question: "I often think about philosophical or abstract ideas.", trait: "O", subcategory: "O5" },
  { id: 35, question: "I am open to reconsidering traditional beliefs.", trait: "O", subcategory: "O6" },
  { id: 36, question: "I believe in questioning social norms and authority.", trait: "O", subcategory: "O6" },

  // Agreeableness (Compassion and Cooperation) - A
  { id: 37, question: "I believe most people have good intentions.", trait: "A", subcategory: "A1" },
  { id: 38, question: "I usually assume the best about others.", trait: "A", subcategory: "A1" },
  { id: 39, question: "I express my opinions honestly and clearly.", trait: "A", subcategory: "A2" },
  { id: 40, question: "I avoid being deceptive or manipulative.", trait: "A", subcategory: "A2" },
  { id: 41, question: "I like helping others even when it’s inconvenient.", trait: "A", subcategory: "A3" },
  { id: 42, question: "I often put others’ needs before mine.", trait: "A", subcategory: "A3" },
  { id: 43, question: "I avoid arguments and conflicts.", trait: "A", subcategory: "A4" },
  { id: 44, question: "I try to maintain harmony in groups.", trait: "A", subcategory: "A4" },
  { id: 45, question: "I rarely brag about my achievements.", trait: "A", subcategory: "A5" },
  { id: 46, question: "I prefer to stay humble even when I succeed.", trait: "A", subcategory: "A5" },
  { id: 47, question: "I feel deep concern for people who are suffering.", trait: "A", subcategory: "A6" },
  { id: 48, question: "I am very empathetic toward others' emotions.", trait: "A", subcategory: "A6" },

  // Conscientiousness (Organization and Dependability) - C
  { id: 49, question: "I consider myself capable and efficient.", trait: "C", subcategory: "C1" },
  { id: 50, question: "I feel confident handling difficult tasks.", trait: "C", subcategory: "C1" },
  { id: 51, question: "I like to keep things organized and tidy.", trait: "C", subcategory: "C2" },
  { id: 52, question: "I follow clear routines in my life.", trait: "C", subcategory: "C2" },
  { id: 53, question: "I take my responsibilities seriously.", trait: "C", subcategory: "C3" },
  { id: 54, question: "I keep promises and meet expectations.", trait: "C", subcategory: "C3" },
  { id: 55, question: "I am driven to achieve my goals.", trait: "C", subcategory: "C4" },
  { id: 56, question: "I set high standards for myself.", trait: "C", subcategory: "C4" },
  { id: 57, question: "I complete tasks even when I don’t feel like it.", trait: "C", subcategory: "C5" },
  { id: 58, question: "I avoid procrastination and stay focused.", trait: "C", subcategory: "C5" },
  { id: 59, question: "I think carefully before making decisions.", trait: "C", subcategory: "C6" },
  { id: 60, question: "I weigh pros and cons before acting.", trait: "C", subcategory: "C6" },
]

interface Big5TestProps {
  onComplete: (scores: Big5Scores, answers: UserAnswer[]) => void // Updated onComplete signature
  onBack: () => void
}

export function Big5Test({ onComplete, onBack }: Big5TestProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]) // Store individual answers
  const [selectedAnswerValue, setSelectedAnswerValue] = useState<number | null>(null)

  const handleAnswer = (value: number) => {
    setSelectedAnswerValue(value)
  }

  const nextQuestion = () => {
    if (selectedAnswerValue !== null) {
      const currentQuestion = big5Questions[currentQuestionIndex]
      const newAnswer: UserAnswer = { questionId: currentQuestion.id, value: selectedAnswerValue }
      const updatedAnswers = [...userAnswers, newAnswer]
      setUserAnswers(updatedAnswers)

      if (currentQuestionIndex < big5Questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
        setSelectedAnswerValue(null)
      } else {
        // Last question, calculate final scores and complete the test
        const finalScores: Big5Scores = { O: 0, C: 0, E: 0, A: 0, N: 0 }
        updatedAnswers.forEach((answer) => {
          const question = big5Questions.find((q) => q.id === answer.questionId)
          if (question) {
            finalScores[question.trait] += answer.value
          }
        })
        onComplete(finalScores, updatedAnswers) // Pass both scores and answers
      }
    }
  }

  const currentQuestion = big5Questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / big5Questions.length) * 100

  return (
    <AnimateOnScroll animation="fadeIn">
      <Card className="border-none shadow-xl">
        <CardHeader className="text-center border-b">
          <CardTitle className="text-2xl md:text-3xl font-bold">Big 5 Personality Test</CardTitle>
          <p className="text-muted-foreground">Discover your Big 5 traits with this assessment</p>
          <div className="mt-4">
            <Progress value={progress} />
            <p className="text-sm text-muted-foreground mt-2">
              Question {currentQuestionIndex + 1} of {big5Questions.length}
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <AnimateOnScroll animation="slideUp" key={currentQuestion.id}>
            <div className="mb-8">
              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center">{currentQuestion.question}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {likertOptions.map((option) => (
                  <Card
                    key={option.value}
                    className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                      selectedAnswerValue === option.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleAnswer(option.value)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            selectedAnswerValue === option.value
                              ? "bg-primary border-primary"
                              : "border-muted-foreground"
                          }`}
                        ></div>
                        <p className="text-sm font-medium">{option.label}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button onClick={onBack} variant="outline">
                Back to Test Selection
              </Button>
              <Button
                onClick={nextQuestion}
                disabled={selectedAnswerValue === null}
                className="flex items-center gap-2 px-8"
              >
                {currentQuestionIndex === big5Questions.length - 1 ? "Get Results" : "Next Question"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </AnimateOnScroll>
        </CardContent>
      </Card>
    </AnimateOnScroll>
  )
}
