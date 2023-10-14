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
  const day =
    date.getDate().toString().length > 1
      ? date.getDate().toString()
      : "0".concat(date.$D.toString());

  const todaysDate = day
    .toString()
    .concat(".")
    .concat(month.length > 1 ? month : "0" + month)
    .concat(date.getFullYear().toString());

  return todaysDate;
};

export const dateOptimizer = (date) => {
  const month = (date.$M + 1).toString().concat(".");
  const day =
    date.$D.toString().length > 1
      ? date.$D.toString()
      : "0".concat(date.$D.toString());
  const selectedDate = day
    .concat(".")
    .concat(month.length > 2 ? month : "0" + month)
    .concat(date.$y.toString());
  return selectedDate;
};

export const monthOptimizer = (date) => {
  const month = (date.$M + 1).toString().concat(".");
  const selectedDate = (month.length > 2 ? month : "0" + month).concat(
    date.$y.toString()
  );
  return selectedDate;
};

export const yearOptimizer = (date) => {
  return date.$y.toString();
};
