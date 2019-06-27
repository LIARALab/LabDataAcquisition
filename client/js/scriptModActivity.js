($(function() {
    let txtbox_activitiy = $("#activityName");
    let select_subactivities = $("#subActivityChoosed");
    let btn_addSubAct = $("#addSubActivity");
    let btn_creSubAct = $("#createSubActivity");
    let btn_delSubAct = $("#deleteSubActivity");
    let btn_valider = $("#valider");
    let address = getUrl();

    function getUrl(){
        var host = window.location.hostname;
        return "http://"+host+":3000";
    }


    let tmp = [];
    let activity = window.location.search.substring(1);
    tmp = activity.split("=");
    activity = decodeURI(tmp[1]);


    console.log("test:" + activity)


    $.ajax({
        url: address+"/activities",
        method: 'GET',
        success: function (result) {
            for (let i = 0; i < result.length; i++) {

                if (activity == result[i]._id) {
                    txtbox_activitiy.val(result[i].name)
                    console.log("test")
                    for (let j = 0; j < result[i].subActivity.length; j++) {
                        console.log("teokst")
                        let option = document.createElement("option");
                        option.innerHTML = result[i].subActivity[j];
                        option.value = result[i].subActivity[j];
                        select_subactivities.append(option);
                        console.log(option.innerHTML)
                        console.log(option.value)
                    }
                }
            }
        }
    })


        var subactivity = $("#subActivityExists");
        $.ajax({
            url: address+"/activities",
            method: 'GET',
            success: function (result) {
                console.log("in")
                var listSubactivity = new Array();

                for (let i = 0; i < result.length; i++){
                    if(result[i].subActivity!=null){
                        for (let j = 0; j < result[i].subActivity.length; j++){
                            let inList = false;
                            for(let k = 0; k < listSubactivity.length; k++){
                                if(listSubactivity[k] == result[i].subActivity[j] || result[i].subActivity[j] == ""){
                                    inList = true;
                                }
                            }
                            if(inList == false){
                                listSubactivity.push(result[i].subActivity[j]);
                            }
                        }
                    }

                }
                listSubactivity.sort()
                console.log("list : "+listSubactivity)
                for(let l = 0; l < listSubactivity.length; l++){
                    let option = document.createElement("option");
                    option.innerHTML = listSubactivity[l]
                    subactivity.append(option)
                }
            }
        });

    btn_addSubAct.click(function () {
        var selectSubActivitychoose = document.getElementById("subActivityChoosed")
        var selectSubActivityExists = document.getElementById("subActivityExists")
        for (var i = 0; i < selectSubActivityExists.options.length; i++) {
            if (selectSubActivityExists.options[i].selected == true) {
                var option = document.createElement("option")
                option.innerHTML = selectSubActivityExists.options[i].value
                selectSubActivitychoose.appendChild(option)
            }
        }
    })

    btn_creSubAct.click(function () {
        var selectSubActivityExists = document.getElementById("subActivityExists")
        var subActivityChoosed = document.getElementById("subActivityChoosed")
        var option = document.createElement("option")
        var option2 = document.createElement("option")
        option.innerHTML = prompt("Entrez le nom de la nouvelle sous activité");
        option2.innerHTML = option.innerHTML
        selectSubActivityExists.appendChild(option)
        subActivityChoosed.appendChild(option2)
    })
    btn_delSubAct.click(function () {
        var selectSubActivityChoose = document.getElementById("subActivityChoosed")
        for (var i = 0; i < selectSubActivityChoose.options.length; i++) {
            if (selectSubActivityChoose.options[i].selected == true) {
                var option = selectSubActivityChoose.options[i]
                selectSubActivityChoose.removeChild(option)
            }
        }
    })
    btn_valider.click(function () {

        if(txtbox_activitiy.val()!=""){
            var selectSubActivityChoose = document.getElementById("subActivityChoosed")
            var name = txtbox_activitiy.val()
            var subAct = []
            for (let i = 0; i < selectSubActivityChoose.options.length; i++) {
                console.log(selectSubActivityChoose.options[i].value);
                subAct.push(selectSubActivityChoose.options[i].value)
            }

            console.log("subAct");
            console.log(subAct);
            console.log("name");
            console.log(name);

            $.ajax({
                url: address+"/activities/" + activity,
                method: 'PUT',
                data: {"name": name, subActivity:subAct},
                success: function (result) {
                    test()
                    console.log("SUCCESS")
                }
            })
        }
        //

    })

    $("#subActivityChoosed").dragOptions()

    function test(){
        console.log("on est dans le test")
        window.location="index.html"
    }

}));