// const express = require("express");
// const multer = require("multer");

// const {
//   AdminRegistration,
//   OTP,
//   adminMailVerification,
//   adminSignin,
//   adminLogout,
//   adminNewsletter,
//   adminslist,
//   adminDeleteapi,
//   getproducts,
//   deleteproducts,
//   getsingleproducts,
//   adminProductUpdate,
//   Addproducts,

// } = require("../Controllers/AdminController");

// const adminRouter = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../public/Images");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       `${file.originalname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });
// const upload = multer({
//   storage: storage,
// });


// adminRouter.post("/AdminSignUp", AdminRegistration);
// adminRouter.post("/verify-email", adminMailVerification);
// adminRouter.post("/AdminSignIn", adminSignin);
// adminRouter.get("/logout", adminLogout);
// adminRouter.post("/sendOTP", OTP);
// adminRouter.post("/newsletter", adminNewsletter);
// adminRouter.get("/users", adminslist);
// adminRouter.delete("/users", adminDeleteapi);
// adminRouter.post("/products",upload.single('image'), Addproducts);
// adminRouter.get("/products", getproducts);
// adminRouter.delete("/products",deleteproducts)
// adminRouter.get("/singleproduct/:id",getsingleproducts)
// adminRouter.put("/update-product",adminProductUpdate)

// module.exports = adminRouter;
const express = require("express");
const multer = require("multer");
const path = require("path"); // Import path module for file extension

const {
  AdminRegistration,
  OTP,
  adminMailVerification,
  adminSignin,
  adminLogout,
  adminNewsletter,
  adminslist,
  adminDeleteapi,
  getproducts,
  deleteproducts,
  getsingleproducts,
  Addproducts,
  updateproduct,
} = require("../Controllers/AdminController");

const adminRouter = express.Router();

// Define multer storage and upload middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../public/Images"); // Absolute path to destination directory
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.originalname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
});

// Routes
adminRouter.post("/AdminSignUp", AdminRegistration);
adminRouter.post("/verify-email", adminMailVerification);
adminRouter.post("/AdminSignIn", adminSignin);
adminRouter.get("/logout", adminLogout);
adminRouter.post("/sendOTP", OTP);
adminRouter.post("/newsletter", adminNewsletter);
adminRouter.get("/users", adminslist);
adminRouter.delete("/users", adminDeleteapi);
adminRouter.post("/products", upload.single('filename'), Addproducts);
adminRouter.get("/products", getproducts);
adminRouter.delete("/products", deleteproducts);
adminRouter.get("/singleproduct/:id", getsingleproducts);
adminRouter.put("/update-product",upload.single("filename"),updateproduct);

module.exports = adminRouter;
