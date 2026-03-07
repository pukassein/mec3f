-- Clear existing dates
DELETE FROM important_dates;

-- Insert new dates
INSERT INTO important_dates (description, date_text, display_order) VALUES
('Início das Inscrições', '15/03/2026', 1),
('Início da Submissão de Resumos', '15/03/2026', 2),
('Prazo Final para Submissão de Resumos', '30/04/2026', 3),
('Avaliação dos Trabalhos', '01/05/2026 – 14/05/2026', 4),
('Divulgação dos Trabalhos Aceitos', 'a partir de 15/05/2026', 5),
('Prazo para Envio das Versões Corrigidas', '31/05/2026', 6),
('Divulgação da Programação Final', 'a partir de 30/06/2026', 7),
('Início do Evento', '25/08/2026', 8);
