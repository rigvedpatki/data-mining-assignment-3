const getWedges = (
  allEdges: number[][],
  reservoirEdges: number[][],
  limit: number
) => {
  let wedges: number[][] = [];
  allEdges.every((edgeA, i) => {
    let leave = true;
    reservoirEdges.every((edgeB, j) => {
      if (i !== j && i > j) {
        let [a, b] = edgeA;
        let [c, d] = edgeB;
        if (b === c && a !== d) {
          if (wedges.length <= limit) {
            wedges.push([a, c, d]);
            console.log(wedges.length);
          } else {
            leave = false;
            return false;
          }
        }
      }
      return true;
    });
    return leave;
  });

  return wedges;
};

export default getWedges;
