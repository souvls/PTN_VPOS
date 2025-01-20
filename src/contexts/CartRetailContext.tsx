// src/context/CartContext.tsx
"use client"
import React, { createContext, useState, ReactNode } from 'react';

// Sử dụng interface Product mà bạn đã cung cấp
interface Product {
    product_id: string;
    product_name: string;
    product_size: string;
    product_qty: number;
    product_category: {_id:string,category_name:string};
    product_unit: {_id:string,unit_name:string};
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
    product_total_point: number;
}
interface Exchang_rate {
    exchange_rate: number
}
interface Customer {
    _id: string;
    customer_id: string;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    customer_point:string;
}

// Định nghĩa loại trạng thái giỏ hàng
interface CartContextType {
    cart: Product[];
    rate: Exchang_rate;
    customer: Customer;
    addProduct: (product: Product) => void;
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
    const [customer, setCustomerState] = useState<Customer>({_id:"", customer_id: "", customer_name: "", customer_phone: "", customer_address: "" ,customer_point:""});
    // Hàm tính tổng sản phẩm
    const calculateProductSum = (product: Product): Product => {
        if (product.product_price_sale2_LAK <= 0) {
            const price = product.product_price_sale2_THB * rate.exchange_rate;
            const sum_lak = price * product.product_qty;

            const product_price_sale2_LAK = price;
            const product_sum_lak = sum_lak;
            const product_total_lak = sum_lak - (sum_lak * (product.product_discount / 100));
            const product_total_point = product.product_point * product.product_qty;
            return { ...product, product_price_sale2_LAK, product_sum_lak, product_total_lak, product_total_point };
        } else {
            const sum_lak = product.product_price_sale2_LAK * product.product_qty;
            const product_sum_lak = sum_lak;
            const product_total_lak = sum_lak - (sum_lak * (product.product_discount / 100));
            const product_total_point = product.product_point * product.product_qty;
            return { ...product, product_sum_lak, product_total_lak, product_total_point };
        }
    };

    const addProduct = (product: Product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((p) => p.product_id === product.product_id);
            const productWithQty = { ...product, product_qty: 1 };
            if (existingProduct) {
                // Nếu sản phẩm đã tồn tại trong giỏ, cập nhật số lượng
                return prevCart.map((p) =>
                    p.product_id === product.product_id ?
                        calculateProductSum({
                            ...p,
                            product_qty: p.product_qty + 1,
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
    const clear = () => {
        setCart([]);
        setCustomerState({ _id: "", customer_id: "", customer_name: "", customer_phone: "", customer_address: "",customer_point:"" });
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
        <CartContext.Provider value={{ rate, setRate, cart, addProduct, removeProduct, increaseQuantity, decreaseQuantity, customer, setCustomer, clear }}>
            {children}
        </CartContext.Provider>
    );
};
