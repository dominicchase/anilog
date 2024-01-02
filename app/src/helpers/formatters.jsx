export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatNumber = (number) => {
  const options = { maximumFractionDigits: 2 };
  return Intl.NumberFormat("en-US", options).format(+number);
};
