const connection = require("../database/connection");
const crypto = require("crypto");
const { Console } = require("console");

module.exports = {
  async create(request, response) {
    const { title, body, image } = request.body.post;
    const id = crypto.randomBytes(4).toString("HEX");

    await connection("posts").insert({
      id,
      title,
      body,
      image,
    });

    await connection("likes").insert({
      like: 0,
      post_id: id,
    });

    return response.json({ id });
  },

  async update(request, response) {
    const { id } = request.params;
    const { title, body, image } = request.body.post;

    await connection("posts").where("id", id).update({
      title,
      body,
      image,
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;

    await connection("posts").where("id", id).delete();
    await connection("likes").where("post_id", id).delete();

    return response.send();
  },

  async get(request, response) {
    const { id } = request.params;

    let post = await connection("posts").where("id", id);
    let likes = await connection("likes").where("post_id", id);

    likes = likes[0].like;

    post = {
      ...post[0],
      likes,
    };

    return response.json({ post });
  },

  async getAll(request, response) {
    let posts = [];
    const { page = 1 } = request.query;

    const [count] = await connection("posts").count();

    const rowData = await connection("posts");

    for (var i = 0; i < rowData.length; i++) {
      let likes = await connection("likes").where("post_id", rowData[i].id);
      likes = likes[0].like;
      let post = {
        ...rowData[i],
        likes,
      };
      posts.push(post);
    }
    response.header("X-total-count", count["count(*)"]);
    return response.json(posts);
  },
};
