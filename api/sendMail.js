const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "rsavillasasbic@outlook.com",
    pass: "rsavilla2023.*",
  },
});

// Middleware de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

async function sendEmail({
  nombreCompleto,
  primerApellido,
  ciudad,
  telefono,
  email,
  detalle,
}, res) {
  const detalleFinal =
    "Recibe un cordial saludo: " +
    nombreCompleto +
    " " +
    primerApellido +
    " de antemano deseamos y esperemos se encuentre bien, " +
    "queremos informarle que debido a que usted llenó nuestro formulario de contactenos, hemos generado este email automático con el fin de confirmar su solicitud.\n" +
    "\n" +
    "Nombre: " +
    nombreCompleto +
    " " +
    primerApellido +
    " \n" +
    "Ciudad: " +
    ciudad +
    "\n" +
    "Teléfono: " +
    telefono +
    "\n" +
    "\n" +
    "A continuación vamos a relacionar la solicitud recibida: \n" +
    "\n" +
    detalle +
    "\n" +
    "\n" +
    "Este es un mensaje automatico porfavor no responda este email";

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
}

app.post("/sendMail", async (req, res) => {
  try {
    await sendEmail(req.body, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ocurrió un error al enviar el correo." });
  }
});

module.exports = app;
