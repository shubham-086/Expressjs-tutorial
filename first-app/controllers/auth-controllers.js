import { User } from "../models/user-model.js";
import getToken from "../utils/getToken.js";
import { readUsers, writeUsers } from "../utils/helper.js";

// export const login = (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const users = readUsers();
//     const userIndex = users.findIndex((u) => email === u.email);

//     const user = users[userIndex];

//     if (!user) {
//       res.status(404).send("User not found!");
//     }

//     if (email === user.email && password === user.password) {
//       const token = getToken(user);

//       return res
//         .status(200)
//         .cookie("token", token, { httpOnly: true })
//         .send("User logged in successfully");
//     }

//     return res.status(401).send("Unauthorized user");
//   } catch (error) {
//     console.log("Error in Login:", error);
//     res.status(500).send("Something went wrong!");
//   }
// };

// export const signUp = (req, res) => {
//   try {
//     let { name, email, password } = req.body;

//     if (!name && !email && !password) {
//       res.status(400).send("All fields are required");
//     }

//     const newUsers = { name, email, password };

//     const users = readUsers() || [];
//     users.push(newUsers);

//     writeUsers(users);

//     res.status(201).send("Registration successfull.");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Something went wrong!");
//   }
// };

export const signUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name && !email && !password) {
      res.status(400).send("All fields are required");
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).send("Registration successfull.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(404).send("Email and password is required!");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(404).send("User with this email does not exist!");
    }

    if (email === user.email && password === user.password) {
      const token = getToken(user);

      return res
        .status(200)
        .cookie("token", token, { httpOnly: true })
        .send("User logged in successfully");
    }

    return res.status(401).send("Unauthorized user");
  } catch (error) {
    console.log("Error in Login:", error);
    res.status(500).send("Something went wrong!");
  }
};
