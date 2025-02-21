const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'eu-north-1'
});

app.get('/get-pdf', async (req, res) => {
  try {
    const data = await s3.getObject({
      Bucket: 'awsdwg',
      Key: '1abc'
    }).promise();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.send(data.Body);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(process.env.PORT || 3000);
