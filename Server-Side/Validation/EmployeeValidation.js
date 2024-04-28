const { z } = require("zod");

const CourseSchema = z.object({
  course: z
    .string({ required_error: "Course name is required" })
    .trim()
    .min(3, { message: "Course name must be at least 3 characters" })
    .max(50, { message: "Course name must not exceed 50 characters" }),
});

const EmployeevalidationSchena = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast 3 character" })
    .max(255, { message: "Name must not be more than 255 characters" }),

  email: z
    .string({ required_error: "Email must be reauired" })
    .trim()
    .email({ message: "Invalid email" }),

  mobile: z
    .string({ required_error: "Phone number is required" })
    .min(10, { message: "Phone number must be at  10 characters" })
    .max(10, {message:"phone is at most 10 number"}),

  designation: z.string({
    required_error: "Please Choose Correct designation",
  }),

  gender: z.string({ required_error: "Choose Correct Gender" }),

 courses: z.array(CourseSchema),

});

module.exports = EmployeevalidationSchena;
