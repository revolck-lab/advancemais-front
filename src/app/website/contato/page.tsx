'use client'
import { Input, Button, Textarea } from '@nextui-org/react'
import styles from './contato.module.css'
import { useIsMobile } from '@/hooks/use-mobile'

export default function Contato() {
  const isMobile = useIsMobile()

  return (
    <section
      className={`${styles.pxResponsive} container mx-auto py-16 ${
        isMobile
          ? 'flex flex-col items-center gap-6'
          : 'flex lg:flex-row items-center gap-8'
      }`}
    >
      <div
        className={`${styles.contactSection} ${isMobile ? 'text-center' : ''}`}
      >
        <h1 className={styles.title}>Entre em Contato</h1>
        <p className={styles.description}>
          Envie um e-mail, ligue ou preencha o formulário abaixo para saber como
          podemos ajudar.
        </p>
        <p className={styles.supportLinks}>
          <strong>Suporte ao Cliente:</strong> Nosso time está disponível para
          ajudar.
          <br />
          <strong>Email:</strong> suporte@advancemais.com.br
          <br />
          <strong>Telefone:</strong> +55 82 xxxx-xxxx
        </p>
      </div>
      <div
        className={`${styles.formSection} ${isMobile ? 'w-full max-w-md border-none' : ''}`}
      >
        <form className={styles.form}>
          <Input
            label="Nome Completo"
            placeholder="Digite seu nome"
            fullWidth
            required
          />
          <Input
            label="Email"
            placeholder="Digite seu email"
            type="email"
            fullWidth
            required
          />
          <Input
            label="Telefone"
            placeholder="Digite seu telefone"
            type="tel"
            fullWidth
            required
          />
          <Textarea
            label="Mensagem"
            placeholder="Como podemos ajudar?"
            rows={5}
            fullWidth
            required
          />
          <Button
            color="primary"
            type="submit"
            fullWidth
            className={styles.submitButton}
          >
            Enviar
          </Button>
        </form>
      </div>
    </section>
  )
}
