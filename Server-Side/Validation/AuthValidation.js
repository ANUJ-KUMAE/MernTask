const { z } = require("zod");

const validationSchena = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast 3 character" })
    .max(255, { message: "Name must not be more than 255 characters" }),

  email: z
    .string({ required_error: "Email must be reauired" })
    .trim()
    .email({ message: "Invalid email" }),

  phone: z
    .string({ required_error: "Phone number is required" })
    .min(10, { message: "Phone number must be at  10 characters" })
    .max(10, {message:"Phone number not greater than 10"}),

  password: z
     .string({required_error:"Password is required"})
     .min(6, {message:"Password must be atleast 6 charcaters"})
     .max(15, {message:"Password not be greater than 15 characters"})
});

module.exports = validationSchena;
