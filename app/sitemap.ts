import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://globalsightservicesltd.com";

	// Fetch dynamic events
	const { data: events } = await supabase.from("events").select("id, date");

	const eventUrls =
		events?.map((event) => ({
			url: `${baseUrl}/events/${event.id}`,
			lastModified: new Date(event.date),
			changeFrequency: "weekly" as const,
			priority: 0.8,
		})) || [];

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/events`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		...eventUrls,
	];
}
