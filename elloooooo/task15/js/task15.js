var btnHandle, getData, init, render, sortAqiData;

getData = function() {
  var data, item;
  data = (function() {
    var i, len, ref, results;
    ref = document.getElementById("source").children;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      results.push([item.firstChild.nodeValue.substring(0, 2), item.firstElementChild.innerHTML]);
    }
    return results;
  })();
  return data;
};

sortAqiData = function(data) {
  return data.sort(function(x, y) {
    return y[1] - x[1];
  });
};

render = function(data) {
  var i, item, len, listBuilder;
  listBuilder = {
    index: 0,
    list: "",
    tryAddToList: function(elem) {
      this.index++;
      return this.list += "<li>第" + this.index + "名:" + elem[0] + "; 污染指数：" + elem[1] + "</li>";
    }
  };
  for (i = 0, len = data.length; i < len; i++) {
    item = data[i];
    listBuilder.tryAddToList(item);
  }
  return document.getElementById("resort").innerHTML = listBuilder.list;
};

btnHandle = function() {
  var data;
  data = getData();
  sortAqiData(data);
  return render(data);
};

init = function() {
  return document.getElementById("sort-btn").onclick = btnHandle;
};

init();

//# sourceMappingURL=.maps/task15.js.map
