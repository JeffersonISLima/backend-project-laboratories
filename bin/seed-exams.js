const mongoose = require('mongoose');
const Exam = require('../models/Exam');

const dbName = 'backend-project';
mongoose.connect(`mongodb://localhost/${dbName}`);

const exams = [
  {
    name: "Tomografia Computadorizada",
    type: "Imagem",
    status: "",
  },
  {
    name: "Ressonância Magnética",
    type: "Imagem",
    status: "",
  },
  {
    name: "Radiografia",
    type: "Imagem",
    status: "Ativo",
  },
  {
    name: "Mamografia",
    type: "Imagem",
    status: "Ativo",
  },
  {
    name: "Medicina Nuclear",
    type: "Imagem",
    status: "",
  },
  {
    name: "Ultrassom",
    type: "Imagem",
    status: "Ativo",
  },
  {
    name: "Exame de Sangue",
    type: "Análise Clínica",
    status: "",
  },
  {
    name: "Exame de Colesterol",
    type: "Análise Clínica",
    status: "Ativo",
  },
  {
    name: "Exame da Glicose",
    type: "Análise Clínica",
    status: "",
  },
  {
    name: "Exame PCR",
    type: "Análise Clínica",
    status: "Ativo",
  },
  {
    name: "Creatinina e Ureia",
    type: "Análise Clínica",
    status: "Ativo",
  },
  {
    name: "Albumina",
    type: "Análise Clínica",
    status: "Ativo",
  }
]

Exam.create(exams, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${exams.length} exams`)
  mongoose.connection.close();
});