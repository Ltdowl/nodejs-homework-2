const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const deleteContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteContactById;
