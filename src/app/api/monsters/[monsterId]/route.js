import { ConnectToDb } from "@/utils/db";
import Dice from "@/utils/DiceParser/DiceParser";
import Monsters from "@/utils/models/monster";

export async function GET(request, {params}){
    const dice = new Dice('2d6+10')
    const roll = dice.roll()
    console.log(roll)
    console.log(roll.result)

    try {
        await ConnectToDb()

        const monsters = await Monsters.where({id_name: params.monsterId}).findOne()

        return new Response(JSON.stringify(monsters), {status: 200})
    } catch (error) {
        console.log(error)
    }
}