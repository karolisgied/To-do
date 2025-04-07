export const clearDomList = () => {
    const toDoListContainer = document.querySelector('.to-do-list-container');
    const completedListContainer = document.querySelector('.completed-list-container');
    toDoListContainer.innerHTML = '';
    completedListContainer.innerHTML = '';
};