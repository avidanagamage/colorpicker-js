export class colorPicker {
    inputElement: HTMLInputElement;
    selectedColor: any;
    colorPickerContainer: HTMLElement;
    option: any;
    defaultColor: any;

    constructor(options) {
        this.option = options;
        this.defaultColor = options.defaultColor;
        this.setInputElement();
        this.init();
    }
    private setInputElement() {
        this.inputElement = document.querySelector(`#${this.option.id}`) as HTMLInputElement;
        this.inputElement.style.visibility = 'hidden';
    }
    private init() {
        this.createContainer();
        this.bindEvents();
        if (this.defaultColor == null) {
            this.setSelecedColor(this.option.colors[0]);
        } else {
            this.setSelecedColor(this.defaultColor);
        }
    }

    private getSelecedColor() {
        return this.selectedColor;
    }

    private setSelecedColor(color) {
        this.selectedColor = color;
        this.inputElement.value = color;
        let span = this.colorPickerContainer.querySelector('button > span') as HTMLElement;
        span.style.backgroundColor = color;
    }
    private createContainer() {
        this.colorPickerContainer = document.createElement('div') as HTMLElement;
        let colorList = this.option.colors;
        let colorElements = '';
        colorList.forEach((color, index) => {
            let selectedClass = index === 0 ? 'selected' : '';
            let colorElement = `<div class='color-box ${selectedClass}' data-color="${color}" style="background-color: ${color}"></div>`;
            colorElements += colorElement;
        });
        this.colorPickerContainer.innerHTML =
            `
        <div class='color-picker'>
            <button type='button'><span></span><img src="dropdown.png"></img></button>
            <div class='color-pallet'>
                ${colorElements}
            </div>
        </div>
        `;
        let parent = this.inputElement.parentElement;
        parent.appendChild(this.colorPickerContainer);
    }

    private bindEvents() {
        let self = this;
        let button = this.colorPickerContainer.querySelector('button') as HTMLElement;
        let colorPicker = this.colorPickerContainer.querySelector('.color-picker') as HTMLElement;

        button.addEventListener('click', function () {
            self.toggleColorPicker();
        });

        let colorBoxes: any = colorPicker.querySelectorAll('.color-box');
        colorBoxes.forEach((colorBox) => {
            colorBox.addEventListener('click', function () {
                let color = colorBox.getAttribute('data-color');
                colorBoxes.forEach((colorBoxRef) => {
                    colorBoxRef.classList.remove('selected');
                });
                colorBox.classList.add('selected');
                self.setSelecedColor(color);
                self.toggleColorPicker();
            });
        });

    }

    private toggleColorPicker() {
        let colorPicker = this.colorPickerContainer.querySelector('.color-picker');
        colorPicker.classList.toggle('open');
    }
}