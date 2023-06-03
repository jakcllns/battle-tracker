import { Schema, model, models } from "mongoose";

export const MonsterSchema = new Schema({
    id_name: {
        type: String,
        lowercase: true,
        index: {
            unique: true,
        }
    },
    Name:{
        type: String
    },
    Size: {
        type: String
    },
    Race: {
        type: String
    },
    Alignment: {
        type: String
    },
    ArmorClass: {
        type: Number
    },
    ArmorType: {
        type: String
    },
    HitPoints: {
        type: Number,
    },
    HitDie: {
        type: String
    },
    MovementSpeed: {
        type: String
    },
    STR: {
        type: Number
    },
    DEX: {
        type: Number
    },
    CON: {
        type: Number
    },
    INT: {
        type: Number,
    },
    WIS: {
        type: Number
    },
    CHA: {
        type: Number
    },
    SavingThrows: {
        type: String
    },
    Skills: {
        type: String
    },
    DamageResistances: {
        type: String
    },
    DamageImmunities: {
        type: String
    },
    ConditionImmunities: {
        type: String
    },
    Senses: {
        type: String
    },
    Languages: {
        type: String
    },
    Challenge: {
        type: String
    },
    Experience: {
        type: Number
    },
    Abilities: {
        type: String
    },
    Actions: {
        type: String
    },
    LegendaryActions: {
        type: String
    },
    id_name: {
        type: String,
        lowercase: true,
        index: {
            unique: true,
        }
    }
})

const Monsters = models.Monsters ? models.Monsters : model("Monsters", MonsterSchema)

export default Monsters;