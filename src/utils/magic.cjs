const dotenv = require("dotenv");
dotenv.config();
const { Magic } = require("@magic-sdk/admin");

let magic;

try {
  console.log(process.env.MAGIC_SECRET_KEY);
  magic = new Magic(process.env.MAGIC_SECRET_KEY);
  console.log(magic);
} catch (error) {
  console.error("❌ Error inside magic init:", error);
  throw error;
}

module.exports = magic;
