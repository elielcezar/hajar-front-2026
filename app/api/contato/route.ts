import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// E-mail de destino (fallback para build time)
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'elielcezar@gmail.com';

// Função para obter instância do Resend (lazy initialization)
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY não configurada');
  }
  return new Resend(apiKey);
}

// Interface para os dados do formulário
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Função para validar e-mail
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Template HTML do e-mail
function createEmailTemplate(data: ContactFormData): string {
  const timestamp = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nova Mensagem de Contato - Hajar Imóveis</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <tr>
          <td style="background-color: #9e3635; padding: 30px 40px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
              Hajar Imóveis
            </h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">
              Nova Mensagem de Contato
            </p>
          </td>
        </tr>
        
        <!-- Content -->
        <tr>
          <td style="padding: 40px;">
            <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #9e3635; padding-bottom: 10px;">
              Dados do Contato
            </h2>
            
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
                  <strong style="color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Nome</strong>
                  <p style="color: #333333; margin: 5px 0 0 0; font-size: 16px;">${data.name}</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
                  <strong style="color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">E-mail</strong>
                  <p style="color: #333333; margin: 5px 0 0 0; font-size: 16px;">
                    <a href="mailto:${data.email}" style="color: #9e3635; text-decoration: none;">${data.email}</a>
                  </p>
                </td>
              </tr>
              ${data.phone ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
                  <strong style="color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Telefone</strong>
                  <p style="color: #333333; margin: 5px 0 0 0; font-size: 16px;">
                    <a href="tel:${data.phone.replace(/\D/g, '')}" style="color: #9e3635; text-decoration: none;">${data.phone}</a>
                  </p>
                </td>
              </tr>
              ` : ''}
            </table>
            
            <h2 style="color: #333333; margin: 30px 0 15px 0; font-size: 20px; border-bottom: 2px solid #9e3635; padding-bottom: 10px;">
              Mensagem
            </h2>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #9e3635;">
              <p style="color: #333333; margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
            </div>
          </td>
        </tr>
        
        <!-- Footer -->
        <tr>
          <td style="background-color: #2b2b2b; padding: 25px 40px; text-align: center;">
            <p style="color: #999999; margin: 0; font-size: 12px;">
              Mensagem recebida em ${timestamp}
            </p>
            <p style="color: #999999; margin: 10px 0 0 0; font-size: 12px;">
              Este e-mail foi enviado automaticamente pelo formulário de contato do site
              <a href="https://novo.hajar.com.br" style="color: #9e3635; text-decoration: none;">novo.hajar.com.br</a>
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    // Parse do body da requisição
    const body: ContactFormData = await request.json();
    const { name, email, phone, message } = body;

    // Validação dos campos obrigatórios
    if (!name?.trim()) {
      return NextResponse.json(
        { error: 'Nome é obrigatório' },
        { status: 400 }
      );
    }

    if (!email?.trim()) {
      return NextResponse.json(
        { error: 'E-mail é obrigatório' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'E-mail inválido' },
        { status: 400 }
      );
    }

    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Mensagem é obrigatória' },
        { status: 400 }
      );
    }

    // Gera o HTML do e-mail
    const htmlContent = createEmailTemplate({ name, email, phone, message });

    // Inicializa o Resend (lazy - apenas no momento da requisição)
    let resend: Resend;
    try {
      resend = getResendClient();
    } catch {
      console.error('RESEND_API_KEY não configurada');
      return NextResponse.json(
        { error: 'Erro de configuração do servidor' },
        { status: 500 }
      );
    }

    // Envia o e-mail via Resend
    const { data, error } = await resend.emails.send({
      from: 'Hajar Imóveis <onboarding@resend.dev>', // Usar domínio verificado em produção
      to: [CONTACT_EMAIL],
      replyTo: email, // Responder diretamente para o cliente
      subject: `Nova Mensagem de Contato - ${name}`,
      html: htmlContent,
    });

    if (error) {
      console.error('Erro ao enviar e-mail:', error);
      return NextResponse.json(
        { error: 'Erro ao enviar mensagem. Tente novamente.' },
        { status: 500 }
      );
    }

    console.log('E-mail enviado com sucesso:', data?.id);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensagem enviada com sucesso!',
        id: data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro no endpoint de contato:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
