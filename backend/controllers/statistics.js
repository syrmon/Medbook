import Customer from "../models/Customer.js";
import { months, monthsDays } from "../data/date.js";
import { dataFiller, filterBy } from "../tools/statiscticGenerator.js";

export const getStatistics = async (req, res) => {
  try {
    const selectedDate = req.query.date;
    const customer = await Customer.find();
    let monthObject = dataFiller("month", monthsDays, selectedDate);
    let yearObject = dataFiller("year");
    const filter = req.query.filter;

    let totalAmount = 0;
    let totalOutcome = 0;
    let totalIncome = 0;

    let filteredResults;

    customer.forEach((c) => {
      c.receipes.forEach((a, index, arr) => {
        let monthAndYear = a.date.slice(3, 10);
        let year = a.date.slice(6, 10);
        if (filter === "month" && monthAndYear === selectedDate) {
          monthObject[arr[index].date.slice(0, 2)].push(arr[index]);
        } else if (filter === "year" && year === selectedDate) {
          yearObject[arr[index].date.slice(3, 5)].push(arr[index]);
        }
      });
    });
    if (filter === "year")
      filteredResults = filterBy("year", months, selectedDate, yearObject);
    if (filter === "month")
      filteredResults = filterBy(
        "month",
        monthsDays,
        selectedDate,
        monthObject
      );

    filteredResults.forEach((d) => {
      totalAmount += d.totalAmount;
      totalOutcome += d.totalOutcome;
      totalIncome += d.totalIncome;
    });

    res.status(200).json({
      filterStats: filteredResults,
      results: {
        totalAmount: totalAmount,
        totalOutcome: totalOutcome,
        totalIncome: totalIncome,
      },
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
