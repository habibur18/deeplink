import { getRedirectUrl } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function RedirectPage({ params }) {
  const { slug } = params;
  const result = await getRedirectUrl(slug);

  if (!result.url) {
    redirect("/not-found");
  }

  // This is the enhanced version that forces opening in external browser on Android
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="referrer" content="no-referrer" />
        <meta name="theme-color" content="#ffffff" />
        <title>Redirecting...</title>

        {/* These meta tags help with bypassing in-app browsers */}
        <meta http-equiv="refresh" content={`0;url=${result.url}`} />

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

        {/* This script uses multiple techniques to force external browser opening */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function() {
            // Get the destination URL
            var destinationUrl = "${result.url}";

            // Function to detect Android
            function isAndroid() {
              return navigator.userAgent.toLowerCase().indexOf("android") > -1;
            }

            // For Android devices, use intent:// URL scheme
            if (isAndroid()) {
              // Create an intent URL that forces external browser
              var intentUrl = "intent://" +
                destinationUrl.replace(/^https?:\\/\\//, '') +
                "#Intent;scheme=https;package=com.android.chrome;end";

              // Try the intent URL first
              window.location.href = intentUrl;

              // Fallback to data URL method after a short delay
              setTimeout(function() {
                // Create a data URL that will force external opening
                var dataUrl = "data:text/html;base64," + btoa('<html><head><meta http-equiv="refresh" content="0;url=' + destinationUrl + '"></head></html>');
                window.location.href = dataUrl;
              }, 100);

              // Final fallback
              setTimeout(function() {
                window.location.href = destinationUrl;
              }, 200);
            } else {
              // For non-Android devices, just redirect
              window.location.href = destinationUrl;
            }
          })();
        `,
          }}
        />
      </head>
      <body>
        <div className="container">
          <h1>Redirecting you to the website</h1>
          <p>If you are not redirected automatically, click the link below:</p>
          <a href={result.url} target="_blank" rel="noopener noreferrer">
            Continue to {new URL(result.url).hostname}
          </a>
        </div>
      </body>
    </html>
  );
}
