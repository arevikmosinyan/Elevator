let ElevatorsContainer = document.getElementById('ElevatorsContainer');
let singlefloorsContainer = document.getElementById('SinglefloorsContainer');
let elevators = [];
let floorNumber;



for(let i = 1; i <= 3; i++){
    let elevator = {
        id: i,
        position: 1,
        isMoving:false,
    };
    elevators.push(elevator);
    let singleElevator = document.createElement('div');
    singleElevator.textContent =  i;
    singleElevator.className = 'singleElevator';
    singleElevator.id = 'elevator' + i; 
    ElevatorsContainer.appendChild(singleElevator);
}

for(let i = 20; i >= 1; i--){
    let singlefloor = document.createElement('div');
    singlefloor.textContent = 'floor ' + i;
    singlefloor.className = 'singlefloor';
    singlefloorsContainer.appendChild(singlefloor);
    singlefloor.addEventListener('click',function(){
        floorNumber = i
        let closestElevatorId = findClosestElevator(floorNumber);
        moveElevator(floorNumber, closestElevatorId);   
    })
}

function findClosestElevator(floorNumber) {
    let minDistance = 21;
    let minDistanceAfterFiltering = minDistance
    let closestElevatorId ;
    let closestNotMovingElevatorId;
    for (let i = 0; i < elevators.length; i++) {
        let distance = Math.abs(elevators[i].position - floorNumber);
        if (distance < minDistance)  {
            minDistance = distance;
            closestElevatorId = elevators[i].id;
            if(!elevators[i].isMoving){
                closestNotMovingElevatorId = closestElevatorId
            } else {
                let elevatorsWithoutTheMovingOne = elevators.filter((el) => el.id !== closestElevatorId) 
                console.log(elevatorsWithoutTheMovingOne)
                for(let i = 0; i < elevatorsWithoutTheMovingOne.length; i++){
                 let distanceAfterFiltering = Math.abs(elevatorsWithoutTheMovingOne[i].position - floorNumber)
                    if(distanceAfterFiltering < minDistanceAfterFiltering) {
                        //console.log({name:'ani'})
                        closestNotMovingElevatorId = elevatorsWithoutTheMovingOne[i].id
                    }
                }
            }

            
        }
       
    }
    return closestNotMovingElevatorId
    
}


function moveElevator(floorNumber, elevatorId) {
    let elevator = elevators.find((el) => el.id === elevatorId);
     console.log(elevatorId + ' elevatorId')
    let floors = document.querySelectorAll('.singlefloor');
    let floor = floors[floors.length - floorNumber];
    elevator.isMoving = true;
    
    let floorTop = floor.offsetTop;
    if(floor){
        floorTop = floor.offsetTop
    } else {
        floorTop = 1
    }
       gsap.to('#elevator' + elevatorId, { top: floorTop , duration: 2, 
    onComplete: function () {
            // console.log(`Elevator ${elevatorId} has arrived at floor ${floorNumber}.`);
            // console.log(`before ::: elevator.position : ${elevator.position} // floorNumber: ${floorNumber} // elevator.isMoving : ${elevator.isMoving} .`);
            elevator.position = floorNumber; 
            elevator.isMoving = false;
            // console.log(`after ::: elevator.position : ${elevator.position} // floorNumber: ${floorNumber} // elevator.isMoving : ${elevator.isMoving} .`);
        }});
}
