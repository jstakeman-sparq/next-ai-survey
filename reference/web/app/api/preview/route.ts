// app/api/preview/route.ts
import { cookies, draftMode } from "next/headers"
import { redirect } from "next/navigation"

const draftModePrerenderCookieKey = "__prerender_bypass"

function getPreviewPath(
  contentType: string | undefined,
  slug: string | null,
  locale: string | null,
  status: string | null,
): string {
  const basePath = (() => {
    if (!contentType) return "/"

    if (contentType === "article" || contentType.includes("articles")) {
      return slug ? "/articles/" + slug : "/articles"
    }

    // TODO: add new pathnames for case studies and insights

    // Can add other content types here

    // if (contentType === 'page' || contentType.includes('pages')) {
    //   return slug ? '/' + slug : '/';
    // }

    return "/" + contentType
  })()

  const localePath =
    locale && locale !== "en" ? "/" + locale + basePath : basePath
  const statusParam = status ? "?status=" + status : "" // TODO: For me, the status isn't necessary
  return localePath + statusParam
}

export const GET = async (request: Request) => {
  // Parse query string parameters
  const { searchParams } = new URL(request.url)
  const searchParamsData = Object.fromEntries(searchParams)
  const { secret, slug, locale, uid, status } = searchParamsData

  // console.log(searchParamsData);

  // Check the secret and next parameters
  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 })
  }

  const contentType = uid?.split(".").pop()
  const finalPath = getPreviewPath(contentType, slug, locale, status)

  // Enable Draft Mode by setting the cookie
  // https://github.com/vercel/next.js/issues/49927
  const draft = await draftMode()
  if (status === "draft") {
    //https://github.com/notum-cz/strapi-next-monorepo-starter/pull/79/files
    /**
     * This works by setting the `__prerender_bypass` response cookie, which is then used to display drafts
     * This has a shortcoming when working with iframe embeddings (such as Strapi preview), where the cookie is being set from a different origin
     * and therefore fails, so Strapi always displays the published version, because draftMode().isEnabled returns `false`
     */
    draft.enable()

    const cookieStore = await cookies()
    const draftCookie = cookieStore.get(draftModePrerenderCookieKey)
    // If we have the cookie, update it with cross-origin iframe support
    // NOTE: You cannot use any other cookie method other than .set() (such as .delete()), because
    // they automatically assume the sameSite=Lax strategy, which will not work with iframes
    cookieStore.set({
      name: draftModePrerenderCookieKey,
      value: draftCookie?.value || "",
      expires: draftCookie?.value ? undefined : 0, // undefined => does not expire, 0 => expires at timestamp 0
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "none", // Allow cookie in cross-origin iframes
    })
  } else {
    draft.disable()
    // const cookieStore = await cookies();
    // cookieStore.delete("__prerender_bypass");
  }

  // Redirect to the path from the fetched post
  redirect(finalPath)
}

// import { draftMode } from "next/headers";
// import { redirect } from "next/navigation";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const secret = searchParams.get("secret");
//   const path = searchParams.get("path");

//   if (!secret || secret !== process.env.STRAPI_PREVIEW_SECRET) {
//     return new Response("Invalid preview token", { status: 401 });
//   }

//   if (!path) {
//     return new Response("Missing path parameter", { status: 400 });
//   }

//   const draft = await draftMode();
//   draft.enable();

//   return redirect(path);
// }
