import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, LineChart, Megaphone, Wrench, Heart, GraduationCap, Building } from "lucide-react"

export function CategoriesSection() {
  const categories = [
    { icon: Code, name: "Technology", count: "12,543 jobs" },
    { icon: Palette, name: "Design", count: "4,231 jobs" },
    { icon: LineChart, name: "Finance", count: "6,789 jobs" },
    { icon: Megaphone, name: "Marketing", count: "5,432 jobs" },
    { icon: Wrench, name: "Engineering", count: "8,901 jobs" },
    { icon: Heart, name: "Healthcare", count: "7,654 jobs" },
    { icon: GraduationCap, name: "Education", count: "3,210 jobs" },
    { icon: Building, name: "Business", count: "9,876 jobs" },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Browse Jobs by Category</h2>
          <p className="text-(--muted-foreground) text-lg max-w-2xl mx-auto text-pretty">
            Find opportunities in your field of expertise
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.name} href={`/jobs/${category.name.toLowerCase()}`}>
                <Card className="hover:shadow-lg transition-shadow shadow-md border border-gray-200">
                  <CardContent className="pt-6 text-center">
                    <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#ebf5e9]">
                      <Icon className="h-6 w-6 text-[#20a11b]" />
                    </div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-xs text-(--muted-foreground)">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
