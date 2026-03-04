
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
        title: "Recepção", 
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
        description: "Prof. Dr. Draulio Barros de Araújo – Professor Titular, Instituto do Cérebro, UFRN" 
      },
      { 
        id: "d1-4",
        date: "2026-08-25",
        start_time: "20:00", 
        end_time: "23:00", 
        title: "Jantar Científico", 
        type: "social", 
        description: "Por adesão" 
      }
    ]
  },
  {
    date: "26/08",
    dayOfWeek: "Quarta-feira",
    label: "Dia 2",
    items: [
      // 08:30 - 09:30: Palestra 1 (4 tracks)
      { id: "d2-1-t1", date: "2026-08-26", start_time: "08:30", end_time: "09:30", title: "Palestra 1", type: "lecture", track: 1 },
      { id: "d2-1-t2", date: "2026-08-26", start_time: "08:30", end_time: "09:30", title: "Palestra 1", type: "lecture", track: 2 },
      { id: "d2-1-t3", date: "2026-08-26", start_time: "08:30", end_time: "09:30", title: "Palestra 1", type: "lecture", track: 3 },
      { id: "d2-1-t4", date: "2026-08-26", start_time: "08:30", end_time: "09:30", title: "Palestra 1", type: "lecture", track: 4 },

      // 09:30 - 10:30: Sessão de Comunicação Oral (4 tracks)
      { id: "d2-2-t1", date: "2026-08-26", start_time: "09:30", end_time: "10:30", title: "Com. Oral", type: "session", track: 1 },
      { id: "d2-2-t2", date: "2026-08-26", start_time: "09:30", end_time: "10:30", title: "Com. Oral", type: "session", track: 2 },
      { id: "d2-2-t3", date: "2026-08-26", start_time: "09:30", end_time: "10:30", title: "Com. Oral", type: "session", track: 3 },
      { id: "d2-2-t4", date: "2026-08-26", start_time: "09:30", end_time: "10:30", title: "Com. Oral", type: "session", track: 4 },

      // 10:30 - 11:00: Intervalo - Café (General)
      { id: "d2-3", date: "2026-08-26", start_time: "10:30", end_time: "11:00", title: "Intervalo - Café", type: "break" },

      // 11:00 - 12:30: Mesa-Redonda I (4 tracks)
      { id: "d2-4-t1", date: "2026-08-26", start_time: "11:00", end_time: "12:30", title: "Mesa-Redonda I", type: "session", track: 1 },
      { id: "d2-4-t2", date: "2026-08-26", start_time: "11:00", end_time: "12:30", title: "Mesa-Redonda I", type: "session", track: 2 },
      { id: "d2-4-t3", date: "2026-08-26", start_time: "11:00", end_time: "12:30", title: "Mesa-Redonda I", type: "session", track: 3 },
      { id: "d2-4-t4", date: "2026-08-26", start_time: "11:00", end_time: "12:30", title: "Mesa-Redonda I", type: "session", track: 4 },

      // 12:30 - 14:00: Intervalo - Almoço (General)
      { id: "d2-5", date: "2026-08-26", start_time: "12:30", end_time: "14:00", title: "Intervalo - Almoço", type: "break" },

      // 14:00 - 15:00: Palestra 2 (4 tracks)
      { id: "d2-6-t1", date: "2026-08-26", start_time: "14:00", end_time: "15:00", title: "Palestra 2", type: "lecture", track: 1 },
      { id: "d2-6-t2", date: "2026-08-26", start_time: "14:00", end_time: "15:00", title: "Palestra 2", type: "lecture", track: 2 },
      { id: "d2-6-t3", date: "2026-08-26", start_time: "14:00", end_time: "15:00", title: "Palestra 2", type: "lecture", track: 3 },
      { id: "d2-6-t4", date: "2026-08-26", start_time: "14:00", end_time: "15:00", title: "Palestra 2", type: "lecture", track: 4 },

      // 15:00 - 16:00: Sessão de Comunicação Oral (4 tracks)
      { id: "d2-7-t1", date: "2026-08-26", start_time: "15:00", end_time: "16:00", title: "Com. Oral", type: "session", track: 1 },
      { id: "d2-7-t2", date: "2026-08-26", start_time: "15:00", end_time: "16:00", title: "Com. Oral", type: "session", track: 2 },
      { id: "d2-7-t3", date: "2026-08-26", start_time: "15:00", end_time: "16:00", title: "Com. Oral", type: "session", track: 3 },
      { id: "d2-7-t4", date: "2026-08-26", start_time: "15:00", end_time: "16:00", title: "Com. Oral", type: "session", track: 4 },

      // 16:00 - 17:00: Café e Sessão de Pôster I (General)
      { id: "d2-8", date: "2026-08-26", start_time: "16:00", end_time: "17:00", title: "Café e Sessão de Pôster I", type: "session" },

      // 17:00 - 18:00: Seminário Interdisciplinar I (General)
      { id: "d2-9", date: "2026-08-26", start_time: "17:00", end_time: "18:00", title: "Seminário Interdisciplinar I", type: "lecture" }
    ]
  },
  {
    date: "27/08",
    dayOfWeek: "Quinta-feira",
    label: "Dia 3",
    items: [
      // 08:30 - 09:30: Palestra 3 (4 tracks)
      { id: "d3-1-t1", date: "2026-08-27", start_time: "08:30", end_time: "09:30", title: "Palestra 3", type: "lecture", track: 1 },
      { id: "d3-1-t2", date: "2026-08-27", start_time: "08:30", end_time: "09:30", title: "Palestra 3", type: "lecture", track: 2 },
      { id: "d3-1-t3", date: "2026-08-27", start_time: "08:30", end_time: "09:30", title: "Palestra 3", type: "lecture", track: 3 },
      { id: "d3-1-t4", date: "2026-08-27", start_time: "08:30", end_time: "09:30", title: "Palestra 3", type: "lecture", track: 4 },

      // 09:30 - 10:30: Sessão de Comunicação Oral (4 tracks)
      { id: "d3-2-t1", date: "2026-08-27", start_time: "09:30", end_time: "10:30", title: "Com. Oral", type: "session", track: 1 },
      { id: "d3-2-t2", date: "2026-08-27", start_time: "09:30", end_time: "10:30", title: "Com. Oral", type: "session", track: 2 },
      { id: "d3-2-t3", date: "2026-08-27", start_time: "09:30", end_time: "10:30", title: "Com. Oral", type: "session", track: 3 },
      { id: "d3-2-t4", date: "2026-08-27", start_time: "09:30", end_time: "10:30", title: "Com. Oral", type: "session", track: 4 },

      // 10:30 - 11:00: Intervalo - Café (General)
      { id: "d3-3", date: "2026-08-27", start_time: "10:30", end_time: "11:00", title: "Intervalo - Café", type: "break" },

      // 11:00 - 12:30: Mesa-Redonda I (4 tracks)
      { id: "d3-4-t1", date: "2026-08-27", start_time: "11:00", end_time: "12:30", title: "Mesa-Redonda I", type: "session", track: 1 },
      { id: "d3-4-t2", date: "2026-08-27", start_time: "11:00", end_time: "12:30", title: "Mesa-Redonda I", type: "session", track: 2 },
      { id: "d3-4-t3", date: "2026-08-27", start_time: "11:00", end_time: "12:30", title: "Mesa-Redonda I", type: "session", track: 3 },
      { id: "d3-4-t4", date: "2026-08-27", start_time: "11:00", end_time: "12:30", title: "Mesa-Redonda I", type: "session", track: 4 },

      // 12:30 - 14:00: Intervalo - Almoço (General)
      { id: "d3-5", date: "2026-08-27", start_time: "12:30", end_time: "14:00", title: "Intervalo - Almoço", type: "break" },

      // 14:00 - 15:00: Palestra 4 (4 tracks)
      { id: "d3-6-t1", date: "2026-08-27", start_time: "14:00", end_time: "15:00", title: "Palestra 4", type: "lecture", track: 1 },
      { id: "d3-6-t2", date: "2026-08-27", start_time: "14:00", end_time: "15:00", title: "Palestra 4", type: "lecture", track: 2 },
      { id: "d3-6-t3", date: "2026-08-27", start_time: "14:00", end_time: "15:00", title: "Palestra 4", type: "lecture", track: 3 },
      { id: "d3-6-t4", date: "2026-08-27", start_time: "14:00", end_time: "15:00", title: "Palestra 4", type: "lecture", track: 4 },

      // 15:00 - 16:00: Sessão de Comunicação Oral (4 tracks)
      { id: "d3-7-t1", date: "2026-08-27", start_time: "15:00", end_time: "16:00", title: "Com. Oral", type: "session", track: 1 },
      { id: "d3-7-t2", date: "2026-08-27", start_time: "15:00", end_time: "16:00", title: "Com. Oral", type: "session", track: 2 },
      { id: "d3-7-t3", date: "2026-08-27", start_time: "15:00", end_time: "16:00", title: "Com. Oral", type: "session", track: 3 },
      { id: "d3-7-t4", date: "2026-08-27", start_time: "15:00", end_time: "16:00", title: "Com. Oral", type: "session", track: 4 },

      // 16:00 - 17:00: Café e Sessão de Pôster II (General)
      { id: "d3-8", date: "2026-08-27", start_time: "16:00", end_time: "17:00", title: "Café e Sessão de Pôster II", type: "session" },

      // 18:00 - 22:00: Espaço Cultural & Científico-Tecnológico (General)
      { id: "d3-9", date: "2026-08-27", start_time: "18:00", end_time: "22:00", title: "Espaço Cultural & Científico-Tecnológico", type: "social" }
    ]
  },
  {
    date: "28/08",
    dayOfWeek: "Sexta-feira",
    label: "Dia 4",
    items: [
      // 08:30 - 09:30: Palestra 5 (4 tracks)
      { id: "d4-1-t1", date: "2026-08-28", start_time: "08:30", end_time: "09:30", title: "Palestra 5", type: "lecture", track: 1 },
      { id: "d4-1-t2", date: "2026-08-28", start_time: "08:30", end_time: "09:30", title: "Palestra 5", type: "lecture", track: 2 },
      { id: "d4-1-t3", date: "2026-08-28", start_time: "08:30", end_time: "09:30", title: "Palestra 5", type: "lecture", track: 3 },
      { id: "d4-1-t4", date: "2026-08-28", start_time: "08:30", end_time: "09:30", title: "Palestra 5", type: "lecture", track: 4 },

      // 09:30 - 10:30: Sessão de Comunicação Oral (4 tracks)
      { id: "d4-2-t1", date: "2026-08-28", start_time: "09:30", end_time: "10:30", title: "Com. Oral", type: "session", track: 1 },
      { id: "d4-2-t2", date: "2026-08-28", start_time: "09:30", end_time: "10:30", title: "Com. Oral", type: "session", track: 2 },
      { id: "d4-2-t3", date: "2026-08-28", start_time: "09:30", end_time: "10:30", title: "Com. Oral", type: "session", track: 3 },
      { id: "d4-2-t4", date: "2026-08-28", start_time: "09:30", end_time: "10:30", title: "Com. Oral", type: "session", track: 4 },

      // 10:30 - 11:00: Intervalo - Café (General)
      { id: "d4-3", date: "2026-08-28", start_time: "10:30", end_time: "11:00", title: "Intervalo - Café", type: "break" },

      // 11:00 - 12:30: Mesa-Redonda I (4 tracks)
      { id: "d4-4-t1", date: "2026-08-28", start_time: "11:00", end_time: "12:30", title: "Mesa-Redonda I", type: "session", track: 1 },
      { id: "d4-4-t2", date: "2026-08-28", start_time: "11:00", end_time: "12:30", title: "Mesa-Redonda I", type: "session", track: 2 },
      { id: "d4-4-t3", date: "2026-08-28", start_time: "11:00", end_time: "12:30", title: "Mesa-Redonda I", type: "session", track: 3 },
      { id: "d4-4-t4", date: "2026-08-28", start_time: "11:00", end_time: "12:30", title: "Mesa-Redonda I", type: "session", track: 4 },

      // 12:30 - 14:00: Intervalo - Almoço (General)
      { id: "d4-5", date: "2026-08-28", start_time: "12:30", end_time: "14:00", title: "Intervalo - Almoço", type: "break" },

      // 14:00 - 16:00: Rede de Pesquisadoras/res (Reunião Geral) (General)
      { id: "d4-6", date: "2026-08-28", start_time: "14:00", end_time: "16:00", title: "Rede de Pesquisadoras/res (Reunião Geral)", type: "session" },

      // 16:00 - 17:00: Conferência de encerramento (General)
      { id: "d4-7", date: "2026-08-28", start_time: "16:00", end_time: "17:00", title: "Conferência de encerramento", type: "ceremony" },

      // 17:15 - 18:00: Cerimônia de menção honrosa e encerramento (General)
      { id: "d4-8", date: "2026-08-28", start_time: "17:15", end_time: "18:00", title: "Cerimônia de menção honrosa e encerramento", type: "ceremony" }
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
  { name: "Alana Golin", institution: "" },
  { name: "Ana Beatriz Rodrigues Gonzaga", institution: "" },
  { name: "Ana Paula Gomes da Silva Castro", institution: "" },
  { name: "Angie Rocio Barrera Contreras", institution: "" },
  { name: "Anna Beatriz Mota de Moura", institution: "" },
  { name: "Cristian Godoy", institution: "" },
  { name: "Esdras Rebecchi de Almeida", institution: "" },
  { name: "Flávio Camacho", institution: "" },
  { name: "Gricelda Adelina Diaz Rolón", institution: "" },
  { name: "Hussein A K Moussa", institution: "" },
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
