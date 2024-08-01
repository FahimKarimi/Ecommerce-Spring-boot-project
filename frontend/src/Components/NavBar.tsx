import React from "react";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from "@nextui-org/react";
import {BsBrightnessHigh} from 'react-icons/bs'
import {MdBrightness2} from 'react-icons/md'
import {useTheme} from "next-themes";
import {Link as LinkRoute} from 'react-router-dom'
import userImage from '../assets/images/fahim.jpg'


export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const {theme, setTheme} = useTheme();

    const switchTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    const menuItems = [
        "Students",
        "About"
    ];

    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"}/>
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <LinkRoute to={'/'}>
                        <p className="font-bold text-inherit">Student MS</p>
                    </LinkRoute>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand>
                    <LinkRoute to={'/'}>
                        <p className=" text-inherit">SMS</p>
                    </LinkRoute>
                </NavbarBrand>
                {menuItems.map((item: string) => <NavbarItem key={item}>
                    <LinkRoute color="foreground" to={item.toLowerCase()}>
                        {item}
                    </LinkRoute>
                </NavbarItem>)}
            </NavbarContent>

            <NavbarContent justify="end">
                <Button isIconOnly className={'bg-default-100'} onClick={switchTheme}>
                    {theme === 'light' ? <MdBrightness2/> : <BsBrightnessHigh/>}
                </Button>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name="Jason Hughes"
                            size="sm"
                            src={userImage}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">zoey@example.com</p>
                        </DropdownItem>
                        <DropdownItem key="settings">My Settings</DropdownItem>
                        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                        <DropdownItem key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            href={item.toLowerCase()}
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
