import { getImportantItemList } from './toDoList';
import { clearDomList } from './clearDOMList';
import { createDomListItem } from './createDOMListItem';
import { styleActiveButton } from './styleActiveButton';
import { setCurrentSection } from './submitButton';

const displayImportant = () => {
    const listItemContainer = document.querySelector('.to-do-list-container');
    getImportantItemList().forEach((item) => {
        if (item.completed) return;
        createDomListItem(
            item.title, 
            item.dueDate, 
            item.reminderDate, 
            item.repeatDate, 
            item.completed, 
            listItemContainer, 
            item.id,
            true
        );
    })
}

const handleImportantButtonClick = () => {
    const importanButton = document.querySelector('.important-button');
    importanButton.addEventListener('click', () => {
        styleActiveButton('important');
        setCurrentSection('important');
        clearDomList();
        displayImportant();
    })
}

handleImportantButtonClick();