import JobSeeker from "../models/JobSeeker.js";
import User from "../models/Users.js";
import { GeneratePassword, GenerateSalt, createToken, transporter, validatePassword } from "../utils/AuthUtil.js";
import path from "path";
import ejs from "ejs";

const __dirname = path
  .dirname(path.dirname(new URL(import.meta.url).pathname))
  .slice(1);

// METHOD:POST,
// END POINT : api/v1/auth/login
// DESC : User Login
const maxAge = 3 * 24 * 60 * 60;
export const LoginUser = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await User.findOne({ Email: Email }).populate("Email");
    const jobseeker = await JobSeeker.findOne({ Email: Email }).populate("Email");
    if (user != null) {
      const result = await validatePassword(Password, user.Password);
      if (result) {
        const token = createToken(user._id, user.Email, user.Role);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.json(token);
      } else {
        res.status(400).json({
          status: "Error",
          message: "Invalid Password",
        });
      }
    } else if (jobseeker != null) {
      const result = await validatePassword(Password, jobseeker.Password);
      
      if (result) {
        const token = createToken(jobseeker._id, jobseeker.Email, jobseeker.Role);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.json(token);
      } else {
        res.status(400).json({
          status: "Error",
          message: "Invalid Password",
        });
      }
    } else {
      res.status(400).json({
        status: "Error",
        message: "Invalid Email",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Server Error",
      message: err.message,
    });
  }
};

// METHOD:POST,
// END POINT : api/v1/auth/logout
// DESC : User Logout
export const LogoutUser = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({
    status: "Success",
    message: "User Logged Out",
  });
};

// Method : GET
// End Point : "api/v1/auth/current-user";
// Description : Get User
export const getUserProfile = async (req, res) => {
  try {
    const GetUser = req.user;
    const findUser = await User.findOne({ Email: GetUser.Email });
    const findJobSeeker = await JobSeeker.findOne({ Email: GetUser.Email });
    if (findUser) {
      const user = findUser;
      res.status(201).json({
        message: `Account Details of ${user.Name}`,
        user,
      });
    } else if (findJobSeeker) {
      const user = findJobSeeker;
      res.status(201).json({
        message: `Account Details of ${user.Name}`,
        user,
      });
    } else {
      res.status(404).json({
        message: "No user exist",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Method : PATCH
// End Point : "api/v1/auth/reset-password";
// Description : Reset Password
export const PasswordReset = async (req, res) => {
  try {
    const user = req.user;
    const { CurrentPassword, NewPassword, ConfirmPassword } = req.body;
    console.log(req.body);
    const result = await validatePassword(CurrentPassword, user.Password);
    console.log(result);
    const jobseeker = await JobSeeker.findOne({ Email: user.Email }).populate(
      "Email"
    );
    const sysUser = await User.findOne({
      Email: user.Email,
    }).populate("Email");
    if (result) {
      if (NewPassword === ConfirmPassword) {
        const salt = await GenerateSalt();
        const encryptedPassword = await GeneratePassword(NewPassword, salt);
        if (jobseeker) {
          await JobSeeker.findOneAndUpdate(
            { Email: user.Email },
            {
              Password: encryptedPassword,
            },
            {
              new: true,
            }
          );
        } else if (sysUser) {
          console.log("test");
          await User.findOneAndUpdate(
            { Email: user.Email },
            {
              Password: encryptedPassword,
            },
            {
              new: true,
            }
          );
        }
        res.status(201).json({
          status: "Success",
          message: `Password Reset Successfully`,
        });
      } else {
        res.status(400).json({
          status: "Error",
          message: "Confirm Password Doesn't Match!",
        });
      }
    } else {
      res.status(402).json({
        status: "Error",
        message: `Current Password is incorrect!`,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

const createOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
};
let otp;
let Email1;
export const sendOTP = async (req, res) => {
  try {
    const {Email } = req.body;
    Email1 = Email;
    const jobseeker = await JobSeeker.findOne({ Email: Email }).populate("Email");
    const sysUser = await User.findOne({
      Email: Email,
    }).populate("Email");
    otp = createOTP();
    if (jobseeker || sysUser) {
      const mailOption = {
        from: "resto6430@gmail.com",
        to: Email,
        subject: "Paasowrd Reset",
      };
      ejs.renderFile(
        `${__dirname}/Template/forgotPassword.ejs`,{OTP:otp},
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
                res.status(201).json({
                  status: "Success",
                  message: "OTP send Successfull",
                });
              }
            });
          }
        }
      );
    } else {
      res.status(404).json({ message: `Invalid Contact Number` });
    }
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

export const ForgotPassword = async (req, res) => {
  try {
    const { OTP, Password, ConfirmPassword } = req.body
    const jobseeker = await JobSeeker.findOne({ Email:Email1 }).populate("Email");
    const sysUser = await User.findOne({
      Email:Email1,
    }).populate("Email");
    const salt = await GenerateSalt();
    const encryptedPassword = await GeneratePassword(Password, salt);
    if (otp == OTP) {
      if(Password === ConfirmPassword){
        if (jobseeker) {
          const updateJobSeekerPwd = await JobSeeker.findByIdAndUpdate(
            customer.id,
            {
              Password: encryptedPassword,
            },
            { new: true }
          );
          res.status(200).json({
            status: "Success",
            message: "Password Reset Successfully",
            data: {
              updateJobSeekerPwd,
            },
          });
        } else if (sysUser) {
          const updateUserPwd =
            await User.findByIdAndUpdate(
              customer.id,
              {
                Password: encryptedPassword,
              },
              { new: true }
            );
          res.status(200).json({
            status: "Success",
            message: "Password Reset Successfully",
            data: {
              updateUserPwd,
            },
          });
        }
      }
    } else {
      res.status(400).json({
        status: "Success",
        message: "Invalid OTP",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};