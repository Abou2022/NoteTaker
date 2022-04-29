const express = require("express");
// const util = require("util");
const path = require("path");
const fs = require("fs");
const uuid = require("uniqid");

//run with heroku
const PORT = process.env.PORT || 3004;

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware static from public
app.use(express.static("public"));

// `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
  //   console.info(`${req.method} request received for tips`);
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    res.json(JSON.parse(data));
  });
});
// `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file
app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    const notes = JSON.parse(data);
    req.body["uuid"] = uuid();
    notes.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      res.json(req.body);
    });
  });
});

// `GET /notes` should return the `notes.html` file.
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

//  `GET *` should return the `index.html` file.
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
