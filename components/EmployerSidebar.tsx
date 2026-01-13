"use client"; // required for hooks

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBriefcase, FaPlusCircle, FaUsers, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "My Jobs", href: "/employerDashboard", icon: <FaBriefcase /> },
    { name: "Create Job", href: "/employerDashboard/create", icon: <FaPlusCircle /> },
    { name: "Applicants", href: "/employerDashboard/applicants", icon: <FaUsers /> },
    { name: "Logout", href: "/logout", icon: <FaSignOutAlt />, isLogout: true },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
      <div className="text-2xl font-bold text-blue-600 mb-8">Employer</div>
      <nav className="flex flex-col space-y-2 flex-1">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`
              flex items-center gap-3 px-4 py-2 rounded-lg
              ${pathname === link.href ? "bg-blue-100 text-blue-700" : "text-gray-700"}
              hover:bg-blue-100 hover:text-blue-700
              ${link.isLogout ? "mt-auto text-red-500 hover:text-red-700 hover:bg-red-100" : ""}
            `}
          >
            {link.icon}
            <span className="font-medium">{link.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
