import { useEffect, useState } from "react";
import { database } from "../database/config";

export function useLme() {
  const [lmeData, setLmeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const lmeRef = database.ref("LME");
        const snapshot = await lmeRef.once("value");
        const lmeData = snapshot.val();

        setLmeData(lmeData);
        setLoading(false);
    } catch (error) {
        throw new Error(
          "Erro ao obter dados da tabela LME: " + error.message
        );
      }
    }
 
    fetchData();
  }, []);

  return { lmeData, loading };
}
