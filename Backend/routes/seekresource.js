const express = require("express");
const router = express.Router();
const Resource = require("../models/SeekResources");

router.post("/seek-resource", async (req, res) => {
    try {
        console.log("Incoming Request Body:", req.body); // 👈 ADD THIS

        const newResource = new Resource({
            name: req.body.name,
            phone: req.body.phone,
            location: req.body.location,
            resourceType: req.body.resourceType,
            n_people: req.body.n_people,
            urgency: req.body.urgency,
            description: req.body.description
        });

        await newResource.save();
        res.status(201).json({ message: "Successfully Submitted Your Request!" });
    } catch (err) {
        console.error("Error saving resource:", err); // 👈 See what the error is
        res.status(500).json({ error: "Failed to submit request" });
    }
});


module.exports = router;
