money = 0;
moneyup = 1;
msec = 0;
upcost = 10;
catcost = 25;
workercost = 10000;
upown = 0;
catown = 0;
workerown = 0;
catadd = 1;
workadd = 20;
cboost = 1;
wboost = 50;
catmax = 0;
workmax = 0;
var alerted = false;
var alerted2 = false;
var alerted3 = false;

//ajoute une virgule tous les trois chiffres
function addcomma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

//met à jour les valeurs affichées dans le html
function reloadall() {
    document.getElementById("click").innerHTML =
        "$/clique: " + addcomma(moneyup) + " | $/sec: " + addcomma(msec);
    document.getElementById("total").innerHTML = "Budgets de production: " + addcomma(money) + " $";
    document.getElementById("cat").innerHTML =
        catown + "🚓-Voiture: " + addcomma(catcost) + " | +" + addcomma(catadd) + "/sec";
    if (workerown > 1){
        document.getElementById("worker").innerHTML =
            workerown + "🚁-Hélicoptères: " + addcomma(workercost) + " | +" + addcomma(workadd) + "/sec";
    }
    else if (workerown < 1){
        document.getElementById("worker").innerHTML =
            workerown + "🚁-Hélicoptère: " + addcomma(workercost) + " | +" + "2000" + "/sec";
    }
    document.getElementById("upgrade").innerHTML =
        addcomma(upown) + "👷‍♀️0-Artificier: " + addcomma(upcost) + "| Double vos $/clique";

// si la partie est reload, il faut rafraichir l'affichage en adéquation avec les données de la sauvegarde
    //PARTIE VOITURES
    if (catown <= 1) {
        document.getElementById("cat").innerHTML =
            catown + "🚓-Voiture: " + addcomma(catcost) + " | +" + addcomma(catadd * cboost) + "/sec";
    }
    else {
        document.getElementById("cat").innerHTML =
            catown + "🚓-Voitures: " + addcomma(catcost) + " | +" + addcomma(catadd * cboost) + "/sec";

        if(catown > 7 && catown < 23 ){
            document.getElementById("cat").innerHTML =
                catown + "🚛-Camions: " + addcomma(catcost) + " | +" + addcomma(catadd * cboost) + "/sec";}

        if(catown >= 22 && catown < 30){
            document.getElementById("cat").innerHTML =
                catown + "🚂-Locomotives: " + addcomma(catcost) + " | +" + addcomma(catadd * cboost) + "/sec";}

        else if(catown > 29) {
            document.getElementById("cat").innerHTML =
                catown + "🛸-Soucoupes volantes: " + addcomma(catcost) + " | +" + addcomma(catadd * cboost) + "/sec"; }

    }
    //PARTIE HELICO
    if (workerown <= 1 && workerown != 23) {
        document.getElementById("worker").innerHTML =
            workerown + "🚁-Hélicoptère: " + addcomma(workercost) + " | +" + addcomma(workadd * wboost) + "/sec";
    }
    else {
        if (workerown != 23){
            document.getElementById("worker").innerHTML =
                workerown + "🚁-Hélicoptères: " + addcomma(workercost) + " | +" + addcomma(workadd * wboost) + "/sec";}

        if(workerown > 12 && workerown < 21 ){
            document.getElementById("worker").innerHTML =
                workerown + "🛩️-Avions: " + addcomma(workercost) + " | +" + addcomma(workadd * wboost) + "/sec";}

        else if(workerown > 20 && workerown != 23){
            document.getElementById("worker").innerHTML =
                workerown + "🚀-Fusée: " + addcomma(workercost) + " | +" + addcomma(workadd * wboost) + "/sec";}
    }

    //PARTIE ARTIFICERS DANS CLICKED FUNCTION
}

//sauvegarde la partie
function save() {
    localStorage.setItem("money", money);
    localStorage.setItem("moneyup", moneyup);
    localStorage.setItem("msec", msec);
    localStorage.setItem("upcost", upcost);
    localStorage.setItem("catcost", catcost);
    localStorage.setItem("catadd", catadd);
    localStorage.setItem("workercost", workercost);
    localStorage.setItem("workadd", workadd);
    localStorage.setItem("catown", catown);
    localStorage.setItem("workerown", workerown);
    localStorage.setItem("upown", upown);
    localStorage.setItem("catadd", catadd);
    localStorage.setItem("workadd", workadd);
    localStorage.setItem("cboost", cboost);
    localStorage.setItem("wboost", wboost);
    localStorage.setItem("catmax", catmax);
    localStorage.setItem("workmax", workmax);
}
//loads save file
function load() {
    money = parseInt(localStorage.getItem("money"));
    moneyup = parseInt(localStorage.getItem("moneyup"));
    msec = parseInt(localStorage.getItem("msec"));
    upcost = parseInt(localStorage.getItem("upcost"));
    catcost = parseInt(localStorage.getItem("catcost"));
    upown = parseInt(localStorage.getItem("catadd"));
    workercost = parseInt(localStorage.getItem("workercost"));
    upown = parseInt(localStorage.getItem("workadd"));
    catown = parseInt(localStorage.getItem("catown"));
    workerown = parseInt(localStorage.getItem("workerown"));
    upown = parseInt(localStorage.getItem("upown"));
    catadd = parseInt(localStorage.getItem("catadd"));
    workadd = parseInt(localStorage.getItem("workadd"));
    cboost = parseInt(localStorage.getItem("cboost"));
    wboost = parseInt(localStorage.getItem("wboost"));
    catmax = parseInt(localStorage.getItem("catmax"));
    workmax = parseInt(localStorage.getItem("workmax"));

    reloadall();
}

//Réinitialise toutes les metrics du programme
function reset() {
    if (confirm("Votre progression sera perdue pour toujours. Veuillez confirmer O/N") === true) {
        money = 0;
        moneyup = 1;
        msec = 0;
        upcost = 10;
        catcost = 25;
        workercost = 10000;
        catown = 0;
        workerown = 0;
        upown = 0;
        catadd = 1;
        workadd = 20;
        reloadall();
    }
}

//fonction qui s'active tous les secs 166
function myTimer() {
    money += msec;
    document.getElementById("total").innerHTML = "Budgets de production: " + addcomma(money) + " $";
    document.getElementById("total2").innerHTML = "Budgets de production: " + addcomma(money) + " $";

    if (workerown == 23) {
        document.getElementById("worker").innerHTML = "23" + "🚀-Fusée: MAX | +35% de co2 :( ";}

    if (catown == 32) {
        document.getElementById("cat").innerHTML =
            "32" + "🛸-Soucoupes volantes: MAX | + 42m$/clique";}

    if (upown == 42) {
        document.getElementById("upgrade").innerHTML = "42" + "🧕-Éxperts artificiers: MAX | +70% ninja vibe";}


    if (upown == 20) {
        document.getElementById("upgrade").innerHTML =
            addcomma(upown) + "👩‍🏭-Éxperts artificiers: " + addcomma(upcost) + " | Triple vos $/clique" ;
        }
    
}

setInterval(myTimer, 1000);


//l'utilisateur clique sur l'image
function clicked() {

    money+=moneyup;
    console.log(money);
    document.getElementById("total").innerHTML = "Budgets de production: " + addcomma(money) + " $";
    document.getElementById("total2").innerHTML = "Budgets de production: " + addcomma(money) + " $";

    if (money > 500000000)
    {

        if (alerted === false)
        {
            alert("Bravo, vous avez atteint 500,000,000 $. " +
                "Fun fact : c'est plus que le record mondial du film le plus couteux jamais produit dans la vraie vie. (Pirates des caraïbes, 2011.)");
                alerted = true;
        }
    }

    if (money > 40000000000000)
    {

        if (alerted2 === false)
        {
            alert("Bravo, vos budgets de production représentent désormais 40,000,000,000,000 $ , soit autant que la capitalisation totale\n" +
                "de la bourse américaine (le S&P 500).\n" +
                "Mais c'est encore loin d'être suffisant pour monter vos artificers level 42... MWAHAHAHAHAHHAHAHAHAHAH");
            alerted2 = true;
        }
    }

    if (money > 33000000000)
    {

        if (alerted3 === false)
        {
            alert("Bravo, vos budgets de production représentent désormais 33,000,000,000 $ , soit autant que le PIB du Liban."+
                "Avec ce budget, vous allez pouvoir refaire LE LIBAN , EN GRAND !");

            alerted3 = true;
        }
    }


}

//upgrade function
function upgrade(name) {
    if (name == "clicker cat") {

        if (money >= catcost && catown <= 31) {
            if (catown <= 6) {
                msec += 10 * catadd;
                catadd++;
                cboost = 10;
            } else if (catown == 7) {
                msec += 10 * catadd;
                catadd++;
                cboost = 400;
            } else if (catown <= 12) {
                msec += 400 * catadd;
                catadd++;
                cboost = 400;
            } else if (catown == 13) {
                msec += 400 * catadd;
                catadd++;
                cboost = 6000;
            } else if (catown <= 20) {
                msec += 6000 * catadd;
                catadd++;
                cboost = 6000;
            } else if (catown == 21) {
                msec += 6000 * catadd;
                catadd++;
                cboost = 130000; }
            else if (catown <= 28) {
                msec += 130000 * catadd;
                catadd++;
                cboost = 130000;}
            else if (catown == 29) {
                msec += 130000 * catadd;
                catadd++;
                cboost = 800000;}
            else if (catown <= 30) {
                msec += 800000 * catadd;
                catadd++;
                cboost = 800000;}
            else if (catown == 31 ) {
                msec += 800000 * catadd;
                catadd++;
                cboost = 4000000;}
            else {
                msec += 4000000 * catadd;
                catadd++;
                cboost = 4000000;
            }
            catown += 1;
            money -= catcost;
            catcost = catcost * 2;



            if (catown <= 1) {
                document.getElementById("cat").innerHTML =
                    catown + "🚓-Voiture: " + addcomma(catcost) + " | +" + addcomma(catadd * cboost) + "/sec";
            }
            else {
                document.getElementById("cat").innerHTML =
                    catown + "🚓-Voitures: " + addcomma(catcost) + " | +" + addcomma(catadd * cboost) + "/sec";

                if(catown > 7 && catown < 23 ){
                    document.getElementById("cat").innerHTML =
                        catown + "🚛-Camions: " + addcomma(catcost) + " | +" + addcomma(catadd * cboost) + "/sec";}

                if(catown >= 22 && catown < 30){
                    document.getElementById("cat").innerHTML =
                        catown + "🚂-Locomotives: " + addcomma(catcost) + " | +" + addcomma(catadd * cboost) + "/sec";}

                else if(catown > 29 && catown != 32) {
                    document.getElementById("cat").innerHTML =
                        catown + "🛸-Soucoupes volantes: " + addcomma(catcost) + " | +" + addcomma(catadd * cboost) + "/sec"; }

                else if (catown == 32) {
                    document.getElementById("cat").innerHTML =
                    "32" + "🛸-Soucoupes volantes: MAX | + 42m$/clique";
                    
                    moneyup += 42000000;
                        }

            }

     
        }

    }

    if (name == "worker") {

        if (money >= workercost && workerown <= 22) {

            if (workerown <= 5) {
                msec += 100 * workadd;
                workadd++;
                wboost = 100;
            } else if (workerown == 6) {
                msec += 100 * workadd;
                workadd++;
                wboost = 15000;
            } else if (workerown <= 11) {
                msec += 15000 * workadd;
                workadd++;
                wboost = 15000;
            } else if (workerown == 12) {
                msec += 15000 * workadd;
                workadd++;
                wboost = 150000;
            } else if (workerown <= 20) {
                msec += 150000 * workadd;
                workadd++;
                wboost = 150000;
            } else if (workerown == 21) {
                msec += 150000 * workadd;
                workadd++;
                wboost = 3000000;
            } else if (workerown <= 22) {
                msec += 3000000 * workadd;
                workadd++;
                wboost = 3000000;
            } else if (workerown == 22) {
                msec += 3000000 * workadd;
                workadd++;
                wboost = 5000000;
            }
             else {
                msec += 5000000 * workadd;
                workadd++;
                wboost = 5000000;

            }
            workerown += 1;
            money -= workercost;
            workercost = workercost * 1.5;

            if (workerown <= 1 && workerown != 23) {
                document.getElementById("worker").innerHTML =
                    workerown + "🚁-Hélicoptère: " + addcomma(workercost) + " | +" + addcomma(workadd * wboost) + "/sec";
            }
            else {
                if (workerown != 23){
                document.getElementById("worker").innerHTML =
                    workerown + "🚁-Hélicoptères: " + addcomma(workercost) + " | +" + addcomma(workadd * wboost) + "/sec";}

                if(workerown > 12 && workerown <= 21 ){
                document.getElementById("worker").innerHTML =
                    workerown + "🛩️-Avions: " + addcomma(workercost) + " | +" + addcomma(workadd * wboost) + "/sec";}

                else if(workerown > 21 && workerown != 23){
                    document.getElementById("worker").innerHTML =
                        workerown + "🚀-Fusée: " + addcomma(workercost) + " | +" + addcomma(workadd * wboost) + "/sec";}
            }



        }
        else if (workerown == 23) {
            document.getElementById("worker").innerHTML = "23" + "🚀-Fusée: MAX | +35% de co2 :( ";
        }
    }

    
    if (name == "upgrade") {

        if (money >= upcost && upown <= 42) {
            //les 21 premiers artificers sont des non-experts
            if(upown <= 19) {
            moneyup += moneyup * 1;
            money -= upcost;
            upown += 1;
            upcost = upcost * 3;

                if(upown <= 1 && upown < 21){
            document.getElementById("upgrade").innerHTML =
                    addcomma(upown) + "👷‍♀️‍-Artificer: " + addcomma(upcost) + " | Double vos $/clique"; }
                else if (upown > 1 && upown < 21) {
                    document.getElementById("upgrade").innerHTML =
                        addcomma(upown) + "👷‍♀️‍-Artificers: " + addcomma(upcost) + " | Double vos $/clique"; }
            }
             else if (upown == 20) {
                moneyup += moneyup * 2;
                money -= upcost;
                upown += 1;
                upcost = upcost * 2;
                document.getElementById("upgrade").innerHTML =
                    addcomma(upown) + "👩‍🏭-Éxperts artificiers: " + addcomma(upcost) + " | Triple vos $/clique" ;

            } else if (upown <= 41) {
                moneyup += moneyup * 2;
                money -= upcost;
                upown += 1;
                upcost = upcost * 4;
                document.getElementById("upgrade").innerHTML =
                    addcomma(upown) + "👩‍🏭-Éxperts artificiers: " + addcomma(upcost)+ " | Triple vos $/clique" ;
            } else if (upown == 42) {
                moneyup = moneyup;
                upown = 42;
                document.getElementById("upgrade").innerHTML = "42" + "🧕-Éxperts artificiers: MAXXX | allah akbar  ";
                document.getElementById("total").innerHTML = "Budgets de production: " + addcomma(money) + " $";
            }
        }
    }
    document.getElementById("click").innerHTML =
        "$/clique: " + addcomma(moneyup) + " | $/sec: " + addcomma(msec);
    document.getElementById("total").innerHTML = "Budgets de production: " + addcomma(money) + " $";
}







