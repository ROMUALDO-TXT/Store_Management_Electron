
const { createContext, useContext } = require("react");
const { ipcRenderer } = window.require('electron');


export const DatabaseContext = createContext({});

export function DatabaseProvider(props) {

    const insert = async (data) => {
        return await ipcRenderer.invoke('database:insert', data);
    }

    const fetch = async (data) => {
        return await ipcRenderer.invoke('database:fetch', data);
    }

    const exclude = async (data) => {
        return await ipcRenderer.invoke('database:exclude', data);
    }

    return (
        <DatabaseContext.Provider value={{ insert, fetch, exclude }}>
            {props.children}
        </DatabaseContext.Provider>
    )
}

export function useDatabase() {
    return useContext(DatabaseContext);
}