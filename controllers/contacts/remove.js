const contacts = require("../../models/contacts");
// const { HttpError } = require("../../helpers");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    // throw HttpError(404, "Not found");
    return res.status(404).json({ message: "not found" });
  }
  res.json({ message: "contact deleted" });
};

module.exports = remove;
