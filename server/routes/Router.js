const express = require("express");
const router = express.Router(); // Use express.Router() instead of new express.Router()
const Products = require("../models/productSchema");
const users = require("../models/userSchema");
const Token = require("../models/tokenSchema");
const app = express();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

// Middleware for JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//get productsdata api
router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await Products.find({}).exec(); // Use async/await to handle asynchronous operation

    //console.log(productsdata);
    res.status(201).json(productsdata);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products"); // Handle potential errors
  }
});
//get individual data
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id);
    const individualData = await Products.findOne({ id: id }).exec();
    //console.log(individualData)

    res.status(201).json(individualData);
  } catch (error) {
    res.status(400).json(individualData);
    console.log(error);
  }
});

//register usersdata api
router.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, number, password, cpassword } = req.body;

  if (!name || !email || !number || !password || !cpassword) {
    return res
      .status(422)
      .json({ error: "Please fill in all the required fields" });
  }

  try {
    const preuser = await users.findOne({ email: email });
    console.log("EXisting user" + preuser);
    if (preuser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    } else if (password !== cpassword) {
      return res
        .status(422)
        .json({ error: "Password and confirm password do not match" });
    } else {
      const finalUser = new users({ name, email, number, password, cpassword });
      console.log("USer ka data ready hai dekhlo" + finalUser);

      //prasant -> encrypt -> fgdytfh -> decrypt -> prasant
      //We are using bcryptjs
      //password hashing process

      const storedData = await finalUser.save();
      res.status(201).json(storedData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//login user api post

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Please fill in all the required fields" });
  }

  try {
    const user = await users.findOne({ email: email });
    //console.log("Diya hua credenials kiska hai  ="+user)
    if (user) {
      const matchPassword = await bcrypt.compare(password, user.password);
      console.log("Password match : " + matchPassword);

      // cookie generation and sending to the site

      //    res.cookie("Pheonixweb",token,{

      //     httpOnly:true,
      //     secure: false,
      //     sameSite:"none",
      //    })

      //res.setHeader("Set-Cookie", `Pheonixweb=${token}; HttpOnly; Secure; SameSite=None`);  //using set header in http

      // Using cookies library to set the cookie
      // const cookies = new Cookies(req, res);
      // cookies.set("Pheonixweb", token, {
      //     httpOnly: true,
      //     secure: false, // Update this based on your environment
      //     sameSite: "none", // Update this based on your requirements
      // });

      if (!matchPassword) {
        return res.status(422).json({ error: "Invalid Details" });
      } 
      else
      {
        //Token generation
        const token = await user.generateAuthtoken();
        const exist = await Token.findOne({});
        if (exist) {
          const res = await Token.deleteMany({ id: exist.id });
        }
        const Login = new Token({ id: user._id, token: token });
        const storedData = await Login.save();

        return res.status(201).json(user);
      }
    } else {
      res.status(400).json({ error: "Invalid Details" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid Details" });
  }
});

//adding data into cart

router.post("/addcart/:id", authenticate, async (req, res) => {
  //before starting the async function authenticate middle ware will be run if no error will be there then only this async will run
  try {
    //console.log("I am in the addcart/:id part")
    const { id } = req.params;
    const cart = await Products.findOne({ id: id });
    // console.log(cart)

    const token = await Token.findOne({});
    // console.log(token.id);

    const Usercontact = await users.findOne({ _id: token.id });
    //console.log(Usercontact);

    if (Usercontact) {
      const cartData = await Usercontact.addcartdata(cart);
      await Usercontact.save();
      //console.log(cartData);
      res.status(201).json(Usercontact);
    } else {
      res.json({ error: "Invalid details" });
    }
  } catch (error) {
    console.log(error);
  }
});

//get cart details

router.get("/validUser", authenticate, async (req, res) => {
  try {
    const token = await Token.findOne({});
    const id = token.id;
    const validuser = await users.findOne({ _id: id });
    // console.log("VAlidating user in router area")
    // console.log(validuser)
    res.status(201).json(validuser);
  } catch (error) {
    console.log("error" + error);
  }
});

//remove item from cart
router.delete("/remove/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const token = await Token.findOne({});
    const Userid = token.id;
    const validuser = await users.findOne({ _id: Userid });
    validuser.carts = validuser.carts.filter((cValue) => {
      return cValue.id != id;
    });

    validuser.save();
    res.status(201).json(validuser);
    console.log("Item removed");
  } catch (error) {
    console.log(error);
    res.status(400).json(validuser);
  }
});

//logout the user
router.get("/logout", authenticate, async (req, res) => {
  try {
    const token = await Token.findOne({});
    const Userid = token.id;
    await Token.deleteOne({ id: Userid });
    console.log("Now,user is logout");
    res.status(201).json({ msg: "Successfully logged ou" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
