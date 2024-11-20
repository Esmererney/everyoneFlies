import nodemailer from 'nodemailer';

// Configura el transportador (transport) con los datos de tu servicio SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes usar 'hotmail', 'yahoo', etc.
  auth: {
    user: '@gmail.com',
    pass: 'tu-contraseña-de-app'
  }
});

// Función para enviar el correo
async function enviarCorreo() {
  try {
    const info = await transporter.sendMail({
      from: '"Nombre Remitente" <tu-email@gmail.com>', // Dirección y nombre del remitente
      to: 'destinatario@example.com', // Destinatario
      subject: 'Asunto del Correo',
      text: 'Contenido en texto plano',
      html: '<b>Contenido en HTML</b>' // Puedes usar HTML para dar formato
    });

    console.log('Correo enviado:', info.messageId);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

enviarCorreo();
