function check() {
    var select_activities = $("#activityExists");
    var select_exeAct = $("#activityExec");
    var nbActivity = $(select_activities.children('option')).length;
    var nbAct_exe = $(select_exeAct.children('option')).length;


    if (nbAct_exe === 0) {
        $("#delExeAct").attr("disabled", true);
        $("#up_btn").attr("disabled", true);
        $("#down_btn").attr("disabled", true)
    }

    if (nbActivity === 0) {
        $("#addExeAct").attr("disabled", true);
    } else {
        $("#addExeAct").attr("disabled", false);
    }
}

($(function () {
    let select_activities = $("#activityExists");
    let select_subactivities = $("#subActivityList");
    let addExeAct = $("#addExeAct");
    let select_exeAct = $("#activityExec");
    let delExeAct = $("#delExeAct");
    let delAct = $("#delAct");
    let modAct = $("#modAct");
    let valide = $("#valide");
    let adresse = getUrl();

    //var res = setInterval("check()", 300);

    let selected_activity = false;
    let selected_exe_activity = false;

    $("#delExeAct").attr("disabled", true);
    $("#up_btn").attr("disabled", true);
    $("#down_btn").attr("disabled", true);

    $(document).ready(function () {
        $('input[type="button"]').click(function () {
            var $op = $('#activityExec option:selected'),
                $this = $(this);
            if ($op.length) {
                if ($this.val() == 'Up') {
                    $op.first().prev().before($op);
                    console.log("change")
                    select_exeAct.change();
                } else {
                    if ($this.val() == 'Down') {
                        $op.last().next().after($op);
                        select_exeAct.change();
                        console.log("change")
                    }
                }
            }
        });
    });

    $.ajax({
        url: adresse + "/activities",
        method: 'GET',
        contentType: 'application/json',
        crossDomain: true,
        success: function (result) {
            for (let i = 0; i < result.length; i++) {
                let option = document.createElement("option");
                option.innerHTML = result[i].name;
                option.value = result[i]._id;
                option.name = result[i].name;
                option.selected = true;
                select_activities.append(option);
            }
            select_activities.change()
        },
        complete: function (xhr, status) {
            console.log(xhr);
            console.log(status);

        }
    });

    function actualiser() {
        console.log("actualisation");
        while (!$("#activityExists").empty()) {
            $("#activityExists option:first").remove();
            console.log("remove");
        }
        $.ajax({
            url: adresse + "/activities",
            method: 'GET',
            success: function (result) {
                for (let i = 0; i < result.length; i++) {
                    let option = document.createElement("option");
                    option.innerHTML = result[i].name;
                    option.value = result[i]._id;
                    option.name = result[i].name;
                    select_activities.append(option);
                }
            }
        })
    }

    delAct.click(function () {
        console.log("clickdel");
        if (selected_activity === true) {
            $.ajax({
                url: adresse + "/activities/" + select_activities.val(),
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

                    if (t.length) {
                        t.first().prev().selected = true;
                    }
                    t.remove();
                    select_activities.change()
                }
            })
        }
    });

    modAct.click(function () {
        if (selected_activity === true) {
            console.log("clickdel");
            window.location = "modifActivities.html?activity=" + select_activities.val();
        }
    });


    addExeAct.click(function () {
        $.ajax({
            url: adresse + "/activities",
            method: 'GET',
            success: function (result) {
                for (let i = 0; i < result.length; i++) {
                    if (select_activities.val() == result[i]._id) {
                        let option = document.createElement("option");
                        option.innerHTML = result[i].name;
                        option.value = result[i]._id;
                        option.className = "draggable";
                        select_exeAct.append(option);
                    }
                }
                select_exeAct.change();
            }
        })

    });

    delExeAct.click(function () {
        if($("#activityExec option:selected").length!=0){
            $("#activityExec option:selected").remove();
        }
        else{
            $("#activityExec option:last").remove();
        }
    });

    select_activities.change(function () {//affichage des sousactivités selon l'activité sélectionné
        console.log("click")
        selected_activity = true;
        while (!$("#subActivityList").empty()) {
            $("#subActivityList option:first").remove()
        }


        $.ajax({
            url: adresse + "/activities",
            method: 'GET',
            success: function (result) {
                for (let i = 0; i < result.length; i++) {
                    if (select_activities.val() == result[i]._id) {
                        if (result[i].subActivity != null) {
                            for (let j = 0; j < result[i].subActivity.length; j++) {
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

    select_exeAct.change(function () {
        var $op = $('#activityExec option:selected');
        var first = $("#activityExec option:first");
        var last = $("#activityExec option:last");
        selected_exe_activity = true;

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

        $("#delExeAct").attr("disabled", false);


    });

    valide.click(function () {
        deleteAllCookies()
        let i = 0;
        $("#activityExec option").each(function () {
            document.cookie = "activity[" + [i] + "]=" + $(this).val();
            i++;
        });
        window.location = "interfaceWebsocket.html";
    });

    function deleteAllCookies() {//supprime les cookies
        console.log('ok2');
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookies = decodedCookie.split(";");
        for (let i = 0; i < cookies.length; i++) {

            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = name + "=;expires = Thu, 01 Jan 1970 00:00:00 GMT";
            console.log(cookie);
        }
    }

    function getUrl() {
        let host = window.location.hostname;
        return "http://" + host + ":3000";
    }

    $(".draggable").draggable;
    select_exeAct.droppable;

}));

