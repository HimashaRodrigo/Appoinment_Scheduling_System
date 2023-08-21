import mongoose from "mongoose";
import validator from "validator";
const UserSchema = mongoose.Schema(
  {
    Name: {
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
    ProfileImage: {
      type: String,
    },
    Role: {
      type: String,
      required: true,
      enums: {
        values: ["Admin", "Receptionist", "Consaltant"],
        message:
          "User role must be one of : ['Admin','Receptionist','Consaltant']",
      },
    },
    ContactNumber: {
      type: String
    },
    Gender: {
      type: String,
      enum: {
        values: ["Male", "Female"],
        message: "Gender must be one of:['Male','Female']",
      }
    },
    Password: {
      type: String,
      required: [true, "User must have to enter the password"],
      minlength: 8,
      unique: true,
    },
    Status:{
      type:String,
      enum:{
        values:["Active","Deactive"]
      },
      default:"Active"
    },
    Availability:{
      type:String,
      enum:{
        values:["Available","Not Available"]
      },
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
UserSchema.pre('save', async function(next) {
  if (this.isModified('Role') && this.Role === 'Consaltant') {
    this.Availability = 'Available';
  }
  next();
});

const User = mongoose.model("User",UserSchema);

export default User;