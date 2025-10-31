import "./globals.css";

export const metadata = {
  title: "HR & Manajemen IT Dashboard",
  description: "Sistem Informasi Karyawan Terintegrasi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#fffef9] text-gray-900">{children}</body>
    </html>
  );
}