import mongoose from "mongoose";

let isConnected = false

export async function ConnectToDb() {
    const connectionString = process.env.DB_CONNECTION_STRING
    mongoose.set('strictQuery', true)

    console.log(connectionString)

    if(isConnected){
        console.log('MongoDb is already connected');
        return;
    }

    try {
        await mongoose.connect(
            connectionString,
            {
                dbName: 'dnd-monsters'
            }
        )

        isConnected = true

        console.log('MongoDb Connected')
    } catch (error) {
        console.log(error)
    }
}