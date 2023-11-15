const router = require('express').Router();
const facts_db = require('../models/factsdb');
// const GPT = new GPT_model("", "https://free.churchless.tech/v1/", "gpt-3.5-turbo");
const FactsDB = new facts_db();

module.exports = function () {
  router.get("/get_random_fact", async (req, res) => {
    let fact = await FactsDB.get_random_fact()
    res.status(200)
    res.send({status: "ok", data: fact})
  });
  return router;
}
