import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';

async function crearPDF() {
  // Crea un nuevo documento PDF
  const pdfDoc = await PDFDocument.create();

  // Agrega una página
  const page = pdfDoc.addPage([600, 400]);


  

  // Configura el texto
  page.drawText('¡Hola, este es un PDF generado con TypeScript!', {
    x: 50,
    y: 350,
    size: 20,
    color: rgb(0, 0, 1)
  });

  // Guarda el documento como un archivo
  const pdfBytes = await pdfDoc.save();

  // Guarda el PDF en el sistema de archivos
  fs.writeFileSync('miPDF.pdf', pdfBytes);
  console.log('PDF creado con éxito');
}

crearPDF();
