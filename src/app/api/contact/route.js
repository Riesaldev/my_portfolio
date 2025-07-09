import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>', // Email verificado de Resend
      to: ['ricardoea@hotmail.es'],
      subject: `Nuevo mensaje de ${name} - Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #d97706; padding-bottom: 10px;">
            Nuevo mensaje desde tu Portfolio
          </h2>
          
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">Información del contacto:</h3>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #d97706;">
            <h3 style="color: #374151; margin-top: 0;">Mensaje:</h3>
            <p style="line-height: 1.6; color: #4b5563;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #6b7280; font-size: 14px;">
              Este mensaje fue enviado desde tu portfolio web
            </p>
          </div>
        </div>
      `,
      text: `
        Nuevo mensaje desde tu Portfolio
        
        Nombre: ${name}
        Email: ${email}
        
        Mensaje:
        ${message}
      `
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Email enviado correctamente',
      id: data.id 
    });

  } catch (error) {
    console.error('Error al enviar email:', error);
    
    return NextResponse.json(
      { 
        error: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
