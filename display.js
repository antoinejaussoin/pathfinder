const minBy = require('lodash/minBy');
const find = require('lodash/find');
const numeral = require('numeral');
const { calculatePath, calculateDistance } = require('./pathFinder');

const f = n => numeral(n).format('0,0.00') + ' km';

const convertPath = (cities, names) => {
    const path = [];
    names.forEach(name => {
        path.push(find(cities, { name }))
    });
    return path;
}

const displaySummary = path => {
    console.log('Route summary: ');
    console.log(path.map(p => p.name).join(' --> '));
}

const displayRoute = path => {
    console.log('Start at ' + path[0].name);
    for (let i = 1; i < path.length; i++) {
        const from = path[i - 1];
        const to = path[i];
        const distance = f(calculateDistance(from, to));
        console.log('Then drive ' + distance + ' to ' + to.name);
    }
    console.log('and you arrive at your destination.');
}

const getTotalDistance = path => path.reduce((prev, cur, i) => {
    if (i == 0) {
        return 0;
    }
    return prev + calculateDistance(cur, path[i - 1]);
}, 0);

const findRoute = (cities, cityName1, cityName2) => {
    const city1 = find(cities, { name: cityName1 });
    const city2 = find(cities, { name: cityName2 });
    const pathNames = calculatePath(city1, city2);
    const path = convertPath(cities, pathNames);
    const straightLineDistance = calculateDistance(city1, city2);
    const roadDistance = getTotalDistance(path);

    console.log('------------------------------------------')
    console.log('To go from ' + cityName1 + ' to ' + cityName2+' :');
    displaySummary(path);
    console.log('');
    displayRoute(path);
    console.log('');
    console.log('Total Distance: ' + f(roadDistance));
    console.log('Straight Line Distance: ' + f(straightLineDistance));
    console.log('------------------------------------------')
}

module.exports = findRoute;