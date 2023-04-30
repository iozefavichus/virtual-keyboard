const WRAPPER = document.createElement('div');
WRAPPER.className = 'wrapper';

document.body.prepend(WRAPPER);

const TEXTFIELD = document.createElement('textarea');
TEXTFIELD.className = 'text-field use-keyboard-input';
TEXTFIELD.setAttribute('autofocus', 'autofocus');

WRAPPER.appendChild(TEXTFIELD);

let lang = localStorage.getItem('lang');
if (!lang) {
  lang = 'eng';
}

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    capsLock: false,
    lang,
  },

  init() {
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');
    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this.createKeys('eng'));
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.btn');
    this.elements.main.appendChild(this.elements.keysContainer);
    WRAPPER.appendChild(this.elements.main);

    const TEXT = document.createElement('div');
    TEXT.textContent = 'Клавиатура создана в операционной системе MAC OS. Для переключения языка комбинация кнопка lang';
    TEXT.classList.add('text__description');
    WRAPPER.appendChild(TEXT);

    document.querySelectorAll('.use-keyboard-input').forEach((element) => {
      element.addEventListener('focus', () => {
        this.open(element.value, (currentValue) => {
          // eslint-disable-next-line no-param-reassign
          element.value = currentValue;
        });
      });
    });
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    let keyLayout = [];
    if (Keyboard.properties.lang === 'eng') {
      keyLayout = [
        '§', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
        'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'enter',
        'caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", '|',
        'shift', '`', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'arrow-up', 'shift_right',
        'lang', 'control', 'command', 'space', 'command_right', 'arrow-left', 'arrow-down', 'arrow-right',
      ];
    } else if (Keyboard.properties.lang === 'rus') {
      keyLayout = [
        '§', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
        'tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'enter',
        'caps', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Ё',
        'shift', '`', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '/', 'arrow-up', 'shift_right',
        'lang', 'control', 'command', 'space', 'command_right', 'arrow-left', 'arrow-down', 'arrow-right',
      ];
    }
    const createIconHTML = (IconName) => `<i>${IconName}</i>`;

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', 'enter', '|', 'Ё', 'shift_right'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('btn');

      const keyUp = key.toUpperCase();
      keyElement.classList.add(`Key${keyUp}`);

      if (key === '.') {
        keyElement.classList.add('Period');
      }
      if (key === ',') {
        keyElement.classList.add('Comma');
      }
      if (key === '/') {
        keyElement.classList.add('Slash');
      }
      if (key === '|') {
        keyElement.classList.add('Backslash');
      }
      if (key === "'") {
        keyElement.classList.add('Quote');
      }
      if (key === ';') {
        keyElement.classList.add('Semicolon');
      }
      if (key === ']') {
        keyElement.classList.add('BracketRight');
      }
      if (key === '[') {
        keyElement.classList.add('BracketLeft');
      }
      if (key === '`') {
        keyElement.classList.add('IntlBackslash');
      }
      if (key === '-') {
        keyElement.classList.add('Minus');
      }
      if (key === '=') {
        keyElement.classList.add('Equal');
      }
      if (key === '§') {
        keyElement.classList.add('Backquote');
      }

      const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
      if (digits.includes(key)) {
        keyElement.classList.remove(`Key${keyUp}`);
        keyElement.classList.add(`Digit${key}`);
      }

      const SPAN_UP = document.createElement('span');
      const SPAN_LEFT = document.createElement('span');
      const SPAN_DOWN = document.createElement('span');
      const SPAN_RIGHT = document.createElement('span');

      switch (key) {
        case 'arrow-up':
          keyElement.classList.remove(`Key${keyUp}`);
          keyElement.classList.add('ArrowUp');
          SPAN_UP.classList.add('arrow');
          SPAN_UP.classList.add('arrow__top');
          keyElement.append(SPAN_UP);

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });

          break;

        case 'arrow-left':
          keyElement.classList.remove(`Key${keyUp}`);
          keyElement.classList.add('ArrowLeft');
          SPAN_LEFT.classList.add('arrow');
          SPAN_LEFT.classList.add('arrow__left');
          keyElement.append(SPAN_LEFT);

          keyElement.addEventListener('click', () => {
            this.properties.value += '';
            this.triggerEvent('oninput');
          });

          break;

        case 'arrow-down':
          keyElement.classList.remove(`Key${keyUp}`);
          keyElement.classList.add('ArrowDown');
          SPAN_DOWN.classList.add('arrow');
          SPAN_DOWN.classList.add('arrow__bottom');
          keyElement.append(SPAN_DOWN);

          keyElement.addEventListener('click', () => {
            this.properties.value += '';
            this.triggerEvent('oninput');
          });

          break;

        case 'arrow-right':
          keyElement.classList.remove(`Key${keyUp}`);
          keyElement.classList.add('ArrowRight');
          SPAN_RIGHT.classList.add('arrow');
          SPAN_RIGHT.classList.add('arrow__right');
          keyElement.append(SPAN_RIGHT);

          keyElement.addEventListener('click', () => {
            this.properties.value += '';
            this.triggerEvent('oninput');
          });

          break;

        case 'backspace':
          keyElement.classList.add('btn__wide');
          keyElement.classList.remove(`Key${keyUp}`);
          keyElement.classList.add('Backspace');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click', () => {
            // eslint-disable-next-line max-len
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this.triggerEvent('oninput');
          });

          break;

        case 'caps':
          keyElement.classList.add('btn__wide');
          keyElement.innerHTML = createIconHTML('capslock');
          keyElement.classList.remove(`Key${keyUp}`);
          keyElement.classList.add('CapsLock');

          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('btn--active', this.properties.capsLock);
          });

          break;

        case 'lang':
          keyElement.classList.add('btn__wide_second');
          keyElement.innerHTML = createIconHTML('lang');
          keyElement.classList.remove(`Key${keyUp}`);
          keyElement.classList.add('language');

          keyElement.addEventListener('click', () => {
            this.toggleLanguage();
          });

          break;

        case 'enter':
          keyElement.classList.add('btn__wide');
          keyElement.innerHTML = createIconHTML('enter');
          keyElement.classList.remove(`Key${keyUp}`);
          keyElement.classList.add('Enter');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });

          break;

        case 'tab':
          keyElement.classList.add('btn__wide');
          keyElement.innerHTML = createIconHTML('tab');
          keyElement.classList.remove(`Key${keyUp}`);
          keyElement.classList.add('Tab');

          keyElement.addEventListener('click', () => {
            this.properties.value += '    ';
            this.triggerEvent('oninput');
          });

          break;

        case 'shift':
          keyElement.classList.add('btn__wide');
          keyElement.innerHTML = createIconHTML('shift');
          keyElement.classList.remove(`Key${keyUp}`);
          keyElement.classList.add('ShiftLeft');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });

          break;

        case 'control':
          keyElement.classList.add('btn__wide_second');
          keyElement.innerHTML = createIconHTML('control');
          keyElement.classList.remove(`Key${keyUp}`);
          keyElement.classList.add('ControlLeft');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });

          break;

        case 'shift_right':
          keyElement.classList.add('btn__wide');
          keyElement.innerHTML = createIconHTML('shift');
          keyElement.classList.remove(`Key${keyUp}`);
          keyElement.classList.add('ShiftRight');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });

          break;

        case 'command':
          keyElement.classList.add('btn__wide_second');
          keyElement.innerHTML = createIconHTML('command');
          keyElement.classList.remove(`Key${keyUp}`);
          keyElement.classList.add('MetaLeft');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });

          break;

        case 'command_right':
          keyElement.classList.add('btn__wide_second');
          keyElement.innerHTML = createIconHTML('command');
          keyElement.classList.remove(`Key${keyUp}`);
          keyElement.classList.add('MetaRight');
          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });

          break;

        case 'space':
          keyElement.classList.add('btn__extrawide');
          keyElement.innerHTML = createIconHTML('space');
          keyElement.classList.remove(`Key${keyUp}`);
          keyElement.classList.add('Space');

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.triggerEvent('oninput');
          });

          break;

        default:
          TEXTFIELD.selectionStart = this.properties.value.length;
          TEXTFIELD.selectionEnd = this.properties.value.length;
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener('click', () => {
            // eslint-disable-next-line max-len
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this.triggerEvent('oninput');
          });
          TEXTFIELD.focus();
          TEXTFIELD.selectionStart = this.properties.value.length;
          TEXTFIELD.selectionEnd = this.properties.value.length;
          break;
      }

      // eslint-disable-next-line func-names
      document.onkeydown = function (event) {
        const arrayKey = ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP',
          'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL',
          'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM'];
        const arrayDigit = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0'];

        const count = event.code;
        if ((arrayDigit.includes(count)) || (arrayKey.includes(count))) {
          document.querySelector(`.${count}`).classList.add('active');
          Keyboard.properties.value += event.key;
          setTimeout(() => {
            document.querySelector(`.${count}`).classList.remove('active');
          }, '150');
        } else if (count === 'Backspace') {
          document.querySelector('.Backspace').classList.add('active');
          setTimeout(() => {
            document.querySelector('.Backspace').classList.remove('active');
          }, '150');
        } else if (count === 'ControlLeft') {
          document.querySelector('.ControlLeft').classList.add('active');
          setTimeout(() => {
            document.querySelector('.ControlLeft').classList.remove('active');
          }, '150');
        } else if (count === 'MetaRight') {
          document.querySelector('.MetaRight').classList.add('active');
          setTimeout(() => {
            document.querySelector('.MetaRight').classList.remove('active');
          }, '150');
        } else if (count === 'ShiftLeft') {
          document.querySelector('.ShiftLeft').classList.add('active');
          setTimeout(() => {
            document.querySelector('.ShiftLeft').classList.remove('active');
          }, '150');
        } else if (count === 'MetaLeft') {
          document.querySelector('.MetaLeft').classList.add('active');
          setTimeout(() => {
            document.querySelector('.MetaLeft').classList.remove('active');
          }, '150');
        } else if (count === 'ShiftRight') {
          document.querySelector('.ShiftRight').classList.add('active');
          setTimeout(() => {
            document.querySelector('.ShiftRight').classList.remove('active');
          }, '150');
        } else if (count === 'Tab') {
          document.querySelector('.Tab').classList.add('active');
          setTimeout(() => {
            document.querySelector('.Tab').classList.remove('active');
          }, '150');
        } else if (count === 'Space') {
          Keyboard.properties.value += ' ';
          document.querySelector('.Space').classList.add('active');
          setTimeout(() => {
            document.querySelector('.Space').classList.remove('active');
          }, '150');
        } else if (count === 'Enter') {
          Keyboard.properties.value += '\n';
          document.querySelector('.Enter').classList.add('active');
          setTimeout(() => {
            document.querySelector(`.${count}`).classList.remove('active');
          }, '150');
        } else if (count === 'IntlBackslash') {
          Keyboard.properties.value += '`';
          document.querySelector('.IntlBackslash').classList.add('active');
          setTimeout(() => {
            document.querySelector('.IntlBackslash').classList.remove('active');
          }, '150');
        } else if (count === 'Comma') {
          Keyboard.properties.value += ',';
          document.querySelector('.Comma').classList.add('active');
          setTimeout(() => {
            document.querySelector('.Comma').classList.remove('active');
          }, '150');
        } else if (count === 'Period') {
          Keyboard.properties.value += '.';
          document.querySelector('.Period').classList.add('active');
          setTimeout(() => {
            document.querySelector('.Period').classList.remove('active');
          }, '150');
        } else if (count === 'Slash') {
          Keyboard.properties.value += '/';
          document.querySelector('.Slash').classList.add('active');
          setTimeout(() => {
            document.querySelector('.Slash').classList.remove('active');
          }, '150');
        } else if (count === 'Semicolon') {
          Keyboard.properties.value += ';';
          document.querySelector('.Semicolon').classList.add('active');
          setTimeout(() => {
            document.querySelector('.Semicolon').classList.remove('active');
          }, '150');
        } else if (count === 'Quote') {
          Keyboard.properties.value += "'";
          document.querySelector('.Quote').classList.add('active');
          setTimeout(() => {
            document.querySelector('.Quote').classList.remove('active');
          }, '150');
        } else if (count === 'Backslash') {
          Keyboard.properties.value += '';
          document.querySelector('.Backslash').classList.add('active');
          setTimeout(() => {
            document.querySelector('.Backslash').classList.remove('active');
          }, '150');
        } else if (count === 'BracketLeft') {
          Keyboard.properties.value += '[';
          document.querySelector('.BracketLeft').classList.add('active');
          setTimeout(() => {
            document.querySelector('.BracketLeft').classList.remove('active');
          }, '150');
        } else if (count === 'BracketRight') {
          Keyboard.properties.value += ']';
          document.querySelector('.BracketRight').classList.add('active');
          setTimeout(() => {
            document.querySelector('.BracketRight').classList.remove('active');
          }, '150');
        } else if (count === 'CapsLock') {
          Keyboard.toggleCapsLock();
          const caps = document.querySelector('.CapsLock');
          caps.classList.toggle('btn--active', Keyboard.properties.capsLock);
          Keyboard.properties.value += '';
        } else if (count === 'Minus') {
          Keyboard.properties.value += '-';
          document.querySelector('.Minus').classList.add('active');
          setTimeout(() => {
            document.querySelector('.Minus').classList.remove('active');
          }, '150');
        } else if (count === 'Equal') {
          Keyboard.properties.value += '=';
          document.querySelector('.Equal').classList.add('active');
          setTimeout(() => {
            document.querySelector('.Equal').classList.remove('active');
          }, '150');
        } else if (count === 'ArrowUp') {
          document.querySelector('.ArrowUp').classList.add('active');
          setTimeout(() => {
            document.querySelector('.ArrowUp').classList.remove('active');
          }, '150');
        } else if (count === 'ArrowDown') {
          document.querySelector('.ArrowDown').classList.add('active');
          setTimeout(() => {
            document.querySelector('.ArrowDown').classList.remove('active');
          }, '150');
        } else if (count === 'ArrowLeft') {
          document.querySelector('.ArrowLeft').classList.add('active');
          setTimeout(() => {
            document.querySelector('.ArrowLeft').classList.remove('active');
          }, '150');
        } else if (count === 'ArrowRight') {
          document.querySelector('.ArrowRight').classList.add('active');
          setTimeout(() => {
            document.querySelector('.ArrowRight').classList.remove('active');
          }, '150');
        }
      };
      // eslint-disable-next-line func-names
      document.onkeyup = function () {
        TEXTFIELD.focus();
        TEXTFIELD.selectionStart = this.properties.value.length;
        TEXTFIELD.selectionEnd = this.properties.value.length;
      };

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  },

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    // eslint-disable-next-line no-restricted-syntax
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        // eslint-disable-next-line max-len
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  toggleLanguage() {
    if (this.properties.lang === 'eng') {
      this.properties.lang = 'rus';
      localStorage.removeItem('lang');
      localStorage.setItem('lang', 'rus');
    } else if (this.properties.lang === 'rus') {
      this.properties.lang = 'eng';
      localStorage.removeItem('lang');
      localStorage.setItem('lang', 'eng');
    }
    Keyboard.elements.main.remove();
    const del = document.querySelector('.text__description');
    WRAPPER.removeChild(del);
    Keyboard.init();
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
  },

};

function setFocus() {
  document.querySelector('.text-field').focus();
}

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
  setFocus();
});
