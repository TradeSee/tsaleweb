import {database} from '../database/config'

export default async function getTokenSnov() {
    return new Promise(async(resolve, reject) => {
        await database.ref("T-API").child("key").once("value", (snapshot) => {
            snapshot.forEach((item) => {
                resolve(item.val().snov)
            });
        });
    })
}
