import Link from "next/link";
import { Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

export function Header() {
    const router = useRouter();
    return(
        <header className="sticky top-0 z-50 w-full border-b-gray-700 bg-white shadow-sm cursor-pointer">
          <div className="container mx-auto flex h-16 items-center justify-between px-4"> 
            <Link href="/" className="flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-[#3456ad]" />
                <span className="text-xl font-semibold">JobPortal</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
                <Link href="/jobs" className="text-sm font-medium text-foreground hover:text-[#3456ad] transition-colors">
                    Find Jobs
                </Link>
                <Link href="/companies" className="text-sm font-medium text-foreground hover:text-[#3456ad] transition-colors">
                    Companies
                </Link>
                <Link href="/about" className="text-sm font-medium text-foreground hover:text-[#3456ad] transition-colors">
                    About
                </Link>
                <Link href="/contact" className="text-sm font-medium text-foreground hover:text-[#3456ad] transition-colors">
                    Contact
                </Link>
             </nav>
            <div className="hidden md:flex items-center gap-3">
                <button className="text-sm font-medium px-4 py-2 rounded hover:bg-[#36ad34] hover:text-white transition-colors cursor-pointer"
                onClick={()=> router.push('/login')}
                >
                    Sign In
                </button>
                <button className="text-sm font-medium px-4 py-2 rounded bg-[#3456ad] hover:bg-[#5779ce] text-white transition-colors cursor-pointer"
                onClick={() => router.push("/register")}
                >
                    Post a Job
                </button>
             </div>
          </div> 
        </header>
    )
}