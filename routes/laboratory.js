const express = require('express');
const router = express.Router();
const Laboratory = require('../models/Laboratory.js');
const Exam = require('../models/Exam.js');

/* Register a new laboratory */
router.get('/new-lab', (req, res, next) => {
  Exam.find()
  .then((exams) => {    
    res.render('../views/laboratory/new-lab', { exams: exams });
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
        res.redirect(`/laboratories/list-lab/?msgFailure=Já existe um laboratório neste endereço, o cadastro do laboratório "${ register.name }" não foi realizado.`);
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
  Laboratory.find().populate('id_exam')
    .then((listLabs) => {
      res.render('../views/laboratory/list-lab', {
        laboratories: listLabs,
        msgFailure: req.query.msgFailure,
        msgSuccess: req.query.msgSuccess
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
  .then((theLab) => { 
    Exam.find()
    .then((theExams) => {
      let images = [];
      let analyzes = [];
  
      theExams.map((exam, idx) => {
        if(exam.type === 'Imagem' && exam.status === 'Ativo'){
          images.push(exam);
        }else if(exam.type === 'Análise Clínica' && exam.status === 'Ativo'){
          analyzes.push(exam);
        }         
      });      
      
     // console.log("THE EXAMSSS", theExams);
      
     // console.log("ESTE É O ARRAY DE IMAGENS", images);
      //console.log("ESTE É O ARRAY DE ANALISES", analyzes); 
      
      res.render('../views/laboratory/edit-lab', {
        laboratory: theLab,
        theExams: theExams, 
        images,
        analyzes,
      });
    })
    .catch(error => {
      console.log("Erro ao recuperar detalhes de um laboratório para edição: ", error);
    });

    })
    .catch((error) => {
      throw new Error(error);
    })  
});

router.post('/edit-lab/:id', (req, res, next) => {
  Laboratory.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(lab => {
      console.log("######### poooooosTTTTTT", lab);   


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
      let images = [];
      let analyzes = [];
      let elementArrayAux = '';
      
      theLab.exams.map((exam, idx) => {
        if(exam !== 'Análise Clínica' && exam !== 'Imagem' && exam !== '') {          
          elementArrayAux = exam; 
        //  console.log("!!!!!!!!!!!!!!!!!!@@@@ auxiliar", elementArrayAux);
        }       
          
          if(exam === 'Análise Clínica') {
            console.log("Análise Clínica PUSHHH", exam);
            console.log("Análise Clínica PUSHHH", elementArrayAux);

              return analyzes.push(elementArrayAux);
           }

// CONTINUAR AKIIIIII FAZER DOIS ARRAYS SEPARADOS, UM PARA ANALISES E OUTRO PARA IMAGES
           
          if(exam === 'Imagem'){    
            console.log("IMAGEMMM PUSH", exam);             
            console.log("IMAGEMMM PUSH", elementArrayAux);                
           
              images.push(elementArrayAux);                  
         
          } 

       /* if( exam !== 'Análise Clínica' ){
          elementImage = exam;
       }
       if( exam !== 'Imagem'  ) elementAnalyze = exam;  
 */
     // console.log('%%%%%%%%%%%%%%%%55', elementArrayAux);


      //  if(idx % 2 !== 0){
         /*  if(exam === 'Imagem'){            
           return images.push(elementImage);
          }else if(exam === 'Análise Clínica') {
           return analyzes.push(elementAnalyze);
          } */
       // }
      });     

      console.log('%%%%%%%%%%%%%%%%55', theLab); 


      

      const filteredAnalyzes = analyzes.filter((exam, idx) => analyzes.indexOf(exam)  === idx);
      const filteredImages = images.filter((exam, idx) => images.indexOf(exam) === idx);
      


      console.log('IMAGES!!!!!!', filteredImages);
      console.log('ANALYZES!!!!!!!', filteredAnalyzes);
      
      
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
    .catch(error => {
      throw new Error(error); 
    });
});

module.exports = router;