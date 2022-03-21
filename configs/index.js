const { join } = require("path");
const env = require("dotenv");

env.config({ path: join(__dirname, "..", ".env") });

module.exports = {
  PORT: process.env.PORT || 3000,
  token: "rB5JLfZ6TJyJYl84gjlM69A3VdBasbnhfOB4VlKY",
  mongo: {
    uri: `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`,
  },
};
