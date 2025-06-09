import { User } from "../models/userSchema.js";
import { Job } from "../models/jobSchema.js";
import { Application } from "../models/applicationSchema.js";

export const statsController =async (req, res) => {
    try {
        const jobCount = await Job.countDocuments();
        const companyCount = await User.countDocuments({ role: "Employer" });
        const jobSeekerCount = await User.countDocuments({ role: "Job Seeker" });
        const employerCount = await User.countDocuments({ role: "Employer" }); 

        res.json({
        jobs: jobCount,
        companies: companyCount,
        jobSeekers: jobSeekerCount,
        employers: employerCount,
        });
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching stats" });
  }
 
}
