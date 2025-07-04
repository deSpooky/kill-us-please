import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
// import invariant from "tiny-invariant";
import * as types from '../types'


export const casesApi = {
    async getAll(): Promise<types.CaseRecord[]> {
        const response = await fetch('http://localhost:3000/cases', {
            headers: {
                "Content-Type": "application/json"
            }
        })
        const caseRecords: types.CaseRecord[] = await response.json()
        // console.log(caseRecords)
        return caseRecords.sort(sortBy("-createdAt", "title"))
    },

    async get(id: number): Promise<types.CaseRecord> {
        const response = await fetch(`http://localhost:3000/cases/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        const caseRecord: types.CaseRecord = await response.json()
        return caseRecord
    },

    async create(values: types.CaseMutation): Promise<types.CaseRecord> {
        const response = await fetch(`http://localhost:3000/cases`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
        const newCaseRecord: types.CaseRecord = await response.json()
        return newCaseRecord
    },

    // async set(id: string, values: ContactMutation): Promise<ContactRecord> {
    //     const contact = await fakeContacts.get(id);
    //     invariant(contact, `No contact found for ${id}`);
    //     const updatedContact = { ...contact, ...values };
    //     fakeContacts.records[id] = updatedContact;
    //     return updatedContact;
    // },

    // destroy(id: string): null {
    //     delete fakeContacts.records[id];
    //     return null;
    // },
};


export async function getContacts(query?: string | null) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    let contacts = await casesApi.getAll();
    if (query) {
        contacts = matchSorter(contacts, query, {
            keys: ["title"],
        });
    }
    return contacts.sort(sortBy("last", "createdAt"));
}

// export async function updateContact(id: number, updates: CaseMutation) {
//     const contact = await casesApi.get(id);
//     if (!contact) {
//         throw new Error(`No contact found for ${id}`);
//     }
//     await casesApi.set(id, { ...contact, ...updates });
//     return contact;
// }

// export async function deleteContact(id: string) {
//     casesApi.destroy(id);
// }
