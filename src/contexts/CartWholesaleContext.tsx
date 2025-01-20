// src/context/CartContext.tsx
"use client"
import React, { createContext, useState, ReactNode } from 'react';

// Sử dụng interface Product mà bạn đã cung cấp
interface Product {
    product_id: string;
    product_name: string;
    product_size: string;
    product_qty: number;
    product_category: { _id: string, category_name: string };
    product_unit: { _id: string, unit_name: string };
    product_price_buy_THB: number;
    product_price_sale1_THB: number;
    product_price_sale2_THB: number;
    product_price_buy_LAK: number;
    product_price_sale1_LAK: number;
    product_price_sale2_LAK: number;
    product_point: number;
    product_discount: number;
    product_sum_lak: number;
    product_total_lak: number;
    product_sum_thb: number;
    product_total_thb: number;
    product_total_point: number;
}
interface Exchang_rate {
    exchange_rate: number
}
interface Customer {
    _id:any;
    customer_id: string;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
}

// Định nghĩa loại trạng thái giỏ hàng
interface CartContextType {
    cart: Product[];
    rate: Exchang_rate;
    customer: Customer;
    addProduct: (product: Product, qty: number) => void;
    qtyProductCart: (id: string) => number;
    removeProduct: (product_id: string) => void;
    increaseQuantity: (product_id: string, qty: number) => void;
    decreaseQuantity: (product_id: string, qty: number) => void;
    clear: () => void;
    setRate: (exchange_rate: Exchang_rate) => void;
    setCustomer: (customer: Customer) => void;
}

// Tạo context
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Tạo provider
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Product[]>([]);
    const [rate, setRateState] = useState<Exchang_rate>({ exchange_rate: 0 });
    const [customer, setCustomerState] = useState<Customer>({_id:'', customer_id: "", customer_name: "", customer_phone: "", customer_address: "" });
    // Hàm tính tổng sản phẩm
    const calculateProductSum = (product: Product): Product => {
        const discount = 0;
        const qty = product.product_qty;
        const point = product.product_point;
        const product_sum_lak = product.product_price_sale1_LAK * qty;
        const product_total_lak = product_sum_lak - (product_sum_lak * discount / 100);
        const product_sum_thb = product.product_price_sale1_THB * qty;
        const product_total_thb = product_sum_thb - (product_sum_thb * discount / 100);
        const product_total_point = point * qty;
        return { ...product, product_sum_lak, product_sum_thb, product_total_lak, product_total_thb, product_total_point }
    };

    // const changeRate = async (exchange_rate: number) => {
    //     setRate({ exchange_rate: exchange_rate })
    // }
    // Thêm sản phẩm vào giỏ
    const addProduct = (product: Product, qty: number) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((p) => p.product_id === product.product_id);
            const productWithQty = { ...product, product_qty: qty };
            if (existingProduct) {
                // Nếu sản phẩm đã tồn tại trong giỏ, cập nhật số lượng
                return prevCart.map((p) =>
                    p.product_id === product.product_id ?
                        calculateProductSum({
                            ...p,
                            product_qty: p.product_qty + qty,
                        }) : p
                );
            }
            // Nếu sản phẩm chưa có trong giỏ, thêm mới
            return [...prevCart, calculateProductSum(productWithQty)];
        });
    };

    // Xóa sản phẩm khỏi giỏ
    const removeProduct = (product_id: string) => {
        setCart((prevCart) => prevCart.filter((product) => product.product_id !== product_id));
    };

    // Cập nhật số lượng sản phẩm

    const increaseQuantity = (product_id: string, qty: number) => {
        setCart((prevCart) =>
            prevCart.map((p) =>
                p.product_id === product_id ? calculateProductSum({
                    ...p,
                    product_qty: p.product_qty + qty,
                }) : p
            )
        );
    }
    const decreaseQuantity = (product_id: string, qty: number) => {
        setCart((prevCart) =>
            prevCart.map((p) =>
                p.product_id === product_id ? p.product_qty - qty > 0 ? calculateProductSum({
                    ...p,
                    product_qty: p.product_qty - qty
                }) : p : p
            )
        );
    }
    const qtyProductCart = (id: string): number => {
        const product = cart.find((p) => p.product_id === id);
        return product ? product.product_qty : 0; // Trả về số lượng hoặc 0 nếu không tìm thấy
    };
    const clear = () => {
        setCart([]);
        setCustomerState({_id:"", customer_id: "", customer_name: "", customer_phone: "", customer_address: "" });
    }
    // Cập nhật tỷ giá
    const setRate = (exchange_rate: Exchang_rate) => {
        setRateState(exchange_rate);
    };

    // Cập nhật thông tin khách hàng
    const setCustomer = (customer: Customer) => {
        setCustomerState(customer);
    };
    return (
        <CartContext.Provider value={{ rate, setRate, qtyProductCart, cart, addProduct, removeProduct, increaseQuantity, decreaseQuantity, customer, setCustomer, clear }}>
            {children}
        </CartContext.Provider>
    );
};
