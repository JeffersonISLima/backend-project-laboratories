const express = require('express');
const router = express.Router();
const Laboratory = require('../models/Laboratory.js');

/* List all laboratories */
router.get('/list-lab', (req, res, next) => {
  Laboratory.find()
    .then( listLabs => {
      res.render('../views/laboratory/list-lab', {
        laboratories: listLabs
      });
    })
    .catch(error => {
      console.log('Erro ao recuperar laboratórios: ', error);
    })
});

/* Laboratory details */
router.get('/:id', (req, res, next) => {
  Laboratory.findOne( {'_id': req.params.id} )
  .then( theLab => {
    res.render('../views/laboratory/laboratory-details', { laboratory: theLab } );
  })
  .catch( error => {
    console.log("Error while retrieving laboratory detail: ", error); 
  })
});

/* Register a new laboratory */
router.get('/new-lab', (req, res, next) => {
  Laboratory.save()
  .then( newLab => {
    

  })
})

module.exports = router;