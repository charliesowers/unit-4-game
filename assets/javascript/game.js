$(document).ready(function() {

    var attackChosen = false;

    var defenseChosen = false;


    $(".character-window").on("click", function() {

      if(attackChosen === false){
        $("#attack-row").append($(this).detach());
        attackChosen = true;
      }
      else if(defenseChosen === false){
        $("#defend-row").append($(this).detach());
        defenseChosen = true;
      }
    });

    $("#attack-button").on("click", function() {

        if(attackChosen === true && defenseChosen === true){
            var attacker = $("#attack-row").children(".character-window");
            var defender = $("#defend-row").children(".character-window");

            var attackHP = parseInt(attacker.attr("hp")) - parseInt(defender.attr("counter"));
            var defendHP = parseInt(defender.attr("hp")) - parseInt(attacker.attr("attack"));
            var attack = parseInt(attacker.attr("attack")) + parseInt(attacker.attr("base-attack"));

            attacker.attr("hp", attackHP);
            attacker.children(".hp").text(attackHP);
            attacker.attr("attack", attack);

            defender.attr("hp", defendHP);
            defender.children(".hp").text(defendHP);

            
            if(attackHP <= 0){
                attacker.detach();
                attackChosen = false;
            }
            if(defendHP <= 0){
                defender.detach();
                defenseChosen = false;
            }    

        }
        
      });

  });