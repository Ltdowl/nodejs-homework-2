const { basedir } = global;
const { User } = require(`${basedir}/models/users`);
const { createError } = require(`${basedir}/helpers/createError`);

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw createError(404);
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200)({ message: "Verification successful" });
};

module.exports = verifyEmail;
