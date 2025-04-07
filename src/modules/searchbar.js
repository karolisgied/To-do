import { getItemsWithSearchInputInTheirTitle } from './toDoList';
import { createDomListItem } from './createDOMListItem';
import { clearDomList } from './clearDOMList';
import { styleActiveButton } from './styleActiveButton';
import { setCurrentSection } from './submitButton';
import { addCompletedTaskHeader } from './completedList';
import { setCompletedListItemCounter } from './completedList';
import { displayMyDay } from './myDay';
import Sortable from 'sortablejs';

const inputElement = document.querySelector('.search-input');
let hadInput = false; // state tracker

inputElement.addEventListener('input', () => {
    
    const input = inputElement.value.trim();

    if (input !== '' && !hadInput) {
        hadInput = true;
        removeNavbarAndContainers();
        addSearchPage();
        displaySearchItems();
        updateSearchHeaderTextContent();
    } else if (input === '' && hadInput) {
        hadInput = false;
        itemDisplayContainer.innerHTML = '';
        removeSearchPage();
        unremoveNavbarAndContainers();

        // styleActiveButton('myday');
        // setCurrentSection('myday');
        // displayMyDay();
        // addCompletedTaskHeader();
        // setCompletedListItemCounter();
    }
});

const itemDisplayNavbar = document.querySelector('.item-display-navbar');
const taskCreationContainer = document.querySelector('.task-creation-container');
const listContainer = document.querySelector('.list-container');
const itemDisplayContainer = document.querySelector('.item-display-container');

const removeNavbarAndContainers = () => {
    if(itemDisplayNavbar.parentNode) {
        itemDisplayContainer.removeChild(itemDisplayNavbar);
    }
    if(taskCreationContainer.parentNode) {
        itemDisplayContainer.removeChild(taskCreationContainer);
    }
    if(listContainer.parentNode) {
        itemDisplayContainer.removeChild(listContainer);
    }
}

const unremoveNavbarAndContainers = () => {
    if (!itemDisplayNavbar) {
        itemDisplayContainer.append(itemDisplayNavbar);
    }
    if (!taskCreationContainer) {
        itemDisplayContainer.append(taskCreationContainer);
    }
    if (!listContainer) {
        itemDisplayContainer.append(listContainer);
    }
    itemDisplayContainer.append(itemDisplayNavbar);
    itemDisplayContainer.append(taskCreationContainer);
    itemDisplayContainer.append(listContainer);
}

const updateSearchHeaderTextContent = () => {
    const searchHeaderContainer = document.querySelector('.search-header-container');
    if(searchHeaderContainer) searchHeaderContainer.textContent = 'Searching for "' + getSearchInput() +'"';
}

const addSearchPage = () => {
    const itemDisplayContainer = document.querySelector('.item-display-container');
    const searchHeaderContainer = document.createElement('div');
    const resultListContainer = document.createElement('div');

    searchHeaderContainer.className = 'search-header-container';
    resultListContainer.className = 'search-result-list-container';

    itemDisplayContainer.append(searchHeaderContainer, resultListContainer);
}

const removeSearchPage = () => {
    const searchHeaderContainer = document.querySelector('.search-header-container');
    const resultListContainer = document.querySelector('.search-result-list-container');

    if(searchHeaderContainer) {
        searchHeaderContainer.remove();
    }
    if(resultListContainer) {
        resultListContainer.remove();
    }
}

export const getSearchInput = () => {
    const inputElement = document.querySelector('.search-input');
    return inputElement.value.trim();
}

const displaySearchItems = () => {
    const itemDisplayContainer = document.querySelector('.item-display-container');
    getItemsWithSearchInputInTheirTitle().forEach((item) => {
        createDomListItem(
            item.title,
            item.dueDate,
            item.reminderDate,
            item.repeatDate,
            item.completed,
            itemDisplayContainer,
            item.id,
            item.important,
            item.group
        )
    })
}

const MakeListSortable = () => {
    const list = document.querySelector('.to-do-list-container');
    if (list) {
        new Sortable(list, {
            animation: 150
        });
    }
};

MakeListSortable();