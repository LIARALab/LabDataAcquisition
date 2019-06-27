var exampleSocket ="";
var text1="";
var text2="";
var first = true;
var reception = false;
var index = 0;
var te=true;
var name="";
var array=[];
var ok = false;

onmessage = function(e) {
	console.log(" coucou");
	if (e.data==="stop"){
		console.log(text1+text2);
		postMessage([text1+"\r\n"+text2,name]);
		te=false
	}
	else {
		exampleSocket = new WebSocket("ws://172.24.24.3:6091");

			exampleSocket.onopen = function () {
				exampleSocket.send("GetAllSensor");
				console.log("send")
			};
		if(te==true) {
			exampleSocket.onmessage = function (event) {
				//console.log("sensors " + event)

				text1 = text1 + "TimeStamp;";
				text1 = text1 + "Activity;";
				text1 = text1 + "SubActivity;";


				let world = JSON.parse(event.data);
				let group = Object.keys(world);
				group.forEach(function (group) {

					if (group === "lst_Sensor") {

						let people = world[group];
						console.log("UUUUUUUUUUU");

						people.forEach(function (person) {
							let items = Object.keys(person);
							items.forEach(function (item) {
								if (item === "SensorName") {
									let value = person[item];
									text1 = text1 + value + ";";
									array.push(value);
								}
							})
						})
					}
				});

				name = e.data[0] + ".csv";
				console.log("nOOOOOOOOOOOOm" + e.data[0]);

				//var group = [{"ID":"ac81bc30-bc61-43b8-9235-fdb82d8e2cec","Name":"V L1-N","Value":127.466262817383,"Description":null,"ModbusAddress":81,"TimeStamp":"2019-05-08T18:33:36.656Z","EnergeticReaders_ID_FK":"b164daf2-422d-4f4c-ada4-c48c6dd4f31a","UnitsTypes_ID_FK":null,"EnergeticReader":null,"EnergeticRooms":[],"UnitsType":null,"FieldToBeUpdates":[]},{"ID":"a2b18aa5-9de7-44c7-8427-1ceb3ab0f039","Name":"V L2-N","Value":126.775741577148,"Description":null,"ModbusAddress":83,"TimeStamp":"2019-05-08T18:33:36.656Z","EnergeticReaders_ID_FK":"b164daf2-422d-4f4c-ada4-c48c6dd4f31a","UnitsTypes_ID_FK":null,"EnergeticReader":null,"EnergeticRooms":[],"UnitsType":null,"FieldToBeUpdates":[]},{"ID":"ad315d85-722f-4104-abe2-789bb2bdbab9","Name":"V L3-N","Value":129.443298339844,"Description":null,"ModbusAddress":85,"TimeStamp":"2019-05-08T18:33:36.656Z","EnergeticReaders_ID_FK":"b164daf2-422d-4f4c-ada4-c48c6dd4f31a","UnitsTypes_ID_FK":null,"EnergeticReader":null,"EnergeticRooms":[],"UnitsType":null,"FieldToBeUpdates":[]},{"ID":"4b6f7358-6832-4691-8c14-56e76383443d","Name":"V L-N","Value":127.89510345459,"Description":null,"ModbusAddress":87,"TimeStamp":"2019-05-08T18:33:36.656Z","EnergeticReaders_ID_FK":"b164daf2-422d-4f4c-ada4-c48c6dd4f31a","UnitsTypes_ID_FK":null,"EnergeticReader":null,"EnergeticRooms":[],"UnitsType":null,"FieldToBeUpdates":[]},{"ID":"4c07e360-2051-4bed-9c25-e74b38bdecc7","Name":"V L1-L2","Value":221.934982299805,"Description":null,"ModbusAddress":89,"TimeStamp":"2019-05-08T18:33:36.656Z","EnergeticReaders_ID_FK":"b164daf2-422d-4f4c-ada4-c48c6dd4f31a","UnitsTypes_ID_FK":null,"EnergeticReader":null,"EnergeticRooms":[],"UnitsType":null,"FieldToBeUpdates":[]},{"ID":"0134068f-1b77-4c72-8b95-6a50bf69b130","Name":"V L2-L3","Value":221.296173095703,"Description":null,"ModbusAddress":91,"TimeStamp":"2019-05-08T18:33:36.656Z","EnergeticReaders_ID_FK":"b164daf2-422d-4f4c-ada4-c48c6dd4f31a","UnitsTypes_ID_FK":null,"EnergeticReader":null,"EnergeticRooms":[],"UnitsType":null,"FieldToBeUpdates":[]},{"ID":"4f5cc151-ecd0-4a40-930f-19e95ecf24c1","Name":"V L3-L1","Value":224.490097045898,"Description":null,"ModbusAddress":93,"TimeStamp":"2019-05-08T18:33:36.656Z","EnergeticReaders_ID_FK":"b164daf2-422d-4f4c-ada4-c48c6dd4f31a","UnitsTypes_ID_FK":null,"EnergeticReader":null,"EnergeticRooms":[],"UnitsType":null,"FieldToBeUpdates":[]},{"ID":"4cd4572c-d786-4866-8831-62d61083f265","Name":"V L-L","Value":222.573745727539,"Description":null,"ModbusAddress":95,"TimeStamp":"2019-05-08T18:33:36.656Z","EnergeticReaders_ID_FK":"b164daf2-422d-4f4c-ada4-c48c6dd4f31a","UnitsTypes_ID_FK":null,"EnergeticReader":null,"EnergeticRooms":[],"UnitsType":null,"FieldToBeUpdates":[]},{"ID":"51b6e621-11f7-46a9-8d8c-386321d3ed09","Name":"A L1","Value":2.29530811309814,"Description":null,"ModbusAddress":97,"TimeStamp":"2019-05-08T18:33:36.656Z","EnergeticReaders_ID_FK":"b164daf2-422d-4f4c-ada4-c48c6dd4f31a","UnitsTypes_ID_FK":null,"EnergeticReader":null,"EnergeticRooms":[],"UnitsType":null,"FieldToBeUpdates":[]}]

				let world1 = JSON.parse(e.data[1]);
				let group1 = Object.keys(world1);


				group1.forEach(function (group) {
					let people = Object.keys(world1[group]);
					//console.log(people)

					people.forEach(function (person, i) {
						if (Object.keys(world1[group][person][0] === "ID")) {
							let items = Object.keys(world1[group][person]);
							items.forEach(function (item) { //ecriture des Names
								if (item === "TimeStamp" && i === 0) {
									console.log("item" + item);
									let value = world1[group][person][item];
									text2 = text2 + value + ";";
								}
							});
						}
					});
					people.forEach(function (person) {
						let items = Object.keys(world1[group][person]);
						items.forEach(function (item) {
							if (item === "activite") {
								let value = world1[group][person][item];
								console.log("activité =========" + value);
								text2 = text2 + value + ";"
							}
							if (item === "sous-activite") {
								let value = world1[group][person][item];
								console.log("sous-activité =========" + value);
								text2 = text2 + value + ";"
							}
						});
					});

					let capteurs = [];
					people.forEach(function (person) {
						let items = Object.keys(world1[group][person]);


						items.forEach(function (item) { //ecriture des Names

							if (item === "SensorName") {

								for (let i = 0; i < array.length; i++) {

									if (world1[group][person][item] === array[i]) {
										capteurs[i] = "ON;";
									} else {
										if (capteurs[i] !== "ON;") {
											capteurs[i] = "null;";
										}
									}
								}
							}
						});
					});
					console.log(capteurs);
					for (let i = 0; i < capteurs.length; i++) {
						text2 = text2 + capteurs[i];
					}
					text2 = text2 + "\r\n";
				});
				postMessage([text1 + "\r\n" + text2, name]);
			}
		}
		te=false;
	}
};


