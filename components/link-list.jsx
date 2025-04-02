"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Copy, ExternalLink, Trash2 } from "lucide-react"
import { deleteLink } from "@/lib/actions"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"

export function LinkList({ links }) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState(null)

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast({
      description: "Link copied to clipboard",
    })
  }

  const handleDelete = async (id) => {
    try {
      setDeletingId(id)
      await deleteLink(id)
      toast({
        description: "Link deleted successfully",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete link",
        variant: "destructive",
      })
    } finally {
      setDeletingId(null)
    }
  }

  if (links.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">You haven&apos;t created any links yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {links.map((link) => {
        // Use a function to get the URL instead of directly using window
        const getFullUrl = () => {
          // This will only run on the client side
          return `${window.location.origin}/r/${link.slug}`
        }

        return (
          <Card key={link._id} className="p-4">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{link.slug}</h3>
                  {link.customSlug && <Badge variant="outline">Custom</Badge>}
                </div>
                <Badge variant="secondary">{link.clicks} clicks</Badge>
              </div>

              <p className="text-sm text-muted-foreground truncate">{link.originalUrl}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(`${typeof window !== "undefined" ? window.location.origin : ""}/r/${link.slug}`)
                    }
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.open(`/r/${link.slug}`, "_blank")}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open
                  </Button>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete this link and all its analytics data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(link._id)}
                        className="bg-destructive text-destructive-foreground"
                      >
                        {deletingId === link._id ? <span>Deleting...</span> : <span>Delete</span>}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

