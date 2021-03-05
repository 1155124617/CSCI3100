// JavaScript source code
var player = {
    HP: 100,
    MP: 100
}

function hurtClick() {
    player.HP = player.HP - 30;
    if (player.HP > 60) {
        document.getElementById("hp").style.color = "green";
        var c = document.getElementById("myCanvas");
        var cxt = c.getContext("2d");
        cxt.fillStyle = "green";
        cxt.fillRect(0, 0, 200, 200);
    }
    if (player.HP < 60 && player.HP > 30) {
        document.getElementById("hp").style.color = "yellow";
        var c = document.getElementById("myCanvas");
        var cxt = c.getContext("2d");
        cxt.fillStyle = "yellow";
        cxt.fillRect(0, 0, 200, 200);
    }
    if (player.HP <= 30 && player.HP > 0) {
        document.getElementById("hp").style.color = "red";
        var c = document.getElementById("myCanvas");
        var cxt = c.getContext("2d");
        cxt.fillStyle = "red";
        cxt.fillRect(0, 0, 200, 200);
    }
    if (player.HP <= 0) {
        document.getElementById("hp").style.color = "grey";
        var c = document.getElementById("myCanvas");
        var cxt = c.getContext("2d");
        cxt.fillStyle = "grey";
        cxt.fillRect(0, 0, 200, 200);
        GameOver();
    }
}
function GameOver() {
    alert("GameOver!");
}