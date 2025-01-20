import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Certifica-se de que estamos no cliente
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Executa no carregamento inicial
    onChange()

    // Adiciona o listener de redimensionamento
    window.addEventListener('resize', onChange)

    // Remove o listener no cleanup
    return () => window.removeEventListener('resize', onChange)
  }, [])

  return isMobile
}
