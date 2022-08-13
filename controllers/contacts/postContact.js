const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");
const schema = require("../../schemas/contact");
const postContact = async (req, res, next) => {
  try {
    const { error } = schema.add.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = postContact;
