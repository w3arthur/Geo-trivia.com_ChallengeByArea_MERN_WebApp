const languageArray = ['english', 'hebrew', 'russian'];

const {mongoose, mongoose1, schemaVersion} = require("../connection");

 
const UserSchema =  new mongoose.Schema({
  schemaVersion: schemaVersion
  , name: { type: String, trim: true,  minlength: 4, maxlength: 50, index: true }
  , email: { unique: true, require: true, type: String, trim: true, index: true  }
  , image: { type: String, trim: true }
  , password: { type: String, trim: true}
  , role: { type: [Number], default: [1000], index: true }
  , age: { type: Number, require: true, index: true, min: 4, max: 120 }
  , language: { type: String, enum: languageArray, trim: true, default: 'english', index: true }
  , location: {
    type: { type: String , enum: ['Point'] , default: 'Point' }
    , coordinates: { type: [Number] }
  }
  , currentQuestion: { type: Number, default: -1, index: true }
  , answeredQuestions: { type: Number, index: true }
  , totalScore: { type: Number, index: true }
  
})
UserSchema.index({location: '2dsphere'});

const UserModel = mongoose1.model(
  "User"  //users
  , UserSchema
);

module.exports = UserModel;