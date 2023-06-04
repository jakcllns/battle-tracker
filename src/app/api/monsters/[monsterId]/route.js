import { ConnectToDb } from "@/utils/db";
import Dice from "@/utils/DiceParser/DiceParser";
import Monsters from "@/utils/models/monster";

export async function GET(request, {params}){
        try {
        await ConnectToDb()

        const monsters = await Monsters.where({id_name: params.monsterId}).findOne()

        return new Response(JSON.stringify(monsters), {status: 200})
    } catch (error) {
        console.log(error)
    }
}