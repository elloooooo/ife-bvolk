
/* aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var addAqiData, addBtnHandle, aqiData, delBtnHandle, init, renderAqiList;

aqiData = {};


/*
 * 从用户输入中获取数据，向aqiData中增加一条数据
 */

addAqiData = function() {
  var city_name, city_value;
  city_name = document.getElementById('aqi-city-input').value.trim();
  city_value = document.getElementById('aqi-value-input').value.trim();
  if (!/^[\u4e00-\u9fa5a-zA-Z]+$/.test(city_name)) {
    alert('请输入正确的城市名称!');
    document.getElementById('aqi-city-input').focus();
    return;
  }
  if (!/^\d+$/.test(city_value)) {
    alert('请输入正整数!');
    document.getElementById('aqi-value-input').focus();
    return;
  }
  return aqiData[city_name] = city_value;
};

renderAqiList = function() {
  var city_name, city_value, tab, tabContent;
  tab = document.getElementById('aqi-table');
  tabContent = [];
  tabContent.push('<thead><td>城市</td><td>空气质量</td><td>操作</td></thead>');
  for (city_name in aqiData) {
    city_value = aqiData[city_name];
    tabContent.push("<tr>");
    tabContent.push("<td>" + city_name + "</td><td>" + city_value + "</td>");
    tabContent.push("<td><button data-city=" + city_name + ">删除</button></td>");
    tabContent.push("</tr>");
  }
  return tab.innerHTML = tabContent.join('');
};

addBtnHandle = function() {
  addAqiData();
  return renderAqiList();
};

delBtnHandle = function(city_name) {
  delete aqiData[city_name];
  return renderAqiList();
};

init = function() {
  var tab;
  document.getElementById('aqi-btn').onclick = addBtnHandle;
  tab = document.getElementById('aqi-table');
  return tab.addEventListener('click', function(event) {
    if (event.target.nodeName === 'BUTTON' && event.target.innerHTML === '删除') {
      return delBtnHandle(event.target.dataset.city);
    }
  }, false);
};


/*
 * 原形扩展的方式去除字符串两头空格及中间空白
 */

String.prototype.trim = function() {
  return this.replace(/[(^\s+)(\s+$)]/g, "");
};

init();

//# sourceMappingURL=.maps/task16.js.map
