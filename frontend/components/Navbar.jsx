"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
      <img src="/logo.png" alt="Meal Sharing Logo" width="100" />
      <div style={{ paddingRight: "100px" }}>
        <Link href="/">Home</Link> | <Link href="/meals">Meals</Link> | <Link href="/about">About</Link>
      </div>
    </nav>
  );
}
