export const localStorageMiddleware = store => next => action => {
    const result = next(action);

    // List of actions to watch
    const actionsToWatch = ['setSeenGigConversationHash', 'setAllConversationHashes', 'setAllGigConversationHashes', 'updateConversation'];

    if (actionsToWatch.includes(action.type)) {
        const state = store.getState();
        const stateToPersist = {
            // Extract the parts of the state you want to save
            key1: state.someReducer.key1,
            key2: state.someReducer.key2,
        };
        localStorage.setItem('appState', JSON.stringify(stateToPersist));
    }

    return result;
};