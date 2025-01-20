'use client'

import React, { useState } from 'react'
import { Input, Textarea, Button } from '@nextui-org/react'
import Styles from './formSelection.module.css'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const FormSelection: React.FC = () => {
  const [cep, setCep] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [fieldsDisabled, setFieldsDisabled] = useState(true)

  // Lógica de formatação e busca de CEP
  const handleCepChange = async (value: string) => {
    const formattedCep = value
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/^(\d{5})(\d{1,3})$/, '$1-$2') // Adiciona o hífen no formato '12345-678'
      .slice(0, 9) // Garante o tamanho máximo de 9 caracteres

    setCep(formattedCep)

    if (formattedCep.length === 9) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${formattedCep.replace('-', '')}/json/`
        )
        const data = await response.json()

        if (!data.erro) {
          setAddress(data.logradouro || '')
          setCity(data.localidade || '')
          setState(data.uf || '')
          setFieldsDisabled(false)
        } else {
          alert('CEP não encontrado')
        }
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error)
      }
    }
  }

  return (
    <section className="container mx-auto py-16 flex flex-col lg:flex-row items-center gap-8">
      <div className="w-full flex flex-col lg:flex-row justify-between items-center">
        {/* Imagem no lado esquerdo */}
        <div className="lg:w-1/2 flex justify-center">
          <Image
            src="/images/sobre/banner_about.webp"
            alt="Contato"
            className="rounded-lg"
            width={600}
            height={400}
          />
        </div>

        {/* Formulário no lado direito */}
        <div className="lg:w-1/2 bg-gray-50 rounded-lg p-8">
          {/* Título */}
          <h2 className="text-2xl font-bold text-center mb-2">
            FAÇA SEU ORÇAMENTO
          </h2>
          <hr className="border-t-2 border-black w-12 mx-auto mb-6" />

          <form className="space-y-6">
            {/* Linhas dos inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                className={Styles.input}
                label="Seu Nome"
                radius="sm"
                type="text"
              />
              <Input
                className={Styles.input}
                label="Nome da Empresa"
                radius="sm"
                type="text"
              />
              <Input
                className={Styles.input}
                label="Email"
                radius="sm"
                type="email"
              />
              <Input
                className={Styles.input}
                label="Telefone"
                radius="sm"
                type="tel"
              />
              {/* Campo de CEP com lógica de máscara integrada */}
              <Input
                className={`${Styles.input} w-full`}
                label="CEP"
                radius="sm"
                value={cep}
                onChange={(e) => handleCepChange(e.target.value)}
                placeholder="CEP"
              />

              <Input
                className={Styles.input}
                label="Endereço"
                radius="sm"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={fieldsDisabled}
              />
              <Input
                className={Styles.input}
                label="Cidade"
                radius="sm"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={fieldsDisabled}
              />
              <Input
                className={Styles.input}
                label="Estado"
                radius="sm"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                disabled={fieldsDisabled}
              />
            </div>

            {/* Textarea */}
            <Textarea
              className={Styles.textarea}
              label="Tem algo mais para informar?"
              radius="sm"
              rows={4}
            />

            {/* Botão */}
            <Button
              size="md"
              className="w-3/6 justify-self-center bg-secondary text-white text-lg font-bold py-6 rounded-full flex items-center gap-2"
            >
              ENVIAR <ArrowRight />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default FormSelection
