import { firestore } from "../database/config";

export default async function filterCompaniesMore(
  hs,
  country,
  limit,
  sMin,
  sMax,
  excludeId,
  role
) {
  return new Promise(async (resolve, reject) => {
    let array = [];
    if (sMin != null && sMin !== "null" && sMax != null && sMax !== "null") {
      await firestore
        .collection("ListofCompanies")
        .where("country", "==", country)
        .where("shipmentValue", ">=", sMin)
        .where("shipmentValue", "<=", sMax)
        .where("role", "==", role)
        .where("matchedHsCodes", "array-contains-any", hs)
        .orderBy("shipmentValue")
        .orderBy("matchedHsCodes")
        .limit(limit + excludeId.length)
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
        .where("matchedHsCodes", "array-contains-any", hs)
        .orderBy("matchedHsCodes")
        .limit(limit + excludeId.length)
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
    const filteredCompanies = array.filter(
      (company) => !excludeId.includes(company.companyId)
    );

    const filteredRole = filteredCompanies.filter((companie) => {
      if (companie.role) {
        return companie.role === role;
      } else {
        return role === "Supplier";
      }
    });
    resolve(filteredRole);
  });
}
