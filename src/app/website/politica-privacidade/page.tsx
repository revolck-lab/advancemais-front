'use client'

export default function PoliticaPrivacidade() {
  return (
    <section className="py-16 px-6 md:px-24 lg:px-32 bg-white text-gray-800">
      <div className="container mx-auto items-center gap-20 space-y-10">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-blue-900">
            Política de Privacidade
          </h1>
        </header>

        <div className="space-y-8 text-justify leading-relaxed text-base">
          {/* 1. Introdução */}
          <section>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              1. Introdução
            </h2>
            <p>
              A AdvanceRH está comprometida com a proteção da privacidade e dos
              dados pessoais dos usuários, clientes e parceiros. Atuamos
              conforme a Lei Geral de Proteção de Dados (LGPD – Lei nº
              13.709/2018) e demais normas aplicáveis, prezando pela ética,
              transparência e responsabilidade.
            </p>
          </section>

          {/* 2. Dados Pessoais Coletados */}
          <section>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              2. Quais dados coletamos?
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Dados cadastrais:</strong> nome, e-mail, CPF, telefone,
                endereço, data de nascimento, gênero, empresa, cargo e área de
                atuação.
              </li>
              <li>
                <strong>Dados profissionais:</strong> currículo, experiências,
                escolaridade, pretensão salarial e outras informações relevantes
                para processos seletivos.
              </li>
              <li>
                <strong>Dados de navegação:</strong> IP, localização aproximada,
                informações do navegador/dispositivo, páginas acessadas, cookies
                e similares.
              </li>
              <li>
                <strong>Outros dados:</strong> informações fornecidas em
                contatos via formulário, WhatsApp, telefone, eventos, pesquisas
                e redes sociais.
              </li>
            </ul>
          </section>

          {/* 3. Como usamos seus dados */}
          <section>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              3. Para que usamos seus dados?
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Viabilizar sua participação em processos seletivos e
                recrutamento;
              </li>
              <li>
                Fornecer e aprimorar nossos serviços de consultoria em RH,
                treinamento e desenvolvimento;
              </li>
              <li>
                Comunicar novidades, oportunidades e informações institucionais,
                sempre que autorizado;
              </li>
              <li>
                Cumprir obrigações legais e regulatórias (ex: controles fiscais,
                trabalhistas ou de compliance);
              </li>
              <li>
                Realizar pesquisas de satisfação, análise de perfil,
                estatísticas e métricas para melhoria contínua dos serviços;
              </li>
              <li>
                Proteger nossos direitos e prevenir fraudes, abusos ou
                atividades ilícitas.
              </li>
            </ul>
            <p className="mt-2 text-gray-600 text-sm">
              Sempre observamos uma base legal para o tratamento dos seus dados,
              como consentimento, execução de contrato, obrigação legal ou
              legítimo interesse.
            </p>
          </section>

          {/* 4. Compartilhamento de dados */}
          <section>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              4. Compartilhamento de Dados
            </h2>
            <p>Seus dados podem ser compartilhados:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Com empresas contratantes:</strong> para oportunidades
                de emprego ou seleção, sempre com seu consentimento.
              </li>
              <li>
                <strong>Com parceiros e fornecedores:</strong> tecnologia,
                hospedagem, atendimento, marketing ou outros, sempre mediante
                contrato de confidencialidade.
              </li>
              <li>
                <strong>Com órgãos públicos ou autoridades:</strong> se exigido
                por lei, decisão judicial ou requisição regulatória.
              </li>
            </ul>
            <p className="mt-2 text-gray-600 text-sm">
              Nunca vendemos seus dados pessoais e exigimos o mesmo nível de
              proteção de nossos parceiros.
            </p>
          </section>

          {/* 5. Segurança da Informação */}
          <section>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              5. Segurança das Informações
            </h2>
            <p>
              Utilizamos medidas técnicas e administrativas (criptografia,
              firewalls, controle de acesso, políticas internas e treinamentos)
              para proteger seus dados contra acessos não autorizados, uso
              indevido ou divulgação indevida. Embora nenhum sistema seja
              infalível, buscamos os mais altos padrões de segurança do mercado.
            </p>
          </section>

          {/* 6. Cookies e Tecnologias Similares */}
          <section>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              6. Cookies e Tecnologias Similares
            </h2>
            <p>Utilizamos cookies e tecnologias semelhantes para:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Reconhecer preferências e melhorar sua experiência em nosso
                site;
              </li>
              <li>Analisar visitas, estatísticas de acesso e campanhas;</li>
              <li>Personalizar conteúdo e ofertas;</li>
              <li>Oferecer funcionalidades de redes sociais.</li>
            </ul>
            <p className="mt-2">
              Você pode controlar o uso de cookies diretamente nas configurações
              do seu navegador. Consulte nossa{' '}
              <a href="/website/cookies" className="underline text-blue-700">
                Política de Cookies
              </a>{' '}
              para saber mais.
            </p>
          </section>

          {/* 7. Retenção e exclusão de dados */}
          <section>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              7. Retenção e Exclusão dos Dados
            </h2>
            <p>
              Os dados pessoais são mantidos pelo tempo necessário para cumprir
              as finalidades descritas nesta Política e obrigações legais. Após
              esse período, os dados serão excluídos ou anonimizados, salvo
              obrigação legal ou exercício de direitos em processo
              judicial/administrativo.
            </p>
          </section>

          {/* 8. Direitos do Titular */}
          <section>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              8. Seus Direitos (LGPD)
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Confirmação da existência de tratamento de dados;</li>
              <li>Acesso aos seus dados;</li>
              <li>
                Correção de dados incompletos, inexatos ou desatualizados;
              </li>
              <li>
                Anonimização, bloqueio ou eliminação de dados desnecessários ou
                em desconformidade;
              </li>
              <li>Portabilidade e informação sobre compartilhamento;</li>
              <li>Revogação do consentimento e oposição ao tratamento;</li>
              <li>Solicitação de exclusão ou bloqueio dos dados.</li>
            </ul>
            <p className="mt-2">
              Para exercer seus direitos, envie sua solicitação para nosso DPO
              ou utilize nossos canais oficiais de contato.
            </p>
          </section>

          {/* 9. Atualizações desta Política */}
          <section>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              9. Atualizações desta Política
            </h2>
            <p>
              Esta Política pode ser atualizada a qualquer momento para refletir
              melhorias ou mudanças legais. A data da última atualização será
              sempre informada ao final da página. Alterações relevantes serão
              comunicadas de forma clara nos nossos canais.
            </p>
          </section>

          {/* 10. Fale com nosso DPO */}
          <section>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              10. Fale com nosso DPO
            </h2>
            <p>
              Caso tenha dúvidas, solicitações ou queira exercer qualquer
              direito previsto na LGPD, entre em contato com o nosso Encarregado
              de Dados (DPO):
              <br />
              <strong>Nome:</strong> Vanessa Ribeiro Sanches
              <br />
              <strong>Email:</strong> dpo@advancemais.com.br
              <br />
              <strong>Endereço:</strong> Rua Exemplo, nº 123, Sala 1, Centro,
              Maceió - AL
              <br />
              <strong>Telefone:</strong> (82) xxxx-xxxx
            </p>
          </section>
        </div>

        <footer className="text-center text-sm text-gray-500 mt-8">
          Última atualização: Julho de 2025
        </footer>
      </div>
    </section>
  )
}
