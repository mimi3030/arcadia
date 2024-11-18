import { Animaux } from "@/app/(client)/animaux"
import { Description } from "@/app/(client)/description"
import { Habitats } from "@/app/(client)/habitats"
import { Services } from "@/app/(client)/services"

export default function Home() {
	return (
		<main>
			<Description />
			<Services />
			<Habitats />
			<Animaux />
		</main>
	)
}
