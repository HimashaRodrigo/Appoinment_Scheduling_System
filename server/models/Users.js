import mongoose from "mongoose";
import validator from "validator";
const UserSchema = mongoose.Schema(
    {
        Name:{
            type:String,
        },
        Email:{
            type:String,
            required:[true,'Please enter the email'],
            unique:true,
            validate:{
                validator:(val)=>{
                    return validator.isEmail(val);
                },
                message: "Please enter the valid email"
            }
        },
        Role:{
            type:String,
            required:true,
            enums:{
                values:["Admin","Receptionist","Consaltant"],
                message:"User role must be one of : ['Admin','Receptionist','Consaltant']"
            },
            immutable:true
        },
        ContactNumber:{
            type:Number,
        },
        Gender:{
            type:String,
            enum:{
                values:["Male","Female"],
                message : "Gender must be one of:['Male','Female']"
            },
            immutable:true
        }
    }
)