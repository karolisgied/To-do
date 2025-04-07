import { getCompletedCount } from './toDoList';
import { getCompletedItemList } from './toDoList';
import { createDomListItem } from './createDOMListItem';
import { getTaskTitle } from './toDoItemNameInput';

export let completedListOpen = false;

export const addCompletedTaskHeader = () => {
    const completedListContainer = document.querySelector('.completed-list-container');
    const completedListItemContainer = document.querySelector('.completed-list-item-container');
    const completedContainer = document.createElement('div');
    const arrowContainer = document.createElement('div');
    const headerContainer = document.createElement('div');
    const counterContainer = document.createElement('div');
    const arrowImg = document.createElement('img');
    
    arrowImg.src = './img/arrow.png';
    
    completedContainer.className = 'completed-list-heading-container';
    arrowContainer.className = 'arrow-container';
    headerContainer.className = 'header-container';
    counterContainer.className = 'counter-container';
    
    headerContainer.textContent = 'Completed';
    
    arrowContainer.append(arrowImg);
    completedContainer.append(arrowContainer, headerContainer, counterContainer);
    completedListContainer.append(completedContainer);
    
    const handleCompletedClick = () => {
        completedContainer.addEventListener('click', (e) => {
            toggleArrowDirection();
            toggleCompletedList();
            toggleCompletedListOpen();
        });
    }
    
    const toggleCompletedListOpen = () => {
        completedListOpen = completedListOpen === true ? false : true;
    }
    
    const toggleArrowDirection = () => {
        arrowImg.classList.toggle('rotated');
    }
    
    const displayCompletedItems = () => {
        const completedListItemContainer = document.querySelector('.completed-list-container');
        if(getCompletedCount() > 0 && getCompletedItemList()) {
            getCompletedItemList().forEach(item => {
                createDomListItem(
                    item.title,
                    item.dueDate,
                    item.reminderDate,
                    item.repeatDate,
                    true,
                    completedListItemContainer,
                    item.id,
                    item.important,
                    item.group
                );
            });
        }

    }
    
    const toggleCompletedList = () => {
        const completedListItemContainer = document.querySelector('.completed-list-container');
        
        if(completedListItemContainer.children.length === 1) {
            displayCompletedItems();
        } else (removeAllButOne('.completed-list-container'))
    }
    
    handleCompletedClick();
}

export const removeAllButOne = (containerSelector, keepIndex = 0) => {
    let container = document.querySelector(containerSelector);
    if(!container)return;

    let children = Array.from(container.children);
    children.forEach((child, index) => {
        if (index != keepIndex) {
            child.remove();
        }
    });
}

export const setCompletedListItemCounter = () => {
    const counterContainer = document.querySelector('.counter-container');
    if (counterContainer) counterContainer.textContent = getCompletedCount();
}

addCompletedTaskHeader();