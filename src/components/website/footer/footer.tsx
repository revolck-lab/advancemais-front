import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} AdvanceMais. Todos os direitos
          reservados.
        </p>
        <nav className="flex justify-center space-x-4 mt-2">
          <Link href="/privacy" className="hover:underline">
            Política de Privacidade
          </Link>
          <Link href="/terms" className="hover:underline">
            Termos de Uso
          </Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
