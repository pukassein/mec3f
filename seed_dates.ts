import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lpyswsovorgutlqfphgz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxweXN3c292b3JndXRscWZwaGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MTU4MzIsImV4cCI6MjA3MjA5MTgzMn0.msGHBGnF0peQN2610zJWZYNoZBKBE-C9kKtwoullINk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDates() {
  console.log('Seeding dates...');
  
  // Delete all existing
  const { error: deleteError } = await supabase.from('important_dates').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (deleteError) {
    console.error('Error deleting:', deleteError);
  } else {
    console.log('Cleared existing dates.');
  }

  const defaultDates = [
    { description: 'Início das Inscrições', date_text: '15/03/2026', display_order: 1 },
    { description: 'Início da Submissão de Resumos', date_text: '15/03/2026', display_order: 2 },
    { description: 'Prazo Final para Submissão de Resumos', date_text: '30/04/2026', display_order: 3 },
    { description: 'Avaliação dos Trabalhos', date_text: '01/05/2026 – 14/05/2026', display_order: 4 },
    { description: 'Divulgação dos Trabalhos Aceitos', date_text: 'a partir de 15/05/2026', display_order: 5 },
    { description: 'Prazo para Envio das Versões Corrigidas', date_text: '31/05/2026', display_order: 6 },
    { description: 'Divulgação da Programação Final', date_text: 'a partir de 30/06/2026', display_order: 7 },
    { description: 'Início do Evento', date_text: '25/08/2026', display_order: 8 }
  ];

  for (const d of defaultDates) {
    const { error } = await supabase.from('important_dates').insert(d);
    if (error) console.error('Error inserting:', d.description, error.message);
    else console.log('Inserted:', d.description);
  }
  
  console.log('Done.');
}

seedDates();
