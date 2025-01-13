// 'use client'

// import React, { useState } from 'react'
// import {
//   Tabs,
//   Tab,
//   Input,
//   Button,
//   Select,
//   SelectItem,
//   DatePicker,
// } from '@nextui-org/react'
// import Image from 'next/image'
// import Logo from '/public/images/logo_branco.webp'
// import InputMask from 'react-input-mask'

// const RegisterPage: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<'aluno' | 'empresa'>('aluno')
//   const [showPassword, setShowPassword] = useState(false)
//   const [studentData, setStudentData] = useState({
//     nome: '',
//     cpf: '',
//     sexo: '',
//     nascimento: null as Date | null,
//     celular: '',
//     telefone: '',
//     escolaridade: '',
//     email: '',
//     senha: '',
//     confirmarSenha: '',
//     endereco: '',
//     bairro: '',
//     complemento: '',
//     cidade: '',
//     estado: '',
//     cep: '',
//     pais: '',
//   })

//   const [companyData, setCompanyData] = useState({
//     nomeResponsavel: '',
//     razaoSocial: '',
//     nomeFantasia: '',
//     cnpj: '',
//     telefoneFixo: '',
//     linkSite: '',
//     email: '',
//     senha: '',
//     confirmarSenha: '',
//     endereco: '',
//     bairro: '',
//     complemento: '',
//     cidade: '',
//     estado: '',
//     cep: '',
//     pais: '',
//   })

//   const handleStudentChange = (
//     field: keyof typeof studentData,
//     value: string | Date | null
//   ) => {
//     setStudentData({ ...studentData, [field]: value })
//   }

//   const handleCompanyChange = (
//     field: keyof typeof companyData,
//     value: string
//   ) => {
//     setCompanyData({ ...companyData, [field]: value })
//   }

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   const handleSubmit = () => {
//     if (activeTab === 'aluno') {
//       console.log('Aluno Data:', studentData)
//     } else {
//       console.log('Empresa Data:', companyData)
//     }
//   }

//   const estados = [
//     { key: 'SP', label: 'São Paulo' },
//     { key: 'RJ', label: 'Rio de Janeiro' },
//     { key: 'MG', label: 'Minas Gerais' },
//   ]

//   const escolaridades = [
//     { key: 'fundamental', label: 'Ensino Fundamental' },
//     { key: 'medio', label: 'Ensino Médio' },
//     { key: 'tecnico', label: 'Ensino Técnico' },
//     { key: 'graduacao', label: 'Graduação' },
//     { key: 'pos', label: 'Pós-Graduação' },
//     { key: 'mestrado', label: 'Mestrado' },
//     { key: 'doutorado', label: 'Doutorado' },
//   ]

//   const sexos = [
//     { key: 'masculino', label: 'Masculino' },
//     { key: 'feminino', label: 'Feminino' },
//     { key: 'outro', label: 'Outro' },
//   ]

//   return (
//     <div className="p-6 bg-gradient-to-b from-blue-900 to-gray-900 min-h-screen">
//       <div className="flex justify-center mb-8">
//         <Image src={Logo} alt="Logo Advance+" width={150} height={50} />
//       </div>
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
//         <Tabs
//           selectedValue={activeTab}
//           onChange={(value) => setActiveTab(value as 'aluno' | 'empresa')}
//         >
//           <Tab value="aluno" title="Aluno">
//             <h3 className="mb-4 text-lg font-semibold">Dados Pessoais</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 label="Nome Completo"
//                 value={studentData.nome}
//                 onChange={(e) => handleStudentChange('nome', e.target.value)}
//                 fullWidth
//               />
//               <InputMask
//                 mask="999.999.999-99"
//                 value={studentData.cpf}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   handleStudentChange('cpf', e.target.value)
//                 }
//               >
//                 {(inputProps) => (
//                   <Input {...inputProps} label="CPF" fullWidth />
//                 )}
//               </InputMask>

//               <Select
//                 label="Sexo"
//                 value={studentData.sexo}
//                 onChange={(value) => handleStudentChange('sexo', value)}
//               >
//                 {sexos.map((sexo) => (
//                   <SelectItem key={sexo.key} value={sexo.key}>
//                     {sexo.label}
//                   </SelectItem>
//                 ))}
//               </Select>
//               <DatePicker
//                 label="Data de Nascimento"
//                 selected={studentData.nascimento}
//                 onChange={(date) => handleStudentChange('nascimento', date)}
//               />
//               <InputMask
//                 mask="(99) 99999-9999"
//                 value={studentData.celular}
//                 onChange={(e) => handleStudentChange('celular', e.target.value)}
//               >
//                 {(inputProps: any) => (
//                   <Input {...inputProps} label="Celular" fullWidth />
//                 )}
//               </InputMask>
//               <InputMask
//                 mask="(99) 9999-9999"
//                 value={studentData.telefone}
//                 onChange={(e) =>
//                   handleStudentChange('telefone', e.target.value)
//                 }
//               >
//                 {(inputProps: any) => (
//                   <Input {...inputProps} label="Telefone" fullWidth />
//                 )}
//               </InputMask>
//               <Select
//                 label="Escolaridade"
//                 value={studentData.escolaridade}
//                 onChange={(value) => handleStudentChange('escolaridade', value)}
//               >
//                 {escolaridades.map((item) => (
//                   <SelectItem key={item.key} value={item.key}>
//                     {item.label}
//                   </SelectItem>
//                 ))}
//               </Select>
//               <Input
//                 label="Email"
//                 value={studentData.email}
//                 onChange={(e) => handleStudentChange('email', e.target.value)}
//                 fullWidth
//               />
//               <Input
//                 label="Senha"
//                 type={showPassword ? 'text' : 'password'}
//                 value={studentData.senha}
//                 onChange={(e) => handleStudentChange('senha', e.target.value)}
//                 fullWidth
//                 endContent={
//                   <Button
//                     isIconOnly
//                     variant="light"
//                     onClick={togglePasswordVisibility}
//                   >
//                     {showPassword ? '🙈' : '👁️'}
//                   </Button>
//                 }
//               />
//               <Input
//                 label="Repetir Senha"
//                 type={showPassword ? 'text' : 'password'}
//                 value={studentData.confirmarSenha}
//                 onChange={(e) =>
//                   handleStudentChange('confirmarSenha', e.target.value)
//                 }
//                 fullWidth
//                 endContent={
//                   <Button
//                     isIconOnly
//                     variant="light"
//                     onClick={togglePasswordVisibility}
//                   >
//                     {showPassword ? '🙈' : '👁️'}
//                   </Button>
//                 }
//               />
//             </div>
//             <h3 className="my-4 text-lg font-semibold">Dados de Endereço</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 label="Endereço"
//                 value={studentData.endereco}
//                 onChange={(e) =>
//                   handleStudentChange('endereco', e.target.value)
//                 }
//                 fullWidth
//               />
//               <Input
//                 label="Bairro"
//                 value={studentData.bairro}
//                 onChange={(e) => handleStudentChange('bairro', e.target.value)}
//                 fullWidth
//               />
//               <Input
//                 label="Complemento"
//                 value={studentData.complemento}
//                 onChange={(e) =>
//                   handleStudentChange('complemento', e.target.value)
//                 }
//                 fullWidth
//               />
//               <Input
//                 label="Cidade"
//                 value={studentData.cidade}
//                 onChange={(e) => handleStudentChange('cidade', e.target.value)}
//                 fullWidth
//               />
//               <Select
//                 label="Estado"
//                 value={studentData.estado}
//                 onChange={(value) => handleStudentChange('estado', value)}
//               >
//                 {estados.map((item) => (
//                   <SelectItem key={item.key} value={item.key}>
//                     {item.label}
//                   </SelectItem>
//                 ))}
//               </Select>
//               <Input
//                 label="CEP"
//                 value={studentData.cep}
//                 onChange={(e) => handleStudentChange('cep', e.target.value)}
//                 fullWidth
//               />
//               <Input
//                 label="País"
//                 value={studentData.pais}
//                 onChange={(e) => handleStudentChange('pais', e.target.value)}
//                 fullWidth
//               />
//             </div>
//             <Button
//               onClick={handleSubmit}
//               color="primary"
//               fullWidth
//               className="mt-4"
//             >
//               Cadastrar Aluno
//             </Button>
//           </Tab>

//           <Tab value="empresa" title="Empresa">
//             <h3 className="mb-4 text-lg font-semibold">Dados da Empresa</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 label="Nome Responsável"
//                 value={companyData.nomeResponsavel}
//                 onChange={(e) =>
//                   handleCompanyChange('nomeResponsavel', e.target.value)
//                 }
//                 fullWidth
//               />
//               <Input
//                 label="Razão Social"
//                 value={companyData.razaoSocial}
//                 onChange={(e) =>
//                   handleCompanyChange('razaoSocial', e.target.value)
//                 }
//                 fullWidth
//               />
//               <Input
//                 label="Nome Fantasia"
//                 value={companyData.nomeFantasia}
//                 onChange={(e) =>
//                   handleCompanyChange('nomeFantasia', e.target.value)
//                 }
//                 fullWidth
//               />
//               <InputMask
//                 mask="99.999.999/9999-99"
//                 value={companyData.cnpj}
//                 onChange={(e) => handleCompanyChange('cnpj', e.target.value)}
//               >
//                 {(inputProps: any) => (
//                   <Input {...inputProps} label="CNPJ" fullWidth />
//                 )}
//               </InputMask>
//               <InputMask
//                 mask="(99) 9999-9999"
//                 value={companyData.telefoneFixo}
//                 onChange={(e) =>
//                   handleCompanyChange('telefoneFixo', e.target.value)
//                 }
//               >
//                 {(inputProps: any) => (
//                   <Input {...inputProps} label="Telefone Fixo" fullWidth />
//                 )}
//               </InputMask>
//               <Input
//                 label="Link do Site"
//                 value={companyData.linkSite}
//                 onChange={(e) =>
//                   handleCompanyChange('linkSite', e.target.value)
//                 }
//                 fullWidth
//               />
//               <Input
//                 label="Email"
//                 value={companyData.email}
//                 onChange={(e) => handleCompanyChange('email', e.target.value)}
//                 fullWidth
//               />
//               <Input
//                 label="Senha"
//                 type={showPassword ? 'text' : 'password'}
//                 value={companyData.senha}
//                 onChange={(e) => handleCompanyChange('senha', e.target.value)}
//                 fullWidth
//                 endContent={
//                   <Button
//                     isIconOnly
//                     variant="light"
//                     onClick={togglePasswordVisibility}
//                   >
//                     {showPassword ? '🙈' : '👁️'}
//                   </Button>
//                 }
//               />
//               <Input
//                 label="Repetir Senha"
//                 type={showPassword ? 'text' : 'password'}
//                 value={companyData.confirmarSenha}
//                 onChange={(e) =>
//                   handleCompanyChange('confirmarSenha', e.target.value)
//                 }
//                 fullWidth
//                 endContent={
//                   <Button
//                     isIconOnly
//                     variant="light"
//                     onClick={togglePasswordVisibility}
//                   >
//                     {showPassword ? '🙈' : '👁️'}
//                   </Button>
//                 }
//               />
//             </div>
//             <h3 className="my-4 text-lg font-semibold">Dados de Endereço</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 label="Endereço"
//                 value={companyData.endereco}
//                 onChange={(e) =>
//                   handleCompanyChange('endereco', e.target.value)
//                 }
//                 fullWidth
//               />
//               <Input
//                 label="Bairro"
//                 value={companyData.bairro}
//                 onChange={(e) => handleCompanyChange('bairro', e.target.value)}
//                 fullWidth
//               />
//               <Input
//                 label="Complemento"
//                 value={companyData.complemento}
//                 onChange={(e) =>
//                   handleCompanyChange('complemento', e.target.value)
//                 }
//                 fullWidth
//               />
//               <Input
//                 label="Cidade"
//                 value={companyData.cidade}
//                 onChange={(e) => handleCompanyChange('cidade', e.target.value)}
//                 fullWidth
//               />
//               <Select
//                 label="Estado"
//                 value={companyData.estado}
//                 onChange={(value) => handleCompanyChange('estado', value)}
//               >
//                 {estados.map((item) => (
//                   <SelectItem key={item.key} value={item.key}>
//                     {item.label}
//                   </SelectItem>
//                 ))}
//               </Select>
//               <Input
//                 label="CEP"
//                 value={companyData.cep}
//                 onChange={(e) => handleCompanyChange('cep', e.target.value)}
//                 fullWidth
//               />
//               <Input
//                 label="País"
//                 value={companyData.pais}
//                 onChange={(e) => handleCompanyChange('pais', e.target.value)}
//                 fullWidth
//               />
//             </div>
//             <Button
//               onClick={handleSubmit}
//               color="primary"
//               fullWidth
//               className="mt-4"
//             >
//               Cadastrar Empresa
//             </Button>
//           </Tab>
//         </Tabs>
//       </div>
//     </div>
//   )
// }

// export default RegisterPage
