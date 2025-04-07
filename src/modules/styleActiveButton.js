export const styleActiveButton = (section) => {
    const buttons = document.querySelectorAll('.default-list-item-container');
    buttons.forEach((button) => {
        button.classList.remove('active-button');
    });

    const mydayButton = document.querySelector('.myday-button');
    const importantButton = document.querySelector('.important-button');
    if(section === 'important') importantButton.classList.add('active-button');
    if(section === 'myday') mydayButton.classList.add('active-button');
}