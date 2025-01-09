"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.getMovieById = exports.getAllMovies = void 0;
const db_1 = require("../db");
async function getAllMovies(req, res) {
    try {
        const [rows] = await db_1.pool.query('SELECT * FROM movies');
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des films', error });
    }
}
exports.getAllMovies = getAllMovies;
async function getMovieById(req, res) {
    const { id } = req.params;
    try {
        const [rows] = await db_1.pool.query('SELECT * FROM movies WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Film introuvable' });
        }
        res.json(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du film', error });
    }
}
exports.getMovieById = getMovieById;
async function createMovie(req, res) {
    const { title, director, notes, recommendationIndex } = req.body;
    try {
        const [result] = await db_1.pool.query('INSERT INTO movies (title, director, notes, recommendationIndex) VALUES (?, ?, ?, ?)', [title, director, notes, recommendationIndex]);
        res.status(201).json({ id: result.insertId, title, director, notes, recommendationIndex });
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du film', error });
    }
}
exports.createMovie = createMovie;
async function updateMovie(req, res) {
    const { id } = req.params;
    const { title, director, notes, recommendationIndex } = req.body;
    try {
        await db_1.pool.query('UPDATE movies SET title=?, director=?, notes=?, recommendationIndex=? WHERE id=?', [title, director, notes, recommendationIndex, id]);
        res.status(200).json({ id, title, director, notes, recommendationIndex });
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du film', error });
    }
}
exports.updateMovie = updateMovie;
async function deleteMovie(req, res) {
    const { id } = req.params;
    try {
        await db_1.pool.query('DELETE FROM movies WHERE id=?', [id]);
        res.status(200).json({ message: 'Film supprimé avec succès' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du film', error });
    }
}
exports.deleteMovie = deleteMovie;
