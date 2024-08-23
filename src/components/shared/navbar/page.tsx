"use client"

import Link from "next/link";

export default function Navbar() {

    const handleDeleteLocalStorage = () => {
        localStorage.removeItem("mainAccount")
        window.location.reload();
    }

    return (
        <header className="bg-slate-800 py-8">
            <ul className="flex flex-row justify-between px-4">
                <li>
                    <Link href={"/"} className="px-4 py-1 bg-blue-500 rounded-lg font-bold uppercase">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href={"/ressonators"} className="px-4 py-1 bg-blue-500 rounded-lg font-bold uppercase">
                        Ressonators
                    </Link>
                </li>
                <li>
                    <Link href={"/inventory"} className="px-4 py-1 bg-blue-500 rounded-lg font-bold uppercase">
                        Inventory
                    </Link>
                </li>
                <li>
                    <Link href={"/configuration"} className="px-4 py-1 bg-blue-500 rounded-lg font-bold uppercase">
                        Configuration
                    </Link>
                </li>
                <button className="bg-red-700 uppercase px-4 py-2 rounded-2xl font-bold" onClick={handleDeleteLocalStorage}>
                    Limpar LS
                </button>
            </ul>
        </header>
    )
}
