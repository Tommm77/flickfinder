import {auth} from "@/lib/auth";
import {SignInButton} from "@/app/components/auth/SignInButton";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {LoggedInDropdown} from "@/app/components/auth/LoggedInDropdown";

export const LoggedInButton = async () => {
    const session = await auth()

    if (!session?.user) {
        return (
            <SignInButton />
        )
    }

    return (
        <LoggedInDropdown>
            <Button className="text-sm rounded mr-5">
                <Avatar className="size-8">
                    <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
                    {session.user.image ? (
                        <AvatarImage src={session.user.image} alt={`${session.user.name ?? "-"}'s profile picture`} />
                    ): null}
                </Avatar>
            </Button>
        </LoggedInDropdown>
    )
}