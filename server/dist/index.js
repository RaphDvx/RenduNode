"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// server/src/index.ts
const express_1 = require("express");
const cors_1 = require("cors");
const body_parser_1 = require("body-parser");
const movie_routes_1 = require("./routes/movie.routes");
const app = (0, express_1.default)();
const PORT = 3000; // ou un autre port
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Routes
app.use('/api/movies', movie_routes_1.default);
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
