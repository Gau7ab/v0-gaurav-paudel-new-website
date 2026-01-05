import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Mountain, Plus, Edit, Trash2, Eye } from "lucide-react"
import { sql } from "@/lib/db"
import Image from "next/image"

async function getTreks() {
  try {
    return await sql`SELECT * FROM treks ORDER BY order_index ASC`
  } catch (e) {
    // Fallback if table doesn't exist yet
    return []
  }
}

export default async function AdminTreksPage() {
  const treks = await getTreks()

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Treks</h1>
            <p className="text-muted-foreground mt-1">Add, edit, or remove trekking experiences.</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl flex gap-2">
            <Plus className="h-4 w-4" />
            Add New Trek
          </Button>
        </div>

        <div className="bg-card/50 border border-primary/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
          <Table>
            <TableHeader className="bg-primary/5">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[100px]">Preview</TableHead>
                <TableHead>Trek Name</TableHead>
                <TableHead>Elevation</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {treks.length > 0 ? (
                treks.map((trek) => (
                  <TableRow key={trek.id} className="border-primary/5 hover:bg-primary/5 transition-colors">
                    <TableCell>
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-primary/20">
                        <Image
                          src={trek.image_url || "/placeholder.svg"}
                          alt={trek.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{trek.name}</TableCell>
                    <TableCell>{trek.elevation}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold uppercase tracking-wider">
                        {trek.difficulty}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="hover:bg-primary/20 text-primary">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-primary/20 text-primary">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-destructive/10 text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Mountain className="h-8 w-8 opacity-20" />
                      <p>No treks found in the database.</p>
                      <p className="text-xs">Run the setup scripts to initialize data.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  )
}
