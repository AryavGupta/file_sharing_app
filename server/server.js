// import express from 'express';

const { DBconnection } = require('./database/db');
const router = require('./routes/routes')
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Parse URL-encoded data with extended syntax
app.use(express.urlencoded({ extended: true }));

// Parse JSON payloads
app.use(express.json());

app.use("/", router);

DBconnection();

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
