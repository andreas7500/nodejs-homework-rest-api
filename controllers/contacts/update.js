const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const update = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "not found");

    // return res.status(404).json({ message: "not found" });
  }
  res.json(result);
};
module.exports = update;
