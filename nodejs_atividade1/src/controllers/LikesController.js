const connection = require("../database/connection");

module.exports = {
  async update(request, response) {
    const { id } = request.body;

    let like = await connection("likes").where("post_id", id);
    like = like[0].like;

    like += 1;

    await connection("likes").where("post_id", id).update({
      like,
    });

    return response.json({ id });
  },
};
