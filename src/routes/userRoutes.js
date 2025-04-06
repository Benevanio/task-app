const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const multer = require('multer');
const upload = multer({ dest: 'images' });

dotenv.config();
const UserSchema = require('../model/userModel');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middlewares/authMiddleware');
router.use(authMiddleware);
router.get('/users', authMiddleware, async (req, res) => {
    try {
        const users = await UserSchema.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
}
);
router.post('/register',authMiddleware, async (req, res, _next) => {
    const { name, email, password } = req.body;
    try {
        const jwtToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserSchema({ name, email, password: hashedPassword });
        user.token = jwtToken;
        await user.save();
        res.status(201).json({ user, token: jwtToken });
    } catch (error) {
        res.status(400).send('Error registering user' + error);
    }
}
);

router.delete('/delete/:id',authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await UserSchema.findByIdAndDelete(id);
        res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
}
);

router.patch('/update/:id',authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserSchema.findByIdAndUpdate(id, { name, email, password: hashedPassword }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send('Error updating user');
    }
});

router.post('/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
    const { id } = req.user;
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        const user = await UserSchema.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.avatar = req.file.path;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error('Avatar upload error:', error);
        res.status(500).json({ 
            error: 'Error uploading avatar',
            details: error.message 
        });
    }
});

module.exports = router;