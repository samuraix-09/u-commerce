export default async function addMethod(userID, point, itemID) {
    try {
        const res = await fetch(`http://localhost:3000/users/${userID}`);
        if (!res.ok) throw new Error("User not found");

        const user = await res.json();

        if (!Array.isArray(user[point])) {
            throw new Error(`${point} is not an array`);
        }

        if (user[point].includes(itemID)) {
            return "Item is already in the cart!"
        };

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
        return "ERROR";
    };
};

export async function getMethod(userID, point) {
    try {
        const res = await fetch(`http://localhost:3000/users/${userID}`);
        if (!res.ok) throw new Error("User not found");

        const user = await res.json();

        if (!Array.isArray(user[point])) {
            throw new Error(`${point} is not an array`);
        }

        if (user[point].length === 0) return [];

        const query = user[point].map(id => `id=${id}`).join("&");
        const updateRes = await fetch(`http://localhost:3000/products?${query}`);
        const data = await updateRes.json();

        return data;
    } catch (error) {
        return [];
    }
}

