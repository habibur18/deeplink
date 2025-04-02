import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser } from "@/lib/auth-actions"
import { redirect } from "next/navigation"

export default async function Home() {
  const user = await getCurrentUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Instagram Browser Redirect</h1>
        <p className="text-muted-foreground max-w-[600px]">
          Create links that bypass Instagram&apos;s in-app browser and open directly in the user&apos;s default browser.
        </p>
        <div className="flex gap-4">
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">Register</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Better User Experience</CardTitle>
            <CardDescription>Improve how users interact with your links</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Instagram&apos;s in-app browser has limitations. Our links open in the user&apos;s default browser,
              providing a better experience with all browser features.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custom Domains</CardTitle>
            <CardDescription>Create branded links for your business</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Use your business name in your links to create a consistent brand experience and make your links more
              memorable.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Track Performance</CardTitle>
            <CardDescription>Monitor how your links are performing</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              See how many clicks your links are getting and which links are performing best to optimize your marketing
              strategy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

