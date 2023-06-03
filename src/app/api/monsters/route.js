import { ConnectToDb } from "@/utils/db";
import Monsters from "@/utils/models/monster";

export async function GET(request){
    try {
        await ConnectToDb()

        const monsters = await Monsters.find().select({ _id: 0, Name: 1, id_name: 1, ArmorClass: 1, HitDie: 1, DEX: 1})

        return new Response(JSON.stringify(monsters), {status: 200})
    } catch (error) {
        console.log(error)
    }
}