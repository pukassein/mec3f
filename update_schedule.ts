import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lpyswsovorgutlqfphgz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxweXN3c292b3JndXRscWZwaGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MTU4MzIsImV4cCI6MjA3MjA5MTgzMn0.msGHBGnF0peQN2610zJWZYNoZBKBE-C9kKtwoullINk';
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateSchedule() {
  console.log('Deleting old schedule for Thursday 14:00 onwards...');
  const { error: deleteError } = await supabase
    .from('schedule_items')
    .delete()
    .eq('date', '2026-08-27')
    .gte('start_time', '14:00');

  if (deleteError) {
    console.error('Error deleting:', deleteError);
    return;
  }

  console.log('Inserting new event...');
  const { error: insertError } = await supabase
    .from('schedule_items')
    .insert({
      date: '2026-08-27',
      start_time: '14:00',
      end_time: '18:00',
      title: 'Eixo de Imersão/Circuito Técnico-Científico',
      type: 'session',
      description: 'Encontros entre grupos de pesquisa ou workshops de projetos específicos, ampliando as oportunidades de aprendizagem, intercâmbio e colaboração entre os participantes. Além de promoção para a integração entre teoria e prática por meio de atividades complementares, como visitas técnicas, científicas e culturais.'
    });

  if (insertError) {
    console.error('Error inserting:', insertError);
  } else {
    console.log('Successfully updated schedule!');
  }
}

updateSchedule();
