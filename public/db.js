const { app } = require('electron');
const Datastore = require('nedb-promises');

const dbFactory = (fileName) => Datastore.create({
    filename: `${app.getPath('appData')}/storemanagement/data/${fileName}`,
    timestampData: true,
    autoload: true
});

const db = {
    transactions: dbFactory('transactions.db')
}

module.exports = db;
