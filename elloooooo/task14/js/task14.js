var apiData, city, i, len, listBuilder;

apiData = [['北京', 90], ['上海', 50], ['福州', 10], ['广州', 50], ['成都', 90], ['西安', 100]];

apiData.sort(function(x, y) {
  return y[1] - x[1];
});

listBuilder = {
  index: 0,
  list: "",
  tryAddToList: function(elem) {
    this.index++;
    return this.list += "<li>第" + this.index + "名:" + elem[0] + "; 污染指数：" + elem[1] + "</li>";
  }
};

for (i = 0, len = apiData.length; i < len; i++) {
  city = apiData[i];
  if (city[1] > 60) {
    listBuilder.tryAddToList(city);
  }
}

document.getElementById("aqi-list").innerHTML = listBuilder.list;

//# sourceMappingURL=.maps/task14.js.map
