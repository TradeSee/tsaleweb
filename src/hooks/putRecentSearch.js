import {auth, database} from '../database/config'
import getRecentSearch from './getRecentSearch';

export default async function putRecentSearch(obj) {
    const user = auth.currentUser;
    const uid = user.uid;

    getRecentSearch().then(resp => {
        // Adiciona o novo objeto na primeira posição
        let arrayDeObjetos = resp;
        arrayDeObjetos.unshift(obj);

        for(var i=1; i<arrayDeObjetos.length; i++) {
            arrayDeObjetos[i].rank += 1
        }

        if (arrayDeObjetos.length > 3) {
            arrayDeObjetos.pop();
        }    

       arrayDeObjetos.forEach(async(element) => {           
           await database.ref("Users").child(uid).child('RecentSearch').child(element.rank).update({
               key: element.key,
               route: element.route,
               title: element.title
           })
       });

        
    })
    .catch(async(e) => {
        await database.ref("Users").child(uid).child('RecentSearch').child("1").update({
            key: obj.key,
            route: obj.route,
            title: obj.title
        })
    })

      
}
