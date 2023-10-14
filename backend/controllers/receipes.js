import Customer from "../models/Customer.js";

export const getReceipeDetails = async (req, res) => {
  try {
    const selectedDate = req.query.date;
    const customer = await Customer.find();
    const receipesArray = [];

    customer.forEach((c) => {
      let receipe;
      c.receipes.forEach((a, index, arr) => {
        let dateData = a.date;
        if (dateData === selectedDate) {
          receipe = arr[index];
        }
      });

      if (receipe !== undefined) {
        receipesArray.push({
          name: c.name,
          surname: c.surname,
          date: selectedDate,
          time: receipe.time,
          amount: receipe.amount,
          paymentMethod: receipe.paymentMethod,
          workDescription: receipe.workDescription,
          outcome: receipe.outcome,
          outcomeDetails: receipe.outcomeDetails,
        });
      }
    });

    res.status(200).json(receipesArray);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const setReceipe = async (req, res) => {
  const data = req.body;

  const newReceipe = {
    amount: data.amount,
    paymentMethod: data.paymentMethod,
    date: data.date,
    time: data.time,
    workDescription: data.workDescription,
    outcome: data.outcome,
    outcomeDetails: data.outcomeDetails,
  };

  data.customer.receipes.push(newReceipe);

  const customer = await Customer.findOneAndUpdate(
    {
      contactNumber: req.body.customer.contactNumber,
    },
    { $set: { receipes: data.customer.receipes } },
    { new: true }
  );

  await customer
    .save()
    .then(() =>
      res.status(200).json({ message: "Succesfully added", data: customer })
    )
    .catch((e) => res.status(404).json({ message: e.message }));
};
