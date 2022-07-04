var getValue = document.getElementById("getValue");

function add(v) {
    getValue.value += v;
}

function clear() {
    getValue.value = "";
}
function equal() {
    getValue.value = eval(getValue.value);
}
function cancel() {
    getValue.value = getValue.value.substr(0, getValue.value.length - 1);
}
