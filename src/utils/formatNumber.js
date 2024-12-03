export default function FormatNumber(num) {
    const formataMilhar = new Intl.NumberFormat('en-US'); // cria um formatador para números em inglês dos EUA
    let number2fixed = parseFloat(num).toFixed(2)
    let format = formataMilhar.format(number2fixed);
    return format
}