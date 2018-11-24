import config from './lib/config';
import { getDatasetFromStorage, storage } from './lib/storage';
import parseEdges from './lib/parse-edges';
import reservoirSampling from './lib/reservoir-sampling';
import getWedges from './lib/get-wedges';
import { randomIntInRange } from './lib/reservoir-sampling';

(async () => {
  try {
    config.DATASETS_METADATA.forEach(async dataset => {
      console.log(`Starting for ${dataset} ...`);
      console.time(`${dataset}`);

      console.time(`${dataset} -- load-time`);
      const fileContent = await getDatasetFromStorage(
        config.BUCKET,
        dataset,
        storage
      );
      console.timeLog(`${dataset} -- load-time`);
      console.time(`${dataset} -- parse-file`);
      const edges = parseEdges(fileContent);
      console.timeLog(`${dataset} -- parse-file`);

      let edges_reservoir = new Array<number[]>();
      let wedges_reservoir = new Array<number[]>();
      let P,
        Kt,
        Tt: number = 0;
      console.time(`${dataset} -- edge-reservoir-sampling`);
      edges_reservoir = reservoirSampling(edges, config.LIMIT);
      console.timeLog(`${dataset} -- edge-reservoir-sampling`);

      // console.log(edges_reservoir);

      console.time(`${dataset} -- wedge-reservoir-sampling`);
      wedges_reservoir = getWedges(edges, edges_reservoir, config.LIMIT);
      console.timeLog(`${dataset} -- wedge-reservoir-sampling`);

      // console.log(wedges_reservoir);

      let isClosed = new Array<boolean>(wedges_reservoir.length).fill(false);
      // console.log(wedges_reservoir);
      let total_wedges = wedges_reservoir.length;
      // console.log(total_wedges);

      console.time(`${dataset} -- algorithm-started`);
      edges_reservoir.forEach((edgeT, t) => {
        let [a, b] = edgeT;
        // console.log(`In all Edges, for t = ${t} edge = ${JSON.stringify(edgeT)}`);
        wedges_reservoir.forEach((wedge, i) => {
          // console.log(
          //   `In all Reservoir of wedges, for i = ${i} edge = ${JSON.stringify(
          //     wedge
          //   )}`
          // );
          let [c, d, e] = wedge;

          if ((a === c && b === e) || (b === c && a === e)) {
            // console.log(`${a},${b}  : ${c},${d},${e}`);
            isClosed[i] = true;
            // console.log(isClosed[i]);
          }
        });

        let edges_reservoir_updated = edges_reservoir;
        let update = {
          updated: false,
          index: -1,
          edge: Array<number>()
        };
        edges_reservoir.every((edgeI, i) => {
          let x = Math.random();
          // console.log(`Comparing value x = ${x} and ${1 / (t + 1)} `);
          if (x <= 1 / t) {
            // console.log(`Edges Reservior Updated ...`);
            update = {
              updated: true,
              index: i,
              edge: edgeI
            };
            edges_reservoir_updated[i] = edgeT;

            return false;
          }
          return true;
        });
        // console.log(`Updated : ${JSON.stringify(update)}`);
        if (update.updated) {
          // console.log(`Edges Reservior Updated continuous ...`);
          //! remove wedges that contain updated edge
          let new_wedges_reservoir = wedges_reservoir.filter(wedge => {
            let [a, b, c] = wedge;
            let [d, e] = update.edge;
            if ((a === d && c === e) || (a === e && c === d)) {
              return false;
            } else {
              return true;
            }
          });
          total_wedges = new_wedges_reservoir.length;
          //! include the wedges containing edgeT
          const new_wedges_reservoir_conatining_edgeT = new_wedges_reservoir.filter(
            wedge => {
              let [a, b, c] = wedge;
              let [d, e] = edgeT;
              if ((a === d && c === e) || (a === e && c === d)) {
                return true;
              } else {
                return false;
              }
            }
          );
          wedges_reservoir.forEach((wedge, i) => {
            let x = Math.random();
            if (
              x <=
              new_wedges_reservoir_conatining_edgeT.length / total_wedges
            ) {
              const y = randomIntInRange(
                0,
                new_wedges_reservoir_conatining_edgeT.length,
                false
              );
              wedges_reservoir[i] = new_wedges_reservoir_conatining_edgeT[y];
              isClosed[i] = false;
            }
          });
        }
      });
      console.timeLog(`${dataset} -- algorithm-started`);
      let isClosed_true = isClosed.filter(isClose => isClose === true);
      console.log(
        `isClosed : ${isClosed.length} \nisClosed_true : ${
          isClosed_true.length
        }`
      );
      P = isClosed_true.length / isClosed.length;
      Kt = 3 * P;
      Tt =
        ((P * Math.pow(edges.length, 2)) /
          (edges_reservoir.length * (edges_reservoir.length - 1))) *
        total_wedges;
      console.info(
        `-----------\n P = ${P} \n Kt = ${Kt} \n Tt = ${Tt} \n-----------`
      );
      console.timeLog(`${dataset}`);
    });
  } catch (error) {
    console.log(`Error : ${error}`);
  }
})();
