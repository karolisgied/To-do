const handleCalendarPopoverClosing = () => {
    const calendarPopover = document.querySelector('.popover-repeat-container');
    const calendarButton = document.querySelector('.task-creation-repeat-container');

    document.addEventListener('click', (e) => {
        if (!calendarPopover.contains(e.target) && !calendarButton.contains(e.target)) {
            calendarPopover.style.display = 'none';
        }
    });
};



const handleRepeatDateClick = (e) => {
    customInputData.type = false;
    customInputData.dateInput = e.currentTarget.id;
    userInput = e.currentTarget.id;
    closeRepeatPopover();
    changeReminderDateTextContent();
}

const addRepeatDateClickListener = (element) => {
    element.addEventListener('click', handleRepeatDateClick)
}

const getRepeatDateInput = () => {
    document.querySelectorAll('.repeat-interval-input-list-item').forEach((addRepeatDateClickListener));
}

const toggleCustomRepeatPopover = () => {
    const customPopover = document.querySelector('.custom-repeat-popover');
    customPopover.style.display = customPopover.style.display === 'flex' ? 'none' : 'flex';
}


const handleCustomInputButtonClick = () => {
    const repeatCustomInputButton = document.querySelector('.repeat-custom-input-btn');
    repeatCustomInputButton.addEventListener('click', () => {
        toggleCustomRepeatPopover();
    });
}

const handleCustomSubmitButtonClick = () => {
    const customRepeatPopoverBtn = document.querySelector('.custom-repeat-popover-btn');
    customRepeatPopoverBtn.addEventListener('click', () => {
        getCustomInputData();
        changeReminderDateTextContent();
        closeRepeatPopover();
    });
}

const getCustomInputData = () => {
    const customRepeatSelectField = document.querySelector('.custom-repeat-select-field');
    const customRepeatPopoverNumInput = document.querySelector('.custom-repeat-popover-num-input');
    customInputData.selectFieldValue = customRepeatSelectField.value;
    customInputData.numInputData = customRepeatPopoverNumInput.value;
    customInputData.type = true;
    userInput = 'Every ' + customRepeatPopoverNumInput.value + ' ' + customRepeatSelectField.value;
}

const changeReminderDateTextContent = () => {
    const repeatInterval = document.querySelector('.repeat-interval');
    if(customInputData.type) {
        repeatInterval.textContent = 'Every ' + customInputData.numInputData + ' ' + customInputData.selectFieldValue;
    } else if(!customInputData.type) {
        repeatInterval.textContent = customInputData.dateInput;
    }

}

const closeRepeatPopover = () => {
    const calendarPopover = document.querySelector('.popover-repeat-container');
    calendarPopover.style.display = 'none';
}

const toggleRepeatPopover = () => {
    const calendarPopover = document.querySelector('.popover-repeat-container');
    calendarPopover.style.display = calendarPopover.style.display === 'flex' ? 'none' : 'flex';
}


const handleRepeatButtonEvents = () => {
    const calendarButton = document.querySelector('.task-creation-repeat-container');
    calendarButton.addEventListener('click', (e) => {
        toggleRepeatPopover();
    });
}


const customInputData = {};
export let userInput = '';


handleRepeatButtonEvents();
getRepeatDateInput();
handleCustomSubmitButtonClick();
handleCustomInputButtonClick();
