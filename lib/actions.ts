export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  // TODO: Implement email sending logic here
  // You can use a service like SendGrid, Nodemailer, etc.
  console.log("Sending email:", { name, email, message })

  // Redirect to a thank you page
  // redirect("/thank-you")
}
