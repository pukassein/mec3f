
import { DaySchedule, TeamMember, ThemeType } from './types';

export const EVENT_DETAILS = {
  name: "6º Congresso de Engenharias e Ciências Aplicadas das Três Fronteiras",
  acronym: "MEC3F",
  year: "2026",
  dateRange: "25 a 28 de Agosto de 2026",
  location: "Universidade Federal da Integração Latino-Americana (Unidade Itaipu Parquetec)",
  city: "Foz do Iguaçu - Paraná - Brasil",
  mapsLink: "https://maps.google.com/?q=Itaipu+Parquetec+Foz+do+Iguaçu",
  instagram: "https://www.instagram.com/mec3f/",
  registerLink: "#register", // Placeholder for actual link
};

export const THEMES = [
  {
    id: 1,
    title: ThemeType.HEALTH,
    description: "Abordagens interdisciplinares sobre saúde pública, toxicologia e impacto ambiental.",
    icon: "HeartPulse"
  },
  {
    id: 2,
    title: ThemeType.ECOLOGY,
    description: "Preservação da biodiversidade, estudos de ecossistemas e manejo de recursos naturais.",
    icon: "Leaf"
  },
  {
    id: 3,
    title: ThemeType.ENGINEERING,
    description: "Inovação tecnológica, infraestrutura sustentável e processos industriais limpos.",
    icon: "Cog"
  },
  {
    id: 4,
    title: ThemeType.ENERGY,
    description: "Fontes renováveis, eficiência energética e desenvolvimento de novos materiais.",
    icon: "Zap"
  }
];

export const SCHEDULE_DATA: DaySchedule[] = [
  {
    date: "25/08",
    dayOfWeek: "Terça-feira",
    label: "Dia 1",
    items: [
      { 
        id: "d1-1",
        date: "2026-08-25",
        start_time: "14:00", 
        end_time: "16:00", 
        title: "Recepção e Orientações", 
        type: "social", 
        description: "Credenciamento e entrega de materiais." 
      },
      { 
        id: "d1-2",
        date: "2026-08-25",
        start_time: "16:00", 
        end_time: "17:00", 
        title: "Cerimônia de Abertura", 
        type: "ceremony", 
        description: "Auditório Principal" 
      },
      { 
        id: "d1-3",
        date: "2026-08-25",
        start_time: "17:00", 
        end_time: "18:00", 
        title: "Conferência de Abertura", 
        type: "lecture", 
        description: "Palestrante Convidado (TBA)" 
      },
      { 
        id: "d1-4",
        date: "2026-08-25",
        start_time: "19:30", 
        end_time: "23:00", 
        title: "Confraternização", 
        type: "social", 
        description: "Jantar por adesão" 
      }
    ]
  },
  {
    date: "26/08",
    dayOfWeek: "Quarta-feira",
    label: "Dia 2",
    items: [
      { 
        id: "d2-1",
        date: "2026-08-26",
        start_time: "08:30", 
        end_time: "10:00", 
        title: "Sessões Técnicas - Saúde e Meio Ambiente", 
        type: "session" 
      },
      { 
        id: "d2-2",
        date: "2026-08-26",
        start_time: "10:00", 
        end_time: "10:30", 
        title: "Coffee Break", 
        type: "break" 
      },
      { 
        id: "d2-3",
        date: "2026-08-26",
        start_time: "10:30", 
        end_time: "12:00", 
        title: "Mesa Redonda: Desafios da Tríplice Fronteira", 
        type: "lecture" 
      },
      { 
        id: "d2-4",
        date: "2026-08-26",
        start_time: "14:00", 
        end_time: "18:00", 
        title: "Apresentação de Trabalhos (Pôsteres)", 
        type: "session" 
      }
    ]
  },
  {
    date: "27/08",
    dayOfWeek: "Quinta-feira",
    label: "Dia 3",
    items: [
      { 
        id: "d3-1",
        date: "2026-08-27",
        start_time: "08:30", 
        end_time: "10:00", 
        title: "Sessões Técnicas - Engenharias", 
        type: "session" 
      },
      { 
        id: "d3-2",
        date: "2026-08-27",
        start_time: "10:00", 
        end_time: "10:30", 
        title: "Coffee Break", 
        type: "break" 
      },
      { 
        id: "d3-3",
        date: "2026-08-27",
        start_time: "10:30", 
        end_time: "12:00", 
        title: "Workshop: Inovação e Tecnologia", 
        type: "lecture" 
      },
      { 
        id: "d3-4",
        date: "2026-08-27",
        start_time: "14:00", 
        end_time: "18:00", 
        title: "Minicursos", 
        type: "session" 
      }
    ]
  },
  {
    date: "28/08",
    dayOfWeek: "Sexta-feira",
    label: "Dia 4",
    items: [
      { 
        id: "d4-1",
        date: "2026-08-28",
        start_time: "09:00", 
        end_time: "11:00", 
        title: "Sessão de Encerramento", 
        type: "ceremony" 
      },
      { 
        id: "d4-2",
        date: "2026-08-28",
        start_time: "11:00", 
        end_time: "12:00", 
        title: "Premiação de Melhores Trabalhos", 
        type: "ceremony" 
      }
    ]
  }
];

export const ORGANIZATION_GENERAL: TeamMember[] = [
  { name: "Ana Alice Eleutério", institution: "UNILA, Brasil" },
  { name: "Bianca Bonaparte", institution: "UNILA, Brasil" },
  { name: "Carlos B. de Araújo", institution: "IBS-UNaM, Argentina" },
  { name: "Diego Baldo", institution: "IBS-UNaM, Argentina" },
  { name: "Edher Zacarias Herrera", institution: "UNA, Paraguay" },
  { name: "Eduardo Guy Perpétuo Bock", institution: "IFSP, Brasil" },
  { name: "Fábio Plut Fernandes", institution: "ITAI, Brasil" },
  { name: "Fernanda Rubio", institution: "IFPR, Foz do Iguaçu, Brasil" },
  { name: "Gustavo A. Zurita", institution: "IBS-UNaM, Argentina" },
  { name: "Janine Padilha Botton", institution: "UNILA, Brasil" },
  { name: "Johan Alexander Cortes Suarez", institution: "UNILA, Brasil" },
  { name: "Kathleen Dall Bello de Souza Risson", institution: "IFPR, Foz do Iguaçu, Brasil" },
  { name: "Lucas Perucci", institution: "IFPR, Foz do Iguaçu, Brasil" },
  { name: "Luiz Roberto R. Faria Junior (Nuno)", institution: "UNILA, Brasil" },
  { name: "Marcela Boroski", institution: "UNILA, Brasil" },
  { name: "Marcelo Gonçalves Hönnicke", institution: "UNILA, Brasil" },
  { name: "Márcio de Sousa Góes", institution: "UNILA, Brasil" },
  { name: "Pablo Suárez", institution: "IBS-UNaM, Argentina" },
  { name: "Rodrigo Leonardo de Oliveira Basso", institution: "UNILA, Brasil" }
];

export const ORGANIZATION_LOCAL: TeamMember[] = [
  { name: "Ana Beatriz Rodrigues Gonzaga", institution: "" },
  { name: "Ana Paula Gomes da Silva Castro", institution: "" },
  { name: "Angie Rocio Barrera Contreras", institution: "" },
  { name: "Anna Beatriz Mota de Moura", institution: "" },
  { name: "Cristian Godoy", institution: "" },
  { name: "Flávio Camacho", institution: "" },
  { name: "Gricelda Adelina Diaz Rolón", institution: "" },
  { name: "Lynn Ahmad Sayah", institution: "" },
  { name: "Maria Luiza Guimarães Dias dos Santos", institution: "" },
  { name: "Milene Miranda Almeida Lira", institution: "" }
];

export const SCIENTIFIC_COMMITTEE: TeamMember[] = [
  { name: "Alex Matos da Silva Costa", institution: "FaCEN - UNA, Paraguai" },
  { name: "Aref Kalilo Lima Kzam", institution: "ILATIT - UNILA, Brasil" },
  { name: "Danilo Fernández Ríos", institution: "FaCEN - UNA, Paraguai" },
  { name: "Danúbia Frasson Furtado", institution: "ILACVN - UNILA, Brasil" },
  { name: "Fernando Jose Mendez Gaona", institution: "FaCEN - UNA, Paraguai" },
  { name: "Isac Kiyoshi Fujita", institution: "IFSP, São Paulo, Brasil" },
  { name: "Jean Franciesco Vettorazzi", institution: "ILACVN - UNILA, Brasil" },
  { name: "Jefferson Luis Ferrari", institution: "UFU, Uberlândia, Brasil" },
  { name: "Luis Fernando Q. P. Marchesi", institution: "UTFPR, Brasil" },
  { name: "Maria Cláudia Gross", institution: "ILACVN - UNILA, Brasil" },
  { name: "Michel Varajão Garey", institution: "ILACVN - UNILA, Brasil" },
  { name: "Rodrigo Sequinel", institution: "UFPR, Palotina, Brasil" },
  { name: "Sérgio Yoshinobu Araki", institution: "IFSP, São Paulo, Brasil" },
  { name: "Thiago Sequinel", institution: "UFGD, Dourados-MS, Brasil" }
];
