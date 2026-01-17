export async function addMethod(userID, point, itemID, quantity) {
    try {
        const res = await fetch(`http://localhost:3000/users/${userID}`);
        if (!res.ok) throw new Error("User not found");

        const user = await res.json();

        if (!Array.isArray(user[point])) {
            throw new Error(`${point} is not an array`);
        }

        for (const elem of user[point]) {
            if (elem.id === String(itemID)) { return "Item is already on the list!" }
        }

        const updatedData = {
            [point]: !!quantity ? [...user[point], { id: itemID, quantity: quantity }] : [...user[point], itemID]
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

        if (point === "cart") {
            

            // ID'larni olish
            const itemIds = user[point].map(item => item.id);
            const query = itemIds.map(id => `id=${id}`).join("&");

            // Mahsulotlarni olish
            const productsRes = await fetch(`http://localhost:3000/products?${query}`);
            const products = await productsRes.json();

            // Mahsulotlar bilan quantity'ni birlashtirish va tekshirish
            const cartData = products.map(product => {
                const cartItem = user[point].find(item => String(item.id) === String(product.id));

                if (cartItem) {
                    // Ombor miqdorini tekshirish
                    const availableQuantity = Math.min(cartItem.quantity, product.quantity);
                    const isOutOfStock = cartItem.quantity > product.quantity;

                    return {
                        ...product,
                        cartQuantity: cartItem.quantity,
                        availableQuantity: availableQuantity,
                        isOutOfStock: isOutOfStock
                    };
                }

                return null;
            }).filter(item => item !== null);

            return cartData;

        } else {
            const query = user[point].map(id => `id=${id}`).join("&");
            const updateRes = await fetch(`http://localhost:3000/products?${query}`);
            const data = await updateRes.json();
            return data;
        }
    } catch (error) {
        console.error("Error in getMethod:", error);
        return [];
    }
}

/*
  {
    id: 1,
    name: "Olma yogurti",
    price: 5000,
    description: "Fruto nyanya olmali yogurti",
    quantity: 20, // ombordagi miqdor
    cartQuantity: 4, // savatchadagi umumiy miqdor (1 + 3)
    availableQuantity: 4, // haqiqiy olinadigan miqdor
    isOutOfStock: false,
    requestedQuantity: 4, // so'ralgan miqdor
    actualQuantity: 4 // haqiqiy olinadigan miqdor
  }
*/


export function addToCart(id, quantity) {
    addMethod(
        JSON.parse(localStorage.getItem("loginConf")).user.id,
        "cart",
        id,
        quantity
    );
};

export function addToSaved(id) {
    addMethod(
        JSON.parse(localStorage.getItem("loginConf")).user.id,
        "saved",
        id,
        null
    );
};