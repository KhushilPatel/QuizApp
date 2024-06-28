const { z } = require("zod");

//creating a object schema

const loginSchema=z.object({
    email:z.string({required_error:"email is required"}).trim().email({message:"Invalid email"}),
    password:z.string({required_error:"password is required"}).min(6,{message:"Password should have at least 6 characters"})
})




const signupSchema = loginSchema.extend({
  firstname: z
    .string({ required_error: "firstname is required" })
    .trim()
    .min(3, { message: "Name must be atleast 3 characters long" })
    .max(250, { message: "Name must be less than 250 characters long" }),
  lastname: z
    .string({ required_error: "lastname is required" })
    .trim()
    .min(3, { message: "Name must be atleast 3 characters long" })
    .max(250, { message: "Name must be less than 250 characters long" }),

   
    phone: z.string({ required_error: "phone is required" }).min(10, {
      message: "Phone number should have at least 10 characters",
    }).max(10, {
      message: "Phone number should have at most 10 characters",
    }),
    
 
});



module.exports={signupSchema,loginSchema};

