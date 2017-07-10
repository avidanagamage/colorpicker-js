var colorPicker = function (options) {
    this.options = options;
    this.inputElement;
    this.colorPickerContainer;
    this.selectedColor;
    this.defaultColor =  options.defaultColor;
    this.setInputElement();
    this.init();
};

colorPicker.prototype.setInputElement = function () {
    this.inputElement = document.querySelector(`#${this.options.id}`);
    this.inputElement.style.visibility = 'hidden';
};

colorPicker.prototype.init = function () {
    this.createContainer();
    this.bindEvents();
    if(this.defaultColor == null){
        this.setSelecedColor(this.options.colors[0]);
    } else {
        this.setSelecedColor(this.defaultColor);
    }
};

colorPicker.prototype.getSelecedColor = function () {
    return this.selectedColor;
};

colorPicker.prototype.setSelecedColor = function (color) {
     this.selectedColor = color;
     this.inputElement.value = color;

     var span = this.colorPickerContainer.querySelector('button > span');
     span.style.backgroundColor = color;
};

colorPicker.prototype.createContainer = function () {
    this.colorPickerContainer = document.createElement('div');

    var colorList = this.options.colors;
    var colorElements = '';

    colorList.forEach(function (color, index) {
        var selectedClass = index === 0 ? 'selected' : '';
        var colorElement = `<div class='color-box ${selectedClass}' data-color="${color}" style="background-color: ${color}"></div>`;
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
    var parent = this.inputElement.offsetParent;
    parent.appendChild(this.colorPickerContainer);
};

colorPicker.prototype.bindEvents = function () {
    var self = this;
    var button = this.colorPickerContainer.querySelector('button');
    var colorPicker = this.colorPickerContainer.querySelector('.color-picker');

    button.addEventListener('click', function(){
        self.toggleColorPicker();
    });

    var colorBoxes = colorPicker.querySelectorAll('.color-box');
    colorBoxes.forEach(function(colorBox){
        colorBox.addEventListener('click', function(){
            var color = colorBox.getAttribute('data-color');
            colorBoxes.forEach(function(colorBoxRef){ colorBoxRef.classList.remove('selected'); })
            colorBox.classList.add('selected');
            self.setSelecedColor(color);
            self.toggleColorPicker();
        });
    });
};

colorPicker.prototype.toggleColorPicker = function () {
    var colorPicker = this.colorPickerContainer.querySelector('.color-picker');
    colorPicker.classList.toggle('open');
}