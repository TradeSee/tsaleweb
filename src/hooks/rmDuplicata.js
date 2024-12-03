import { auth, database } from "../database/config";

export function RmDuplicate() {
    return new Promise(async(resolve, reject) => {
        let hscodes = [];
        await database.ref("Product").once("value", (snapshot) => {
            snapshot.forEach((item) => {
                let data = {
                    key: item.key,
                    hsCode: item.val().hsCode,
                    hsName: item.val().hsName,
                };
                hscodes.push(data);
            });
        });

        resolve(hscodes)
    })
}

export function attHsCode(array) {
    array.forEach(async(item) => {
        await database.ref("ProductHS").child(item.key).set({
            hsCode: item.hsCode,
            hsName: item.hsName,
        })
    })

}