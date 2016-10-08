const minBy = require('lodash/minBy');
const find = require('lodash/find');

const calculateDistance = (city1, city2) => {
    return Math.sqrt(Math.pow(city2.lat - city1.lat, 2) + Math.pow(city2.long - city1.long, 2));
}

const calculatePath = (start, goal) => {
    const closedSet = [];
    const openSet = [start];
    const cameFrom = {};

    const gScore = {};
    gScore[start] = 0;

    const fScore = {};
    fScore[start] = calculateDistance(start, goal);

    while (openSet.length) {
        let current = minFScore(openSet, goal);

        if (current === goal) {
            return reconstructPath(cameFrom, current);
        }

        remove(openSet, current);
        closedSet.push(current);

        current.neighbours.forEach(neighbour => {
            if (isIn(closedSet, neighbour)) {
                return;
            }

            const tentativeGScore = gScore[current] + calculateDistance(current, neighbour);

            if (!isIn(openSet, neighbour)) {
                openSet.push(neighbour);
            } else {
                return;
            }

            cameFrom[neighbour.name] = current.name;
            gScore[neighbour] = tentativeGScore;
            fScore[neighbour] = gScore[neighbour] + calculateDistance(neighbour, goal);

        });
    }
}

const reconstructPath = (cameFrom, current) => {
    const totalPath = [current.name];
    let cur = current.name;
    while (cameFrom[cur]) {
        cur = cameFrom[cur];
        totalPath.splice(0, 0, cur);
    }
    
    return totalPath;
}

const minFScore = (cities, goal) => minBy(cities, c => calculateDistance(c, goal));

const remove = (array, item) => {
    const index = array.indexOf(item);
    array.splice(index, 1);
}
const isIn = (array, item) => array.indexOf(item) !== -1;

module.exports = {
    calculatePath,
    calculateDistance
}