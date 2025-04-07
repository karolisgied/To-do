import { getTaskTitle } from './toDoItemNameInput';
import { dateInput as dueDate } from './dueDateUI';
import { userInput as repeatDate } from './repeatUI';
import { dateInput as reminderDate } from './reminderUI';
import { toDoList, setSessionStorage } from './toDoList.js';
import { setCompletedListItemCounter } from './completedList.js';
import { completedListOpen } from './completedList.js';
import { currentSection, getCurrentSection } from './submitButton.js';
import { setMyDayItemCounter, setImportantItemCounter } from './myDay';
import { getAllUserGroups, currentGroup } from './addNewGroup.js';

export const createDomListItem = (
    title, 
    dueDate, 
    reminderDate, 
    repeatDate, 
    completed, 
    outputContainer, 
    IDIndex, 
    important,
    group
) => {
    const dueDateText = `Due ${dueDate}   •`;
    const reminderText = `•   Reminder${reminderDate}  •`;
    const repeatText = `•   Repeat ${repeatDate}`;

    const listItemContainer = document.createElement('div');
    const starContainer = document.createElement('div');
    const contentContainer = document.createElement('div');
    const titleContainer = document.createElement('div');
    const detailsContainer = document.createElement('div');
    const checkBoxContainer = document.createElement('div');
    const filledStarImg = document.createElement('img');
    const emptyStarImg = document.createElement('img');
    const checkedImg = document.createElement('img');
    const uncheckedImg = document.createElement('img');
    const selectGroupElement = document.createElement('select');
    const placeholder = document.createElement('option');

    if(currentSection != 'group' && group === '') {
        placeholder.textContent = 'Group';
        placeholder.disabled = true;
        placeholder.selected = true;
        placeholder.hidden = true;
    }

    getAllUserGroups().forEach(groupName => {
        const option = document.createElement('option');
        option.textContent = groupName;
        option.value = groupName;
        if (groupName === group) option.selected = true; 
        
        selectGroupElement.append(option);
    })

    selectGroupElement.className = 'select-group-element';

    filledStarImg.src = './img/filledstar.png';
    emptyStarImg.src = './img/emptystar.png';
    checkedImg.src = './img/checked.png';
    uncheckedImg.src = './img/unchecked.png';

    listItemContainer.className = 'list-item-container';
    starContainer.className = 'star-container';
    contentContainer.className = 'list-content-container';
    titleContainer.className = 'title-container';
    detailsContainer.className = 'details-container';
    checkBoxContainer.className = 'checkbox-container';
    uncheckedImg.className = 'checkbox-img';

    if (completed) {
        titleContainer.style.textDecoration = 'line-through';
        uncheckedImg.src = './img/finished.png';
    }

    if (dueDate) detailsContainer.textContent += dueDateText;
    if (reminderDate) detailsContainer.textContent += reminderText;
    if (repeatDate) detailsContainer.textContent += repeatText;


    titleContainer.textContent = title;

    listItemContainer.dataset.id = 'container' + IDIndex;
    starContainer.dataset.id = IDIndex;
    filledStarImg.dataset.id = IDIndex;
    emptyStarImg.dataset.id = IDIndex;
    uncheckedImg.dataset.id = IDIndex;
    checkedImg.dataset.id = IDIndex;
    checkBoxContainer.dataset.id = IDIndex;
    selectGroupElement.dataset.id = IDIndex;

    if(important)emptyStarImg.src = './img/filledstar.png';
    starContainer.append(emptyStarImg);
    checkBoxContainer.append(uncheckedImg);
    selectGroupElement.append(placeholder);
    titleContainer.append(selectGroupElement);
    contentContainer.append(titleContainer, detailsContainer);
    listItemContainer.append(checkBoxContainer, contentContainer, starContainer);
    outputContainer.append(listItemContainer);

    const toggleImportance = (id) => {
        id = parseInt(id, 10);
        if (toDoList[id]) {
            toDoList[id].important = !toDoList[id].important;
        }
    };

    const toggleCompletion = (id) => {
        id = parseInt(id, 10);
        if (toDoList[id]) {
            toDoList[id].completed = !toDoList[id].completed;
        }
    };

    const toggleListStar = (id) => {
        if (toDoList[id]?.important) {
            emptyStarImg.src = './img/filledstar.png';
        } else {
            emptyStarImg.src = './img/emptystar.png';
        }
    };

    const removeListItem = (id) => {
        const listItem = document.querySelector(`[data-id="container${id}"]`);
        if (listItem) listItem.remove();
    };

    const addListItem = (id) => {
        const listItem = toDoList.find(item => item.id == Number(id));
        if (!listItem) return;
        if(listItem.completed && !completedListOpen) return;

        const container = listItem.completed
            ? document.querySelector('.completed-list-container')
            : document.querySelector('.to-do-list-container');

        createDomListItem(
            listItem.title,
            listItem.dueDate,
            listItem.reminderDate,
            listItem.repeatDate,
            listItem.completed,
            container,
            listItem.id
        );
    };

    selectGroupElement.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        const selectedGroup = e.target.value;
        toDoList.find(item => item.id == id).group = selectedGroup;
        setSessionStorage();
    })

    starContainer.addEventListener('click', (e) => {
        const targetId = e.target.dataset.id;
        toggleImportance(targetId);
        toggleListStar(targetId);
        if(currentSection === 'important') removeListItem(targetId);
        setImportantItemCounter();
        setSessionStorage();
    });

    checkBoxContainer.addEventListener('click', (e) => {
        const targetId = e.target.dataset.id;

        toggleCompletion(targetId);
        removeListItem(targetId);
        if(currentSection === 'myday') addListItem(targetId);
        setCompletedListItemCounter();
        setMyDayItemCounter();
        setImportantItemCounter();
        setSessionStorage();
    });

    if (!completed) {
        checkBoxContainer.addEventListener('mouseenter', () => {
            uncheckedImg.src = './img/checked.png';
        });

        checkBoxContainer.addEventListener('mouseleave', () => {
            uncheckedImg.src = './img/unchecked.png';
        });
    }
};
