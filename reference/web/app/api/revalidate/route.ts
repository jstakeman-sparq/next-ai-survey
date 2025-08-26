import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

const REVALIDATE_SECRET = "123"

export async function POST(req: NextRequest): Promise<NextResponse> {
  const secret = req.nextUrl.searchParams.get("secret")
  const { event, ...rest } = await req.json()

  if (secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  console.log(event)

  if (event === "entry.update") {
    const { model } = rest
    console.log(`Revalidate ${model}`)
    revalidateTag(model)
  }

  return NextResponse.json({
    status: 200,
    revalidated: true,
    event,
    now: Date.now(),
  })
}
