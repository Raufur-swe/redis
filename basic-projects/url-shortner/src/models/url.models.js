import mongoose from "mongoose";


const urlSchema = new mongoose.Schema({
    originalUrl :{
        type : String ,
        required : [true , " Orginal Link is required"],
        trim : true,
    },

    shortCode:{
        type : String ,
        required :[true ,"short code requirde"],
        unique : true ,
        trim : true ,
        index : true ,
    },
    totalvisits : {
        type : Number,
        default : 0,
        min : 0,
    },
},{timestamps : true})

const Url = mongoose.model("Url" , urlSchema);
export default Url;