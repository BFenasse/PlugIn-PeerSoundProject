var ongl = document.getElementById("btn");
if (ongl)
    ongl.addEventListener("click", newTab);

function newTab(fenetre, tab) { //check sur quelle page nous sommes si c'est youtube la dupliquer sinon alert l'url de la page
    if (!fenetre) // premier appel : aucun paramètre existant
    {
        chrome.windows.getLastFocused(function(fenetre) { newTab(fenetre); }); //on demande la fenêtre visible
    } else {
        if (!tab) // deuxième appel : 1 paramètre existant (fenetre)
        {
            chrome.tabs.getSelected(fenetre.id, function(tab) { newTab(fenetre, tab); }); //on demande la fenêtre visible, et on appelle la fonction une deuxième fois
        } else // troisième appel : 2 paramètres existants (fenetre et tab)
        {
            url = tab.url;
            if (url.indexOf("youtube") != -1) {
                //chrome.tabs.create({ url: tab.url });
                takePhoto(tab, null);
            } else
                alert(tab.url);
        }
    }
}

function takePhoto(tab, adresse) { // l'adresse est l'url de la tab a screenshot 
    if (!adresse) {
        chrome.tabs.captureVisibleTab(tab.windowId, null, function(adresse) { takePhoto(tab, adresse); });
    } else {
        localStorage['musique'] = tab.url;
        //  var img = "";
        //    img = '<img src="' + adresse + '" alt="riendutout"/>';
        //alert(img);
        document.location.href = "addMusic.html";
        //        document.getElementById("conteneur").innerHTML = tab.url; //'<img href="' + adresse + '" alt="riendutout"/>';
    }
}




//window.addEventListener('click', enregistrer);
function createCookie(name, value, days) {
    var date = new Date();
    //récupérer la date d'aujourd'ui
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    //récupérer la date d'expiration en millisecondes
    var expires = ";expires=" + date.toGMTString();
    //date a maintenant pour valeur la date en millisecondes à laquelle le cookie doit expirer 
    document.cookie = name + "=" + value + expires + "; path=/";
    //envoi le cookie a firefox
    console.log("document cookie :" + document.cookie);
    //affiche le cookie envoyé
}

function readCookie(name) {
    var nameCookie = name + "=";
    //recherche le nom du cookie
    var TabCookie = document.cookie.split(';');
    //va récupéprer tout les cookie séparé par un ';'
    for (var i = 0; i < TabCookie.length; i++) {
        //parcoure le tableau des différents cookie
        var cookie = TabCookie[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
            //suprime les espaces
        }
        if (cookie.indexOf(nameCookie) == 0)
        //si il trouve un cookie correspondant au nom
            return cookie.substring(nameCookie.length, cookie.length);
        // le retourne
    }
    return null;
}
window.addEventListener('load', Onload);

function Onload() {
    var objUser = JSON.parse(readCookie("userPlugin"));
    document.getElementById("name").innerHTML = objUser.name;
}
var deconnect = document.getElementById("deconnect")
if (deconnect)
    deconnect.addEventListener("click", deconnection);

function deconnection() {
    createCookie("userPlugin", "", -1);
    document.location.href = "dire_bonjour.html";
}
/*
var registered = document.getElementById("register")
if (registered)
    registered.addEventListener("click", enregistrer);

function restaurerLesOptions() //resélectionner les options déja choisies
{
    alert("restauration");
    document.getElementById('nom').value = localStorage['nom']; //remplissage du champs de nom
    var couleur = localStorage['couleur']; //sélection de la liste déroulante de couleur (un peu plus dur)
    if (!couleur) {
        return;
    }
    var choix = document.getElementById('couleur').getElementsByTagName('option');
    for (var i = 0; i < choix.length; i++) {
        if (choix[i].value == couleur) {
            choix[i].selected = "true";
            break;
        }
    }
}

function enregistrer() //enregistrer les options, fonction appelée par le click sur le bouton
{
    alert("enregistrer");
    localStorage['nom'] = document.getElementById('nom').value;
    localStorage['couleur'] = document.getElementById('couleur').value;
}*/
/*
var player;

function onYouTubeIframeAPIReady() {
    console.log("tetstet");
    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: 'Xa0Q0J5tOP0',
        playerVars: {
            color: 'white',
            playlist: 'taJ60kskkns,FG0fTKAqZ5g'
        },
        events: {
            onReady: initialize
        }
    });
}

function initialize() {

    // Update the controls on load
    updateTimerDisplay();
    updateProgressBar();

    // Clear any old interval.
    clearInterval(time_update_interval);

    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval(function() {
        updateTimerDisplay();
        updateProgressBar();
    }, 1000)

}
window.addEventListener('load', onYouTubeIframeAPIReady);*/