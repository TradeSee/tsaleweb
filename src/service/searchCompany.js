import { firestore } from "../database/config";

export default async function SearchCompany(companyId) {
  return new Promise(async (resolve, reject) => {
    const array = [];
    await firestore
      .collection("ListofCompanies")
      .where("companyId", "==", companyId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          array.push(doc.data());
        });
      })
      .catch((e) => {
        reject("Error on filter company: " + e);
      });

    resolve(array[0]);
  });
}
