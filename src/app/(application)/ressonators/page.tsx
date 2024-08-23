"use client";

import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function Ressonators() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [goals, setGoals] = useState<any[]>([]);
    const [showRessonators, setShowRessonators] = useState(false);
    const [showCurrentRessonator, setShowCurrentRessonator] = useState(false);
    const mainAccountKey = "mainAccount";
    const [currentRessonator, setCurrentRessonator] = useState<any>({});

    const allRessonators = [
        {
            id: 1,
            name: "Jiyan",
            image: "Wuthering-Waves-Jiyan.png",
            rarity: 5,
            element: "Aero",
        },
        {
            id: 2,
            name: "Mortefi",
            image: "Wuthering-Waves-Mortefi.png",
            rarity: 4,
            element: "Fusion",
        },
        {
            id: 3,
            name: "Verina",
            image: "Wuthering-Waves-Verina.webp",
            rarity: 5,
            element: "Spectro",
        },
        {
            id: 4,
            name: "Sanhua",
            image: "Wuthering-Waves-Sanhua.png",
            rarity: 4,
            element: "Glacio",
        },
        {
            id: 5,
            name: "Aalto",
            image: "Wuthering-Waves-Aalto.png",
            rarity: 4,
            element: "Aero",
        },
        {
            id: 6,
            name: "Encore",
            image: "Wuthering-Waves-Encore.png",
            rarity: 5,
            element: "Fusion",
        },
        {
            id: 7,
            name: "Baizhi",
            image: "Wuthering-Waves-Baizhi.png",
            rarity: 4,
            element: "Glacio",
        },
        {
            id: 8,
            name: "Calcharo",
            image: "Wuthering-Waves-Calcharo.png",
            rarity: 5,
            element: "Electro",
        },
        {
            id: 9,
            name: "Chixia",
            image: "Wuthering-Waves-Chixia.png",
            rarity: 4,
            element: "Havoc",
        },
        {
            id: 10,
            name: "Danjin",
            image: "Wuthering-Waves-Danjin.png",
            rarity: 4,
            element: "Fusion",
        },
        {
            id: 11,
            name: "Jianxin",
            image: "Wuthering-Waves-Jianxin.png",
            rarity: 5,
            element: "Aero",
        },
        {
            id: 12,
            name: "Lingyang",
            image: "Wuthering-Waves-Lingyang.png",
            rarity: 5,
            element: "Glacio",
        },
        {
            id: 13,
            name: "Rover Spectro",
            image: "Wuthering-Waves-Rover.png",
            rarity: 5,
            element: "Spectro",
        },
        {
            id: 14,
            name: "Rover Havoc",
            image: "Wuthering-Waves-Rover.png",
            rarity: 5,
            element: "Havoc",
        },
        {
            id: 15,
            name: "Taoqi",
            image: "Wuthering-Waves-Taoqi.png",
            rarity: 4,
            element: "Havoc",
        },
        {
            id: 16,
            name: "Yuanwu",
            image: "Wuthering-Waves-Yuanwu.png",
            rarity: 4,
            element: "Electro",
        },
        {
            id: 17,
            name: "YangYang",
            image: "Wuthering-Wave-YangYang.png",
            rarity: 4,
            element: "Aero",
        },
    ];

    const handleCloseRessonators = () => setShowRessonators(false);
    const handleShowRessonators = () => setShowRessonators(true);

    const handleShowCurrentRessonator = (ressonator: any) => {
        handleCloseRessonators()
        setShowCurrentRessonator(true)
        console.log('currentRessonator: ', ressonator)
        setCurrentRessonator(ressonator);
    };
    
    const handleCloseCurrentRessonator = () => {
        setShowCurrentRessonator(false)
        setCurrentRessonator({})
    };

    useEffect(() => {
        const mainAccount = localStorage.getItem(mainAccountKey);

        if (mainAccount) {
            try {
                const parsedAccount = JSON.parse(mainAccount);
                if (parsedAccount.goals) {
                    const ressonatorGoals = parsedAccount.goals.filter(
                        (goal: any) => goal.type === "ressonator"
                    );
                    setGoals(ressonatorGoals);
                } else {
                    setError("No goals found in the mainAccount object.");
                }
            } catch (e) {
                setError("Failed to parse mainAccount from localStorage.");
            }
        } else {
            setError("No mainAccount found in localStorage.");
        }

        setIsLoading(false);
    }, []);

    const addRessonator = (ressonator: any, currentLvl: number, currentAsc: number, currentText: string, goalLvl: number, goalAsc:number, goalText:string) => {
        const mainAccount = localStorage.getItem(mainAccountKey);

        console.log(ressonator);
        if (mainAccount) {
            try {
                const parsedAccount = JSON.parse(mainAccount);

                // Ensure goals array exists
                if (!parsedAccount.goals) {
                    parsedAccount.goals = [];
                }

                // Add the new ressonator goal
                parsedAccount.goals.push({
                    type: "ressonator",
                    ressonator: ressonator.name,
                    element: ressonator.element,
                    img: ressonator.image,
                    rarity: ressonator.rarity,
                    current: { level: currentLvl, asc: currentAsc, text: currentText }, // Replace with actual value
                    goal: { level: goalLvl, asc: goalAsc, text: goalText }, // Replace with actual value
                    id: ressonator.id,
                });

                // Save the updated mainAccount back to localStorage
                localStorage.setItem(
                    mainAccountKey,
                    JSON.stringify(parsedAccount)
                );

                // Update the goals state
                setGoals(
                    parsedAccount.goals.filter(
                        (goal: any) => goal.type === "ressonator"
                    )
                );

                handleCloseCurrentRessonator()
            } catch (e) {
                setError("Failed to parse mainAccount from localStorage.");
            }
        } else {
            setError("No mainAccount found in localStorage.");
        }
    };

    const removeRessonator = (id: number) => {
        const mainAccount = localStorage.getItem(mainAccountKey);

        if (mainAccount) {
            try {
                const parsedAccount = JSON.parse(mainAccount);

                // Remove the ressonator from goals
                parsedAccount.goals = parsedAccount.goals.filter(
                    (goal: any) => goal.id !== id
                );

                // Save the updated mainAccount back to localStorage
                localStorage.setItem(
                    mainAccountKey,
                    JSON.stringify(parsedAccount)
                );

                // Update the goals state
                setGoals(
                    parsedAccount.goals.filter(
                        (goal: any) => goal.type === "ressonator"
                    )
                );
            } catch (e) {
                setError("Failed to parse mainAccount from localStorage.");
            }
        } else {
            setError("No mainAccount found in localStorage.");
        }
    };

    // Filter the ressonators list to exclude those already in goals
    const availableRessonators = allRessonators.filter(
        (ressonator) => !goals.some((goal) => goal.id === ressonator.id)
    );

    console.log(goals);

    return (
        <div>
            <h1>Ressonators</h1>
            <Button variant="primary" onClick={handleShowRessonators}>
                Add ressonator
            </Button>

            <Modal show={showRessonators} onHide={handleCloseRessonators}>
                <Modal.Header closeButton>
                    <Modal.Title>Ressonators</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="grid grid-cols-4 gap-4">
                        {availableRessonators.map((ressonator) => (
                            <div
                                key={ressonator.id}
                                className="border border-slate-950 flex justify-center items-center flex-col"
                                // onClick={() => addRessonator(ressonator)}
                                onClick={() => handleShowCurrentRessonator(ressonator)}
                            >
                                <img
                                    src={`images/ressonators/${ressonator.image}`}
                                    alt=""
                                    width="128"
                                />
                                <img
                                    src={`images/elements/Wuthering-Waves-${ressonator.element}.png`}
                                    alt=""
                                    width="48"
                                />
                            </div>
                        ))}
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showCurrentRessonator} onHide={handleCloseCurrentRessonator}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentRessonator.name} - {currentRessonator.element}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="grid grid-cols-4 gap-4 py-4">
                        {currentRessonator.name}
                    </div>
                    <button 
                        className="bg-blue-600 p-2 rounded-lg" 
                        onClick={() => addRessonator(currentRessonator, 1, 1, '1', 90, 5, '90')}
                        >
                        Adicionar
                    </button>
                </Modal.Body>
            </Modal>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="grid grid-cols-4 gap-4">
                    {goals.map((goal) => (
                        <div
                            key={goal.id}
                            className={`border border-slate-700 flex flex-col justify-center items-center bg-gradient-to-b ${
                                goal.rarity == 5
                                    ? "to-[#5A3911] from-[#D2832A]"
                                    : "to-[#251e4c] from-[#7b4faf]"
                            }`}
                        >
                            <img
                                src={`images/ressonators/${goal.img}`}
                                alt={goal.ressonator}
                                width="256"
                                height="256"
                            />
                            <img
                                src={`images/elements/Wuthering-Waves-${goal.element}.png`}
                                alt={goal.element}
                                width="48"
                                height="48"
                            />
                            <h1>{goal.ressonator}</h1>
                            <h2>Current: {goal.current.text}</h2>
                            <h2>Goal: {goal.goal.text}</h2>
                            <button
                                className="btn btn-danger"
                                onClick={() => removeRessonator(goal.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
