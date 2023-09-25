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

export const getAppointments = async (req, res) => {
  try {
    const selectedDate = req.query.date;
    const customer = await Customer.find();

    const appointments = customer.map((c) => {
      const appointment = c.appointments.filter((a) => {
        return a.date === selectedDate;
      });

      return (
        appointment.length > 0 && {
          contactNumber: c.contactNumber,
          name: c.name,
          surname: c.surname,
          appointment: appointment,
        }
      );
    });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  const filter = {
    contactNumber: req.body.contactNumber,
  };

  let customer = await Customer.findOne(filter);

  customer.appointments.map((c) => {
    if (c.date === req.body.date) {
      c.status = "Bitdi";
    }
  });

  await Customer.updateOne(filter, { appointments: customer.appointments });

  await customer.save();
  customer = await Customer.findOne(filter);
  console.log(customer.appointments);

  // customer
  //   .save()
  //   .then(() =>
  //     res.status(200).json({ message: "Succesfully added", data: customer })
  //   )
  //   .catch((e) => res.status(404).json({ message: e.message }));
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

export const setAppointment = async (req, res) => {
  const newAppointment = {
    time: req.body.time,
    date: req.body.date,
    desc: req.body.desc,
    status: "Gelir",
  };

  req.body.customer.appointments.push(newAppointment);

  const customer = await Customer.findOneAndUpdate(
    {
      contactNumber: req.body.customer.contactNumber,
    },
    { $set: { appointments: req.body.customer.appointments } },
    { new: true }
  );

  customer
    .save()
    .then(() =>
      res.status(200).json({ message: "Succesfully added", data: customer })
    )
    .catch((e) => res.status(404).json({ message: e.message }));
};
