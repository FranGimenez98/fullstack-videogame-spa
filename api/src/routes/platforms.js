const { Router } = require("express");
const { Platform } = require('../db') 
const axios = require("axios")
const { API_KEY } = process.env;

require("dotenv").config();

const router = Router();

router.get("/", async(req, res, next)  => {
    try{
        const platformsDb = await Platform.findAll();
        //si no hay platform buscar en api y mapear para obtener el name buscado
        if(!platformsDb.length){
            const platformsApi = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
            const platformsMap = platformsApi.data.results?.map((platforms) => {
                return{
                    id: platforms.id,
                    name: platforms.name,
                }
            })
            //pasar el mapeo a platform
            const addPlatforms = await Platform.bulkCreate(platformsMap);
            return res.status(200).json(addPlatforms)
        }
        else{
            return res.status(200).json(platformsDb)
        }
    } catch(error){
        next(new Error(`Error ${error.message}`))
    }

    // try {
        
    //     const platformsAPI = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
    //     // console.log("Soy platformsAPI >>> ", platformsAPI.data.results);

    //     const platforms = platformsAPI.data.results;
    //     platforms.forEach(async (p) => {
    //         await Platform.findOrCreate({
    //             where: {
    //                 name: p.name,
    //             },
    //         });
    //     });

    //     const platformDB = await Platform.findAll();

    //     // console.log("Soy platformDB >>> ", platformDB);
    //     res.status(200).json(platformDB);

    // } catch (error) {
    //     console.log(error)
    // }
})

module.exports = router