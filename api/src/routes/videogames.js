const { Router } = require("express");
const { Videogame, Genre, Platform } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
const router = Router();
const { Op, where, include } = require("sequelize");

require("dotenv").config();

router.get("/", (req, res, next) => {
  let name = req.query.search;
  let videgamesApi;
  let videogamesDb;

  if (name) {
    videgamesApi = axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
    );
    videogamesDb = Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
      include: [{ model: Genre }, { model: Platform }],
    });
  } else {
    videgamesApi = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    videogamesDb = Videogame.findAll({
      include: [{ model: Genre }, { model: Platform }],
    });
  }
  //   let videgamesApi = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
  //   let videogamesDb = Videogame.findAll({
  //
  //     raw: true,
  //     nest: true,
  //   });
  Promise.all([videgamesApi, videogamesDb])
    .then((response) => {
      const [videogameApi, videogamesDb] = response;

      //mapear resultados necesarios
      let filteredVideogames = videogameApi.data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          description: game.description,
          release: game.released,
          rating: game.rating,
          // platforms: game.platforms?.map((platforms) => platforms.platform.name),
          platforms: game.platforms?.map((platform) => platform.platform),
          genres: game.genres?.map((genre) => genre),
          image: game.background_image,
        };
      });
      let allVideogames = [...filteredVideogames, ...videogamesDb];
      res.status(200).send(allVideogames);
    })
    .catch((error) => {
      next(error);
    });
});

// router.post("/", async (req, res, next) => {

//   try{
//     let { name, description, release, rating, platforms, genres, image } = req.body;

//     let newVideogame = await Videogame.create({
//       name,
//       description,
//       release,
//       rating,
//       image,
//       platforms,
//     })
//     // let dbGenre = await Genre.findAll({
//     //   where: {name: genres},
//     // })
//     // console.log(where)
//     // newVideogame.addGenre(dbGenre)
//     if(genres){
//       const genresDb = await Genre.findAll({
//         where: {
//           name: genres,
//         },
//         attributes: ['id'],
//       })
//       newVideogame.addGenre(genresDb)
//     }
//     return res.status(200).send(newVideogame)

//     // for(i of genres){
//     //   const dbGenre = await Genre.findOne({
//     //     where: {
//     //       name: i,
//     //     }
//     //   })
//     //   console.log(dbGenre)
//     // }

//     // for(i of platforms){
//     //   const dbPlatform = await Platform.findOne({
//     //     where: {
//     //       name: i,
//     //     }
//     //   })
//     //   console.log(dbPlatform)
//     // }

//     res.status(200).send(newVideogame)
//   } catch(error){
//     next(error).send("ERROR: ", console.log(error))
//   }
// });

router.post("/", async (req, res, next) => {
  const { name, image, description, release, rating, platforms, genres } =
    req.body;
  try {
    const videogame = await Videogame.create({
      name,
      image,
      description,
      release,
      rating,
    });

    let genreDB = await Genre.findAll({
      where: { name: genres },
    });

    let platformDB = await Platform.findAll({
      where: { name: platforms },
    });
    console.log(platformDB);

    videogame.addGenre(genreDB);
    videogame.addPlatform(platformDB);

    return res.status(200).json(videogame);
  } catch (error) {
    next(error);
  }

  // const { name, image, description, release, rating, platforms, genres } = req.body;
  // return Videogame.create({
  //   name,
  //   image,
  //   description,
  //   release,
  //   rating,
  // })
  // .then()

});

router.get("/:id", async (req, res, next) => {
  // try {
  //   const id = req.params.id;
  //   let videogame;
  //   //buscar id creado en db
  //   if (typeof id === "string" && id.length > 10) {
  //     videogame = await Videogame.findByPk(id);
  //     res.status(200).send(videogame);
  //   } else {
  //     //buscar id en api
  //     let response = await axios.get(
  //       `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
  //     );
  //     videogame = response.data;
  //     res.status(200).send(videogame);
  //   }
  // } catch (error) {
  //   next(error);
  // }

  try{
    const {id} = req.params;
    if(id.includes('-')){
      const gameDb = await Videogame.findOne({
        where: {id},
        include: [Genre,Platform]
      });
      return res.status(200).json(gameDb)
    }else{
      const gameApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      return res.status(200).json(gameApi.data)
    }
  }catch(error){
    next(error)
  }
});

router.put("/", (req, res, next) => {
  res.send("put /videogames");
});

router.delete("/", (req, res, next) => {
  res.send("delete /videogames");
});

module.exports = router;
