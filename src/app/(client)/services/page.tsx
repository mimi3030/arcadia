import { ServiceCard } from "@/components/common/ServiceCard"
import { prismaClient } from "@/utils"

export default async function ServicesPage() {
	const services = await prismaClient.service.findMany()
	return (
		<div className="container mx-auto py-8">
			<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 2xl:grid-cols-3">
				{services.map((service) => (
					<ServiceCard key={service.id} service={service} />
				))}
			</div>
		</div>
	)
}
