const mongoose=require("mongoose");
const bcrypt=require("bcryptjs"); 
const jwt=require("jsonwebtoken");


const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
       
    },  
    lastName:{
        type:String,
        required:true,
       
    },  
     email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
 isAdmin:{
        type:Boolean,
        default:false
 }
});

userSchema.pre("save",async function(next){
console.log("pre method",this);
  const user=this;
    if(!user.isModified("password")){
       next()
    }
  try {
    const saltRound=10;
    const hashedPassword=await bcrypt.hash(user.password,saltRound);
    user.password=hashedPassword;
    next();
  } catch (error) {
    next(error)
  }
})


//login method
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
}


//json web token
userSchema.methods.generateToken=async function(){
 try {
   return jwt.sign({
        _id:this._id.toString(),
        email:this.email,
        isAdmin:this.isAdmin
    },process.env.JWT_SECRET_KEY,{
        expiresIn:"30d"
    
   })

 } catch (error) {
    console.error(error)
 }
}


//define the model using the schema and export it  

const userModel=mongoose.model("User",userSchema);

module.exports=userModel;