import { verifyToken } from "../middleware/verifyToken.js";

router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "You are authorized", user: req.user });
});
