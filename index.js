const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const StringBuilder = require('./StringBuilder');


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración del transporte de Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "rsavillasasbic@outlook.com",
    pass: "rsavilla2023.*",
  },
});

// Ruta para el endpoint de envío de correo
app.post("/sendMail", (req, res) => {
  const {
    nombreCompleto,
    primerApellido,
    segundoApellido,
    ciudad,
    telefono,
    email,
    detalle,
  } = req.body;


  const detalleFinal = 'Recibe un cordial saludo: ' + nombreCompleto + ' ' + primerApellido + ' de antemano deseamos y esperemos se encuentre bien, ' +
  'queremos informarle que debido a que usted llenó nuestro formulario de contactenos, hemos generado este email automático con el fin de confirmar su solicitud.\n'
  +'\n'
  +'Nombre: ' + nombreCompleto + ' ' + primerApellido +' \n'+
  'Ciudad: ' + ciudad + '\n' +
  'Teléfono: ' + telefono + '\n'
  +'\n'+
  'A continuación vamos a relacionar la solicitud recibida: \n'
  +'\n'
  +detalle
  +'\n'
  +'\n'
  +'Este es un mensaje automatico porfavor no responda este email';

  const mailOptions = {
    from: "rsavillasasbic@outlook.com",
    to: email,
    subject: "¡Hemos recibido tu solicitud!",
    text: detalleFinal,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Ocurrió un error al enviar el correo." });
    } else {
      console.log("Correo enviado:", info.response);
      res.status(200).json({ message: "Correo enviado exitosamente." });
    }
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
