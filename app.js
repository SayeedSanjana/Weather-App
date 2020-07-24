window.addEventListener('load',()=>{
	let long;
	let lat;
	let temperatureDescription=document.querySelector('.temperature-description');
	let temperatureDegree=document.querySelector('.temperature-degree');
	let locationtimezone=document.querySelector('.location-timezone');
	let locationIcon = document.querySelector('.weather-icon');
	let temperatureSection=document.querySelector('.temperature');
	const temperatureSpan=document.querySelector('.temperature span');
	let Info1=document.querySelector('.info1');
	let Info2=document.querySelector('.info2');
	let Info3=document.querySelector('.info3');
	let Info4=document.querySelector('.info4');
	let Info5=document.querySelector('.info5');
	let Info6=document.querySelector('.info6');
	

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			long=position.coords.longitude;
			lat=position.coords.latitude;
			console.log(position);
			//const proxy=`https://developers.arcgis.com/javascript/jshelp/ags_proxy.html`;
			const proxy="https://cors-anywhere.herokuapp.com/";
			//const api=`${proxy} https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
			const api=`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a694ae2d380b1f498fe42432be6f3813`;
			//const api=`${proxy}
			//https://samples.openweathermap.org/data/2.5/weather?lat=$(lat)&lon=$(long)&appid=a694ae2d380b1f498fe42432be6f3813`;
		   fetch(api)
		   .then(response =>{
		   	return response.json();
		   }).then(data =>{
		   	console.log(data);
		   	const{temp,temp_min,temp_max,humidity,pressure}=data.main;
		   	const{description,icon}=data.weather[0];
		   	console.log(locationIcon.innerHTML);
		   	locationIcon.innerHTML=`<img src="icons/${icon}.png">`;
		   	console.log(locationIcon.innerHTML);
		   	const{country}=data.sys;
		   	const{speed,deg}=data.wind;

		   	//fORMULA for celcius
		   	//let celcius=(temp-32)*(5/9);
		   	let celcius=(temp-273.15);
		  
		   	//Set DOM Elements From the API
		   	temperatureDegree.textContent=temp;
		   	temperatureDescription.textContent=description;
		   	locationtimezone.textContent=country;


		   	//change temperature to celcius

		   	temperatureSection.addEventListener('click',()=>{

		   		if(temperatureSpan.textContent==="K"){
		   			temperatureSpan.textContent="C";
		   			temperatureDegree.textContent=Math.floor(celcius);

		   		}else{
		   			temperatureSpan.textContent="K";
		   			temperatureDegree.textContent=temp;

		   		}

		   	});

		   Info1.innerHTML=`<p>Pressure: ${pressure}</p>`;
		   Info2.innerHTML=`<p>Humidity: ${humidity}</p>`;
		   Info3.innerHTML=`<p>Minimum Temperature:${temp_min}K</p>`;
		   Info4.innerHTML=`<p>Maximum Temperature:${temp_max}K</p>`;
		   Info5.innerHTML=`<p>Wind Speed:${speed}</p>`;
		   Info6.innerHTML=`<p>Wind Degree:${deg}degree</p>`;

		   	
		   });
		});
		
	}
	function setIcons(main,iconId){
      	const skycons = new Skycons({color:"white"});
      	const currentIcon=main.toUpperCase();
      	skycons.play();
      	return skycons.set(iconId,Skycons[currentIcon]);
      }

});