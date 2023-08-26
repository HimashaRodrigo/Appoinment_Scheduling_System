import mongoose from "mongoose";

const AppoinmentSchema = mongoose.Schema(
    {
        AppoinmentNo:{
            type:String,
            required:[true,"Appoinment Number Is Mandatory"],
            unique:true,
            immutable:true
        },
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
            type:String,
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
                values:["Placed","Cancelled","Finished"],
                message:"Status Must Be Placed,Finished Or Cancelled"
             },
             default:"Placed"
        },
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