const contacts = require("../../models/contacts");
// const { HttpError } = require("../../helpers");

const update = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    // throw HttpError(404, "not found");

    return res.status(404).json({ message: "not found" });
  }
  res.json(result);
};
module.exports = update;
