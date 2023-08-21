import JobCategory from "../models/Jobs.js";

// Method : POST
// End Point : "api/v1/job-category"
// Description : Add Job Category
export const AddJobCategory = async(req,res)=>{
    try {
        const user = req.user;
        const {Name,AvgSalary} = req.body;
        if(user.Role === "Admin"){
            const newJobCategory = await JobCategory.create({
                Name:Name,
                AvgSalary:AvgSalary
            });
            res.status(200).json({
                status:"SUCCESS",
                message:"Job Category is added",
                data:{
                    newJobCategory
                }
            })
        }else{
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

// Method : GET
// End Point : "api/v1/job-category"
// Description : Get Job Categories
export const getJobCategories = async(req,res)=>{
    try {
        const jobCategories = await JobCategory.find();
            if(jobCategories){
                res.status(200).json({
                    status:"SUCCESS",
                    message:"All Job Categories",
                    data:{
                        jobCategories
                    }
                })
            }
            else{
                res.status(404).json({
                    status: "Error",
                    message: "There are no job Catgories",
                  });
            }
    } catch (error) {
        return res.status(500).json({
            status: "Server Error",
            message: error.message,
          });
    }
}

// Method : GET
// End Point : "api/v1/job-category/:id"
// Description : Get Job Category By ID
export const getJobCategoryById = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Admin"){
            const {id} = req.params;
            const jobCategory = await JobCategory.findById(id);
            if(jobCategory){
                res.status(200).json({
                    status:"SUCCESS",
                    message:"Job Category of given id",
                    data:{
                        jobCategory
                    }
                })
            }
            else{
                res.status(404).json({
                    status: "Error",
                    message: "There are no job Catgories",
                  });
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
// End Point : "api/v1/job-category/:id"
// Description : Update Job Category By ID
export const updateJobCategory = async (req, res) => {
    try {
      const user = req.user;
      if (user.Role === "Admin") {
        const {id} = req.params;
        const {Name,AvgSalary,Status} = req.body;
        const findJobCategory = await JobCategory.findById(id);
        if (findJobCategory) {
          const updateJobCategory = await JobCategory.findByIdAndUpdate(
            id,{
                Name:Name,
                AvgSalary:AvgSalary,
                Status:Status
            },
            {new:true}
          );
          res.status(200).json({
            status: "Success",
            message: `${findJobCategory.Name} is updated`,
            data: {
                updateJobCategory,
            },
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
  
  