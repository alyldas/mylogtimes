// create an instance of a db object for us to store the IDB data in
let db;

// In the following line, you should include the prefixes of implementations you want to test.
const indexedDB = typeof window == 'object' ? window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB : webkitIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
// const IDBTransaction = typeof window == 'object' ? window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction : IDBTransaction || webkitIDBTransaction || msIDBTransaction;
// const IDBKeyRange = typeof window == 'object' ? window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange : IDBKeyRange || webkitIDBKeyRange || msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

// Let us open our database
const DBOpenRequest = indexedDB.open("toDoList", 4);

// these two event handlers act on the database being opened successfully, or not
DBOpenRequest.onerror = function (event) {
    console.log('Error loading database.');
};

DBOpenRequest.onsuccess = function (event) {
    console.log('Database initialised.');

    // store the result of opening the database in the db variable. This is used a lot below
    db = DBOpenRequest.result;

    // Run the displayData() function to populate the task list with all the to-do list data already in the IDB
    displayData();
};

function addData(i) {
    let newItem = { i: i };

    // open a read/write db transaction, ready for adding the data
    let transaction = db.transaction(["toDoList"], "readwrite");

    // report on the success of the transaction completing, when everything is done
    transaction.oncomplete = function () {
        console.log('Transaction completed: database modification finished.');

        // update the display of data to show the newly added item, by running displayData() again.
        displayData();
    };

    transaction.onerror = function () {
        console.log('Transaction not opened due to error: ' + transaction.error);
    };

    // call an object store that's already been added to the database
    let objectStore = transaction.objectStore("toDoList");
    console.log(objectStore.indexNames);
    console.log(objectStore.keyPath);
    console.log(objectStore.name);
    console.log(objectStore.transaction);
    console.log(objectStore.autoIncrement);

    // Make a request to add our newItem object to the object store
    let objectStoreRequest = objectStore.add(newItem);
    objectStoreRequest.onsuccess = function (event) {
        // report the success of our request
        // (to detect whether it has been succesfully
        // added to the database, you'd look at transaction.oncomplete)
        console.log('Request successful.');
    };
};

function displayData() {
    // Open our object store and then get a cursor list of all the different data items in the IDB to iterate through
    let objectStore = db.transaction('toDoList').objectStore('toDoList');
    objectStore.openCursor().onsuccess = function (event) {
        let cursor = event.target.result;
        // if there is still another cursor to go, keep runing this code
        if (cursor) {
            // build the to-do list entry and put it into the list item via innerHTML.
            let listItem = 'i: ' + cursor.value.i;

            // put the item item inside the task list
            console.log(listItem);

            // continue on to the next item in the cursor
            cursor.continue();

            // if there are no more cursor items to iterate through, say so, and exit the function
        } else {
            console.log('Entries all displayed.');
        }
    }
}

var i = 0;

self.onmessage = function (event) {
    displayData();
    // postMessage(i);
};

function timedCount() {
    i = i + 1;
    addData(i);
    // localStorage.setItem("timeCount", i);
    // postMessage(i);
    setTimeout("timedCount()", 500);
}

timedCount();