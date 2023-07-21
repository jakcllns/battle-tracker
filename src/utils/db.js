import mongoose from "mongoose";

let isConnected = false

export async function ConnectToDb() {
    const connectionString = process.env.DB_CONNECTION_STRING
    mongoose.set('strictQuery', true)


    if(isConnected){
        console.log('MongoDb is already connected');
        return;
    }

    try {
        const db = await mongoose.connect(
            connectionString,
            {
                dbName: 'dnd-monsters'
            }
        )

        console.log(`Connections ${db.connections.length}`)

        isConnected = true

        console.log('MongoDb Connected')
    } catch (error) {
        console.log(error)
    }
}