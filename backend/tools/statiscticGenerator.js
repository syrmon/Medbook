export const getCompleteDayStatistics = (dayReceipes) => {
  let totalOutcome = 0;
  let totalAmount = 0;

  dayReceipes.forEach((receipe) => {
    totalAmount += Number(receipe.amount);
    totalOutcome += Number(receipe.outcome);
  });

  let totalIncome = totalAmount - totalOutcome;

  return { totalAmount, totalOutcome, totalIncome };
};

export const getCompleteMonthStatistics = (monthReceipes) => {
  let totalOutcome = 0;
  let totalAmount = 0;

  monthReceipes.forEach((dayReceipe) => {
    const dayStats = getCompleteDayStatistics(dayReceipe);

    totalAmount += dayStats.totalAmount;
    totalOutcome += dayStats.totalOutcome;
  });

  let totalIncome = totalAmount - totalOutcome;

  return { totalAmount, totalOutcome, totalIncome };
};

export const getCompleteYearStatistics = (yearReceipes) => {
  let totalOutcome = 0;
  let totalAmount = 0;

  monthReceipes.forEach((monthReceipe) => {
    const monthStats = getCompleteMonthStatistics(monthReceipe);

    totalAmount += monthStats.totalAmount;
    totalOutcome += monthStats.totalOutcome;
  });

  let totalIncome = totalAmount - totalOutcome;

  return { totalAmount, totalOutcome, totalIncome };
};

export const dataFiller = (type, data, date) => {
  const maxLength = type === "month" ? data[date.slice(0, 2)] + 1 : 13;
  const filledObject = {};

  for (let i = 1; i < maxLength; i++) {
    let u = i.toString();
    u.length < 2 ? (u = "0".concat(u)) : "";
    filledObject[u] = [];
  }

  return filledObject;
};

export const filterBy = (type, data, date, filterObject) => {
  const maxLength = type === "month" ? data[date.slice(0, 2)] + 1 : 13;
  const results = [];

  for (let i = 1; i < maxLength; i++) {
    let u = i.toString();
    let todaysTotalAmount = 0;
    let todaysTotalOutcome = 0;
    let todaysTotalIncome = 0;
    let receipeCount = 0;

    if (u.length < 2) u = "0".concat(u);

    filterObject[u].forEach((r) => {
      todaysTotalAmount += Number(r.amount);
      todaysTotalOutcome += Number(r.outcome);
      if (Number(r.amount) > 0) receipeCount++;
    });

    todaysTotalIncome = todaysTotalAmount - todaysTotalOutcome;

    results.push({
      dateIdentifier: type === "year" ? data[u] : u,
      totalReceipeCount: receipeCount,
      totalAmount: todaysTotalAmount,
      totalOutcome: todaysTotalOutcome,
      totalIncome: todaysTotalIncome,
    });
  }

  return results;
};
