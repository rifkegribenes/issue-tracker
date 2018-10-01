/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;

const Models = require('../models');
const { Project, Issue } = Models;

module.exports = function (app) {
  
  const handleError = (res, err) => {
    return res.status(500).json({message: err});
  }

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      
    })
    
    .post((req, res) => {
      const name = req.params.project;
      Project.findOne({ name })
        .then((project) => {
          const newIssue = new Issue({
            issue_title: req.body.issue_title,
            issue_text: req.body.issue_text,
            created_on: new Date(),
            updated_on: new Date(),
            created_by: req.body.created_by,
            assigned_to: req.body.assigned_to || '',
            open: true,
            status_text: req.body.status_text || ''
          });
          if (!newIssue.issue_title || !newIssue.issue_text || !newIssue.created_by) {
              res.send('missing inputs');
            } else {
             if (!project) {
               const newProject = new Project({
                  name,
                  issues: [ newIssue ]
                });
               newProject.save()
                  .then((project) => {
                    const savedIssue = project.issues.find((issue) => issue.issue_title === newIssue.issue_title);
                    res.status(200).json({savedIssue});
                  })
                  .catch((err) => {
                    console.log(`api.js > post newProject.save: ${err}`);
                    return handleError(res, err);
                  });
              } else {
                project.issues.push(newIssue);
                project.save()
                  .then((project) => {
                    const savedIssue = project.issues.find((issue) => issue.issue_title === newIssue.issue_title);
                    res.status(200).json({savedIssue});
                  })
                  .catch((err) => {
                    console.log(`api.js > post existingProject.save: ${err}`);
                    return handleError(res, err);
                  });
              }
            }
          })
        .catch((err) => {
          console.log(`api.js > post Project.findOne: ${err}`);
          return handleError(res, err);
        });      
    })
    
    .put((req, res) => {
      const name = req.params.project;
      Project.findOne({ name })
      .then((project) => {
        if (!project) {
          res.send('project not found'
        }
      })
      .catch((err) => {
          console.log(`api.js > put Project.findOne: ${err}`);
          return handleError(res, err);
        }); 

      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
