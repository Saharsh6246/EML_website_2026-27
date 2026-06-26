import express from "express";
import Admin from "../models/Admin.js";
import AdminEmail from "../models/AdminEmail.js";

const router = express.Router();

router.post("/google-login", async (req, res) => {
  const { email, name, googleId } = req.body;

  try {
    const allowedEmail = await AdminEmail.findOne({ email });
    if (!allowedEmail) {
      return res.status(403).json({ message: "Unauthorized email" });
    }

    let admin = await Admin.findOne({ email });
    if (!admin) {
      admin = new Admin({
        email,
        name,
        googleId,
      });
      await admin.save();
    }

    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ message: "Authentication failed" });
  }
});

router.get("/admin-emails", async (req, res) => {
  try {
    const adminEmails = await AdminEmail.find();
    res.json({ emails: adminEmails.map(item => item.email) });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admin emails" });
  }
});

router.post("/admin-emails", async (req, res) => {
  try {
    const { email } = req.body;
    const newAdminEmail = new AdminEmail({ email });
    await newAdminEmail.save();
    res.status(201).json({ message: "Admin email added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add admin email" });
  }
});

router.delete("/admin-emails/:email", async (req, res) => {
  try {
    await AdminEmail.findOneAndDelete({ email: req.params.email });
    res.json({ message: "Admin email removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove admin email" });
  }
});

export default router;
