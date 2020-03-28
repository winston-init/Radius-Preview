// main functionalities (app)
const topLeft = document.querySelector("#top-left");
const topRight = document.querySelector("#top-right");
const bottomRight = document.querySelector("#bottom-right");
const bottomLeft = document.querySelector("#bottom-left");
const eightValues = document.querySelector("#eight-values");
const resultBox = document.querySelector(".result-box");

// Inputs of Default tab
const sides = [topLeft, topRight, bottomRight, bottomLeft];

// Update values of default tab
const setRadiusValues = () => {
  const inputListener =  (input, action) => {
    input.addEventListener("input", action);
  }

  const updateRadiusValue = () => {
    resultBox.style.borderTopLeftRadius = topLeft.value;
    resultBox.style.borderTopRightRadius = topRight.value;
    resultBox.style.borderBottomRightRadius = bottomRight.value;
    resultBox.style.borderBottomLeftRadius = bottomLeft.value;
  }

  for (let i = 0; i < sides.length; i++) {
    inputListener(sides[i], updateRadiusValue);
  }
}

// Update value of Border Radius (8 values)
const updateFullRadius = () => {
  eightValues.addEventListener('input', () => {
    resultBox.style.borderRadius = eightValues.value;
  });
}

// Set 0 and 'px' in null items
const nullItem = (item) => {
  if (item.value === null || item.value === '') {
    item.value = 0;
    let str = String(item.value);
    if (str.indexOf('px') === -1) {
      item.value = item.value + 'px';
    }
  }
}

// Set empty the inputs
const emptyValue = (item) => {
  item.value = '';
}

// <ove to clipboard CSS text
const createClipboard = (message) => {
  const clipboard = document.createElement('textarea');
  clipboard.value = message;
  clipboard.setAttribute('readonly','');
  clipboard.style = {position: 'absolute', left: '-99999999px'};
  document.body.appendChild(clipboard);
  clipboard.select();
  document.execCommand('copy');
  document.body.removeChild(clipboard);
}

// Show the message
const showMessageCopied = () => {
  resultBox.classList.add('copied');
  const copiedText = document.querySelector('.copied');
  copiedText.textContent = 'Code CSS copied';

  setTimeout(() => {
    copiedText.textContent = 'Custom';
    resultBox.classList.remove('copied');
  }, 3000);
}

// Copy button action
const copyCSSCode = () => {
  document.querySelector('.btn-copy').addEventListener('click', () => {
    sides.forEach(nullItem);
    // CSS text - if 8 values is empty or not
    if (eightValues.value === null || eightValues.value === '') {
      let copyCSS = `border-radius: ${topLeft.value} ${topRight.value} ${bottomRight.value} ${bottomLeft.value};`;
      createClipboard(copyCSS);
    } else {
      let copyCSS = `border-radius: ${eightValues.value};`;
      createClipboard(copyCSS);
      emptyValue(eightValues);
    }
    sides.forEach(emptyValue);
    // Clipboard message
    showMessageCopied();
  });
}

// create scheme button
const createSchemeButton = () => {
  let newButton = document.createElement('button');
  const header = document.querySelector('header');
  header.appendChild(newButton);
  mainButton = header.querySelectorAll('button');
  let btnDarkMode = mainButton[mainButton.length - 1];
  btnDarkMode.classList.add('btn');
  btnDarkMode.classList.add('btn-scheme');
  btnDarkMode.classList.add('btn-scheme--dark');
  btnDarkMode.textContent = 'Dark Mode';
}

// toggle scheme action
const toggleScheme = () => {
  const btnDark = document.querySelector('.btn-scheme');

  btnDark.addEventListener('click', () => {
    const body = document.querySelector('body');
    const header = document.querySelector('header');
    const app = document.querySelector('.app');
    const label = document.querySelectorAll('label');
    const input = document.querySelectorAll('input');

    body.classList.toggle('body--dark');
    header.classList.toggle('header--dark');
    app.classList.toggle('app--dark');
    resultBox.classList.toggle('result-box--dark');
    [].forEach.call(label, (el) => {
      el.classList.toggle('label--dark');
    });
    [].forEach.call(input, (el) => {
      el.classList.toggle('input--dark');
    });
    btnDark.classList.toggle('btn-scheme--dark');  
    btnDark.classList.toggle('btn-scheme--light');

    [].forEach.call(document.querySelectorAll('.content'), (item) => {
      item.classList.toggle('content--dark');
    })

    if (btnDark.textContent === 'Dark Mode') {
      btnDark.textContent = 'Light Mode';
    } else if (btnDark.textContent === 'Light Mode') {
      btnDark.textContent = 'Dark Mode';
    }
  });
}

setRadiusValues();
updateFullRadius();
copyCSSCode();
createSchemeButton();
toggleScheme();