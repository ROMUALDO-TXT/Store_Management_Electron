const { createContext, useState, useContext, useEffect } = require("react");
const { ipcRenderer } = window.require('electron');
const { createRxDatabase } = require('rxdb');
const { getRxStorageIpcRenderer } = require('rxdb/plugins/electron');
const { getRxStorageMemory } = require('rxdb/plugins/memory');

export const DatabaseContext = createContext({});

export function DatabaseProvider(props) {

    const [database, setDatabase] = useState();

    useEffect(() => {
        createRxDatabase({
            name: 'database',
            storage: getRxStorageIpcRenderer({
                key: 'main-storage',
                statics: getRxStorageMemory().statics,
                ipcRenderer: ipcRenderer
            })
        }).then((result) => setDatabase(result));

        console.log('conste')
    }, [])


    return (
        <DatabaseContext.Provider value={{ database }}>
            {props.children}
        </DatabaseContext.Provider>
    )
}

export function useDatabase() {
    return useContext(DatabaseContext);
}