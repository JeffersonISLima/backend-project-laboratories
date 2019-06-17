const express = require('express');
const router = express.Router();
const Laboratory = require('../models/Laboratory.js');

/* Register a new laboratory */
router.get('/new-lab', (req, res, next) => {
  res.render('../views/laboratory/new-lab');
});

router.post('/new-lab', (req, res, next) => {
  const {
    name,
    address,
    status
  } = req.body;

  Laboratory.findOne({
      address
    })
    .then((register) => {
      if (register !== null) {
        res.redirect(`/laboratories/list-lab/?msg=Já existe um laboratório neste endereço, o cadastro do laboratório "${ register.name }" não foi realizado.`);
        return;
      } else {
        const newLaboratory = new Laboratory({
          name,
          address,
          status
        });
        newLaboratory.save()
          .then((laboratory) => {
            res.redirect(`/laboratories/list-lab/?msg=Laboratório "${ laboratory.name }" cadastrado com sucesso!`);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    .catch(error => {
      console.log('Erro: ', error);
    });
});

/* List all laboratories */
router.get('/list-lab', (req, res, next) => {
  Laboratory.find()
    .then(listLabs => {
      res.render('../views/laboratory/list-lab', {
        laboratories: listLabs,
        msg: req.query.msg,
      });
    })
    .catch(error => {
      console.log('Erro ao recuperar laboratórios: ', error);
    })
});

/* Laboratory edit */
router.get('/edit-lab/:id', (req, res, next) => {
  Laboratory.findOne({  
    '_id': req.params.id
  })
  .then(theLab => {       
    res.render('../views/laboratory/edit-lab', {
      laboratory: theLab
    });
  })
  .catch(error => {
    console.log("Erro ao recuperar detalhes de um laboratório para edição: ", error);
  });
});

router.post('/edit-lab/:id', (req, res, next) => {
  Laboratory.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(lab => {
      res.redirect(`/?msg=Laboratório "${ lab.name }" atualizado com sucesso!`);
    })
    .catch(error => {
      throw new Error(error);
    });
});

/* Details a laboratory  */
router.get('/details/:id', (req, res, next) => {
  Laboratory.findOne({
      '_id': req.params.id
    })
    .then( (theLab) => {
      res.render('../views/laboratory/laboratory-details', {
        laboratory: theLab
      });
    })
    .catch(error => {
      console.log("Erro ao recuperar detalhes de um laboratório: ", error);
    });
});

/* Delete one laboratory */
router.get('/delete/:id', (req, res, next) => {
  Laboratory.findByIdAndDelete(req.params.id)
    .then((lab) => {
      res.redirect(`/laboratories/list-lab/?msg=Laboratório "${ lab.name }" deletado com sucesso!`);
    })
    .catch(error => {
      throw new Error(error); 
    });
});

module.exports = router;