import { message } from "antd";

import { database } from "../database/config";

export async function createList(userId, listName) {
  try {
    const userRef = database.ref(`Users/${userId}/Leads`);
    const formattedDate = new Date().toISOString();

    await userRef.child(listName).set({
      name: listName,
      created_at: formattedDate,
    });

    message.success("new list created successfully!");
    return listName;
  } catch (error) {
    console.error("Erro ao criar nova lista:", error);
    message.error("Unable to create list, please try again later");
    throw error;
  }
}

export async function createCompanyList(userId, listName, data) {
  try {
    const userRef = database.ref(`Users/${userId}/Leads`);
    const formattedDate = new Date().toISOString();

    await userRef.child(listName).set({
      ...data,
      name: listName,
      created_at: formattedDate,
    });

    message.success("new list created successfully!");
    return listName;
  } catch (error) {
    console.error("Erro ao criar nova lista:", error);
    message.error("Unable to create list, please try again later");
    throw error;
  }
}

export async function getAllLists(userId) {
  try {
    const userRef = database.ref(`Users/${userId}/Leads`);

    const snapshot = await userRef.once("value");
    const lists = snapshot.val() || {};

    const listOfLists = Object.keys(lists).map((key) => ({
      ...lists[key],
    }));

    return listOfLists;
  } catch (error) {
    console.error("Erro ao obter todas as listas:", error);
    throw error;
  }
}

export async function saveDataToList(userId, listId, newData, key) {
  try {
    const listRef = database.ref(`Users/${userId}/Leads/${listId}/${key}`);
    const snapshot = await listRef.once('value');

    const number = Object.keys(snapshot.val() || {}).filter( k => !isNaN(parseInt(k)));

    const nextIndex = number.length > 0 ? Math.max(...number) + 1 : 0;


    await listRef.child(nextIndex).set(newData);

    message.success(`New data saved successfully on ${listId}`);
  } catch (error) {
    console.error("Erro ao salvar novos dados na lista:", error);
    message.error("Unable to save new data on list");
    throw error;
  }
}

export async function saveOneDataToList(userId, listId, newData) {
  try {
    const listRef = database.ref(`Users/${userId}/Leads/${listId}`);
    await listRef.push(newData);

    message.success(`New data saved successfully on ${listId}`);
  } catch (error) {
    console.error("Erro ao salvar novos dados na lista:", error);
    message.error("Unable to save new data on list");
    throw error;
  }
}

export async function getUniqueList(userId, listId) {
  try {
    const userRef = database.ref(`Users/${userId}/Leads/${listId}`);

    const snapshot = await userRef.once("value");
    const listData = snapshot.val() || {};

    return listData;
  } catch (error) {
    console.error("Erro ao obter lista única:", error);
    throw error;
  }
}

export async function deleteList(userId, listId) {
  try {
    const userRef = database.ref(`Users/${userId}/Leads/${listId}`);

    await userRef.remove();

    return true;
  } catch (error) {
    console.error("Erro ao deletar lista:", error);
    throw error;
  }
}

export async function renameList(userId, listId, newName) {
  try {
    const userRef = database.ref(`Users/${userId}/Leads/${listId}`);
    await userRef.update({ name: newName }); // Usar update em vez de set

    message.success("List successfully renamed");
  } catch (error) {
    console.error("Erro ao renomear lista:", error);
    message.error("Unable to rename list, please try again later");
    throw error;
  }
}

export async function deleteListByName(userId, listName) {
  try {
    const userRef = database.ref(`Users/${userId}/Leads`);

    const listToDelete = await userRef
      .orderByChild("name")
      .equalTo(listName)
      .once("value");

    if (listToDelete.exists()) {
      const key = Object.keys(listToDelete.val())[0];
      await userRef.child(key).remove();
      return true;
    } else {
      message.error("List not found.");
      return false;
    }
  } catch (error) {
    console.error("Erro ao deletar lista:", error);
    throw error;
  }
}
