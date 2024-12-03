import { auth, database } from "../database/config";

export function getMyNotification() {
    return new Promise(async(resolve, reject) => {
        let notifications = []
        var user = auth.currentUser;
        if(user) {
            await database.ref("Users").child(user.uid).child("MyNotifications").once("value", (snapshot) => {
                snapshot.forEach((item) => {
                    let data = {
                        key: item.key,
                        id: item.val().id,
                        type: item.val().type,
                        text: item.val().text,
                        description: item.val().description,
                        route: item.val().route,
                        status: item.val().status,
                        read: item.val().read,
                        created_at: item.val().created_at,
                    };
                    notifications.push(data);
                });
            });
            if(notifications.length > 0) {
                resolve(notifications)
            } else {
                reject('empty')
            }
        }
    })
}

export function pushMyNotification(obj) {
    var user = auth.currentUser;
    if(user) {
        database.ref("Users").child(user.uid).child("MyNotifications").child(obj.id).update(obj)
        .catch(e => {
            console.log("%cAtenção:", "color: #fff; background-color: #E93939; padding: 5px; border-radius: 7px;");
            console.log(`%c${e}`, "color: #fff; background-color: #F19120; padding: 5px; border-radius: 7px;")
        })
    }
}