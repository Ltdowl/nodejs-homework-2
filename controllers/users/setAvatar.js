const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { basedir } = global;

const { User } = require(`${basedir}/models/users`);

const avatarsDir = path.join(basedir, "public", "avatars");

const setAvatar = async (req, res) => {
  const { path: tempPath, originalname } = req.file;

  const { _id } = req.user;

  const imageName = `${_id}_${originalname}`;

  const avatar = await Jimp.read(tempPath);
  await avatar.resize(250, 250).write(tempPath);

  try {
    const uploudPath = path.join(avatarsDir, imageName);

    await fs.rename(tempPath, uploudPath);

    const avatarURL = path.join("avatars", imageName);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempPath);
    throw error;
  }
};

module.exports = setAvatar;
