/*
    This file is part of Ironbane MMO.

    Ironbane MMO is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Ironbane MMO is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Ironbane MMO.  If not, see <http://www.gnu.org/licenses/>.
*/



 
var ToggleableObstacle = Train.extend({
    init: function(position, rotation, id, param, metadata) {	
                
        if ( showEditor && levelEditor.editorGUI.opShowDebug ) {
            this.drawNameMesh = true;
            this.overrideName = Math.abs(id);
        }

        this._super(position, rotation, id, param, metadata);

        this.on = metadata.on;
        

        this.maxSpeed = 5.0 * this.metadata.speedMultiplier;
        
  
//        (function(unit){
//            setTimeout(function(){unit.toggle(true);}, 5000);
//            setTimeout(function(){unit.toggle(false);}, 10000);
//        })(this);



    },  
    buildMesh: function(geometry) {          
        
        this._super(geometry);
        
       this.toggle(this.on);
        
        this.targetPosition = this.localPosition.clone();
        this.targetRotation = this.rotation.clone();
        
        
    },
    toggle: function(on) {
        this.on = on;
        
        var height = this.boundingBox.size.y * this.metadata.distanceMultiplier;
        var width = this.boundingBox.size.x * this.metadata.distanceMultiplier;
        var depth = this.boundingBox.size.z * this.metadata.distanceMultiplier;
        
        var mp = this.on ? 1 : 0;

        switch (this.movementType) {
            case ToggleableObstacleMovementTypeEnum.doorX:
                this.targetPosition.x = this.startPosition.x + width * mp;
                break;
            case ToggleableObstacleMovementTypeEnum.doorY:
                this.targetPosition.y = this.startPosition.y + height * mp;
                break;                
            case ToggleableObstacleMovementTypeEnum.doorZ:
                this.targetPosition.z = this.startPosition.z + depth * mp;
                break;                                  
        }
        
        
    },
    tick: function(dTime) {
        
        switch (this.movementType) {            
            case ToggleableObstacleMovementTypeEnum.switchVertical:
                this.changeRotation = true;
                break;                   
        }        
        
        
        // Move towards target position
        
        this._super(dTime);
        
        //this.updateRotation();
        
    }
});


