"use server"

import { sql } from "./db"
import { getSession } from "./auth"
import { revalidatePath } from "next/cache"

// Helper to check auth in server actions
async function checkAuth() {
  const session = await getSession()
  if (!session) throw new Error("Unauthorized")
  return session
}

export async function addTrek(formData: FormData) {
  await checkAuth()

  const name = formData.get("name") as string
  const elevation = formData.get("elevation") as string
  // ... other fields

  await sql`
    INSERT INTO treks (name, elevation, ...)
    VALUES (${name}, ${elevation}, ...)
  `

  revalidatePath("/")
  revalidatePath("/admin/treks")
}

export async function deleteTrek(id: string) {
  await checkAuth()
  await sql`DELETE FROM treks WHERE id = ${id}`
  revalidatePath("/")
  revalidatePath("/admin/treks")
}
