
import { createClient } from "@supabase/supabase-js"
import fs from "fs"

const supabase = createClient(
  "https://hlsdidxxakfbbsbryhdz.supabase.co",
  "sb_secret_ls1n6lBObntyfB0dNEzayQ_PJsPU3be"
)

const fileBuffer = fs.readFileSync("./src/supabase/test/test.png") 


export async function uploadTest(fileBuffer: Buffer){
  try {
    const { error, data } = await supabase.storage.from("Maps").upload("test1.zip", fileBuffer, {
      contentType: "png"
    })
    console.log(error)
  } catch (error) {
    console.log(error)
  } 
}


export async function getAvailableMaps() {
  const { data, error } = await supabase.storage.from("Maps").list()
  return data!.map((map) => map.name)
}



