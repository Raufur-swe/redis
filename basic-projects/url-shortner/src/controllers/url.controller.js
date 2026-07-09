import shortid from "shortid";
import Url from "../models/url.models.js";
import redisCLient from "../config/redis.js";

// create url
export const createShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({
                success: false,
                message: "Orginal Url required"
            })
        }

        const shortCode = shortid.generate();

        const newUrl = await Url.create({
            originalUrl,
            shortCode,
        });

        res.status(201).json({
            success: true,
            message: "short url create successfully",
            data: newUrl
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

// redis shortid save
export const redirectUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        // cache key

        const cacheKey = `url:${shortCode}`;

        // 1st redis will find
        const cacheUrl = await redisCLient.get(cacheKey)

        if (cacheUrl) {
            // live update in db
            await Url.findOneAndUpdate(
                { shortCode },
                { $inc: { totalvisits: 1 } }
            )
            // Cached URL  redirect
            return res.redirect(cacheUrl)
        }

        // if not in redis find in db
        const url = await Url.findOne({ shortCode });

        // if !url

        if (!url) {
            return res.status(404).json({
                success: false,
                message: "no short id found"
            })
        }

        // update the count in db
        url.totalvisits +=  1;
        await url.save()

        //cache in redis for 10 min
        await redisCLient.setEx(
            cacheKey,
            600, // 600 sec = 10 min
            url.originalUrl,
        )

        return res.redirect(url.originalUrl)
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}