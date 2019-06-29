const express = require('express');
const router = express.Router();
const Laboratory = require('../models/Laboratory.js');
const Exam = require('../models/Exam.js');

/* Register a new laboratory */
router.get('/new-lab', (req, res, next) => {
  Exam.find()
  .then((exams) => {    
    let images = [];
    let analyzes = [];

    exams.map((element) => {
      if(element.type === 'Imagem') {
        images.push(element);
      }else {
        analyzes.push(element);
      }
    });
    res.render('../views/laboratory/new-lab', { 
      images: images,
      analyzes: analyzes
     });
  })
  .catch((error) => {
    throw new Error(error);
  });
});

router.post('/new-lab', (req, res, next) => {
  const {
    name,
    address,
    status,
    exams
  } = req.body;

  Laboratory.findOne({
      address
    })
    .then((register) => {
      if (register !== null) {
        res.redirect(`/laboratories/list-lab/?msgFailure=Cadastro não realizado, o laboratório "${ register.name }" consta no endereço informado.`);
        return;
      } else {
        const newLaboratory = new Laboratory({
          name,
          address,
          status,
          exams
        });
        newLaboratory.save()
          .then((laboratory) => {
            res.redirect(`/laboratories/list-lab/?msgSuccess=Laboratório "${ laboratory.name }" cadastrado com sucesso!`);
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
    .then((listLabs) => {
      res.render('../views/laboratory/list-lab', {
        laboratories: listLabs,
        msgFailure: req.query.msgFailure,
        msgSuccess: req.query.msgSuccess
      });
    })
    .catch((error) => {
      console.log('Erro ao recuperar laboratórios: ', error);
    })
});

/* Laboratory edit */
router.get('/edit-lab/:id', (req, res, next) => {
  Laboratory.findOne({  
    '_id': req.params.id
  })
    .then((theLab) => { 
      Exam.find()
      .then((theExams) => {
        let images = [];
        let analyzes = [];
  
        theExams.map((exam) => {
          if(exam.type === 'Imagem' && exam.status === 'Ativo') {
            images.push(exam);
          }else if(exam.type === 'Análise Clínica' && exam.status === 'Ativo') {
            analyzes.push(exam);
          }         
        });     

        res.render('../views/laboratory/edit-lab', {
          laboratory: theLab,
          theExams: theExams, 
          images,
          analyzes,
        });
      })
      .catch((error) => {
        console.log("Erro ao recuperar detalhes de um laboratório para edição: ", error);
      });
    })
    .catch((error) => {
      throw new Error(error);
    })  
});

router.post('/edit-lab/:id', (req, res, next) => {
  Laboratory.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((lab) => {
      res.redirect(`/?msg=Laboratório "${ lab.name }" atualizado com sucesso!`);
    })
    .catch((error) => {
      throw new Error(error);
    });
});

/* Details a laboratory  */
router.get('/details/:id', (req, res, next) => {
  Laboratory.findOne({
      '_id': req.params.id
    })
    .then((theLab) => {
      let images = [];
      let analyzes = [];
      let elementArrayAux = '';
      
      theLab.exams.map((exam) => {
        if(exam !== 'Análise Clínica' && exam !== 'Imagem' && exam !== '') {          
          elementArrayAux = exam; 
        }     
          
        if(exam === 'Análise Clínica') {
          analyzes.push(elementArrayAux);       
        }else if(exam === 'Imagem') {            
          if(analyzes.includes(elementArrayAux)) {
            elementArrayAux = ''; 
          }else {           
            images.push(elementArrayAux);                     
           }         
        }            
      });

    const filteredAnalyzes = analyzes.filter((exam, idx) => analyzes.indexOf(exam)  === idx);
    const filteredImages = images.filter((exam, idx) => images.indexOf(exam) === idx);      
    
    res.render('../views/laboratory/laboratory-details', {
      laboratory: theLab,
      filteredImages,
      filteredAnalyzes
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
      res.redirect(`/laboratories/list-lab/?msgSuccess=Laboratório "${ lab.name }" deletado com sucesso!`);
    })
    .catch((error) => {
      throw new Error(error); 
    });
});

/* Search laboratory from exam name - endpoint */
router.get('/search-laboratory', (req, res, next) => {
  Laboratory.find()
    .then((allLabs) => {
      res.render('../views/search-laboratory/search-lab', {
        allLabs: allLabs,
      });
    })
    .catch((error) => {
      throw new Error(error);
    });
});

module.exports = router;