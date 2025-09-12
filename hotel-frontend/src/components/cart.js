import React, { useEffect, useState } from "react";


const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    return (
        <div className="text-center">
            <h2>Carrito de Compras</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.name} (x{item.quantity}) - ${item.price * item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Cart;