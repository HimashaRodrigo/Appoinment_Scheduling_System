import JobSeeker from "../models/JobSeeker.js";
import User from "../models/Users.js";
import {
  GeneratePassword,
  GenerateSalt,
  createToken,
  transporter,
} from "../utils/AuthUtil.js";
import path from "path";
import ejs from "ejs";
import { updateAccount } from "../utils/UpdateProfile.js";

const __dirname = path
  .dirname(path.dirname(new URL(import.meta.url).pathname))
  .slice(1);

console.log(__dirname);

// Method : POST
// End Point : "api/v1/user"
// Description : Create User
export const createUserAccounts = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Admin") {
      const { Email, Role } = req.body;
      const Password = "12345678";
      const salt = await GenerateSalt();
      const encryptPassword = await GeneratePassword(Password, salt);
      const user = await User.findOne({ Email: Email }).populate("Email");
      if (user === null) {
        const newUser = await User.create({
          Email: Email,
          Password: encryptPassword,
          Role: Role,
        });
        //send Email
        const mailOption = {
          from: "resto6430@gmail.com",
          to: Email,
          subject: "Registration Confrimation",
        };

        ejs.renderFile(
          `${__dirname}/Template/RegistrationEmail.ejs`,
          (err, renderHTML) => {
            if (err) {
              console.log(err.message);
              res.status(500).json({
                status: "Server Error",
                message: err.message,
              });
            } else {
              mailOption.html = renderHTML;
              transporter.sendMail(mailOption, (err, info) => {
                if (err) {
                  console.log(err.message);
                  res.status(500).json({
                    status: "Server Error",
                    message: err.message,
                  });
                } else {
                  const token = createToken(newUser._id, newUser.Email);
                  res.status(201).json({
                    status: "Success",
                    message: "Registration Successfull",
                    data: {
                      token,
                    },
                  });
                }
              });
            }
          }
        );
      } else {
        res.status(400).json({
          status: "ERROR",
          message: "This email is already registered",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: "Server error",
      message: error.message,
    });
  }
};

// Method : GET
// End Point : "api/v1/User"
// Description : Get Users
export const getUsers = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    if (user.Role === "Admin") {
      const sysUsers = await User.find();
      const jobSeekers = await JobSeeker.find();
      let Users = [];
      if (sysUsers === null && jobSeekers === null) {
        res.status(401).json({
          status: "Error",
          message: "There are no users",
        });
      } else {
        Users.push(sysUsers, jobSeekers);
        res.status(200).json({
          status: "Success",
          message: "Details of all users",
          data: {
            Users,
          },
        });
      }
    } else {
      res.status(401).json({
        status: "Error",
        message: "User Have No Authorization to do this action",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

// Method : GET
// End Point : "api/v1/User/:Role"
// Description : Get User By Role
export const getUsersByRole = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Admin" || user.Role === "Receptionist") {
      const { Role } = req.params;
      const Users = await User.find({ Role: Role }).populate("Role");
      if (Users !== null) {
        let users = [];
        Users.map((user) => {
          if (user.Role === Role) {
            users.push(user);
          }
        });
        res.status(201).json({
          status: "Success",
          message: "Users details",
          data: {
            users,
          },
        });
      }
    } else {
      res.status(401).json({
        status: "Error",
        message: "User Have No Authorization to do this action",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

// Method : Patch
// End Point : "api/v1/user"
// Description : Update User By Email

export const UpdateUserByAdmin = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Admin") {
      const {Email,Name,Gender,ContactNumber,Role,Status} = req.body;
      
      const findsysUser = await User.findOne({Email:Email}).populate("Email");
      
      if (findsysUser) {
        const updateUser = await User.findByIdAndUpdate(
          findsysUser.id,
          {
            Name:Name,
            Email:Email,
            Status: Status,
            Role:Role,
            ContactNumber:ContactNumber,
            Gender:Gender
          },
          { new: true }
        );
        console.log(updateUser);
        res.status(200).json({
          status: "Success",
          message: `${findsysUser.Email} is updated`,
          data: {
            updateUser,
          },
        });
      }
    } else {
      res.status(401).json({
        status: "Error",
        message: "User Have No Authorization to do this action",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

// Method : Patch
// End Point : "api/v1/User/:id"
// Description : Update User By ID
export const updateUserAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await updateAccount(id, req);
    console.log(updatedUser);
    res.status(200).json({
      status: "Success",
      message: `Profile is updated `,
      data: {
        updatedUser,
      },
    });
  } catch (error) {
    res.status(error.message);
  }
};
