import getToken from "../utils/getToken.js";

const user = {
  name: "Akshay",
  email: "asdf123@gmail.com",
  password: "asdf@123",
};

export const login = (req, res) => {
  try {
    const { email, password } = req.body;

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
