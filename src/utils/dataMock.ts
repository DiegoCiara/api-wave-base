const companies = [
  {
    name: 'Prospecção',
    country: 'Brasil',
    state: 'SP',
    city: 'São Paulo',
    site: 'www.seusite.com.br',
  },
  {
    name: 'Indicação',
    country: '',
    state: '',
    city: '',
    site: '',
  },
  {
    name: 'Ligação',
    country: '',
    state: '',
    city: '',
    site: '',
  },
  {
    name: 'E-mail',
    country: '',
    state: '',
    city: '',
    site: '',
  },
  {
    name: 'WhatsApp',
    country: '',
    state: '',
    city: 'l',
    site: '',
  },
  {
    name: 'Facebook',
    country: '',
    state: '',
    city: '',
    site: '',
  },
  {
    name: 'Instagram',
    country: '',
    state: '',
    city: '',
    site: '',
  },
];

const contacts = [
  {
    name: 'Exemplo de Contato',
    cpf_cnpj: '27819902001',
    email: 'teste@wavecrm.com.br',
    phone: '12987979532',
    city: 'São Paulo',
    state: 'SP',
  },
];

const users = [
  {
    name: 'Suporte Técnico',
    email: 'suporte.diegociara@gmail.com',
    role: 'ADMIN',
    password: 'die140401',
  },
];

const pipelines = [
  {
    name: 'Lead',
    description: "Sem contato, efetue o contato com o cliente para mover para próxima etapa",
  },
  {
    name: 'Contato efetuado',
    description: "Contato efetuado com o cliente, aguardando interesse para ser reconhecido a oportunidade de negócio",
  },
  {
    name: 'Oportunidade',
    description: "Reconhecimento de oportunidade,nessa etapa é identificado o interesse e aguarda resposta para o envio de proposta",
  },
  {
    name: 'Proposta',
    description: "Proposta enviada para o cliente, aguardando resposta para negociar ou fechar a negociação",
  },
  {
    name: 'Negociação',
    description: "Negocie com o cliente a proposta enviada, aplique promoções, descontos ou uma nova proposta para fechar com o cliente nessa etapa.",
  },
];

const deals = [
  {
    name: 'Teste',
    deadline: new Date(),
    priority: 'medium',
    value: 676577,
  },
];

const deals2 = [
  {
    name: 'nReport',
    deadline: new Date(),
    priority: 'medium',
    value: 258445,
  },
];

const deals3 = [
  {
    name: 'nReport',
    deadline: new Date(),
    priority: 'medium',
    value: 258445,
  },
];

const deals4 = [
  {
    name: 'nReport',
    deadline: new Date(),
    priority: 'high',
    value: 258445,
  },
];

export { companies, contacts, users, pipelines, deals, deals2, deals3, deals4 };
