import { useState } from "react";

function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // Handle file drop or selection
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    const newFiles = Array.from(
      "dataTransfer" in e
        ? e.dataTransfer.files
        : (e.target as HTMLInputElement).files || []
    ) as File[];
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileChange(e);
  };

  // Clear files (for demo purposes)
  const clearFiles = () => setFiles([]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 transform transition-all hover:scale-105">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Upload Your Files
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Drag & drop or click to select files
        </p>

        {/* Drag & Drop Area */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-300 ${
            dragActive
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16V4m0 0L3 8m4-4l4 4m6 4v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6m12-4h4m-4 0l-4 4"
            />
          </svg>
          <p className="mt-2 text-gray-600">
            {dragActive ? "Drop files here!" : "Drop files or click to upload"}
          </p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Selected Files ({files.length})
            </h3>
            <ul className="space-y-2 max-h-40 overflow-y-auto">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded-lg text-sm text-gray-600"
                >
                  <span className="truncate">{file.name}</span>
                  <span className="text-xs text-gray-400">
                    {(file.size / 1024).toFixed(2)} KB
                  </span>
                </li>
              ))}
            </ul>
            <button
              onClick={clearFiles}
              className="mt-4 w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Clear Files
            </button>
          </div>
        )}

        {/* Placeholder for Future S3 Upload Button */}
        {files.length > 0 && (
          <button
            disabled
            className="mt-4 w-full py-2 px-4 bg-indigo-500 text-white rounded-lg opacity-50 cursor-not-allowed"
          >
            Upload to S3 (Coming Soon)
          </button>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
