import { ServiceCard } from "@/components/common/ServiceCard"
import { Button } from "@/components/ui/button"
import { prismaClient } from "@/utils"
import Link from "next/link"

export const Services = async () => {
	const services = await prismaClient.service.findMany({
		take: 3,
	})
	return (
		<div className="bg-muted py-8">
			<div className="container mx-auto flex flex-col items-center gap-y-4">
				<p className="font-semibold text-xl">Services</p>
				<div className="flex flex-col gap-x-4 gap-y-4 lg:flex-row">
					{services.map((service) => (
						<ServiceCard key={service.id} service={service} />
					))}
				</div>
				<Button variant="outline">
					<Link href="/services">Voir tous les services</Link>
				</Button>
			</div>
		</div>
	)
}
