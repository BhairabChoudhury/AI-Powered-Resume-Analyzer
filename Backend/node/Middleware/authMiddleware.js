const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const authMiddlware = (req, res, next) => {
   try {
      let token = req.headers.authorization.split(" ")[1];
      if (!token) {
         return res.status(401).json({ message: "Unauthorized User " })

      }
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedToken.id;
      next();
   } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Invalid Token" });
   }

}
module.exports = authMiddlware; 