const fs = require("fs/promises");
const path = require("path");
// const { uuidv4 } = require("uuid");
const { v4: uuidv4 } = require("uuid");

const readcontacts = async () => {
  const result = await fs.readFile(
    path.join(__dirname, "contacts.json"),
    "utf8"
  );

  try {
    const contacts = JSON.parse(result);
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

function listContacts() {
  return readcontacts();
}

async function getContactById(contactId) {
  try {
    const contacts = await readcontacts();
    contacts.filter(({ id }) => id.toString() === contactId);
  } catch (error) {
    console.log("error");
  }
}

async function removeContact(contactId) {
  const contacts = await readcontacts();
  const removeContact = contacts.filter(({ id }) => id.toString() !== contactId);
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(removeContact)
  );
  console.log('removeContact',removeContact)
  return removeContact;
}

async function addContact(name, email, phone) {
  const contacts = await readcontacts();
  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(contacts)
  );
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
