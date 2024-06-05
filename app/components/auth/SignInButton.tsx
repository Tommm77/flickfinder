import {Button} from "@/components/ui/button";
import {signIn} from "@/lib/auth";
import {LogIn} from "lucide-react";

export const SignInButton = () => {
    return (
        <form>
            <Button formAction={async () => {
                "use server";
                await signIn();
            }} className="text-sm rounded mr-5">
                <LogIn size={16} className="mr-2" />
                Sign In</Button>
        </form>
    )
}