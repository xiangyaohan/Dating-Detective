import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image, AlertCircle, CheckCircle } from 'lucide-react';
import { showToast } from './Toast';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // in bytes
  preview?: boolean;
  className?: string;
  disabled?: boolean;
  value?: File | string | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = 'image/jpeg,image/png,image/jpg',
  maxSize = 10 * 1024 * 1024, // 10MB
  preview = true,
  className = '',
  disabled = false,
  value
}) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    typeof value === 'string' ? value : null
  );

  const onDrop = useCallback(async (acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors.some((e: any) => e.code === 'file-too-large')) {
        showToast.error(`文件大小不能超过 ${Math.round(maxSize / 1024 / 1024)}MB`);
      } else if (rejection.errors.some((e: any) => e.code === 'file-invalid-type')) {
        showToast.error('文件格式不支持，请上传 JPG 或 PNG 格式的图片');
      } else {
        showToast.error('文件上传失败，请重试');
      }
      return;
    }

    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    
    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 20;
        });
      }, 100);

      // Create preview URL
      if (preview && file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setUploadProgress(100);
      clearInterval(progressInterval);
      
      onFileSelect(file);
      showToast.success('文件上传成功');
      
    } catch (error) {
      showToast.error('文件上传失败，请重试');
      setPreviewUrl(null);
      onFileSelect(null);
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  }, [onFileSelect, maxSize, preview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.split(',').reduce((acc, type) => {
      acc[type.trim()] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize,
    multiple: false,
    disabled: disabled || isUploading
  });

  const removeFile = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onFileSelect(null);
  };

  const hasFile = previewUrl || value;

  return (
    <div className={`w-full ${className}`}>
      {!hasFile ? (
        <div
          {...getRootProps()}
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200
            ${isDragActive 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${isUploading ? 'pointer-events-none' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center space-y-3">
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${isDragActive ? 'bg-primary-100' : 'bg-gray-100'}
            `}>
              <Upload className={`w-6 h-6 ${isDragActive ? 'text-primary-600' : 'text-gray-500'}`} />
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-900">
                {isDragActive ? '释放文件以上传' : '点击上传或拖拽文件到此处'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                支持 JPG、PNG 格式，最大 {Math.round(maxSize / 1024 / 1024)}MB
              </p>
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center rounded-lg">
              <div className="w-16 h-16 mb-3">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - uploadProgress / 100)}`}
                    className="text-primary-500 transition-all duration-300"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900">
                上传中... {Math.round(uploadProgress)}%
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          {/* Preview */}
          {preview && previewUrl && (
            <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-48 object-cover"
              />
              
              {/* Remove button */}
              <button
                onClick={removeFile}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                disabled={isUploading}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Success indicator */}
              <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                <CheckCircle className="w-3 h-3" />
                <span>已上传</span>
              </div>
            </div>
          )}

          {/* File info for non-image files */}
          {!preview && (
            <div className="border-2 border-gray-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Image className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {value instanceof File ? value.name : '已选择文件'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {value instanceof File ? `${(value.size / 1024 / 1024).toFixed(2)} MB` : ''}
                  </p>
                </div>
              </div>
              
              <button
                onClick={removeFile}
                className="text-red-500 hover:text-red-700 transition-colors"
                disabled={isUploading}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};