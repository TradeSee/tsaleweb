import { useEffect, useState } from "react";
import { database } from "../database/config";

export function useNews() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const newsRef = database.ref("Assistant");
        const snapshot = await newsRef.once("value");
        const newsData = snapshot.val();
        setNewsData(newsData);

        setLoading(false);
      } catch (error) {
        throw new Error(
          "Erro ao obter dados da tabela Assistant: " + error.message
        );
      }
    }

    fetchData();
  }, []);

  return { newsData, loading };
}
