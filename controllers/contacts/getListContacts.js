const contacts = require("../../models/contacts");

const getListContacts = async (_, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = getListContacts;