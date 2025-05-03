const express = require("express");
const router = express.Router();
const Resource = require("../models/ProvideResources");

router.post("/add-resource", async (req, res) => {
    try {
        const newResource = new Resource({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            location: req.body.location,
            resourceType: req.body.resourceType,
            quantity: req.body.quantity,
            availability: req.body.availability,
            description: req.body.description
        });

        await newResource.save();
        res.status(201).json({ message: "Resource added successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add resource" });
    }
});

module.exports = router;
