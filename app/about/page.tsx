import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">About This Service</h1>
        <p className="text-muted-foreground max-w-[600px]">
          Learn how our Instagram browser redirect service works and why you might want to use it.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Why Bypass Instagram&apos;s Browser?</CardTitle>
            <CardDescription>The benefits of external browser links</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Instagram&apos;s in-app browser has limitations: it lacks extensions, proper navigation, and often has
              issues with complex websites. Our service helps users experience your content in their preferred browser
              with all features intact.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>The technical details</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Our service uses special HTML meta tags and JavaScript redirects that force Instagram to open links in the
              device&apos;s default browser instead of its in-app browser. This provides a better user experience for
              your audience.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Use Cases</CardTitle>
            <CardDescription>Who benefits from this service</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>E-commerce stores wanting a better shopping experience</li>
              <li>Content creators sharing interactive content</li>
              <li>Businesses with complex web applications</li>
              <li>Anyone wanting to provide a better browsing experience</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle>How to Use Our Links</CardTitle>
          <CardDescription>Step-by-step guide</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">1. Create Your Link</h3>
            <p className="text-muted-foreground">
              Enter your destination URL on our homepage. You can use a custom slug or let our system generate one for
              you.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">2. Copy Your Link</h3>
            <p className="text-muted-foreground">Copy the generated link from your dashboard.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">3. Add to Instagram</h3>
            <p className="text-muted-foreground">Paste the link in your Instagram bio, stories, or direct messages.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">4. Track Performance</h3>
            <p className="text-muted-foreground">Monitor clicks and engagement through our simple analytics.</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Link href="/">
          <Button>Create Your Link Now</Button>
        </Link>
      </div>
    </div>
  )
}

