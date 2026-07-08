"use client";

import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Show button after a slight delay to let other intro animations finish
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 1500);

		return () => clearTimeout(timer);
	}, []);

	// Replace with actual WhatsApp number
	const phoneNumber = "2348023033816";
	const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hello%20Global%20Sight%20Services%20Limited,%20I%20would%20like%20to%20make%20an%20inquiry.`;

	return (
		<a
			href={whatsappUrl}
			target="_blank"
			rel="noopener noreferrer"
			className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#1ebd57] hover:scale-110 transition-all duration-300 ${
				isVisible
					? "translate-y-0 opacity-100"
					: "translate-y-10 opacity-0 pointer-events-none"
			}`}
			aria-label="Chat with us on WhatsApp"
		>
			<FaWhatsapp className="w-7 h-7" />
		</a>
	);
}
