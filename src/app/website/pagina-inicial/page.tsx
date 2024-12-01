export const metadata = {
  title: 'Página Inicial | AdvanceMais',
  description: 'Bem-vindo à página inicial da AdvanceMais!',
}

export default function PaginaInicial() {
  return (
    <section className="container mx-auto py-12 px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo à AdvanceMais</h1>
      <p className="text-lg mb-8">
        Explore cursos, serviços e muito mais com a AdvanceMais.
      </p>
      <div className="flex justify-center space-x-4">
        <a
          href="#"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition"
        >
          Conheça os Cursos
        </a>
        <a
          href="#"
          className="border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition"
        >
          Saiba Mais
        </a>
      </div>
    </section>
  )
}
