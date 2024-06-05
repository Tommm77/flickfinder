"use client";

import {PropsWithChildren} from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {signOut} from "@/lib/auth";
import {signOutAction} from "@/app/components/auth/auth.action";
import {LogOut} from "lucide-react";

export type LoggedInDropdownProps = PropsWithChildren

export const LoggedInDropdown = ({children}: LoggedInDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                    <DropdownMenuItem
                        onClick={() => {
                            signOutAction();
                    }}>
                        <LogOut size={16} className="mr-2" />
                        Logout
                    </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}