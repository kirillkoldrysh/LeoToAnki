async function invoke(action, version, params = {}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('error', () => reject('failed to issue request'));
        xhr.addEventListener('load', () => {
            try {
                const response = JSON.parse(xhr.responseText);
                if (Object.getOwnPropertyNames(response).length != 2) {
                    throw 'response has an unexpected number of fields';
                }
                if (!response.hasOwnProperty('error')) {
                    throw 'response is missing required error field';
                }
                if (!response.hasOwnProperty('result')) {
                    throw 'response is missing required result field';
                }
                if (response.error) {
                    throw response.error;
                }
                resolve(response.result);
            } catch (e) {
                reject(e);
            }
        });

        xhr.open('POST', 'http://127.0.0.1:8765');
        xhr.send(JSON.stringify({ action, version, params }));
    });
}

async function addNotes(notes) {
    console.log(await invoke('addNotes', 6, {
        "notes": notes
    }));

    console.log(await invoke('sync', 6));
}

function createNote(front, back, deckName) {
    if (deckName === undefined) {
        deckName = "english";
    }

    return {
        "deckName": deckName,
        "modelName": "Basic (and reversed card)",
        "fields": {
            "Front": front,
            "Back": back
        },
        "tags": [
            ""
        ],
    };
}

function convertWordsToNotes(){
    var notes = [];

    // it's arr from words.json
    arr.map(function (a) {
        notes.push(createNote(a[0], a[1]));
    });
    
    return notes;
}

function addWords() {
    console.log(arr);

    arr.map(function (a) {
        addNote(a[0], a[1]);
    });

    console.log("ok");
}

async function addNote(front, back) {
    await invoke('addNote', 6, {
        "note": {
            "deckName": "english",
            "modelName": "Basic (and reversed card)",
            "fields": {
                "Front": front,
                "Back": back
            },
            "tags": [
                ""
            ],
        }
    });

    await invoke('sync', 6);
}
async function getDeck() {
    // console.log(await invoke('version', 6));
    // await invoke('createDeck', 6, {deck: 'test1'});
    const result = await invoke('deckNames', 6);
    console.log(`got list of decks: ${result}`);
}

function convertWordsToNotes(){
    var notes = [];
    arr.map(function (a) {
        notes.push(createNote(a[0], a[1]));
    });
    
    return notes;
}

addNotes(convertWordsToNotes());
