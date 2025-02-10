import React from 'react'
import { Editor } from '@tinymce/tinymce-react'

interface TextareaDashboardProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  id?: string
  disabled?: boolean
}

export const TextareaDashboard: React.FC<TextareaDashboardProps> = ({
  value,
  onChange,
  id,
  placeholder = 'Escreva aqui...',
  disabled = false,
}) => {
  return (
    <div className="border rounded-md shadow-sm bg-white">
      {/* TinyMCE Editor */}
      <Editor
        id={id}
        apiKey="qp8r5m6er7s4fpckkcmt2hbbmi7jftb1i0q19y4xwds2g8vs"
        value={value}
        onEditorChange={(newValue) => onChange(newValue)}
        init={{
          height: 340, // Altura fixa
          menubar: false, // Remove menubar
          resize: false, // Bloqueia o redimensionamento
          statusbar: false, // Remove barra de status do TinyMCE
          branding: false, // Remove marca d'água do TinyMCE
          plugins: [
            'autolink',
            'charmap',
            'codesample',
            'link',
            'lists',
            'media',
            'searchreplace',
            'wordcount',
            'advcode',
            'footnotes',
            'typography',
            'importword',
            'exportword',
            'exportpdf',
          ],
          toolbar:
            'undo redo | bold italic underline strikethrough | link | checklist numlist bullist | removeformat',
          placeholder,
          content_style: `
            body {
              font-family: Arial, sans-serif;
              font-size: 14px;
              height: 100%;
              overflow: hidden; /* Impede rolagem desnecessária */
            }
            .tox-editor-container {
              resize: none !important; /* Bloqueia redimensionamento */
            }
          `,
        }}
        disabled={disabled}
      />
    </div>
  )
}
