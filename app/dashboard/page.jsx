import { getCurrentUser, getUserDomains } from "@/lib/auth-actions"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { getLinks } from "@/lib/actions"
import { LinkList } from "@/components/link-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LinkForm } from "@/components/link-form"
import { DomainForm } from "@/components/domain-form"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const links = await getLinks()
  const domains = await getUserDomains()

  return (
    <div className="container py-10">
      <DashboardHeader user={user} />

      <div className="grid gap-6 mt-8">
        <Tabs defaultValue="links">
          <TabsList>
            <TabsTrigger value="links">My Links</TabsTrigger>
            <TabsTrigger value="create">Create Link</TabsTrigger>
            <TabsTrigger value="domains">Manage Domains</TabsTrigger>
          </TabsList>

          <TabsContent value="links" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Links</CardTitle>
                <CardDescription>Manage and track your created links</CardDescription>
              </CardHeader>
              <CardContent>
                <LinkList links={links} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create New Link</CardTitle>
                <CardDescription>Enter a destination URL to generate a special link</CardDescription>
              </CardHeader>
              <CardContent>
                <LinkForm domains={domains} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="domains" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Domains</CardTitle>
                <CardDescription>Manage your business domains</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Current Domains</h3>
                  {domains.length > 0 ? (
                    <ul className="space-y-2">
                      {domains.map((domain) => (
                        <li key={domain} className="p-3 bg-muted rounded-md">
                          {domain}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No domains added yet.</p>
                  )}
                </div>
                <DomainForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

