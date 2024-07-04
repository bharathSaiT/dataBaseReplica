//an replica of in-mem key value store
const fs = require('fs');
let DataBase_inMem={}
let DataBase_persistent={};
let transactionActive=false;
let transactionContext={};
let globalLock=false;
//if database is alive , key expires after ttl seconds
function set(key , value , ttl=0){
    acquireLock();
    try{
        if(check(key)){

            console.log("key already exists");
            return;
        }
        DataBase_inMem[key]={value, expiresAt: ttl>0 ? Date.now()+ttl*1000 : null};
        if(ttl>0){
            setTimeout(()=>{
                del(key);
            },ttl*1000)
        }
        if(!transactionActive){
            persistWhenDataChanges();
        }
    }finally{
        releaseLock();
    }
}

//passive deletion of keys
function get (key){
    acquireLock();
    try {
        if(!check(key)){
            console.log("key does not exist");
            return;
        }
        if(DataBase_inMem[key].expiresAt && DataBase_inMem[key].expiresAt<Date.now()){
            del(key);
            console.log("key expired");
            return;
        }
        return DataBase_inMem[key].value;
    }finally{
        releaseLock();
    }
}

function del(key){
    acquireLock();
    try{
        if(!check(key)){
            console.log("key does not exist");
            return;
        }
        delete DataBase_inMem[key];
        if(!transactionActive){
            persistWhenDataChanges();
        }
    }
    finally{
        releaseLock();
    }
    //this will not delete the key, it will just set the value to undefined leading to memory wastage 
    // DataBase_inMem[key]=undefined 
}

function update(key , value){
    acquireLock();
    try{
        if(!check(key)){
            console.log("key does not exist");
            return;
        }
        if(DataBase_inMem[key].expiresAt && DataBase_inMem[key].expiresAt<Date.now()){
            del(key);
            console.log("key expired");
            return;
        }
        DataBase_inMem[key].value=value;
        if(!transactionActive){
            persistWhenDataChanges();
        }
    }finally{
        releaseLock();
    }

}

function check(key){
    return DataBase_inMem.hasOwnProperty(key)
}

function getAll(){
    acquireLock();
    try{
            //return all the keys in the database which are not expired
            let keys=Object.keys(DataBase_inMem);
            let res=[];
            keys.forEach(key=>{
                if(DataBase_inMem[key].expiresAt && DataBase_inMem[key].expiresAt<Date.now()){
                    del(key);
                    console.log("key expired");
                    return;
                }
                res.push({key:key,value:DataBase_inMem[key].value})
            })
            // return res;

            const allData= Object.keys(DataBase_inMem).map(key=>{
                if(DataBase_inMem[key].expiresAt && DataBase_inMem[key].expiresAt<Date.now()){
                    del(key);
                    console.log("key expired");
                    return;
                }
                return {key:key,value:DataBase_inMem[key].value}
            })
            // return DataBase_inMem;

            const getAllData = {};

            for(let key in DataBase_inMem){
                if(!DataBase_inMem[key].expiresAt || DataBase_inMem[key].expiresAt > Date.now()){
                    getAllData[key] = DataBase_inMem[key].value;
                }
            }
            return getAllData;
    }
    finally{
        releaseLock();
    }
}

function ttl(key){
    if(!check(key)){
        console.log("key does not exist");
        return;
    }
    if(DataBase_inMem[key].expiresAt && DataBase_inMem[key].expiresAt<Date.now()){
        del(key);
        console.log("key expired");
        return;
    }
    return (DataBase_inMem[key].expiresAt-Date.now())/1000;
}

function clearDB(){
    //clears the database efficiently , as GC will take care of the rest
    Object.keys(DataBase_inMem).forEach(key=>{
        delete DataBase_inMem[key]
    })
    //ineffcient way of clearing the database, as object is not deleted from memory ,GC might not be triggered & also new object creation is expensive
    // DataBase_inMem={}
}

function loadDB(){
    return new Promise((resolve,reject)=>{
            //load the database from a file
            fs.readFile('database.json', 'utf8', (err, data) => {
                if (err) {
                    console.error("error reading database file", err);
                    DataBase_persistent={};
                    reject(err);
                }

                if( data.length === 0 || data.trim() === ''){
                    DataBase_persistent={};
                }
                else{
                    DataBase_persistent=JSON.parse(data);
                }
                
                DataBase_inMem ={...DataBase_inMem,...DataBase_persistent};
                console.log("Database loaded successfully");
                resolve(DataBase_inMem);
            });
    });
}

function saveDB(){
    //save the database to a file
    fs.writeFile('database.json', JSON.stringify(DataBase_inMem), (err) => {
        if (err) {
            console.error(err)
            return;
        }
        console.log("Database saved successfully");
    });
}

function persistWhenDataChanges(){
    //save the database to a file when data changes
    //implement this function
    if(JSON.stringify(DataBase_inMem) !== JSON.stringify(DataBase_persistent)){
        saveDB();
    }else{
        console.log("No change in database");
    }
}

function saveDBPeriodically(){
    //save the database to a file periodically
    setInterval(saveDB, 1000);
}

saveDBPeriodically();
// loadDB();



//implement the transactions in the database
function startTransaction(){
    if(transactionActive){
        console.log("Transaction already active");
        return;
    }
    transactionActive=true;
    transactionContext={...DataBase_inMem};
}

function commitTransaction(){
    transactionActive=false;
    saveDB();
    transactionContext={};
}

function rollbackTransaction(){
    transactionActive=false;
    DataBase_inMem={...transactionContext};
}

//implement the lock mechanism in the database to handle concurrent requests
//so that only one request can modify the database at a time
function acquireLock(){
    //implement the lock mechanism
    if(globalLock){
        console.log("Database is locked, try again later");
        return;
    }
    globalLock=true;
}

function releaseLock(){
    //implement the lock mechanism
    globalLock=false;
}

module.exports={
    set,
    get,
    del,
    update,
    getAll,
    clearDB,
    loadDB,
    ttl,
    startTransaction,
    commitTransaction,
    rollbackTransaction
}