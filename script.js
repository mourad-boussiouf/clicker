money = 0;
moneyup = 1;
msec = 0;
upcost = 10;
carcost = 25;
helicost = 10000;
upown = 0;
carown = 0;
heliown = 0;
caradd = 1;
heliadd = 20;
cboost = 1;
hboost = 50;
carmax = 0;
helimax = 0;
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
    document.getElementById("car").innerHTML =
        carown + "🚓-Voiture: " + addcomma(carcost) + " | +" + addcomma(caradd) + "/sec";
    if (heliown > 1){
        document.getElementById("heli").innerHTML =
            heliown + "🚁-Hélicoptères: " + addcomma(helicost) + " | +" + addcomma(heliadd) + "/sec";
    }
    else if (heliown < 1){
        document.getElementById("heli").innerHTML =
            heliown + "🚁-Hélicoptère: " + addcomma(helicost) + " | +" + "2000" + "/sec";
    }
    document.getElementById("upgrade").innerHTML =
        addcomma(upown) + "👷‍♀️0-Artificier: " + addcomma(upcost) + "| Double vos $/clique";

// si la partie est reload, il faut rafraichir l'affichage en adéquation avec les données de la sauvegarde
    //PARTIE VOITURES
    if (carown <= 1) {
        document.getElementById("car").innerHTML =
            carown + "🚓-Voiture: " + addcomma(carcost) + " | +" + addcomma(caradd * cboost) + "/sec";
    }
    else {
        document.getElementById("car").innerHTML =
            carown + "🚓-Voitures: " + addcomma(carcost) + " | +" + addcomma(caradd * cboost) + "/sec";

        if(carown > 7 && carown < 23 ){
            document.getElementById("car").innerHTML =
                carown + "🚛-Camions: " + addcomma(carcost) + " | +" + addcomma(caradd * cboost) + "/sec";}

        if(carown >= 22 && carown < 30){
            document.getElementById("car").innerHTML =
                carown + "🚂-Locomotives: " + addcomma(carcost) + " | +" + addcomma(caradd * cboost) + "/sec";}

        else if(carown > 29) {
            document.getElementById("car").innerHTML =
                carown + "🛸-Soucoupes volantes: " + addcomma(carcost) + " | +" + addcomma(caradd * cboost) + "/sec"; }

    }
    //PARTIE HELICO
    if (heliown <= 1 && heliown != 23) {
        document.getElementById("heli").innerHTML =
            heliown + "🚁-Hélicoptère: " + addcomma(helicost) + " | +" + addcomma(heliadd * hboost) + "/sec";
    }
    else {
        if (heliown != 23){
            document.getElementById("heli").innerHTML =
                heliown + "🚁-Hélicoptères: " + addcomma(helicost) + " | +" + addcomma(heliadd * hboost) + "/sec";}

        if(heliown > 12 && heliown < 21 ){
            document.getElementById("heli").innerHTML =
                heliown + "🛩️-Avions: " + addcomma(helicost) + " | +" + addcomma(heliadd * hboost) + "/sec";}

        else if(heliown > 20 && heliown != 23){
            document.getElementById("heli").innerHTML =
                heliown + "🚀-Fusée: " + addcomma(helicost) + " | +" + addcomma(heliadd * hboost) + "/sec";}
    }

    //PARTIE ARTIFICERS DANS CLICKED FUNCTION
}

//sauvegarde la partie
function save() {
    localStorage.setItem("money", money);
    localStorage.setItem("moneyup", moneyup);
    localStorage.setItem("msec", msec);
    localStorage.setItem("upcost", upcost);
    localStorage.setItem("carcost", carcost);
    localStorage.setItem("caradd", caradd);
    localStorage.setItem("helicost", helicost);
    localStorage.setItem("heliadd", heliadd);
    localStorage.setItem("carown", carown);
    localStorage.setItem("heliown", heliown);
    localStorage.setItem("upown", upown);
    localStorage.setItem("caradd", caradd);
    localStorage.setItem("heliadd", heliadd);
    localStorage.setItem("cboost", cboost);
    localStorage.setItem("hboost", hboost);
    localStorage.setItem("carmax", carmax);
    localStorage.setItem("helimax", helimax);
}
//loads save file
function load() {
    money = parseInt(localStorage.getItem("money"));
    moneyup = parseInt(localStorage.getItem("moneyup"));
    msec = parseInt(localStorage.getItem("msec"));
    upcost = parseInt(localStorage.getItem("upcost"));
    carcost = parseInt(localStorage.getItem("carcost"));
    upown = parseInt(localStorage.getItem("caradd"));
    helicost = parseInt(localStorage.getItem("helicost"));
    upown = parseInt(localStorage.getItem("heliadd"));
    carown = parseInt(localStorage.getItem("carown"));
    heliown = parseInt(localStorage.getItem("heliown"));
    upown = parseInt(localStorage.getItem("upown"));
    caradd = parseInt(localStorage.getItem("caradd"));
    heliadd = parseInt(localStorage.getItem("heliadd"));
    cboost = parseInt(localStorage.getItem("cboost"));
    hboost = parseInt(localStorage.getItem("hboost"));
    carmax = parseInt(localStorage.getItem("carmax"));
    helimax = parseInt(localStorage.getItem("helimax"));

    reloadall();
}

//Réinitialise toutes les metrics du programme
function reset() {
    if (confirm("Votre progression sera perdue pour toujours. Veuillez confirmer O/N") === true) {
        money = 0;
        moneyup = 1;
        msec = 0;
        upcost = 10;
        carcost = 25;
        helicost = 10000;
        carown = 0;
        heliown = 0;
        upown = 0;
        caradd = 1;
        heliadd = 20;
        reloadall();
    }
}

//fonction qui s'active tous les secs 166
function myTimer() {
    money += msec;
    document.getElementById("total").innerHTML = "Budgets de production: " + addcomma(money) + " $";
    document.getElementById("total2").innerHTML = "Budgets de production: " + addcomma(money) + " $";

    if (heliown == 23) {
        document.getElementById("heli").innerHTML = "23" + "🚀-Fusée: MAX | +35% de co2 :( ";}

    if (carown == 32) {
        document.getElementById("car").innerHTML =
            "32" + "🛸-Soucoupes volantes: MAX | + 42M$/clique";}

    if (upown == 42) {
        document.getElementById("upgrade").innerHTML = "42" + "🧕-Éxperts artificiers: MAX | +70% ninja vibe";
        document.getElementById("instructions").innerHTML = "<h2>GAME OVER , FÉLICITATION VOUS AVEZ GAGNÉ LA PARTIE !</h2>";
    }


    if (upown == 20) {
        document.getElementById("upgrade").innerHTML =
            addcomma(upown) + "👩‍🏭-Éxperts artificiers: " + addcomma(upcost) + " | Triple vos $/clique" ;
        }
    
}

setInterval(myTimer, 1000);


//l'utilisateur clique sur l'image
function clicked() {

    money+=moneyup;
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
                "Mais c'est encore insuffisant pour monter vos artificers level 42...");
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
    if (name == "clicker car") {

        if (money >= carcost && carown <= 31) {
            if (carown <= 6) {
                msec += 10 * caradd;
                caradd++;
                cboost = 10;
            } else if (carown == 7) {
                msec += 10 * caradd;
                caradd++;
                cboost = 400;
            } else if (carown <= 12) {
                msec += 400 * caradd;
                caradd++;
                cboost = 400;
            } else if (carown == 13) {
                msec += 400 * caradd;
                caradd++;
                cboost = 6000;
            } else if (carown <= 20) {
                msec += 6000 * caradd;
                caradd++;
                cboost = 6000;
            } else if (carown == 21) {
                msec += 6000 * caradd;
                caradd++;
                cboost = 130000; }
            else if (carown <= 28) {
                msec += 130000 * caradd;
                caradd++;
                cboost = 130000;}
            else if (carown == 29) {
                msec += 130000 * caradd;
                caradd++;
                cboost = 800000;}
            else if (carown <= 30) {
                msec += 800000 * caradd;
                caradd++;
                cboost = 800000;}
            else if (carown == 31 ) {
                msec += 800000 * caradd;
                caradd++;
                cboost = 4000000;}
            else {
                msec += 4000000 * caradd;
                caradd++;
                cboost = 4000000;
            }
            carown += 1;
            money -= carcost;
            carcost = carcost * 2;



            if (carown <= 1) {
                document.getElementById("car").innerHTML =
                    carown + "🚓-Voiture: " + addcomma(carcost) + " | +" + addcomma(caradd * cboost) + "/sec";
            }
            else {
                document.getElementById("car").innerHTML =
                    carown + "🚓-Voitures: " + addcomma(carcost) + " | +" + addcomma(caradd * cboost) + "/sec";

                if(carown > 7 && carown < 23 ){
                    document.getElementById("car").innerHTML =
                        carown + "🚛-Camions: " + addcomma(carcost) + " | +" + addcomma(caradd * cboost) + "/sec";}

                if(carown >= 22 && carown < 30){
                    document.getElementById("car").innerHTML =
                        carown + "🚂-Locomotives: " + addcomma(carcost) + " | +" + addcomma(caradd * cboost) + "/sec";}

                else if(carown > 29 && carown != 32) {
                    document.getElementById("car").innerHTML =
                        carown + "🛸-Soucoupes volantes: " + addcomma(carcost) + " | +" + addcomma(caradd * cboost) + "/sec"; }

                else if (carown == 32) {
                    document.getElementById("car").innerHTML =
                    "32" + "🛸-Soucoupes volantes: MAX | + 42M$/clique";
                    
                    moneyup += 42000000;
                        }

            }

     
        }

    }

    if (name == "heli") {

        if (money >= helicost && heliown <= 22) {

            if (heliown <= 5) {
                msec += 100 * heliadd;
                heliadd++;
                hboost = 100;
            } else if (heliown == 6) {
                msec += 100 * heliadd;
                heliadd++;
                hboost = 15000;
            } else if (heliown <= 11) {
                msec += 15000 * heliadd;
                heliadd++;
                hboost = 15000;
            } else if (heliown == 12) {
                msec += 15000 * heliadd;
                heliadd++;
                hboost = 150000;
            } else if (heliown <= 20) {
                msec += 150000 * heliadd;
                heliadd++;
                hboost = 150000;
            } else if (heliown == 21) {
                msec += 150000 * heliadd;
                heliadd++;
                hboost = 3000000;
            } else if (heliown <= 22) {
                msec += 3000000 * heliadd;
                heliadd++;
                hboost = 3000000;
            } else if (heliown == 22) {
                msec += 3000000 * heliadd;
                heliadd++;
                hboost = 5000000;
            }
             else {
                msec += 5000000 * heliadd;
                heliadd++;
                hboost = 5000000;

            }
            heliown += 1;
            money -= helicost;
            helicost = helicost * 2;

            if (heliown <= 1 && heliown != 23) {
                document.getElementById("heli").innerHTML =
                    heliown + "🚁-Hélicoptère: " + addcomma(helicost) + " | +" + addcomma(heliadd * hboost) + "/sec";
            }
            else {
                if (heliown != 23){
                document.getElementById("heli").innerHTML =
                    heliown + "🚁-Hélicoptères: " + addcomma(helicost) + " | +" + addcomma(heliadd * hboost) + "/sec";}

                if(heliown > 12 && heliown <= 21 ){
                document.getElementById("heli").innerHTML =
                    heliown + "🛩️-Avions: " + addcomma(helicost) + " | +" + addcomma(heliadd * hboost) + "/sec";}

                else if(heliown > 21 && heliown != 23){
                    document.getElementById("heli").innerHTML =
                        heliown + "🚀-Fusée: " + addcomma(helicost) + " | +" + addcomma(heliadd * hboost) + "/sec";}
            }



        }
        else if (heliown == 23) {
            document.getElementById("heli").innerHTML = "23" + "🚀-Fusée: MAX | +35% de co2 :( ";
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







