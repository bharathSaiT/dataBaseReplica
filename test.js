const DB = require('./database.js');

(async () => {
    try {
        await DB.loadDB();
        console.log("executed after the database loaded");
    } catch (error) {
        console.error("Failed to load the database:", error);
    }
})();

console.log("will be executed before the database is loaded");