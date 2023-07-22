const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
    // return res.status(404).json({ message: "not found" });
  }

  res.json(result);
};

module.exports = getById;
