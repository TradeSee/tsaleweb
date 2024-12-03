import {auth, database} from '../database/config'

export default async function getRecentSearch() {
    return new Promise(async(resolve, reject) => {

        const user = auth.currentUser;
        const uid = user.uid;

        let recent = []
        await database.ref("Users").child(uid).child('RecentSearch').once("value", (snapshot) => {
            snapshot.forEach((item) => {
                let data = {
                    rank: parseInt(item.key),
                    key: item.val().key,
                    route: item.val().route,
                    title: item.val().title,
                };
                recent.push(data);
            });
        });
        if(recent.length > 0) {
            resolve(recent)
        } else {
            reject('empty')
        }
    })
}
