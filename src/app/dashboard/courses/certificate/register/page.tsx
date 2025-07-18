'use client'

import React, { useState } from 'react'

// Função auxiliar para fazer o download do arquivo
function download(filename: string, text: string) {
  const element = document.createElement('a')
  const file = new Blob([text], { type: 'text/html' })
  element.href = URL.createObjectURL(file)
  element.download = filename
  document.body.appendChild(element)
  element.click()
}

export default function CertificateRegisterPage() {
  const [studentName, setStudentName] = useState('')
  const [courseName, setCourseName] = useState('')
  const [hours, setHours] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [content, setContent] = useState('')

  async function handleGenerateCertificate() {
    // Carrega o template que você deixou na pasta public
    const response = await fetch('/certificados/modelo.html')
    const template = await response.text()

    // Substitui as variáveis no template
    const finalHtml = template
      .replace('{{nome}}', studentName)
      .replace('{{nome_curso}}', courseName)
      .replace('{{horas}}', hours)
      .replace('{{datainicio}}', startDate)
      .replace('{{datafim}}', endDate)
      .replace('{{conteudo_programatico}}', content)

    // Faz o download do HTML gerado
    download(`certificado-${studentName}.html`, finalHtml)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gerador de Certificado</h1>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label>Nome do Aluno:</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="border w-full p-2"
          />
        </div>

        <div>
          <label>Nome do Curso:</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="border w-full p-2"
          />
        </div>

        <div>
          <label>Carga Horária:</label>
          <input
            type="text"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="border w-full p-2"
          />
        </div>

        <div>
          <label>Data de Início:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border w-full p-2"
          />
        </div>

        <div>
          <label>Data de Fim:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border w-full p-2"
          />
        </div>
      </div>

      <div className="mb-4">
        <label>Conteúdo Programático:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="border w-full p-2"
        ></textarea>
      </div>

      <button
        onClick={handleGenerateCertificate}
        className="bg-blue-600 text-white p-3 rounded"
      >
        Gerar Certificado
      </button>
    </div>
  )
}
