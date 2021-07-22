"use strict";
// cache DOM selection
const textArea = document.querySelector('#display');
const keyboardElement = document.querySelector('#keyboard');
const hideKeyboard = document.querySelector('#close');
const capsLock = document.querySelector('#caps');
const backspaceKey = document.querySelector('#backspace');
const spaceBarKey = document.querySelector('#spacebar');
const returnKey = document.querySelector('#return');
const keyboardButtons = document.querySelectorAll('.keyboard-key');
const regularButtons = [];
const LOCAL_STORAGE_KEY = '';
let loadedData = '';
// Filter buttons
keyboardButtons.forEach((button) => {
    if (!button.classList.contains('key-wide')) {
        regularButtons.push(button);
    }
});
// app states and functions
let capsOn = false;
let isFocused = false;
const replaceIcon = (element) => {
    element.classList.remove('mdi-chevron-up');
    element.classList.add('mdi-keyboard-caps');
};
const resetIcons = (element) => {
    element.classList.remove('mdi-keyboard-caps');
    element.classList.add('mdi-chevron-up');
};
// CapsLock event
capsLock.addEventListener('click', () => {
    if (!capsOn) {
        capsLock.classList.add('active');
        // replace icon
        replaceIcon(capsLock.lastElementChild);
        // display the letters in uppercase
        regularButtons.forEach(button => {
            button.textContent = button.textContent.toUpperCase();
        });
        capsOn = true;
    }
    else {
        capsLock.classList.remove('active');
        // reset icons
        resetIcons(capsLock.lastElementChild);
        // display the letters in lowercase
        regularButtons.forEach(button => {
            button.textContent = button.textContent.toLowerCase();
        });
        capsOn = false;
    }
}, false);
// text area focus
textArea.addEventListener('focus', () => {
    isFocused = true;
    if (isFocused) {
        keyboardElement.classList.add('focused');
    }
});
// hide keyboard
hideKeyboard.addEventListener('click', () => {
    if (isFocused) {
        keyboardElement.classList.remove('focused');
    }
});
// append values to keyboard
regularButtons.forEach((button) => {
    button.addEventListener('click', () => {
        textArea.value += button.textContent;
        localStorage.setItem(LOCAL_STORAGE_KEY, `${textArea.value}`);
    });
});
// backspace key function
backspaceKey.addEventListener('click', () => {
    if (textArea.value.length > 0) {
        textArea.value = textArea.value.slice(0, -1);
        localStorage.setItem(LOCAL_STORAGE_KEY, `${textArea.value}`);
    }
});
// spacebar key function
spaceBarKey.addEventListener('click', () => {
    textArea.value += ` `;
    localStorage.setItem(LOCAL_STORAGE_KEY, `${textArea.value}`);
});
// return key function
returnKey.addEventListener('click', () => {
    textArea.value += `\n`;
    localStorage.setItem(LOCAL_STORAGE_KEY, `${textArea.value}`);
});
// load local storage data
window.onload = () => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY) !== null) {
        loadedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        textArea.value = loadedData;
    }
};
