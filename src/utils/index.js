
// Function for truncating long addresses for display
export const truncateAddress = (address) => {
  return address.substring(0, 6) + "..." + address.substring(35, 41);
};

// Function for rounding numerical value to US Dollar format
export const roundDollar = (num) => {
  if (!num) return 0.0;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(num);
};

// Function to add commas to large numbers
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
