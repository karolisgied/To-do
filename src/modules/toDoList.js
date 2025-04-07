import { getSearchInput } from './searchbar';
import { currentSection } from './submitButton';
import { getAllUserGroups } from './addNewGroup';
import { displayMyDay } from './myDay';
import { clearDomList } from './clearDOMList';
import { addCompletedTaskHeader } from './completedList';
import { setCurrentSection } from './submitButton';
import { styleActiveButton } from './styleActiveButton';
import { setCompletedListItemCounter } from './completedList';
import { getGroupSessionStorage, getToDoListSessionStorage } from './storageUtils';


export let toDoList = [];

export const setSessionStorage = () => {
    localStorage.setItem("toDoListStorage", JSON.stringify(toDoList));
    localStorage.setItem("groupStorage", JSON.stringify(getAllUserGroups()));
}

export class ToDoItem {
    constructor(title, dueDate, reminderDate, repeatDate, id, important, group = '') {
        this.title = title;
        this.dueDate = dueDate;
        this.reminderDate = reminderDate;
        this.repeatDate = repeatDate;
        this.important = important;
        this.completed = false;
        this.id = getToDoListLength();
        this.group = group;
    }
}

export const createListItemObject = (title, dueDate, reminderDate, repeatDate, important, group) => {
    const obj = new ToDoItem(title, dueDate, reminderDate, repeatDate, getToDoListLength(), important, group);
    toDoList.push(obj);
};

export const getCompletedCount = () => toDoList.filter(item => item.completed).length;

export const getCompletedItemList = () => {
    if (toDoList) {
        if (toDoList.length !== 0);
    }
    return toDoList.filter(item => item.completed);
} 

export const getImportantItemList = () => toDoList.filter(item => item.important);

export const getItemsWithSearchInputInTheirTitle = () => {
    const searchItems = toDoList.filter(item => 
        item.title.toLowerCase().includes(getSearchInput().toLowerCase())
    );
    return searchItems;
}

export const getListSortedByImportance = () => {
    const sortedByImportance = [...toDoList]
    .filter(item => !item.completed)
    .sort((a, b) => (b.important === true) - (a.important === true));
    return sortedByImportance;
}

const parseDueDate = (dueDate) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    if (dueDate === 'Today') {
        return today;
    } else if (dueDate === 'Tomorrow') {
        return tomorrow;
    } else if (dueDate === 'Next week') {
        return nextWeek;
    } else if (dueDate === '') {
        return new Date(9999, 11, 31);

    } else {
        return new Date(dueDate);
    }
}

export const getListSortedByDueDate = () => {
    const sortedByDueDateList = [...toDoList].sort((a, b) => {
        const dateA = parseDueDate(a.dueDate);
        const dateB = parseDueDate(b.dueDate);
        
        if (isNaN(dateA)) {
            console.warn(`Invalid dueDate for item with ID ${a.id}: ${a.dueDate}`);
        }
        if (isNaN(dateB)) {
            console.warn(`Invalid dueDate for item with ID ${b.id}: ${b.dueDate}`);
        }

        return dateA - dateB;
    });
    const sortedList = [...sortedByDueDateList].filter(item => !item.completed);
    if (currentSection === 'important') {
        return sortedList.filter(item => item.important);
    }
    return sortedList;
}

export const getMyDayItemCount = () => {
    if (toDoList) {
        if (toDoList.length !== 0) {
            return toDoList.filter(item => !item.completed).length;
        }
    }
}

export const getImportantItemCount = () => {
    return toDoList.filter(item => item.important).length;
}

export const getCurrentGroupItems = (id) => {
    return toDoList.filter(item => item.group == id);
}

export const getToDoListLength = () => toDoList.length;

    if (toDoList && getToDoListSessionStorage()) {
        if(toDoList.length === 0 && getToDoListSessionStorage().length !== 0) {
            toDoList = getToDoListSessionStorage();
            styleActiveButton('myday');
            setCurrentSection('myday');
            clearDomList();
            displayMyDay();
            addCompletedTaskHeader();
            setCompletedListItemCounter();
        }
    }
