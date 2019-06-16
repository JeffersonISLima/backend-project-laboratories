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

  Laboratory.findOne({address})
    .then(( register ) => {         
      if( register !== null) {
        res.redirect('/laboratories/list-lab/?msg=Este laboratório e o endereço já existem.');  
        return;        
      }
      else{     
        const newLaboratory = new Laboratory({
          name,
          address,
          status
        });
        newLaboratory.save()
        .then((laboratory) => {
          res.redirect('/laboratories/list-lab');
        })
        .catch((error) => {
          console.log(error);
        });     
      
      }

    })
    .catch( error => {
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

/* Laboratory details */
router.get('/:id', (req, res, next) => {
  Laboratory.findOne({
      '_id': req.params.id
    })
    .then(theLab => {
      res.render('../views/laboratory/laboratory-details', {
        laboratory: theLab
      });
    })
    .catch(error => {
      console.log("Erro ao recuperar detalhes de um laboratório: ", error);
    })
});

module.exports = router;