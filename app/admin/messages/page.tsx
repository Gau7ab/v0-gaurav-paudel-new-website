import { AdminLayout } from "@/components/admin/admin-layout"
import { Card } from "@/components/ui/card"
import { MessageSquare, Calendar, Mail, User, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { sql } from "@/lib/db"

async function getMessages() {
  try {
    return await sql`SELECT * FROM messages ORDER BY created_at DESC`
  } catch (e) {
    return []
  }
}

export default async function AdminMessagesPage() {
  const messages = await getMessages()

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
          <p className="text-muted-foreground mt-1">Communication from your website visitors.</p>
        </div>

        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <Card key={msg.id} className="border-primary/10 bg-card/50 backdrop-blur-sm overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-64 p-6 bg-primary/5 border-b md:border-b-0 md:border-r border-primary/10">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-primary" />
                        <span className="font-semibold truncate">{msg.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{msg.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(msg.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold mb-2">{msg.subject || "No Subject"}</h3>
                      <p className="text-muted-foreground leading-relaxed">{msg.message}</p>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg border-primary/20 text-primary bg-transparent"
                      >
                        Reply
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-24 bg-card/30 rounded-3xl border border-dashed border-primary/20">
              <MessageSquare className="h-12 w-12 text-primary/20 mx-auto mb-4" />
              <h2 className="text-xl font-semibold opacity-50">Your inbox is empty</h2>
              <p className="text-muted-foreground">New contact form submissions will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
