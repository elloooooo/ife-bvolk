
/* 数据格式演示
aqiSourceData =
  '北京':
    "2016-01-01": 10
    "2016-01-02": 10
    "2016-01-03": 10
    "2016-01-04": 10
 */
var aqiSourceData, chartData, citySelectChange, getDateStr, getRandomColor, graTimeChange, init, initAqiChartData, initCitySelector, initGraTimeForm, pageState, randomBuildData, renderChart;

getDateStr = function(dat) {
  var d, m, y;
  y = dat.getFullYear();
  m = dat.getMonth() + 1;
  if (m < 10) {
    m = '0' + m;
  }
  d = dat.getDate();
  if (d < 10) {
    d = '0' + d;
  }
  return y + '-' + m + '-' + d;
};

randomBuildData = function(seed) {
  var dat, datStr, i, j, returnData;
  returnData = {};
  dat = new Date("2016-01-01");
  datStr = '';
  for (i = j = 1; j <= 92; i = ++j) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
};

aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

chartData = {};

pageState = {
  nowSelectCity: -1,
  nowGraTime: 'day'
};

renderChart = function() {
  var bars, chart, elem, j, key, len, ref, results, val;
  chart = document.getElementById('aqi-chart-wrap');
  bars = [];
  for (key in chartData) {
    val = chartData[key];
    bars.push("<div class='bar'><div style='height:" + val + "px;background-color:" + (getRandomColor()) + "'></div></div>");
  }
  chart.innerHTML = bars.join('');
  ref = chart.children;
  results = [];
  for (j = 0, len = ref.length; j < len; j++) {
    elem = ref[j];
    results.push(elem.style.width = (Math.round(chart.clientWidth * .95 / bars.length)) + "px");
  }
  return results;
};

getRandomColor = function() {
  var base;
  base = (Math.random() * 0x1000000 << 0).toString(16);
  return "#" + (new Array(7 - base.length).join("0") + base);
};

graTimeChange = function() {
  var timeType, types;
  timeType = '';
  types = document.getElementsByName('gra-time');
  [].forEach.call(types, function(value) {
    if (value.checked) {
      return timeType = value.value;
    }
  });
  if (timeType !== pageState.nowGraTime) {
    pageState.nowGraTime = timeType;
    initAqiChartData();
    return renderChart();
  }
};

citySelectChange = function() {
  if (pageState.nowSelectCity !== document.getElementById('city-select').value) {
    pageState.nowSelectCity = document.getElementById('city-select').value;
    initAqiChartData();
    return renderChart();
  }
};

initGraTimeForm = function() {
  var types;
  types = document.getElementsByName("gra-time");
  return [].forEach.call(types, function(value) {
    return value.addEventListener("click", graTimeChange);
  });
};

initCitySelector = function() {
  var city_name, option, selector;
  selector = document.getElementById('city-select');
  option = [];
  option.push("<option value='-1'>-</option>");
  for (city_name in aqiSourceData) {
    option.push("<option value='" + city_name + "'>" + city_name + "</option>");
  }
  selector.innerHTML = option.join('');
  return selector.addEventListener("click", citySelectChange);
};

initAqiChartData = function() {
  var dateStr, key, rawData, resCount, resData, val, weekDay;
  if (pageState.nowSelectCity === -1) {
    return;
  }
  rawData = aqiSourceData[pageState.nowSelectCity];
  resData = {};
  resCount = {};
  if (pageState.nowGraTime === 'day') {
    resData = rawData;
  } else if (pageState.nowGraTime === 'week') {
    key = 0;
    for (dateStr in rawData) {
      val = rawData[dateStr];
      weekDay = new Date(dateStr).getDay();
      if ((resData[key] != null) && weekDay === 6) {
        resData[key] = resData[key] + val;
        resCount[key] = resCount[key] + 1;
        key = key + 1;
      } else if (resData[key] != null) {
        resData[key] = resData[key] + val;
        resCount[key] = resCount[key] + 1;
      } else if (weekDay === 6) {
        resData[key] = val;
        resCount[key] = 1;
        key += 1;
      } else {
        resData[key] = val;
        resCount[key] = 1;
      }
    }
    for (key in resData) {
      val = resData[key];
      resData[key] = Math.round(resData[key] / resCount[key]);
    }
  } else if (pageState.nowGraTime === 'month') {
    for (dateStr in rawData) {
      val = rawData[dateStr];
      key = (new Date(dateStr).getFullYear()) + "-" + (new Date(dateStr).getMonth() + 1);
      if (resData[key] != null) {
        resData[key] = resData[key] + val;
        resCount[key] = resCount[key] + 1;
      } else {
        resData[key] = val;
        resCount[key] = 1;
      }
    }
    for (key in resData) {
      val = resData[key];
      resData[key] = Math.round(resData[key] / resCount[key]);
    }
  } else {
    console.warn("invalid graTime");
  }
  return chartData = resData;
};

init = function() {
  initGraTimeForm();
  initCitySelector();
  return initAqiChartData();
};

init();

//# sourceMappingURL=.maps/task17.js.map
