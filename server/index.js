import express from "express";
import axios from "axios";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "../client"))); // Serve static files
app.set("views", path.join(__dirname, "../client/views"));
app.set("view engine", "ejs");

// Route to handle category-based emoji requests
app.get("/emojis", async (req, res) => {
    const category = req.query.category;
    try {
        const result = await axios.get("https://emojihub.yurace.pro/api/all");
        const emojis = result.data.filter(emoji => emoji.category.replace(/\s+/g, '-').toLowerCase() === category);
        res.json(emojis);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching emojis");
    }
});

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000, () => {
    console.log("Server started at Port 3000");
});
