import { firestore } from "../database/config";

export default async function filterMoreCompaniesDB(
  country,
  hsCode,
  nCompanies,
  sMin,
  sMax,
  role,
  companiesId
) {
  return new Promise(async (resolve, reject) => {
    let array = [];
    if (sMin != null && sMin != "null" && sMax != null && sMax != "null") {
      await firestore
        .collection("ListofCompanies")
        .where("country", "==", country)
        .where("shipmentValue", ">=", sMin)
        .where("shipmentValue", "<=", sMax)
        .where("role", "==", role)
        .where("matchedHsCodes", "array-contains-any", hsCode)
        .where("companyId", "not-in", companiesId)
        .orderBy("shipmentValue")
        .orderBy("matchedHsCodes")
        .limit(nCompanies)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            array.push(doc.data());
          });
        })
        .catch((e) => {
          reject("Error: " + e);
        });
    } else {
      await firestore
        .collection("ListofCompanies")
        .where("country", "==", country)
        .where("role", "==", role)
        .where("matchedHsCodes", "array-contains-any", hsCode)
        .orderBy("matchedHsCodes")
        .limit(nCompanies)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            array.push(doc.data());
          });
        })
        .catch((e) => {
          reject("Error: " + e);
        });
    }

    const filteredRole = array.filter((companie) => {
      if (companie.role) {
        return companie.role == role;
      } else {
        return role == "Supplier";
      }
    });
    resolve(filteredRole);
  });
}
