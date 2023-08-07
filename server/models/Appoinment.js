import mongoose from "mongoose";

const AppoinmentSchema = mongoose.Schema(
    {
        Consaltant:{
            type: mongoose.Schema.ObjectId,
            ref:'User'
        },
        Job:{
            type:mongoose.Schema.ObjectId,
            ref:'Job'
        },
        JobSeeker:{
            type:mongoose.Schema.ObjectId,
            ref:'JobSeeker'
        },
        Date:{
            type:Date,
            required:[true,"Date is mandatory"]
        },
        Time:{
            type:String,
            required:[true,"Time is mandatory"]
        },
        Status:{
            type:String,
            required:[true,"Status Should Be Available"],
             enum:{
                values:["Placed","Cancelled"],
                message:"Status Must Be Placed Or Not Cancelled"
             },
             default:"Placed"
        }
    },
    {
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true
    }
);

const Appoinment = mongoose.model('Appoinment',AppoinmentSchema);

export default Appoinment;