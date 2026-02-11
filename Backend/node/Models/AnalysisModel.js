const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
    { 
        userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    role : String, 
    atsScore: Number,
    matchedSkills: [String],
    missingSkills: [String],
    strengths: [String],
    weaknesses: [String],
    recommendations: [String] 

    }  , 
    
     {
        timestamps : true 
    } 
)

const Analysis = mongoose.model("Analysis", analysisSchema) ;
module.exports = Analysis ;
