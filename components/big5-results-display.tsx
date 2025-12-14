"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimateOnScroll } from "@/components/scroll-animation"
import { Share2, RotateCcw, Printer, Info, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList, Bar, BarChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PersonalityReport } from "./personality-report"

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

interface Big5Question {
  id: number
  question: string
  trait: "O" | "C" | "E" | "A" | "N"
  subcategory: string
}

// Re-define big5Questions here for use in this component to map answers to questions
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
  { id: 41, question: "I like helping others even when it's inconvenient.", trait: "A", subcategory: "A3" },
  { id: 42, question: "I often put others' needs before mine.", trait: "A", subcategory: "A3" },
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
  { id: 57, question: "I complete tasks even when I don't feel like it.", trait: "C", subcategory: "C5" },
  { id: 58, question: "I avoid procrastination and stay focused.", trait: "C", subcategory: "C5" },
  { id: 59, question: "I think carefully before making decisions.", trait: "C", subcategory: "C6" },
  { id: 60, question: "I weigh pros and cons before acting.", trait: "C", subcategory: "C6" },
]

// Subcategory names mapping
const subcategoryNames: Record<string, string> = {
  N1: "Anxiety",
  N2: "Anger/Hostility",
  N3: "Depression",
  N4: "Self-Consciousness",
  N5: "Impulsiveness",
  N6: "Vulnerability",
  E1: "Warmth",
  E2: "Gregariousness",
  E3: "Assertiveness",
  E4: "Activity",
  E5: "Excitement-Seeking",
  E6: "Positive Emotions",
  O1: "Fantasy",
  O2: "Aesthetics",
  O3: "Feelings",
  O4: "Actions",
  O5: "Ideas",
  O6: "Values",
  A1: "Trust",
  A2: "Straightforwardness",
  A3: "Altruism",
  A4: "Compliance",
  A5: "Modesty",
  A6: "Tender-Mindedness",
  C1: "Competence",
  C2: "Order",
  C3: "Dutifulness",
  C4: "Achievement Striving",
  C5: "Self-Discipline",
  C6: "Deliberation",
}

// Trait full names
const traitFullNames: Record<string, string> = {
  O: "Openness to Experience",
  C: "Conscientiousness",
  E: "Extraversion",
  A: "Agreeableness",
  N: "Neuroticism",
}

interface Big5ResultsDisplayProps {
  scores: Big5Scores
  answers: UserAnswer[]
  onReset: () => void
}

export function Big5ResultsDisplay({ scores, answers, onReset }: Big5ResultsDisplayProps) {
  const [showPrintReport, setShowPrintReport] = useState(false)
  const [expandedTraits, setExpandedTraits] = useState<Record<string, boolean>>({
    N: true,
    E: true,
    O: true,
    A: true,
    C: true,
  })

  const getTraitLevel = (score: number): "Low" | "Moderate" | "High" => {
    if (score <= 30) return "Low"
    if (score > 30 && score <= 42) return "Moderate"
    return "High"
  }

  const getSubcategoryLevel = (score: number): "Low" | "Moderate" | "High" => {
    if (score <= 5) return "Low"
    if (score > 5 && score <= 7) return "Moderate"
    return "High"
  }

  const getTraitSummary = (trait: keyof Big5Scores, score: number) => {
    const level = getTraitLevel(score)
    switch (trait) {
      case "N":
        if (level === "Low")
          return "You are emotionally stable, calm under pressure, and resilient in stressful situations."
        if (level === "Moderate")
          return "You experience a balanced emotional life, occasionally feeling anxious but generally able to manage stress."
        return "You may struggle with emotional reactivity, often feeling anxious, moody, or overwhelmed under stress."
      case "E":
        if (level === "Low")
          return "You tend to be reserved, enjoy solitude, and feel drained by too much social interaction."
        if (level === "Moderate")
          return "You enjoy socializing but also value alone time, showing a balanced sociability."
        return "You are outgoing, energetic, and feel energized by social interaction and group activities."
      case "O":
        if (level === "Low") return "You prefer familiarity and routine over novelty and abstract ideas."
        if (level === "Moderate")
          return "You are curious but also grounded, open to new experiences while valuing practicality."
        return "You are highly imaginative, creative, and intellectually curious with a love for new ideas and experiences."
      case "A":
        if (level === "Low")
          return "You may be competitive, skeptical of others, and prefer being direct over diplomatic."
        if (level === "Moderate")
          return "You are cooperative but can assert yourself when needed, balancing empathy with boundaries."
        return "You are empathetic, trusting, and highly cooperative, often prioritizing harmony and kindness."
      case "C":
        if (level === "Low")
          return "You may prefer spontaneity over planning, and sometimes struggle with follow-through or organization."
        if (level === "Moderate") return "You are generally dependable and organized but flexible when needed."
        return "You are disciplined, goal-oriented, and highly reliable in completing tasks and managing responsibilities."
      default:
        return ""
    }
  }

  const getSubcategorySummary = (subcategory: string, score: number) => {
    const level = getSubcategoryLevel(score)
    switch (subcategory) {
      case "N1": // Anxiety
        if (level === "Low") return "You rarely experience anxiety and tend to be calm and unworried."
        if (level === "Moderate") return "You experience occasional anxiety but generally manage it well."
        return "You frequently feel anxious, worried, and prone to nervousness."
      case "N2": // Anger/Hostility
        if (level === "Low") return "You are generally calm and rarely experience feelings of anger or hostility."
        if (level === "Moderate")
          return "You occasionally feel irritated or angry but typically manage these emotions constructively."
        return "You are prone to anger, easily frustrated, and may express hostility."
      case "N3": // Depression
        if (level === "Low")
          return "You are generally cheerful and optimistic, rarely experiencing feelings of sadness or hopelessness."
        if (level === "Moderate")
          return "You experience occasional periods of sadness but generally maintain a positive outlook."
        return "You frequently feel sad, hopeless, and may struggle with depressive moods."
      case "N4": // Self-Consciousness
        if (level === "Low")
          return "You are self-assured and comfortable in social situations, rarely worrying about others' opinions."
        if (level === "Moderate")
          return "You are generally comfortable but may occasionally feel self-conscious in social settings."
        return "You are highly self-conscious, easily embarrassed, and worry excessively about what others think."
      case "N5": // Impulsiveness
        if (level === "Low") return "You are disciplined and thoughtful, rarely acting on impulse."
        if (level === "Moderate") return "You are generally self-controlled but may occasionally act on impulse."
        return "You are prone to impulsive behavior, often acting without thinking through consequences."
      case "N6": // Vulnerability
        if (level === "Low")
          return "You are resilient and composed under pressure, rarely feeling overwhelmed by stress."
        if (level === "Moderate")
          return "You are generally resilient but may feel vulnerable during highly stressful times."
        return "You feel vulnerable and overwhelmed by stress, struggling to cope with pressure."

      case "E1": // Warmth
        if (level === "Low")
          return "You tend to be reserved and less outwardly affectionate, preferring deeper, fewer connections."
        if (level === "Moderate")
          return "You are generally warm and friendly, showing affection to those you care about."
        return "You are highly warm, affectionate, and easily form close bonds with others."
      case "E2": // Gregariousness
        if (level === "Low") return "You prefer solitude or small groups, finding large social gatherings draining."
        if (level === "Moderate") return "You enjoy social interaction but also value alone time, balancing both."
        return "You thrive in social settings, enjoy large groups, and seek out company."
      case "E3": // Assertiveness
        if (level === "Low") return "You tend to be less assertive, preferring to let others take the lead."
        if (level === "Moderate") return "You are assertive when necessary but generally prefer a cooperative approach."
        return "You are highly assertive, enjoy taking charge, and express your opinions forcefully."
      case "E4": // Activity
        if (level === "Low") return "You prefer a slower pace of life and less intense activities."
        if (level === "Moderate")
          return "You are moderately active, enjoying a balance of energetic and relaxed pursuits."
        return "You are highly energetic, enjoy a fast-paced life, and are always on the go."
      case "E5": // Excitement-Seeking
        if (level === "Low") return "You prefer routine and predictability, avoiding thrilling or risky activities."
        if (level === "Moderate")
          return "You are open to new experiences but generally prefer a moderate level of excitement."
        return "You actively seek excitement, enjoy thrilling activities, and are prone to taking risks."
      case "E6": // Positive Emotions
        if (level === "Low") return "You tend to be less expressive of positive emotions, maintaining a more even keel."
        if (level === "Moderate")
          return "You experience and express positive emotions regularly, maintaining a generally optimistic outlook."
        return "You are highly enthusiastic, cheerful, and frequently experience joy and excitement."

      case "O1": // Fantasy
        if (level === "Low")
          return "You are grounded in reality and less inclined to daydream or engage in elaborate fantasies."
        if (level === "Moderate") return "You enjoy imagination but remain practical, balancing fantasy with reality."
        return "You have a vivid imagination, enjoy daydreaming, and are drawn to fantastical ideas."
      case "O2": // Aesthetics
        if (level === "Low")
          return "You are less moved by art, music, or natural beauty, preferring practical considerations."
        if (level === "Moderate") return "You appreciate art and beauty but it's not a central focus."
        return "You have a deep appreciation for art, music, and beauty, finding profound meaning in them."
      case "O3": // Feelings
        if (level === "Low") return "You tend to be less aware of or expressive about your own emotions."
        if (level === "Moderate") return "You are generally aware of your emotions and can reflect on them."
        return "You are highly aware of your emotions, reflect deeply on them, and experience a wide range of feelings."
      case "O4": // Actions
        if (level === "Low") return "You prefer routine and familiarity, avoiding new or unconventional activities."
        if (level === "Moderate")
          return "You are open to new experiences but generally prefer a degree of predictability."
        return "You enjoy trying new things, breaking routines, and experimenting with life."
      case "O5": // Ideas
        if (level === "Low")
          return "You prefer concrete facts and practical solutions over abstract or complex theories."
        if (level === "Moderate") return "You are curious about ideas but remain grounded in practical applications."
        return "You are intellectually curious, enjoy exploring complex ideas, and love theoretical discussions."
      case "O6": // Values
        if (level === "Low")
          return "You hold traditional values and beliefs, less inclined to question authority or social norms."
        if (level === "Moderate") return "You are open to reconsidering beliefs but generally respect tradition."
        return "You are open-minded, willing to question traditional values, and challenge authority."

      case "A1": // Trust
        if (level === "Low") return "You tend to be skeptical and cautious of others' intentions."
        if (level === "Moderate") return "You are generally trusting but maintain a healthy level of caution."
        return "You are highly trusting, believing in the good intentions of most people."
      case "A2": // Straightforwardness
        if (level === "Low") return "You may be indirect or manipulative in your communication."
        if (level === "Moderate") return "You are generally honest but can be diplomatic when needed."
        return "You are direct, honest, and straightforward in your communication."
      case "A3": // Altruism
        if (level === "Low") return "You prioritize your own needs and may be less inclined to help others."
        if (level === "Moderate") return "You are willing to help others but also prioritize your own well-being."
        return "You are highly altruistic, often putting others' needs before your own."
      case "A4": // Compliance
        if (level === "Low") return "You are competitive and may prefer to assert your own will over cooperating."
        if (level === "Moderate") return "You are cooperative but can assert yourself when necessary."
        return "You are highly cooperative, avoid conflict, and prioritize harmony."
      case "A5": // Modesty
        if (level === "Low") return "You may be prone to bragging or highlighting your achievements."
        if (level === "Moderate") return "You are generally modest but can acknowledge your accomplishments."
        return "You are humble and rarely brag about your achievements."
      case "A6": // Tender-Mindedness
        if (level === "Low") return "You are less empathetic and may struggle to understand others' emotions."
        if (level === "Moderate") return "You are generally empathetic and concerned for others' well-being."
        return "You are deeply empathetic, compassionate, and feel strong concern for others' suffering."

      case "C1": // Competence
        if (level === "Low") return "You may doubt your abilities and feel less capable of handling difficult tasks."
        if (level === "Moderate") return "You are generally competent and confident in your abilities."
        return "You are highly competent, efficient, and confident in your ability to handle challenges."
      case "C2": // Order
        if (level === "Low") return "You prefer spontaneity and may struggle with organization and tidiness."
        if (level === "Moderate") return "You are generally organized but can be flexible when needed."
        return "You are highly organized, meticulous, and prefer a structured environment."
      case "C3": // Dutifulness
        if (level === "Low") return "You may be less reliable and sometimes neglect your responsibilities."
        if (level === "Moderate") return "You are generally dependable and take your responsibilities seriously."
        return "You are highly dutiful, reliable, and always fulfill your obligations."
      case "C4": // Achievement Striving
        if (level === "Low") return "You are less driven by external achievements and may set lower goals."
        if (level === "Moderate") return "You are motivated to achieve goals but also value balance."
        return "You are highly ambitious, driven to succeed, and set high standards for yourself."
      case "C5": // Self-Discipline
        if (level === "Low") return "You may struggle with self-discipline and procrastination."
        if (level === "Moderate") return "You are generally self-disciplined but may occasionally procrastinate."
        return "You are highly self-disciplined, persistent, and rarely procrastinate."
      case "C6": // Deliberation
        if (level === "Low") return "You tend to make quick decisions without much thought."
        if (level === "Moderate") return "You consider options before acting but can also be spontaneous."
        return "You are thoughtful, deliberate, and carefully weigh pros and cons before making decisions."
      default:
        return ""
    }
  }

  // Calculate subcategory scores
  const calculateSubcategoryScores = () => {
    const subcategoryScores: Record<string, number> = {}
    const subcategories = [
      "N1",
      "N2",
      "N3",
      "N4",
      "N5",
      "N6",
      "E1",
      "E2",
      "E3",
      "E4",
      "E5",
      "E6",
      "O1",
      "O2",
      "O3",
      "O4",
      "O5",
      "O6",
      "A1",
      "A2",
      "A3",
      "A4",
      "A5",
      "A6",
      "C1",
      "C2",
      "C3",
      "C4",
      "C5",
      "C6",
    ]

    subcategories.forEach((subcat) => {
      const questions = big5Questions.filter((q) => q.subcategory === subcat)
      const score = questions.reduce((sum, q) => {
        const answer = answers.find((a) => a.questionId === q.id)
        return sum + (answer?.value || 0)
      }, 0)
      subcategoryScores[subcat] = score
    })

    return subcategoryScores
  }

  const subcategoryScores = calculateSubcategoryScores()

  // Generate integrated personality dimensions
  const getIntegratedDimensions = () => {
    const oLevel = getTraitLevel(scores.O)
    const cLevel = getTraitLevel(scores.C)
    const eLevel = getTraitLevel(scores.E)
    const aLevel = getTraitLevel(scores.A)
    const nLevel = getTraitLevel(scores.N)

    return {
      emotionalStyle:
        nLevel === "High"
          ? "You tend to experience emotions intensely and may be sensitive to stress. Developing coping strategies and emotional regulation techniques can help you navigate challenging situations more effectively."
          : nLevel === "Low"
            ? "You are emotionally stable and resilient, able to handle stress and pressure with composure. This stability allows you to remain calm in difficult situations and make clear-headed decisions."
            : "You have a balanced emotional style, experiencing emotions appropriately while maintaining overall stability. You can handle most stressful situations while still being in touch with your feelings.",

      interpersonalRelations:
        eLevel === "High" && aLevel === "High"
          ? "You are highly sociable and cooperative, forming warm relationships easily. You thrive in social settings and prioritize harmony in your interactions."
          : eLevel === "Low" && aLevel === "Low"
            ? "You prefer independence and may be more selective in your relationships. You value authenticity over social pleasantries and may prefer deeper one-on-one connections."
            : "You have a balanced approach to relationships, able to connect with others while maintaining appropriate boundaries. You can adapt your social style to different situations.",

      vocationalStyle:
        cLevel === "High" && oLevel === "High"
          ? "You combine creativity with discipline, making you well-suited for roles that require both innovation and follow-through. You excel in positions that allow you to develop new ideas while maintaining high standards."
          : cLevel === "High" && oLevel === "Low"
            ? "You are highly organized and detail-oriented, excelling in structured environments with clear procedures. You prefer established methods and are reliable in executing tasks."
            : cLevel === "Low" && oLevel === "High"
              ? "You are creative and adaptable but may struggle with routine tasks. Roles that allow flexibility and creative expression suit you best."
              : "You have a flexible vocational style, able to balance creativity with practicality as needed.",

      patternOfActivity:
        eLevel === "High" && cLevel === "High"
          ? "You are highly energetic and productive, always keeping busy with multiple activities. You thrive on achievement and social engagement."
          : eLevel === "Low" && cLevel === "Low"
            ? "You prefer a relaxed pace and may be selective about how you spend your energy. You value quality over quantity in your activities."
            : "You have a balanced activity pattern, able to be productive when needed while also knowing when to rest and recharge.",

      attitudes:
        oLevel === "High"
          ? "You are open-minded and intellectually curious, willing to explore new ideas and perspectives. You value growth, learning, and personal development."
          : oLevel === "Low"
            ? "You hold traditional values and prefer familiar approaches. You value stability, consistency, and proven methods."
            : "You have balanced attitudes, open to new ideas while respecting tradition and established practices.",

      academicPerformance:
        cLevel === "High" && oLevel === "High"
          ? "You are well-suited for academic pursuits, combining intellectual curiosity with discipline and organization. You can engage deeply with complex material while maintaining focus."
          : cLevel === "High"
            ? "You excel in structured academic environments, with strong organizational skills and the discipline to complete assignments on time."
            : oLevel === "High"
              ? "You are intellectually curious and enjoy learning, though you may benefit from developing more structured study habits."
              : "You may need to develop strategies to stay engaged with academic material and maintain consistent study habits.",

      character:
        aLevel === "High" && cLevel === "High"
          ? "You are principled, reliable, and compassionate. You take your commitments seriously and treat others with respect and kindness."
          : aLevel === "High"
            ? "You are warm, empathetic, and considerate of others. You prioritize harmony and cooperation in your relationships."
            : cLevel === "High"
              ? "You are responsible, disciplined, and goal-oriented. You hold yourself to high standards and follow through on commitments."
              : "You value authenticity and personal freedom, preferring to follow your own path rather than conforming to expectations.",
    }
  }

  const integratedDimensions = getIntegratedDimensions()

  const mainTraitChartData = [
    { name: "Openness", score: scores.O, fill: "hsl(var(--chart-1))" },
    { name: "Conscientiousness", score: scores.C, fill: "hsl(var(--chart-2))" },
    { name: "Extraversion", score: scores.E, fill: "hsl(var(--chart-3))" },
    { name: "Agreeableness", score: scores.A, fill: "hsl(var(--chart-4))" },
    { name: "Neuroticism", score: scores.N, fill: "hsl(var(--chart-5))" },
  ]

  const shareResult = () => {
    const text = `I just completed the Big 5 personality test! My scores are: Openness: ${scores.O}/60, Conscientiousness: ${scores.C}/60, Extraversion: ${scores.E}/60, Agreeableness: ${scores.A}/60, Neuroticism: ${scores.N}/60. Check out my full personality profile!`

    if (navigator.share) {
      navigator.share({
        title: "My Big 5 Personality Test Result",
        text: text,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(`${text} - Take the test at ${window.location.href}`)
      alert("Result copied to clipboard!")
    }
  }

  const handlePrintReport = () => {
    setShowPrintReport(true)
    setTimeout(() => {
      window.print()
      setShowPrintReport(false)
    }, 100)
  }

  const toggleTraitExpanded = (trait: string) => {
    setExpandedTraits((prev) => ({ ...prev, [trait]: !prev[trait] }))
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Low":
        return "text-blue-600 dark:text-blue-400"
      case "Moderate":
        return "text-yellow-600 dark:text-yellow-400"
      case "High":
        return "text-green-600 dark:text-green-400"
      default:
        return ""
    }
  }

  const getLevelBgColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-blue-100 dark:bg-blue-900/30"
      case "Moderate":
        return "bg-yellow-100 dark:bg-yellow-900/30"
      case "High":
        return "bg-green-100 dark:bg-green-900/30"
      default:
        return ""
    }
  }

  if (showPrintReport) {
    return (
      <PersonalityReport
        testType="BIG5"
        big5Scores={scores}
        big5Answers={answers}
        customSummaries={integratedDimensions}
      />
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <AnimateOnScroll animation="fadeIn">
        <Card className="border-none shadow-xl">
          <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-primary/5 border-b">
            <CardTitle className="text-3xl md:text-4xl font-bold text-primary">
              Your Big 5 Personality Profile
            </CardTitle>
            <p className="text-lg text-muted-foreground">Comprehensive analysis based on the Five-Factor Model</p>
          </CardHeader>
          <CardContent className="p-4 md:p-8">
            {/* Main Trait Chart */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Core Trait Scores</h2>
              <AnimateOnScroll animation="zoomIn" delay={0.2}>
                <Card className="border border-primary/20">
                  <CardContent className="p-4 md:p-6">
                    <ChartContainer
                      config={{
                        score: {
                          label: "Score",
                          color: "hsl(var(--primary))",
                        },
                      }}
                      className="h-[300px] w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mainTraitChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                          <YAxis domain={[0, 60]} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                            <LabelList dataKey="score" position="top" />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                    <div className="mt-4 text-center text-sm text-muted-foreground">
                      <p className="font-semibold">Rating Scale:</p>
                      <p>
                        <span className="text-blue-600">Low: 0-30</span> |{" "}
                        <span className="text-yellow-600">Moderate: 31-42</span> |{" "}
                        <span className="text-green-600">High: 43-60</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            </section>

            {/* Score Summary Table */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Score Summary</h2>
              <AnimateOnScroll animation="slideUp" delay={0.3}>
                <Card className="border border-primary/20 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold">Trait</th>
                            <th className="px-4 py-3 text-center font-semibold">Score</th>
                            <th className="px-4 py-3 text-center font-semibold">Level</th>
                            <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Interpretation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(scores).map(([trait, score], index) => {
                            const level = getTraitLevel(score)
                            return (
                              <tr key={trait} className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                                <td className="px-4 py-3 font-medium">{traitFullNames[trait]}</td>
                                <td className="px-4 py-3 text-center font-bold">{score}/60</td>
                                <td className="px-4 py-3 text-center">
                                  <span
                                    className={`px-2 py-1 rounded-full text-sm font-medium ${getLevelBgColor(level)} ${getLevelColor(level)}`}
                                  >
                                    {level}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
                                  {getTraitSummary(trait as keyof Big5Scores, score)}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            </section>

            {/* Detailed Trait Analysis with Subcategories */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Detailed Trait Analysis</h2>
              <div className="space-y-4">
                {(["N", "E", "O", "A", "C"] as const).map((trait, traitIndex) => {
                  const traitScore = scores[trait]
                  const traitLevel = getTraitLevel(traitScore)
                  const subcategories = ["1", "2", "3", "4", "5", "6"].map((num) => `${trait}${num}`)

                  return (
                    <AnimateOnScroll key={trait} animation="slideUp" delay={0.1 + traitIndex * 0.1}>
                      <Card className="border border-primary/20">
                        <CardHeader
                          className="cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => toggleTraitExpanded(trait)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <CardTitle className="text-lg md:text-xl">{traitFullNames[trait]}</CardTitle>
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelBgColor(traitLevel)} ${getLevelColor(traitLevel)}`}
                              >
                                {traitScore}/60 - {traitLevel}
                              </span>
                            </div>
                            {expandedTraits[trait] ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm mt-2">{getTraitSummary(trait, traitScore)}</p>
                        </CardHeader>
                        {expandedTraits[trait] && (
                          <CardContent className="pt-0">
                            <div className="border-t pt-4">
                              <h4 className="font-semibold mb-4 text-sm text-muted-foreground uppercase tracking-wide">
                                Subcategory Breakdown
                              </h4>
                              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {subcategories.map((subcat) => {
                                  const subcatScore = subcategoryScores[subcat]
                                  const subcatLevel = getSubcategoryLevel(subcatScore)
                                  return (
                                    <div key={subcat} className="p-3 rounded-lg bg-muted/30 border">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-sm">{subcategoryNames[subcat]}</span>
                                        <span
                                          className={`text-xs font-medium px-2 py-0.5 rounded ${getLevelBgColor(subcatLevel)} ${getLevelColor(subcatLevel)}`}
                                        >
                                          {subcatScore}/10
                                        </span>
                                      </div>
                                      <p className="text-xs text-muted-foreground">
                                        {getSubcategorySummary(subcat, subcatScore)}
                                      </p>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    </AnimateOnScroll>
                  )
                })}
              </div>
            </section>

            {/* Integrated Personality Dimensions */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Integrated Personality Dimensions</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <AnimateOnScroll animation="slideUp" delay={0.1}>
                  <Card className="border border-primary/20 h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        Emotional Style
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{integratedDimensions.emotionalStyle}</p>
                    </CardContent>
                  </Card>
                </AnimateOnScroll>

                <AnimateOnScroll animation="slideUp" delay={0.15}>
                  <Card className="border border-primary/20 h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Interpersonal Relations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{integratedDimensions.interpersonalRelations}</p>
                    </CardContent>
                  </Card>
                </AnimateOnScroll>

                <AnimateOnScroll animation="slideUp" delay={0.2}>
                  <Card className="border border-primary/20 h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        Vocational Style
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{integratedDimensions.vocationalStyle}</p>
                    </CardContent>
                  </Card>
                </AnimateOnScroll>

                <AnimateOnScroll animation="slideUp" delay={0.25}>
                  <Card className="border border-primary/20 h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        Pattern of Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{integratedDimensions.patternOfActivity}</p>
                    </CardContent>
                  </Card>
                </AnimateOnScroll>

                <AnimateOnScroll animation="slideUp" delay={0.3}>
                  <Card className="border border-primary/20 h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                        Attitudes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{integratedDimensions.attitudes}</p>
                    </CardContent>
                  </Card>
                </AnimateOnScroll>

                <AnimateOnScroll animation="slideUp" delay={0.35}>
                  <Card className="border border-primary/20 h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                        Academic Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{integratedDimensions.academicPerformance}</p>
                    </CardContent>
                  </Card>
                </AnimateOnScroll>

                <AnimateOnScroll animation="slideUp" delay={0.4}>
                  <Card className="border border-primary/20 h-full md:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        Character
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{integratedDimensions.character}</p>
                    </CardContent>
                  </Card>
                </AnimateOnScroll>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <AnimateOnScroll animation="slideUp" delay={0.5}>
                <div className="flex flex-col items-center gap-2">
                  <Button onClick={handlePrintReport} className="flex items-center gap-2">
                    <Printer className="h-4 w-4" />
                    Print Full Report
                  </Button>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Info className="h-3 w-3" />
                    <span>Use "Save as PDF" to download</span>
                  </div>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="slideUp" delay={0.55}>
                <Button onClick={shareResult} variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Share2 className="h-4 w-4" />
                  Share Result
                </Button>
              </AnimateOnScroll>
              <AnimateOnScroll animation="slideUp" delay={0.6}>
                <Button variant="outline" onClick={onReset} className="flex items-center gap-2 bg-transparent">
                  <RotateCcw className="h-4 w-4" />
                  Take Test Again
                </Button>
              </AnimateOnScroll>
              <AnimateOnScroll animation="slideUp" delay={0.65}>
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
