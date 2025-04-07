import { handleSubmitButtonDisabling } from './submitButton';

const toDoItemNameInput = document.querySelector('.creation-task-input');

export const getTaskTitle = () => toDoItemNameInput.value;

const handleSubmitButtonClick = () => {
    toDoItemNameInput.addEventListener('input', () => {
        handleSubmitButtonDisabling();
    })
}

handleSubmitButtonClick();