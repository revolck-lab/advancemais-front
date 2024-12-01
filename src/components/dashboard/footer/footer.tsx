export default function Footer() {
  return (
    <footer className="bg-white shadow-lg dark:bg-dark py-4 text-center">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Advance+ © {new Date().getFullYear()}
      </p>
    </footer>
  )
}
