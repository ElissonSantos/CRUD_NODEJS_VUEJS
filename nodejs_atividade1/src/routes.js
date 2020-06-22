const express = require("express");

const PostsController = require("./controllers/PostsController");
const LikesController = require("./controllers/LikesController");

const routes = express.Router();

routes.post("/posts", PostsController.create);
routes.put("/posts/:id", PostsController.update);
routes.delete("/posts/:id", PostsController.delete);
routes.get("/posts/:id", PostsController.get);
routes.get("/posts", PostsController.getAll);

routes.put("/likes", LikesController.update);

module.exports = routes;
