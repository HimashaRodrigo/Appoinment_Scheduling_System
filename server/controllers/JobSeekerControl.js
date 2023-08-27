import JobSeeker from "../models/JobSeeker.js";
import {
  GeneratePassword,
  GenerateSalt,
  createToken,
} from "../utils/AuthUtil.js";
import { updateAccount } from "../utils/UpdateProfile.js";


// Method : POST
// End Point : "api/v1/jobseeker";
// Description : Create User
export const createSeekerAccount = async (req, res) => {
  try {
    const { Name, Email, ContactNumber, Password, ConfirmPassword, Gender } =
      req.body;
    const seeker = await JobSeeker.findOne({ Email: Email });
    if (seeker) {
      res.status(400).json({
        status: "Error",
        message: "This user is already exist!",
      });
    } else {
      if(Password !== null){
        if(Password.length >= 8){
          if (Password === ConfirmPassword) {
            const salt = await GenerateSalt();
            const encryptPassword = await GeneratePassword(Password, salt);
            const User = await JobSeeker.create({
              Name: Name,
              Email: Email,
              ContactNumber: ContactNumber,
              Password: encryptPassword,
              Gender: Gender,
            });
            console.log(User);
            const token = createToken(User._id, User.Email);
            return res.status(200).json({
              status: "Success",
              message: "User Account Created Successfully",
              data: {
                token,
              },
            });
          } else {
            return res.status(400).json({
              status: "ERROR",
              message: "Password Confirmation doesn't match",
            });
          }
        }else{
          return res.status(400).json({
            status: "ERROR",
            message: "Password must have at least 8 characters!",
          });
        }
      }
      else{
        return res.status(400).json({
          status: "ERROR",
          message: "Password field must be filled!",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: "Server error",
      message: error.message,
    });
  }
};

// Method : PATCH
// End Point : "api/v1/job-seeker/:id";
// Description : Update Seeker
export const updateSeekerAccount = async (req, res) => {
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

