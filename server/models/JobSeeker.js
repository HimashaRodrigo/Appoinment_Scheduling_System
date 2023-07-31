import mongoose from "mongoose";

const JobSeekerSchema = mongoose.Schema(
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
                values:["Job Seeker"],
                message:"User role must be one of : ['Job Seeker']"
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