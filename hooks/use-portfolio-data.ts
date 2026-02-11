import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(r => r.json())

// Fallback hardcoded data used when database is empty
const fallbackData = {
  about: {
    title: "Om Prakash Paudel",
    subtitle: "MBA Scholar & Himalayan Trekker Exploring Nepal's Mountains",
    description: "I'm Om Prakash Paudel, a student with a strong academic background in management and a deep personal passion for the mountains. While pursuing my MBA education, trekking has become the space where I test my mindset, discipline, and leadership across Nepal's Himalayan region.",
  },
  skills: [
    { id: 1, name: "Navigation & Route Planning", category: "Trekking & Adventure" },
    { id: 2, name: "High Altitude Trekking", category: "Trekking & Adventure" },
    { id: 3, name: "Wilderness Survival", category: "Trekking & Adventure" },
    { id: 4, name: "Photography", category: "Trekking & Adventure" },
    { id: 5, name: "Team Leadership", category: "Leadership & Teamwork" },
    { id: 6, name: "Decision Making", category: "Leadership & Teamwork" },
    { id: 7, name: "Group Coordination", category: "Leadership & Teamwork" },
    { id: 8, name: "Crisis Management", category: "Leadership & Teamwork" },
    { id: 9, name: "Business Administration", category: "Management & Academic" },
    { id: 10, name: "Organizational Behavior", category: "Management & Academic" },
    { id: 11, name: "Strategic Planning", category: "Management & Academic" },
    { id: 12, name: "Project Management", category: "Management & Academic" },
    { id: 13, name: "Digital Literacy", category: "Digital & Personal Growth" },
    { id: 14, name: "Social Media", category: "Digital & Personal Growth" },
    { id: 15, name: "Adaptability", category: "Digital & Personal Growth" },
    { id: 16, name: "Cultural Awareness", category: "Digital & Personal Growth" },
  ],
  experience: [
    { id: 1, title: "CEO", company: "Aakar Academy", start_date: "Nov 2025", end_date: "", is_current: true, location: "Chitwan, Nepal", description: "Leading Aakar Academy as Chief Executive Officer, driving strategic vision and operational excellence." },
    { id: 2, title: "Head of SARAL", company: "Bitflux Technologies Pvt. Ltd.", start_date: "Oct 2024", end_date: "Sep 2025", is_current: false, location: "Chitwan, Nepal", description: "Led the development and implementation of SARAL, an innovative restaurant management system." },
    { id: 3, title: "Business Development Officer", company: "Bitflux Technologies Pvt. Ltd.", start_date: "Aug 2024", end_date: "Sep 2025", is_current: false, location: "Chitwan, Nepal", description: "Spearheaded business development initiatives to expand the company's market presence." },
    { id: 4, title: "Banking Intern", company: "Muktinath Bikas Bank Limited", start_date: "May 2024", end_date: "Jul 2024", is_current: false, location: "Nepal", description: "Gained comprehensive exposure to banking operations including customer service, account management, and financial analysis." },
  ],
  education: [
    { id: 1, degree: "Master in Business Administration (MBA)", institution: "Boston International College", location: "Bharatpur-10, Nepal", start_date: "2024", end_date: "" },
    { id: 2, degree: "Bachelor in Business Administration (BBA)", institution: "Saptagandaki Multiple Campus", location: "Bharatpur-10, Chitwan", start_date: "2019", end_date: "" },
    { id: 3, degree: "Secondary Level (+2) in Management", institution: "Eden Garden English Secondary School", location: "Bharatpur-10, Chitwan", start_date: "2016", end_date: "" },
    { id: 4, degree: "SLC", institution: "Madi Secondary School", location: "Madi-03, Chitwan", start_date: "SLC", end_date: "" },
  ],
  projects: [],
  achievements: [
    { id: 1, title: "7 Major Treks Completed", description: "Successfully completed treks to iconic destinations across Nepal's Himalayan region." },
    { id: 2, title: "Academic Excellence", description: "Maintaining strong academic performance while pursuing passion for adventure and exploration." },
    { id: 3, title: "Youth Leadership", description: "Recognized for leadership in organizing community events and youth programs." },
    { id: 4, title: "Cultural Ambassador", description: "Promoting Nepali culture and natural heritage through trekking experiences and storytelling." },
  ],
  treks: [
    { id: 1, name: "Annapurna Base Camp", image_url: "/images/abc4.jpeg", description: "Gateway to the Annapurna Sanctuary", altitude: "4,130m", location: "Nepal", difficulty: "Moderate", duration: "10 days" },
    { id: 2, name: "Annapurna North Basecamp", image_url: "/images/annapurna-20north-20basecamp.jpg", description: "Remote and less-explored route to the north face", altitude: "4,190m", location: "Nepal", difficulty: "Difficult", duration: "12 days" },
    { id: 3, name: "Mardi Himal", image_url: "/images/mardi-himal2.jpeg", description: "Scenic alternative to ABC with dramatic views", altitude: "4,500m", location: "Nepal", difficulty: "Moderate", duration: "7 days" },
    { id: 4, name: "Gosainkunda", image_url: "/images/gosainkunda.jpeg", description: "Sacred lake at high altitude", altitude: "4,380m", location: "Nepal", difficulty: "Moderate", duration: "7 days" },
    { id: 5, name: "Poon Hill", image_url: "/images/poon-hill.jpeg", description: "Classic sunrise viewpoint", altitude: "3,210m", location: "Nepal", difficulty: "Easy", duration: "4 days" },
    { id: 6, name: "Tilicho Lake", image_url: "/images/tilicho.jpeg", description: "One of the highest lakes in the world", altitude: "4,919m", location: "Nepal", difficulty: "Difficult", duration: "14 days" },
    { id: 7, name: "Khumai Danda", image_url: "/images/khumai-danda.jpeg", description: "Panoramic viewpoint in Kaski", altitude: "3,245m", location: "Nepal", difficulty: "Easy", duration: "3 days" },
  ],
}

export function usePortfolioData() {
  const { data, error, isLoading } = useSWR("/api/portfolio", fetcher, {
    fallbackData,
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  })

  // Merge: use DB data when available, fall back to hardcoded
  return {
    about: data?.about || fallbackData.about,
    skills: data?.skills?.length ? data.skills : fallbackData.skills,
    experience: data?.experience?.length ? data.experience : fallbackData.experience,
    education: data?.education?.length ? data.education : fallbackData.education,
    projects: data?.projects?.length ? data.projects : fallbackData.projects,
    achievements: data?.achievements?.length ? data.achievements : fallbackData.achievements,
    treks: data?.treks?.length ? data.treks : fallbackData.treks,
    isLoading,
    error,
  }
}
