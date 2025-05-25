import express from 'express';
import generateCertificatePDF from '../utils/generatePDF.js';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import Certificate from '../models/certificatemodels.js';

const router = express.Router();

router.post('/generate', async (req, res) => {
  const { username, course } = req.body;

  if (!username || !course) {
    return res.status(400).json({ message: 'Username and course are required' });
  }
 
  try {
    // Check if certificate already exists
    const existing = await Certificate.findOne({ username, course });
    if (existing) {
      const existingPath = `./certs/${existing.certificateId}.pdf`;

      // Check if PDF file actually exists
      if (fs.existsSync(existingPath)) {
        return res.status(200).json({
          message: 'Certificate already exists',
          downloadUrl: `/certificate/download/${existing.certificateId}`,
        });
      }
    }

    // Generate new certificate
    const certificateId = uuidv4();
    const pdfPath = generateCertificatePDF(username, course, certificateId);

    // Save to DB
    const newCert = new Certificate({ username, course, certificateId });
    await newCert.save();

    res.status(200).json({
      message: 'Certificate generated successfully',
      downloadUrl: `/certificate/download/${certificateId}`,
    });
  } catch (err) {
    console.error('Error generating certificate:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/download/:id', (req, res) => {
  const filePath = `./certs/${req.params.id}.pdf`;
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ message: 'Certificate not found' });
  }
});

export default router;
