import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

// Register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const image = req.file;

  if (!name || !email || !password || !image) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.json({
        success: false,
        message: "Company already registered",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
    });
    return res.json({
      success: true,
      message: "Company created successfully",
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Company login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }
  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.json({ success: false, message: "Company not found" });
    }
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }
    return res.json({
      success: true,
      message: "Company logged in successfully",
      company,
      token: generateToken(company._id),
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Get company data
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;
    res.json({ success: true, company });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Post a new job
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;
  const companyId = req.company._id;

  try {
    const newJob = await Job.create({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category,
    });

    await newJob.save();
    return res.json({ success: true, newJob });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Get Company Job Applications
export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company._id;
    const applications = await JobApplication.find({ companyId })
    .populate("userId","name image resume")
    .populate("jobId","title location salary level category")
    .exec();
    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Compayn Posted Jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await Job.find({ companyId });

    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      })
    );

    res.json({ success: true, jobsData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Change job applications status
export const changeJobApplicationsStatus = async (req, res) => {
  try {
    const {id,status}=req.body;

    await JobApplication.findOneAndUpdate({_id:id},{status});
    res.json({success:true,message:"Application status updated successfully"});
  } catch (error) {
    res.json({success:false,message:error.message});
  }
};

// Get Company Job visibility
export const changeVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const companyId = req.company._id;
    const job = await Job.findById(id);

    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
      await job.save();
      return res.json({ success: true, job });
    } else {
      return res.json({
        success: false,
        message: "Unauthorized: You do not own this job",
      });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
