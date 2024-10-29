import { NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { useAuth } from "../../providers/context";

export const OrganizationNav = () => {
    const { logout } = useAuth();
    const menuItems = [
        { label: "Home", href: "/organization" },
        { label: "Manage Opportunities", href: "/organization/opportunities" },
        { label: "Profile", href: "/organization/profile" },
        { label: "Log Out", action: logout }
    ];

    return (
        <>
            <NavbarContent className="hidden sm:flex gap-20" justify="center">
                {menuItems.slice(0, -1).map((item) => ( 
                    <NavbarItem key={item.label}>
                        <Link color="foreground" href={item.href}>
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="lg:flex">
                    <Button as={Link} onClick={logout}>Logout</Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.label}-${index}`}>
                        {item.action ? (
                            <Button
                                color="danger"
                                className="w-full"
                                onClick={item.action}
                                size="lg"
                            >
                                {item.label}
                            </Button>
                        ) : (
                            <Link
                                color={"foreground"}
                                className="w-full"
                                href={item.href}
                                size="lg"
                            >
                                {item.label}
                            </Link>
                        )}
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </>
    );
};