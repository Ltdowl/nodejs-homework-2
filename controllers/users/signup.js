const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const gravatar = require("gravatar");
const { basedir } = global;
const { User, joiSchemas } = require(`${basedir}/models/users`);
const { createError, sendEmail  } = require(`${basedir}/helpers`);


const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, `${email} in use`);
    }

    const { error } = joiSchemas.signup.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }


    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
  
   const verificationToken = v4();

    const result = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });
   
    const mail = {
      to: email,
      subject: "Confirming registration on site",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Сlick to confirm registration</a>`,
    };
    await sendEmail(mail);
    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
        // verificationToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
