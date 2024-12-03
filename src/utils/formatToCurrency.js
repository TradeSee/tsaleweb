const formatToCurrency = (num) =>
  Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    num
  );

export default formatToCurrency;
