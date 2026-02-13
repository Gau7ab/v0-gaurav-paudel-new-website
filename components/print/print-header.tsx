import Image from "next/image"

interface PrintHeaderProps {
  toolName: string
  title?: string
}

export function PrintHeader({ toolName, title }: PrintHeaderProps) {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="hidden print:flex print-header items-center justify-between mb-6 pb-4 border-b-2 border-primary">
      <div className="flex items-center gap-3">
        <Image src="/images/logo-teal.png" alt="Gaurab Labs" width={120} height={40} className="h-10 w-auto" />
        <div className="border-l-2 border-primary/30 pl-3">
          <p className="font-heading font-semibold text-foreground">{toolName}</p>
          {title && <p className="text-xs text-muted-foreground">{title}</p>}
        </div>
      </div>
      <div className="text-right text-sm text-muted-foreground">
        <p>{date}</p>
        <p className="text-xs">gaurab-labs.com</p>
      </div>
    </div>
  )
}
