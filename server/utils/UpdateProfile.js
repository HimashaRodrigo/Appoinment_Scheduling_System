import JobSeeker from "../models/JobSeeker.js";
import User from "../models/Users.js";
import multer from "multer";

const imageStorage = multer.diskStorage({
  destination: "Images/Users",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

export const image = multer({ storage: imageStorage }).single("image");

export const updateAccount = async (id, req) => {
  try {
    const { Name, image, Email, ContactNumber, Gender } = req.body;
    console.log(req.body);
    let Model, updatedUser;

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
      ProfileImage: req.file ? req.file.filename : image,
    };

    updatedUser = await Model.findByIdAndUpdate(id, data, { new: true });
    return updatedUser;
  } catch (error) {
    return error.message;
  }
};

