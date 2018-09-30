/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

const Issue = require('../models/issue');

const CONNECTION_STRING = process.env.DB; 

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      
    })
    
    .post((req, res) => {
      const project = req.params.project;
      const issue = {
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_on: new Date(),
        updated_on: new Date(),
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to || '',
        open: true,
        status_text: req.body.status_text || ''
      };
      if (!issue.issue_title || !issue.issue_text || !issue.created_by) {
        res.send('missing inputs');
      } else {
        MongoClient.connect(CONNECTION_STRING, (err, db) => {
          const collection = db.collection(project);
          collection.insertOne(issue, (err,doc) => {
            issue._id = doc.insertedId;
            res.json(issue);
          });
        });
      }
    })
    
    .put((req, res) => {
      const project = req.params.project;

      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
