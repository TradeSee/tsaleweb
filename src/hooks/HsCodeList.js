import { database } from "../database/config";

export default async function HsCodeList() {
  return new Promise(async (resolve, reject) => {
    let products = [];
    await database.ref("ProductHS").once("value", (snapshot) => {
      snapshot.forEach((item) => {
        let data = {
          key: item.key,
          hsCode: item.val().hsCode,
          hsName: item.val().hsName,
        };
        products.push(data);
      });
    });
    if (products.length > 0) {
      resolve(products);
    } else {
      reject("empty");
    }
  });
}

export async function AllHsCodeList() {
  return new Promise(async (resolve, reject) => {
    let products = [];
    await database.ref("AllProduct").once("value", (snapshot) => {
      snapshot.forEach((item) => {
        let data = {
          key: item.key,
          hsCode: item.val().hsCode,
          hsName: item.val().hsName,
        };
        products.push(data);
      });
    });
    if (products.length > 0) {
      resolve(products);
    } else {
      reject("empty");
    }
  });
}

export async function addProductData(hsCode, hsName) {
  try {
    const productRef = database.ref("Product").push();
    const productKey = productRef.key;

    await productRef.update({
      hsCode: `${hsCode}`,
      hsName: hsName,
    });

    return productKey;
  } catch (error) {
    console.error("Erro ao adicionar dados do produto:", error);
    throw error;
  }
}
