$(document).ready(function() {

    var attackChosen;
    var defenseChosen;

    var resetButton = $("<button>");
    resetButton.text("Reset");
    resetButton.attr("id", "reset-button");
    resetButton.attr("class", "btn btn-success")
    resetButton.on("click", function() {
        console.log("reset");
        $(this).detach();
        $("#attack-row").empty();
        $("#attack-row").html("<h2>ATTACKER:</h2>");
        $("#defend-row").html("<h2>DEFENDER:</h2>");
        startGame();
    });

    function createCharacter(name, hp, base, counter, img){
        var character = $("<div>");
        character.attr("class", "character-window");
        character.attr('hp', hp);
        character.attr('base-attack', base);
        character.attr('attack', base);
        character.attr('counter', counter);
        character.html(name + "<br>");

        var charImg = $("<img>");
        charImg.attr("src", img);
        charImg.attr("alt", "Image not Found");
        charImg.attr("class", "character-image");
        character.append(charImg);

        var hpdiv = $("<div>");
        hpdiv.attr("class", "hp");
        hpdiv.text(hp);
        character.append(hpdiv);

        character.on("click", function() {

            if(attackChosen === false){
              $("#attack-row").append($(this).detach());
              $(this).attr("id", "attacker");
              attackChosen = true;
            }
            else if(defenseChosen === false){
              $("#defend-row").append($(this).detach());
              $(this).attr("id", "defender");
              defenseChosen = true;
            }
        });

        $("#options-row").append(character);
    }

    function startGame(){
        createCharacter("KIT FISTO", 140, 15, 15, "./assets/images/Kit_Fisto.png");
        createCharacter("ASAJJ VENTRESS", 100, 20, 25, "./assets/images/Asajj_Ventress.png");
        createCharacter("PONG KRELL", 170, 10, 10, "./assets/images/Pong_Krell.png");
        createCharacter("AHSOKA TANO", 80, 50, 30, "./assets/images/Ahsoka_Tano.png");

        attackChosen = false;
        defenseChosen = false;
    }

    startGame();

    $("#attack-button").on("click", function() {

        if(attackChosen === true && defenseChosen === true){
            var attacker = $("#attacker");
            var defender = $("#defender");

            var attackHP = parseInt(attacker.attr("hp")) - parseInt(defender.attr("counter"));
            var defendHP = parseInt(defender.attr("hp")) - parseInt(attacker.attr("attack"));
            var attack = parseInt(attacker.attr("attack")) + parseInt(attacker.attr("base-attack"));

            attacker.attr("hp", attackHP);
            attacker.children(".hp").text(attackHP);
            attacker.attr("attack", attack);

            defender.attr("hp", defendHP);
            defender.children(".hp").text(defendHP);

            
            if(attackHP <= 0){
                $("#attack-row").empty();
                $("#defend-row").empty();
                $("#options-row").empty();
                $("#attack-row").text("You Died. Press Reset to play again!".toUpperCase());
                $("#button-row").append(resetButton);

            }
            if(defendHP <= 0){
                defender.detach();
                defenseChosen = false;
                if($(".character-window").length === 1){
                    $("#attack-row").empty();
                    $("#defend-row").empty();
                    $("#options-row").empty();
                    $("#attack-row").text("You Won! Press Reset to play again!".toUpperCase());
                    $("#button-row").append(resetButton);
                }
            }    

        }
        
    });

});