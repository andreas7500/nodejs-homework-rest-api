const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Movie with id=${contactId} not found`);

    // return res.status(404).json({ message: "not found" });
  }

  res.json(result);
};

module.exports = updateFavorite;
