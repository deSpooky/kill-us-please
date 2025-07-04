import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import * as types from '../types'


export const creatorsApi = {
    async getAll(filters?: types.Filter): Promise<(types.CreatorRecord & { tag: string })[]> {
        let baseUrl = new URL('http://localhost:3000/creators')
        if (filters?.byTag) {
            baseUrl.searchParams.set('tag', String(filters.byTag))
        }
        const response = await fetch('http://localhost:3000/creators', {
            headers: {
                "Content-Type": "application/json"
            }
        })
        const creatorRecords: (types.CreatorRecord & { tag: string })[] = await response.json()
        return creatorRecords?.sort(sortBy("last_name", "first_name")) ?? []
    },

    async get(id: number): Promise<types.CreatorRecord> {
        const response = await fetch(`http://localhost:3000/creators/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        const creatorRecord: types.CreatorRecord = await response.json()
        return creatorRecord
    },

    async update(id: string, values: types.CreatorRecord): Promise<types.CreatorRecord> {
        const response = await fetch(`http://localhost:3000/register`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, values })
        })

        const newCreatorRecord: types.CreatorRecord = await response.json()
        return newCreatorRecord;
    },
};
