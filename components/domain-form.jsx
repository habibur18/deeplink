"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addDomain } from "@/lib/auth-actions"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export function DomainForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.target)
    const result = await addDomain(formData)

    setIsLoading(false)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Success",
      description: "Domain added successfully",
    })

    event.target.reset()
    router.refresh()
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Add New Domain</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="domain">Domain Name</Label>
          <Input id="domain" name="domain" placeholder="mynewbusiness" disabled={isLoading} required />
          <p className="text-xs text-muted-foreground">Only use letters, numbers, and hyphens. No spaces.</p>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            "Add Domain"
          )}
        </Button>
      </form>
    </div>
  )
}

