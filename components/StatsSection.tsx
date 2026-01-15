export function StatsSection() {
  const stats = [
    { label: "Active Jobs", value: "50,000+" },
    { label: "Companies", value: "10,000+" },
    { label: "Job Seekers", value: "2M+" },
    { label: "Success Stories", value: "100K+" },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#3456ad] mb-2">{stat.value}</div>
              <div className="text-sm md:text-base text-(--muted-foreground)">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
