const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam.js');

/* Exam home */
router.get('/', (req, res, next) => {
  res.render('../views/exam/exams', { msgSuccess: req.query.msgSuccess });
})

/* Register a new exam */
router.get('/new-exam', (req, res, next) => {
  res.render('../views/exam/new-exam');
});

router.post('/new-exam', (req, res, next) => {
  const { name, type, status } = req.body;
  Exam.findOne({ name })
    .then( nameExam => {
      if( nameExam !== null){
        res.redirect(`/exams/list-exams/?msgFailure=O exame "${ nameExam.name }" já existe.`);
        return;
      } else {
        const newExam = new Exam({
          name,
          type,
          status
        });
        newExam.save()
          .then((nameExam) => {
            res.redirect(`/exams/list-exams/?msgSuccess=Exame "${ nameExam.name }" cadastrado com sucesso!`);
          })
          .catch((error) => {
            throw new Error(error);
          });
      }
    })
    .catch( error => {
      throw new Error(error);
    });
});

/* List all exams */
router.get('/list-exams', (req, res, next) => {
  Exam.find()
    .then((allExams) => {
      res.render('../views/exam/list-exams', { 
        exams: allExams,
        msgFailure: req.query.msgFailure,
        msgSuccess: req.query.msgSuccess
       });
    })
    .catch((error) => {
      throw new Error(error);
    });
});

/* Details a exam */
router.get('/details/:id', (req, res, next) => {
  Exam.findOne({
    '_id': req.params.id
  })
  .then( (theExam) => {
    res.render('../views/exam/exam-details', { exam: theExam });
  })
  .catch( (error) => {
    throw new Error(error);
  });
});

/* Exam edit */
router.get('/edit-exam/:id', (req, res, next) => {
  Exam.findOne({
    '_id': req.params.id
  })
    .then( (theExam) => {
      res.render('../views/exam/edit-exam', { exam: theExam });
    })
    .catch( (error) => {
      throw new Error(error);
    });
});

router.post('/edit-exam/:id', (req, res, next) => {
  Exam.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then( (exam) => {
      res.redirect(`/exams/list-exams/?msgSuccess=Exame "${ exam.name }" atualizado com sucesso!`);
    })
    .catch( (error) => {
      throw new Error(error);
    });
});

/* Exam delete */
router.get('/delete/:id',(req, res, next) => {
  Exam.findByIdAndDelete(req.params.id)
    .then( (exam) => {
      res.redirect(`/exams/?msgSuccess=Exame ${ exam.name } deletado com sucesso!`);
    })
    .catch((error) => {
      throw new Error(error);
    });
}); 

module.exports = router;