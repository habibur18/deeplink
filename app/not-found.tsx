import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Link Not Found</h1>
      <p className="text-muted-foreground mb-8">The link you're looking for doesn't exist or has been removed.</p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  )
}

