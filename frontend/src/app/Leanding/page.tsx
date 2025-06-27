"use client"; // This is already present and correct

import React from "react";
import Header from "@/components/Header"; // Correct import path for Header
import HeroSection from '../HeroSection/page'; // This path is also correct

export default function Landing() {
    return (
        <div>
            <Header />
            <HeroSection />
        </div>
    );
}