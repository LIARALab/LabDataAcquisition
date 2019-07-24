$(function(){
    let btn_delSubAct =($('#btn_delSubAct'))
    let select_subactivities = $("#subActivityChoosed");
    let adresse = getUrl();
    function getUrl(){
        let host = window.location.hostname;
        return "http://"+host+":3000";
    }
    $(document).ready(function () {
        $('input[type="button"]').click(function () {
            var $op = $('#subActivityChoosed option:selected'),
                $this = $(this);
            if ($op.length) {
                if ($this.val() == 'Up') {
                    $op.first().prev().before($op);
                    select_subactivities.change();
                    console.log("change")
                } else {
                    if ($this.val() == 'Down') {
                        $op.last().next().after($op);
                        select_subactivities.change();
                        console.log("change")
                    }
                }
            }
        });
    });

    select_subactivities.change(function () {
        var $op = $('#subActivityChoosed option:selected');
        var first = $("#subActivityChoosed option:first");
        var last = $("#subActivityChoosed option:last");
        console.log("cur "+$op.val())
        console.log("first "+first.val())
        console.log("las "+last.val())
        console.log(" ")


        if ($op.first().val() == first.val()) {
            $("#up_btn").attr("disabled", true);
        } else {
            $("#up_btn").attr("disabled", false);
        }

        if ($op.last().val() == last.val()) {
            $("#down_btn").attr("disabled", true);
        } else {
            $("#down_btn").attr("disabled", false);
        }

        $("#deleteSubActivity").attr("disabled", false);


    });



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
    btn_delSubAct.click(function () {
        if($("#subActivityChoosed option:selected").length!=0){
            $("#subActivityChoosed option:selected").remove();
        }
        else{
            $("#subActivityChoosed option:last").remove();
        }
    })

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
