var exampleSocket ="";
var text1="";
var text2="";
var first = true;
var reception = false;
var index = 0;
var act="transition";
var ssAct="transition";
var te=true;
var name="";
var json = "";
var a = "";
var j = 0;
var type;



onmessage = function(e) {
	if (e.data === "stop"){
		console.log(name +"on est dans "+name+"le stop json");
		postMessage([json,name,type]);

		te=false
	}
	else {
		if(e.data[0] === 0&&te){


			exampleSocket = new WebSocket(e.data[1]);
			exampleSocket.onerror = function(err){
				postMessage(['error',"La connexion au serveur "+e.data[2]+" "+e.data[1]+" n'a pas pu être établie"]);
			}
			exampleSocket.onclose = function(err){
				postMessage(['error',"La connexion au serveur "+e.data[2]+" "+e.data[1]+" a été fermée"]);
			}


		console.log(this);

			console.log("exampleSocket"+e.data[1]+"r");
			name = e.data[2]+".json";
			type = e.data[3];


			//var group = [{"ID":"ac81bc30-bc61-43b8-9235-fdb82d8e2cec","Name":"V L1-N","Value":127.466262817383,"Description":null,"ModbusAddress":81,"TimeStamp":"2019-05-08T18:33:36.656Z","EnergeticReaders_ID_FK":"b164daf2-422d-4f4c-ada4-c48c6dd4f31a","UnitsTypes_ID_FK":null,"EnergeticReader":null,"EnergeticRooms":[],"UnitsType":null,"FieldToBeUpdates":[]},{"ID":"a2b18aa5-9de7-44c7-8427-1ceb3ab0f039","Name":"V L2-N","Value":126.775741577148,"Description":null,"ModbusAddress":83,"TimeStamp":"2019-05-08T18:33:36.656Z","EnergeticReaders_ID_FK":"b164daf2-422d-4f4c-ada4-c48c6dd4f31a","UnitsTypes_ID_FK":null,"EnergeticReader":null,"EnergeticRooms":[],"UnitsType":null,"FieldToBeUpdates":[]},{"ID":"ad315d85-722f-4104-abe2-789bb2bdbab9","Name":"V L3-N","Value":129.443298339844,"Description":null,"ModbusAddress":85,"TimeStamp":"2019-05-08T18:33:36.656Z","EnergeticReaders_ID_FK":"b164daf2-422d-4f4c-ada4-c48c6dd4f31a","UnitsTypes_ID_FK":null,"EnergeticReader":null,"EnergeticRooms":[],"UnitsType":null,"FieldToBeUpdates":[]},{"ID":"4b6f7358-6832-4691-8c14-56e76383443d","Name":"V L-N","Value":127.89510345459,"Description":null,"ModbusAddress":87,"TimeStamp":"2019-05-08T18:33:36.656Z","EnergeticReaders_ID_FK":"b164daf2-422d-4f4c-ada4-c48c6dd4f31a","UnitsTypes_ID_FK":null,"EnergeticReader":null,"EnergeticRooms":[],"UnitsType":null,"FieldToBeUpdates":[]},{"ID":"4c07e360-2051-4bed-9c25-e74b38bdecc7","Name":"V L1-L2","Value":221.934982299805,"Description":null,"ModbusAddress":89,"TimeStamp":"2019-05-08T18:33:36.656Z","EnergeticReaders_ID_FK":"b164daf2-422d-4f4c-ada4-c48c6dd4f31a","UnitsTypes_ID_FK":null,"EnergeticReader":null,"EnergeticRooms":[],"UnitsType":null,"FieldToBeUpdates":[]},{"ID":"0134068f-1b77-4c72-8b95-6a50bf69b130","Name":"V L2-L3","Value":221.296173095703,"Description":null,"ModbusAddress":91,"TimeStamp":"2019-05-08T18:33:36.656Z","EnergeticReaders_ID_FK":"b164daf2-422d-4f4c-ada4-c48c6dd4f31a","UnitsTypes_ID_FK":null,"EnergeticReader":null,"EnergeticRooms":[],"UnitsType":null,"FieldToBeUpdates":[]},{"ID":"4f5cc151-ecd0-4a40-930f-19e95ecf24c1","Name":"V L3-L1","Value":224.490097045898,"Description":null,"ModbusAddress":93,"TimeStamp":"2019-05-08T18:33:36.656Z","EnergeticReaders_ID_FK":"b164daf2-422d-4f4c-ada4-c48c6dd4f31a","UnitsTypes_ID_FK":null,"EnergeticReader":null,"EnergeticRooms":[],"UnitsType":null,"FieldToBeUpdates":[]},{"ID":"4cd4572c-d786-4866-8831-62d61083f265","Name":"V L-L","Value":222.573745727539,"Description":null,"ModbusAddress":95,"TimeStamp":"2019-05-08T18:33:36.656Z","EnergeticReaders_ID_FK":"b164daf2-422d-4f4c-ada4-c48c6dd4f31a","UnitsTypes_ID_FK":null,"EnergeticReader":null,"EnergeticRooms":[],"UnitsType":null,"FieldToBeUpdates":[]},{"ID":"51b6e621-11f7-46a9-8d8c-386321d3ed09","Name":"A L1","Value":2.29530811309814,"Description":null,"ModbusAddress":97,"TimeStamp":"2019-05-08T18:33:36.656Z","EnergeticReaders_ID_FK":"b164daf2-422d-4f4c-ada4-c48c6dd4f31a","UnitsTypes_ID_FK":null,"EnergeticReader":null,"EnergeticRooms":[],"UnitsType":null,"FieldToBeUpdates":[]}]

			exampleSocket.onmessage = function (event) {
				if(reception === false){

					postMessage("reception...");
					reception=true;
				}
				let data = JSON.parse(event.data);

				//data.assign("activity",act);
				//data.assign("subactivity",ssAct);

				let fin;
				let debut="";

				let jso = JSON.stringify(data);
				if (jso[0] === "{"){
					debut = "\"Activity\": ";
					fin = "}";
				}else{
					fin = "]";
				}

				let js = jso.substring(0,jso.length-1)+","+debut+"{\"activite\":\""+act+"\""+",\"sous-activite\":\""+ssAct+"\"}"+fin;
				if(!first){
					js = ","+js;
				}
				if(first){
					first = false
				}

				json = json + js;
				j++;

			}
		}
		else{
			console.log(e.data[1]);
			console.log(e.data[2]);
			act=e.data[1];
			ssAct=e.data[2];
		}

	}

};
