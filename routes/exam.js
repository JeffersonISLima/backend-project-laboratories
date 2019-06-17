const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam.js');

/* Exam home */
router.get('/', (req, res, next) => {
  res.render('../views/exam/exams');
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
        res.redirect(`/exams/list-exams/?msg=O exame ${ nameExam.name } já existe.`);
        return;
      } else {
        const newExam = new Exam({
          name,
          type,
          status
        });
        newExam.save()
          .then((nameExam) => {
            res.redirect(`/exams/list-exams/?msg=Exame ${ nameExam.name } cadastrado com sucesso!`);
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
      res.render('../views/exam/list-exams', { exams: allExams } );
    })
    .catch((error) => {
      throw new Error(error);
    });
});




module.exports = router;