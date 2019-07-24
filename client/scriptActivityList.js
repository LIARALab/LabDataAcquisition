($(function () {
    let div_activity = $("#activityList");
    let btn_stop = $("#btn_stop");
    let btn_start = $("#btn_start");
    let json = false;
    let csv = false;
    let enregistrement = false;
    let tabUri = [];
    let tabNomWs = [];
    let tabTypeWs = [];
    let adresse = getUrl();

    btn_stop.attr("disabled", true);
    div_activity.hide();

    function getUrl() {
        let host = window.location.hostname;
        return "http://" + host + ":3000";
    }


    let decodeCookie = decodeURIComponent(document.cookie);
    let cookies = decodeCookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        cookie = cookie.replace(' ', '');
        console.log("cookie " + i + " : " + cookie);
        let eqPosEg = cookie.indexOf("=");
        let eqPos = cookie.indexOf("[");
        let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        console.log("name=" + name);
        if (name === 'activity') {
            console.log("name=" + name);

            $.ajax({
                url: adresse + "/activities",
                method: 'GET',
                success: function (result) {
                    let value = eqPos > -1 ? cookie.substring(eqPosEg + 1, cookie.length) : cookie;
                    console.log("id : " + value);
                    for (let j = 0; j < result.length; j++) {
                        if (result[j]._id === value) {
                            let divAct = document.createElement("DIV");			// On crée une div...
                            divAct.setAttribute("class", "Act");
                            let activity = document.createElement("h3");
                            activity.innerHTML = result[j].name;
                            divAct.append(activity);


                            let startButton = document.createElement("input");
                            startButton.type = "button";
                            startButton.value = "start";
                            startButton.onclick = function () {
                                if (enregistrement === false) {
                                    description();
                                }
                                startActivity(result[j].name, "Transition");
                                startButton.disabled = true;
                                stopButton.disabled = false;
                            };
                            divAct.append(startButton);

                            let stopButton = document.createElement("input");
                            stopButton.type = "button";
                            stopButton.value = "stop";
                            stopButton.disabled = true;
                            var idbutton = "btn_stop_act" + j;
                            stopButton.id = idbutton;
                            stopButton.onclick = function () {
                                stopActivity("transition");
                                stopButton.disabled = true;
                                startButton.disabled = false;
                                if (result[j].subActivity != null) {
                                    for (let k = 0; k < result[j].subActivity.length; k++) {
                                        iddd = "#id_stop_btn" + k;
                                        idddd = "#id_start_btn" + k;
                                        $(iddd).attr("disabled", true);
                                        $(idddd).attr("disabled", false);
                                    }
                                }
                            };
                            divAct.append(stopButton);

                            if (result[j].subActivity != null) {

                                for (let k = 0; k < result[j].subActivity.length; k++) {
                                    let divSubAct = document.createElement("DIV");			// On crée une div...
                                    divSubAct.setAttribute("class", "SubAct");
                                    let subActivity = document.createElement("p");
                                    subActivity.innerHTML = result[j].subActivity[k];
                                    divSubAct.append(subActivity);

                                    let startButton = document.createElement("input");
                                    startButton.type = "button";
                                    startButton.value = "start";
                                    var idddd = "id_start_btn" + k;
                                    startButton.id = idddd;
                                    startButton.onclick = function () {
                                        if (enregistrement === false) {
                                            description();
                                        }
                                        startActivity(result[j].name, result[j].subActivity[k]);
                                        startButton.disabled = true;
                                        stopButton.disabled = false;
                                        var idd = "#" + idbutton;
                                        console.log($(idd));
                                        $(idd).attr("disabled", false);
                                    };
                                    divSubAct.append(startButton);

                                    let stopButton = document.createElement("input");
                                    stopButton.type = "button";
                                    stopButton.value = "stop";
                                    var iddd = "id_stop_btn" + k;
                                    stopButton.id = iddd;
                                    stopButton.disabled = true;
                                    stopButton.onclick = function () {
                                        stopActivity(result[j].name);
                                        stopButton.disabled = true;
                                        startButton.disabled = false;
                                    };
                                    divSubAct.append(stopButton);
                                    divAct.append(divSubAct);
                                }
                            }
                            div_activity.append(divAct);
                        }
                    }
                }
            })
        }
        if (name === 'websocket') {
            console.log("webSocket");


            $.ajax({
                url: adresse + "/websocket",
                method: 'GET',
                success: function (result) {
                    let value = eqPos > -1 ? cookie.substring(eqPosEg + 1, cookie.length) : cookie;
                    console.log("id2 : " + value);
                    for (let j = 0; j < result.length; j++) {
                        if (result[j]._id === value) {
                            console.log("push");
                            tabNomWs.push(result[j].name);
                            tabUri.push(result[j].uri);
                            tabTypeWs.push(result[j].type);
                        }
                    }
                    affichage()
                }
            })
        }
        if (name === 'json') {
            console.log("json");
            json = true;
        }
        if (name === 'csv') {
            console.log("csv");
            csv = true;
        }
    }

    function affichage() {
        console.log("affchage:");
        for (let i = 0; i < tabNomWs.length; i++) {
            console.log(tabNomWs[i] + "=" + tabUri[i]);
        }
    }

    btn_stop.click(function () {
        // deleteAllCookies()
        console.log("ok");
        sto();
    });

    btn_start.click(function () {
        description();
        btn_stop.attr("disabled", false);
        div_activity.show();
        btn_start.attr("disabled", true);
    });

    function description() {
        let dataString = new String();

        dataString = "Documentation\r\n";

        $.ajax({
            url: adresse + "/activities",
            method: 'GET',
            success: function (result) {
                dataString = dataString + "Activités exécutées : \r\n";
                //ajout des activités
                let decodeCookie = decodeURIComponent(document.cookie);
                let cookies = decodeCookie.split(";");

                for (let i = 0; i < cookies.length; i++) {
                    let cookie = cookies[i];
                    cookie = cookie.replace(' ', '');
                    console.log("cookie " + i + " : " + cookie);
                    let eqPosEg = cookie.indexOf("=");
                    let eqPos = cookie.indexOf("[");
                    let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
                    if (name === 'activity') {
                        let value = eqPos > -1 ? cookie.substring(eqPosEg + 1, cookie.length) : cookie;
                        console.log("id : " + value);

                        for (let j = 0; j < result.length; j++) {
                            if (result[j]._id === value) {
                                console.log(result[j].name);
                                dataString = dataString + "        " + result[j].name + "\r\n";
                                if (result[j].subActivity != null) {
                                    for (let k = 0; k < result[j].subActivity.length; k++) {
                                        dataString = dataString + "            " + result[j].subActivity[k] + "\r\n";
                                    }
                                }
                            }
                        }
                    }
                }
                console.log("ACTTTTTTTTTTTTTTT");
                console.log(dataString);

            }
        });
        $.ajax({
            url: adresse + "/websocket",
            method: 'GET',
            success: function (result) {
                dataString = dataString + 'Webservices utilisés : \r\n';
                let decodeCookie = decodeURIComponent(document.cookie);
                let cookies = decodeCookie.split(";");
                //on récupère les cookies

                for (let i = 0; i < cookies.length; i++) {
                    let cookie = cookies[i];
                    cookie = cookie.replace(' ', '');
                    console.log("cookie " + i + " : " + cookie);
                    let eqPosEg = cookie.indexOf("=");
                    let eqPos = cookie.indexOf("[");
                    let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;

                    if (name === 'websocket') {
                        let value = eqPos > -1 ? cookie.substring(eqPosEg + 1, cookie.length) : cookie;
                        console.log("on est dans le success");
                        console.log(result.length);
                        for (let j = 0; j < result.length; j++) {
                            if (result[j]._id === value) {
                                dataString = dataString + "        " + result[j].name + "\r\n";
                            }
                        }

                    }

                }
                console.log(dataString);
                tre(dataString);

            }

        });

        function tre(dataString) {
            console.log(dataString);
            Thread(dataString);
        }


    }


    // tableau de thread
    let threadCsv = [];
    let threadJson = [];

    let tabNomrecu = [];
    let tabDatarecu = [];
    let tabTypeRecu = [];
    let tabCSVNomrecu = [];
    let tabCSVDatarecu = [];
    let nbRecu = 0;
    let nbRun = 0;


    //fonctions de creation de fichiers
    function createCSV(dataString) {
        console.log("csv.exe");
        let nbThreadRestant = 0;
        nbRecu = 0;
        for (let i = 0; i < tabDatarecu.length; i++) {
            nbThreadRestant++;
            let monWorker;
            console.log("type " + tabTypeRecu[i]);
            switch (tabTypeRecu[i]) {

                case "2":
                    monWorker = new Worker('workerCSV2.js');
                    console.log("2");
                    break;
                case "3":
                    console.log("3");
                    monWorker = new Worker('workerCSV3.js');
                    break;
                case "1":
                    console.log("1");
                default:
                    monWorker = new Worker('workerCSV1.js');
                    console.log("def");
                    break;
            }
            threadCsv[i] = monWorker;

            monWorker.postMessage([tabNomrecu[i].substring(0, tabNomrecu[i].length - 5), tabDatarecu[i]]);

            threadCsv[i].onmessage = function (e) {

                console.log('Message reçu depuis le worker');
                tabCSVNomrecu[nbRecu] = e.data[1];
                tabCSVDatarecu[nbRecu] = e.data[0];
                nbRecu++;
                //monWorker.terminate();
                nbThreadRestant--;
                console.log(nbThreadRestant + " " + e.data[1] + "csv");
                if (nbThreadRestant === 0) {
                    threadCsv.forEach(function (item) {
                        item.terminate();
                    });
                    creationFichier(dataString);
                }
            }
        }
    }

    function Thread(dataString) {

        let nbThreadRestant = 0;
        let nbRunPrevu = tabUri.length;


        enregistrement = true;
        console.log("Tread");

        let patience = document.getElementById("patience");
        let activities = document.getElementById("activityList");
        let div_startStop = document.getElementById("div_startStop");
        let lblChoixAct = document.getElementById("lblChoixAct");

        patience.removeAttribute("style");
        activities.setAttribute("style", "display:none");
        div_startStop.setAttribute("style", "display:none");
        lblChoixAct.setAttribute("style", "display:none");


        console.log("json.exe");
        console.log(tabUri);
        for (let i = 0; i < tabUri.length; i++) {
            nbThreadRestant++;
            console.log("nombre de thread json" + nbThreadRestant);
            console.log("uri=" + tabUri[i] + " name=" + tabNomWs[i]);
            let monWorker = new Worker('workerJSON.js');
            threadJson[i] = monWorker;

            monWorker.postMessage([0, tabUri[i], tabNomWs[i], tabTypeWs[i]]);
            console.log(tabUri + tabNomWs);

            threadJson[i].onmessage = function (e) {
                if (e.data === "reception...") {
                    nbRun++;
                    console.log("reception :" + nbRun);
                    if (nbRun === nbRunPrevu) {
                        console.log("Total :" + nbRun);
                        patience.setAttribute("style", "display:none");
                        activities.removeAttribute("style");
                        div_startStop.removeAttribute("style");
                        lblChoixAct.removeAttribute("style");
                    }

                } else {
                    if (e.data[0] == 'error') {

                        alert(e.data[1]);
                    } else {
                        tabNomrecu[nbRecu] = e.data[1];
                        tabDatarecu[nbRecu] = "[" + e.data[0] + "]";
                        tabTypeRecu[nbRecu] = e.data[2];
                        nbRecu++;
                        //monWorker.terminate();
                        nbThreadRestant--;
                        console.log(nbThreadRestant + " " + e.data[1] + "json");
                        if (nbThreadRestant === 0) {
                            monWorker.terminate();
                            if (csv === true) {
                                createCSV(dataString);
                            } else {
                                creationFichier(dataString);
                            }

                        }
                    }
                }
            }
        }

    }

    function sto() {
        threadCsv.forEach(function (item) {
            console.log("CSVVVVVVVVV");
            item.postMessage("stop");
        });
        threadJson.forEach(function (item) {
            console.log("JSONNNNNNNNNN");
            item.postMessage("stop");
        });


    }

    function startActivity(activity, subActivity) {

        threadJson.forEach(function (item) {
            item.postMessage([1, activity, subActivity]);
        });
    }

    function stopActivity(activity) {

        threadJson.forEach(function (item) {
            item.postMessage([1, activity, "transition"]);
        });
    }

    function creationFichier(dataString) {
        let nameFolder;
        let date = new Date();
        let decodeCookie = decodeURIComponent(document.cookie);
        let cookies = decodeCookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            cookie = cookie.replace(' ', '');
            console.log("cookie " + i + " : " + cookie);
            let eqPosEg = cookie.indexOf("=");
            let name = eqPosEg > -1 ? cookie.substring(0, eqPosEg) : cookie;
            if (name === 'folderName') {
                let value = eqPosEg > -1 ? cookie.substring(eqPosEg + 1, cookie.length) : cookie;

                nameFolder = value;
            }
        }
        let name = nameFolder + " " + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
        console.log("nom du fichier : " + name);

        let zip = new JSZip();


        zip.file("doc.txt", dataString);
        if (json === true) {
            for (let i = 0; i < tabDatarecu.length; i++) {
                zip.file(tabNomrecu[i], tabDatarecu[i]);
            }
        }
        if (csv === true) {
            for (let i = 0; i < tabCSVDatarecu.length; i++) {
                zip.file(tabCSVNomrecu[i], tabCSVDatarecu[i]);
            }
        }

        zip.generateAsync({type: "blob"}).then(function (content) {
            saveAs(content, name + ".zip");
        })
    }
}));


