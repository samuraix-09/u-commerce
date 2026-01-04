export default async function addMethod(userID, point, itemID) {
    try {
        const res = await fetch(`http://localhost:3000/users/${userID}`);
        if (!res.ok) throw new Error("User not found");

        const user = await res.json();

        if (!Array.isArray(user[point])) {
            throw new Error(`${point} is not an array`);
        }

        const updatedData = {
            [point]: [...user[point], itemID]
        };

        const updateRes = await fetch(
            `http://localhost:3000/users/${userID}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData)
            }
        );

        if (!updateRes.ok) throw new Error("Update failed");

        return "SUCCESS";

    } catch (error) {
        return error.message;
    }
}
