import mongoose from "mongoose";
import validator from "validator";

const JobSeekerSchema = mongoose.Schema(
  {
    Appoinment:{
      type:mongoose.Schema.ObjectId,
      ref:"Appoinment"
    },
    Name: {
      type: String,
      required:[true,"Name is required!"]
    },
    ProfileImage: {
      type: String,
    },
    Email: {
      type: String,
      required: [true, "Please enter the email"],
      unique: true,
      validate: {
        validator: (val) => {
          return validator.isEmail(val);
        },
        message: "Please enter the valid email",
      },
    },
    Role: {
      type: String,
      required: true,
      default:"Job Seeker",
      immutable: true,
    },
    Password: {
      type: String,
      minlength: 8,
      unique: true,
    },
    ContactNumber: {
      type: String,
      required:[true,"Contact number is required!"]
    },
    ConfirmPassword: {
      type: String,
      select: false,
      validate: {
        validator: function (pwd) {
          return this.Password === pwd;
        },
        message: "Password doesn't match",
      },
    },
    Gender: {
      type: String,
      enum: {
        values: ["Male", "Female"],
        message: "Gender must be one of:['Male','Female']",
      }
    },
    Status:{
      type:String,
      required:[true,"Status is required!"],
      enum:{
        values:["Active","Deactive"]
      },
      default:"Active"
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const JobSeeker = mongoose.model('JobSeeker',JobSeekerSchema);

export default JobSeeker;
