import { firestore } from "../database/config";

export default async function filterLeadsDB(domain, companyId) {
  return new Promise(async (resolve, reject) => {
    const processedDomain = domain?.replace(/^www\./i, '');
    let array = [];
    if (domain != null) {
      await firestore
        .collection("ListOfLeads")
        .where("domain", "==", processedDomain)        
        .orderBy("domain")
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
        .collection("ListOfLeads")
        .where("domain", "==", processedDomain)       
        .orderBy("domain")
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

    const filteredRole = array.filter((leads) => {
      if (leads.domain) {
        return leads.domain == processedDomain;
      } else {
        return domain == "Supplier";
      }
    });
    resolve(filteredRole[0]);
  });
}

export async function filterLeadsCompanyIdDB(companyId) {
  return new Promise(async (resolve, reject) => {
    let array = [];
    if (companyId != null) {
      await firestore
        .collection("ListOfLeads")
        .where("companyId", "==", companyId)        
        .orderBy("companyId")
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
        .collection("ListOfLeads")
        .where("companyId", "==", companyId)       
        .orderBy("companyId")
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

    const filteredRole = array.filter((leads) => {
      if (leads.companyId) {
        return leads.companyId == companyId;
      } else {
        return companyId == "Supplier";
      }
    });
    resolve(filteredRole[0]);
  });
}
