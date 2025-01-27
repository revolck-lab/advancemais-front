const websiteRoutes = [
  {
    path: '/?',
    label: 'Página Inicial',
    requiresAuth: false,
  },
  {
    path: '/sobre',
    label: 'Sobre',
    requiresAuth: false,
  },
  {
    path: '/cursos',
    label: 'Cursos',
    requiresAuth: false,
  },
  {
    path: '/solucoes',
    label: 'Soluções',
    requiresAuth: false,
    subLinks: [
      {
        path: '/solucoes/recrutamento-selecao',
        label: 'Recrutamento & Seleção',
        requiresAuth: false,
      },
      {
        path: '/solucoes/treinamento-company',
        label: 'Treinamento In Company',
        requiresAuth: false,
      },
    ],
  },
  {
    path: '/vagas',
    label: 'Vagas',
    requiresAuth: false,
  },
  {
    path: '/blog',
    label: 'Blog',
    requiresAuth: false,
  },
  {
    path: '/contato',
    label: 'Contato',
    requiresAuth: false,
  },
  // Botões adicionais no menu superior
  {
    path: '/para-empresas',
    label: 'Para empresas',
    requiresAuth: false,
  },
  {
    path: '/para-estudantes',
    label: 'Para estudantes',
    requiresAuth: false,
  },
  {
    path: '/para-empregos',
    label: 'Para empregos',
    requiresAuth: false,
  },
]

export default websiteRoutes
