import { database } from "../database/config";

export async function getCompanySponsorData() {
    try {
      const usersRef = database.ref("CompanySponsor");
      const snapshot = await usersRef.once("value");
      const companySponsorData = snapshot.val();

      if (companySponsorData) {        
        const dataArray = Object.keys(companySponsorData).map((userId) => ({
          id: userId,
          ...companySponsorData[userId],
        }));
        return dataArray;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro ao obter os dados da tabela CompanySponsor:", error);
      return null;
    }
  }

  export async function getCompanySponsorDataById(companyId) {
    try {
      const usersRef = database.ref("CompanySponsor");
      const snapshot = await usersRef.once("value");
      const companySponsorData = snapshot.val();
  
      if (companySponsorData) {
        const specificCompany = Object.keys(companySponsorData)
          .filter(userId => userId === companyId)
          .map(userId => ({
            id: userId,
            ...companySponsorData[userId],
          }));
          
        return specificCompany;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro ao obter os dados da tabela CompanySponsor:", error);
      return null;
    }
  }
  