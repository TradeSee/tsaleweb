import {database, auth} from '../database/config'

export default async function getCompanyInfo() {
    return new Promise(async(resolve, reject) => {

        var user = auth.currentUser;
        if (user) {
            var uid = user.uid;
            await database.ref("Users").child(uid).child("Company").once("value", (snapshot) => {                
                /**
                 * @param coporateName Nome da Empresa
                 * @param address Endereço
                 * @param idNumber Número de identificação unico da empresa
                 * @param companyN País da Empresa
                 * @param activity Supplier, Buyer ou Supplyer & Buyer
                 * @param site Site da empresa
                 * @param email Site da empresa
                 * @param contact Site da empresa
                 */


                if(snapshot.val()) {                   
                    resolve({
                        coporateName: snapshot.val().coporateName ? snapshot.val().coporateName : '',
                        address: snapshot.val().address ? snapshot.val().address : '',
                        idNumber: snapshot.val().idNumber ? snapshot.val().idNumber : '',
                        companyN: snapshot.val().companyN ? snapshot.val().companyN : '',
                        activity: snapshot.val().activity ? snapshot.val().activity : '',
                        site: snapshot.val().site ? snapshot.val().site : '',                   
                        contacts: snapshot.val().contacts ? snapshot.val().contacts : [],
                        product: snapshot.val().product ? snapshot.val().product : "",
                    })
                } else {
                    resolve({})
                }

   
                
                

            });            
        } else {
            console.log('Não há usuário autenticado atualmente.');
        }        
    })
}
