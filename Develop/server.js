const express = require("express");
const util = require("util");
const path = require("path");
const fs = require("fs");
const uuid = require("uniqid");

const PORT = process.env.PORT || 3004;

const app = express();

// mildway
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// app.get("/", (req, res) => res.send("Navigate to /send or /routes"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET Route for feedback page
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// const readFromFile = util.promisify(fs.readFile);

// const writeToFile = (destination, content) =>
//   fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
//     err ? console.error(err) : console.info(`\nData written to ${destination}`)
//   );

// route for note
app.get("/api/notes", (req, res) => {
  //   console.info(`${req.method} request received for tips`);
  fs.readFile("./db/db.json", "utf8", (err, data));
  res.json(JSON.parse(data));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
