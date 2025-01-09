import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import movieRoutes from './routes/movieRoutes';

const app = express();
const PORT = 3000; // ou un autre port

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/movies', movieRoutes);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
