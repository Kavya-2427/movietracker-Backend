const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const auth = require("../middleware/auth");

const prisma = new PrismaClient();

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

/* =========================
   ADD MOVIE
========================= */
router.post("/", auth, upload.single("poster"), async (req, res) => {
  try {
    const { title, genre, rating, status } = req.body;
    const posterFile = req.file ? req.file.filename : null;

    const movie = await prisma.movie.create({
      data: {
        title,
        genre,
        rating: Number(rating),
        status,
        poster: posterFile,
        user: {
          connect: { id: req.user.userId }  // 🔥 VERY IMPORTANT
        }
      }
    });

    res.json(movie);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Movie not created" });
  }
});

/* =========================
   GET ALL MOVIES
========================= */
router.get("/", auth, async (req, res) => {
  const { search, genre } = req.query;

  const movies = await prisma.movie.findMany({
    where: {
      userId: req.user.id,
      title: search
        ? { contains: search, mode: "insensitive" }
        : undefined,
      genre: genre || undefined,
    },
  });

  res.json(movies);
});
/* =========================
   UPDATE MOVIE
========================= */
router.put("/:id", auth,upload.single("poster"), async (req, res) => {
  try {
    const { title, genre, rating, status } = req.body;
    const { id } = req.params;

    const updateData = {
      title,
      genre,
      rating: Number(rating),
      status,
    };

    if (req.file) {
      updateData.poster = req.file.filename;
    }

    const movie = await prisma.movie.updateMany({
  where: {
    id: Number(id),
    userId: req.user.id,
  },
  data: updateData,
});

    res.json(movie);
  } catch (err) {
    console.log(err);   // 🔥 IMPORTANT
    res.status(500).json({ error: "Update failed" });
  }
});

/* =========================
   DELETE MOVIE
========================= */
router.delete("/:id",auth, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.movie.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;