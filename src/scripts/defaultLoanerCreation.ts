import Loaner from '../models/Loaner'

export default async function bootstrapDefaultLoaners(): Promise<void> {
    // Check if loaner records exist
    // If not, create 10 loaner records
    const loaners = await Loaner.find()
    if (loaners.length === 0) {
        createDefaultLoaners()
    }
}

const createDefaultLoaners = async () => {
    console.log('Default loaner creation triggered!')
    for (let i = 0; i < 20; i++) {
        const loaner = new Loaner({
            id: 2300 + i + 1,
            isLoaned: false,
            OS: 'WINDOWS'
        })
        await loaner.save()
        console.log('Created loaner: ' + loaner.id)
    }
    for (let i = 0; i < 30; i++) {
        const loaner = new Loaner({
            id: (i < 15 ? 1900 : 2000) + i + 1,
            isLoaned: false,
            OS: 'MACOS'
        })
        await loaner.save()
        console.log('Created loaner: ' + loaner.id)
    }
}
