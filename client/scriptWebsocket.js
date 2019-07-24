function check() {
    var folderName = $("#folderName").val();
    var checkSources = $('.Source:checkbox:checked');
    var checkTypes = $('.Type:checkbox:checked');
    if (folderName != "" && checkSources.length != 0 && checkTypes.length != 0) {
        $("#suivant").attr("disabled", false);
    }
    else {
        $("#suivant").attr("disabled", true);
    }
}

$(document).ready(function () {
    $("#folderName").change(function () {
        var folderName = $("#folderName").val();
        var checkSources = $('.Source:checkbox:checked');
        var checkTypes = $('.Type:checkbox:checked');
        if (folderName != "" && checkSources.length != 0 && checkTypes.length != 0) {
            $("#suivant").attr("disabled", true);
        }
        else $("#suivant").attr("disabled", false);
    });

    var res = setInterval("check()", 300);
});

($(function() {
	let addWs = $("#addWs");
	let type = $("#CocherType");
	let source = $("#CocherSource");
	let suivant = $("#suivant");
	let json = $("#json");
	let csv = $("#csv");
	let adresse = getUrl();
	function getUrl(){
		let host = window.location.hostname;
		return "http://"+host+":3000";
	}

	$("#suivant").attr("disabled", true);

	$.ajax({
		url: adresse+"/websocket",
		method: 'GET',
		success: function (result) {
			console.log("resultat");
			for (let i = 0; i < result.length; i++) {
				console.log("1");
				let nomDS = result[i].name;
				let uri = result[i].uri;
				console.log(nomDS + " = " + uri);					// Verification du nom et de l'uri en l'envoyant dans la console
				let div = document.createElement("DIV");			// On crée la div qui contiendra la checkbox, l label et le bouton supprimer
				div.setAttribute("class", "DS");
				let x = document.createElement("INPUT");			// Puis on crée la checkbox
				x.setAttribute("type", "checkbox");
				x.setAttribute("class", "Source");					// de class Source
				x.setAttribute("id", result[i]._id);						// On lui donne comme ID le nom du cookie
				x.setAttribute("value", result[i]._id);						// et comme VALUE la valeur du cookie
				let xlabel = document.createElement("LABEL");		// On crée le LABEL qui accompagnera la checkbox
				let text = document.createTextNode(nomDS);			// On crée un Textnode ayant pour valeur le nom du cookie
				xlabel.setAttribute("for", x.id);					// On fait en sorte que le label suive la checkbox
				xlabel.appendChild(text);							// On assigne au texte du LABEL le nom du cookie
				let del = document.createElement("INPUT");			// puis on crée le bouton qui va servir à supprimer cette source de données
				del.setAttribute("type", "button");
				del.setAttribute("class", "delete");
				del.setAttribute("value", "X");

				del.onclick = function(){ // Supprimer une source de données
					let index = document.getElementById(result[i]._id);
					let div = index.parentElement;
					div.parentElement.removeChild(div);
					$.ajax({
						url: adresse+"/websocket/" + result[i]._id,
						method: 'DELETE',
						success: function (result) {
							console.log(result)

						}
					})
				};
				div.append(x);										// on ajoute la checkbox au div
				div.append(xlabel);									// Puis le label
				div.append(del);
				websocket.append(div);									// Enfin on ajoute div à websocket
			}
		}
	});

	addWs.click(function(){ // Ajouter une source de données
		let websocket = document.getElementById("websocket");
		//var source = document.getElementsByClassName("Source");
		let type = 0;
		let uri;

		let myRegex = /^ws:\/\/(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/; // test URI

		let nomDS = prompt("Veuillez rentrer le nom de la nouvelle source de données");
		while (nomDS === "") {
			nomDS = prompt("Veuillez rentrer le nom de la nouvelle source de données");
		}
		console.log(nomDS);
		if(nomDS!=null){
			uri = prompt("Veuillez rentrer l'URI de la nouvelle source de données en format @IP:PORT. Ne pas oublier de rajouter le ws:// avant l'adresse", "ws://");
			while (!myRegex.test(uri)) {
				if (uri == null) break;
				uri = prompt("Veuillez rentrer l'URI de la nouvelle source de données en format @IP:PORT. Ne pas oublier de rajouter le ws:// avant l'adresse", "ws://");
			}
		}
		if(uri!= null){
			type = prompt("Veuillez rentrer le type de JSON envoyer par la nouvelle source de données");
		}

		if (uri != null && nomDS != null) {
			$.ajax({
				url: adresse+"/websocket",
				method: 'POST',
				data : {
					name : nomDS,
					uri : uri,
					type: type
				},
				success: function (newAct) {
					let div = document.createElement("DIV");			// On crée une div...
					div.setAttribute("class", "DS");					// de class DS
					let x = document.createElement("INPUT");			// Puis on crée une checkbox
					x.setAttribute("type", "checkbox");
					x.setAttribute("class", "Source");					// de class Source
					x.setAttribute("id", newAct._id);						// On lui donne comme ID le nom du cookie
					x.setAttribute("value", newAct._id);						// et comme VALUE la valeur du cookieù
					let xlabel = document.createElement("LABEL");		// On crée le LABEL qui accomapgnera le checkbox
					let text = document.createTextNode(nomDS);			// On crée un Textnode ayant pour valeur le nom du cookie
					xlabel.setAttribute("for", x.id);					// On fait en sorte que le label suive la checkbox
					xlabel.appendChild(text);							// On assigne au texte du LABEL le nom du cookie
					let del = document.createElement("INPUT");			// puis on crée le bouton qui va servir à supprimer cette source de données
					del.setAttribute("type", "button");
					del.setAttribute("class", "delete");
					del.setAttribute("value", "X");
					del.onclick = function(){ // Supprimer une source de données
						let index = document.getElementById(newAct._id);
						let div = index.parentElement;
						div.parentElement.removeChild(div);
						$.ajax({
							url: adresse+"/websocket/" + newAct._id,
							method: 'DELETE',
							success: function (result) {
								console.log(result)
							}
						})
					};
					div.append(x);										// on ajoute la checkbox au div
					div.append(xlabel);									// Puis le label
					div.append(del);
					websocket.append(div);									// Enfin on ajoute div à websocket
				}
			});
		}
	});

	type.change(function() {
		let test = document.getElementsByClassName("Type");
		console.log("ok");
		if (document.getElementById("CocherType").checked) {
			for (let i = 0; i < test.length; i++) {
				console.log(test[i].id);
				test[i].checked = true;
			}
		}
		else {
			for (let i = 0; i < test.length; i++) {
				console.log(test[i].id);
				test[i].checked = false;
			}
		}
		console.log("ok")
	});

	source.change(function() {
		let test = document.getElementsByClassName("Source");

		if (document.getElementById("CocherSource").checked) {
			for (let i = 0; i < test.length; i++) {
				console.log(test[i].id);
					test[i].checked = true;
			}
		}
		else {
			for (let i = 0; i < test.length; i++) {
				console.log(test[i].id);
				test[i].checked = false;
			}
		}
	});

	suivant.click(function () {
		deleteSocketCookies();

		console.log("val");
		let i = 0;
		$(".Source ").each(function () {
			if($(this).is(":checked")){
				console.log($(this).val());
				document.cookie = "websocket["+[i]+"]="+ $(this).val();
			}
			i++;
		});
		if(json.is(":checked")){
			console.log("json");
			document.cookie = "json[=true";
		}
		if(csv.is(":checked")){
			document.cookie = "csv[=true";
		}

		let nameFolder = $("#folderName");
		document.cookie = "folderName = "+nameFolder.val();

		window.location="activityList.html";
	});

	function deleteSocketCookies() {//supprime les cookies
		console.log('ok2');
		let decodedCookie = decodeURIComponent(document.cookie);
		let cookies = decodedCookie.split(";");
		for (let i=0; i<cookies.length; i++){

			let cookie = cookies[i];
			cookie=cookie.replace(' ', '');
			console.log("cookie " + i + " : " + cookie);
			let eqPos = cookie.indexOf("[");
			let eqEg = cookie.indexOf("=");
			let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
			let indice = eqPos > -1 ? cookie.substring(eqPos,eqEg) : cookie;
			console.log("name="+name);
			if(name === 'websocket'||name === "csv"|| name === "json") {
				document.cookie = name+ indice+ "=;expires = Thu, 01 Jan 1970 00:00:00 GMT";
				console.log(cookie)
			}
		}
	}
}));


