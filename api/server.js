// BUILD YOUR SERVER HERE
const express = require("express");
const data = require("./users/model.js");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello from the server");
});

server.get("/api/users", (req, res) => {
  data
    .find()
    .then((data) => res.status(200).json(data))
    .catch(() =>
      res.status(500).json({ message: "Error recieving users from database" })
    );
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  data
    .findById(id)
    .then((user) => {
      user
        ? res.status(200).json(user)
        : res.status(404).json({ message: "does not exist" });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

server.post("/api/users", (req, res) => {
  const user = req.body;

  if (!user.name || !user.bio) {
    res.status(400).json({ message: "provide name and bio" });
  } else {
    data
      .insert(user)
      .then((newUser) => res.status(201).json(newUser))
      .catch(() =>
        res
          .status(500)
          .json({
            message: "There was an error saving the user to the database",
          })
      );
  }

  server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
    data
      .remove(id)
      .then((deletedUser) => {
        deletedUser
          ? res.status(200).json(deletedUser)
          : res.status(404).json({ message: "does not exist" });
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  });
  // used async await here for practice
  server.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    if (!changes.name || !changes.bio) {
      res.status(400).json({ message: "provide name and bio" });
    } else {
      data
        .update(id, changes)
        .then((user) => {
          user
            ? res.status(201).json(user)
            : res.status(404).json({ message: "does not exist" });
        })
        .catch((error) => res.status(500).json({ error: error.message }));
    }
  });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
