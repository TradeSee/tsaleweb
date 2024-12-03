export default function constructorEmail(name, country, count) {
    
    //Gere 50 possíveis endereços e-mails comercial usando como base o domínio o nome a seguir: T-Sale Metals LLC. E deve atender padrões interacional ou do Brasil. Retorne em forma de array.
    //Lista de endereço de Emails empresarial
    const promptBussines = `Generate ${count} possible commercial email addresses using the following domain name as a base: ${name}. And it must meet international or ${country} standards. Return in array form.`

    //Gere 50 possíveis endereços e-mails comuns com provedores populares tendo como base nome a seguir: T-Sale Metals LLC. E deve atender padrões interacional ou do Brasil. Retorne em forma de array.
    //Lisyta de endereço de Emails populares
    const promptPopular = `Generate ${count} possible common email addresses with popular providers based on the following name: ${name}. And it must meet international or ${country} standards. Return in array form.`

    let arrayMail = [];

    chatGPT(promptBussines).then(resp1 => {
        let arrayBusiness = resp1;
        console.log(arrayBusiness)
        if(arrayBusiness.length > 0) {        
            chatGPT(promptPopular).then(resp2 => {
                let arrayPopular = resp2;
                if(arrayPopular.length) {
                    arrayMail = arrayBusiness.concat(arrayPopular)
                }
            })
        } 
    })

    return arrayMail
}