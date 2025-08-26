"use server"

const STRAPI_URL = process.env.STRAPI_API_URL

export async function sendContactEmail(formData: {
  reason: string
  name: string
  company: string
  role: string
  email: string
  problem: string
  marketingConsent: boolean
  privacyConsent: boolean
}) {
  const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN_CONTACT!

  const subject = `New contact from ${formData.name}`

  const text = `
    Reason: ${formData.reason}
    Name: ${formData.name}
    Company: ${formData.company}
    Role: ${formData.role}
    Email: ${formData.email}
    Problem: ${formData.problem}
    Privacy Consent: ${formData.privacyConsent ? "Yes" : "No"}
    Marketing Consent: ${formData.marketingConsent ? "Yes" : "No"}
  `.trim()

  const html = `
    <p><strong>What brings you here:</strong></p>
    <p>${formData.reason}</p>
    <p><strong>Name:</strong></p>
    <p>${formData.name}</p>
    <p><strong>Company:</strong></p>
    <p>${formData.company}</p>
    <p><strong>Role:</strong></p>
    <p>${formData.role}</p>
    <p><strong>Email:</strong></p>
    <p>${formData.email}</p>
    <p><strong>What problem are you trying to solve?:</strong></p>
    <p>${formData.problem}</p>
    <p><strong>Privacy Consent:</strong></p>
    <p>${formData.privacyConsent ? "Yes" : "No"}</p>
    <p><strong>Marketing Consent:</strong></p>
    <p>${formData.marketingConsent ? "Yes" : "No"}</p>
  `.trim()

  const res = await fetch(`${STRAPI_URL}/api/contact/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({
      subject,
      text,
      html,
      replyTo: formData.email,
    }),
    cache: "no-store",
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    console.error("Error sending contact email", err)
    throw new Error(`Strapi error: ${res.status}`)
  }

  return { ok: true }
}
