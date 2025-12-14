"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AnimateOnScroll } from "@/components/scroll-animation"
import { Share2, RotateCcw, ArrowRight, Printer, Info } from "lucide-react"
import Link from "next/link"
import { Big5Test } from "@/components/big5-test"
import { Big5ResultsDisplay } from "@/components/big5-results-display"
import { PersonalityReport } from "@/components/personality-report"

interface Question {
  id: number
  question: string
  optionA: { text: string; type: string }
  optionB: { text: string; type: string }
}

interface Scores {
  E: number
  I: number
  S: number
  N: number
  T: number
  F: number
  J: number
  P: number
}

interface PersonalityType {
  type: string
  name: string
  description: string
  traits: string[]
  strengths: string[]
  careers: string[]
}

interface Big5Scores {
  O: number
  C: number
  E: number
  A: number
  N: number
}

interface UserAnswer {
  questionId: number
  value: number
}

const mbtiQuestions: Question[] = [
  {
    id: 1,
    question: "Where do you get your energy from?",
    optionA: { text: "Spending time alone helps me recharge.", type: "I" },
    optionB: { text: "I feel energized by being around other people.", type: "E" },
  },
  {
    id: 2,
    question: "How do you prefer to gather information?",
    optionA: { text: "I trust facts, data, and real-life experience.", type: "S" },
    optionB: { text: "I enjoy interpreting meanings and exploring possibilities.", type: "N" },
  },
  {
    id: 3,
    question: "How do you make decisions?",
    optionA: { text: "I prefer logical reasoning over personal feelings.", type: "T" },
    optionB: { text: "I consider values and how decisions affect people.", type: "F" },
  },
  {
    id: 4,
    question: "How do you approach your daily life?",
    optionA: { text: "I like schedules, plans, and clear structure.", type: "J" },
    optionB: { text: "I prefer flexibility and spontaneity.", type: "P" },
  },
  {
    id: 5,
    question: "In conversations, you usually:",
    optionA: { text: "Think before speaking, choosing words carefully.", type: "I" },
    optionB: { text: "Speak freely and process thoughts out loud.", type: "E" },
  },
  {
    id: 6,
    question: "When learning something new, you prefer:",
    optionA: { text: "Practical examples and step-by-step instruction.", type: "S" },
    optionB: { text: "Big ideas, theories, and patterns.", type: "N" },
  },
  {
    id: 7,
    question: "When solving problems, you tend to:",
    optionA: { text: "Analyze pros and cons objectively.", type: "T" },
    optionB: { text: "Focus on people's needs and harmony.", type: "F" },
  },
  {
    id: 8,
    question: "When working on a project, you usually:",
    optionA: { text: "Prefer sticking to a plan with set deadlines.", type: "J" },
    optionB: { text: "Feel more productive with freedom to adapt as you go.", type: "P" },
  },
]

const personalityTypes: Record<string, PersonalityType> = {
  INTJ: {
    type: "INTJ",
    name: "The Architect",
    description:
      "You're a strategic thinker with a natural drive for implementing your ideas and achieving your goals.",
    traits: ["Independent", "Strategic", "Determined", "Insightful"],
    strengths: ["Long-term planning", "Problem-solving", "Independent work", "Strategic thinking"],
    careers: ["Engineer", "Scientist", "Architect", "Consultant", "Researcher"],
  },
  INTP: {
    type: "INTP",
    name: "The Thinker",
    description: "You're innovative and curious, with an unquenchable thirst for knowledge and understanding.",
    traits: ["Analytical", "Creative", "Independent", "Curious"],
    strengths: ["Logical analysis", "Creative problem-solving", "Theoretical thinking", "Adaptability"],
    careers: ["Researcher", "Programmer", "Analyst", "Professor", "Writer"],
  },
  ENTJ: {
    type: "ENTJ",
    name: "The Commander",
    description: "You're a natural leader, able to organize people and resources to achieve your vision.",
    traits: ["Confident", "Strategic", "Charismatic", "Efficient"],
    strengths: ["Leadership", "Strategic planning", "Decision-making", "Goal achievement"],
    careers: ["CEO", "Manager", "Entrepreneur", "Lawyer", "Consultant"],
  },
  ENTP: {
    type: "ENTP",
    name: "The Debater",
    description: "You're quick-witted and clever, enjoying the challenge of ideas and mental sparring.",
    traits: ["Innovative", "Enthusiastic", "Strategic", "Charismatic"],
    strengths: ["Innovation", "Brainstorming", "Debate", "Adaptability"],
    careers: ["Entrepreneur", "Consultant", "Journalist", "Inventor", "Marketing"],
  },
  INFJ: {
    type: "INFJ",
    name: "The Advocate",
    description: "You're creative and insightful, inspired and independent, with a deep desire to help others.",
    traits: ["Idealistic", "Insightful", "Principled", "Passionate"],
    strengths: ["Understanding others", "Creative solutions", "Long-term vision", "Helping others"],
    careers: ["Counselor", "Writer", "Teacher", "Social Worker", "Psychologist"],
  },
  INFP: {
    type: "INFP",
    name: "The Mediator",
    description: "You're poetic, kind and altruistic, always eager to help good causes and help others.",
    traits: ["Idealistic", "Loyal", "Adaptable", "Curious"],
    strengths: ["Creativity", "Open-mindedness", "Passion", "Personal growth"],
    careers: ["Writer", "Artist", "Counselor", "Teacher", "Social Worker"],
  },
  ENFJ: {
    type: "ENFJ",
    name: "The Protagonist",
    description: "You're charismatic and inspiring, able to mesmerize listeners with your passion.",
    traits: ["Charismatic", "Altruistic", "Natural leader", "Reliable"],
    strengths: ["Leadership", "Communication", "Empathy", "Organizing"],
    careers: ["Teacher", "Coach", "Politician", "Counselor", "Manager"],
  },
  ENFP: {
    type: "ENFP",
    name: "The Campaigner",
    description:
      "You're enthusiastic, creative, and sociable. You thrive on new ideas and inspire others with your passion.",
    traits: ["Enthusiastic", "Creative", "Sociable", "Energetic"],
    strengths: ["Communication", "Enthusiasm", "Creativity", "People skills"],
    careers: ["Marketing", "Journalism", "Acting", "Counseling", "Teaching"],
  },
  ISTJ: {
    type: "ISTJ",
    name: "The Logistician",
    description: "You're practical and fact-minded, reliable and responsible, always getting the job done.",
    traits: ["Responsible", "Sincere", "Practical", "Hardworking"],
    strengths: ["Organization", "Reliability", "Practical skills", "Persistence"],
    careers: ["Accountant", "Administrator", "Engineer", "Doctor", "Lawyer"],
  },
  ISFJ: {
    type: "ISFJ",
    name: "The Protector",
    description: "You're warm-hearted and dedicated, always ready to protect loved ones and serve others.",
    traits: ["Supportive", "Reliable", "Patient", "Imaginative"],
    strengths: ["Supporting others", "Reliability", "Practical skills", "Attention to detail"],
    careers: ["Nurse", "Teacher", "Social Worker", "Administrator", "Counselor"],
  },
  ESTJ: {
    type: "ESTJ",
    name: "The Executive",
    description: "You're excellent at managing things and people, bringing order and organization to projects.",
    traits: ["Organized", "Practical", "Logical", "Assertive"],
    strengths: ["Leadership", "Organization", "Practical solutions", "Decision-making"],
    careers: ["Manager", "Administrator", "Judge", "Teacher", "Supervisor"],
  },
  ESFJ: {
    type: "ESFJ",
    name: "The Consul",
    description: "You're extraordinarily caring, social and popular, always eager to help others.",
    traits: ["Caring", "Social", "Popular", "Dutiful"],
    strengths: ["People skills", "Practical helping", "Organization", "Loyalty"],
    careers: ["Teacher", "Nurse", "Social Worker", "Counselor", "Administrator"],
  },
  ISTP: {
    type: "ISTP",
    name: "The Virtuoso",
    description: "You're bold and practical, a master of all kinds of tools and skilled at hands-on work.",
    traits: ["Practical", "Observant", "Adaptable", "Reserved"],
    strengths: ["Practical skills", "Crisis management", "Flexibility", "Efficiency"],
    careers: ["Engineer", "Mechanic", "Pilot", "Programmer", "Athlete"],
  },
  ISFP: {
    type: "ISFP",
    name: "The Adventurer",
    description: "You're flexible and charming, always ready to explore new possibilities and experiences.",
    traits: ["Flexible", "Charming", "Curious", "Artistic"],
    strengths: ["Creativity", "Open-mindedness", "Passion", "Practical skills"],
    careers: ["Artist", "Designer", "Musician", "Counselor", "Teacher"],
  },
  ESTP: {
    type: "ESTP",
    name: "The Entrepreneur",
    description: "You're smart, energetic and perceptive, truly enjoying living on the edge.",
    traits: ["Energetic", "Perceptive", "Spontaneous", "Pragmatic"],
    strengths: ["Adaptability", "Practical skills", "People skills", "Crisis management"],
    careers: ["Sales", "Marketing", "Entrepreneur", "Paramedic", "Actor"],
  },
  ESFP: {
    type: "ESFP",
    name: "The Entertainer",
    description: "You're spontaneous, energetic and enthusiastic, always ready to try something new.",
    traits: ["Spontaneous", "Energetic", "Enthusiastic", "People-focused"],
    strengths: ["People skills", "Practical helping", "Enthusiasm", "Flexibility"],
    careers: ["Teacher", "Social Worker", "Actor", "Artist", "Counselor"],
  },
}

export default function PersonalityTest() {
  const [testType, setTestType] = useState<"none" | "MBTI" | "BIG5">("none")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [mbtiScores, setMbtiScores] = useState<Scores>({
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  })
  const [mbtiSelectedAnswer, setMbtiSelectedAnswer] = useState<string | null>(null)
  const [mbtiResult, setMbtiResult] = useState<string>("")
  const [showMbtiResult, setShowMbtiResult] = useState(false)
  const [showMbtiPrintReport, setShowMbtiPrintReport] = useState(false)

  const [big5Scores, setBig5Scores] = useState<Big5Scores | null>(null)
  const [big5Answers, setBig5Answers] = useState<UserAnswer[]>([]) // State to store Big 5 answers
  const [showBig5Result, setShowBig5Result] = useState(false)

  const handleMbtiAnswer = (type: string) => {
    setMbtiSelectedAnswer(type)
  }

  const nextMbtiQuestion = () => {
    if (mbtiSelectedAnswer) {
      setMbtiScores((prev) => ({
        ...prev,
        [mbtiSelectedAnswer]: prev[mbtiSelectedAnswer as keyof Scores] + 1,
      }))

      if (currentQuestion < mbtiQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
        setMbtiSelectedAnswer(null)
      } else {
        calculateMbtiResult()
      }
    }
  }

  const calculateMbtiResult = () => {
    const finalScores = {
      ...mbtiScores,
      [mbtiSelectedAnswer!]: mbtiScores[mbtiSelectedAnswer! as keyof Scores] + 1,
    }

    const personality =
      (finalScores.E > finalScores.I ? "E" : "I") +
      (finalScores.S > finalScores.N ? "S" : "N") +
      (finalScores.T > finalScores.F ? "T" : "F") +
      (finalScores.J > finalScores.P ? "J" : "P")

    setMbtiResult(personality)
    setShowMbtiResult(true)
  }

  const resetMbtiTest = () => {
    setCurrentQuestion(0)
    setMbtiScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 })
    setMbtiSelectedAnswer(null)
    setShowMbtiResult(false)
    setMbtiResult("")
    setTestType("none") // Go back to test selection
  }

  const shareMbtiResult = () => {
    const personalityInfo = personalityTypes[mbtiResult]
    const text = `I just discovered I'm ${personalityInfo.name} (${mbtiResult})! ${personalityInfo.description}`

    if (navigator.share) {
      navigator.share({
        title: "My Personality Test Result",
        text: text,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(`${text} - Take the test at ${window.location.href}`)
      alert("Result copied to clipboard!")
    }
  }

  const handleMbtiPrintReport = () => {
    setShowMbtiPrintReport(true)
    setTimeout(() => {
      window.print()
      setShowMbtiPrintReport(false)
    }, 100)
  }

  const handleBig5Complete = (scores: Big5Scores, answers: UserAnswer[]) => {
    setBig5Scores(scores)
    setBig5Answers(answers) // Store the answers
    setShowBig5Result(true)
  }

  const resetBig5Test = () => {
    setBig5Scores(null)
    setBig5Answers([]) // Clear answers
    setShowBig5Result(false)
    setTestType("none") // Go back to test selection
  }

  const mbtiProgress = ((currentQuestion + 1) / mbtiQuestions.length) * 100

  if (testType === "none") {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <AnimateOnScroll animation="fadeIn">
          <Card className="border-none shadow-xl">
            <CardHeader className="text-center border-b">
              <CardTitle className="text-2xl md:text-3xl font-bold">Choose Your Personality Test</CardTitle>
              <p className="text-muted-foreground">Select a test to discover more about yourself</p>
            </CardHeader>
            <CardContent className="p-8 flex flex-col gap-4">
              <AnimateOnScroll animation="slideUp" delay={0.2}>
                <Button onClick={() => setTestType("MBTI")} className="w-full h-12 text-lg">
                  MBTI Personality Test
                </Button>
              </AnimateOnScroll>
              <AnimateOnScroll animation="slideUp" delay={0.3}>
                <Button onClick={() => setTestType("BIG5")} className="w-full h-12 text-lg">
                  Big 5 Personality Test
                </Button>
              </AnimateOnScroll>
            </CardContent>
          </Card>
        </AnimateOnScroll>
      </div>
    )
  }

  if (testType === "MBTI") {
    if (showMbtiPrintReport) {
      return (
        <PersonalityReport testType="MBTI" mbtiResult={mbtiResult} mbtiPersonalityInfo={personalityTypes[mbtiResult]} />
      )
    }

    if (showMbtiResult) {
      const personalityInfo = personalityTypes[mbtiResult]

      return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <AnimateOnScroll animation="fadeIn">
            <Card className="border-none shadow-xl">
              <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-primary/5 border-b">
                <CardTitle className="text-3xl md:text-4xl font-bold text-primary">Your Personality Type</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <AnimateOnScroll animation="zoomIn" delay={0.2}>
                    <div className="inline-block p-6 bg-primary/10 rounded-full mb-4">
                      <span className="text-4xl md:text-6xl font-bold text-primary">{mbtiResult}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{personalityInfo.name}</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{personalityInfo.description}</p>
                  </AnimateOnScroll>
                </div>

                <div className="grid gap-6 md:grid-cols-3 mb-8">
                  <AnimateOnScroll animation="slideUp" delay={0.3}>
                    <Card className="border border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Key Traits</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {personalityInfo.traits.map((trait, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              {trait}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </AnimateOnScroll>

                  <AnimateOnScroll animation="slideUp" delay={0.4}>
                    <Card className="border border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Strengths</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {personalityInfo.strengths.map((strength, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </AnimateOnScroll>

                  <AnimateOnScroll animation="slideUp" delay={0.5}>
                    <Card className="border border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Career Matches</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {personalityInfo.careers.map((career, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              {career}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </AnimateOnScroll>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <AnimateOnScroll animation="slideUp" delay={0.7}>
                    <div className="flex flex-col items-center gap-2">
                      <Button onClick={handleMbtiPrintReport} className="flex items-center gap-2">
                        <Printer className="h-4 w-4" />
                        Print Report
                      </Button>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Info className="h-3 w-3" />
                        <span>Please use "Save as PDF" option to download your report</span>
                      </div>
                    </div>
                  </AnimateOnScroll>
                  <AnimateOnScroll animation="slideUp" delay={0.8}>
                    <Button
                      onClick={shareMbtiResult}
                      variant="outline"
                      className="flex items-center gap-2 bg-transparent"
                    >
                      <Share2 className="h-4 w-4" />
                      Share Result
                    </Button>
                  </AnimateOnScroll>
                  <AnimateOnScroll animation="slideUp" delay={0.9}>
                    <Button
                      variant="outline"
                      onClick={resetMbtiTest}
                      className="flex items-center gap-2 bg-transparent"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Take Test Again
                    </Button>
                  </AnimateOnScroll>
                  <AnimateOnScroll animation="slideUp" delay={1.0}>
                    <Button variant="outline" asChild>
                      <Link href="/">Back to Portfolio</Link>
                    </Button>
                  </AnimateOnScroll>
                </div>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        </div>
      )
    }

    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <AnimateOnScroll animation="fadeIn">
          <Card className="border-none shadow-xl">
            <CardHeader className="text-center border-b">
              <CardTitle className="text-2xl md:text-3xl font-bold">MBTI Personality Test</CardTitle>
              <p className="text-muted-foreground">Discover your personality type with this quick assessment</p>
              <div className="mt-4">
                <Progress value={mbtiProgress} />
                <p className="text-sm text-muted-foreground mt-2">
                  Question {currentQuestion + 1} of {mbtiQuestions.length}
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <AnimateOnScroll animation="slideUp" key={currentQuestion}>
                <div className="mb-8">
                  <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center">
                    {mbtiQuestions[currentQuestion].question}
                  </h3>

                  <div className="space-y-4">
                    <Card
                      className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                        mbtiSelectedAnswer === mbtiQuestions[currentQuestion].optionA.type
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => handleMbtiAnswer(mbtiQuestions[currentQuestion].optionA.type)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              mbtiSelectedAnswer === mbtiQuestions[currentQuestion].optionA.type
                                ? "bg-primary border-primary"
                                : "border-muted-foreground"
                            }`}
                          ></div>
                          <p className="text-lg">{mbtiQuestions[currentQuestion].optionA.text}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                        mbtiSelectedAnswer === mbtiQuestions[currentQuestion].optionB.type
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => handleMbtiAnswer(mbtiQuestions[currentQuestion].optionB.type)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              mbtiSelectedAnswer === mbtiQuestions[currentQuestion].optionB.type
                                ? "bg-primary border-primary"
                                : "border-muted-foreground"
                            }`}
                          ></div>
                          <p className="text-lg">{mbtiQuestions[currentQuestion].optionB.text}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <Button onClick={() => setTestType("none")} variant="outline">
                    Back to Test Selection
                  </Button>
                  <Button
                    onClick={nextMbtiQuestion}
                    disabled={mbtiSelectedAnswer === null}
                    className="flex items-center gap-2 px-8"
                  >
                    {currentQuestion === mbtiQuestions.length - 1 ? "Get Results" : "Next Question"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </AnimateOnScroll>
            </CardContent>
          </Card>
        </AnimateOnScroll>
      </div>
    )
  }

  if (testType === "BIG5") {
    if (showBig5Result && big5Scores && big5Answers) {
      return <Big5ResultsDisplay scores={big5Scores} answers={big5Answers} onReset={resetBig5Test} />
    }
    return <Big5Test onComplete={handleBig5Complete} onBack={() => setTestType("none")} />
  }

  return null // Should not happen if testType is handled
}
