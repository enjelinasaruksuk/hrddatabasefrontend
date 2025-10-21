"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/",
      label: "Dashboard",
      icon: "🏠",
    },
    {
      href: "/fulltime",
      label: "Fulltime Employee",
      icon: "📁",
    },
    {
      href: "/parttime",
      label: "Parttime Employee",
      icon: "📁",
    },
  ];

  return (
    <aside className="w-64 bg-yellow-300 p-5 flex flex-col gap-2">
      <div className="mb-8">
        <h1 className="text-xl font-bold">SK Solution</h1>
        <p className="text-xs text-gray-700">
          Sistem Informasi Karyawan Terintegrasi
        </p>
      </div>

      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-all ${
            pathname === item.href
              ? "bg-yellow-200 font-semibold"
              : "hover:bg-yellow-200"
          }`}
        >
          <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
            {item.icon}
          </div>
          <span
            className={`text-sm ${
              pathname === item.href ? "font-semibold" : "font-medium"
            }`}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </aside>
  );
}
