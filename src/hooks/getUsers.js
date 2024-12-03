import { message } from "antd";

import { auth, database } from "../database/config";

export default function getUserInfo() {
  return new Promise(async (resolve, reject) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const email = user.email;
        const displayName = user.displayName;

        const userRef = database.ref(`Users/${uid}`);
        const snapshot = await userRef.once("value");
        const userData = snapshot.val();
        resolve({
          uid,
          email,
          displayName,
          userData,
        });
      } else {
        resolve(null);
      }
    } catch (error) {
      console.error("Erro ao obter informações do usuário:", error);
      reject(error);
    }
  });
}

export async function updateAddress(userId, newAddressData) {
  const userRef = database.ref("Users").child(userId);

  try {
    const snapshot = await userRef.child("address").once("value");
    const existingAddressData = snapshot.val();

    const updatedAddressData = {
      ...existingAddressData,
      ...newAddressData,
    };

    await userRef.update({ address: updatedAddressData });
    message.success("Your address has been successfully updated.");
  } catch (error) {
    console.error("Erro ao atualizar os campos de endereço:", error);
    message.error("Unable to update address. Please try again later.");
  }
}

export async function updateUser(userId, info) {
  try {
    const userRef = database.ref("Users").child(userId);

    const snapshot = await userRef.once("value");
    const currentUserData = snapshot.val();

    const name = info.name || currentUserData.name;
    const email = info.email || currentUserData.email;
    const lastName = info.lastName || currentUserData.lastName;
    const phone = info.phone || currentUserData.phone;
    const role = info.role || currentUserData.role;

    await userRef.update({
      name,
      lastName,
      email,
      phone,
      role,
    });
  } catch (error) {
    console.error("Erro ao salvar dados do usuário:", error);
  }
}

export async function changePassword(email, currentPassword, newPassword) {
  try {
    await auth.signInWithEmailAndPassword(email, currentPassword);

    const user = auth.currentUser;

    await user.updatePassword(newPassword);

    message.success("Your password has been successfully updated.");
    return true;
  } catch (error) {
    console.error("Erro ao alterar a senha:", error);
    message.error("Unable to update password. Please try again later.");
    return false;
  }
}

export async function getHistoryCredits(userId) {
  try {
    const historyCreditsRef = database.ref("HCredits").child(userId);
    const snapshot = await historyCreditsRef.once("value");
    const historyCredits = snapshot.val();

    return historyCredits;
  } catch (error) {
    throw new Error("Erro ao obter dados do histórico: " + error.message);
  }
}

export function getCustomerIDByUserID(userId) {
  return new Promise((resolve, reject) => {
    database
      .ref("Users")
      .child(userId)
      .once(
        "value",
        (snapshot) => {
          const userData = snapshot.val();
          if (userData && userData.customerId) {
            const customerId = userData.customerId;
            resolve(customerId);
          } else {
            resolve(null);
          }
        },
        (error) => {
          reject(new Error("Erro ao buscar o customerID: " + error.message));
        }
      );
  });
}

export async function getCompanyUser(userId) {
  try {
    const userRef = database.ref("Users").child(userId);
    const snapshot = await userRef.child("Company").once("value");
    const companyData = snapshot.val();

    return companyData;
  } catch (error) {
    console.error("Error getting user's company:", error);
    return null;
  }
}

export async function addFeedback(userId, feedback, date) {
  try {
    const userFeedbackRef = database.ref(`Users/${userId}/Feedback`).push();
    const feedbackKey = userFeedbackRef.key;
    const text = feedback ? feedback : "Not share"
    await userFeedbackRef.set({
      opnion: text,
      date: date
    });

    return feedbackKey;
  } catch (error) {
    console.error("Erro ao adicionar dados:", error);
    throw error;
  }
}