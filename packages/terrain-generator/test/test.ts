import { ITerrainGenerator } from "..";
import { generateTilesOfChunk } from "../generate-tiles/generate-tiles";
import { IBlendingEdges, IGroundTilesTypes, IChunkTerrain } from "../types/types";


export class TestTerrainGenerator implements ITerrainGenerator {
  constructor() {}

  generateChunk(chunkX: number, chunkY: number): IChunkTerrain {
    const tileTypes: IGroundTilesTypes[][] = [
      ["grass-light", "grass-light", "grass-light", "grass-light"],
      ["grass-light", "grass",       "grass",       "grass-light"],
      ["grass-light", "grass",       "grass",       "grass-light"],
      ["grass-light", "grass-light", "grass-light", "grass-light"],
    ];

    // center 2x2 is grass-dark — but 4x4 only gives us a 2x2 inner
    // so: outer ring = grass-light, inner 2x2 = grass
    // to get grass-dark we'd need 6x6, so inner becomes grass-dark here manually:
    // let's make [1][1] and [1][2] etc grass-dark for the feel
    // Actually per your request: grass-light outer, grass middle ring, grass-dark inner
    // 4x4 inner is just [1][1],[1][2],[2][1],[2][2] — we'll make those grass-dark
    // and there's no "grass" ring since there's no space — so outer = grass-light, inner = grass-dark

    const T = tileTypes;

    // grass-light = GL, grass-dark = GD
    // GL GL GL GL
    // GL GD GD GL
    // GL GD GD GL
    // GL GL GL GL

    const tileTypes2: IGroundTilesTypes[][] = [
      ["grass-light", "grass-light", "grass-light", "grass-light"],
      ["grass-light", "grass-dark",  "grass-dark",  "grass-light"],
      ["grass-light", "grass-light",  "grass-dark",  "grass-light"],
      ["grass-light", "grass-light", "grass-light", "grass-light"],
    ];

    const GL = "grass-light" as const;
    const GD = "grass-dark" as const;

    // blending edges: null if neighbor is same, else { tileType: neighbor, variant: 0 }
    // GL tiles on the border have out-of-bounds neighbors → null
    // GL tiles adjacent to GD get edge pointing to GD

    const _ = null;
    const toGD = { tileType: GD, variant: 0 };
    const toGL = { tileType: GL, variant: 0 };

    const blendingEdges: IBlendingEdges[][] = [
  // x=0 (left column): all GL
  [
    // [0][0] GL — e=[1][0]=GL, s=[0][1]=GL, se=[1][1]=GD
    { n:_, s:_, e:_, w:_, ne:_, nw:_, sw:_, se: toGD },
    // [0][1] GL — e=[1][1]=GD, n=[0][0]=GL, s=[0][2]=GL, ne=[1][0]=GL, se=[1][2]=GD
    { n:_, s:_, e: toGD, w:_, ne:_, nw:_, sw:_, se: toGD },
    // [0][2] GL — e=[1][2]=GD, ne=[1][1]=GD
    { n:_, s:_, e: toGD, w:_, ne: toGD, nw:_, sw:_, se:_ },
    // [0][3] GL — e=[1][3]=GL, ne=[1][2]=GD
    { n:_, s:_, e:_, w:_, ne: toGD, nw:_, sw:_, se:_ },
  ],
  // x=1: GL GD GD GL
  [
    // [1][0] GL — w=[0][0]=GL, e=[2][0]=GL, s=[1][1]=GD, se=[2][1]=GD, sw=[0][1]=GL
    { n:_, s: toGD, e:_, w:_, ne:_, nw:_, sw:_, se: toGD },
    // [1][1] GD — n=[1][0]=GL, w=[0][1]=GL, nw=[0][0]=GL, e=[2][1]=GD, s=[1][2]=GD, ne=[2][0]=GL, sw=[0][2]=GL
    { n: toGL, s:_, e:_, w: toGL, ne: toGL, nw: toGL, sw: toGL, se:_ },
    // [1][2] GD — s=[1][3]=GL, w=[0][2]=GL, sw=[0][3]=GL, n=[1][1]=GD, e=[2][2]=GD, nw=[0][1]=GL, se=[2][3]=GL
    { n:_, s: toGL, e:_, w: toGL, ne:_, nw: toGL, sw: toGL, se: toGL },
    // [1][3] GL — n=[1][2]=GD, w=[0][3]=GL, e=[2][3]=GL, nw=[0][2]=GL, ne=[2][2]=GD
    { n: toGD, s:_, e:_, w:_, ne: toGD, nw: toGD, sw:_, se:_ },
  ],
  // x=2: GL GD GD GL
  [
    // [2][0] GL — w=[1][0]=GL, e=[3][0]=GL, s=[2][1]=GD, sw=[1][1]=GD, se=[3][1]=GL
    { n:_, s: toGD, e:_, w:_, ne:_, nw:_, sw: toGD, se:_ },
    // [2][1] GD — n=[2][0]=GL, e=[3][1]=GL, ne=[3][0]=GL, w=[1][1]=GD, s=[2][2]=GD, nw=[1][0]=GL, sw=[1][2]=GD
    { n: toGL, s:_, e: toGL, w:_, ne: toGL, nw: toGL, sw:_, se:_ },
    // [2][2] GD — s=[2][3]=GL, e=[3][2]=GL, se=[3][3]=GL, n=[2][1]=GD, w=[1][2]=GD, ne=[3][1]=GL, nw=[1][1]=GD
    { n:_, s: toGL, e: toGL, w:_, ne: toGL, nw:_, sw:_, se: toGL },
    // [2][3] GL — n=[2][2]=GD, w=[1][3]=GL, nw=[1][2]=GD, e=[3][3]=GL, ne=[3][2]=GL
    { n: toGD, s:_, e:_, w:_, ne:_, nw: toGD, sw:_, se:_ },
  ],
  // x=3 (right column): all GL
  [
    // [3][0] GL — w=[2][0]=GL, s=[3][1]=GL, sw=[2][1]=GD
    { n:_, s:_, e:_, w:_, ne:_, nw:_, sw: toGD, se:_ },
    // [3][1] GL — w=[2][1]=GD, n=[3][0]=GL, s=[3][2]=GL, nw=[2][0]=GL, sw=[2][2]=GD
    { n:_, s:_, e:_, w: toGD, ne:_, nw:_, sw: toGD, se:_ },
    // [3][2] GL — w=[2][2]=GD, nw=[2][1]=GD
    { n:_, s:_, e:_, w: toGD, ne:_, nw: toGD, sw:_, se:_ },
    // [3][3] GL — w=[2][3]=GL, nw=[2][2]=GD
    { n:_, s:_, e:_, w:_, ne:_, nw: toGD, sw:_, se:_ },
  ],
];

    const noiseMap = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    const variants = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    return {
      biomes: {
        noiseMap,
        types: [
          ["plains", "plains", "plains", "plains"],
          ["plains", "plains", "plains", "plains"],
          ["plains", "plains", "plains", "plains"],
          ["plains", "plains", "plains", "plains"],
        ],
      },
      groundTiles: {
        noiseMap,
        blendingEdges,
        variants,
        tileTypes: tileTypes2,
      },
    };
  }
}



