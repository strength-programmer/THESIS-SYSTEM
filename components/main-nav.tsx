import Link from "next/link"
import type React from "react" // Added import for React
import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
      </Link>
      <Link
        href="/roi-visualization"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        ROI Visualization
      </Link>
      <Link
        href="/daily-summary"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Daily Summary
      </Link>
      <Link
        href="/live-feed"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Live Feed
      </Link>
      <Link
        href="/employee-insights"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Employee Insights
      </Link>
    </nav>
  )
}

