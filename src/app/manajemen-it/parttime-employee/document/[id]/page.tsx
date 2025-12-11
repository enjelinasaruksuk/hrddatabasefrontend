"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiDownload, FiEye, FiArrowLeft, FiFileText, FiAlertCircle, FiFile } from "react-icons/fi";

interface EmployeeDocuments {
  NIK: number;
  name: string;
  photo: string | null;
  file_ktp: string | null;
  file_npwp: string | null;
  file_bpjs_kesehatan: string | null;
  file_bpjs_ketenagakerjaan: string | null;
  file_kk: string | null;
  file_training: string | null;
  file_mcu: string | null;
  file_cv: string | null;
  file_ijazah: string | null;
}

const documentLabels: { [key: string]: string } = {
  photo: "Photo (Formal)",
  file_ktp: "Identity Card (KTP)",
  file_npwp: "Tax Number (NPWP)",
  file_bpjs_kesehatan: "BPJS Health Insurance",
  file_bpjs_ketenagakerjaan: "BPJS Employment Insurance",
  file_kk: "Family Card (KK)",
  file_training: "Training Certificate",
  file_mcu: "Medical Check Up Result",
  file_cv: "CV / Resume",
  file_ijazah: "Degree Certificate / Ijazah"
};

export default function EmployeeDocumentsPage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = params?.id as string;

  const [documents, setDocuments] = useState<EmployeeDocuments | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, [employeeId]);

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`);
      if (!response.ok) throw new Error("Failed to fetch documents");
      
      const data = await response.json();
      console.log('📄 Employee data:', data); // Debug log
      setDocuments(data);
      setLoading(false);
    } catch (err) {
      console.error('❌ Fetch error:', err);
      setError("Failed to load documents");
      setLoading(false);
    }
  };

  // ⭐ FUNGSI PENTING INI! - Untuk build URL file
  const getFileUrl = (filePath: string | null) => {
    if (!filePath) return null;
    
    console.log('🔍 Processing file path:', filePath); // Debug log
    
    // Jika path sudah lengkap dengan http://
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return filePath;
    }
    
    // Jika path sudah lengkap dengan /uploads/
    if (filePath.startsWith('/uploads/')) {
      const fullUrl = `http://localhost:5000${filePath}`;
      console.log('✅ Full URL:', fullUrl);
      return fullUrl;
    }
    
    // Jika path dimulai dengan /
    if (filePath.startsWith('/')) {
      return `http://localhost:5000${filePath}`;
    }
    
    // ⭐ YANG INI PALING PENTING - untuk file yang cuma nama aja
    const fullUrl = `http://localhost:5000/uploads/${filePath}`;
    console.log('✅ Built URL from filename:', fullUrl);
    return fullUrl;
  };

  const getFileName = (filePath: string | null) => {
    if (!filePath) return "";
    return filePath.split('/').pop() || "";
  };

  const isImageFile = (filename: string) => {
    const ext = filename.toLowerCase().split('.').pop();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '');
  };

  const handleDownload = async (fileUrl: string, fileName: string) => {
    try {
      console.log('⬇️ Downloading:', fileUrl);
      const response = await fetch(fileUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      console.log('✅ Download success!');
    } catch (err) {
      console.error('❌ Download error:', err);
      alert(`Failed to download file: ${err instanceof Error ? err.message : 'Unknown error'}\n\nURL: ${fileUrl}`);
    }
  };

  const handleView = (fileUrl: string) => {
    console.log('👁️ Opening:', fileUrl);
    window.open(fileUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading documents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <FiAlertCircle className="text-red-500 text-5xl mx-auto mb-4" />
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const totalDocs = Object.keys(documentLabels).length;
  const uploadedDocs = Object.keys(documentLabels).filter(key => {
    const value = documents?.[key as keyof EmployeeDocuments];
    return value !== null && value !== undefined && value !== "";
  }).length;
  const missingDocs = totalDocs - uploadedDocs;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiArrowLeft className="text-xl" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Employee Support Documents</h1>
                <p className="text-sm text-gray-600 mt-1">
                  NIK: {documents?.NIK} - {documents?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Documents</p>
                <p className="text-3xl font-bold text-gray-900">{totalDocs}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiFile className="text-blue-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Uploaded</p>
                <p className="text-3xl font-bold text-gray-900">{uploadedDocs}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FiFileText className="text-green-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-red-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Not yet uploaded</p>
                <p className="text-3xl font-bold text-gray-900">{missingDocs}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FiAlertCircle className="text-red-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold text-gray-900">List of Supporting Documents</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Document Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">File Name</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Preview</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(documentLabels).map(([key, label], index) => {
                  const filePath = documents?.[key as keyof EmployeeDocuments] as string | null;
                  const fileUrl = getFileUrl(filePath);
                  const fileName = getFileName(filePath);
                  const hasFile = !!fileUrl;

                  return (
                    <tr key={key} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded ${hasFile ? 'bg-green-100' : 'bg-gray-100'}`}>
                            <FiFileText className={`text-lg ${hasFile ? 'text-green-600' : 'text-gray-400'}`} />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{label}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {hasFile ? (
                          <span className="truncate max-w-xs inline-block" title={fileName}>
                            {fileName}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic">No files yet</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {hasFile ? (
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Available
                          </span>
                        ) : (
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Not yet uploaded
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {hasFile && isImageFile(fileName) ? (
                          <div
                            className="inline-block cursor-pointer hover:opacity-75 transition-opacity"
                            onClick={() => setSelectedImage(fileUrl)}
                          >
                            <img
                              src={fileUrl}
                              alt={label}
                              className="h-16 w-16 object-cover rounded border-2 border-gray-200"
                              onError={(e) => {
                                console.error('❌ Image failed to load:', fileUrl);
                                e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="%23fee"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23f00" font-size="10">Error</text></svg>';
                              }}
                            />
                          </div>
                        ) : hasFile ? (
                          <div className="inline-flex items-center justify-center h-16 w-16 bg-gray-100 rounded border-2 border-gray-200">
                            <FiFileText className="text-gray-400 text-2xl" />
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {hasFile ? (
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleView(fileUrl)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                              title="View"
                            >
                              <FiEye />
                              View
                            </button>
                            <button
                              onClick={() => handleDownload(fileUrl, fileName)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors"
                              title="Download"
                            >
                              <FiDownload />
                              Download
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white text-4xl hover:text-gray-300 font-bold"
            >
              ×
            </button>
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              onError={() => {
                alert('Failed to load image. Please check if the file exists on server.');
                setSelectedImage(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}