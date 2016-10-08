const minBy = require('lodash/minBy');
const find = require('lodash/find');
const pathFinder = require('./display');

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


// findRoute('Marseille', 'Brest');
// findRoute('Marseille', 'Calais');
// findRoute('Langon', 'Compiègne');
pathFinder(cities, 'Calais', 'Nice');
pathFinder(cities, 'Calais', 'Boulogne');
pathFinder(cities, 'Paris', 'Montpellier');
// findRoute('Strasbourg', 'Langon');