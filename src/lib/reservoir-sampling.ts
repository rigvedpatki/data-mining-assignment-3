const reservoirSampling = (edges: number[][], k: number) => {
  let reservoir: number[][] = [];
  for (let i = 0; i < k; i++) {
    reservoir[i] = edges[i];
    while (i < edges.length) {
      let j = randomIntInRange(0, i, true);
      if (j < k) {
        reservoir[j] = edges[i];
      }
      i++;
    }
  }
  return reservoir;
};

const randomIntInRange = (min: number, max: number, inclusive: boolean) => {
  const range = max - min + (inclusive ? 1 : 0);
  return Math.trunc(Math.random() * range + min);
};
export default reservoirSampling;
