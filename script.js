
let BODY = document.getElementsByTagName("body");

let WRAPPER = document.createElement("div");
WRAPPER.className = "wrapper";

document.body.prepend(WRAPPER);

let TEXTFIELD = document.createElement("textarea");
TEXTFIELD.className = "text-field";

WRAPPER.appendChild(TEXTFIELD);

// let KEYBOARD = document.createElement("div");
// KEYBOARD.className = "keyboard";

// WRAPPER.appendChild(KEYBOARD);

// let BUT = document.createElement("div");

// class Button {

//     constructor(name) {
//       this.name = name;
//       this.className = "btn";
//     }

//   }

// let A = new Button("A");
// let B = new Button("B");

// KEYBOARD.appendChild(BUT);


const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {

        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");

        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll("btn");

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

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
        const keyLayout = [
            "§", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0","-","+", "backspace",
            "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p","[", "]","enter",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l",";" ,"'","|", "shift_right",
            "shift", "`", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "command" ,"space", "command", "option"
        ];
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "enter",, "shift_right", "?"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("btn");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("btn__wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("btn__wide", "btn--activatable");
                    keyElement.innerHTML = createIconHTML("capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("btn--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("btn__wide");
                    keyElement.innerHTML = createIconHTML("enter");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "tab":
                    keyElement.classList.add("btn__wide");
                    keyElement.innerHTML = createIconHTML("tab");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "shift":
                    keyElement.classList.add("btn__wide");
                    keyElement.innerHTML = createIconHTML("shift");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "shift_right":
                    keyElement.classList.add("btn__wide");
                    keyElement.innerHTML = createIconHTML("shift");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "command":
                    keyElement.classList.add("btn__wide");
                    keyElement.innerHTML = createIconHTML("command");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "option":
                    keyElement.classList.add("btn__wide");
                    keyElement.innerHTML = createIconHTML("option");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("btn__extrawide");
                    keyElement.innerHTML = createIconHTML("space");

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
                    });

                    break;
            }

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

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },



};


window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});

