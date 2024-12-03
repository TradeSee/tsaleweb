export default function formatDate(dataString) {
  const data = new Date(dataString);

  const hoje = new Date();

  if (
    data.getDate() === hoje.getDate() &&
    data.getMonth() === hoje.getMonth() &&
    data.getFullYear() === hoje.getFullYear()
  ) {
    return getHours(data);
  } else {
    const dataFormatada = `${addZeros(data.getDate())}/${addZeros(
      data.getMonth() + 1
    )}/${data.getFullYear()}`;
    return dataFormatada;
  }
}

function formatHours(data) {
  const horario = `${addZeros(data.getHours())}:${addZeros(data.getMinutes())}`;
  return horario;
}

function addZeros(numero) {
  return numero < 10 ? `0${numero}` : numero;
}

export function getHours(dataString) {
  const data = new Date(dataString);

  // Obter o fuso horário do navegador
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Configurar o objeto Date para o fuso horário do navegador
  const dateTimezone = new Date(
    data.toLocaleString("en-US", { timeZone: timezone })
  );

  // Extrair a hora e o minuto
  const hour = ("0" + dateTimezone.getHours()).slice(-2);
  const minute = ("0" + dateTimezone.getMinutes()).slice(-2);

  // Formatar a hora e o minuto no formato HH:MM
  const formatedHourMinute = `${hour}:${minute}`;

  return formatedHourMinute;
}

export function formatDateForMessage(dataString) {
  const data = new Date(dataString);
  const hoje = new Date();
  const ontem = new Date();
  ontem.setDate(hoje.getDate() - 1);

  // Verifica se a data é igual a hoje
  if (
    data.getDate() === hoje.getDate() &&
    data.getMonth() === hoje.getMonth() &&
    data.getFullYear() === hoje.getFullYear()
  ) {
    return "today";
  }
  // Verifica se a data é igual a ontem
  else if (
    data.getDate() === ontem.getDate() &&
    data.getMonth() === ontem.getMonth() &&
    data.getFullYear() === ontem.getFullYear()
  ) {
    return "yesterday";
  } else {
    // Se não for hoje nem ontem, retorna a data no formato mm/dd/yyyy
    const dataFormatada = `${addZeros(data.getMonth() + 1)}/${addZeros(
      data.getDate()
    )}/${data.getFullYear()}`;
    return dataFormatada;
  }
}
