const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

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
    user: "david154x@hotmail.com",
    pass: "Archyvela2022.*",
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

  const messageBuilder = [];

  messageBuilder.push('Recibe un cordial saludo: '+nombreCompleto+' '+primerApellido+' de antemano, deseamos que estes muy bien');
  messageBuilder.push('Recien acabas de ponerte en contacto con nostros por nuestra pagina web, a continuacion confirmaremos los datos registrados');
  messageBuilder.push("Línea 3");
  messageBuilder.push("Línea 3");
  messageBuilder.push("Línea 3");
  messageBuilder.push("Línea 3");
  messageBuilder.push("Línea 3");
  messageBuilder.push("Línea 3");

  const message = messageBuilder.join('\n');

  const mailOptions = {
    from: "david154x@hotmail.com",
    to: email,
    subject: "Hemos recibido tu solicitud",
    text: message,
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
