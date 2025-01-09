import { Request, Response } from 'express';
import { pool } from '../db';
import { Movie } from '../models/movie.model';

export async function getAllMovies(req: Request, res: Response) {
    try {
        const result = await pool.query('SELECT * FROM movies');
        // result.rows : tableau des enregistrements
        const movies = result.rows.map((row) => ({
            ...row,
            watched: !!row.watched
        }));
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des films', error });
    }
}

export async function getWatchlist(req: Request, res: Response) {
    try {
        const result = await pool.query('SELECT * FROM movies WHERE watched = false');
        const movies = result.rows.map((row) => ({
            ...row,
            watched: !!row.watched
        }));
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la watchlist', error });
    }
}



export async function getMovieById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Film introuvable' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du film', error });
    }
}

export async function createMovie(req: Request, res: Response) {
    const { title, director, notes, recommendationIndex, watched }: Movie = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO movies (title, director, notes, "recommendationIndex", watched)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, title, director, notes, "recommendationIndex", watched`,
            [title, director, notes, recommendationIndex, watched]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du film', error });
    }
}

export async function updateMovie(req: Request, res: Response) {
    const { id } = req.params;
    const { title, director, notes, recommendationIndex, watched }: Movie = req.body;
    try {
        const result = await pool.query(
            `UPDATE movies
       SET title=$1, director=$2, notes=$3, "recommendationIndex"=$4, watched=$5
       WHERE id=$6
       RETURNING id, title, director, notes, "recommendationIndex", watched`,
            [title, director, notes, recommendationIndex, watched, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Film introuvable' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du film', error });
    }
}

export async function deleteMovie(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM movies WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Film introuvable' });
        }
        res.status(200).json({ message: 'Film supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du film', error });
    }
}