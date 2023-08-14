import mongoose from "mongoose";
import Appoinment from "../models/Appoinment.js";
import JobSeeker from "../models/JobSeeker.js";
import User from "../models/Users.js";
import JobCategory from "../models/Jobs.js";

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

    const { ContactNumber, Consaltant, Job, Date, Time, Name, Gender, Email } =
      req.body;
    console.log(req.body);
    const AppoinmentNo = "AP" + Math.floor(100 + Math.random() * 1000);
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const findJobSeeker = await JobSeeker.findOne({
        ContactNumber: ContactNumber,
      }).populate("ContactNumber");

      const findConsaltant = await User.findOne({ Email: Consaltant }).populate(
        "Email"
      );

      const findJob = await JobCategory.findOne({ Name: Job }).populate("Name");

      let newAppoinment, createJobSeeker;

      if (findJobSeeker) {
        newAppoinment = await Appoinment.create(
          [
            {
              Consaltant: findConsaltant.id,
              JobSeeker: findJobSeeker.id,
              Job: findJob.id,
              Date: Date,
              Time: Time,
              AppoinmentNo: AppoinmentNo,
            },
          ],
          { session }
        );

        await JobSeeker.findByIdAndUpdate(
          findJobSeeker.id,
          { Appoinment: newAppoinment.id },
          { session }
        );
      } else {
        newAppoinment = await Appoinment.create(
          [
            {
              Consaltant: findConsaltant.id,
              JobSeeker: createJobSeeker.id,
              Job: findJob.id,
              Date: Date,
              Time: Time,
              AppoinmentNo: AppoinmentNo,
            },
          ],
          { session }
        );

        createJobSeeker = await JobSeeker.create(
          [
            {
              Name,
              ContactNumber,
              Gender,
              Email,
              Appoinment: newAppoinment.id,
            },
          ],
          { session }
        );
      }

      await User.findByIdAndUpdate(
        findConsaltant.id,
        { Availability: "Not Available" },
        { session }
      );

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
export const getAppoinments = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Receptionist") {
      const findAppoinments = await Appoinment.find();
      console.log(findAppoinments);
      if (findAppoinments !== null) {
        let Appoinments = [];
        for (const appoinment of findAppoinments) {
          let appoinmentDetails;
          try {
            const populatedAppoinment = await Appoinment.findById(appoinment.id)
              .populate({
                path: "Consaltant",
                model: "User",
              })
              .populate({
                path: "Job",
                model: "Job",
              })
              .populate({
                path: "JobSeeker",
                model: "JobSeeker",
              })
              .exec();

            const ConsaltantName = populatedAppoinment.Consaltant.Name;
            const ConsaltantEmail = populatedAppoinment.Consaltant.Email;
            const Job = populatedAppoinment.Job.Name;
            const AverageSalary = populatedAppoinment.Job.AvgSalary;
            const JobSeekerName = populatedAppoinment.JobSeeker.Name;
            const JobSeekerContactNo =
              populatedAppoinment.JobSeeker.ContactNumber;
            const AppoinmentNo = populatedAppoinment.AppoinmentNo;
            appoinmentDetails = {
              AppoinmentNo: AppoinmentNo,
              ConsaltantName: ConsaltantName,
              ConsaltantEmail: ConsaltantEmail,
              Job: Job,
              AverageSalary: AverageSalary,
              JobSeekerName: JobSeekerName,
              JobSeekerContactNo: JobSeekerContactNo,
              Date: populatedAppoinment.Date,
              Time: populatedAppoinment.Time,
            };
            Appoinments.push(appoinmentDetails);
          } catch (error) {
            res.status(500).json({
              status: "Server Error",
              message: error.message,
            });
          }
        }
        return res.status(200).json({
          status: "SUCCESS",
          data: {
            Appoinments,
          },
          message: "All Appoinments Details",
        });
      } else {
        res.status(404).json({
          status: "NOT FOUND",
          message: "There are no records!",
        });
      }
    } else {
      res.status(401).json({
        status: "Error",
        message: "User Have No Authorization to do this action",
      });
    }
  } catch (error) {
   res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

// Method : GET
// End Point : "api/v1/appoinment/:id";
// Description : Get appoinment by id
export const getAppoinmentById = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Receptionist") {
      const { id } = req.params;
      let Appoinments = [];
      let appoinmentDetails;
      try {
        const populatedAppoinment = await Appoinment.findById(id)
          .populate({
            path: "Consaltant",
            model: "User",
          })
          .populate({
            path: "Job",
            model: "Job",
          })
          .populate({
            path: "JobSeeker",
            model: "JobSeeker",
          })
          .exec();

        if (populatedAppoinment) {
          const ConsaltantName = populatedAppoinment.Consaltant.Name;
          const ConsaltantEmail = populatedAppoinment.Consaltant.Email;
          const Job = populatedAppoinment.Job.Name;
          const AverageSalary = populatedAppoinment.Job.AvgSalary;
          const JobSeekerName = populatedAppoinment.JobSeeker.Name;
          const JobSeekerContactNo =
            populatedAppoinment.JobSeeker.ContactNumber;
          const AppoinmentNo = populatedAppoinment.AppoinmentNo;
          appoinmentDetails = {
            AppoinmentNo: AppoinmentNo,
            ConsaltantName: ConsaltantName,
            ConsaltantEmail: ConsaltantEmail,
            Job: Job,
            AverageSalary: AverageSalary,
            JobSeekerName: JobSeekerName,
            JobSeekerContactNo: JobSeekerContactNo,
            Date: populatedAppoinment.Date,
            Time: populatedAppoinment.Time,
          };
          Appoinments.push(appoinmentDetails);
          return res.status(200).json({
            status: "SUCCESS",
            data: {
              Appoinments,
            },
            message: "Details of given appoinment",
          });
        } else {
          res.status(404).json({
            status: "NOT FOUND",
            message: "There are no appoinment related to this ID!",
          });
        }
      } catch (error) {
        res.status(500).json({
          status: "Server Error",
          message: error.message,
        });
      }
    } else {
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
};

// Method : PATCH
// End Point : "api/v1/appoinment/:id";
// Description : Cancel an appoinment
export const cancelAppoinment = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
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
          path: "Consaltant",
          model: "User",
        })
        .populate({
          path: "Job",
          model: "Job",
        })
        .populate({
          path: "JobSeeker",
          model: "JobSeeker",
        })
        .exec();
      const ConsaltantId = findAppoinment.Consaltant.id;
      const JobSeekerId = findAppoinment.JobSeeker.id;
      const updateAppoinment = await Appoinment.findByIdAndUpdate(
        id,
        { Status: "Cancelled" },
        { new: true }
      ).session(session);
      await User.findByIdAndUpdate(
        ConsaltantId,
        { Availability: "Available" },
        { new: true }
      ).session(session);
      await JobSeeker.findByIdAndUpdate(
        JobSeekerId,
        { Appoinment: null },
        { new: true }
      ).session(session);

      await session.commitTransaction();
      session.endSession();

      return res.status(201).json({
        status: "Success",
        message: "Appointment is cancelled",
        data: {
          updateAppoinment,
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
};
