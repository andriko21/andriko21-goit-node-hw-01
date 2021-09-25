const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const chalk = require("chalk");

// const { Command } = require('commander');
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts()
        .then((contact) => console.table(contact))
        .catch(console.error);
      break;

    case "get":
      getContactById(id)
        .then((contact) => {
          if (contact) {
            console.table(contact);
          } else {
            console.log(chalk.yellow("Contact not found("));
          }
        })
        .catch(console.error);
      break;

    case "add":
      // ... name email phone
      addContact(name, email, phone)
        .then((contact) => console.table(contact))
        .catch(console.error);

      break;

    case "remove":
      // ... id
      removeContact(id)
        .then((contact) => console.table(contact))
        .catch((error) => console.log("error", error));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// getContactById()
