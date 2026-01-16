import { Briefcase, Users, TrendingUp, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function FeaturesSection() {
  const features = [
    {
      icon: Briefcase,
      title: "Thousands of Jobs",
      description: "Browse through thousands of job listings from top companies across various industries.",
    },
    {
      icon: Users,
      title: "Top Employers",
      description: "Connect with leading companies actively looking for talented professionals like you.",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Access resources, insights, and opportunities to accelerate your career progression.",
    },
    {
      icon: Shield,
      title: "Verified Listings",
      description: "All job postings are verified to ensure authenticity and protect your job search.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-[#f7f9fa]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Why Choose JobPortal?</h2>
          <p className="text-(--muted-foreground) text-lg max-w-2xl mx-auto text-pretty">
            We make job searching simple, efficient, and successful
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="shadow-md border border-gray-200">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#e9edf7]">
                    <Icon className="h-6 w-6 text-[#3456ad]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-(--muted-foreground) text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
