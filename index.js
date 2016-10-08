const minBy = require('lodash/minBy');
const find = require('lodash/find');

const cities = [];
cities.push({ name: "Calais", long: 3, lat: 3, neighbours: ["Boulogne","Dunkerque"] });
cities.push({ name: "Dunkerque", long: 4, lat: 7, neighbours: ["Calais","Arras"] });
cities.push({ name: "Arras", long: 5, lat: 10, neighbours: ["Dunkerque","Boulogne","Compiègne","Reims"] });
cities.push({ name: "Boulogne", long: 6, lat: 4, neighbours: ["Calais","Arras","Compiègne","Roubais"] });
cities.push({ name: "Compiègne", long: 8, lat: 8, neighbours: ["Roubais","Boulogne","Arras"] });
cities.push({ name: "Roubais", long: 9, lat: 6, neighbours: ["Boulogne","Compiègne","Paris"] });
cities.push({ name: "Reims", long: 9, lat: 13, neighbours: ["Arras","Paris","Strasbourg"] });
cities.push({ name: "Paris", long: 11, lat: 9, neighbours: ["Roubais","Brest","Reims","Strasbourg","Clermont","Poitier"] });
cities.push({ name: "Brest", long: 11, lat: 3, neighbours: ["Paris","Poitier"] });
cities.push({ name: "Strasbourg", long: 11, lat: 15, neighbours: ["Reims","Paris","Dijon"] });
cities.push({ name: "Poitier", long: 14, lat: 6, neighbours: ["Brest","Paris","Clermont","Bordeaux"] });
cities.push({ name: "Dijon", long: 14, lat: 14, neighbours: ["Strasbourg","Clermont","Lyon"] });
cities.push({ name: "Clermont", long: 16, lat: 9, neighbours: ["Poitier","Paris","Dijon","Lyon","Montpellier"] });
cities.push({ name: "Lyon", long: 17, lat: 14, neighbours: ["Dijon","Clermont","Marseille","Nice"] });
cities.push({ name: "Bordeaux", long: 18, lat: 3, neighbours: ["Poitier","Langon"] });
cities.push({ name: "Langon", long: 20, lat: 6, neighbours: ["Bordeaux","Montpellier"] });
cities.push({ name: "Marseille", long: 23, lat: 13, neighbours: ["Montpellier","Nice","Lyon"] });
cities.push({ name: "Nice", long: 23, lat: 17, neighbours: ["Lyon","Marseille"] });
cities.push({ name: "Montpellier", long: 24, lat: 9, neighbours: ["Langon","Clermont","Marseille"] });

cities.forEach(city => {
    const names = city.neighbours;
    city.neighbours = [];
    names.forEach(name => {
        city.neighbours.push(find(cities, { name }));
    });
});

console.log('We have ' + cities.length + ' cities');

const calculateDistance = (city1, city2) => {
    return Math.sqrt(Math.pow(city2.lat - city1.lat, 2) + Math.pow(city2.long - city1.long, 2));
}

console.log('Calais Dunkerque: ', calculateDistance(cities[0], cities[1]));
console.log('Marseille Dunkerque: ', calculateDistance(cities[16], cities[1]));

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

const findRoute = (cityName1, cityName2) => {
    const city1 = find(cities, { name: cityName1});
    const city2 = find(cities, { name: cityName2});
    const path = calculatePath(city1, city2);

    console.log('------------------------------------------')
    console.log('To go from ' + cityName1 + ' to ' + cityName2+' :');
    console.log(path.join(' --> '));
    console.log('------------------------------------------')
}

// findRoute('Marseille', 'Brest');
// findRoute('Marseille', 'Calais');
// findRoute('Langon', 'Compiègne');
findRoute('Calais', 'Nice');
// findRoute('Strasbourg', 'Langon');