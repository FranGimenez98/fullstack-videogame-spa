const { Router } = require("express");
const { Genre } = require("../db");
const axios = require("axios")
const { API_KEY } = process.env;

require("dotenv").config();

const router = Router();

router.get("/", async (req, res, next) => {

  try {
    const genresDb = await Genre.findAll();
    //si no hay nada buscar en api y mapear para obtener el name
    if (!genresDb.length) {
      const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
      const genresMap = genresApi.data.results?.map((genre) => {
        return {
          name: genre.name
        };
      });
      //pasar el mapeo a genre
      const addGenres = await Genre.bulkCreate(genresMap);
      return res.status(200).send(addGenres);
    }else{
      return res.status(200).send(genresDb)
    }
  } catch (error) {
    next(error);
  }

    // try {
    //   const vgAPI = await axios.get(
    //       `https://api.rawg.io/api/genres?key=${API_KEY}`
    //   );
    //   // console.log("Soy vgAPI >>> ", vgAPI.data.results);

    //   const vg_genres = vgAPI.data.results;
    //   // console.log("Soy Genres >>> ", vg_genres);

    //   vg_genres.forEach(async (g) => {
    //       await Genre.findOrCreate({
    //           where: {
    //               name: g.name,
    //           },
    //       });
    //   });

    //   const allGenres = await Genre.findAll();

    //   // console.log("Soy AllGenres >>> ", allGenres);
    //   res.status(200).json(allGenres);
      
  // } catch (err) {
  //     return console.log(err);
  // }
});

// router.post("/", (req, res, next) => {
//   let { name } = req.body;

//   return Genre.create({ name })
//     .then((newGenre) => {
//       res.status(200).send(newGenre);
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

router.put("/", (req, res, next) => {
  res.send("put /genres");
});

router.delete("/", (req, res, next) => {
  res.send("delete /genres");
});

module.exports = router;
