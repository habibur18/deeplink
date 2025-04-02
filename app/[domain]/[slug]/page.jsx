import { redirect } from "next/navigation"
import { getRedirectUrl } from "@/lib/actions"

export default async function RedirectPage({ params }) {
  const { domain, slug } = params
  const result = await getRedirectUrl(slug, domain)

  if (!result.url) {
    redirect("/not-found")
  }

  // This is the key part that makes Instagram open the link in the default browser
  // We use a special meta tag and JavaScript redirect
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <title>Redirecting...</title>
        <meta httpEquiv="refresh" content={`0;url=${result.url}`} />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
          }
          .container {
            padding: 20px;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 16px;
          }
          p {
            font-size: 16px;
            color: #666;
            margin-bottom: 24px;
          }
          a {
            display: inline-block;
            background-color: #0095f6;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
          }
        `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          // Force opening in external browser
          window.location.href = "${result.url}";
        `,
          }}
        />
      </head>
      <body>
        <div className="container">
          <h1>Redirecting you to the website</h1>
          <p>If you are not redirected automatically, click the link below:</p>
          <a href={result.url}>Continue to {new URL(result.url).hostname}</a>
        </div>
      </body>
    </html>
  )
}

