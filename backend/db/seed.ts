import { seed, rand, randUserName, randJobTitle, randProductName, randProductDescription, } from '@ngneat/falso';
import { db } from './database'

async function seedCreators() {
    for (let count = 0; count < 20; count++) {
        await db.insertInto('creators').values({
            creator_nickname: randUserName(),
            email: `test${count}@example.com`,
            password: `test${count}password`,
            creator_description: randJobTitle()
        }).execute()
    }
}

async function seedCases() {
    const creators = await db.selectFrom('creators').select('creator_nickname').execute()
    const creatorsNicknames = creators.map(({ creator_nickname }) => creator_nickname)

    for (let count = 0; count < 100; count++) {
        const creatorsNickname = rand(creatorsNicknames)
        await db.insertInto('cases').values({
            title: randProductName(),
            source_file_url: null,
            creator_nickname: creatorsNickname,
            case_description: randProductDescription(),
        }).execute()
    }
}

async function seedDatabase() {
    await db.deleteFrom('creators').execute()
    await db.deleteFrom('cases').execute()
    seed('static')
    await seedCreators()
    await seedCases()
}

(async function () {
    await seedDatabase()
})()

