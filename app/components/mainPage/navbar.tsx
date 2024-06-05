import Link from "next/link";
import { CustomIcon } from "@/app/components/icons/icons";
import { Button } from "@/components/ui/button";
import {signIn} from "@/lib/auth";
import {LoggedInButton} from "@/app/components/auth/LoggedInButton";

export const Navbar = () => {
    return (
        <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b">
            <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
                <CustomIcon name="logo" size={200} className="mt-2 sm:size-96" />
            </Link>
            <div className="flex items-center gap-4 md:gap-14 mt-2">
                <a className="text-lg rounded">Pricing</a>
                <LoggedInButton />
            </div>
        </header>
    );
};
