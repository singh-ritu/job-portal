"use client"; // this makes it a Client Component

import Link from "next/link";
import { usePathname, useRouter} from "next/navigation";
import { FaHome, FaClipboardList, FaBookmark, FaUser, FaSignOutAlt } from "react-icons/fa";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
      });

      router.replace("/login"); 
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const links = [
    { name: "Home", href: "/jobseekerDashboard", icon: <FaHome /> },
    { name: "My Applications", href: "/jobseekerDashboard/applications", icon: <FaClipboardList /> },
    { name: "Saved Jobs", href: "/jobseekerDashboard/savedJobs", icon: <FaBookmark /> },
    { name: "Profile", href: "/jobseekerDashboard/profile", icon: <FaUser /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
      <div className="text-2xl font-bold text-blue-600 mb-8">Jobseeker</div>
      <nav className="flex flex-col space-y-2 flex-1">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`
              flex items-center gap-3 px-4 py-2 rounded-lg
              ${pathname === link.href ? "bg-blue-100 text-blue-700" : "text-gray-700"}
              hover:bg-blue-100 hover:text-blue-700
            `}
          >
            {link.icon}
            <span className="font-medium">{link.name}</span>
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="
            mt-auto flex items-center gap-3 px-4 py-2 rounded-lg
            text-red-500 hover:text-red-700 hover:bg-red-100
          "
        >
          <FaSignOutAlt />
          <span className="font-medium">Logout</span>
        </button>
      </nav>
    </aside>
  );
}
