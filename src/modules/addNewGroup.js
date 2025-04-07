import { removeAllButOne } from './completedList';
import { clearDomList } from './clearDOMList';
import { getCurrentGroupItems, setSessionStorage } from './toDoList';
import { createDomListItem } from './createDOMListItem';
import { displayListItems } from './sortList';
import { setCurrentSection } from './submitButton';
import { getGroupSessionStorage } from './storageUtils';
import { setCompletedListItemCounter } from './completedList';
import { setMyDayItemCounter, setImportantItemCounter } from './myDay';


const groupCreationInput = document.querySelector('.group-creation-input');
const groupCreationButton = document.querySelector('.group-creation-button');

groupCreationButton.addEventListener('click', () => {
    const input = groupCreationInput.value;
    createNewGroupDOM(input);
    updateGroupSelectElementValues();
    setSessionStorage();
})

const createNewGroupDOM = (name) => {
    const listItemContainer = document.createElement('div');
    const listItemDeleteContainer = document.createElement('div');
    const listItemTextContainer = document.createElement('div');
    const listItemCounter = document.createElement('div');
    const deleteImg = document.createElement('img');
    const userCreatedGroupContainer = document.querySelector('.user-group-list');

    deleteImg.src = './img/delete.png';

    listItemContainer.className = 'user-list-item-container';
    listItemDeleteContainer.className = 'user-list-item-delete-container';
    listItemTextContainer.className = 'user-list-item-text-container';
    listItemCounter.className = 'user-list-item-counter';

    listItemTextContainer.textContent = name;
    listItemCounter.textContent = '';
    listItemContainer.id = name;
    listItemDeleteContainer.id = name;

    listItemDeleteContainer.append(deleteImg)
    listItemContainer.append(listItemDeleteContainer, listItemTextContainer, listItemCounter);
    userCreatedGroupContainer.append(listItemContainer);

    listItemDeleteContainer.addEventListener('click', (e) => {
        e.currentTarget.parentNode.remove();
        updateGroupSelectElementValues();
        setSessionStorage();
    })

    listItemContainer.addEventListener('click', (e) => {
        setCurrentSection('group');
        const id = e.currentTarget.id;
        clearDomList();
        displayCurrentGroup(id);
        currentGroup = id;
        setSessionStorage();
    })

}

const setCurrentGroupButtonStyle = (id) => {
    const groupButtons = document.querySelectorAll(`#${id}`);
    const userGroupList = document.querySelector('.user-group-list');
    [...userGroupList.children].forEach(element => {
        element.classList.remove('active-group-button');
    });
    groupButtons.forEach(element => {
        if(element.id === id && element.closest('.user-group-list')) {
            element.classList.add('active-group-button');
        }
    });

}

export let currentGroup;

const displayCurrentGroup = (id) => {
    const toDoListContainer = document.querySelector('.to-do-list-container');
    displayListItems(getCurrentGroupItems(id), toDoListContainer);
}

export const getAllUserGroups = () => {
    let groupsArray = getAllDOMUserGroups();
    if (groupsArray.length === 0) {
        groupsArray = getGroupSessionStorage() || [];

    }
    return groupsArray;
}

export const getAllDOMUserGroups = () => {
    let groupsArray = [];
    let i = 0;
    const userCreatedGroupContainer = document.querySelector('.user-group-list');
    [...userCreatedGroupContainer.children].forEach(element => {
        groupsArray[i] = element.id;
        i++;
    });
    return groupsArray;
}

export const displayAllUserGroups = () => {
    getAllUserGroups().forEach(groupName => {
        createNewGroupDOM(groupName);
    })
}

export const updateGroupSelectElementValues = () => {
    document.querySelectorAll('.select-group-element').forEach(element => {
        const placeholder = element.querySelector('option') || document.createElement('option');
        const placeholderValue = placeholder.value;
        const placeholderText = placeholder.textContent;

        element.innerHTML = '';

        placeholder.value = placeholderValue;
        placeholder.textContent = placeholderText;
        element.append(placeholder);

        const existingValues = new Set([...element.options].map(opt => opt.value));

        getAllUserGroups().forEach(groupName => {
            if (!existingValues.has(groupName)) {
                const option = document.createElement('option');
                option.textContent = groupName;
                option.value = groupName;
                element.append(option);
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    if (getAllDOMUserGroups().length === 0 && getAllUserGroups().length > 0 ) {
        displayAllUserGroups();
        setCompletedListItemCounter();
        setMyDayItemCounter();
        setImportantItemCounter();
    }
})
