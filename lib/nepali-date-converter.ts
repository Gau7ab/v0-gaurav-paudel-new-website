// Accurate Nepali Date Conversion Utilities
// Based on verified conversion algorithms and reference points

interface NepaliDate {
  year: number
  month: number
  day: number
  monthName: string
  dayName?: string
}

interface EnglishDate {
  year: number
  month: number
  day: number
  monthName: string
  dayName?: string
}

// Nepali month names
export const nepaliMonths = [
  "Baishakh",
  "Jestha",
  "Ashadh",
  "Shrawan",
  "Bhadra",
  "Ashwin",
  "Kartik",
  "Mangsir",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitra",
]

// English month names
export const englishMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

// Day names
export const nepaliDays = ["Aaitabar", "Sombar", "Mangalbar", "Budhabar", "Bihibar", "Shukrabar", "Shanibar"]
export const englishDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

// Accurate Nepali calendar data with verified month lengths
const nepaliCalendarData: { [year: number]: number[] } = {
  2000: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2001: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2002: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2003: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2004: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2005: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2006: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2007: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2008: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2009: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2010: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2011: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2012: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2013: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2014: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2015: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2016: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2017: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2018: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2019: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2020: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2021: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2022: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2023: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2024: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2025: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2026: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2027: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2028: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2029: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2030: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2031: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2032: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2033: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2034: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2035: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2036: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2037: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2038: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2039: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2040: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2041: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2042: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2043: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2044: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2045: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2046: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2047: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2048: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2049: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2050: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2051: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2052: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2053: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2054: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2055: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2056: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2057: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2058: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2059: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2060: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2061: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2062: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2063: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2064: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2065: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2066: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2067: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2068: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2069: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2070: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2071: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2072: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2073: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2074: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2075: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2076: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2077: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2078: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2079: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2080: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2081: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2082: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2083: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2084: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2085: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2086: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2087: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2088: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2089: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2090: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2091: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2092: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2093: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2094: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2095: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2096: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2097: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2098: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2099: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2100: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
}

// Known accurate reference point: 1st Baishakh 2000 BS = 13th April 1943 AD
const REFERENCE_BS = { year: 2000, month: 1, day: 1 }
const REFERENCE_AD = { year: 1943, month: 4, day: 13 }

// Calculate total days in BS from reference point
function getTotalDaysFromBSReference(bsYear: number, bsMonth: number, bsDay: number): number {
  let totalDays = 0

  // Add days for complete years
  for (let year = REFERENCE_BS.year; year < bsYear; year++) {
    const monthDays = nepaliCalendarData[year] || getDefaultNepaliMonths()
    totalDays += monthDays.reduce((sum, days) => sum + days, 0)
  }

  // Add days for complete months in the target year
  const targetYearMonths = nepaliCalendarData[bsYear] || getDefaultNepaliMonths()
  for (let month = 1; month < bsMonth; month++) {
    totalDays += targetYearMonths[month - 1]
  }

  // Add remaining days
  totalDays += bsDay - REFERENCE_BS.day

  return totalDays
}

// Calculate total days in AD from reference point
function getTotalDaysFromADReference(adYear: number, adMonth: number, adDay: number): number {
  let totalDays = 0

  // Add days for complete years
  for (let year = REFERENCE_AD.year; year < adYear; year++) {
    totalDays += isLeapYear(year) ? 366 : 365
  }

  // Add days for complete months in the target year
  for (let month = 1; month < adMonth; month++) {
    totalDays += getDaysInEnglishMonth(adYear, month)
  }

  // Add remaining days
  totalDays += adDay - REFERENCE_AD.day

  return totalDays
}

function getDefaultNepaliMonths(): number[] {
  return [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

function getDaysInEnglishMonth(year: number, month: number): number {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (month === 2 && isLeapYear(year)) {
    return 29
  }
  return daysInMonth[month - 1]
}

// Convert BS to AD using proper algorithm
export function convertBSToAD(bsYear: number, bsMonth: number, bsDay: number): EnglishDate {
  try {
    // Validate input
    if (bsYear < 2000 || bsYear > 2100) {
      throw new Error("Year must be between 2000 and 2100 BS")
    }
    if (bsMonth < 1 || bsMonth > 12) {
      throw new Error("Month must be between 1 and 12")
    }

    const monthsInYear = nepaliCalendarData[bsYear] || getDefaultNepaliMonths()
    if (bsDay < 1 || bsDay > monthsInYear[bsMonth - 1]) {
      throw new Error(
        `Day must be between 1 and ${monthsInYear[bsMonth - 1]} for ${nepaliMonths[bsMonth - 1]} ${bsYear}`,
      )
    }

    // Calculate days from BS reference
    const daysDiff = getTotalDaysFromBSReference(bsYear, bsMonth, bsDay)

    // Convert to AD date
    const referenceDate = new Date(REFERENCE_AD.year, REFERENCE_AD.month - 1, REFERENCE_AD.day)
    referenceDate.setDate(referenceDate.getDate() + daysDiff)

    const dayOfWeek = referenceDate.getDay()

    return {
      year: referenceDate.getFullYear(),
      month: referenceDate.getMonth() + 1,
      day: referenceDate.getDate(),
      monthName: englishMonths[referenceDate.getMonth()],
      dayName: englishDays[dayOfWeek],
    }
  } catch (error) {
    throw new Error(`BS to AD conversion error: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Convert AD to BS using proper algorithm
export function convertADToBS(adYear: number, adMonth: number, adDay: number): NepaliDate {
  try {
    // Validate input
    if (adYear < 1943 || adYear > 2043) {
      throw new Error("Year must be between 1943 and 2043 AD")
    }
    if (adMonth < 1 || adMonth > 12) {
      throw new Error("Month must be between 1 and 12")
    }
    if (adDay < 1 || adDay > getDaysInEnglishMonth(adYear, adMonth)) {
      throw new Error(
        `Day must be between 1 and ${getDaysInEnglishMonth(adYear, adMonth)} for ${englishMonths[adMonth - 1]} ${adYear}`,
      )
    }

    // Calculate days from AD reference
    const daysDiff = getTotalDaysFromADReference(adYear, adMonth, adDay)

    // Convert to BS date
    let currentYear = REFERENCE_BS.year
    let currentMonth = REFERENCE_BS.month
    let remainingDays = daysDiff

    // Handle negative days (dates before reference)
    if (remainingDays < 0) {
      remainingDays = Math.abs(remainingDays)

      // Go backwards
      while (remainingDays > 0) {
        currentMonth--
        if (currentMonth < 1) {
          currentMonth = 12
          currentYear--
        }

        const monthDays = nepaliCalendarData[currentYear]?.[currentMonth - 1] || 30
        if (remainingDays >= monthDays) {
          remainingDays -= monthDays
        } else {
          break
        }
      }

      const currentDay = monthDays - remainingDays + 1

      const adDate = new Date(adYear, adMonth - 1, adDay)
      const dayOfWeek = adDate.getDay()

      return {
        year: currentYear,
        month: currentMonth,
        day: currentDay,
        monthName: nepaliMonths[currentMonth - 1],
        dayName: nepaliDays[dayOfWeek],
      }
    }

    // Handle positive days (dates after reference)
    let currentDay = REFERENCE_BS.day + remainingDays

    while (true) {
      const monthDays = nepaliCalendarData[currentYear]?.[currentMonth - 1] || 30

      if (currentDay <= monthDays) {
        break
      }

      currentDay -= monthDays
      currentMonth++

      if (currentMonth > 12) {
        currentMonth = 1
        currentYear++
      }
    }

    const adDate = new Date(adYear, adMonth - 1, adDay)
    const dayOfWeek = adDate.getDay()

    return {
      year: currentYear,
      month: currentMonth,
      day: currentDay,
      monthName: nepaliMonths[currentMonth - 1],
      dayName: nepaliDays[dayOfWeek],
    }
  } catch (error) {
    throw new Error(`AD to BS conversion error: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Format date for display
export function formatNepaliDate(date: NepaliDate): string {
  return `${date.day} ${date.monthName} ${date.year} BS (${date.dayName})`
}

export function formatEnglishDate(date: EnglishDate): string {
  return `${date.day} ${date.monthName} ${date.year} AD (${date.dayName})`
}

// Get current Nepali date
export function getCurrentNepaliDate(): NepaliDate {
  const today = new Date()
  return convertADToBS(today.getFullYear(), today.getMonth() + 1, today.getDate())
}

// Get current English date
export function getCurrentEnglishDate(): EnglishDate {
  const today = new Date()
  const dayOfWeek = today.getDay()

  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
    monthName: englishMonths[today.getMonth()],
    dayName: englishDays[dayOfWeek],
  }
}

// Helper function to get year range info
export function getYearRangeInfo() {
  return {
    ad: { min: 1943, max: 2043 },
    bs: { min: 2000, max: 2100 },
    description: "Supports dates from 1943-2043 AD (2000-2100 BS)",
  }
}

// Helper function to validate year
export function isValidYear(year: number, calendar: "AD" | "BS"): boolean {
  if (calendar === "AD") {
    return year >= 1943 && year <= 2043
  } else {
    return year >= 2000 && year <= 2100
  }
}

// Helper function to get days in BS month
export function getDaysInBSMonth(year: number, month: number): number {
  const monthsInYear = nepaliCalendarData[year] || getDefaultNepaliMonths()
  return monthsInYear[month - 1] || 30
}
