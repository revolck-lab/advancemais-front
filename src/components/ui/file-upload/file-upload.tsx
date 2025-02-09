// src/components/ui/file-upload/file-upload.tsx
'use client'

import * as React from 'react'
import { useDropzone, FileWithPath, FileRejection } from 'react-dropzone'
import { Button } from '@/components/ui/button/button'
import { cn } from '@/lib/utils'
import { Upload, File, Trash2 } from 'lucide-react'

const formatFileSize = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  if (bytes === 0) return '0 MB'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`
}

export interface FileUploadProps {
  maxFiles?: number
  maxSize?: number
  allowedFormats?: string[]
  onUpload: (files: File[]) => void
  onError?: (error: string) => void
  onRemove?: () => void
  multiple?: boolean
  defaultFiles?: FileWithPath[]
}

export function FileUpload({
  maxFiles = 1,
  maxSize = 10 * 1024 * 1024,
  onUpload,
  onError,
  onRemove,
  multiple = false,
  defaultFiles = [],
}: FileUploadProps) {
  const [files, setFiles] = React.useState<FileWithPath[]>(defaultFiles)
  const [error, setError] = React.useState<string | null>(null)

  const showDropzone = maxFiles === 0 || files.length < maxFiles

  const onDrop = (
    acceptedFiles: FileWithPath[],
    rejectedFiles: FileRejection[]
  ) => {
    if (rejectedFiles.length > 0) {
      const errorMessage =
        rejectedFiles[0].errors[0].code === 'file-invalid-type'
          ? 'Apenas arquivos JPG, PNG ou WEBP são permitidos'
          : `Arquivo muito grande (máximo ${formatFileSize(maxSize)})`

      setError(errorMessage)
      onError?.(errorMessage)
      return
    }

    const validFiles = [...files, ...acceptedFiles].slice(0, maxFiles)
    setFiles(validFiles)
    setError(null)
    onUpload(validFiles)
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onUpload(newFiles)
    if (newFiles.length === 0) onRemove?.()
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    multiple: multiple || maxFiles > 1,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    disabled: !showDropzone,
  })

  return (
    <div className="space-y-4">
      {files.length > 0 ? (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={file.path || file.name}
              className="flex items-center justify-between p-3 border rounded-lg bg-white"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded">
                  <File className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex flex-col gap-0 leading-none">
                  <p className="font-medium text-sm m-0">{file.name}</p>
                  <p className="text-xs text-gray-500 m-0 mt-0.5">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 p-2"
                onClick={() => removeFile(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        showDropzone && (
          <div
            {...getRootProps()}
            className={cn(
              'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors bg-gray-50',
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
              error && 'border-red-500 bg-red-50'
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-3">
              <Upload className="w-6 h-6 text-gray-400" />
              <div className="space-y-1">
                <p className="font-medium text-gray-900 text-sm">
                  Arraste e solte ou clique para selecionar
                </p>
                <p className="text-xs text-gray-500">
                  Formatos aceitos: JPG, PNG, WEBP
                </p>
                <p className="text-xs text-gray-500">
                  Tamanho máximo: {formatFileSize(maxSize)}
                </p>
              </div>
            </div>
          </div>
        )
      )}

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </div>
  )
}
