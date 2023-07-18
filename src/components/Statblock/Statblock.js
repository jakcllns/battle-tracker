import { ChallengeRatings } from "@/utils/challengeRatingLookup"
import { averageRoll } from "@/utils/DiceParser/DiceParser"

const StatBlock = ({monster}) => {
    return (
        <div className="w-[1250px] flex bg-[#FDF1DC] parchment mx-auto flex-wrap text-red-900 text-left">
                        <div className="w-full flex-row self-start">
                            <hr className="bg-[#E69A28] stat-bar h-2"/>
                        </div>

                        <div className="px-2 flex-col w-[50%] flex flex-wrap">
                            <div className="flex-row text-2xl">
                                <h2 ><strong>{monster.name}</strong></h2>
                            </div>
                            <div className="flex-row">
                                <h4><em>{`${monster.size} ${monster.race}, ${monster.alignment}`}</em></h4>
                            </div>
                            <div className="flex-row">
                                <hr className="bg-red-700 h-[3px]" />
                            </div>
                            <div className="flex-row">
                                <h4><strong>Armor Class</strong> {monster.armorClass} {monster.armorType !== '' ? `(${monster.armorType})`: ''}</h4>
                            </div>
                            <div>
                                <h4><strong>Hit Points</strong> {`${monster.hitPoints} (${monster.hitDie})`}</h4>
                            </div>
                            <div className="flex-row">
                                <h4><strong>Speed</strong> {monster.movementSpeed.join(', ')}</h4>
                            </div>
                            <div className="flex-row">
                                <hr className="bg-red-700 h-[3px]"/>
                            </div>
                            <div className="flex-row flex w-full text-center">
                                <div className="flex-col w-1/6">
                                    <h4><strong>STR</strong></h4>
                                    <h4>{monster.str} ({monster.str > 10 ? '+' : ''}{Math.floor((monster.str-10)/2)})</h4>
                                </div>
                                <div className="flex-col w-16">
                                    <h4><strong>DEX</strong></h4>
                                    <h4>{monster.dex} ({monster.dex > 10 ? '+' : ''}{Math.floor((monster.dex-10)/2)})</h4>
                                </div>
                                <div className="flex-col w-1/6">
                                    <h4><strong>CON</strong></h4>
                                    <h4>{monster.con} ({monster.con > 10 ? '+' : ''}{Math.floor((monster.con-10)/2)})</h4>
                                </div>
                                <div className="flex-col w-1/6">
                                    <h4><strong>INT</strong></h4>
                                    <h4>{monster.int} ({monster.int > 10 ? '+' : ''}{Math.floor((monster.int-10)/2)})</h4>
                                </div>
                                <div className="flex-col w-1/6">
                                    <h4><strong>WIS</strong></h4>
                                    <h4>{monster.wis} ({monster.wis > 10 ? '+' : ''}{Math.floor((monster.wis-10)/2)})</h4>
                                </div>
                                <div className="flex-col w-1/6">
                                    <h4><strong>CHA</strong></h4>
                                    <h4>{monster.cha} ({monster.cha > 10 ? '+' : ''}{Math.floor((monster.cha-10)/2)})</h4>
                                </div>
                            </div>
                            <div className="flex-row">
                                <hr className="bg-red-700 h-[3px]"/>
                            </div>
                            {
                                monster.savingThrows.length > 0 ?
                                <div className="flex-row">
                                    <h4><strong>Saving Throws</strong> {monster.savingThrows.map(ele => `${ele.savingThrowType} ${ele.modifier > 0 ? "+" : ''} ${ele.modifier}`).join(", ")}</h4>
                                </div>
                                : undefined
                            }

                            {
                                monster.skills.length > 0 ?
                                <div className="flex-row">
                                    <h4><strong>Skills</strong> {monster.skills.map(ele => `${ele.skillType} ${ele.modifier > 0 ? '+' : ''} ${ele.modifier}`).join(', ')}</h4>
                                </div>
                                : undefined
                            }

                            {
                                monster.damageImmunities.length > 0 ?
                                <div className="flex-row">
                                    <h4><strong>Damage Immunities</strong> {monster.damageImmunities.join(', ')}</h4>
                                </div>
                                : undefined
                            }

                            {
                                monster.conditionImmunities.length > 0 ?
                                <div className="flex-row">
                                    <h4><strong>Condition Immunities</strong> {monster.conditionImmunities.join(', ')}</h4>
                                </div>
                                : undefined
                            }

                            {
                                monster.senses.length > 0 ?
                                <div className="flex-row">
                                    <h4><strong>Senses</strong> {monster.senses.join(', ')}</h4>
                                </div>
                                : undefined
                            }

                            {
                                monster.languages.length > 0 ?
                                <div className="flex-row">
                                    <h4><strong>Languages</strong> {monster.languages.join(', ')}</h4>
                                </div>
                                : undefined
                            }

                            <div className="flex-row">
                                <h4><strong>Challenge</strong> {monster.challenge} ({monster.experience.toLocaleString()} XP)<span className="float-right"><strong>Proficiency Bonus</strong> +{ChallengeRatings[monster.challenge]? ChallengeRatings[monster.challenge].pb : '' }</span></h4>
                                
                            </div>

                            {
                                monster.abilities.filter(ele => !ele.isAction).length > 0 ? (
                                <>
                                    <hr className="bg-red-700 h-[3px]"/>
                                    <div className="flex-row flex flex-wrap">
                                        {monster.abilities.filter(ele => !ele.isAction).map((ele, index) => {
                                            return (
                                                <div key={index} className="flex-row my-1 text-black whitespace-pre-line">
                                                    <p><strong>{ele.name}.</strong> {ele.description}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </>):undefined
                            }

                            {
                                monster.abilities.filter(ele => ele.isAction).length > 0 ? (
                                    <>
                                        <h3 className="text-2xl">Actions</h3>
                                        <hr className="bg-red-700 h-[3px] mb-2" />
                                        <div className="flex-row flex flex-wrap">
                                            {monster.abilities.filter(ele => ele.isAction).map((ele, index) => {
                                                return (
                                                    <div key={index} className="flex-row my-1 whitespace-pre-line text-black">
                                                        <p><strong>{ele.name}.</strong> {ele.description}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                ): undefined
                            }
                            {/* work on adding skills, damage immunities, condition immunities, senses, languages, challenge */}
                        </div>

                        <div className="flex-col px-2 flex flex-wrap  w-[50%]">
                            {
                                monster.abilities.filter(ele => ele.isAction).length === 0 ?
                                (<>
                                    <h3 className="text-2xl">Actions</h3>
                                    <hr className="bg-red-700 h-[3px] mb-2" />
                                </>): undefined
                            }
                            <div className="flex-row flex flex-wrap">
                                {monster.actions.map(({name, attackType, modifier, reach, targets, hits, description}, index) => {
                                    return (
                                        <div key={index} className="flex-row my-1 whitespace-pre-line text-black">
                                            <p>
                                                <strong>{name}. </strong><em>{attackType}:</em> {modifier >= 0 ? '+' : ''}{modifier.toLocaleString()} to hit, reach {reach}, {targets} target{targets > 1 ? 's':''}. <em>Hit: </em> {hits.map(({dieType, damageType}) => `${averageRoll(dieType)} (${dieType}) ${damageType} damage`).join(' and ')}. {description}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                            
                            {
                                monster.legendaryDescription !== '' ? (
                                    <>
                                    <h3 className="text-2xl">Legendary Actions</h3>
                                    <hr className="bg-red-700 h-[3px] mb-2" />
                                    <div className="flex-row flex flex-wrap">
                                        <div className="flex-row my-1, whitespace-pre-line text-black">
                                            <p>{monster.legendaryDescription}</p>
                                        </div>
                                        {monster.legendaryActions.map(({name, description}, index) => {
                                            return (
                                                <div key={index} className="flex-row my-1, whitespace-pre-line text-black">
                                                    <p><strong>{name}.</strong> {description}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    </>
                                ): undefined
                            }
                            {
                                monster.lairDescription !== '' ? (
                                    <>
                                    <h3 className="text-2xl">Lair Actions</h3>
                                    <hr className="bg-red-700 h-[3px] mb-2" />
                                    <div className="flex-row flex flex-wrap">
                                        <div className="flex-row my-1, whitespace-pre-line text-black">
                                            <p>{monster.lairDescription}</p>
                                        </div>
                                        {monster.lairActions.map(({name, description}, index) => {
                                            return (
                                                <div key={index} className="flex-row my-1, whitespace-pre-line text-black">
                                                    <p><strong>{name}.</strong> {description}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    </>
                                ): undefined
                            }
                            {
                                monster.mythicDescription !== '' ? (
                                    <>
                                    <h3 className="text-2xl">Mythic Actions</h3>
                                    <hr className="bg-red-700 h-[3px] mb-2" />
                                    <div className="flex-row flex flex-wrap">
                                        <div className="flex-row my-1, whitespace-pre-line text-black">
                                            <p>{monster.mythicDescription}</p>
                                        </div>
                                        {monster.mythicActions.map(({name, description}, index) => {
                                            return (
                                                <div key={index} className="flex-row my-1, whitespace-pre-line text-black">
                                                    <p><strong>{name}.</strong> {description}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    </>
                                ): undefined
                            }
                            {
                                monster.regionalDescription !== '' ? (
                                    <>
                                    <h3 className="text-2xl">Regional Effects</h3>
                                    <hr className="bg-red-700 h-[3px] mb-2" />
                                    <div className="flex-row flex flex-wrap">
                                        <div className="flex-row my-1, whitespace-pre-line text-black">
                                            <p>{monster.regionalDescription}</p>
                                        </div>
                                        {monster.regionalEffects.map(({name, description}, index) => {
                                            return (
                                                <div key={index} className="flex-row my-1, whitespace-pre-line text-black">
                                                    <p><strong>{name}.</strong> {description}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    </>
                                ): undefined
                            }
                        </div>
                        
                        <div className="w-full flex-row self-end">
                            <hr className="bg-[#E69A28] stat-bar h-2"/>
                        </div>
                    </div>
    )
}

export default StatBlock