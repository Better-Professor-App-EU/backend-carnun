const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.find() 
    .then(projects => {
      if (projects && projects.length > 0) {
        return projects;
      } else {
        res.status(401).json({
          message: 'There are no projects in the database.'
        });
      }
    })
    .then(projects => {
      Projects.findDeadlines()
        .then(deadlines => {
          if (deadlines && deadlines.length > 0) {
            const projectsWithDeadlines = projects.map(project => {
              const relevantDeadlines = deadlines.filter(deadline => project.id === deadline.project_id);
              return {
                ...project,
                deadlines: relevantDeadlines.map(deadline => {
                  return { deadline_type: deadline.deadline_type, deadline: deadline.deadline };
                })
              }
            });

            res.status(200).json(projectsWithDeadlines);
          }
        })
        .catch(err => {
          res.status(401).json({
            message: `Failed to Projects.findDeadlines() in GET /projects: ${err.message}`,
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        message: `Failed to Projects.find() in GET /projects: ${err.message}`,
      });
    });
});

module.exports = router;