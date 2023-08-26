import JobSeeker from "../models/JobSeeker.js";
import User from "../models/Users.js";
import multer from "multer";



export const updateAccount = async (id, req) => {
  try {
    const { Name, Email, ContactNumber, Gender } = req.body;
    console.log(req.body);
    let Model, updatedUser,Country;

    const jobSeeker = await JobSeeker.findById(id);
    const sysUser = await User.findById(id);

    if (jobSeeker) {
      Model = JobSeeker;
    } else if (sysUser) {
      Model = User;
    } else {
      return "User doesn't exist!";
    }
    const data = {
      Name: Name,
      Email: Email,
      ContactNumber: ContactNumber,
      Gender: Gender,
    };

    updatedUser = await Model.findByIdAndUpdate(id, data, { new: true });
    return updatedUser;
  } catch (error) {
    return error.message;
  }
};

