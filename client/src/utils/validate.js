export function validateInputRequire(_input, _minLength, _maxLength) {
    _input = _input.trim();
    if (!_input) {
        return 'This field is required!!!';
    }
    if (_minLength && _maxLength && (_input.length < _minLength || _input.length > _maxLength)) {
        return `Number of characters in the range ${_minLength} - ${_maxLength}`;
    }
    return '';
}
const validation = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};
export function validateEmail(_input) {
    _input = _input.trim();
    if (!_input) {
        return 'This field is required!!!';
    }
    if (!validation(_input)) {
        return `Invalid email!`;
    }
    return '';
}
export function validateRange(_input, _min, _max) {
    _input = _input.trim();
    if (!_input) {
        return 'This field is required!!!';
    }
    if (_min && _input < _min) {
        return `Number must be greater than ${_min}`;
    }
    if (_max && _input > _max) {
        return `Number must be less than ${_max}`;
    }
    return '';
}
export function validateBirthYear(_input) {
    _input = _input.trim();
    const _max = new Date().getFullYear();
    if (!_input) {
        return 'This field is required!!!';
    }
    const birthYear = parseInt(_input, 10);
    if (isNaN(birthYear)) {
        return 'Please enter a valid number!';
    }
    if (birthYear > _max) {
        return `Year must be less than or equal to ${_max}`;
    }
    return '';
}
export function reget(_value) {
    console.log('Nhan vao chu: ', _value);
    let valueArray = _value.split(' ');
    console.log('Bien thanh array: ', valueArray);
    if (
        valueArray.length >= 2 &&
        valueArray[valueArray.length - 1] === valueArray[valueArray.length - 2] &&
        valueArray[valueArray.length - 2] === ''
    ) {
        console.log('Bi trung dau cach');
        valueArray.pop();
    }

    let valueArrayUpperCase = valueArray.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    console.log('Sau khi in hoa: ', valueArrayUpperCase);
    let format = valueArrayUpperCase.join(' ');
    console.log('final:,', format);
    return format;
}
