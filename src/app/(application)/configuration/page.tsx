"use client";

import { useEffect, useState } from "react";

export default function Configuration() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [unionLevel, setUnionLevel] = useState<number>(1);
    const [solPhase, setSolPhase] = useState<number>(1);
    const [server, setServer] = useState<string>("");
    const mainAccountKey = "mainAccount";

    useEffect(() => {
        const mainAccount = localStorage.getItem(mainAccountKey);
        if (mainAccount) {
            try {
                const parsedAccount = JSON.parse(mainAccount);
                if (parsedAccount) {
                    setUnionLevel(parsedAccount.ul);
                    setSolPhase(parsedAccount.sp);
                    setServer(parsedAccount.server);
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

    const handleUlChange = (value: string) => {
        const newValue = parseInt(value);
        if (!isNaN(newValue)) {
            setUnionLevel(newValue);
            const mainAccount = localStorage.getItem(mainAccountKey);
            if (mainAccount) {
                try {
                    const parsedAccount = JSON.parse(mainAccount);
                    parsedAccount.ul = newValue;
                    localStorage.setItem(mainAccountKey, JSON.stringify(parsedAccount));
                } catch (error) {
                    setError("Failed to parse and update mainAccount in localStorage.");
                }
            } else {
                setError("No mainAccount found in localStorage.");
            }
        } else {
            setError("Invalid input for Union Level.");
        }
    };

    const handleSolPhaseChange = (value: string) => {
        const newValue = parseInt(value);
        if (!isNaN(newValue)) {
            setSolPhase(newValue);
            const mainAccount = localStorage.getItem(mainAccountKey);
            if (mainAccount) {
                try {
                    const parsedAccount = JSON.parse(mainAccount);
                    parsedAccount.sp = newValue;
                    localStorage.setItem(mainAccountKey, JSON.stringify(parsedAccount));
                } catch (error) {
                    setError("Failed to parse and update mainAccount in localStorage.");
                }
            } else {
                setError("No mainAccount found in localStorage.");
            }
        } else {
            setError("Invalid input for SOL3 Phase.");
        }
    };

    const handleServerChange = (value: string) => {
        setServer(value);
        const mainAccount = localStorage.getItem(mainAccountKey);
        if (mainAccount) {
            try {
                const parsedAccount = JSON.parse(mainAccount);
                parsedAccount.server = value;
                localStorage.setItem(mainAccountKey, JSON.stringify(parsedAccount));
            } catch (error) {
                setError("Failed to parse and update mainAccount in localStorage.");
            }
        } else {
            setError("No mainAccount found in localStorage.");
        }
    };

    const handleExport = () => {
        const mainAccount = localStorage.getItem(mainAccountKey);
        if (mainAccount) {
            const blob = new Blob([mainAccount], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'mainAccount.json';
            a.click();
            URL.revokeObjectURL(url);
        } else {
            setError("No mainAccount found in localStorage.");
        }
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target?.result as string);
                    localStorage.setItem(mainAccountKey, JSON.stringify(importedData));
                    // Update the state with the imported data
                    setUnionLevel(importedData.ul);
                    setSolPhase(importedData.sp);
                    setServer(importedData.server);
                } catch (error) {
                    setError("Failed to parse the imported file.");
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div>
            <h1>Configurations</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="mt-4">
                    <h2>Account:</h2>
                    <div>
                        <span>Union Level: </span>
                        <input
                            value={unionLevel}
                            type="number"
                            onChange={(e) => handleUlChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>SOL3 Phase: </span>
                        <select
                            value={solPhase}
                            onChange={(e) => handleSolPhaseChange(e.target.value)}
                        >
                            {[...Array(8)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <span>Server: </span>
                        <select
                            name="server"
                            id="server"
                            value={server}
                            onChange={(e) => handleServerChange(e.target.value)}
                        >
                            <option value="america">America</option>
                            <option value="europe">Europe</option>
                            <option value="asia">Asia</option>
                        </select>
                    </div>
                    <div>
                        <button onClick={handleExport}>Export</button>
                        <input
                            type="file"
                            accept="application/json"
                            onChange={handleImport}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
