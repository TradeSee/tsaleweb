import { database } from "../database/config";

export async function addFavoriteCompanie(id, name, full, country, userId) {
  const formattedDate = new Date();

  await database
    .ref("Users")
    .child(userId)
    .child("FavoriteCompanies")
    .child(id)
    .update({
      companie: id,
      name,
      full,
      country,
      saved_at: formattedDate,
    })
    .catch((err) => console.log("Erro ao salvar:", err));
}

export async function deleteFavoriteCompanie(id, userId) {
  await database
    .ref("Users")
    .child(userId)
    .child("FavoriteCompanies")
    .child(id)
    .remove();
}
