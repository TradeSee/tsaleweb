import { firestore } from "../database/config";

export default async function SearchCompanyByName(companyName) {
  return new Promise(async (resolve, reject) => {
    const array = [];
    await firestore
      .collection("ListofCompanies")
      .where("companyName", "==", companyName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          array.push(doc.data());
        });
      })
      .catch((e) => {
        reject("Error on filter company: " + e);
      });

    console.log({ array });
    resolve(array[0]);
  });
}
