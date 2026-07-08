import shortid from "shortid";
import Url from "../models/url.models.js";


export const createShortUrl = async(req , res)=>{
    try {
        const{orginalUrl} = req.body;

        if(!orginalUrl){
            return res.status(400).json({
                success : false,
                message : "Orginal Url required"
            })
        }

        const shortCode = shortid.generate() ;

        const newUrl =  await Url.create({
            orginalUrl,
            shortCode,
        });

        res.status(201).json({
            success : true ,
            message : "short url create successfully",
            data : newUrl
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}