const express=require("express");
const router=express.Router();
const authControllers=require("../controllers/auth-controller");
const {signupSchema,loginSchema}=require("../validators/auth-validator");
const authMiddleware=require("../middleware/auth-middleware")
const validate=require("../middleware/validate-middleware");




router.route("/").get(authControllers.home);

router.route('/register').post(authControllers.register);

router.route('/login').post(authControllers.login);  
router.route('/user').get(authMiddleware,authControllers.user); 

module.exports=router;