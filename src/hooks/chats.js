import { database } from "../database/config";

export async function salvarMensagem(userId1, userId2, message) {
  const chatsRef = await database.ref("messages");

  try {
    const compositeKey = [userId1, userId2].sort().join("_");

    const snapshot = await chatsRef
      .orderByChild("compositeKey")
      .equalTo(compositeKey)
      .limitToFirst(1)
      .once("value");

    let chatId;

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        chatId = childSnapshot.key;
      });
    } else {
      chatId = chatsRef.push().key;

      const chatData = {
        user1: userId1,
        user2: userId2,
        compositeKey: compositeKey,
      };

      await chatsRef.child(chatId).set(chatData);
    }

    await chatsRef.child(chatId).child("messages").push({
      senderId: message.senderId,
      text: message.text,
      date: message.date,
    });

    return chatId;
  } catch (error) {
    throw new Error("Erro ao salvar mensagem fora do userId: " + error.message);
  }
}

export async function getMensagens(userId1, userId2) {
  const compositeKey = [userId1, userId2].sort().join("_");

  const chatsRef = database
    .ref("messages")
    .orderByChild("compositeKey")
    .equalTo(compositeKey);

  try {
    const snapshot = await chatsRef.once("value");
    const chats = snapshot.val() || {};

    if (Object.keys(chats).length > 0) {
      const chatId = Object.keys(chats)[0];
      return chats[chatId].messages || [];
    }

    return [];
  } catch (error) {
    throw new Error("Erro ao obter mensagens: " + error.message);
  }
}

export async function getChats(userId) {
  const chatsRef = database.ref("messages");

  try {
    const snapshot = await chatsRef.once("value");
    const chats = snapshot.val() || {};

    const filteredChats = Object.values(chats).filter(
      (chat) => chat.user1 === userId || chat.user2 === userId
    );

    return filteredChats;
  } catch (error) {
    throw new Error("Erro ao obter chats: " + error.message);
  }
}

export async function getCompanyName(id) {
  const companyRef = database.ref(`CompanySponsor/${id}`);

  try {
    const snapshot = await companyRef.once("value");
    const companyData = snapshot.val() || {};
    const corporateName = companyData.corporateName || "";

    return corporateName;
  } catch (error) {
    throw new Error("Erro ao obter nome da empresa: " + error.message);
  }
}

export function listMessage(userId1, userId2, callback) {
  const compositeKey = [userId1, userId2].sort().join("_");

  const chatsRef = database
    .ref(`messages`)
    .orderByChild("compositeKey")
    .equalTo(compositeKey);

  chatsRef.on("child_added", (snapshot) => {
    const newMessage = snapshot.val();
    callback(newMessage);
  });
}
