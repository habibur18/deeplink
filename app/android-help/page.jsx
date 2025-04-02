import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AndroidHelpPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">How to Open Links in External Browser on Android</h1>

        <div className="space-y-6">
          <div className="bg-muted p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Why Instagram Uses an In-App Browser</h2>
            <p>Instagram and many other social media apps use in-app browsers to keep users within their app. This can limit functionality and prevent features like autofill, extensions, and proper navigation.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Our Solution</h2>
            <p>Our links use special techniques to bypass Instagram&apos;s in-app browser on Android devices:</p>

            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Android Intent URLs:</strong> We use Android&apos;s intent:// URL scheme to request that links open in your default browser.
              </li>
              <li>
                <strong>Data URL Method:</strong> As a fallback, we use a special data:// URL format that many in-app browsers will pass to the system browser.
              </li>
              <li>
                <strong>Multiple Redirects:</strong> We implement a series of redirects that help break out of the in-app browser environment.
              </li>
            </ol>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Troubleshooting</h2>
            <p className="mb-4">If links are still opening in Instagram&apos;s browser, try these steps:</p>

            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Long-press the link</strong> in Instagram and select &quot;Open in browser&quot; or &quot;Open in Chrome&quot;
              </li>
              <li>
                <strong>Update your Instagram app</strong> to the latest version
              </li>
              <li>
                <strong>Check your Android settings</strong> to ensure links are set to open in your preferred browser
              </li>
              <li>
                <strong>Try a different browser</strong> as your default (Chrome works best with our system)
              </li>
            </ol>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Manual Method</h2>
            <p>If automatic redirection doesn&apos;t work, you can always long-press on the link in Instagram and select &quot;Open in browser&quot; from the context menu.</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
