"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyle } from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"

interface TipTapEditorProps {
  content: string
  onChange: (content: string) => void
}

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      Color,
      Link.configure({ openOnClick: false }),
      Image.configure({ allowBase64: true }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return <div>Loading editor...</div>
  }

  const addImage = () => {
    const url = prompt("Enter image URL:")
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addLink = () => {
    const url = prompt("Enter link URL:")
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    } else {
      editor.chain().focus().unsetLink().run()
    }
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-3 bg-white/5 border border-white/10 rounded-lg">
        {/* Headings */}
        <select
          onChange={(e) => {
            const level = e.target.value
            if (level === "p") editor.chain().focus().setParagraph().run()
            else if (level === "h1") editor.chain().focus().toggleHeading({ level: 1 }).run()
            else if (level === "h2") editor.chain().focus().toggleHeading({ level: 2 }).run()
            else if (level === "h3") editor.chain().focus().toggleHeading({ level: 3 }).run()
          }}
          className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs text-foreground hover:bg-white/20 cursor-pointer"
        >
          <option value="p">Paragraph</option>
          <option value="h1">H1 — Title</option>
          <option value="h2">H2 — Section</option>
          <option value="h3">H3 — Sub</option>
        </select>

        <div className="border-r border-white/10 mx-1" />

        {/* Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
            editor.isActive("bold")
              ? "bg-primary text-black"
              : "bg-white/10 hover:bg-white/20 text-foreground"
          }`}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded text-xs italic transition-colors ${
            editor.isActive("italic")
              ? "bg-primary text-black"
              : "bg-white/10 hover:bg-white/20 text-foreground"
          }`}
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 rounded text-xs underline transition-colors ${
            editor.isActive("underline")
              ? "bg-primary text-black"
              : "bg-white/10 hover:bg-white/20 text-foreground"
          }`}
        >
          U
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 py-1 rounded text-xs line-through transition-colors ${
            editor.isActive("strike")
              ? "bg-primary text-black"
              : "bg-white/10 hover:bg-white/20 text-foreground"
          }`}
        >
          S
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
            editor.isActive("code")
              ? "bg-primary text-black"
              : "bg-white/10 hover:bg-white/20 text-foreground"
          }`}
        >
          {"</>"}
        </button>

        <div className="border-r border-white/10 mx-1" />

        {/* Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`px-2 py-1 rounded text-xs transition-colors ${
            editor.isActive({ textAlign: "left" })
              ? "bg-primary text-black"
              : "bg-white/10 hover:bg-white/20 text-foreground"
          }`}
        >
          ⬅
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`px-2 py-1 rounded text-xs transition-colors ${
            editor.isActive({ textAlign: "center" })
              ? "bg-primary text-black"
              : "bg-white/10 hover:bg-white/20 text-foreground"
          }`}
        >
          ⬆⬇
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`px-2 py-1 rounded text-xs transition-colors ${
            editor.isActive({ textAlign: "right" })
              ? "bg-primary text-black"
              : "bg-white/10 hover:bg-white/20 text-foreground"
          }`}
        >
          ➡
        </button>

        <div className="border-r border-white/10 mx-1" />

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded text-xs transition-colors ${
            editor.isActive("bulletList")
              ? "bg-primary text-black"
              : "bg-white/10 hover:bg-white/20 text-foreground"
          }`}
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded text-xs transition-colors ${
            editor.isActive("orderedList")
              ? "bg-primary text-black"
              : "bg-white/10 hover:bg-white/20 text-foreground"
          }`}
        >
          1. List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-2 py-1 rounded text-xs transition-colors ${
            editor.isActive("blockquote")
              ? "bg-primary text-black"
              : "bg-white/10 hover:bg-white/20 text-foreground"
          }`}
        >
          &quot;
        </button>

        <div className="border-r border-white/10 mx-1" />

        {/* Media */}
        <button
          onClick={addImage}
          className="px-2 py-1 rounded text-xs bg-white/10 hover:bg-white/20 text-foreground transition-colors"
        >
          🖼 Image
        </button>
        <button
          onClick={addLink}
          className="px-2 py-1 rounded text-xs bg-white/10 hover:bg-white/20 text-foreground transition-colors"
        >
          🔗 Link
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-2 py-1 rounded text-xs transition-colors ${
            editor.isActive("codeBlock")
              ? "bg-primary text-black"
              : "bg-white/10 hover:bg-white/20 text-foreground"
          }`}
        >
          {"{}"}
        </button>

        <div className="border-r border-white/10 mx-1" />

        {/* History */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="px-2 py-1 rounded text-xs bg-white/10 hover:bg-white/20 text-foreground transition-colors"
        >
          ↶ Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="px-2 py-1 rounded text-xs bg-white/10 hover:bg-white/20 text-foreground transition-colors"
        >
          ↷ Redo
        </button>

        <div className="flex-1" />

        {/* Font Size */}
        <select
          onChange={(e) => {
            const size = e.target.value
            if (size) {
              editor.chain().focus().setMark("textStyle", { fontSize: size }).run()
            }
          }}
          className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs text-foreground hover:bg-white/20 cursor-pointer"
        >
          <option value="">Font size</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
          <option value="32px">32px</option>
          <option value="48px">48px</option>
        </select>
      </div>

      {/* Editor */}
      <div className="prose prose-invert max-w-none">
        <EditorContent
          editor={editor}
          className="min-h-[400px] px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground focus-within:border-primary"
        />
      </div>
    </div>
  )
}
