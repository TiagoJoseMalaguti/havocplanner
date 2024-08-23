import type { Metadata } from "next";
import { Inter as FontSans  } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import Navbar from "@/components/shared/navbar/page";
import { cn } from "@/lib/utils"

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
})

export const metadata: Metadata = {
	title: "Havoc planner",
	description: "Generated by create next app",
};

export default function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn(
				"bg-background font-sans antialiased",
				fontSans.variable
			)}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
