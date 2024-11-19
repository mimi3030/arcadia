import { EmployeeServiceCard } from "@/app/employee/services/service-card"
import { prismaClient } from "@/utils"

export default async function EmployeeServicesPage() {
	const services = await prismaClient.service.findMany()
	return (
		<div className="flex flex-col gap-y-8">
			<h1 className="font-bold text-xl">Services</h1>
			<div className="flex flex-col gap-y-4">
				{services.map((service) => (
					<EmployeeServiceCard key={service.id} service={service} />
				))}
			</div>
		</div>
	)
}
