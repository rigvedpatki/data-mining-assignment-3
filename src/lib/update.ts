// import getWedges from './get-wedges';
// import { randomIntInRange } from './reservoir-sampling';
// import * as _ from 'lodash';

// const update = (
//   edgeT: number[],
//   t: number,
//   edges_reservoir: number[][],
//   wedges_reservoir: number[][],
//   isClosed: boolean[],
//   total_wedges: number
// ) => {
//   wedges_reservoir.forEach((wedge, i) => {
//     if (
//       _.isEqual([wedge[0], wedge[2]], edgeT) ||
//       _.isEqual([wedge[2], wedge[0]], edgeT)
//     ) {
//       console.log(`wedge : ${wedge} , edgeT : ${edgeT}`);
//       isClosed[i] = true;
//       console.log(isClosed[i]);
//     }
//   });

//   let edges_reservoir_updated = edges_reservoir;
//   edges_reservoir.forEach((edgeI, i) => {
//     let x = Math.random();
//     if (x <= 1 / (t + 1)) {
//       edges_reservoir_updated[i] = edgeT;
//     }
//   });

//   if (!_.isEqual(edges_reservoir_updated, edges_reservoir)) {
//     const new_wedges_reservoir = getWedges(edges_reservoir_updated);
//     total_wedges = new_wedges_reservoir.length;
//     const new_wedges_reservoir_conatining_edgeT = new_wedges_reservoir.filter(
//       wedge => wedge.includes(edgeT[0]) && wedge.includes(edgeT[1])
//     );
//     wedges_reservoir.forEach((wedge, i) => {
//       let x = Math.random();
//       if (x <= new_wedges_reservoir_conatining_edgeT.length / total_wedges) {
//         const y = randomIntInRange(
//           0,
//           new_wedges_reservoir_conatining_edgeT.length,
//           false
//         );
//         wedges_reservoir[i] = new_wedges_reservoir_conatining_edgeT[y];
//         isClosed[i] = false;
//       }
//     });
//   }

//   let isClosed_updated = isClosed;
//   let wedges_reservoir_updated = wedges_reservoir;
//   let total_wedges_updated = total_wedges;

//   return {
//     edges_reservoir_updated,
//     wedges_reservoir_updated,
//     isClosed_updated,
//     total_wedges_updated
//   };
// };

// export default update;
