import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-16 md:py-24 text-white bg-[#3456ad]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to Take the Next Step?</h2>
          <p className="text-lg mb-8 text-primary-foreground/90 text-pretty">
            Whether you're looking for your next opportunity or searching for top talent, we're here to help you
            succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="text-sm font-medium px-4 py-2 rounded text-black hover:bg-[#a4b2d7] bg-white transition-colors cursor-pointer">
              <Link href="/jobs">Browse Jobs</Link>
            </button>
            <button className="text-sm font-medium px-4 py-2 rounded border border-white bg-[#3456ad] hover:bg-white hover:text-[#3456ad] text-white transition-colors cursor-pointer">
              <Link href="/post-job">Post a Job</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
