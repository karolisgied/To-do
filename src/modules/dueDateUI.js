const handleCalendarPopoverClosing = () => {
    const calendarPopover = document.querySelector('.popover-calendar-container');
    const calendarButton = document.querySelector('.task-creation-calendar-container');

    document.addEventListener('click', (e) => {
        if (!calendarPopover.contains(e.target) && !calendarButton.contains(e.target)) {
            calendarPopover.style.display = 'none';
        }
    });
};

const toggleCalendarPopover = () => {
    const calendarPopover = document.querySelector('.popover-calendar-container');
    calendarPopover.style.display = calendarPopover.style.display === 'flex' ? 'none' : 'flex';
}

const closeCalendarPopover = () => {
    const calendarPopover = document.querySelector('.popover-calendar-container');
    calendarPopover.style.display = 'none';
}

const showDueDatePicker = () => {
    const dueInputButton = document.querySelector('.due-input-button');
    const dateInputs = document.querySelector('.due-date-input');

    dueInputButton.addEventListener('click', () => {
        dateInputs.showPicker();
    });
};

const getDueDatePickerInput = () => {
    const dueDateInput = document.querySelector('.due-date-input');
    dueDateInput.addEventListener("change", function() {
        handleDueDatePickerInputValue();
        closeCalendarPopover();
        return true;
    });
};

const handleDueDatePickerInputValue = () => {
    const dueDateInput = document.querySelector('.due-date-input');
    dateInput = dueDateInput.value;
    setDueDateTextContent();
}

const handleCalendarButtonEvents = () => {
    const calendarButton = document.querySelector('.task-creation-calendar-container');
    calendarButton.addEventListener('click', (e) => {
        toggleCalendarPopover();
    });
}

const getDueDateInput = () => {
    document.querySelectorAll('.due-date-input-list-item').forEach((addDueDateClickListener));
}

const addDueDateClickListener = (element) => {
    element.addEventListener('click', handleDueDateClick)
}

const handleDueDateClick = (e) => {
    const data = e.currentTarget.id;
    dateInput = e.currentTarget.id;
    closeCalendarPopover();
    setDueDateTextContent();
}

const setDueDateTextContent = () => {
    const dueDate = document.querySelector('.due-date');
    dueDate.textContent = dateInput;
}
export let dateInput = '';

handleCalendarPopoverClosing();
getDueDateInput();
getDueDatePickerInput();
handleCalendarButtonEvents();
showDueDatePicker();

