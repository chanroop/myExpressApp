import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const planetNames = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune"
];

const allPlanets = {
  Mercury: {
    planetName: "Mercury",
    moons: 0,
    radius: "2,439.7 km",
    distanceFromSun: "57.9 million km",
    dayLength: "58.6 Earth days",
    yearLength: "88 Earth days",
    color: "Gray"
  },
  Venus: {
    planetName: "Venus",
    moons: 0,
    radius: "6,051.8 km",
    distanceFromSun: "108.2 million km",
    dayLength: "243 Earth days",
    yearLength: "225 Earth days",
    color: "Yellowish-white"
  },
  Earth: {
    planetName: "Earth",
    moons: 1,
    radius: "6,371 km",
    distanceFromSun: "149.6 million km",
    dayLength: "24 hours",
    yearLength: "365 days",
    color: "Blue and green"
  },
  Mars: {
    planetName: "Mars",
    moons: 2,
    radius: "3,389.5 km",
    distanceFromSun: "227.9 million km",
    dayLength: "24.6 hours",
    yearLength: "687 days",
    color: "Red"
  },
  Jupiter: {
    planetName: "Jupiter",
    moons: 95,
    radius: "69,911 km",
    distanceFromSun: "778.5 million km",
    dayLength: "9.9 hours",
    yearLength: "11.86 Earth years",
    color: "Brown and white"
  },
  Saturn: {
    planetName: "Saturn",
    moons: 146,
    radius: "58,232 km",
    distanceFromSun: "1.43 billion km",
    dayLength: "10.7 hours",
    yearLength: "29.45 Earth years",
    color: "Pale gold"
  },
  Uranus: {
    planetName: "Uranus",
    moons: 27,
    radius: "25,362 km",
    distanceFromSun: "2.87 billion km",
    dayLength: "17.2 hours",
    yearLength: "84 Earth years",
    color: "Light blue"
  },
  Neptune: {
    planetName: "Neptune",
    moons: 14,
    radius: "24,622 km",
    distanceFromSun: "4.50 billion km",
    dayLength: "16.1 hours",
    yearLength: "164.8 Earth years",
    color: "Deep blue"
  }
};

app.get("/", (req, res) => {
  const randomNum = Math.floor(Math.random() * 3) + 1;
  const randomImage = `/images/bg${randomNum}.jpg`;

  res.render("index", {
    planetNames,
    backgroundImage: randomImage
  });
});

app.get("/planet", (req, res) => {
  const planetName = req.query.planetName;
  const planetInfo = allPlanets[planetName];

  if (!planetInfo) {
    return res.send("Planet not found");
  }

  res.render("planet", {
    planetInfo,
    planetNames
  });
});

app.get("/nasa", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=2026-03-21"
    );

    const nasaData = await response.json();

    res.render("nasa", {
      nasaData,
      planetNames
    });
  } catch (error) {
    res.send("Error retrieving NASA data");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});