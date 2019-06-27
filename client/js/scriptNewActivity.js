$(function(){
    let adresse = getUrl();
    function getUrl(){
        let host = window.location.hostname;
        return "http://"+host+":3000";
    }
    let subactivity = $("#subActivityExists");
     $.ajax({
         url: adresse+"/activities",
         method: 'GET',
         success: function (result) {
             console.log("in");
             let listSubactivity = new Array();

            for (let i = 0; i < result.length; i++){
                if(result[i].subActivity!=null){
                    for (let j = 0; j < result[i].subActivity.length; j++){
                        let inList = false;
                        for(let k = 0; k < listSubactivity.length; k++){
                            if(listSubactivity[k] === result[i].subActivity[j] || result[i].subActivity[j] === ""){
                                inList = true;
                            }
                        }
                        if(inList === false){
                            listSubactivity.push(result[i].subActivity[j]);
                        }
                    }
                }

            }
            listSubactivity.sort();
             console.log("list : "+listSubactivity);
             for(let l = 0; l < listSubactivity.length; l++){
                 let option = document.createElement("option");
                 option.innerHTML = listSubactivity[l];
                 subactivity.append(option)
             }
         }
     });


    $("#valide").click(function () {
        let name = $("#activityName");
        if(name.val() !== ""){

            let activityName = $("#activityName");
            let arraySubactivity = new Array();
            $("#subActivityChoosed option").each(function () {
                console.log($(this).val());
                arraySubactivity.push($(this).val());

            });

            console.log("name : "+activityName.val());
            $.ajax({
                url: adresse+"/activities",
                method: 'POST',
                data : {
                    name : activityName.val(),
                    subActivity : arraySubactivity
                },
                success: function () {
                    console.log('okkkkkkkkkkkkk');
                    window.location="index.html"
                }
            });
        }else{
            $("#err").removeAttr("hidden");
        }
    });
    $("#subActivityChoosed").dragOptions();

});


function addSubActivity() {
    let selectSubActivitychoose = document.getElementById("subActivityChoosed");
    let selectSubActivityExists = document.getElementById("subActivityExists");
    for (let i = 0; i < selectSubActivityExists.options.length; i++) {
        if (selectSubActivityExists.options[i].selected === true) {
            let option = document.createElement("option");
            option.innerHTML = selectSubActivityExists.options[i].value;
            selectSubActivitychoose.appendChild(option);
        }
    }
}

function createSubActivity() {
    let selectSubActivityExists = document.getElementById("subActivityExists");
    let subActivityChoosed = document.getElementById("subActivityChoosed");
    let option = document.createElement("option");
    let option2 = document.createElement("option");
    option.innerHTML = prompt("Entrez le nom de la nouvelle sous activité");
    option2.innerHTML =option.innerHTML;
    selectSubActivityExists.appendChild(option);
    subActivityChoosed.appendChild(option2);
}
