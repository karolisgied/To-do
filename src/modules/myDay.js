import { clearDomList } from './clearDOMList';
import { createDomListItem } from './createDOMListItem';
import { styleActiveButton } from './styleActiveButton';
import { toDoList, getMyDayItemCount, getImportantItemCount} from './toDoList';
import { setCurrentSection } from './submitButton';
import { addCompletedTaskHeader } from './completedList';
import { setCompletedListItemCounter } from './completedList';

export const displayMyDay = () => {
    const listItemContainer = document.querySelector('.to-do-list-container');
    if(toDoList) {
        if(toDoList.length !== 0) {
            toDoList.forEach((item) => {
                if (!item.completed) {
                    createDomListItem(
                        item.title,
                        item.dueDate,
                        item.reminderDate,
                        item.repeatDate,
                        item.completed,
                        listItemContainer,
                        item.id,
                        item.important
                    );
                }
        
            })
        }
    }
}

const handleMyDayButtonClick = () => {
    const importanButton = document.querySelector('.myday-button');
    importanButton.addEventListener('click', () => {
        styleActiveButton('myday');
        setCurrentSection('myday');
        clearDomList();
        displayMyDay();
        addCompletedTaskHeader();
        setCompletedListItemCounter();
    });
}

export const setMyDayItemCounter = () => {
    const myDayItemCounter = document.querySelector('.myday-counter');
    myDayItemCounter.textContent = getMyDayItemCount();
}

export const setImportantItemCounter = () => {
    const importantItemCounter = document.querySelector('.important-counter');
    importantItemCounter.textContent = getImportantItemCount();
}

handleMyDayButtonClick();