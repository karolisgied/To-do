const searchInputValueHandling = () => {
    document.querySelector('.search-button').addEventListener('click', () => {
        const searchValue = document.querySelector('.search-input').value;
    });
};

const searchBarInputFocusOnClick = () => {
    const searchBarContainer = document.querySelector('.search-bar-container');
    searchBarContainer.addEventListener('click', () => {
        document.querySelector('.search-input').focus();
    });
};

const handleTaskCreationInputFocusOnClick = () => {
    const taskCreationContainer = document.querySelector('.creation-task');
    taskCreationContainer.addEventListener('click', () => {
        document.querySelector('.creation-task-input').focus();
    });
};

const handleSubmitButton = () => {
    const submitBtn = document.querySelector('.add-button');

    submitBtn.addEventListener('click', () => {
        // Handle form submission logic
    });
};

document.addEventListener('DOMContentLoaded', () => {
    handleSubmitButton();
    handleTaskCreationInputFocusOnClick();
    searchBarInputFocusOnClick();
    searchInputValueHandling();
});
