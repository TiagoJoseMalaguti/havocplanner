"use client";
import { useEffect } from "react";

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    useEffect(() => {
        const mainAccountKey = "mainAccount";
        const existingData = localStorage.getItem(mainAccountKey);

        if (!existingData) {
            const main = {
                goals: [
                    {
                        type: "ressonator",
                        ressonator: "jiyan",
                        element: "Aero",
                        img: "Wuthering-Waves-Jiyan.png",
                        rarity: 5,
                        current: { level: 1, asc: 0, text: "1" },
                        goal: { level: 90, asc: 6, text: "90" },
                        cost: { credit: 170000, penergy: 118, aenergy: 6, menergy: 7, benergy: 6},
                        id: 1,
                    },
                    {
                        type: "ressonator",
                        ressonator: "mortefi",
                        element: "Fusion",
                        img: "Wuthering-Waves-Mortefi.png",
                        rarity: 4,
                        current: { level: 1, asc: 0, text: "1" },
                        goal: { level: 90, asc: 6, text: "90" },
                        cost: { credit: 170000, penergy: 118, aenergy: 6, menergy: 7, benergy: 6},
                        id: 2,
                    },
                    {
                        type: "ressonator",
                        ressonator: "verina",
                        element: "Spectro",
                        img: "Wuthering-Waves-Verina.webp",
                        rarity: 5,
                        current: { level: 1, asc: 0, text: "1" },
                        goal: { level: 90, asc: 6, text: "90" },
                        cost: { credit: 170000, penergy: 118, aenergy: 6, menergy: 7, benergy: 6},
                        id: 3,
                    },
                    {
                        type: "talent",
                        ressonator: "jiyan",
                        normal: { current: 1, goal: 10 },
                        skill: { current: 1, goal: 1 },
                        burst: { current: 1, goal: 5 },
                        id: 123,
                    },
                    {
                        type: "weapon",
                        id: 321,
                        ressonator: "jiyan",
                        weapon: "crimson_moons_semblance",
                        current: { level: 1, asc: 0, text: "1" },
                        goal: { level: 90, asc: 6, text: "90" },
                    },
                    {
                        type: "weapon",
                        id: 223,
                        weapon: "the_dockhands_assistant",
                        current: { level: 1, asc: 0, text: "1" },
                        goal: { level: 90, asc: 6, text: "90" },
                    },
                ],
                inactive: {},
                notes: {},
                custom_items: [],
                customs: {},
                inventory: [
                    {
                        id: 1,
                        name: "Shell Credit",
                        img: "shell-credit",
                        value: 33,
                        rarity: 3,
                    },
                    {
                        id: 2,
                        name: "Premium Ressonance Potion",
                        img: "premium-ressonance-potion",
                        value: 44,
                        rarity: 5,
                    },
                ],
                tasks: [],
                ul: 38,
                sp: 4,
                server: "america",
            };

            const jsonString = JSON.stringify(main);
            localStorage.setItem(mainAccountKey, jsonString);
        } else {
            console.log("mainAccount already exists in localStorage.");
        }
    }, []);

    return <>{children}</>;
}
