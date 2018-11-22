import config from './lib/config';
import { getDatasetFromStorage, storage } from './lib/storage';
import parseEdges from './lib/parse-edges';
import reservoirSampling from './lib/reservoir-sampling';

(async () => {
  try {
    const fileContent = await getDatasetFromStorage(
      config.BUCKET,
      config.DATASETS_METADATA[0],
      storage
    );
    const edges = parseEdges(fileContent);
    console.log(edges);
    const reservoirEdges = reservoirSampling(edges, 20000);
    console.log(reservoirEdges);
    let wedges: number[][] = [];
    edges.forEach((edgeA, i) => {
      edges.forEach((edgeB, j) => {
        if (i !== j && i > j) {
          let [a, b] = edgeA;
          let [c, d] = edgeB;
          if (b === c) {
            wedges.push([a, c, d]);
          }
        }
      });
    });
    console.log(wedges.length);
    console.log(wedges);
  } catch (error) {
    console.log(`Error : ${error}`);
  }
})();
