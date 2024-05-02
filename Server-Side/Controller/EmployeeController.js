const EmployeModel = require("../Models/EmployeeModel");
const cloudinary = require("../Cloudordinary/cloudConfig");

const AddEmployee = async (req, resp, next) => {
  try {
    const { name, email, mobile, designation, gender, courses, image } =
      req.body;

    const checkMail = await EmployeModel.findOne({ email });
    if (checkMail) {
      return resp.status(401).json("Email Already Exits");
    }

    const uploaderImage = cloudinary.uploader.upload(
      image,
      {
        upload_preset: "Image_Upload",
        allowed_formats: ["png", "jpg", "jpge"],
      },
      function (error, result) {
        if (error) {
          console.log(error);
        }
        console.log(result);
      }
    );

    const Employeeadd = await EmployeModel.create({
      name,
      email,
      mobile,
      designation,
      gender,
      courses,
      image: {
        public_id: (await uploaderImage).public_id,
        URL: (await uploaderImage).secure_url
      },
    });
    return resp.status(201).json({ success: true, Employeeadd });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const AllEmpData = async (req, resp, next) => {
  try {
    const EmpPerPage = 3;
    const currentPage = Number(req.query.page) || 1;
    const skip = EmpPerPage * (currentPage - 1);

    const allEmployee = await EmployeModel.find().limit(EmpPerPage).skip(skip);

    if (allEmployee.length === 0) {
      return resp.status(401).json({ message: "No Employee Found" });
    }

    const total = await EmployeModel.countDocuments();

    return resp.status(201).json(allEmployee);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const AllEmployeeData = async (req, resp, next) => {
  try {
    const AllEmpData = await EmployeModel.find();

    return resp.status(201).json(AllEmpData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const Getemployeedata = async (req, resp, next) => {
  try {
    const result = await EmployeModel.findOne({ _id: req.params.id });

    return resp.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const UpdateEmpData = async (req, resp, next) => {
  try {
    const { courses } = req.body;

    const updateData = await EmployeModel.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    await EmployeModel.updateOne(
      { _id: req.params.id },
      { $unset: { courses: 1 } }
    );

    // Add new courses
    await EmployeModel.updateOne(
      { _id: req.params.id },
      { $push: { courses: { $each: courses } } }
    );

    console.log("Data Updated");
    return resp.status(201).json(updateData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const DeleteEmployeeData = async (req, resp, next) => {
  try {
    const deletedata = await EmployeModel.deleteOne({ _id: req.params.id });

    console.log("Data Deleted");

    return resp.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

const searchEmployee = async (req, resp) => {
  try {
    const userSearchData = await EmployeModel.find({
      $or: [
        { name: { $regex: req.params.key } },
        { email: { $regex: req.params.key } },
        { mobile: { $regex: req.params.key } },
        { gender: { $regex: req.params.key } },
        { course: { $regex: req.params.key } },
        { designation: { $regex: req.params.key } },
      ],
    });

    return resp.status(201).json(userSearchData);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  AddEmployee,
  AllEmpData,
  Getemployeedata,
  UpdateEmpData,
  DeleteEmployeeData,
  searchEmployee,
  AllEmployeeData,
};
