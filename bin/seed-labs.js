const mongoose = require('mongoose');
const Laboratory = require('../models/Laboratory');

mongoose.connect(process.env.MONGODB_URI);

const laboratories = [
  {
    name: "Genética",
    address: "Rua Luiz Felipe Zamprogna",
    status: "",
    exams: []
  },
  {
    name: "Alta Diagnósticos",
    address: "Rua Itapissuma",
    status: "",
    exams: []
  },
  {
    name: "Delboni Auriemo",
    address: "Rua Flávio Jerônimo do Nascimento",
    status: "Ativo",
    exams: []
  },
  {
    name: "Labsim",
    address: "Avenida Isaura Santarém",
    status: "Ativo",
    exams: []
  },
  {
    name: "Cytolab",
    address: "Rua Viriato Corrêa",
    status: "",
    exams: []
  },
  {
    name: "Laboratório Médico Vital Brasil",
    address: "Rua Lua Nova",
    status: "Ativo",
    exams: []
  },
  {
    name: "Sérgio Franco",
    address: "Rua do Cravo",
    status: "",
    exams: []
  },
  {
    name: "Salomão Zoppi Diagnósticos",
    address: "Rua Diogo de M. Furtado",
    status: "Ativo",
    exams: []
  },
  {
    name: "Laboratório Oswaldo Cruz",
    address: "Rua Quintal do Sol",
    status: "",
    exams: []
  },
  {
    name: "Lavoisier Laboratório e Imagem",
    address: "Rua Israel",
    status: "Ativo",
    exams: []
  }
]

Laboratory.create(laboratories, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${laboratories.length} laboratories`)
  mongoose.connection.close();
});