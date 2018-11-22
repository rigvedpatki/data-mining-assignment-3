const parseEdges = (fileContent: string) => {
  let edges: number[][] = [];

  let lines = fileContent.split('\n');

  lines = lines.filter(line => !line.startsWith('#'));

  lines.forEach(line => {
    let [to, from] = line.split('\t');
    edges.push([parseInt(to), parseInt(from)]);
  });

  edges = edges.slice(0, -1);

  return edges;
};

export default parseEdges;
