import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const generateCertificatePDF = (username, course, certificateId) => {
  const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 50 });
  const filePath = `./certs/${certificateId}.pdf`;

  if (!fs.existsSync('./certs')) fs.mkdirSync('./certs');
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // Border
  doc
    .rect(25, 25, doc.page.width - 50, doc.page.height - 50)
    .lineWidth(2)
    .strokeColor('#4A90E2')
    .stroke();

  // Header
  doc
    .fontSize(30)
    .fillColor('#000')
    .font('Helvetica-Bold')
    .text('CERTIFICATE', { align: 'center' });

  doc
    .moveDown(0.3)
    .fontSize(22)
    .font('Helvetica')
    .text('OF ACHIEVEMENT', { align: 'center' });

  doc
    .moveDown(1)
    .fontSize(14)
    .text('THIS CERTIFICATE IS PROUDLY PRESENTED TO', { align: 'center' });

  doc
    .moveDown(0.5)
    .fontSize(32)
    .fillColor('#1A1A1A')
    .font('Times-Italic')
    .text(username, { align: 'center' });

  doc
    .moveDown(0.5)
    .fontSize(16)
    .fillColor('#000')
    .font('Helvetica')
    .text(`for successfully completing the course:`, { align: 'center' });

  doc
    .moveDown(0.2)
    .fontSize(20)
    .fillColor('#0a5ad1')
    .font('Helvetica-Bold')
    .text(course, { align: 'center' });

  const today = new Date().toLocaleDateString('en-GB');
  doc
    .moveDown(1.5)
    .fontSize(14)
    .fillColor('#000')
    .text(`Awarded on: ${today}`, { align: 'center' });

  // Signature image
  const signaturePath = path.resolve('./SING.jpg'); // Update this if needed
  if (fs.existsSync(signaturePath)) {
    doc.image(signaturePath, 100, 400, { width: 120 }); // Signature image
  } 

  doc
    .fontSize(12)
    .text('Prasun Kumar', 100, 440)
    .text('CEO, LMS', 100, 455);

  // Certificate ID (centered at the very bottom)
  doc
    .fontSize(12)
    .fillColor('#555')
    .text(`Certificate ID: ${certificateId}`, 0, doc.page.height-80, {
      align: 'center'
    });

  doc.end();
  return filePath;
};

export default generateCertificatePDF;
