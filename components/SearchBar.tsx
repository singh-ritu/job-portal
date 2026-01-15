"use client";

import { MapPin, Search } from "lucide-react";

export function SearchBar() {
    return(
    <section className="relative mt-8 z-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl bg-card rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2 border border-gray-200 shadow-md rounded-md px-4 py-2">
              <Search className="h-5 w-5 text-(--muted-foreground)" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="flex-1 flex items-center gap-2 border border-gray-200 shadow-md rounded-md px-4 py-2">
              <MapPin className="h-5 w-5 text-(--muted-foreground)" />
              <input
                type="text"
                placeholder="City or remote"
                className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <button className="text-sm font-medium px-4 py-2 rounded bg-[#3456ad] hover:bg-[#5779ce] text-white transition-colors cursor-pointer">
              Search Jobs
            </button>
          </div>
        </div>
      </div>
    </section>
    )
}