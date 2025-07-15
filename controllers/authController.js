


//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     // Compare plain password (only for now; hash it in future)
//     if (user.password !== password) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     // Success
//     res.status(200).json({ message: 'Login successful', user });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

const User = require('../models/User');
const bcrypt = require('bcrypt');

//signup
exports.signup = async (req, res) => {
  try {
    console.log('Signup body:', req.body);
    console.log('Signup files:', req.files);

    const userData = { ...req.body };

    // Save file names if uploaded
    if (req.files.profilePicture) {
      userData.profilePicture = req.files.profilePicture[0].filename;
    }
    if (req.files.coverPicture) {
      userData.coverPicture = req.files.coverPicture[0].filename;
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    const user = new User(userData);
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(400).json({ error: err.message });
  }
};

// login
exports.login = async (req, res) => {
  try {
    console.log('Login request body:', req.body);

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log(' User not found for email:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password incorrect for email:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log('Login successful for email:', email);
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
