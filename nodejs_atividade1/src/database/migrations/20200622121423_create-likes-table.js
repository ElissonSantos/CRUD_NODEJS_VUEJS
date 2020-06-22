exports.up = function (knex) {
  return knex.schema.createTable("likes", function (table) {
    table.increments();

    table.decimal("like").notNullable();

    table.string("post_id").notNullable();

    table.foreign("post_id").references("id").inTable("posts");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("likes");
};
