import Link from "next/link"
import { Briefcase } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">JobPortal</span>
            </Link>
            <p className="text-sm text-(--muted-foreground) leading-relaxed">
              Connecting talented professionals with amazing opportunities worldwide.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jobs" className="text-(--muted-foreground) hover:text-foreground transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-(--muted-foreground) hover:text-foreground transition-colors">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-(--muted-foreground) hover:text-foreground transition-colors">
                  Career Resources
                </Link>
              </li>
              <li>
                <Link href="/resume" className="text-(--muted-foreground)   hover:text-foreground transition-colors">
                  Resume Builder
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/post-job" className="text-(--muted-foreground) hover:text-foreground transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-(--muted-foreground)  hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/candidates" className="text-(--muted-foreground) hover:text-foreground transition-colors">
                  Browse Candidates
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="text-(--muted-foreground) hover:text-foreground transition-colors">
                  Enterprise Solutions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-(--muted-foreground) hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-(--muted-foreground) hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-(--muted-foreground) hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-(--muted-foreground)  hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-(--muted-foreground)">
          <p>&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
