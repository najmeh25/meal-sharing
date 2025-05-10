"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ textAlign: "center", marginTop: "2rem", padding: "2rem", background: "#f1f1f1" }}>
      <img src="/fastfood.jpeg" alt="Meal Sharing Logo" width="250" style={{ borderRadius: "20px" }} />
      <p>© 2025 Meal Sharing. All rights reserved.</p>
      <div>
        <Link href="/">Home</Link> | <Link href="/meals">Meals</Link> | <Link href="/about">About Us</Link>
      </div>
    </footer>
  );
}
