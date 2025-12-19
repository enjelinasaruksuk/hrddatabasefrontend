"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FiLogOut, FiBell, FiUser } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "-";
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};

const formatCurrency = (value: any) => {
  if (!value) return "-";
  return `Rp ${Number(value).toLocaleString('id-ID')}`;
};

interface EmployeeDetailViewProps {
  employee: any;
  basePath?: string;
  isGradient?: boolean;
}

export default function EmployeeDetailView({ 
  employee, 
  basePath = "", 
  isGradient = false 
}: EmployeeDetailViewProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [notifCount, setNotifCount] = useState(0); // ✅ State untuk notifikasi
  const pathname = usePathname();
  const router = useRouter();

  // ✅ Fetch jumlah notifikasi saat komponen di-mount
  useEffect(() => {
    async function fetchReminderCount() {
      try {
        const res = await fetch("http://localhost:5000/api/reminder/count");
        const data = await res.json();
        setNotifCount(data.total || 0);
      } catch (error) {
        console.log("Failed to fetch reminder count:", error);
      }
    }

    fetchReminderCount();
  }, []);

  const loadImage = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            resolve(dataUrl);
          } else {
            reject(new Error('Canvas context not available'));
          }
        } catch (err) {
          console.error('Canvas error:', err);
          reject(err);
        }
      };
      
      img.onerror = (err) => {
        console.error('Image load error:', err);
        reject(err);
      };
      
      img.src = url;
    });
  };

  const handleDownloadPDF = async () => {
    if (!employee) return;

    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 2000);

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Header
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("EMPLOYEE FORM", pageWidth / 2, yPos, { align: "center" });
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${new Date().toLocaleDateString('id-ID')}`, pageWidth / 2, yPos, { align: "center" });
    
    yPos += 15;

    const photoX = 14;         
    const photoY = yPos;       
    const photoWidth = 40;      
    const photoHeight = 50;     
    
    const tableX = photoX + photoWidth + 5;
    const tableWidth = pageWidth - tableX - 14;

    if (employee.photo) {
      try {
        console.log('🔍 Loading photo:', employee.photo);
        const imgUrl = `http://localhost:5000/uploads/${employee.photo}`;
        const imgData = await loadImage(imgUrl);
        
        doc.addImage(imgData, 'JPEG', photoX, photoY, photoWidth, photoHeight);
        doc.setDrawColor(0);
        doc.setLineWidth(0.5);
        doc.rect(photoX, photoY, photoWidth, photoHeight);
        
        console.log('✅ Photo added successfully');
      } catch (err) {
        console.error('❌ Failed to load employee photo:', err);
        
        doc.setFillColor(240, 240, 240);
        doc.rect(photoX, photoY, photoWidth, photoHeight, 'F');
        doc.setDrawColor(180);
        doc.setLineWidth(0.5);
        doc.rect(photoX, photoY, photoWidth, photoHeight);
        doc.setFontSize(8);
        doc.setTextColor(100);
        doc.text('No Photo', photoX + photoWidth/2, photoY + photoHeight/2, { align: 'center' });
        doc.setTextColor(0);
      }
    } else {
      doc.setFillColor(240, 240, 240);
      doc.rect(photoX, photoY, photoWidth, photoHeight, 'F');
      doc.setDrawColor(180);
      doc.setLineWidth(0.5);
      doc.rect(photoX, photoY, photoWidth, photoHeight);
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text('No Photo', photoX + photoWidth/2, photoY + photoHeight/2, { align: 'center' });
      doc.setTextColor(0);
    }

    // BIODATA Section
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("BIODATA", tableX, yPos);

    autoTable(doc, {
      startY: yPos + 3,
      margin: { left: tableX },
      tableWidth: tableWidth,
      body: [
        ["Name", employee.name || "-"],
        ["Email", employee.email || "-"],
        ["Biological Mother's Name", employee.mother_name || "-"],
        ["Address", employee.address || "-"],
        ["Religion", employee.religion || "-"],
        ["Date of Birth", formatDate(employee.birth_date)],
        ["Age", employee.age || "-"],
        ["Place of Birth", employee.birth_place || "-"],
        ["Marital Status", employee.marital_status || "-"],
        ["Phone Number", employee.phone_number || "-"],
        ["Identity Number", employee.identity_number || "-"],
        ["Last Education", employee.last_education || "-"],
      ],
      theme: "grid",
      columnStyles: {
        0: { cellWidth: 50, fontStyle: "bold" },
        1: { cellWidth: 'auto' }
      },
      styles: { fontSize: 9 }
    });

    yPos = (doc as any).lastAutoTable.finalY + 5;

    // EMPLOYMENT INFORMATION
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("EMPLOYMENT INFORMATION", tableX, yPos);

    autoTable(doc, {
      startY: yPos + 3,
      margin: { left: tableX },
      tableWidth: tableWidth,
      body: [
        ["NIK", employee.NIK || "-"],
        ["NPWP", employee.tax_number || "-"],
        ["Account Number", employee.bank_account || "-"],
        ["Bank Type", employee.bank_type || "-"],
        ["Division", employee.division_name || "-"],
        ["Date on Join", formatDate(employee.date_join)],
        ["Department", employee.department_name || "-"],
        ["Date of End", formatDate(employee.date_end)],
        ["Position", employee.position || "-"],
        ["MCU History", employee.mcu_history || "-"],
        ["Training List", employee.training_list || "-"],
      ],
      theme: "grid",
      columnStyles: {
        0: { cellWidth: 50, fontStyle: "bold" },
        1: { cellWidth: 'auto' }
      },
      styles: { fontSize: 9 }
    });

    yPos = (doc as any).lastAutoTable.finalY + 5;

    // PAYROLL INFORMATION
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("PAYROLL INFORMATION", tableX, yPos);

    autoTable(doc, {
      startY: yPos + 3,
      margin: { left: tableX },
      tableWidth: tableWidth,
      body: [
        ["All In Salary", formatCurrency(employee.salary_all_in)],
        ["Fixed Allowance", formatCurrency(employee.fixed_allowance)],
        ["Basic Salary", formatCurrency(employee.salary_basic)],
        ["Irregular Allowance", formatCurrency(employee.allowance_irregular)],
      ],
      theme: "grid",
      columnStyles: {
        0: { cellWidth: 50, fontStyle: "bold" },
        1: { cellWidth: 'auto' }
      },
      styles: { fontSize: 9 }
    });

    yPos = (doc as any).lastAutoTable.finalY + 5;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("EMPLOYEE BENEFIT", tableX, yPos);

    autoTable(doc, {
      startY: yPos + 3,
      margin: { left: tableX },
      tableWidth: tableWidth,
      body: [
        ["BPJS Employment", employee.bpjs_employment || "-"],
        ["BPJS Health", employee.bpjs_health || "-"],
      ],
      theme: "grid",
      columnStyles: {
        0: { cellWidth: 50, fontStyle: "bold" },
        1: { cellWidth: 'auto' }
      },
      styles: { fontSize: 9 }
    });

    doc.save(`Employee_${employee.NIK}_${employee.name}.pdf`);
  };

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    router.push("/");
  };
  const handleLogoutCancel = () => setShowLogoutModal(false);

  const headerClass = isGradient 
    ? "bg-gradient-to-b from-yellow-300 via-yellow-100 to-white border-b border-gray-300"
    : "bg-yellow-300 border-b border-black";
  
  const sidebarClass = isGradient
    ? "bg-gradient-to-b from-yellow-300 via-yellow-100 to-white border-r border-gray-200 shadow-sm"
    : "bg-yellow-300";

  const menuActiveClass = isGradient ? "bg-yellow-100" : "bg-yellow-200";
  const menuHoverClass = isGradient ? "hover:bg-yellow-50" : "hover:bg-yellow-200";

  return (
    <div className="min-h-screen bg-gray-100 font-['Cambria']">
      <header className={`${headerClass} h-16 flex items-center justify-between px-10 py-12 shadow-md`}>
        <div className="flex items-center gap-6">
          <img src="/image/logo simkarin.png" alt="Logo" className="w-30 h-30 rounded-sm object-cover" />
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-gray-800">
            Employee Form
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* ✅ Badge Notifikasi Ditambahkan */}
          <Link href={`${basePath}/reminder`} className="relative">
            <button aria-label="reminder" className="p-2 rounded-full hover:bg-yellow-200 transition">
              <FiBell size={20} />
            </button>
            
            {notifCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-[6px] py-[1px] rounded-full font-bold">
                {notifCount > 9 ? "9+" : notifCount}
              </span>
            )}
          </Link>

          <Link href={`${basePath}/profile`}>
            <button aria-label="profile" className="p-2 rounded-full hover:bg-yellow-200 transition">
              <FiUser size={20} />
            </button>
          </Link>
          <button
            aria-label="logout"
            onClick={handleLogoutClick}
            className="ml-2 bg-red-600 text-white p-2 rounded-full shadow hover:bg-red-700 transition"
          >
            <FiLogOut size={18} />
          </button>
        </div>
      </header>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <FiLogOut className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Logout Confirmation</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? You will be redirected to the home page.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={handleLogoutCancel} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition font-medium">
                Cancel
              </button>
              <button onClick={handleLogoutConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium">
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex min-h-[calc(100vh-5rem)]">
        <aside className={`w-64 ${sidebarClass} p-5 flex flex-col gap-2 font-[Cambria]`}>
          <Link href={`${basePath}/dashboard`}>
            <div className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
                pathname === `${basePath}/dashboard` ? `${menuActiveClass} shadow-sm` : menuHoverClass
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-black text-xl">🏠</div>
              <span className={`text-sm text-black ${
                  pathname === `${basePath}/dashboard` ? "font-semibold" : "font-medium"
                }`}
              >
                Dashboard
              </span>
            </div>
          </Link>

          <Link href={`${basePath}/fulltime-employee`}>
            <div className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
                pathname?.startsWith(`${basePath}/fulltime-employee`) ? `${menuActiveClass} shadow-sm` : menuHoverClass
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-black text-xl">📁</div>
              <span className={`text-sm text-black ${
                  pathname?.startsWith(`${basePath}/fulltime-employee`) ? "font-semibold" : "font-medium"
                }`}
              >
                Fulltime Employee
              </span>
            </div>
          </Link>

          <Link href={`${basePath}/parttime-employee`}>
            <div className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
                pathname?.startsWith(`${basePath}/parttime-employee`) ? `${menuActiveClass} shadow-sm` : menuHoverClass
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-black text-xl">📁</div>
              <span className={`text-sm text-black ${
                  pathname?.startsWith(`${basePath}/parttime-employee`) ? "font-semibold" : "font-medium"
                }`}
              >
                Parttime Employee
              </span>
            </div>
          </Link>

          <Link href="/contract-employee">
            <div
              className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
                pathname?.startsWith("/contract-employee")
                  ? "bg-yellow-200 shadow-sm"
                  : "hover:bg-yellow-200"
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-black text-xl">
                ⚠️
              </div>
              <span
                className={`text-sm text-black ${
                  pathname?.startsWith("/contract-employee")
                    ? "font-semibold"
                    : "font-medium"
                }`}
              >
                Expired Contracts
              </span>
            </div>
          </Link>
        </aside>

        <main className="flex-1 bg-white p-8 relative">
          <div className="max-w-6xl w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">👤</div>
                <h2 className="text-xl font-semibold">Employee Form</h2>
              </div>
              <button
                onClick={handleDownloadPDF}
                className={`${isClicked ? "bg-green-500" : "bg-green-600"} hover:bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded shadow transition`}
              >
                {isClicked ? "✔️ PDF" : "⬇️ PDF"}
              </button>
            </div>

            <div className="grid grid-cols-[300px_1fr] gap-8">
              <div className="flex flex-col items-start">
                <div className="w-full h-80 bg-gray-200 border-2 border-gray-400 flex items-center justify-center overflow-hidden">
                  {employee?.photo ? (
                    <img
                      src={`http://localhost:5000/uploads/${employee.photo}`}
                      alt="Employee"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.photo-placeholder')) {
                          const placeholder = document.createElement('span');
                          placeholder.className = 'photo-placeholder text-gray-500 text-sm';
                          placeholder.textContent = 'No Photo';
                          parent.appendChild(placeholder);
                        }
                      }}
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">No Photo</span>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <section>
                  <h3 className="font-bold text-lg border-b-2 border-gray-300 pb-2 mb-3">Biodata</h3>
                  <div className="grid grid-cols-[180px_1fr] gap-x-4 gap-y-2 text-sm">
                    <p className="font-medium">Name:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.name || "-"}</p>
                    <p className="font-medium">Email:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.email || "-"}</p>
                    <p className="font-medium">Biological Mothers Name:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.mother_name || "-"}</p>
                    <p className="font-medium">Address:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.address || "-"}</p>
                    <p className="font-medium">Religion:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.religion || "-"}</p>
                    <p className="font-medium">Date Of Birth:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{formatDate(employee?.birth_date)}</p>
                    <p className="font-medium">Age:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.age || "-"}</p>
                    <p className="font-medium">Place Of Birth:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.birth_place || "-"}</p>
                    <p className="font-medium">Marital Status:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.marital_status || "-"}</p>
                    <p className="font-medium">Phone Number:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.phone_number || "-"}</p>
                    <p className="font-medium">Identity Number:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.identity_number || "-"}</p>
                    <p className="font-medium">Last Education:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.last_education || "-"}</p>
                  </div>
                </section>

                <section>
                  <h3 className="font-bold text-lg border-b-2 border-gray-300 pb-2 mb-3">Employment Information</h3>
                  <div className="grid grid-cols-[180px_1fr] gap-x-4 gap-y-2 text-sm">
                    <p className="font-medium">NIK:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.NIK || "-"}</p>
                    <p className="font-medium">NPWP:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.tax_number || "-"}</p>
                    <p className="font-medium">Account Number:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.bank_account || "-"}</p>
                    <p className="font-medium">Bank Type:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.bank_type || "-"}</p>
                    <p className="font-medium">Division:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.division_name || "-"}</p>
                    <p className="font-medium">Date On Join:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{formatDate(employee?.date_join)}</p>
                    <p className="font-medium">Department:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.department_name || "-"}</p>
                    <p className="font-medium">Date Of End:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{formatDate(employee?.date_end)}</p>
                    <p className="font-medium">Position:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.position || "-"}</p>
                    <p className="font-medium">MCU History:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.mcu_history || "-"}</p>
                    <p className="font-medium">Training List:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.training_list || "-"}</p>
                  </div>
                </section>

                <section>
                  <h3 className="font-bold text-lg border-b-2 border-gray-300 pb-2 mb-3">Payroll Information</h3>
                  <div className="grid grid-cols-[180px_1fr] gap-x-4 gap-y-2 text-sm">
                    <p className="font-medium">All In Salary:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{formatCurrency(employee?.salary_all_in)}</p>
                    <p className="font-medium">Fixed Allowance:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{formatCurrency(employee?.fixed_allowance)}</p>
                    <p className="font-medium">Basic Salary:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{formatCurrency(employee?.salary_basic)}</p>
                    <p className="font-medium">Irregular Allowance:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{formatCurrency(employee?.allowance_irregular)}</p>
                  </div>
                </section>

                <section>
                  <h3 className="font-bold text-lg border-b-2 border-gray-300 pb-2 mb-3">Employee Benefit</h3>
                  <div className="grid grid-cols-[180px_1fr] gap-x-4 gap-y-2 text-sm">
                    <p className="font-medium">BPJS Employment:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.bpjs_employment || "-"}</p>
                    <p className="font-medium">BPJS Health:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded">{employee?.bpjs_health || "-"}</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}