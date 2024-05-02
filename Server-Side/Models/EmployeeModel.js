const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
      enum: {
        values: ["HR", "Manager", "Sales"],
      },
    },
    gender: {
      type: String,
      required: true,
      enum: {
        values: ["male", "female"],
      },
    },
    courses: [
      {
        course: { type: String, required: true },
      },
    ],
    image: {
      public_id: {
        type: String,
      },
      URL: {
        type: String,
      },
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const EmployeModel = new mongoose.model("EmployeModel", EmployeeSchema);

module.exports = EmployeModel;
