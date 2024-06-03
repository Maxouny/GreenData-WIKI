// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// interface AuthRequest extends Request {
//   userId?: number;
// }

// const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ message: "Authorization header is missing" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET || "default_secret",
//     ) as { id: number };
//     req.userId = decoded.id;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// export default authenticate;
