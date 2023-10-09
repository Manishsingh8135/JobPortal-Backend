const User = require('../models/User');

exports.onboardUser = async (req, res) => {
    const {
        id,
        username,
        name,
        email,
        mobileNumber,
        image,
        bio,
        role,
        resume,
        skills
    } = req.body;

    try {
        // Check if user already exists with the provided id
        let user = await User.findOne({ id });

        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        user = new User({
            id,
            username,
            name,
            email,
            mobileNumber,
            image,
            bio,
            role,
            resume,
            skills
        });

        await user.save();
        
        res.status(201).json({ msg: 'User onboarded successfully', user });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
