// 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

const { Configuration, OpenAIApi } = require( "openai");
const configuration = new Configuration({
    organization: "org-8lTghmp1h5Xh1OdenWJ8EhNn",
    apiKey:  "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();



async function callApi (){
    const response = await openai.createCompletion({
        "model": "text-davinci-003",
        "prompt": "Say this is a test",
        "max_tokens": 7,
        "temperature": 0
      });

      console.log(response.data.choices[0].text)
}
 callApi ()