const Loaner = require('../models/Loaner')

const bootstrapDefaultLoaners = async () => {
    // Check if loaner records exist
    // If not, create 10 loaner records
    const loaners = await Loaner.find()
    if (loaners.length === 0) {
        createDefaultLoaners();
    }
}

const createDefaultLoaners = async() => {
    // TODO: Expand based on the default loaners & types @ STS
    console.log("Default loaner creation triggered!")
    for (let i = 0; i < 10; i++) {
        const loaner = new Loaner({
            id: 2020 + i,
            isLoaned: false,
            OS: 'WINDOWS'
        })
        await loaner.save()
        console.log("Created loaner: " + loaner.id)
    }
}

module.exports = bootstrapDefaultLoaners