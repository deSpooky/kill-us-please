import { Form, useLoaderData } from "react-router";

import { casesApi } from "../api/cases";
import type { Route } from "./+types/case";

export async function loader({ params }: Route.LoaderArgs) {
    const caseRecord = await casesApi.get(+params.caseId);
    if (!caseRecord) {
        throw new Response("Not Found", { status: 404 });
    }
    return { caseRecord };
}

export default function Case() {
    const { caseRecord } = useLoaderData<typeof loader>();

    return (
        <div id="contact">
            <div>
                <h1>
                    {caseRecord.title}
                </h1>

                {caseRecord.case_description ? (
                    <p>{caseRecord.case_description}
                    </p>
                ) : null}

                <p>{caseRecord.creator_id}</p>

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>

                    <Form
                        action="destroy"
                        method="post"
                        onSubmit={(event) => {
                            const response = confirm(
                                "Please confirm you want to delete this record."
                            );
                            if (!response) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
