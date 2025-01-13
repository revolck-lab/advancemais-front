'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const blogPosts = [
  {
    id: 1,
    image: '/images/blog/blog-post-1.png',
    title: '25 Perguntas da Entrevista de Emprego e Suas Melhores Respostas',
    link: '#',
  },
  {
    id: 2,
    image: '/images/blog/blog-post-2.png',
    title: '15 Habilidades e Competências que Valorizam o Currículo',
    link: '#',
  },
  {
    id: 3,
    image: '/images/blog/blog-post-3.png',
    title:
      'Resumo Profissional: Dicas e Modelos para Destacar Seus Diferenciais',
    link: '#',
  },
  {
    id: 4,
    image: '/images/blog/blog-post-4.png',
    title: 'Como Fazer um Currículo Incrível',
    link: '#',
  },
]

const Blog: React.FC = (): JSX.Element => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize() // Executa no carregamento inicial
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const displayedPosts = isMobile ? blogPosts.slice(0, 2) : blogPosts // Exibe 2 posts no mobile

  return (
    <section className="container mx-auto py-16 flex-col lg:flex-row px-4 items-center gap-8 lg:px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl text-center font-bold text-neutral-800 lg:text-left">
          Dicas para crescer profissionalmente
        </h2>
        {!isMobile && (
          <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-500 transition flex items-center">
            Ver mais dicas <span className="ml-2">→</span>
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayedPosts.map((post) => (
          <a
            key={post.id}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-300 shadow-lg rounded-lg overflow-hidden relative"
          >
            <Image
              src={post.image}
              alt={post.title}
              width={280}
              height={360}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white p-4 h-[130px] justify-center items-center w-11/12 mx-auto mb-5">
              <h3 className="text-neutral font-medium px-4 py-2 text-lg">
                {post.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
      {isMobile && (
        <div className="mt-4 flex justify-center">
          <button className="bg-red-600 text-white px-6 py-3 mt-5 rounded-md hover:bg-red-500 transition flex items-center">
            Ver mais dicas <span className="ml-2">→</span>
          </button>
        </div>
      )}
    </section>
  )
}

export default Blog
