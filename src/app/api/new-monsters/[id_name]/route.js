import { ConnectToDb } from "@/utils/db";
import NewMonsters from "@/utils/models/newMonster";

export const dynamic = 'force-static'

export async function GET(request, { params }){
    const {id_name} = params
    console.log(id_name)
    try {
        await ConnectToDb()

        const monster = await NewMonsters.findOne({id_name: id_name})

        return new Response(JSON.stringify(monster), {status: 200})
    } catch (error) {
        console.log("failed")
    }
}