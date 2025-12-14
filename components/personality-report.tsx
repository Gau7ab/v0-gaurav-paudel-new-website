"use client"

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

interface Big5Question {
  id: number
  question: string
  trait: "O" | "C" | "E" | "A" | "N"
  subcategory: string
}

interface PersonalityReportProps {
  testType: "MBTI" | "BIG5"
  mbtiResult?: string
  mbtiPersonalityInfo?: any
  big5Scores?: Big5Scores
  big5Answers?: UserAnswer[]
  customSummaries?: {
    emotionalStyle: string
    interpersonalRelations: string
    vocationalStyle: string
    patternOfActivity: string
    attitudes: string
    academicPerformance: string
    character: string
  }
}

const getCurrentDate = () => {
  const now = new Date()
  const day = now.getDate().toString().padStart(2, "0")
  const month = (now.getMonth() + 1).toString().padStart(2, "0")
  const year = now.getFullYear()
  return `${day}/${month}/${year}`
}

// Re-define big5Questions for this component
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

export function PersonalityReport({
  testType,
  mbtiResult,
  mbtiPersonalityInfo,
  big5Scores,
  big5Answers,
  customSummaries,
}: PersonalityReportProps) {
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

  const getTraitSummary = (trait: string, score: number) => {
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
      case "N1":
        if (level === "Low") return "Rarely experiences anxiety; tends to be calm and unworried."
        if (level === "Moderate") return "Experiences occasional anxiety but generally manages it well."
        return "Frequently feels anxious, worried, and prone to nervousness."
      case "N2":
        if (level === "Low") return "Generally calm; rarely experiences feelings of anger or hostility."
        if (level === "Moderate") return "Occasionally feels irritated but typically manages emotions constructively."
        return "Prone to anger, easily frustrated, and may express hostility."
      case "N3":
        if (level === "Low") return "Generally cheerful and optimistic; rarely feels sad or hopeless."
        if (level === "Moderate") return "Occasional periods of sadness but maintains a positive outlook."
        return "Frequently feels sad, hopeless, and may struggle with depressive moods."
      case "N4":
        if (level === "Low") return "Self-assured and comfortable in social situations."
        if (level === "Moderate") return "Generally comfortable but occasionally self-conscious."
        return "Highly self-conscious and worries excessively about others' opinions."
      case "N5":
        if (level === "Low") return "Disciplined and thoughtful; rarely acts on impulse."
        if (level === "Moderate") return "Generally self-controlled but may occasionally act impulsively."
        return "Prone to impulsive behavior without thinking through consequences."
      case "N6":
        if (level === "Low") return "Resilient and composed under pressure."
        if (level === "Moderate") return "Generally resilient but may feel vulnerable during high stress."
        return "Feels vulnerable and overwhelmed by stress."

      case "E1":
        if (level === "Low") return "Reserved and less outwardly affectionate."
        if (level === "Moderate") return "Generally warm and friendly with those close."
        return "Highly warm, affectionate, and forms close bonds easily."
      case "E2":
        if (level === "Low") return "Prefers solitude or small groups."
        if (level === "Moderate") return "Enjoys social interaction but values alone time."
        return "Thrives in social settings and seeks out company."
      case "E3":
        if (level === "Low") return "Less assertive; prefers to let others lead."
        if (level === "Moderate") return "Assertive when necessary but prefers cooperation."
        return "Highly assertive; enjoys taking charge."
      case "E4":
        if (level === "Low") return "Prefers a slower pace of life."
        if (level === "Moderate") return "Moderately active with balance of energy."
        return "Highly energetic; enjoys a fast-paced life."
      case "E5":
        if (level === "Low") return "Prefers routine and predictability."
        if (level === "Moderate") return "Open to experiences but prefers moderate excitement."
        return "Actively seeks excitement and thrilling activities."
      case "E6":
        if (level === "Low") return "Less expressive of positive emotions."
        if (level === "Moderate") return "Experiences positive emotions regularly."
        return "Highly enthusiastic, cheerful, and joyful."

      case "O1":
        if (level === "Low") return "Grounded in reality; less inclined to daydream."
        if (level === "Moderate") return "Enjoys imagination while remaining practical."
        return "Vivid imagination; drawn to fantastical ideas."
      case "O2":
        if (level === "Low") return "Less moved by art, music, or natural beauty."
        if (level === "Moderate") return "Appreciates art and beauty moderately."
        return "Deep appreciation for art, music, and beauty."
      case "O3":
        if (level === "Low") return "Less aware of or expressive about emotions."
        if (level === "Moderate") return "Generally aware of emotions and reflects on them."
        return "Highly aware of emotions; experiences wide range of feelings."
      case "O4":
        if (level === "Low") return "Prefers routine and familiarity."
        if (level === "Moderate") return "Open to new experiences with some predictability."
        return "Enjoys trying new things and breaking routines."
      case "O5":
        if (level === "Low") return "Prefers concrete facts over abstract theories."
        if (level === "Moderate") return "Curious about ideas but grounded in practicality."
        return "Intellectually curious; loves theoretical discussions."
      case "O6":
        if (level === "Low") return "Holds traditional values; respects authority."
        if (level === "Moderate") return "Open to reconsidering beliefs while respecting tradition."
        return "Open-minded; questions traditional values and authority."

      case "A1":
        if (level === "Low") return "Skeptical and cautious of others' intentions."
        if (level === "Moderate") return "Generally trusting with healthy caution."
        return "Highly trusting; believes in good intentions of others."
      case "A2":
        if (level === "Low") return "May be indirect in communication."
        if (level === "Moderate") return "Generally honest but can be diplomatic."
        return "Direct, honest, and straightforward."
      case "A3":
        if (level === "Low") return "Prioritizes own needs; less inclined to help others."
        if (level === "Moderate") return "Willing to help while prioritizing own well-being."
        return "Highly altruistic; puts others' needs first."
      case "A4":
        if (level === "Low") return "Competitive; prefers asserting own will."
        if (level === "Moderate") return "Cooperative but can assert when necessary."
        return "Highly cooperative; avoids conflict and prioritizes harmony."
      case "A5":
        if (level === "Low") return "May highlight achievements; less modest."
        if (level === "Moderate") return "Generally modest but acknowledges accomplishments."
        return "Humble; rarely brags about achievements."
      case "A6":
        if (level === "Low") return "Less empathetic; may struggle with others' emotions."
        if (level === "Moderate") return "Generally empathetic and concerned for others."
        return "Deeply empathetic and compassionate."

      case "C1":
        if (level === "Low") return "May doubt abilities; feels less capable."
        if (level === "Moderate") return "Generally competent and confident."
        return "Highly competent, efficient, and confident."
      case "C2":
        if (level === "Low") return "Prefers spontaneity; may struggle with organization."
        if (level === "Moderate") return "Generally organized but flexible."
        return "Highly organized, meticulous, and structured."
      case "C3":
        if (level === "Low") return "May be less reliable with responsibilities."
        if (level === "Moderate") return "Generally dependable and responsible."
        return "Highly dutiful, reliable, and fulfills obligations."
      case "C4":
        if (level === "Low") return "Less driven by external achievements."
        if (level === "Moderate") return "Motivated to achieve goals with balance."
        return "Highly ambitious; sets high standards."
      case "C5":
        if (level === "Low") return "May struggle with self-discipline."
        if (level === "Moderate") return "Generally self-disciplined with occasional lapses."
        return "Highly self-disciplined; rarely procrastinates."
      case "C6":
        if (level === "Low") return "Makes quick decisions without much thought."
        if (level === "Moderate") return "Considers options but can be spontaneous."
        return "Thoughtful and deliberate in decision-making."
      default:
        return ""
    }
  }

  if (testType === "MBTI" && mbtiResult && mbtiPersonalityInfo) {
    return (
      <div className="print-report">
        <style jsx>{`
          @media print {
            .print-report {
              font-family: Arial, sans-serif;
              max-width: 100%;
              margin: 0;
              padding: 20px;
              color: #000;
              background: #fff;
            }
            .print-report * {
              color: #000 !important;
              background: #fff !important;
              border-color: #ccc !important;
            }
            .print-report .section {
              page-break-inside: avoid;
              margin-bottom: 30px;
            }
            .print-report h1 {
              font-size: 24px;
              margin-bottom: 10px;
              text-align: center;
            }
            .print-report h2 {
              font-size: 20px;
              margin-bottom: 15px;
              border-bottom: 2px solid #ccc;
              padding-bottom: 5px;
            }
            .print-report h3 {
              font-size: 16px;
              margin-bottom: 10px;
            }
            .print-report p {
              font-size: 12px;
              line-height: 1.4;
              margin-bottom: 8px;
            }
            .print-report .grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
              margin-bottom: 20px;
            }
            .print-report .card {
              border: 1px solid #ccc;
              padding: 15px;
              border-radius: 5px;
            }
          }
        `}</style>

        <div className="section">
          <h1>MBTI Personality Test Report</h1>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div
              style={{
                display: "inline-block",
                padding: "20px",
                border: "3px solid #ccc",
                borderRadius: "50%",
                marginBottom: "15px",
              }}
            >
              <span style={{ fontSize: "48px", fontWeight: "bold" }}>{mbtiResult}</span>
            </div>
            <h2>{mbtiPersonalityInfo.name}</h2>
            <p style={{ fontSize: "14px", fontStyle: "italic" }}>{mbtiPersonalityInfo.description}</p>
          </div>
        </div>

        <div className="section">
          <h2>Personality Overview</h2>
          <div className="grid">
            <div className="card">
              <h3>Key Traits</h3>
              {mbtiPersonalityInfo.traits.map((trait: string, index: number) => (
                <p key={index}>• {trait}</p>
              ))}
            </div>
            <div className="card">
              <h3>Strengths</h3>
              {mbtiPersonalityInfo.strengths.map((strength: string, index: number) => (
                <p key={index}>• {strength}</p>
              ))}
            </div>
            <div className="card">
              <h3>Career Matches</h3>
              {mbtiPersonalityInfo.careers.map((career: string, index: number) => (
                <p key={index}>• {career}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="section">
          <p style={{ textAlign: "center", fontSize: "10px", color: "#666", marginTop: "40px" }}>
            © 2025 Om Prakash Paudel (Gaurav). All rights reserved.
          </p>
          <p style={{ textAlign: "center", fontSize: "10px", color: "#666", marginTop: "5px" }}>
            Generated on {getCurrentDate()} | https://www.omprakashpaudelgaurav.com.np/personality-test
          </p>
        </div>
      </div>
    )
  }

  if (testType === "BIG5" && big5Scores && big5Answers) {
    // Calculate subcategory scores
    const calculateSubcategoryScores = () => {
      const scores: Record<string, number> = {}
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
          const answer = big5Answers.find((a) => a.questionId === q.id)
          return sum + (answer?.value || 0)
        }, 0)
        scores[subcat] = score
      })

      return scores
    }

    const subcategoryScores = calculateSubcategoryScores()

    const mainTraitChartData = [
      { name: "Openness", score: big5Scores.O },
      { name: "Conscientiousness", score: big5Scores.C },
      { name: "Extraversion", score: big5Scores.E },
      { name: "Agreeableness", score: big5Scores.A },
      { name: "Neuroticism", score: big5Scores.N },
    ]

    return (
      <div className="print-report">
        <style jsx>{`
          @media print {
            .print-report {
              font-family: Arial, sans-serif;
              max-width: 100%;
              margin: 0;
              padding: 15px;
              color: #000;
              background: #fff;
              font-size: 10px;
            }
            .print-report * {
              color: #000 !important;
              background: #fff !important;
              border-color: #ccc !important;
            }
            .print-report .page-break {
              page-break-before: always;
            }
            .print-report .section {
              margin-bottom: 20px;
            }
            .print-report .avoid-break {
              page-break-inside: avoid;
            }
            .print-report h1 {
              font-size: 22px;
              margin-bottom: 5px;
              text-align: center;
            }
            .print-report .subtitle {
              font-size: 11px;
              text-align: center;
              margin-bottom: 15px;
              color: #666;
            }
            .print-report h2 {
              font-size: 14px;
              margin-bottom: 10px;
              border-bottom: 2px solid #333;
              padding-bottom: 3px;
              font-weight: bold;
            }
            .print-report h3 {
              font-size: 12px;
              margin-bottom: 8px;
              font-weight: bold;
            }
            .print-report h4 {
              font-size: 11px;
              margin-bottom: 4px;
              font-weight: bold;
            }
            .print-report p {
              font-size: 10px;
              line-height: 1.3;
              margin-bottom: 4px;
            }
            .print-report .score-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 15px;
              font-size: 10px;
            }
            .print-report .score-table th,
            .print-report .score-table td {
              border: 1px solid #ccc;
              padding: 6px 8px;
              text-align: left;
            }
            .print-report .score-table th {
              background-color: #f0f0f0 !important;
              font-weight: bold;
            }
            .print-report .score-table .center {
              text-align: center;
            }
            .print-report .trait-section {
              margin-bottom: 15px;
              padding: 10px;
              border: 1px solid #ddd;
              border-radius: 4px;
            }
            .print-report .trait-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 8px;
              padding-bottom: 5px;
              border-bottom: 1px solid #eee;
            }
            .print-report .subcat-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 8px;
            }
            .print-report .subcat-item {
              padding: 6px;
              border: 1px solid #eee;
              border-radius: 3px;
              font-size: 9px;
            }
            .print-report .subcat-item h5 {
              font-size: 10px;
              font-weight: bold;
              margin-bottom: 2px;
            }
            .print-report .dimensions-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
              margin-bottom: 15px;
            }
            .print-report .dimension-card {
              padding: 8px;
              border: 1px solid #ddd;
              border-radius: 4px;
            }
            .print-report .dimension-card h4 {
              font-size: 11px;
              margin-bottom: 4px;
              color: #333;
            }
            .print-report .dimension-card p {
              font-size: 9px;
            }
            .print-report .footer {
              text-align: center;
              font-size: 9px;
              color: #666;
              margin-top: 20px;
              padding-top: 10px;
              border-top: 1px solid #ccc;
            }
            .print-report .level-badge {
              display: inline-block;
              padding: 2px 6px;
              border-radius: 3px;
              font-size: 9px;
              font-weight: bold;
            }
            .print-report .level-low {
              background-color: #e3f2fd !important;
              color: #1565c0 !important;
            }
            .print-report .level-moderate {
              background-color: #fff8e1 !important;
              color: #f57f17 !important;
            }
            .print-report .level-high {
              background-color: #e8f5e9 !important;
              color: #2e7d32 !important;
            }
          }
          
          /* Screen styles for preview */
          .print-report {
            font-family: Arial, sans-serif;
            max-width: 100%;
            margin: 0 auto;
            padding: 20px;
            background: #fff;
            color: #000;
          }
          .print-report h1 {
            font-size: 24px;
            text-align: center;
            margin-bottom: 5px;
          }
          .print-report .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 20px;
          }
          .print-report h2 {
            font-size: 16px;
            border-bottom: 2px solid #333;
            padding-bottom: 5px;
            margin-bottom: 15px;
          }
          .print-report .score-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          .print-report .score-table th,
          .print-report .score-table td {
            border: 1px solid #ccc;
            padding: 8px;
          }
          .print-report .score-table th {
            background: #f5f5f5;
          }
          .print-report .trait-section {
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          .print-report .subcat-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }
          .print-report .subcat-item {
            padding: 8px;
            border: 1px solid #eee;
            border-radius: 4px;
          }
          .print-report .dimensions-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }
          .print-report .dimension-card {
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          .print-report .level-badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: bold;
          }
          .print-report .level-low {
            background: #e3f2fd;
            color: #1565c0;
          }
          .print-report .level-moderate {
            background: #fff8e1;
            color: #f57f17;
          }
          .print-report .level-high {
            background: #e8f5e9;
            color: #2e7d32;
          }
          .print-report .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #ccc;
            color: #666;
            font-size: 11px;
          }
        `}</style>

        {/* Page 1: Title and Score Summary */}
        <div className="section">
          <h1>Big 5 Personality Test Report</h1>
          <p className="subtitle">Comprehensive Personality Analysis Based on the Five-Factor Model</p>
        </div>

        <div className="section avoid-break">
          <h2>Core Trait Scores Summary</h2>
          <table className="score-table">
            <thead>
              <tr>
                <th>Trait</th>
                <th className="center">Score</th>
                <th className="center">Level</th>
                <th>Interpretation</th>
              </tr>
            </thead>
            <tbody>
              {mainTraitChartData.map((data) => {
                const traitKey = Object.keys(traitFullNames).find((k) => traitFullNames[k] === data.name) || ""
                const level = getTraitLevel(data.score)
                return (
                  <tr key={data.name}>
                    <td>
                      <strong>{data.name}</strong>
                    </td>
                    <td className="center">{data.score}/60</td>
                    <td className="center">
                      <span className={`level-badge level-${level.toLowerCase()}`}>{level}</span>
                    </td>
                    <td>{getTraitSummary(traitKey, data.score)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p style={{ fontSize: "10px", textAlign: "center", color: "#666" }}>
            <strong>Rating Scale:</strong> Low (0-30) | Moderate (31-42) | High (43-60)
          </p>
        </div>

        {/* Detailed Trait Analysis */}
        <div className="page-break"></div>
        <div className="section">
          <h2>Detailed Trait Analysis with Subcategories</h2>

          {(["N", "E", "O", "A", "C"] as const).map((trait) => {
            const traitScore = big5Scores[trait]
            const traitLevel = getTraitLevel(traitScore)
            const subcategories = ["1", "2", "3", "4", "5", "6"].map((num) => `${trait}${num}`)

            return (
              <div key={trait} className="trait-section avoid-break">
                <div className="trait-header">
                  <h3>{traitFullNames[trait]}</h3>
                  <span className={`level-badge level-${traitLevel.toLowerCase()}`}>
                    {traitScore}/60 - {traitLevel}
                  </span>
                </div>
                <p style={{ marginBottom: "10px" }}>{getTraitSummary(trait, traitScore)}</p>

                <h4>Subcategory Breakdown:</h4>
                <div className="subcat-grid">
                  {subcategories.map((subcat) => {
                    const subcatScore = subcategoryScores[subcat]
                    const subcatLevel = getSubcategoryLevel(subcatScore)
                    return (
                      <div key={subcat} className="subcat-item">
                        <h5>
                          {subcategoryNames[subcat]}
                          <span
                            className={`level-badge level-${subcatLevel.toLowerCase()}`}
                            style={{ marginLeft: "5px" }}
                          >
                            {subcatScore}/10
                          </span>
                        </h5>
                        <p>{getSubcategorySummary(subcat, subcatScore)}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Integrated Dimensions */}
        {customSummaries && (
          <>
            <div className="page-break"></div>
            <div className="section">
              <h2>Integrated Personality Dimensions</h2>
              <div className="dimensions-grid">
                <div className="dimension-card">
                  <h4>Emotional Style</h4>
                  <p>{customSummaries.emotionalStyle}</p>
                </div>
                <div className="dimension-card">
                  <h4>Interpersonal Relations</h4>
                  <p>{customSummaries.interpersonalRelations}</p>
                </div>
                <div className="dimension-card">
                  <h4>Vocational Style</h4>
                  <p>{customSummaries.vocationalStyle}</p>
                </div>
                <div className="dimension-card">
                  <h4>Pattern of Activity</h4>
                  <p>{customSummaries.patternOfActivity}</p>
                </div>
                <div className="dimension-card">
                  <h4>Attitudes</h4>
                  <p>{customSummaries.attitudes}</p>
                </div>
                <div className="dimension-card">
                  <h4>Academic Performance</h4>
                  <p>{customSummaries.academicPerformance}</p>
                </div>
              </div>
              <div className="dimension-card" style={{ marginTop: "10px" }}>
                <h4>Character</h4>
                <p>{customSummaries.character}</p>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="footer">
          <p>© 2025 Om Prakash Paudel (Gaurav). All rights reserved.</p>
          <p>Generated on {getCurrentDate()} | https://www.omprakashpaudelgaurav.com.np/personality-test</p>
        </div>
      </div>
    )
  }

  return null
}
