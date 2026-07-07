import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Image as ImageIcon, ArrowRight } from "lucide-react";

interface Event {
  id: string;
  title: string;
  short_description: string;
  date: string;
  images: string[];
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function EventsListPage() {
  const { data: events, error } = await supabase
    .from("events")
    .select("id, title, short_description, date, images")
    .order("date", { ascending: false });

  return (
    <main className="min-h-screen bg-white flex flex-col font-sans pb-24">
      {/* Header Section */}
      <div className="bg-[#f8f9fa] pt-12 pb-16 sm:pt-20 sm:pb-24 px-6 relative border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors mb-8 sm:mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-navy-900 leading-tight mb-6">
            All GSSL News & Events
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl">
            Stay updated with our most recent activities, workshops, and milestones as we continue to build and support Nigerian enterprises.
          </p>
        </div>
      </div>

      {/* Events Grid Section */}
      <div className="max-w-6xl mx-auto w-full px-6 py-16 sm:py-20">
        {error || !events || events.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-navy-900 mb-2">No Events Found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We haven't posted any news or events yet. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event: Event) => (
              <Link 
                href={`/events/${event.id}`} 
                key={event.id} 
                className="group block bg-white rounded-[2rem] overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 flex flex-col h-full"
              >
                <div className="relative w-full h-64 bg-gray-100 overflow-hidden flex-shrink-0">
                  {event.images && event.images.length > 0 ? (
                    <Image 
                      src={event.images[0]} 
                      alt={event.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-navy-900 shadow-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-display font-semibold text-navy-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {event.short_description}
                  </p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:gap-3 transition-all gap-2 mt-auto">
                    Read Full Story
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
