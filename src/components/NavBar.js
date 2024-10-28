'use client'
import React, {useState} from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Link, Button} from "@nextui-org/react";
import { useAuth } from "../providers/context";
import { VolunteerNav } from "./VolunteerNav";
import { OrganizationNav } from "./OrganizationNav";

export const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, userType, loading } = useAuth();
  
    const loggedInButtons = () => {
        if (userType === "volunteer") {
            return <VolunteerNav />
        } else if(userType === "organization") {
            return <OrganizationNav/>
        }
    }
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-white dark:bg-gray-800 shadow-lg max-w-none mx-auto">
        <NavbarContent>
            <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden" 
            />
            <NavbarBrand>
            <p className="font-bold text-inherit">VOL-CONNECT</p>
            </NavbarBrand>
         </NavbarContent>
            {loading ? null : isAuthenticated ? (loggedInButtons()): 
            
            (<NavbarContent justify="end">
                <NavbarItem className="lg:flex">
                <Button as={Link} color="primary" href="/login">Login</Button>
                </NavbarItem>
                <NavbarItem>
                <Button as={Link} color="primary" href="/register" variant="flat">Sign Up</Button>
                </NavbarItem>
            </NavbarContent>)}
            
            </Navbar>
        );
    }
