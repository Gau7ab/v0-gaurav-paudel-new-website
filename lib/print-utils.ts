export interface PrintOptions {
  title: string
  toolName: string
  date?: Date
}

export function printReport(options: PrintOptions) {
  const { title, toolName, date = new Date() } = options

  // Set document title for the print dialog
  const originalTitle = document.title
  document.title = `${toolName} Report - ${title} - Gaurab Labs`

  // Trigger the browser's print dialog
  window.print()

  // Restore original title after a delay
  setTimeout(() => {
    document.title = originalTitle
  }, 1000)
}

export function formatPrintDate(date: Date = new Date()): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function generateReportId(): string {
  return `GL-${Date.now().toString(36).toUpperCase()}`
}
