const express = require('express');

const Students = require('./students-model');
const { genericError } = require('../helpers/helpers');

const router = express.Router();

router.get('/', (req, res) => {
  Students.find()
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => genericError(err, req, res));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Students.findById(id)
    .then(student => {
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(401).json({
          message: `There is no student with an id of ${id}.`,
        });
      }
    })
    .catch(err => genericError(err, req, res));
});

router.get('/:id/projects', (req, res) => {
  const { id } = req.params;

  Students.findProjectsById(id)
    .then(projects => {
      if (projects && projects.length > 0) {
        res.status(200).json(projects);
      } else {
        res.status(401).json({
          messages: `There are no projects associated with the student id ${id}.`,
        });
      }
    })
    .catch(err => genericError(err, req, res));
});

router.post('/', (req, res) => {
  Students.add(req.body)
    .then(student => {
      res.status(201).json({
        message: 'Successfully created student!',
        student,
      });
    })
    .catch(err => genericError(err, req, res));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Students.remove(id)
    .then(student => {
      if (student) {
        res.status(200).json({
          message: `Successfully deleted student with id of ${id}!`,
          student,
        });
      } else {
        res.status(401).json({
          message: `There is no student with an id of ${id}`,
        });
      }
    })
    .catch(err => genericError(err, res, req));
})

module.exports = router;