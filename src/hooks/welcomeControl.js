import { auth, database } from "../database/config";

export function getFirstLogin() {
    return new Promise(async(resolve, reject) => {
        var user = auth.currentUser;
        if(user) {
            await database.ref("Users").child(user.uid).child("firstLogin").once("value", (snapshot) => {            
                resolve(snapshot.val())
                
            });
        }
    })
}

export async function AttFirstLogin() {
    var user = auth.currentUser;
    if(user) {
        await database.ref("Users").child(user.uid).update({"firstLogin": false})
    }
}