

var city =[ "基隆" , "台北", "新北市", "桃園", "新竹", "苗栗", "台中", "雲林", "嘉義","台南", "高雄", "屏東",  "宜蘭", "花蓮", "台東","南投"];

var city2 = {};
city2["基隆"]=["七堵"];
city2["台北"]=["內湖", "新店"];
city2["新北市"]=["淡水", "鶯歌", "金山", "三芝", "萬里", "雙溪"];
city2["桃園"]=["大園","中壢","觀音","龍潭", "桃園國際機場"];
city2["新竹"]=["東區"];
city2["苗栗"]=["三灣"];
city2["台中"]=["西屯", "石岡", "清水","新社","大甲"];
city2["雲林"]=["斗南","虎尾"];
city2["嘉義"]=["布袋"];
city2["台南"]=["安平","佳里","麻豆","新化","玉井"];
city2["高雄"]=["左營","岡山","高雄國際機場"];
city2["屏東"]=["屏東市","東港","枋山"];
city2["宜蘭"]=["宜蘭市","蘇澳","南澳"];
city2["花蓮"]=["花蓮市"];
city2["台東"]=["台東市","關山"];
city2["南投"]=["南投市"];

var cityID ={};
cityID["七堵"] = 2306188;
cityID["內湖"] = 2306179;
cityID["新店"] = 2306186;
cityID["淡水"] = 2306211;
cityID["鶯歌"] = 2306214;
cityID["金山"] = 2306223;
cityID["三芝"] = 2306228;
cityID["萬里"] = 2306231;
cityID["雙溪"] = 2306251;
cityID["大園"] = 2306209;
cityID["中壢"] = 2306184;
cityID["觀音"] = 2306200;
cityID["龍潭"] = 2306202;
cityID["桃園國際機場"] = 2306254;
cityID["鶯歌"] = 2306214;
cityID["金山"] = 2306223;
cityID["三芝"] = 2306228;
cityID["萬里"] = 2306231;
cityID["雙溪"] = 2306251;
cityID["大園"] = 2306209;
cityID["東區"] = 2306185;
cityID["三灣"] = 2306229;
cityID["西屯"] = 2306181;
cityID["石岡"] = 2306207;
cityID["清水"] = 2306194;
cityID["新社"] = 2306218;
cityID["大甲"] = 2306210;
cityID["斗南"] = 2306212;
cityID["虎尾"] = 2306250;
cityID["布袋"] = 2306206;
cityID["安平"] = 2306182;
cityID["佳里"] = 2306193;
cityID["麻豆"] = 2306203;
cityID["新化"] = 2306217;
cityID["玉井"] = 2306232;
cityID["左營"] = 2306180;
cityID["岡山"] = 2306199;
cityID["高雄國際機場"] = 2306255;
cityID["屏東市"] = 2306189;
cityID["東港"] = 2306213;
cityID["枋山"] = 2306224;
cityID["宜蘭市"] = 2306198;
cityID["蘇澳"] = 2306208;
cityID["南澳"] = 2306243;
cityID["花蓮市"] = 2306187;
cityID["台東市"] = 2306190;
cityID["關山"] = 2306227;
cityID["南投市"] = 2306204;
            


$("#selectorbox1").change( function() {

  var selection = $("#selectorbox1").find(":selected").text();
  var newCity = [];

  for(var i in city2[selection]) {
    newCity.push("<option>"+city2[selection][i]+"</option>");
  }

  $("#selectorbox2").children().remove();
  $("#selectorbox2").append(newCity);
  
  });

$("#selectorbox2").change( function() {

  var selection = $("#selectorbox2").find(":selected").text();
  var woeid = cityID[selection];
  var query = "select * from weather.forecast where woeid=" + woeid;
  var url = "http://query.yahooapis.com/v1/public/yql?format=json&q=" + query;
  
  $.getJSON(
    url,
    {},
    function(data, status){ 
      console.log("data", data);
      console.log("status", status);

      var title = data.query.results.channel.item.title;
      var date = data.query.results.channel.item.pubDate;
      var latitude = data.query.results.channel.item.lat;
      var longtitude = data.query.results.channel.item.long;
      var temp = data.query.results.channel.item.condition.temp;
      var phen = data.query.results.channel.item.condition.text;
      var cdegree = (temp -32) *5 / 9; 

      $("#weather_data #place").text(title);
      $("#weather_data #date").text(date);
      $("#weather_data #temp").text(cdegree.toFixed()+"℃");
      $("#weather_data #phen").text(phen);
      $("#weather_data #corod").text(latitude + longtitude);

      });
     
    });


$("div.btn.btLink").click( function(e) {

  var woeid = e.target.id;
  var query = "select * from weather.forecast where woeid=" + woeid;
  var url = "http://query.yahooapis.com/v1/public/yql?format=json&q=" + query;
  
  $.getJSON(
    url,
    {},
    function(data, status){ 
      console.log("data", data);
      console.log("status", status);

      var title = data.query.results.channel.item.title;
      var date = data.query.results.channel.item.pubDate;
      var latitude = data.query.results.channel.item.lat;
      var longtitude = data.query.results.channel.item.long;
      var temp = data.query.results.channel.item.condition.temp;
      var phen = data.query.results.channel.item.condition.text;
      var cdegree = (temp -32) *5 / 9; 

      $("#weather_data #place").text(title);
      $("#weather_data #date").text(date);
      $("#weather_data #temp").text(cdegree.toFixed()+"℃");
      $("#weather_data #phen").text(phen);
      $("#weather_data #corod").text(latitude + longtitude);

      }
  );

});