import chatGPT from "../../../../service/chatGPT";

export default function constructorDomain(name, country, count) {
    return new Promise((resolve, reject) => {
        //Gere 50 possíveis endereços de dominio usando como base o nome a seguir: T-Sale Metals LLC. E deve atender padrões interacional ou do Brasil. Retorne em forma de array.
        //Lista de dominios
        const promptDomain = `Gere ${count} possíveis endereços de dominio usando como base o nome a seguir: ${name}. E deve atender padrões interacional ou do ${country}. Retorne em forma de array.`
        const promptListToArray = "Converta a lista a seguir em um array:\n\n"
    
        chatGPT(promptDomain).then(resp1 => {
            let arrayDomain = resp1;

            console.log('MAIl-IA')
            console.log(arrayDomain)
            if(arrayDomain.length > 0) {
                resolve(resp1)
            } else {
                chatGPT(promptListToArray+resp1).then(resp2 => {
                    resolve(resp2)
                })
            }       
        })
    })
    
}