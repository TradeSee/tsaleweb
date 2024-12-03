import {database} from '../database/config'

export default async function getTokenOpenAI() {
    return new Promise(async(resolve, reject) => {
        await database.ref("T-API").child('key').once("value", (snapshot) => {
            resolve(snapshot.val().openai)        
        })
        .catch(err => {
            reject('Erro Firebase: ', err)
        })
    })
}
