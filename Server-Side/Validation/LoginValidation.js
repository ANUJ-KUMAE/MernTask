const { z } = require("zod");

const LoginValidation = z.object({
  
  email: z
    .string({ required_error: "Email must be reauired" })
    .trim()
    .email({ message: "Invalid email" }),

  password: z
     .string({required_error:"Password is required"})
     .min(6, {message:"Password must be atleast 6 charcaters"})
     .max(15, {message:"Password not be greater than 15 characters"})
});

module.exports = LoginValidation;