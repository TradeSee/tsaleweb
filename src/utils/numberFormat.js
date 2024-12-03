const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

export default function formatNumber(number) {
  return NUMBER_FORMATTER.format(number);
}
