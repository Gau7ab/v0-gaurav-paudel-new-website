import { Suspense } from "react"
import PostEditorPage from "@/app/admin/posts/[id]/edit/page"

interface NewPostPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function NewPostPage({ searchParams }: NewPostPageProps) {
  const params = await searchParams
  const postType = (params.type as "blog" | "travel") || "blog"
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostEditorPage postType={postType} />
    </Suspense>
  )
}
