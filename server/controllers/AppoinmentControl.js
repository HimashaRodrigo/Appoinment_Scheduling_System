import mongoose from "mongoose";
import Appoinment from "../models/Appoinment.js";
import JobSeeker from "../models/JobSeeker.js";
import User from "../models/Users.js";
import JobCategory from "../models/Jobs.js";
import { GeneratePassword, GenerateSalt } from "../utils/AuthUtil.js";

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

      if (findJobSeeker != null) {
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
          { new: true }
        ).session(session);
      } else {
        const Password = "12345678";
        const salt = await GenerateSalt();
        const encryptPassword = await GeneratePassword(Password, salt);
        createJobSeeker = await JobSeeker.create(
          [
            {
              Name,
              ContactNumber,
              Gender,
              Email,
              Password: encryptPassword,
            },
          ],
          { session }
        );
        if (createJobSeeker != null) {
          newAppoinment = await Appoinment.create(
            [
              {
                Consaltant: findConsaltant.id,
                JobSeeker: createJobSeeker[0].id,
                Job: findJob.id,
                Date: Date,
                Time: Time,
                AppoinmentNo: AppoinmentNo,
              },
            ],
            { session }
          );
          await JobSeeker.findByIdAndUpdate(
            createJobSeeker.id,
            { Appoinment: newAppoinment.id },
            { new: true }
          ).session(session);
        }
      }

      await User.findByIdAndUpdate(
        findConsaltant.id,
        { Availability: "Not Available", Appoinment: newAppoinment[0].id },
        { new: true }
      ).session(session);

      await session.commitTransaction();
      session.endSession();

      return res.status(201).json({
        status: "Success",
        message: "Appointment is placed",
        data: {
          newAppoinment,
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
    if (user.Role !== "Admin") {
      const findAppoinments = await Appoinment.find();
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
            const JobSeekerEmail = populatedAppoinment.JobSeeker.Email;
            const JobSeekerContactNo =
              populatedAppoinment.JobSeeker.ContactNumber;
            const AppoinmentNo = populatedAppoinment.AppoinmentNo;
            const Status = populatedAppoinment.Status;
            appoinmentDetails = {
              id:populatedAppoinment.id,
              AppoinmentNo: AppoinmentNo,
              ConsaltantName: ConsaltantName,
              ConsaltantEmail: ConsaltantEmail,
              Job: Job,
              AverageSalary: AverageSalary,
              JobSeekerName: JobSeekerName,
              JobSeekerContactNo: JobSeekerContactNo,
              JobSeekerEmail:JobSeekerEmail,
              Date: populatedAppoinment.Date,
              Time: populatedAppoinment.Time,
              Status:Status
            };
            Appoinments.push(appoinmentDetails);
          } catch (error) {
            res.status(500).json({
              status: "Server Error",
              message: error.message,
            });
          }
        }
        console.log(Appoinments);
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
  } catch (error) {}
};

// Method : GET
// End Point : "api/v1/appoinment/:id";
// Description : Get appoinment by id
export const getAppoinmentById = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Receptionist" || user.Role === "Consaltant") {
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

// Method : PATCH
// End Point : "api/v1/appoinment/close/:id";
// Description : Finish an appoinment
export const finishAppoinment = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    if (user.Role === "Consaltant") {
      const session = await mongoose.startSession();
      try {
        session.startTransaction();
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
          const consaltantID = populatedAppoinment.Consaltant.id;
          const jobseekerID = populatedAppoinment.JobSeeker.id;
          const updateAppoinment = await Appoinment.findByIdAndUpdate(
            id,
            { Status: "Finished" },
            { new: true }
          ).session(session);

          await User.findByIdAndUpdate(
            consaltantID,
            { Appoinment: null },
            { new: true }
          ).session(session);
          await JobSeeker.findByIdAndUpdate(
            jobseekerID,
            { Appoinment: null },
            { new: true }
          ).session(session);

          await session.commitTransaction();
          session.endSession();

          return res.status(201).json({
            status: "Success",
            message: "Appointment is closed",
            data: {
              updateAppoinment,
            },
          });
        }
        else{
          return res.status(404).json({
            status: "Error",
            message: "Appoinment Not Found",
          });
        }
      } catch (error) {
        await session.abortTransaction();
        session.endSession();

        return res.status(500).json({
          status: "Error",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};
