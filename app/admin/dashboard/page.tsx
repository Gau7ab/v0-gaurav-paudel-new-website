import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { getAdminSession } from '@/lib/admin-server-actions'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const session = await getAdminSession()
  
  if (!session) {
    redirect('/admin/login')
  }

  return <AdminDashboard />
}
