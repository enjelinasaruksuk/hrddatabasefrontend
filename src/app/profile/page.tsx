"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const pathname = usePathname();
  const [fileName, setFileName] = useState("No File Chosen");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // ✅ Password validation
    if (password && password.length < 8) {
      setErrorMessage("❌ Password must be at least 8 characters long.");
      setSuccessMessage(null);
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    setErrorMessage(null);
    setSuccessMessage("✅ Profile successfully updated!");
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleLogoutCancel = () => setShowLogoutModal(false);
  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    router.push("/");
  };

  return (
    <div
      className="flex h-screen bg-[#fffbea]"
      style={{ fontFamily: "Cambria, serif" }}
    >
      <div className="w-1/5 bg-[#FDD835] flex flex-col items-center py-10">
        <Image
          src="/image/LOGOSIMKARIN.png"
          alt="Logo Simkarin"
          width={90}
          height={90}
          className="mb-12"
        />

        <button
          onClick={() => router.push("/dashboard")}
          className={`text-black font-semibold mb-4 px-4 py-1 rounded-md transition-all duration-200 ${
            pathname === "/dashboard"
              ? "bg-[#f6e69a] shadow-md scale-105"
              : "hover:bg-[#f8e88a]"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => router.push("/profile")}
          className={`text-black font-semibold px-4 py-1 rounded-md transition-all duration-200 ${
            pathname === "/profile"
              ? "bg-[#f6e69a] shadow-md scale-105"
              : "hover:bg-[#f8e88a]"
          }`}
        >
          Edit Profile
        </button>
      </div>

      <div className="flex-1 bg-white p-10 relative overflow-y-auto">
        <button
          onClick={handleLogoutClick}
          className="absolute top-6 right-8 bg-red-600 w-12 h-12 flex items-center justify-center rounded-full shadow-md hover:shadow-xl transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          <LogOut className="text-white w-6 h-6" />
        </button>

        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        {/* ✅ Success & Error Message */}
        {successMessage && (
          <div className="mb-6 w-[80%] mx-auto bg-green-100 text-green-800 border border-green-400 rounded-md p-3 text-center font-medium animate-fadeIn">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-6 w-[80%] mx-auto bg-red-100 text-red-800 border border-red-400 rounded-md p-3 text-center font-medium animate-fadeIn">
            {errorMessage}
          </div>
        )}

        <div className="bg-white shadow-lg rounded-2xl p-8 w-[80%] mx-auto border border-gray-100">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#FDD835]"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-[#FDD835]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A10 10 0 1112 22a9.969 9.969 0 01-6.879-4.196z"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-[#FDD835] px-5 py-2 rounded-md font-semibold text-black hover:bg-yellow-300"
              >
                Choose File
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="text-gray-700 bg-[#fef3c7] px-4 py-2 rounded-md">
                {fileName}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium mb-1 text-gray-800">
                Name:
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 bg-[#fef3c7] rounded-md border-none focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-1 text-gray-800">
                Password:
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-[#fef3c7] rounded-md border-none focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-1 text-gray-800">
                Phone Number:
              </label>
              <input
                type="text"
                placeholder="Enter phone number"
                className="w-full p-3 bg-[#fef3c7] rounded-md border-none focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>

            {/* ✅ Edit & Save Button */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => handleSubmit()}
                className="bg-[#FDD835] text-black px-8 py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shadow-sm">
                <LogOut className="text-red-600 w-6 h-6" />
              </div>

              <h3 className="text-xl font-semibold text-gray-800">
                Logout Confirmation
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? You will be redirected to the homepage.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={handleLogoutCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-sm hover:bg-red-700 transition font-medium"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
