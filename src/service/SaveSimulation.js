import { database } from "../database/config";

function parseDateTime(dateTimeStr) {
  const [dateTime, timeZone] = dateTimeStr.split(/([+-]\d{1,2}:\d{2})/); // separa data/hora do fuso horário
  const [year, month, day, hour, minute, second] = dateTime
    .split(/[-T:]/)
    .map((str) => parseInt(str)); // converte data/hora para números inteiros
  const offset = timeZone.replace(":", ""); // remove os dois pontos da string do fuso horário
  const hoursOffset = parseInt(offset.slice(0, -2)); // converte horas de offset para número inteiro
  const minutesOffset = parseInt(offset.slice(-2)); // converte minutos de offset para número inteiro
  const sign = offset[0] === "-" ? -1 : 1; // define o sinal da diferença do fuso horário
  const timeZoneOffset = (hoursOffset * 60 + minutesOffset) * sign; // calcula a diferença do fuso horário em minutos
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    timeZoneOffset,
  };
}

function generateId(dateString) {
  const timestamp = Date.parse(dateString);
  return `id_${timestamp}`;
}

export default async function saveSimulation(
  spec,
  oCountry,
  dCountry,
  budget,
  userId
) {
  return new Promise(async (resolve, reject) => {
    const fullDate = parseDateTime(spec.date);
    const id = generateId(spec.date);

    const date = `${fullDate.day}/${fullDate.month}/${fullDate.year}`;
    const hr = `${fullDate.hour}:${fullDate.minute}:${fullDate.second}`;
    const timezone = fullDate.timeZoneOffset;

    await database
      .ref("Users")
      .child(userId)
      .child("Simulations")
      .child(id)
      .update({
        spec,
        oCountry,
        dCountry,
        budget,
        date,
        hr,
        timezone,
      })
      .then(() => {
        resolve("ok");
      })
      .catch((err) => {
        reject(err);
      });
  });
}
