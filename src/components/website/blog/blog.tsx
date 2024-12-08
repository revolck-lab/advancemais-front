import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button/button'

const blogPosts = [
  {
    id: 1,
    image: 'https://via.placeholder.com/280x360.png?text=Post+1',
    title: '25 Perguntas da Entrevista de Emprego e Suas Melhores Respostas',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/280x360.png?text=Post+2',
    title: '15 Habilidades e Competências que Valorizam o Currículo',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/280x360.png?text=Post+3',
    title:
      'Resumo Profissional: Dicas e Modelos para Destacar Seus Diferenciais',
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/280x360.png?text=Post+4',
    title: 'Como Fazer um Currículo Incrível',
  },
]

const Blog: React.FC = (): JSX.Element => {
  return (
    <section className="container mx-auto py-16 flex-col lg:flex-row items-center">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-neutral-800">
          Dicas para crescer profissionalmente
        </h2>
        <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-500 transition flex items-center">
          Ver mais dicas <span className="ml-2">→</span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-300 shadow-lg rounded-lg overflow-hidden relative"
          >
            <Image
              src={post.image}
              alt={post.title}
              width={280}
              height={360}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white p-4 h-[120px] w-11/12 mx-auto mb-4">
              <h3 className="text-default text-lg font-medium px-4 py-2">
                {post.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button
          variant="link"
          size="default"
          className="text-red-600 hover:text-red-800"
        >
          Ver mais dicas →
        </Button>
      </div>
    </section>
  )
}

export default Blog
