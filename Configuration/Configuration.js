const { OpenAI } = require("openai");
const config = require("../utlis/config");

const openai = new OpenAI({
  apiKey: config.APIKEY,
});

module.exports = openai;
