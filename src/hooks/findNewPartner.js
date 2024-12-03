import { database, firestore } from "../database/config";

export async function getCompanieFavorite(id) {
  return new Promise(async (resolve, reject) => {
    let companies = [];
    await database
      .ref("Users")
      .child(id)
      .child("FavoriteCompanies")
      .once("value")
      .then(async (snapshot) => {
        snapshot.forEach((item) => {
          companies.push({
            name: item.val().name,
            id: item.val().companie,
            country: item.val().country,
            saved_at: item.val()?.saved_at,
          });
        });

        resolve(companies);
      })
      .catch((err) => {
        reject("Erro ao buscar os favoritos, detalhes: " + err);
      });
  });
}

export async function removeCompanieFavorite(id, companyId) {
  return new Promise(async (resolve, reject) => {
    await database
      .ref("Users")
      .child(id)
      .child("FavoriteCompanies")
      .child(companyId)
      .remove()
      .then(() => {
        console.log("Removido com sucesso");

        resolve("Removido com sucesso");
      })
      .catch((err) => {
        reject("Erro ao deletar, detalhes: " + err);
      });
  });
}

export async function addLeadView(id, newCompanyId) {
  return new Promise(async (resolve, reject) => {
    try {
      const userRef = database.ref("Users").child(id).child("leadViews");
      
      const snapshot = await userRef.once("value");
      const leadViews = snapshot.val() || {};

      const companyIdExists = Object.values(leadViews).some((companyId) => companyId === newCompanyId);
      if (companyIdExists) {
        console.log("CompanyId já existe em leadViews. Nada foi adicionado.");
        resolve("CompanyId já existe em leadViews. Nada foi adicionado.");
        return;
      }

      let lastCompanyIdNumber = 1;
      for (const companyIdKey in leadViews) {
        if (companyIdKey.startsWith("companyId")) {
          const companyIdNumber = parseInt(companyIdKey.substr(9));
          if (!isNaN(companyIdNumber) && companyIdNumber >= lastCompanyIdNumber) {
            lastCompanyIdNumber = companyIdNumber + 1;
          }
        }
      }

      const newCompanyIdKey = `companyId${lastCompanyIdNumber}`;
      
      await userRef.update({ [newCompanyIdKey]: newCompanyId });

      console.log("Lead view adicionado com sucesso");
      resolve("Lead view adicionado com sucesso");
    } catch (error) {
      console.error("Erro ao adicionar lead view:", error);
      reject("Erro ao adicionar lead view: " + error.message);
    }
  });
}

export async function checkLeadView(id, companyId) {
  return new Promise(async (resolve, reject) => {
    try {
      const userRef = database.ref("Users").child(id).child("leadViews");
      
      // Obtém a lista de empresas já visualizadas
      const snapshot = await userRef.once("value");
      const leadViews = snapshot.val() || {};

      // Verifica se companyId existe em algum campo de leadViews
      const companyIdExists = Object.values(leadViews).some((value) => value === companyId);
      
      resolve(companyIdExists);
    } catch (error) {
      console.error("Erro ao verificar lead view:", error);
      reject("Erro ao verificar lead view: " + error.message);
    }
  });
}


