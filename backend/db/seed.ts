import { seed, rand, randJobTitle, randProductName, randProductDescription, randFirstName, randLastName, randAvatar  } from '@ngneat/falso';
import { db } from './database'

async function seedCreators() {
    for (let count = 0; count < 20; count++) {
        await db.insertInto('creators').values({
            first_name: randFirstName(),
            last_name: randLastName(),
            email: `test${count}@example.com`,
            password: `test${count}password`,
            creator_description: randJobTitle(),
            avatar: randAvatar()
        }).execute()
    }
}

async function seedCases() {
    const creators = await db.selectFrom('creators').select(['id']).execute()
    const creatorIds = creators.map(({ id }) => id)

    for (let count = 0; count < 100; count++) {
        const creatorId = rand(creatorIds) 

        await db.insertInto('cases').values({
            title: randProductName(),
            source_file_url: null,
            creator_id: creatorId,
            case_description: randProductDescription(),
            likes: 0,
            views: 0,
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

