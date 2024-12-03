export default function Capitalize(str) {
  str = str?.toLowerCase();
  let palavras = str?.split(" ");
  for (let i = 0; i < palavras?.length; i++) {
    let primeiraLetra = palavras[i][0];
    palavras[i] = primeiraLetra?.toUpperCase() + palavras[i]?.substring(1);
  }
  return palavras?.join(" ");
}
