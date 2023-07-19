'use client'
import AddButton from "@/components/AddButton/AddButton";
import CreaturForm from "@/components/CreatureForm/CreatureForm";
import StatBlock from "@/components/StatBlock/StatBlock";
import Mode from "@/utils/Mode/Mode";
import {  initializeMonster} from "@/utils/Monster/monster";
import Link from "next/link";
import { useState } from "react";

export default function Page(props) {
    const [monster, setMonster] = useState(initializeMonster);

    return (
        <div className="container py-3 mx-auto bg-slate-800 text-slate-50 rounded-xl">
            <Link className="px-8" href={'/'}>Home</Link>
            <div className="container  mx-auto flex flex-wrap gap-x-3 gap-y-2 text-sm">
                <div className="flex-row w-full text-center py-3 -mt-3">
                    <h1 className="text-xl mx-auto ">StatBlock Preview</h1>
                    
                    <hr className="bg-slate-50 h-1"/>
                    {/* Stat Block */}
                    <StatBlock monster={monster} />
                    <hr className="bg-slate-50 h-1"/>
                </div>
            </div>
            <CreaturForm monster={monster} setMonster={setMonster} mode={Mode.Create} />
        </div>
    )
}
//  Left off at adding in Baboon from SRD on page 367 Monsters start on page 261 of SRD