exports.up = function (knex) {
  return knex.schema.createTable("posts", function (table) {
    table.string("id").primary();
    table.string("title").notNullable();
    table.string("body").notNullable();
    table.string("image").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
