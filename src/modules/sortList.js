import { removeAllButOne } from './completedList';
import { createDomListItem } from './createDOMListItem';
import { getListSortedByImportance, getListSortedByDueDate } from './toDoList';


const importanceButton = document.querySelector('.sort-importance');
const dueDateButton = document.querySelector('.sort-due-date');
const sortButton = document.querySelector('.sort-button');
const toDoListContainer = document.querySelector('.to-do-list-container');

sortButton.addEventListener('click', () => {
    toggleSortPopover();
});

importanceButton.addEventListener('click', () => {
    const list = getListSortedByImportance();
    toDoListContainer.innerHTML = '';
    toggleSortPopover();
    displayListItems(list, toDoListContainer);
});
dueDateButton.addEventListener('click', () => {
    const list = getListSortedByDueDate();
    toDoListContainer.innerHTML = '';
    toggleSortPopover();
    displayListItems(list, toDoListContainer);
});


const toggleSortPopover = () => {
    const sortPopover = document.querySelector('.popover-sort-container');
    sortPopover.style.display = sortPopover.style.display === 'none' ? 'flex' : 'none';
}

export const displayListItems = (array, container) => {
    if(array) {
        array.forEach(item => {
            createDomListItem(
                item.title, 
                item.dueDate, 
                item.reminderDate, 
                item.repeatDate, 
                item.completed, 
                container, 
                item.id, 
                item.important,
                item.group
            )
        });
    }
} 