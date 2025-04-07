const handleReminderPopoverClosing = () => {
    const reminderPopover = document.querySelector('.popover-reminder-container');
    const reminderButton = document.querySelector('.task-creation-reminder-container');

    document.addEventListener('click', (e) => {
        if (!reminderPopover.contains(e.target) && !reminderButton.contains(e.target)) {
            reminderPopover.style.display = 'none';
        }
    });
};

const toggleReminderPopover = () => {
    const reminderPopover = document.querySelector('.popover-reminder-container');
    reminderPopover.style.display = reminderPopover.style.display === 'flex' ? 'none' : 'flex';
}

const closeReminderPopover = () => {
    const reminderPopover = document.querySelector('.popover-reminder-container');
    reminderPopover.style.display = 'none';
}

const showReminderDatePicker = () => {
    const dueInputButton = document.querySelector('.reminder-date-input-button');
    const dateInputs = document.querySelector('.reminder-date-input');

    dueInputButton.addEventListener('click', () => {
        dateInputs.showPicker();
    });
};

const getReminderDatePickerInput = () => {
    const dueDateInput = document.querySelector('.reminder-date-input');
    dueDateInput.addEventListener("change", function() {
        handleReminderDatePickerInputValue();
        closeReminderPopover();
        return true;
    });
};

const handleReminderDatePickerInputValue = () => {
    const dueDateInput = document.querySelector('.reminder-date-input');
    dateInput = dueDateInput.value;
    setReminderDateTextContent();
}

const handleReminderButtonEvents = () => {
    const reminderButton = document.querySelector('.task-creation-reminder-container');
    reminderButton.addEventListener('click', (e) => {
        toggleReminderPopover();
    });
}

const getReminderDateInput = () => {
    document.querySelectorAll('.reminder-time-input-list-item').forEach((addReminderDateClickListener));
}

const addReminderDateClickListener = (element) => {
    element.addEventListener('click', handleReminderDateClick)
}

const handleReminderDateClick = (e) => {
    const data = e.currentTarget.id;
    dateInput = e.currentTarget.id;
    closeReminderPopover();
    setReminderDateTextContent();
}

const setReminderDateTextContent = () => {
    const dueDate = document.querySelector('.reminder-date');
    dueDate.textContent = dateInput;
}


export let dateInput = '';

handleReminderPopoverClosing();
getReminderDateInput();
getReminderDatePickerInput();
handleReminderButtonEvents();
showReminderDatePicker();

