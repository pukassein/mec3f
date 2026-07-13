
export interface ScheduleItem {
  id: string;
  date: string; // YYYY-MM-DD
  start_time: string;
  end_time: string;
  title: string;
  type: 'ceremony' | 'lecture' | 'break' | 'social' | 'session';
  description?: string;
  location?: string;
  code?: string;
  authors?: string;
  presenter?: string;
  speaker_id?: string;
  speaker?: Speaker; // Legacy single speaker
  speakers?: Speaker[]; // New array of multiple speakers
  schedule_item_speakers?: { speaker_id: string, speakers: Speaker }[]; // For database join mapping
  track?: 1 | 2 | 3 | 4; // 1: Health, 2: Ecology, 3: Engineering, 4: Energy
}

export interface ImportantDate {
  id: string;
  description: string;
  date_text: string;
  display_order: number;
}

export interface DaySchedule {
  date: string;
  label: string;
  dayOfWeek: string;
  items: ScheduleItem[];
}

export interface TeamMember {
  name: string;
  institution: string;
  role?: string;
}

export enum ThemeType {
  HEALTH = 'Saúde e Meio Ambiente',
  ECOLOGY = 'Ecologia e Conservação',
  ENGINEERING = 'Engenharias e Sustentabilidade',
  ENERGY = 'Energia e Materiais'
}

// Database Types
export interface ContentCard {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  display_order: number;
}

export interface Registration {
  id?: string;
  ticket_number?: number;
  full_name: string;
  email: string;
  institution: string;
  role?: string;
  created_at?: string;
  document_type?: string;
  document_number?: string;
  cpf?: string;
  phone?: string;
  is_foreigner?: boolean;
}

export interface Speaker {
  id: string;
  name: string;
  institution: string;
  image_url: string;
  display_order: number;
  description?: string;
}

export interface Poster {
  id: string;
  code: string;
  title: string;
  authors: string;
  presenter?: string;
  theme: string;
}

export interface SiteContent {
  key: string;
  value: string;
}