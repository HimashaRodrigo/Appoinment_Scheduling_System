import JobSeeker from "../models/JobSeeker.js";
import User from "../models/Users.js";
import { GeneratePassword, GenerateSalt, createToken, transporter } from "../utils/AuthUtil.js";
import path from "path";
import ejs from "ejs";
import { updateAccount } from "../utils/UpdateProfile.js";

const __dirname = path
  .dirname(path.dirname(new URL(import.meta.url).pathname))
  .slice(1);

console.log(__dirname);

// Method : POST
// End Point : "api/v1/User"
// Description : Create User
export const createUserAccounts = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Admin") {
      const { Email, Role } = req.body;
      const Password = "12345678";
      const salt = await GenerateSalt();
      const encryptPassword = await GeneratePassword(Password, salt);
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
        { Email: Email },
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
                const token = createToken(
                  newUser._id,
                  newUser.Email
                );
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
      const Users = await User.find({ Role: Role }).populate(
        "Role"
      );
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
// End Point : "api/v1/User/:id"
// Description : Deactivate User By Email

export const deactivateUser = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Admin") {
      const { id } = req.params;
      const findsysUser = await User.findById(id);
      if (findsysUser) {
        const deactivateUser = await User.findByIdAndUpdate(
          findsysUser.id,{
            Status:"Deactive"
          },
          {new:true}
        );
        res.status(200).json({
          status: "Success",
          message: `${findsysUser.Email} is deactivated`,
          data: {
            deactivateUser,
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
    const updatedUser = await updateAccount(id,req);
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