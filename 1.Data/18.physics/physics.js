function getAcceleration(value){
    let force ,mass, distance, finalVelocity, finalTime, time;

    force = value['f']
    mass = value.m
    distance = value.d
    finalVelocity = value.Δv
    time = value.t
    finalTime = value.Δt

    if (force && mass){
        return force/ mass
    } else if(finalVelocity && finalTime){
        return finalVelocity/finalTime
    }else if(distance && time){
        return (2 *distance) / (time * time)
    }
    return "impossible"
}