const { parse } = require('csv-parse')
const fs = require('fs')

const habitablePlanets = []

const isHabitablePlanet = (planet) => {
	return (
		(planet['koi_disposition'] === 'CONFIRMED' &&
			planet['koi_insol'] > 0.36 &&
			planet['koi_insol'] < 1.11 &&
			planet['koi_prad'] < 1.6) ||
		planet['koi_srad'] > 100
	)
}

fs.createReadStream('kepler_data.csv')
	.pipe(
		parse({
			comment: '#',
			columns: true,
		})
	)
	.on('data', (data) => {
		if (isHabitablePlanet(data)) {
			habitablePlanets.push(data)
		}
	})
	.on('error', (err) => {
		console.error(err)
	})
	.on('end', () => {
		console.log(
			habitablePlanets.map((planet) => {
				return planet['kepler_name']
			})
		)
		console.log(`${habitablePlanets.length} habitable planets found!`)
	})





const undirectedPath = (edges, nodeA, nodeB) => {
	const graph = buildGraph(edges)
  return hasPath( graph, nodeA, nodeB, new Set())
}

hasPath = (graph, src, distanation, visited) => {

  if (visited.has(src)){
    return false
  }
  visited.add(src)
  if (src === distanation){
    return true
  }
  for (const neighbor of graph[src]){
    hasPath( graph, neighbor, distanation, visited) === true  ?  true : false
  }
}

const buildGraph = (edges) => {
	const graph = {}

	for (const edge in edges) {
		const [a, b] = edge
		if (!a in graph) {
			graph[a] = []
		}
		if (!b in graph) {
			graph[b] = []
		}
    graph[a].push(b)
    graph[b].push(a)
 

    return graph
	}
}
