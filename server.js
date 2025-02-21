const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Add CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET'],
  allowedHeaders: ['Content-Type']
}));

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'eu-north-1'
});

// Updated route with error logging
app.get('/get-pdf', async (req, res) => {
  try {
    console.log('Fetching PDF from S3...');
    const data = await s3.getObject({
      Bucket: 'awsdwg',
      Key: '3abc'
    }).promise();
    console.log('PDF fetched successfully');
    
    res.setHeader('Content-Type', 'application/pdf');
    res.send(data.Body);
  } catch (error) {
    console.error('S3 Error:', error);
    res.status(500).send(error.message);
  }
});

app.listen(process.env.PORT || 3000);
