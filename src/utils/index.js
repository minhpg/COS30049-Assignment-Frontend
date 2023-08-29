export const truncateAddress = (address) => {
  return address.substring(0, 6) + "..." + address.substring(35, 41);
};

export const roundDollar = (num) => {
  if (!num) return 0.0;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(num);
};
