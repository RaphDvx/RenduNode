"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// server/src/routes/movie.routes.ts
const express_1 = require("express");
const movie_controller_1 = require("../controllers/movie.controller");
const router = (0, express_1.Router)();
router.get('/', movie_controller_1.getAllMovies);
router.get('/:id', movie_controller_1.getMovieById);
router.post('/', movie_controller_1.createMovie);
router.put('/:id', movie_controller_1.updateMovie);
router.delete('/:id', movie_controller_1.deleteMovie);
exports.default = router;
