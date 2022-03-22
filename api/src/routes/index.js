const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videgamesRoute = require('./videogames');
const genresRoute = require('./genres');
const platformsRoute = require('./platforms')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//Middlewares
router.use('/videogames', videgamesRoute);
router.use('/genres', genresRoute);
router.use('/platforms', platformsRoute);

module.exports = router;
