import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import ContactFooter from "@/components/ContactFooter";

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white flex flex-col font-sans">
      <div className="bg-[#f8f9fa] pt-12 pb-16 sm:pt-20 sm:pb-24 px-6 relative border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors mb-8 sm:mb-12">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2 text-gray-500 font-medium mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-navy-900 leading-tight mb-6">
            {event.title}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl">
            {event.short_description}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-6 py-16 sm:py-20">
        {event.images && event.images.length > 0 && (
          <div className="mb-16">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-6 shadow-md border border-gray-100 bg-gray-50">
              <Image 
                src={event.images[0]} 
                alt={`${event.title} main image`} 
                fill 
                className="object-cover"
                priority
              />
            </div>
            {event.images.length > 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {event.images.slice(1).map((img: string, idx: number) => (
                  <div key={idx} className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 hover:shadow-md transition-shadow">
                    <Image 
                      src={img} 
                      alt={`${event.title} gallery image ${idx + 1}`} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="prose prose-lg sm:prose-xl prose-blue max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
          {event.writeup}
        </div>
      </div>
      
      <ContactFooter />
    </main>
  );
}
