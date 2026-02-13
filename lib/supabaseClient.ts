import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://eguatejbldtbnbetpebq.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVndWF0ZWpibGR0Ym5iZXRwZWJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3Nzk3NjgsImV4cCI6MjA4MzM1NTc2OH0.lnj0TOg6oXKxtq7Hvog8cPsMb9OXZa-eqSNnFjbINoY"

export const supabase = createClient(supabaseUrl, supabaseKey)
