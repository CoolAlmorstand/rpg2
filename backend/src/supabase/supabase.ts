
import { createClient } from "@supabase/supabase-js"
import fs from "fs"

const supabase = createClient(
  "https://hlsdidxxakfbbsbryhdz.supabase.co",
  "sb_secret_ls1n6lBObntyfB0dNEzayQ_PJsPU3be"
)

const fileBuffer = fs.readFileSync("./src/supabase/test/test.png") 


async function uploadTest(){
  try {
    const { error, data } = await supabase.storage.from("Maps").upload("test.png", fileBuffer, {
      contentType: "png"
    })
    console.log(error)
  } catch (error) {
    console.log(error)
  } 
}

uploadTest()


