($(function(){
	let select_activities = $("#activityExists");
	let select_subactivities = $("#subActivityList");
	let addExeAct = $("#addExeAct");
	let select_exeAct = $("#activityExec");
	let delExeAct = $("#delExeAct");
	let delAct = $("#delAct");
	let modAct = $("#modAct");
	let valide = $("#valide");
	console.log("tTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
	let adresse = getUrl();

	let selected_activity=false;


	$.ajax({
		url:adresse+"/activities",
		method:'GET',
		contentType:'application/json',
		crossDomain:true,
		success:function(result){
			for (let i=0;i<result.length;i++){
				let option = document.createElement("option");
				option.innerHTML = result[i].name;
				option.value = result[i]._id;
				option.name = result[i].name;
				select_activities.append(option);
			}
		},
		complete:function(xhr,status){
			console.log(xhr);
			console.log(status);

		}
	});

	function actualiser(){
		console.log("actualisation");
		while(!$("#activityExists").empty()){
			$("#activityExists option:first").remove();
			console.log("remove");
		}
		$.ajax({
			url:adresse+"/activities",
			method:'GET',
			success:function(result){
				for (let i=0;i<result.length;i++){
					let option = document.createElement("option");
					option.innerHTML = result[i].name;
					option.value = result[i]._id;
					option.name = result[i].name;
					select_activities.append(option);
				}
			}
		})
	}

	delAct.click(function(){
		console.log("clickdel");
		if(selected_activity === true) {
			$.ajax({
				url: adresse+"/activities/" + select_activities.val(),
				method: 'DELETE',
				success: function (result) {
					console.log(result);

					let id = select_activities.val();
					actualiser();
					while (!$("#subActivityList").empty()) {
						$("#subActivityList option:first").remove();
					}
					let t = $('#activityExec option[value="' + id + '"]');
					console.log(t);
					t.remove();
				}
			})
		}
	});

	modAct.click(function(){
		if(selected_activity === true){
			console.log("clickdel");
			window.location="modifActivities.html?activity="+select_activities.val();
		}
	});


	addExeAct.click(function(){
		$.ajax({
			url:adresse+"/activities",
			method:'GET',
			success:function(result){
				for (let i=0;i<result.length;i++){
					if(select_activities.val() == result[i]._id){
						let option = document.createElement("option");
						option.innerHTML = result[i].name;
						option.value = result[i]._id;
						option.className = "draggable";
						select_exeAct.append(option);
					}
				}
			}
		})

	});

	delExeAct.click(function(){

		$("#activityExec option:selected").remove()

	});

    select_activities.change(function(){//affichage des sousactivités selon l'activité sélectionné
		console.log("click")
		selected_activity=true
		while(!$("#subActivityList").empty()){
			$("#subActivityList option:first").remove()
		}


		$.ajax({
			url:adresse+"/activities",
			method:'GET',
			success:function(result){
				for (let i=0;i<result.length;i++){
					if(select_activities.val() == result[i]._id){
						if(result[i].subActivity!=null){
							for (let j=0;j<result[i].subActivity.length;j++){
								let option = document.createElement("li");
								option.innerHTML = result[i].subActivity[j];
								option.value = result[i]._id;
								select_subactivities.append(option);
							}
						}

					}
				}
			}
		})
	});
	valide.click(function () {
		deleteAllCookies()
		let i = 0;
		$("#activityExec option").each(function () {
			document.cookie = "activity["+[i]+"]="+ $(this).val();
			i++;
		});
		window.location="InterfaceWebsocket.html";
	});
	function deleteAllCookies() {//supprime les cookies
		console.log('ok2');
		let decodedCookie = decodeURIComponent(document.cookie);
		let cookies = decodedCookie.split(";");
		for (let i=0; i<cookies.length; i++){

			let cookie = cookies[i];
			let eqPos = cookie.indexOf("=");
			let name = eqPos > -1 ? cookie.substring(0,eqPos) : cookie;
			document.cookie = name + "=;expires = Thu, 01 Jan 1970 00:00:00 GMT";
			console.log(cookie);
		}
	}

	//select_exeAct.dragOptions();

	function getUrl(){
		let host = window.location.hostname;
		return "http://"+host+":3000";
	}

	$(".draggable").draggable;
	select_exeAct.droppable;

}));

