



import fs from "fs"
import JSZip from "jszip"
import { XMLParser } from "fast-xml-parser"



const xmlParser = new XMLParser({
  ignoreDeclaration: true,
  ignoreAttributes: false,
  attributeNamePrefix: ""
})


const jszip = new JSZip()

const mapZipFile = fs.readFileSync("./src/upload-map/compress-map/tilemaps.zip")


async function loadTmxFile(zipMapping: JSZip) {
  const tmxFileRawString = await zipMapping.file("test2.tmx")!.async("string")
  const mapObject = xmlParser.parse(tmxFileRawString!)
  console.log(mapObject)
}



async function decompresseFile(file){
  const zipMapping: JSZip = await jszip.loadAsync(mapZipFile)
  const tmxMapObject = loadTmxFile(zipMapping)
}


decompresseFile(mapZipFile)
