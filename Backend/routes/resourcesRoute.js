import router from 'express';
router = router.Router();
router.post('/resources', (req, res) => {
    const { resourceType, location, description } = req.body;
    
    // Validate input
    if (!resourceType || !location || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Save the resource to the database (mocked here)
    const newResource = {
        id: Date.now(),
        resourceType,
        location,
        description,
    };
    
    // Send response
    res.status(201).json({ message: 'Resource added successfully', resource: newResource });
})