import { auth } from "../database/config";

export default function ResetPassword(email) {
    return new Promise(async (resolve, reject) => {
      await auth
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve("OK");
        })
        .catch((error) => {
          reject(error);
        });
    });
}