import { getTaskTitle } from './toDoItemNameInput';
import { dateInput as dueDate } from './dueDateUI';
import { userInput as repeatDate } from './repeatUI';
import { dateInput as reminderDate } from './reminderUI';
import { createListItemObject, toDoList, setSessionStorage, getToDoListLength } from './toDoList';
import { createDomListItem } from './createDOMListItem';
import { setMyDayItemCounter, setImportantItemCounter } from './myDay';
import { currentGroup } from './addNewGroup';

const handleSubmitButton = () => {
    const submitButton = document.querySelector('.add-button');
    const itemDisplayContainer = document.querySelector('.to-do-list-container');

    submitButton.addEventListener('click', () => {
        if(currentSection === 'myday') {
            createListItemObject(
            getTaskTitle(), 
            dueDate, 
            reminderDate, 
            repeatDate,
            false
        );
            createDomListItem(
            getTaskTitle(), 
            dueDate, 
            reminderDate, 
            repeatDate, 
            false, 
            itemDisplayContainer, 
            getToDoListLength(),
            false,
            ''
        );
        } else if (currentSection === 'important') {
            createListItemObject(
            getTaskTitle(), 
            dueDate, 
            reminderDate, 
            repeatDate, 
            true
        );
            createDomListItem(
            getTaskTitle(), 
            dueDate, 
            reminderDate, 
            repeatDate, 
            false, 
            itemDisplayContainer, 
            getToDoListLength(),
            true,
            ''
        );
        } else if (currentSection === 'group') {
            createListItemObject(
            getTaskTitle(), 
            dueDate, 
            reminderDate, 
            repeatDate, 
            false,
            currentGroup
        );
            createDomListItem(
            getTaskTitle(), 
            dueDate, 
            reminderDate, 
            repeatDate, 
            false, 
            itemDisplayContainer, 
            getToDoListLength(),
            false,
            currentGroup
        );
        }
        setSessionStorage();
        setMyDayItemCounter();
        setImportantItemCounter();
    });
};

export const handleSubmitButtonDisabling = () => {
    const submitButton = document.querySelector('.add-button');

    if (getTaskTitle()) {
        submitButton.disabled = false;
        submitButton.style.color = '#2564CF';
        submitButton.style.cursor = 'pointer';
    } else {
        submitButton.style.color = '#8A8886';
        submitButton.style.cursor = 'not-allowed';
        submitButton.disabled = true;
    }
};

export const setCurrentSection = (section) => {
    currentSection = section;
}

export const getCurrentSection = () => currentSection;

export let currentSection = 'myday'; 

handleSubmitButton();
