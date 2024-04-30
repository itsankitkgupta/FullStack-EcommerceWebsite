const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const bodyparser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
dotenv.config();
const otpGenerator = require("otp-generator");
const { jwtAuthMiddleware } = require("./Middleware/jwt");
const adminRouter = require("./Routes/AdminRoutes");

const generateOTP = () => {
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return OTP;
};
app.use(express.json());
app.use(
  cors({
    origin: process.env.frontend_url,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/Images"));

app.use("/api/v1", adminRouter);

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Hello My backend has started successfully");
});

// const verifyMail = async (req, res) => {
//   try {
//     const userId = req.query.id;

//     const updateResult = await Admin_signUp.updateOne(
//       { _id: userId },
//       { $set: { is_verified: 1 } }
//     );

//     if (updateResult) {
//       console.log("Mail verified");
//       res.status(200).send("Mail verified successfully");
//     } else {
//       console.log("No document found for the provided user ID");
//       res.status(404).send("No document found for the provided user ID");
//     }
// //   } catch (error) {
// //     console.log(error.message);
// //     res.status(500).send("An error occurred while verifying the mail");
// //   }
// // };
// // app.get("/verify", verifyMail);
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
