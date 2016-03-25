var btn, display, input;

input = document.getElementById("aqi-input");

display = document.getElementById("aqi-display");

btn = document.getElementById("button");

btn.onclick = function () {
    if (input.value.length > 0) {
        display.innerHTML = input.value;
    } else {
        display.innerHTML = "请输入";
    }
};


//# sourceMappingURL=.maps/task13.js.map
