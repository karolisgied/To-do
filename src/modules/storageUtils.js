export const getGroupSessionStorage = () => {
    const mySessionData = JSON.parse(localStorage.getItem("groupStorage"));
    return mySessionData;
};

export const getToDoListSessionStorage = () => {
    const mySessionData = JSON.parse(localStorage.getItem("toDoListStorage"));
    return mySessionData;
};

export const setGroupSessionStorage = (groupsArray) => {
    localStorage.setItem("groupStorage", JSON.stringify(groupsArray));
};

export const setToDoListSessionStorage = (toDoList) => {
    localStorage.setItem("toDoListStorage", JSON.stringify(toDoList));
};
