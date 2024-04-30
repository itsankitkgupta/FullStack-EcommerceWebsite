const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Product = require("../Models/AdminModals/Product");
const Admin_signUp = require("../Models/AdminModals/Signup");

const AdminRegistration = async (req, res) => {
  const { name, email, phoneno, password } = req.body;

  if (!password) {
    return res.status(401).json({ message: "No Password" });
  }
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);
  const verificationCode = crypto.randomBytes(3).toString("hex");
  console.log(verificationCode);
  try {
    //   const check_Email = await Admin_signUp.find({Email:email})
    //  if(check_Email)
    //   {
    //     res.status(200).json({message:"Email id already exist"})
    //   }
    const signup = new Admin_signUp({
      Name: name,
      Email: email,
      PhoneNo: phoneno,
      Password: newPassword,
      verificationCode,
    });
    const adminData = await signup.save();
    if (adminData) {
      sendverifymail(name, email, verificationCode);
    }
    const data = {
      signup: {
        id: signup._id,
      },
    };
    // const AuthToken = jwt.sign(data, process.env.JWT_SECRET);
    // console.log(AuthToken, "Signup");
    res.status(200).send({ message: "Signup Successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred during signup: " + error.message });
  }
};

const sendverifymail = async (name, email, verificationCode) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "For Verification mail",
      // html:"<p>Hello! " + name + ", Please click <a href='http://localhost:3000/verify?id=" + user_id + "'>here</a> to verify your mail</p>"
      text: `Hello ${name}, The verification code for ${email}  is ${verificationCode}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent ", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const adminMailVerification = async (req, res) => {
  try {
    const { verificationCode } = req.body;
    const adminUser = await Admin_signUp.findOne({ verificationCode });
    if (!adminUser) {
      return res.status(404).json({ message: "Wrong code" });
    } else if (adminUser.verificationCode === verificationCode) {
      adminUser.is_verified = true;
      await adminUser.save(); // Wait for the save operation to complete
      return res.status(200).json({ message: "Signup successful" });
    } else {
      return res.status(400).json({ message: "Invalid Code" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const adminSignin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const signin = await Admin_signUp.findOne({ Email: email });
    if (!signin) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const passwordCompare = await bcrypt.compare(password, signin.Password);

    if (!passwordCompare) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const payload = {
      id: signin._id,
    };
    const AuthToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ AuthToken });
    console.log("signin", AuthToken);
    // res.cookie("SigninToken",AuthToken)
  } catch (error) {
    res.status(500).json({
      message: "An error occurred during signing in: " + error.message,
    });
  }
};

const adminLogout = async (req, res) => {
  try {
    const deletecookie = res.clearCookie("token");
    console.log(deletecookie, "deletecookie");
    if (deletecookie) {
      res.send({ message: "Logout successfull" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});
const OTP = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const otp = generateOTP();
  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "OTP verification",
    text: `Your OTP is: ${otp}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.json({ error });
    } else {
      res.json({ message: "Email sent successfully" });
    }
  });
};
const adminNewsletter = async (req, res) => {
  const { Mail } = req.body;
  console.log(Mail);
  const secndMailOption = {
    from: process.env.SMTP_MAIL,
    to: Mail,
    subject: "Thank You for Subscribing!..",
    text: "Hii!!...This is Ankit Kumar Gupta,thanking you for Susbscribing to my newsletter",
  };
  transporter.sendMail(secndMailOption, (error, info) => {
    if (error) {
      res.status(500).send({ error: error });
    } else {
      res
        .status(200)
        .send({ message: "Thank you for subscribing to the newsletter!" });
    }
  });
};

const adminslist = async (req, res) => {
  try {
    const data = await Admin_signUp.find({});
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching users: " + error.message,
    });
  }
};
const adminDeleteapi = async (req, res) => {
  const { id } = req.body;
  try {
    await Admin_signUp.findOneAndDelete({ _id: id });
    res.json({ message: "User deleted from database" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting user: " + error.message,
    });
  }
};

const Addproducts = async (req, res) => {
  try {
    const { ProductName, ProductType, Price, Manufacturer, Description } = req.body;
    console.log(req.body);
    const { filename } = req.file;

    const products =await new Product({
      ProductName,
      ProductType,
      Price,
      Manufacturer,
      Description,
      Image:filename,
    });
await products.save();
    res.status(200).send({success:true,
       message: "Products added successfully",
      products });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Products could not be saved", error: error });
  }
};
const getproducts = async (req, res) => {
  try {
    const data = await Product.find();
    res.status(200).send({ data });
  } catch (error) {
    console.error(error);
  }
};

const deleteproducts = async (req, res) => {
  const { id } = req.body;
  try {
    await Product.findOneAndDelete({ _id: id });
    res.status(200).send({ message: "Product deleted" });
  } catch (error) {
    console.error("An error occurred while deleting", error.message);
  }
};

const getsingleproducts = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findById({ _id: id });
    res.send({ data });
  } catch (error) {
    console.error("Error message" + error.message);
  }
};
const updateproduct = async (req, res) => {
  const { filename } = req.file;
  if (!filename) {
    res.send({ message: "image is not defined" });
  }
  try {
    const { id, ProductName, ProductType, Price, Manufacturer, Description } =
      req.body;

    const products = await Product.findOneAndUpdate(
      { _id: id },
      {
        ProductName: ProductName,
        ProductType: ProductType,
        Price: Price,
        Manufacturer: Manufacturer,
        Description: Description,
        Image: filename,
      }
    );
    const data = await products.save();
    if (data) {
      res.send({ message: "products updated successfully" });
    }
  } catch (error) {
    console.error("An error occurred while updating" + error.message);
  }
};
module.exports = {
  AdminRegistration,
  adminMailVerification,
  adminSignin,
  adminLogout,
  OTP,
  adminNewsletter,
  adminslist,
  adminDeleteapi,
  Addproducts,
  getproducts,
  deleteproducts,
  getsingleproducts,
  updateproduct,
};
