import Customer from "../models/Customer.js";

export const getCustomers = async (req, res) => {
  try {
    const customer = await Customer.find();
    res.status(200).json(customer);
    return customer;
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const setCustomer = async (req, res) => {
  const customer = new Customer({
    appointments: [],
    name: req.body.name,
    surname: req.body.surname,
    birthDate: req.body.birthDate,
    contactNumber: req.body.contactNumber,
  });

  customer
    .save()
    .then(() =>
      res.status(200).json({ message: "Succesfully added", data: customer })
    )
    .catch((e) => res.status(404).json({ message: e.message }));
};
