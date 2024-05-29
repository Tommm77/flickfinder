import Link from "next/link";
import {CustomIcon} from "@/app/components/icons/icons";
import {Button} from "@/components/ui/button";

export const Navbar = () => {
    return (
        <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b">
            <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
                <CustomIcon name="logo" size={400} className="mt-2"/>
            </Link>
            <div className="flex items-center gap-14 mt-2">
                <a className="text-lg rounded">
                    Pricing
                </a>
                <Button className="text-sm rounded mr-5">
                    Sign In
                </Button>
            </div>
        </header>
    );
}