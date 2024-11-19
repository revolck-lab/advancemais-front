import Image from 'next/image'
import styles from './logo.module.css'

import logoFull from '/public/images/revolck_logo2.png' // Logo completa
import logoCollapsed from '/public/images/revolck_logo2.png' // Logo colapsada

interface LogoProps {
  variant?: 'auth' | 'dashboard' | 'dashboardCollapsed' // Variantes para as logos
  className?: string
}

const Logo: React.FC<LogoProps> = ({ variant = 'auth', className = '' }) => {
  // Defina as logos com base na variação
  let logoSrc = logoFull // Logo padrão (completa)

  if (variant === 'dashboardCollapsed') {
    logoSrc = logoCollapsed // Logo para o dashboard colapsado
  }

  // Estilo específico para cada tipo de logo
  const variantClass =
    variant === 'dashboardCollapsed'
      ? styles.dashboardCollapsed
      : variant === 'dashboard'
        ? styles.dashboard
        : styles.login

  return (
    <div className={`${variantClass} ${className}`}>
      <Image
        src={logoSrc}
        alt="Logo Revolck"
        width={100}
        height={100}
        priority
      />
    </div>
  )
}

export default Logo
