const mongoose = require('mongoose');
const Laboratory = require('../models/Laboratory');

const dbName = 'backend-project';
mongoose.connect(`mongodb://localhost/${dbName}`);

const laboratories = [
  {
    name: "Genética",
    address: "Rua Luiz Felipe Zamprogna",
    status: "",
  },
  {
    name: "Alta Diagnósticos",
    address: "Rua Itapissuma",
    status: "",
  },
  {
    name: "Delboni Auriemo",
    address: "Rua Flávio Jerônimo do Nascimento",
    status: "Ativo",
  },
  {
    name: "Labsim",
    address: "Avenida Isaura Santarém",
    status: "Ativo",
  },
  {
    name: "Cytolab",
    address: "Rua Viriato Corrêa",
    status: "",
  },
  {
    name: "Laboratório Médico Vital Brasil",
    address: "Rua Lua Nova",
    status: "Ativo",
  },
  {
    name: "Sérgio Franco",
    address: "Rua do Cravo",
    status: "",
  },
  {
    name: "Salomão Zoppi Diagnósticos",
    address: "Rua Diogo de M. Furtado",
    status: "Ativo",
  },
  {
    name: "Laboratório Oswaldo Cruz",
    address: "Rua Quintal do Sol",
    status: "",
  },
  {
    name: "Lavoisier Laboratório e Imagem",
    address: "Rua Israel",
    status: "Ativo",
  }
]

Laboratory.create(laboratories, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${laboratories.length} laboratories`)
  mongoose.connection.close();
});