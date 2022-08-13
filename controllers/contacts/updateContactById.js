const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");
const schema =require("../../schemas/contact")
const updateContactById = async (req, res, next) => {
  try {
    const { error } = schema.add.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = updateContactById;
