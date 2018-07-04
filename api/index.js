import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import jwt from 'jsonwebtoken';

const router = express.Router();

const dbpool  = mysql.createPool({
  host: process.env.DRAGONIAN_DB_HOST,
  user: process.env.DRAGONIAN_DB_USER,
  password: process.env.DRAGONIAN_DB_PASS,
  database : process.env.DRAGONIAN_DB_DB
});

const transporter = nodemailer.createTransport({
  service: 'Hotmail',
  auth: {
    user: process.env.JT_EMAIL_USER,
    pass: process.env.JT_EMAIL_PASS
  }
});

router.get('/', (req, res) => {
  res.send({ data: [] });
});

router.post('/email', (req, res) => {
  //Checks that the from and text keys are provided. Report false to user if true
  if(req.body.from === undefined || req.body.text === undefined){
    res.send(false);

  } else {
    //Create email to myself about contact
    let mailOptions = {
      from: process.env.JT_EMAIL_USER,
      to: process.env.JT_EMAIL_USER,
      subject: 'New Portfolio Contact - ' + req.body.from,
      text: req.body.text
    };
    //Send email with transporter object and report success to user
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        //Failed
        res.send(false);
      } else {
        //Success
        res.send(true);
      }
    });
  }
});

router.get('/unassignedroles', (req, res) => {
    dbpool.getConnection(function(err, connection) {
      // Use the connection
      connection.query('CALL Get_UnassignedCollabRoles(0, 20);', function (error, results, fields) {
          res.send(results);
          connection.release();
          if (error) throw error;

          // Don't use the connection here, it has been returned to the pool.
      });
    });
});

export default router;
