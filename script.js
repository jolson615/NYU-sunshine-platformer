console.log("loaded!")

const player = document.querySelector('#player')
const block = document.querySelector('#block');
const checkpoints = [document.querySelector('#checkpointOne'), document.querySelector('#checkpointTwo')]
var emitted = false;
const finalPlatform = document.querySelector('#finalPlatform');

var respawnPosition = "0 0 0";

player.addEventListener('collide', function (e) {
    // console.log(e.detail.body);
    
    if(e.detail.body.el.id === "death")
        respawn();
        
    if(e.detail.body.el.id === "checkpointOne"){
        e.detail.body.el.setAttribute("color", "#99E6B3")
        respawnPosition = "10 9 -21";
    }
    
    if(e.detail.body.el.id === "checkpointTwo"){
        e.detail.body.el.setAttribute("color", "#99E6B3")
        respawnPosition = "-10 9 -21";
    }
    
    if(checkpoints.every(function(value){
        return value.getAttribute("color") === "#99E6B3";
    }) && !emitted){
        finalPlatform.emit("solved");
        emitted = true;
    }
    
    if(e.detail.body.el.id === "goal"){
        console.log("winrar");
        resetWorld();
    }

    e.detail.target.el;  // Original entity (playerEl).
    e.detail.body.el;    // Other entity, which playerEl touched.
    e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
    e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
});

function respawn(){
    player.setAttribute("position", respawnPosition);
}

function resetWorld(){
    emitted = false;
    finalPlatform.emit("solved");
    checkpoints.forEach(function(value){
        value.setAttribute("color", "#e699d9");
    });
    respawnPosition = "0 0 0";
    respawn();
}
