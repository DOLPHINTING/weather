var city =[ "基隆" , "台北", "新北市", "桃園", "新竹", "苗栗", "台中", "雲林", "嘉義","台南", "高雄", "屏東",  "宜蘭", "花蓮", "台東","南投"];

var scityT={};
scityT["基隆"]=["七堵 2306188"];
scityT["台北"]=["內湖 2306179", "新店 2306186"];
scityT["新北市"]=["淡水 2306211", "鶯歌 2306214", "金山 2306223", "三芝 2306228", "萬里 2306231", "雙溪 2306251"];
scityT["桃園"]=["大園 2306209","中壢 2306184","觀音 2306200","龍潭 2306202", "桃園國際機場 2306254"];
scityT["新竹"]=["東區 2306185"];
scityT["苗栗"]=["三灣 2306229"];
scityT["台中"]=["西屯 2306181", "石岡 2306207", "清水 2306194","新社 2306218","大甲 2306210"];
scityT["雲林"]=["斗南 2306212","虎尾 2306250"];
scityT["嘉義"]=["布袋 2306206"];
scityT["台南"]=["安平 2306182","佳里 2306193","麻豆 2306203","新化 2306217","玉井 2306232"];
scityT["高雄"]=["左營 2306180","岡山 2306199","高雄國際機場 2306255"];
scityT["屏東"]=["屏東市 2306189","東港 2306213","枋山 2306224"];
scityT["宜蘭"]=["宜蘭市 2306198","蘇澳 2306208","南澳 2306243"];
scityT["花蓮"]=["花蓮市 2306187"];
scityT["台東"]=["台東市 2306190","關山 2306227"];
scityT["南投"]=["南投市 2306204"];


menuInit=function(){
	var clickName=[],count1,count2;
	for(count1 in scityT)
		for(count2 in scityT[count1])
			clickName.push('<div class="btn btn-link" id="'+scityT[count1][count2].split(" ")[1]+'">'+scityT[count1][count2].split(" ")[0]+"</div>");
	$("#method1").append(clickName);
	var optionName=[],optionName2=[];
	for(var count in city)
		optionName.push("<option>"+city[count]+"</option>");
	$("#box1").append(optionName);
	$("#box2").append("<option>七堵</option>");
	showData(scityT["基隆"][0].split(" ")[1]);
	
};

$("#box1").change(
	function(){
		var cityName=$(this).find(":selected").text();
		var cityName2=[];
		var cityNumber=scityT[cityName][0].split(" ")[1];
		var count;
		for(count in scityT[cityName])
			cityName2.push("<option>"+scityT[cityName][count].split(" ")[0]+"</option>");
		$("#box2").empty();
		$("#box2").append(cityName2);
		showData(cityNumber);
		
	}
);

showData=function(cityNumber)
{
	$.getJSON
	(
		"http://query.yahooapis.com/v1/public/yql?format=json&q=select * from weather.forecast where woeid="+cityNumber,
		{},
		function(getData,stu)
		{			
			var shortName=getData.query.results.channel.item;
			var title=shortName.title
			var location=shortName.lat+","+shortName["long"];
			var date=shortName.pubDate;
			var temp=shortName.condition.temp;
			var text=shortName.condition.text;
			$("#weather #title").text(title);
			$("#weather #location").text(location);
			$("#weather #temp").text(temp+"\u2109");
			$("#weather #text").text(text);
			$("#weather #date").text(date);
			console.log(title,location,temp,text,date)
		}
	)
};

$("#method1").on("click","div.btn.btn-link",function(a){console.log(a.target.id);showData(a.target.id)});

$("#box2").change(function(){
	var cityName=$("#box1").find(":selected").text();
	var cityName2=$(this).find(":selected").text();
	var cityNumber;
	for(var count in scityT[cityName])
	{		
		if(scityT[cityName][count].split(" ")[0]==cityName2)
		{
			cityNumber=scityT[cityName][count].split(" ")[1];
		}
	}
	//console.log(cityNumber);
	showData(cityNumber);	
});
