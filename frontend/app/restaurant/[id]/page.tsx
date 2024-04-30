"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Restaurant} from "@/types";
import {useRouter} from "next/navigation";
import NavBar from "@/components/NavBar";
import RestaurantDetails from "@/app/restaurant/_components/RestaurantDetails";

// app/restaurant/[id].tsx
const RestaurantDetailsPage = ({ params }: { params: { id: string } }) => {

    return (
        <main className="flex flex-col">
            <NavBar />
            <RestaurantDetails params={params} />
        </main>
    )
};

export default RestaurantDetailsPage;