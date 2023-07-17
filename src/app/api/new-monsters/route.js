import { ConnectToDb } from "@/utils/db";
import NewMonsters from "@/utils/models/newMonster";
import { NextRequest } from "next/server";

export const dynamic = 'force-static'

export async function GET(request){
    try {
        await ConnectToDb()

        const monsters = await NewMonsters.find()

        return new Response(JSON.stringify(monsters), {status: 200})
    } catch (error) {
        console.log("failed")
    }
}

export async function POST(req) {
    try {
        await ConnectToDb()

        const body = await req.json()

        if((await NewMonsters.find({id_name: body.id_name})).length > 0) {
            return new Response(JSON.stringify({message: "Creature already exists"}), {status: 500})
        }
        
        const monster = new NewMonsters(body)

        await monster.save()
        
        return new Response(JSON.stringify({message: "success"}), {status: 200})
        
    } catch (error) {
        return new Response(JSON.stringify({message: "failed"}), {status: 500})
    }
}