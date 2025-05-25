// server/utils/generatePDF.js
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const generateCertificatePDF = (username, course, certificateId) => {
  const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
  const filePath = `./certs/${certificateId}.pdf`;

  // Create certs folder if not exists
  const dir = './certs';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // Styles
  doc.fontSize(30).fillColor('#000').text('CERTIFICATE OF COMPLETION', { align: 'center' });
  doc.moveDown(2);
  doc.fontSize(20).text(`This is to certify that`, { align: 'center' });
  doc.fontSize(28).fillColor('#007BFF').text(username, { align: 'center' });
  doc.moveDown();
  doc.fontSize(20).fillColor('#000').text(`has successfully completed the course`, { align: 'center' });
  doc.fontSize(24).text(course, { align: 'center' });
  doc.moveDown(2);

  const today = new Date().toLocaleDateString('en-GB');

  doc.fontSize(18).text(`Awarded on: ${today}`, { align: 'center' });
  
  doc.moveDown(4);

  doc.fontSize(16).text('Company: LMS', 100, 410);
  doc.text('CEO: Prasun Kumar', 100, 440);

  doc.text(`Certificate ID: ${certificateId}`, { align: 'center' } ,100,470);
  doc.end();

  return filePath;
};

export default generateCertificatePDF;
