const { Configuration, OpenAIApi } = require("openai");

class GPT {
  constructor(apiKey, basePath, model) {
    this.model = model
    this.configuration = new Configuration({apiKey: apiKey, basePath: basePath});
    this.api = new OpenAIApi(this.configuration);
  }
  async chatCompletion(messages) {
    try {
      let chatCompletion = await this.api.createChatCompletion({
        model: this.model, messages: messages})
      return chatCompletion.data.choices[0].message
    } catch {
      return undefined
    }
  }
}
module.exports = GPT;
