import mongoose from "mongoose";
import Appoinment from "../models/Appoinment.js";
import JobSeeker from "../models/JobSeeker.js";
import User from "../models/Users.js";

// Method : POST
// End Point : "api/v1/appoinment";
// Description : Create an appoinment
export const AddAppoinment = async (req, res) => {
  try {
    const user = req.user;

    if (user.Role !== "Receptionist") {
      return res.status(401).json({
        status: "Error",
        message: "User does not have authorization for this action",
      });
    }

    const { ContactNumber, Consaltant, Job, Date, Time, Name, Gender, Email } = req.body;

    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const findJobSeeker = await JobSeeker.findOne({ ContactNumber }).populate("ContactNumber");
      const findConsaltant = await User.findOne({ Email: Consaltant }).populate("Email");

      let newAppoinment, createJobSeeker;

      if (findJobSeeker) {
        newAppoinment = await Appoinment.create({
          Consaltant: findConsaltant.id,
          JobSeeker: findJobSeeker.id,
          Job,
          Date,
          Time,
        }, { session });

        await JobSeeker.findByIdAndUpdate(findJobSeeker.id, { Appoinment: newAppoinment.id }, { session });
      } else {
        newAppoinment = await Appoinment.create({
          Consaltant: findConsaltant.id,
          JobSeeker: createJobSeeker.id,
          Job,
          Date,
          Time,
        }, { session });

        createJobSeeker = await JobSeeker.create({
          Name,
          ContactNumber,
          Gender,
          Email,
          Appoinment: newAppoinment.id,
        }, { session });
      }

      await User.findByIdAndUpdate(findConsaltant.id, { Availability: "Not Available" }, { session });

      await session.commitTransaction();
      session.endSession();

      return res.status(201).json({
        status: "Success",
        message: "Appointment is placed",
        data: {
          newAppoinment,
          createJobSeeker,
        },
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      return res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};


// Method : GET
// End Point : "api/v1/appoinment";
// Description : Get all appoinments
export const getAppoinments = async(req,res)=>{
  try {
    const user = req.user;
    if(user.Role === "Receptionist"){
      const findAppoinments = await Appoinment.find();
      let Appoinments = [];
      for(const appoinment of findAppoinments){
        let appoinmentDetails;
        try {
          const populatedAppoinment = await Appoinment.findById(appoinment.id)
            .populate({
              path:"Consaltant",
              model:"User"
            })
            .populate({
              path:"Job",
              model:"Job"
            })
            .populate({
              path:"JobSeeker",
              model:"JobSeeker"
            })
            .exec();

            const ConsaltantName = populatedAppoinment.Consaltant.Name;
            const ConsaltantEmail = populatedAppoinment.Consaltant.Email;
            const Job = populatedAppoinment.Job.Name;
            const AverageSalary = populatedAppoinment.Job.AvgSalary;
            const JobSeekerName = populatedAppoinment.JobSeeker.Name;
            const JobSeekerContactNo = populatedAppoinment.JobSeeker.ContactNumber;
            appoinmentDetails = {
              ConsaltantName:ConsaltantName,
              ConsaltantEmail:ConsaltantEmail,
              Job:Job,
              AverageSalary:AverageSalary,
              JobSeekerName:JobSeekerName,
              JobSeekerContactNo:JobSeekerContactNo,
              Date:populatedAppoinment.Date,
              Time:populatedAppoinment.Time
            };
            Appoinments.push(appoinmentDetails);
        } catch (error) {
          res.status(500).json({
            status: "Server Error",
            message: error.message,
          });
        }
      }
    }
    else{
      res.status(401).json({
        status: "Error",
        message: "User Have No Authorization to do this action",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
}

// Method : PATCH
// End Point : "api/v1/appoinment/:id";
// Description : Cancel an appoinment
export const cancelAppoinment = async(req,res)=>{
  try {
    const user = req.user;
    const {id} = req.params;
    if (user.Role !== "Receptionist") {
      return res.status(401).json({
        status: "Error",
        message: "User does not have authorization for this action",
      });
    }

    const session = await mongoose.startSession();

    try {
      session.startTransaction();
      const findAppoinment = await Appoinment.findById(id)
      .populate({
        path:"Consaltant",
        model:"User"
      })
      .populate({
        path:"Job",
        model:"Job"
      })
      .populate({
        path:"JobSeeker",
        model:"JobSeeker"
      })
      .exec();
      const ConsaltantId = findAppoinment.Consaltant.id;
      const JobSeekerId = findAppoinment.JobSeeker.id;
      const updateAppoinment = await Appoinment.findByIdAndUpdate(id,{Status:"Cancelled"},{new:true}).session(session);
      await User.findByIdAndUpdate(ConsaltantId,{Availability:"Available"},{new:true}).session(session);
      await JobSeeker.findByIdAndUpdate(JobSeekerId,{Appoinment:null},{new:true}).session(session);

      await session.commitTransaction();
      session.endSession();

      return res.status(201).json({
        status: "Success",
        message: "Appointment is cancelled",
        data: {
          updateAppoinment
        },
      });

    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      return res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
}