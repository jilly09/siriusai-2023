const router = require('express').Router();
const GPT_model = require('../models/gpt');
// const GPT = new GPT_model("", "https://free.churchless.tech/v1/", "gpt-3.5-turbo");
const GPT = new GPT_model(
  process.env.apiKey,
  process.env.basePath,
  process.env.model
);

module.exports = function () {
  router.post("/generate_image", async (req, res) => {
    let answer = await GPT.chatCompletion([role: "system",
    `You are prompt generator for an image generator AI.
Check the idea of image for inappropriate content for kids.
If an idea is inappropriate, then answer "Error: Incorrect image".
If not, answer with effective prompt (maxumim - 200 characters) in english, based on the idea for image generator.
The idea: "${AI.req.body.image_idea}"`])
    if (answer) {
      if (answer.indexOf("Error: Incorrect image") == -1) {
        axios.post('https://api.stability.ai/v1/generation/stable-diffusion-v1-5/text-to-image',
        {steps: 30, width: 512, height: 512, seed:0,
          cfg_scale:5, samples:1, text_prompts:[{"text": answer}]})
        .then(function (response) {
          res.status(200)
          res.send({status: "ok", image: response.artifacts[0].base64})
        })
      } else {
        res.status(401)
        res.send({status: "error", data: "Incorrect prompt"})
      }
    }
  });
  return router;
}
