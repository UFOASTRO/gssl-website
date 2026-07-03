<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


<!-- BEGIN:design-agent-rules -->
# SYSTEM PROMPT FOR AI AGENT: GSSL LANDING PAGE DEVELOPMENT

**Role:** Expert Frontend Developer & UI/UX Engineer
**Task:** Build a highly interactive, responsive, and visually striking landing page for Global Sight Services Limited (GSSL). You will be provided with a context document about GSSL and two reference images: "Screenshot 2026-07-03 at 2.54.41 PM.png" (overall layout) and "Screenshot 2026-07-03 at 11.12.09 AM.png" (glassmorphism UI element). 

**Design Philosophy:** Use the provided images as *layout inspiration only*. Replace all placeholder or non-GSSL brands with accurate GSSL branding, text, and context derived from the uploaded GSSL document. The design must be well-spaced, highly interactive, and exude premium consulting credibility.

---

## 1. TECH STACK & LIBRARIES
Please install and utilize the following libraries to achieve the desired modern, smooth, and interactive feel:
*   **Framework:** Next.js / React
*   **Styling:** Tailwind CSS (for rapid, utility-first layout styling)
*   **Typography:** Next/Font (loading `Inter` for body copy and `Satoshi` for headings)
*   **Animations:** `GSAP` (GreenSock Animation Platform) for advanced timeline animations and smooth scrolling. 
*   **Visibility Detection:** Native `IntersectionObserver` API (or `react-intersection-observer`) coupled with GSAP to trigger enter/exit animations as sections scroll into view.
*   **Marquee/Carousels:** `react-fast-marquee` (or a custom GSAP loop).

---

## 2. GLOBAL STYLES & TYPOGRAPHY
*   **Fonts:** Strictly use **Satoshi** for primary headings/display text and **Inter** for body copy and UI elements.
*   **Layout:** Ensure generous white space (padding/margins) between sections to match the premium, breathable feel of the reference layout.

---

## 3. DEVELOPMENT ROADMAP & SECTION REQUIREMENTS

Execute the development in the following sequence:

### Step 1: The Navigation Bar (Start Here)
*   Redesign the navbar to visually match the top section of "Screenshot 2026-07-03 at 2.54.41 PM.png".
*   **Styling:** Implement pill-shaped, rounded borders for the navbar container to create a welcoming, modern feel.
*   **Behavior:** Make it a sticky/floating navbar with a subtle backdrop blur on scroll.

### Step 2: Hero Section & Glassmorphism Overlay
*   **Codebase Note:** The foundational Hero text and the 3D Globe element *already exist* in the codebase. Integrate your code around them cleanly.
*   **Glassmorphism Element:** Intricately recreate the floating card style seen in "Screenshot 2026-07-03 at 11.12.09 AM.png". 
*   **Overlay Placement & Content:** Place this glassmorphism card floating on top of the globe to explain what the globe represents. It must establish immediate credibility using the following text:
    > "5+ States Activated," "6 Proprietary Tech Platforms," "Thousands of MSMEs Empowered."

### Step 3: Infinite Partners Marquee
*   **Layout:** A sleek, horizontal, infinite scrolling marquee placed directly below the hero section.
*   **Assets:** Reference the `{@Partners-logos}` directory in the `public` folder. Include logos for NNPC, SMEDAN, Ecobank, Polaris Bank, and the government seals of Oyo, Bauchi, and Kano.
*   **Interactivity:** Ensure the logos are greyscaled by default. On mouse hover, the marquee must **pause**, and the hovered logo must transition smoothly into full color. When un-hovered, it reverts to greyscale and resumes scrolling.

### Step 4: Core Focus Areas
*   **Content:** A high-level overview of the GSSL mission: MSME development, digital solution development, and institutional partnerships.
*   **Layout:** Create a unique, asymmetric layout design inspired by the offset image/text blocks in the reference wireframe. 

### Step 5: The GSSL Advantage (Why Choose Us)
*   **Placement:** Insert this new section *between* "Core Focus Areas" and "Consulting & Advisory Solutions".
*   **Layout:** A clean 3-column layout.
*   **Content:** Detail GSSL's workflow, specifically highlighting:
    1. Public-sector insight
    2. Technology integration
    3. End-to-end project management.

### Step 6: Consulting & Advisory Solutions
*   **Layout:** Follow the text-heavy, drill-down style shown in the wireframe. 
*   **Content:** Highlight specific offerings such as Business Transformation, Market Access, and Capacity Building.

### Step 7: Digital Ecosystem / Technology-Enabled Platforms
*   **Layout:** A bento-box or grid layout of cards representing different platforms.
*   **Content:** Include pictures, brief descriptions, and hyperlinks to completed projects.
*   **Assets:** Reference images from `@projects-completed` in the `public` folder.

### Step 8: Our National Footprint (Regional Impact)
*   **Layout:** Recreate the connected-node diagram design seen in the reference image (Boxes representing Oyo, Kano, Bauchi, Lagos connected by lines).
*   **Content:** Ensure a large descriptive text block sits adjacent to the interactive node map to explain the regional impact.

### Step 9: Executive Leadership / Our Team
*   **Placement:** Near the bottom, directly *before* the "Contact Us" section.
*   **Content:** Premium consulting requires trust. Design a clean, high-end grid featuring professional headshots, names, titles, and short bios of the key directors/founders.

### Step 10: Contact Us & Footer
*   **Layout:** Follow the block-grid layout at the bottom of the wireframe for the contact forms/details.
*   **Footer:** Recreate the massive typography "COSMOS" footer style from the reference image, replacing it with the appropriate GSSL branding and maintaining the clean utility links (address, social links, legal).

---

## 4. ANIMATION & INTERACTIVITY DIRECTIVES
*   Use `IntersectionObserver` paired with `GSAP` to trigger fade-ins, slight Y-axis translations (slide-ups), and stagger effects for lists/grid items as the user scrolls down the page.
*   Hover states on all buttons and cards should be smooth, utilizing CSS transitions or GSAP for scaling and shadow adjustments.

**Execution Prompt:** Read the provided GSSL context document to fill in the exact copy where necessary. Begin by outputting the code for the Navigation Bar and Hero Section first. @GSSL.md


always test and fix build erros with `npm run build`
<!-- END:design-agent-rules -->
