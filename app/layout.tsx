import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { VSCodeLayout } from "@/components/vs-code-layout"
import { EasterEgg } from "@/components/easter-egg"
import { FloatingActionButton } from "@/components/floating-action-button"

export const metadata: Metadata = {
  title: "Dexter Miranda - Full Stack Developer Portfolio",
  description: "A stunning VS Code inspired portfolio showcasing full stack development skills",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <VSCodeLayout>{children}</VSCodeLayout>
        <EasterEgg />
        <FloatingActionButton />
      </body>
    </html>
  )
}
