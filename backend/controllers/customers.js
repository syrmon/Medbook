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
    const appointmentsArray = [];

    customer.forEach((c) => {
      let appointment;
      c.appointments.forEach((a, index, arr) => {
        if (a.date === selectedDate) {
          appointment = arr[index];
        }
      });

      if (appointment !== undefined) {
        appointmentsArray.push({
          contactNumber: c.contactNumber,
          name: c.name,
          surname: c.surname,
          appointment: appointment,
        });
      }
    });

    appointmentsArray.length > 1 &&
      appointmentsArray.sort(function compFunc(a, b) {
        const appointmentA = a.appointment.time;
        const appointmentB = b.appointment.time;

        const timeFirst = Number(appointmentA.substring(0, 2));
        const timeSecond = Number(appointmentA.substring(3, 5));

        const timeBFirst = Number(appointmentB.substring(0, 2));
        const timeBSecond = Number(appointmentB.substring(3, 5));

        if (timeFirst < timeBFirst) {
          return -1;
        }
        if (timeFirst > timeBFirst) {
          return 1;
        }
        if (timeFirst === timeBFirst && timeSecond < timeBSecond) {
          return -1;
        }
        if (timeFirst === timeBFirst && timeSecond > timeBSecond) {
          return 1;
        }
        return 0;
      });
    res.status(200).json(appointmentsArray);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getReceipes = async (req, res) => {
  try {
    const selectedDate = req.query.date;
    const customer = await Customer.find();
    const receipesArray = [];

    customer.forEach((c) => {
      let receipe;
      c.receipes.forEach((a, index, arr) => {
        if (a.date === selectedDate) {
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
console.log(receipesArray)


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

export const updateAppointment = async (req, res) => {
  const filter = {
    contactNumber: req.body.contactNumber,
  };

  let customer = await Customer.findOne(filter);

  if (req.body.newDate === undefined) {
    customer.appointments.map((c) => {
      if (c.date === req.body.date) {
        c.status = "Bitdi";
      }
    });
  }

  if (req.body.newDate !== undefined) {
    customer.appointments.map((c) => {
      if (c.date === req.body.date) {
        c.date = req.body.newDate.date;
        c.time = req.body.newDate.time;
        c.status = "Changed";
      }
    });
  }

  await Customer.updateOne(filter, { appointments: customer.appointments });

  await customer.save();
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
