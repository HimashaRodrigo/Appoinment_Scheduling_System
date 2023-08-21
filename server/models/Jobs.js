import mongoose from "mongoose";

const JobSchema = mongoose.Schema(
    {
        Name:{
            type:String,
            required:[true,"Job type is mandatory"]
        },
        AvgSalary:{
            type:String,
            required:[true,"Average Salary must be added"]
        },
        Status:{
            type:String,
             required:[true,"Status Should Be Available"],
             enum:{
                values:["Available","Not Available"],
                message:"Status Must Be Available Or Not Available"
             },
             default:"Available"
        }
    },
    {
        toJSON: {
          virtuals: true,
        },
        toObject: { virtuals: true },
        timestamps: true,
      }
);

const JobCategory = mongoose.model('Job',JobSchema);

export default JobCategory;