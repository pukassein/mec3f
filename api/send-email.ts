import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, ticketNumber, role } = req.body;

  if (!email || !name || !ticketNumber) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'MEC3F <confirmacao@mail.mec3f.com>',
      to: [email],
      subject: `Sua Inscrição no MEC3F 2026 - Ticket #${ticketNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(to right, #d9856d, #87c270, #6fc4c7); padding: 4px; }
            .content { padding: 40px; text-align: center; }
            .logo { width: 80px; height: auto; margin-bottom: 20px; }
            .ticket-number { font-size: 32px; font-weight: bold; color: #334155; margin: 20px 0; letter-spacing: 2px; }
            .details { background-color: #f8fafc; padding: 20px; border-radius: 8px; text-align: left; margin-bottom: 30px; border: 1px solid #e2e8f0; }
            .detail-row { margin-bottom: 10px; }
            .label { font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold; display: block; margin-bottom: 4px; }
            .value { font-size: 16px; color: #1e293b; font-weight: 500; }
            .footer { background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; }
            .button { display: inline-block; background-color: #6fc4c7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header"></div>
            <div class="content">
              <img src="https://mec3f.com/logomec3f.png" alt="MEC3F Logo" class="logo" style="max-width: 100px;">
              <h1 style="color: #0f172a; margin-bottom: 10px;">Inscrição Confirmada!</h1>
              <p style="color: #475569; font-size: 16px; line-height: 1.5;">Olá, <strong>${name}</strong>! Sua vaga no 6º Congresso de Engenharias e Ciências Aplicadas das Três Fronteiras está garantida.</p>
              
              <div class="ticket-number">#${String(ticketNumber).padStart(4, '0')}</div>
              
              <div class="details">
                <div class="detail-row">
                  <span class="label">Participante</span>
                  <div class="value">${name}</div>
                </div>
                <div class="detail-row">
                  <span class="label">Categoria</span>
                  <div class="value">${role || 'Participante'}</div>
                </div>
                <div class="detail-row">
                  <span class="label">Data do Evento</span>
                  <div class="value">25 a 28 de Agosto de 2026</div>
                </div>
                <div class="detail-row">
                  <span class="label">Local</span>
                  <div class="value">Foz do Iguaçu, PR</div>
                </div>
              </div>

              <p style="color: #475569; font-size: 14px;">Apresente este email ou o número do seu ticket no dia do evento para realizar o check-in.</p>
              
              <a href="https://mec3f.com" class="button">Acessar Site do Evento</a>
            </div>
            <div class="footer">
              <p>&copy; 2026 MEC3F. Todos os direitos reservados.</p>
              <p>Este é um email automático, por favor não responda.</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    console.error('Server Error:', err);
    return res.status(500).json({ error: err.message });
  }
}
