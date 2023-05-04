"use client"

import { Chicle } from "next/font/google";
import React, { FC, useEffect, useState } from "react";

interface ClientOnlyProps {
    children: React.ReactNode;
}

const ClientOnly: FC<ClientOnlyProps> = ({children}) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, [])
    
    if (!hasMounted) {
        return null;
    } else {
        return (
            <>
                {children}
            </>
        )
    }
    
}

export default ClientOnly