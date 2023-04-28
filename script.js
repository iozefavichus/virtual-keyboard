
let BODY = document.getElementsByTagName("body");

let WRAPPER = document.createElement("div");
WRAPPER.className = "wrapper";

document.body.prepend(WRAPPER);

let TEXTFIELD = document.createElement("textarea");
TEXTFIELD.className = "text-field use-keyboard-input";
TEXTFIELD.setAttribute("autofocus","autofocus");
// TEXTFIELD.focus();

WRAPPER.appendChild(TEXTFIELD);

const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        // onclose: null
    },

    properties: {
        value: "",
        capsLock: false,
        lang: "eng"
    },

    init() {

        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");

        this.elements.keysContainer.appendChild(this._createKeys("eng"));

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".btn");

        this.elements.main.appendChild(this.elements.keysContainer);
        WRAPPER.appendChild(this.elements.main);

        let TEXT = document.createElement("div");
        TEXT.textContent = "Клавиатура создана в операционной системе MAC OS";
        TEXT.classList.add("text__description");
        let SECONDTEXT = document.createElement("div");
        SECONDTEXT.textContent =  "Для переключения языка комбинация: левый control + space";
        SECONDTEXT.classList.add("text__description");
        WRAPPER.appendChild(TEXT);
        WRAPPER.appendChild(SECONDTEXT);

        document.querySelectorAll(".use-keyboard-input").forEach(element => {
                    element.addEventListener("focus", () => {
                        this.open(element.value, currentValue => {
                            element.value = currentValue;
                        });
                    });
                });
        },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        let keyLayout =[];
        if(Keyboard.properties.lang == "eng"){
            keyLayout = [
                "§", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0","-","=", "backspace",
                "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p","[", "]","enter",
                "caps", "A", "S", "D", "F", "G", "H", "J", "K", "L",";" ,"'","|",
                "shift", "`", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "arrow-up", "shift_right",
                "control", "command" ,"space", "command_right", "arrow-left","arrow-down","arrow-right",
            ];
        }
        else if(Keyboard.properties.lang == "rus"){
            keyLayout=[
                "§", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0","-","=", "backspace",
                "tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З","[", "]","enter",
                "caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д",";" ,"'","|",
                "shift", "`", "Я", "Ч", "С", "М", "И", "Т", "Ь", ",", ".", "/", "arrow-up", "shift_right",
                "control", "command" ,"space", "command_right", "arrow-left","arrow-down","arrow-right",
            ];
        }
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "enter", "|", "shift_right"].indexOf(key) !== -1;

            keyElement.setAttribute("type", "button");
            keyElement.classList.add("btn");

            let keyUp = key.toUpperCase();
            keyElement.classList.add(`Key${keyUp}`);

            if(key =="."){
                keyElement.classList.add(`Period`);
            }
            if(key ==","){
                keyElement.classList.add(`Comma`);
            }
            if(key =="/"){
                keyElement.classList.add(`Slash`);
            }
            if(key =="|"){
                keyElement.classList.add(`Backslash`);
            }
            if(key =="'"){
                keyElement.classList.add(`Quote`);
            }
            if(key ==";"){
                keyElement.classList.add(`Semicolon`);
            }
            if(key =="]"){
                keyElement.classList.add(`BracketRight`);
            }
            if(key =="["){
                keyElement.classList.add(`BracketLeft`);
            }
            if(key =="`"){
                keyElement.classList.add(`IntlBackslash`);
            }
            if(key =="-"){
                keyElement.classList.add(`Minus`);
            }
            if(key =="="){
                keyElement.classList.add(`Equal`);
            }
            if(key =="§"){
                keyElement.classList.add(`Backquote`);
            }

            let digits = ["1","2","3","4","5","6","7","8","9","0"];
            if(digits.includes(key)){
                keyElement.classList.remove(`Key${keyUp}`);
                keyElement.classList.add(`Digit${key}`);
            }

            switch (key) {
                case "arrow-up":
                    keyElement.classList.remove(`Key${keyUp}`);
                    keyElement.classList.add(`ArrowUp`);
                    let SPAN_UP = document.createElement("span");
                    SPAN_UP.classList.add("arrow");
                    SPAN_UP.classList.add("arrow__top");
                    keyElement.append(SPAN_UP);

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "arrow-left":
                    keyElement.classList.remove(`Key${keyUp}`);
                    keyElement.classList.add(`ArrowLeft`);
                    let SPAN_LEFT = document.createElement("span");
                    SPAN_LEFT.classList.add("arrow");
                    SPAN_LEFT.classList.add("arrow__left");
                    keyElement.append(SPAN_LEFT);

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "arrow-down":
                    keyElement.classList.remove(`Key${keyUp}`);
                    keyElement.classList.add(`ArrowDown`);
                    let SPAN_DOWN = document.createElement("span");
                    SPAN_DOWN.classList.add("arrow");
                    SPAN_DOWN.classList.add("arrow__bottom");
                    keyElement.append(SPAN_DOWN);

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "arrow-right":
                    keyElement.classList.remove(`Key${keyUp}`);
                    keyElement.classList.add(`ArrowRight`);
                    let SPAN_RIGHT = document.createElement("span");
                    SPAN_RIGHT.classList.add("arrow");
                    SPAN_RIGHT.classList.add("arrow__right");
                    keyElement.append(SPAN_RIGHT);

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "backspace":
                    keyElement.classList.add("btn__wide");
                    keyElement.classList.remove(`Key${keyUp}`);
                    keyElement.classList.add(`Backspace`);
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("btn__wide");
                    keyElement.innerHTML = createIconHTML("capslock");
                    keyElement.classList.remove(`Key${keyUp}`);
                    keyElement.classList.add(`CapsLock`);

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("btn--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("btn__wide");
                    keyElement.innerHTML = createIconHTML("enter");
                    keyElement.classList.remove(`Key${keyUp}`);
                    keyElement.classList.add(`Enter`);

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "tab":
                    keyElement.classList.add("btn__wide");
                    keyElement.innerHTML = createIconHTML("tab");
                    keyElement.classList.remove(`Key${keyUp}`);
                    keyElement.classList.add(`Tab`);

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "    ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "shift":
                    keyElement.classList.add("btn__wide");
                    keyElement.innerHTML = createIconHTML("shift");
                    keyElement.classList.remove(`Key${keyUp}`);
                    keyElement.classList.add(`ShiftLeft`);

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                    case "control":
                        keyElement.classList.add("btn__wide");
                        keyElement.innerHTML = createIconHTML("control");
                        keyElement.classList.remove(`Key${keyUp}`);
                        keyElement.classList.add(`ControlLeft`);

                        keyElement.addEventListener("click", () => {
                            this.properties.value += "\n";
                            this._triggerEvent("oninput");
                        });

                        break;

                case "shift_right":
                    keyElement.classList.add("btn__wide");
                    keyElement.innerHTML = createIconHTML("shift");
                    keyElement.classList.remove(`Key${keyUp}`);
                    keyElement.classList.add(`ShiftRight`);

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "command":
                    keyElement.classList.add("btn__wide");
                    keyElement.innerHTML = createIconHTML("command");
                    keyElement.classList.remove(`Key${keyUp}`);
                    keyElement.classList.add(`MetaLeft`);

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "command_right":
                    keyElement.classList.add("btn__wide");
                    keyElement.innerHTML = createIconHTML("command");
                    keyElement.classList.remove(`Key${keyUp}`);
                    keyElement.classList.add(`MetaRight`);

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("btn__extrawide");
                    keyElement.innerHTML = createIconHTML("space");
                    keyElement.classList.remove(`Key${keyUp}`);
                    keyElement.classList.add(`Space`);

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;


                default:
                    keyElement.textContent = key.toLowerCase();
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                        console.log(Keyboard.properties.value);
                    });

                    break;
                }


                document.onkeydown = function (event){
                    const arrayKey =["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP",
                     "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL",
                     "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM"];
                    const arrayDigit =["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0"];


                    let count = event.code;
                    // console.log(count);
                    if((arrayDigit.includes(count))||(arrayKey.includes(count))){
                        document.querySelector(`.${count}`).classList.add('active');
                        Keyboard.properties.value += event.key;

                        setTimeout(() => {
                            document.querySelector(`.${count}`).classList.remove('active');
                          }, "150");
                    }
                    else if(count == "Space"){
                        Keyboard.properties.value += " ";
                        // console.log(event.key);
                    }
                    else if(count == "Enter"){
                        Keyboard.properties.value += "\n";
                    }
                    console.log(Keyboard.properties.value);
                }

                //double press for changing language
                //  function runOnKeys(func, ...codes) {
                //     let pressed = new Set();
                //     document.addEventListener('keydown', function(event) {
                //       pressed.add(event.code);

                //       for (let code of codes) { // все ли клавиши из набора нажаты?
                //         if (!pressed.has(code)) {
                //           return;
                //         }
                //       }
                //       pressed.clear();

                //       func();
                //     });

                //     document.addEventListener('keyup', function(event) {
                //       pressed.delete(event.code);
                //     });
                //   }

                //   runOnKeys(
                //     () => this._toggleLanguage(),
                //     "KeyX",
                //     "KeyZ"
                //   );


            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });


        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        // console.log(this.properties.capsLock );
        // console.log(this.elements.keys);

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
                // console.log(key.textContent);
            }
        }
    },

    _toggleLanguage() {
        if(this.properties.lang == "eng"){
            this.properties.lang = "rus";
        }
        if(this.properties.lang == "rus"){
            this.properties.lang = "eng";
        }
        console.log(this.properties.lang);
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    },

};


window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});



