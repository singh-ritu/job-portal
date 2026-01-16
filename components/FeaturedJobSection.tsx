import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign } from "lucide-react"

export function FeaturedJobsSection() {
  const jobs = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $180k",
      tags: ["React", "TypeScript", "Next.js"],
    },
    {
      title: "Product Designer",
      company: "Design Studio",
      location: "Remote",
      type: "Full-time",
      salary: "$90k - $140k",
      tags: ["Figma", "UI/UX", "Design Systems"],
    },
    {
      title: "DevOps Engineer",
      company: "CloudScale",
      location: "New York, NY",
      type: "Full-time",
      salary: "$130k - $190k",
      tags: ["AWS", "Docker", "Kubernetes"],
    },
    {
      title: "Marketing Manager",
      company: "Growth Labs",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$80k - $120k",
      tags: ["SEO", "Content", "Analytics"],
    },
    {
      title: "Data Scientist",
      company: "AI Innovations",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$140k - $200k",
      tags: ["Python", "ML", "TensorFlow"],
    },
    {
      title: "Backend Engineer",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-time",
      salary: "$110k - $160k",
      tags: ["Node.js", "PostgreSQL", "APIs"],
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-[#f7f9fa]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Featured Job Openings</h2>
          <p className="text-(--muted-foreground) text-lg max-w-2xl mx-auto text-pretty">
            Handpicked opportunities from top companies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {jobs.map((job) => (
            <Card key={job.title} className="hover:shadow-lg transition-shadow bg-white border border-gray-200 shadow-md flex flex-col">
              <CardContent className="pt-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                  <p className="text-sm text-(--muted-foreground)">{job.company}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="space-y-2 mb-4 flex-1">
                  <div className="flex items-center gap-2 text-sm text-(--muted-foreground)">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-(--muted-foreground)">
                    <Clock className="h-4 w-4" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-(--muted-foreground)">
                    <DollarSign className="h-4 w-4" />
                    <span>{job.salary}</span>
                  </div>
                </div>
                <button className="text-sm font-medium px-4 py-2 rounded hover:bg-[#36ad34] border border-gray-200 shadow-md hover:text-white transition-colors cursor-pointer">
                  View Details
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <button className="text-sm font-medium px-4 py-2 rounded-md bg-[#3456ad] border border-gray-200 shadow-md hover:bg-[#5779ce] text-white transition-colors cursor-pointer">
            View All Jobs
          </button>
        </div>
      </div>
    </section>
  )
}
