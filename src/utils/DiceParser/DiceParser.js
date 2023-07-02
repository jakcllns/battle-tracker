const compressNotation = notation => {
    return notation.trim().replace(/\s+/g,'')
}

const validNumber = (n, err) => {
    n = Number(n)
    if(Number.isNaN(n) || !Number.isInteger(n) || n < 1) {
        throw new Error(err)
    }

    return n
}

const parse = notation => {
    const diceNotation = /(\d+)[dD](\d+)(.*)$/i
    const modifier = /([+-])(\d+)/

    const roll = compressNotation(notation).match(diceNotation)
    let mod = 0
    const msg = `Invalid notation ${notation}`

    if (roll.length < 3) {
        throw new Error(msg)
    }

    if (roll[3] && modifier.test(roll[3])) {
        const modParts = roll[3].match(modifier)
        let basicMod = validNumber(modParts[2],msg)
        if (modParts[1].trim() === '-'){
            basicMod *= -1
        }
        mod = basicMod
    }
    roll[1] = validNumber(roll[1], msg)
    roll[2] = validNumber(roll[2], msg)

    return {
        numberOfDie: roll[1],
        dieType: roll[2],
        modifier: mod 
    }
}

export const isDiceNotation = (notation) => {
    try {
        parse(notation);
        return true
    } catch {
        return false
    }
}

class Dice {
    notation
    dice
    constructor(notation) {
        if (typeof notation !== 'string') {
            throw new Error('Notations must be in valid dice notation as a string')
        }   

        this.notation = notation
        this.dice = parse(notation)
    }

    roll(rnd) {
        if (!rnd) {
            rnd = Math.random
        }
        const rolls = []
        
        for (let i = 0; i < this.dice.numberOfDie; i++) {
            rolls.push(Math.floor(rnd() * this.dice.dieType) + 1)
        }

        return {
            rolls: rolls,
            modifier: this.dice.modifier,
            result: rolls.reduce((a, b) => a + b) + this.dice.modifier
        }
    }
}

export function rollDice(notation) {
    if(!isDiceNotation(notation)) {
        throw new Error('Argument provided must be in proper dice notation.')
    }
    const dice = new Dice(notation)

    return dice.roll()
}

export default Dice