import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      content:
        "JobPortal helped me find my dream job in just 2 weeks. The platform is intuitive and the job recommendations were spot on!",
      initials: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Product Designer",
      company: "Design Co",
      content:
        "As a hiring manager, JobPortal has been invaluable. We found amazing talent quickly and efficiently. Highly recommended!",
      initials: "MC",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "Growth Labs",
      content:
        "The best job platform I've used. Clean interface, verified listings, and excellent support throughout my job search journey.",
      initials: "ER",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">What Our Users Say</h2>
          <p className="text-(--muted-foreground) text-lg max-w-2xl mx-auto text-pretty">
            Join thousands of satisfied job seekers and employers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border border-gray-200 shadow-md">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#36ad34] text-[#36ad34]" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6 text-(--muted-foreground)">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-[#3456ad] text-white">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-(--muted-foreground)">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
