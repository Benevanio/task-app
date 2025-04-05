const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const UserSchema = require('../model/userModel');
const bcrypt = require('bcrypt');
router.get('/users',async (req, res, next) => {
    try {
        const users = await UserSchema.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
}
);
router.post('/register', async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const jwtToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserSchema({ name, email, password: hashedPassword });
        user.token = jwtToken;
        console.log(jwtToken);

        await user.save();
        res.status(201).send('User registered successfully' + user);
    } catch (error) {
        res.status(400).send('Error registering user' + error);
    }
}
);

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await UserSchema.findByIdAndDelete(id);
        res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
}
);

router.patch('/update/:id', async (req, res) => {
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


module.exports = router;