import { getRoleForCurrentUser, isAdmin } from "@/app/sign-in/actions"
import { SignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function SignInPage() {
	if (await isAdmin()) {
		return redirect("/admin")
	}
	const role = await getRoleForCurrentUser()
	switch (role) {
		case "Employee":
			return redirect("/employee")
		case "Veterinaire":
			return redirect("/veterinaire")
	}
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<SignIn fallbackRedirectUrl="/sign-in/redirect" />
		</div>
	)
}
