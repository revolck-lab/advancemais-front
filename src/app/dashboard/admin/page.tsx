'use client'

import React, { useState } from 'react'
import { Tabs, Tab, Input, Button, Textarea } from '@nextui-org/react'

const AdminDashboard: React.FC = () => {
  const [headerBanners, setHeaderBanners] = useState([
    {
      id: 1,
      image: 'https://via.placeholder.com/1920x500.png?text=Slide+1',
      title: 'Slide 1',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/1920x500.png?text=Slide+2',
      title: 'Slide 2',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/1920x500.png?text=Slide+3',
      title: 'Slide 3',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/1920x500.png?text=Slide+4',
      title: 'Slide 4',
    },
  ])

  const [aboutSection, setAboutSection] = useState({
    image: 'https://via.placeholder.com/800x400.png',
    title: 'Acelere o crescimento do seu negócio',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  })

  const [banners, setBanners] = useState([
    'https://via.placeholder.com/300x200.png?text=Banner+1',
    'https://via.placeholder.com/300x200.png?text=Banner+2',
    'https://via.placeholder.com/300x200.png?text=Banner+3',
    'https://via.placeholder.com/300x200.png?text=Banner+4',
    'https://via.placeholder.com/300x200.png?text=Banner+5',
  ])

  const [consultingSection, setConsultingSection] = useState({
    banner: 'https://via.placeholder.com/800x400.png',
    title: 'Conheça nosso serviço de Consultoria Empresarial',
    description:
      'O segredo para uma empresa de sucesso está em decisões estratégicas bem fundamentadas. A Advance+ oferece consultoria personalizada para auxiliar no crescimento sustentável e inovação do seu negócio.',
    buttonText: 'Saiba mais',
    buttonUrl: '#',
  })

  const [servicesSection, setServicesSection] = useState({
    banner: 'https://via.placeholder.com/800x400.png',
    title: 'Conheça nosso serviço de Recrutamento & Seleção',
    description:
      'O segredo para uma empresa de sucesso está em decisões estratégicas bem fundamentadas. A Advance+ oferece consultoria personalizada para auxiliar no crescimento sustentável e inovação do seu negócio.',
    buttonText: 'Saiba mais',
    buttonUrl: '#',
  })

  const [logos, setLogos] = useState([
    'https://via.placeholder.com/100x100.png?text=Logo+1',
    'https://via.placeholder.com/100x100.png?text=Logo+2',
    'https://via.placeholder.com/100x100.png?text=Logo+3',
    'https://via.placeholder.com/100x100.png?text=Logo+4',
    'https://via.placeholder.com/100x100.png?text=Logo+5',
  ])

  const handleHeaderChange = (
    index: number,
    value: string,
    field: 'image' | 'title'
  ) => {
    const updatedBanners = [...headerBanners]
    updatedBanners[index][field] = value
    setHeaderBanners(updatedBanners)
  }

  const handleBannerChange = (index: number, value: string) => {
    const updatedBanners = [...banners]
    updatedBanners[index] = value
    setBanners(updatedBanners)
  }

  return (
    <div className="p-6">
      <Tabs>
        <Tab title="Header">
          <h3 className="mb-4">Header - URLs de 4 banners</h3>
          {headerBanners.map((banner, index) => (
            <div key={index} className="mb-4">
              <Input
                label={`Banner ${index + 1} URL da Imagem`}
                placeholder="Digite a URL do banner"
                value={banner.image}
                onChange={(e) =>
                  handleHeaderChange(index, e.target.value, 'image')
                }
                fullWidth
                className="mb-2 border border-gray-300 rounded-md"
              />
              <Input
                label={`Banner ${index + 1} Título`}
                placeholder="Digite o título do banner"
                value={banner.title}
                onChange={(e) =>
                  handleHeaderChange(index, e.target.value, 'title')
                }
                fullWidth
                className="border border-gray-300 rounded-md"
              />
            </div>
          ))}
          <Button
            color="primary"
            onClick={() => alert('Banners salvos com sucesso!')}
          >
            Salvar
          </Button>
        </Tab>

        <Tab title="Sobre">
          <h3 className="mb-4">Sobre - Imagem, Título e Descrição</h3>
          <Input
            label="Imagem URL"
            placeholder="Digite a URL da imagem"
            value={aboutSection.image}
            onChange={(e) =>
              setAboutSection({ ...aboutSection, image: e.target.value })
            }
            fullWidth
            className="mb-4 border border-gray-300 rounded-md"
          />
          <Input
            label="Título"
            placeholder="Digite o título"
            value={aboutSection.title}
            onChange={(e) =>
              setAboutSection({ ...aboutSection, title: e.target.value })
            }
            fullWidth
            className="mb-4 border border-gray-300 rounded-md"
          />
          <Textarea
            label="Descrição"
            placeholder="Digite a descrição"
            value={aboutSection.description}
            onChange={(e) =>
              setAboutSection({ ...aboutSection, description: e.target.value })
            }
            fullWidth
            className="border border-gray-300 rounded-md"
          />
          <Button
            color="primary"
            onClick={() => alert('Seção Sobre salva com sucesso!')}
          >
            Salvar
          </Button>
        </Tab>

        <Tab title="Banners">
          <h3 className="mb-4">Banners - 5 inputs</h3>
          {banners.map((banner, index) => (
            <div key={index} className="mb-4">
              <Input
                label={`Banner ${index + 1} URL`}
                placeholder="Digite a URL do banner"
                value={banner}
                onChange={(e) => handleBannerChange(index, e.target.value)}
                fullWidth
                className="border border-gray-300 rounded-md"
              />
            </div>
          ))}
          <Button
            color="primary"
            onClick={() => alert('Banners salvos com sucesso!')}
          >
            Salvar
          </Button>
        </Tab>

        <Tab title="Consultoria Empresarial">
          <h3 className="mb-4">Consultoria Empresarial</h3>
          <Input
            label="Banner URL"
            placeholder="Digite a URL do banner"
            value={consultingSection.banner}
            onChange={(e) =>
              setConsultingSection({
                ...consultingSection,
                banner: e.target.value,
              })
            }
            fullWidth
            className="mb-4 border border-gray-300 rounded-md"
          />
          <Input
            label="Título"
            placeholder="Digite o título"
            value={consultingSection.title}
            onChange={(e) =>
              setConsultingSection({
                ...consultingSection,
                title: e.target.value,
              })
            }
            fullWidth
            className="mb-4 border border-gray-300 rounded-md"
          />
          <Textarea
            label="Descrição"
            placeholder="Digite a descrição"
            value={consultingSection.description}
            onChange={(e) =>
              setConsultingSection({
                ...consultingSection,
                description: e.target.value,
              })
            }
            fullWidth
            className="mb-4 border border-gray-300 rounded-md"
          />
          <Input
            label="Texto do Botão"
            placeholder="Digite o texto do botão"
            value={consultingSection.buttonText}
            onChange={(e) =>
              setConsultingSection({
                ...consultingSection,
                buttonText: e.target.value,
              })
            }
            fullWidth
            className="mb-4 border border-gray-300 rounded-md"
          />
          <Input
            label="URL do Botão"
            placeholder="Digite a URL do botão"
            value={consultingSection.buttonUrl}
            onChange={(e) =>
              setConsultingSection({
                ...consultingSection,
                buttonUrl: e.target.value,
              })
            }
            fullWidth
            className="border border-gray-300 rounded-md"
          />
          <Button
            color="primary"
            onClick={() => alert('Consultoria Empresarial salva com sucesso!')}
          >
            Salvar
          </Button>
        </Tab>

        <Tab title="Conheça Nossos Serviços">
          <h3 className="mb-4">Conheça Nossos Serviços</h3>
          <Input
            label="Banner URL"
            placeholder="Digite a URL do banner"
            value={servicesSection.banner}
            onChange={(e) =>
              setServicesSection({ ...servicesSection, banner: e.target.value })
            }
            fullWidth
            className="mb-4 border border-gray-300 rounded-md"
          />
          <Input
            label="Título"
            placeholder="Digite o título"
            value={servicesSection.title}
            onChange={(e) =>
              setServicesSection({ ...servicesSection, title: e.target.value })
            }
            fullWidth
            className="mb-4 border border-gray-300 rounded-md"
          />
          <Textarea
            label="Descrição"
            placeholder="Digite a descrição"
            value={servicesSection.description}
            onChange={(e) =>
              setServicesSection({
                ...servicesSection,
                description: e.target.value,
              })
            }
            fullWidth
            className="mb-4 border border-gray-300 rounded-md"
          />
          <Input
            label="Texto do Botão"
            placeholder="Digite o texto do botão"
            value={servicesSection.buttonText}
            onChange={(e) =>
              setServicesSection({
                ...servicesSection,
                buttonText: e.target.value,
              })
            }
            fullWidth
            className="mb-4 border border-gray-300 rounded-md"
          />
          <Input
            label="URL do Botão"
            placeholder="Digite a URL do botão"
            value={servicesSection.buttonUrl}
            onChange={(e) =>
              setServicesSection({
                ...servicesSection,
                buttonUrl: e.target.value,
              })
            }
            fullWidth
            className="border border-gray-300 rounded-md"
          />
          <Button
            color="primary"
            onClick={() => alert('Seção de Serviços salva com sucesso!')}
          >
            Salvar
          </Button>
        </Tab>

        <Tab title="Logos para Empresas">
          <h3 className="mb-4">Logos para Empresas</h3>
          {logos.map((logo, index) => (
            <div key={index} className="mb-4">
              <Input
                label={`Logo ${index + 1} URL`}
                placeholder="Digite a URL da logo"
                value={logo}
                onChange={(e) => {
                  const updatedLogos = [...logos]
                  updatedLogos[index] = e.target.value
                  setLogos(updatedLogos)
                }}
                fullWidth
                className="border border-gray-300 rounded-md"
              />
            </div>
          ))}
          <Button
            color="primary"
            onClick={() =>
              setLogos([
                ...logos,
                'https://via.placeholder.com/100x100.png?text=Nova+Logo',
              ])
            }
            className="mt-4"
          >
            Adicionar Nova Logo
          </Button>
          <Button
            color="primary"
            onClick={() => alert('Logos salvas com sucesso!')}
          >
            Salvar
          </Button>
        </Tab>
      </Tabs>
    </div>
  )
}

export default AdminDashboard
