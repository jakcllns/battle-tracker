import AddCreature from "@/components/AddCreature/AddCreature";
import Statblock from "@/components/Statblock/Statblock";

export default function Page(props){

    return(
        <>
        <h1>Battle Tracker</h1>
            <AddCreature />
            <Statblock 
                monsterid="greenhag"
            />  
        </>
    )
} 