"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Phone, Clock, MapPin } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  return (
    <main
      className="flex flex-col min-h-screen bg-white"
      style={{ fontFamily: "Cambria, Georgia, serif" }} // ✅ Cambria + fallback
    >
      {/* HEADER */}
      <header className="flex justify-between items-center px-10 py-4 bg-[#F8CE0D] border-b border-black">
        <div className="flex items-center gap-4">
          <Image
            src="/image/LOGOSIMKARIN.png"
            alt="Logo"
            width={60}
            height={60}
          />
          <div>
            <h1 className="text-lg font-semibold text-black leading-tight">
              Sistem Informasi Karyawan Terintegrasi
            </h1>
          </div>
        </div>

        {/* Tombol login diarahkan ke halaman login */}
        <button
          onClick={() => router.push("/login")}
          className="px-5 py-[4px] bg-[#ffffff] rounded-full text-black text-base font-semibold hover:bg-[#FFF1A8] active:bg-[#FFF1A8] transition-colors duration-200"
        >
          Login
        </button>
      </header>

      {/* MAIN CONTENT */}
      <section
        className="flex flex-col items-center justify-center text-center py-16 px-8"
        style={{
          background: "linear-gradient(#F8CE0D, #FFFFFF)",
        }}
      >
        {/* Box dengan background logo */}
        <div className="relative w-full max-w-5xl bg-white/90 rounded-xl shadow-md overflow-hidden h-[450px]">
          <Image
            src="/image/PT.LKS.jpg"
            alt="Background LKS"
            fill
            className="object-cover opacity-20"
          />

          {/* Konten teks */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-8">
            <h2 className="mt-3 text-2xl font-semibold text-black">
              Welcome to
            </h2>
            <h1 className="text-5xl font-extrabold text-black mt-2">
              SIMKARIN
            </h1>
            <p className="italic text-base mt-2">
              Integrated Employee Information System of PT. Lancang Kuning
              Sukses
            </p>
            <p className="text-base text-gray-800 mt-5 leading-relaxed max-w-2xl">
              Manage employee data in a structured, secure, and efficient manner
              with a modern web-based system that supports HR, Management, and
              IT.
            </p>
          </div>
        </div>

        {/* ABOUT SIMKARIN */}
        <div className="mt-16 text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-black mb-4">
            About SIMKARIN
          </h2>
          <p className="text-base text-black leading-relaxed">
            SIMKARIN is a web-based system developed to simplify HRD in managing
            permanent and contract employee data at PT. Lancang Kuning Sukses.
            <br />
            With automatic reminders, centralized data recording, and an
            intuitive interface, SIMKARIN.
          </p>
        </div>

        {/* MAPS */}
        <div className="mt-10 w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0416023617273!2d103.9563!3d1.0835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d989f31d17dc73%3A0x92d72e0ac73db2b9!2sPT.%20Lancang%20Kuning%20Sukses!5e0!3m2!1sid!2sid!4v1730000000000!5m2!1sid!2sid"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[250px] rounded-none shadow-none"
          ></iframe>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#FCEEAB] text-black px-12 py-6 flex justify-between items-start text-base">
        <div className="flex items-center gap-3">
          <Image
            src="/image/LOGOLKS.png"
            alt="Logo PT LKS"
            width={55}
            height={55}
          />
          <p className="font-semibold text-lg">Lancang Kuning Sukses</p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Mail size={18} />
            <span>admin@pt-lks.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={18} />
            <span>+62-778-409-5176</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span>08:00 am – 05:00 pm</span>
          </div>
        </div>

        <div className="flex items-start gap-3 max-w-xs text-right">
          <MapPin size={48} className="mt-1" />
          <p className="text-sm">
            Kawasan Bintang Industrial Park II, Blok B no 308, Tanjung Uncang,
            Kec. Batu Aji, Kota Batam, Kepulauan Riau, 29424
          </p>
        </div>
      </footer>
    </main>
  );
}

