import {database, auth} from '../database/config'

export default async function updateCompanyInfo(data) {
    return new Promise(async(resolve, reject) => {
        var user = auth.currentUser;
        if (user) {
            var uid = user.uid;
            await database.ref("Users").child(uid).child('Company').update({
                coporateName: data.coporateName,
                address: data.address,
                idNumber: data.idNumber,
                companyN: data.companyN,
                activity: data.activity,
                site: data.site,
                contacts: data.contacts,
                product: data.product
            })
            .then((resp) => {
                resolve(resp)
            })
            .catch((err) => {
                reject(err)
            }) 
        } else {
            console.log('Não há usuário autenticado atualmente.');
        }        
    })
}
