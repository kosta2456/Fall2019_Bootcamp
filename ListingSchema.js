/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema for the data in the listings.json file that will define how data is saved in your database
     See https://mongoosejs.com/docs/guide.html for examples for creating schemas
     See also https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
  */
var Schemalisting = new Schema({
  /* Your code for a schema here */ 
  //Check out - https://mongoosejs.com/docs/guide.html
  code:{type: String, required: true, unique: true},
  name:{type: String, required: true},

  coordinates:{

    latidude: Number,
    longitude: Number,
  },

  address: String,
  created_at: Date,
  updated_at: Date,

});

/* Create a 'pre' function that adds the updated_at (and created_at if not already there) property 
   See https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
*/
Schemalisting.pre('save', function(next) {
  var date = new Date(); // Pulls the current date
  this.updated_at = date;

  if(!this.created_at) // If created at is not defined then it was created in this instance
    this.created_at = date;

  next();

});

/* Use your schema to instantiate a Mongoose model */
//Check out - https://mongoosejs.com/docs/guide.html#models
var newListing = mongoose.model('Listing', Schemalisting);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = newListing;

