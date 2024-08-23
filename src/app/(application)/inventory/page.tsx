"use client";

import { useEffect, useState } from "react";

export default function Inventory() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [items, setItems] = useState<any[]>([]);
    const mainAccountKey = "mainAccount";

    const allItems = [
        {
            id: 1,
            name: "Shell Credit",
            img: "shell-credit",
            value: undefined,
            rarity: 3,
        },
        {
            id: 2,
            name: "Premium Ressonance Potion",
            img: "premium-ressonance-potion",
            value: undefined,
            rarity: 5,
        },
        {
            id: 3,
            name: "Advanced Ressonance Potion",
            img: "advanced-ressonance-potion",
            value: undefined,
            rarity: 4,
        },
        {
            id: 4,
            name: "Medium Ressonance Potion",
            img: "medium-ressonance-potion",
            value: undefined,
            rarity: 3,
        },
        {
            id: 5,
            name: "Basic Ressonance Potion",
            img: "basic-ressonance-potion",
            value: undefined,
            rarity: 2,
        },
        {
            id: 6,
            name: "Premium Energy Core",
            img: "premium-energy-core",
            value: undefined,
            rarity: 5,
        },
        {
            id: 7,
            name: "Advanced Energy Core",
            img: "advanced-energy-core",
            value: undefined,
            rarity: 4,
        },
        {
            id: 8,
            name: "Medium Energy Core",
            img: "medium-energy-core",
            value: undefined,
            rarity: 3,
        },
        {
            id: 9,
            name: "Basic Energy Core",
            img: "basic-energy-core",
            value: undefined,
            rarity: 2,
        },
    ]

    useEffect(() => {
        const mainAccount = localStorage.getItem(mainAccountKey);

        if (mainAccount) {
            try {
                const parsedAccount = JSON.parse(mainAccount);
                if (parsedAccount.inventory) {
                    setItems(parsedAccount.inventory);
                } else {
                    setError("No Items found in the mainAccount object.");
                }
            } catch (error) {
                setError("Failed to parse mainAccount from localStorage.");
            }
        } else {
            setError("No mainAccount found in localStorage.");
        }

        setIsLoading(false);
    }, []);

    const handleValueChange = (value: string, id: number) => {
        const newValue = parseInt(value);

        setItems((prevItems) => {
            const updatedItems = prevItems.map((item) => {
                if (item.id === id) {
                    return { ...item, value: newValue };
                }
                return item;
            });

            const mainAccount = localStorage.getItem(mainAccountKey);
            if (mainAccount) {
                try {
                    const parsedAccount = JSON.parse(mainAccount);
                    parsedAccount.inventory = updatedItems;
                    localStorage.setItem(
                        mainAccountKey,
                        JSON.stringify(parsedAccount)
                    );
                } catch (error) {
                    setError("Failed to update mainAccount in localStorage.");
                }
            }

            return updatedItems;
        });
    };

    return (
        <div>
            <h1>Inventory</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="grid grid-cols-4 gap-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={`border border-slate-900 flex flex-col justify-center items-center bg-gradient-to-b ${
                                item.rarity === 5
                                    ? "to-[#5A3911] from-[#D2832A]"
                                    : item.rarity === 4
                                    ? "to-[#3C2A60] from-[#6E48AA]"
                                    : item.rarity === 3
                                    ? "to-[#203D5D] from-[#4882C6]"
                                    : "to-[#2A5630] from-[#4CA85F]"
                            }`}
                        >
                            <img
                                width="80"
                                src={`images/items/${item.img}.png`}
                                alt={item.name}
                            />
                            <h2>{item.name}</h2>
                            <input
                                value={item.value}
                                type="number"
                                onChange={(e) =>
                                    handleValueChange(e.target.value, item.id)
                                }
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
