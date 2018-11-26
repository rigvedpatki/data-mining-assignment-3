const parseEdges = (fileContent: string, fileName: string) => {
  let edges: number[][] = [];

  let lines = fileContent.split('\n');

  lines = lines.filter(line => !line.startsWith('#'));

  lines.forEach(line => {
    if (
      fileName === 'email-Eu-core.txt' ||
      fileName === 'facebook_combined.txt'
    ) {
      let [to, from] = line.split(' ');
      edges.push([parseInt(to), parseInt(from)]);
    } else {
      let [to, from] = line.split('\t');
      edges.push([parseInt(to), parseInt(from)]);
    }
  });

  edges = edges.slice(0, -1);

  return edges;
};

export default parseEdges;
