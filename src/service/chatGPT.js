import axios from "axios";
import getTokenOpenAI from "../hooks/getTokenOpenAI";

export default async function chatGPT(msg) {
  return new Promise(async(resolve, reject) => {

    getTokenOpenAI().then(async (token) => {

      const url = 'https://api.openai.com/v1/chat/completions'
      let axiosHeader = {headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }}
  
      await axios.post(url, {
        model: "gpt-3.5-turbo-0125",
        messages: [
          {
            role: 'assistant',
            content: msg
          }
        ]
      }, axiosHeader)
      .then((res) => {
        resolve(res.data.choices[0].message.content)
      })
      .catch((e) => {
        console.log(`ERRO na chamada da API OPENIA\n\nERRO:\n${e}`)
      })
    })
  })
}
