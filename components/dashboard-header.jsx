import { Button } from "@/components/ui/button"
import { logoutUser } from "@/lib/auth-actions"
import Link from "next/link"

export function DashboardHeader({ user }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user.name}</p>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline">Home</Button>
        </Link>
        <form action={logoutUser}>
          <Button variant="outline">Logout</Button>
        </form>
      </div>
    </div>
  )
}

