const Payment = require("../models/paymentModel");

//payment create endpoint
const createPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      adminName,
      january,
      february,
      march,
      april,
      may,
      june,
      july,
      august,
      september,
      october,
      november,
      december,
    } = req.body;

    const payment = new Payment({
      _id: id,
      adminName,
      january,
      february,
      march,
      april,
      may,
      june,
      july,
      august,
      september,
      october,
      november,
      december,
    });

    const savePayment = await payment.save();
    res
      .status(201)
      .json({ message: "Payment created successfully", data: savePayment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//get payment by id endpoint
const getPayment = async (req, res) => {
  try {
    const { _id } = req.params;
    const payment = await Payment.findById(_id);
    res.status(200).json({ payment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Payment not found" });
  }
};

//update payment endpoint
const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      adminName,
      january,
      february,
      march,
      april,
      may,
      june,
      july,
      august,
      september,
      october,
      november,
      december,
    } = req.body;

    const payment = await Payment.findByIdAndUpdate(
      id,
      {
        adminName: adminName,
        january: january,
        february: february,
        march: march,
        april: april,
        may: may,
        june: june,
        july: july,
        august: august,
        september: september,
        october: october,
        november: november,
        december: december,
      },
      { new: true }
    );

    //display updated payment
    return res.status(200).json({ payment });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "User not updated" });
  }
};

//delete payment endpoint
const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByIdAndDelete(id);
    //deleted successful
    return res.status(200).json({ message: "payment deleted" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "payment not deleted" });
  }
};

// //check id in database
// const ckeckId = async (req, res) => {
//   try{
//     const {id} = req.params;
//     const paymentId = await Payment.
//   }
// }

module.exports = {
  createPayment,
  getPayment,
  updatePayment,
  deletePayment,
};
