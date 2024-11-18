import { getRoleForCurrentUser, isAdmin } from "@/app/sign-in/actions"
import { redirect } from "next/navigation"

export default async function RedirectPage() {
	if (await isAdmin()) {
		return redirect("/admin")
	}
	const role = await getRoleForCurrentUser()
	switch (role) {
		case "Employee":
			return redirect("/employee")
		case "Veterinaire":
			return redirect("/veterinaire")
		default:
			return redirect("/")
	}
}
