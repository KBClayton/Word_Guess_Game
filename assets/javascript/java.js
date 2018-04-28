$(document).ready(function() {
    var wins = 0;
    var losses = 0;
    var rguess = 0;
    var main = $("body");
    var userguesses=[];
    var dword=[];
    var tword=[];
    var userguess="";
    var wdictionary=["Mario", "Luigi", "Peach", "Toad", "Yoshi", "Wario", "Bowser"]
    var winaudio = document.createElement("audio");
    winaudio.setAttribute("src", "assets/sounds/win.mp3");
    var lossaudio = document.createElement("audio");
    lossaudio.setAttribute("src", "assets/sounds/loss.mp3");
    var wmaker = 0;
    var dstring="";
    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
    "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    

    var game = {
        checkval: function () {
            if(alphabet.indexOf(userguess.toLowerCase()) > -1){
                return true;
            }
            else {
                console.log("Choose a value between A-Z");
            }
        },
        checkprev: function () {
            if (userguesses.indexOf(userguess) > -1){
                console.log("You already chose that letter");
                return false;
            }
            else{
                return true;
            }

        },
        checkword: function () {
            userguesses.push(userguess);
            rguess--;
            if ( tword.indexOf(userguess) > -1){
                for(var i=0; i<tword.length; i++){
                    if (userguess==tword[i]){
                        dword[i]=tword[i];
                    }
                }
            }
            else if (tword.indexOf(userguess) == -1){
                console.log("wrong")
            }

        },
        newword: function () {
            rguess = 12;
            userguesses=[];
            userguess="";
            dword.length=0;
            tword.length=0;
            wmaker=Math.floor(Math.random() * wdictionary.length);
            for (var i1=0; i1<wdictionary[wmaker].length; i1++){
                tword.push(wdictionary[wmaker][i1].toUpperCase());
            };
            for (var i=0; i< tword.length; i++){
              dword.push("_");
           };
        },
        winloss: function winloss() {
            var is_same = (dword.length == tword.length) && dword.every(function(element, index) {
                return element === tword[index]; 
            });
            if (is_same){
                return true;
            }
            else {
                return false;
            }
            
        }
    }
//firstrun on scoreboard, initialize game
    game.newword();
    dstring="";
    for ( var i=0; i<dword.length; i++){
        dstring=dstring+dword[i]+" "
    };
    ldisplay.textContent=dstring;
//main running
    $(document).keyup(function(e) {
        userguess= event.key;
        userguess=userguess.toUpperCase();
        while(game.checkval() && game.checkprev() && rguess>0 && game.winloss!=true){
                    game.checkword();
                    dstring="";
                    for ( var i=0; i<dword.length; i++){
                        dstring=dstring+dword[i]+" "
                    };
                    ldisplay.textContent=dstring;
                    guesses.textContent=userguesses;
                    rguesses.textContent=rguess;
                    console.log(wmaker);
            }
        while(rguess==0 || game.winloss()){
            if (game.winloss()){
                wins++;
                winaudio.play();
            }
            else{
                losses++;
                lossaudio.play();
                }
            console.log(wmaker);
            switch (wmaker){
                case 0:
                     $("div.pics").html("<img src='assets/images/mario.png'>");
                     break;
                case 1:
                     $("div.pics").html("<img src='assets/images/luigi.png'>");
                     break;
                case 2: 
                    $("div.pics").html("<img src='assets/images/peach.png'>");
                    break;
                case 3: 
                    $("div.pics").html("<img src='assets/images/toad.png'>");
                    break;
                case 4: 
                    $("div.pics").html("<img src='assets/images/yoshi.png'>");
                    break;
                case 5: 
                    $("div.pics").html("<img src='assets/images/wario.png'>");
                    break;
                case 6: 
                    $("div.pics").html("<img src='assets/images/bowser.png'>");
                    break;
                default: break;
            }
            //reseting game
            pword.textContent = wdictionary[wmaker];
            game.newword();
            wtext.textContent = wins;
            ltext.textContent = losses;
            dstring="";
            for ( var i=0; i<dword.length; i++){
                dstring=dstring+dword[i]+" "
            };
            ldisplay.textContent=dstring;

        }
    });
})