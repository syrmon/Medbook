export const timeOptimizer = (data) => {
  console.log(data);
  const time = (
    data.$H.toString().length > 1
      ? data.$H.toString()
      : "0" + data.$H.toString()
  ).concat(
    ":" +
      (data.$m.toString().length > 1
        ? data.$m.toString()
        : "0" + data.$m.toString())
  );
  return time;
};

export const getCurrentDate = () => {
  const date = new Date();
  const month = (date.getMonth() + 1).toString().concat(".");
  const todaysDate = date
    .getDate()
    .toString()
    .concat(".")
    .concat(month.length > 1 ? month : "0" + month)
    .concat(date.getFullYear().toString());
  return todaysDate;
};

export const dateOptimizer = (date) => {
  const month = (date.$M + 1).toString().concat(".");
  const selectedDate = date.$D
    .toString()
    .concat(".")
    .concat(month.length > 1 ? month : "0" + month)
    .concat(date.$y.toString());

  return selectedDate;
};
