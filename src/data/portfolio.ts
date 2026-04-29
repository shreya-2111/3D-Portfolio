export const portfolioData = {
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    name: "Sumit Tirmare",
    title: "Motion Graphic Designer & 2D Animator",
    tagline: "Crafting visuals that move emotions",
    intro:
      "Motion direction for product launches, brand films, and cinematic 2D storytelling.",
    chips: ["Cinematic reels", "Motion animated videos", "2D motion systems"],
    spotlight: [
      { label: "Focus", value: "2D Product Launches" },
      { label: "Style", value: "Luxury Motion Systems" },
    ],
    availability: {
      label: "Now Booking",
      value: "Open for Projects",
      meta: ["Remote worldwide", "Fast turnaround"],
    },
  },
  about: {
    bio: "I am a creative motion designer with 5+ years of experience creating brand animations, product visuals, and immersive 2D content.",
    description:
      "My process blends strategy, atmosphere, and motion craft to turn launches and campaigns into experiences with weight and memory.",
    stats: [
      { value: 50,  suffix: "+", label: "Projects" },
      { value: 20,  suffix: "+", label: "Clients" },
      { value: 5,   suffix: "+", label: "Years Experience" },
    ],
  },
  skills: [
    {
      name: "After Effects",
      icon: "after-effects",
      description: "Motion graphics, animation, and visual effects.",
    },
    {
      name: "Blender",
      icon: "blender",
      description: "3D modeling, animation, rendering, and simulation.",
    },
    {
      name: "Cinema 4D",
      icon: "cinema-4d",
      description: "Professional 3D motion design and animation.",
    },
    {
      name: "Premiere Pro",
      icon: "premiere-pro",
      description: "Video editing, sequencing, and post-production.",
    },
    {
      name: "Photoshop",
      icon: "photoshop",
      description: "Photo editing, compositing, and digital artwork.",
    },
    {
      name: "Illustrator",
      icon: "illustrator",
      description: "Vector design, logos, icons, and illustrations.",
    },
  ],
  projects: [
    {
      title: "Hospital Brand Reel",
      category: "Reel",
      description:
        "A brand reel for a hospital, blending trust-building visuals with clean motion design and a warm cinematic tone.",
      previewLabel: "Brand storytelling",
      deliverable: "Brand reel",
      year: "2025",
      accent: "from-[#59e7ff]/24 via-transparent to-[#f85f9b]/18",
      image: "/assets/hospital.jpg",
      reelVideo: "/assets/hospital.mp4",
    },
    {
      title: "Furniture Showcase Video",
      category: "Product Film",
      description:
        "A sleek product showcase highlighting premium furniture designs with elegant camera movement and refined lighting.",
      previewLabel: "Product lighting",
      deliverable: "Product film",
      year: "2026",
      accent: "from-[#74f0d6]/22 via-transparent to-[#5f8cff]/16",
      image: "/assets/furniture.jpg",
      reelVideo: "/assets/furniture.mp4",
    },
    {
      title: "Headphone Product Animation",
      category: "Electronic Gadget",
      description:
        "A dynamic animated product reveal for a headphone brand, featuring bold transitions and immersive sound-driven motion.",
      previewLabel: "Product reveal",
      deliverable: "Product animation",
      year: "2025",
      accent: "from-[#f5c27c]/22 via-transparent to-[#7ca7ff]/18",
      image: "/assets/headphone.jpg",
      reelVideo: "/assets/headphone.mp4",
    },
    {
      title: "Cinematic AI Video",
      category: "Animated",
      description:
        "A cinematic AI-generated video blending atmospheric visuals, dramatic pacing, and premium motion storytelling.",
      previewLabel: "Cinematic pacing",
      deliverable: "Cinematic film",
      year: "2024",
      accent: "from-[#f85f9b]/24 via-transparent to-[#7ca7ff]/18",
      image: "/assets/cinematic.jpg",
      reelVideo: "/assets/cinemetic.mp4",
    },
    {
      title: "AI Generated Video (Hanumanji)",
      category: "Animated",
      description:
        "A cinematic animated retelling of the Hanumanji story, crafted with AI-assisted visuals and fluid motion choreography.",
      previewLabel: "AI visuals",
      deliverable: "Animated film",
      year: "2026",
      accent: "from-[#7ca7ff]/25 via-transparent to-[#59e7ff]/20",
      image: "/assets/hanumanji.jpg",
      reelVideo: "/assets/hanumaji.mp4",
    },
  ],
  showreel: {
    label: "Showreel 2025",
    title: "Premium motion sequences with depth, rhythm, and luminous transitions.",
    description:
      "A curated selection of brand films, product launches, and motion experiments.",
    beats: ["Lighting study", "Type choreography", "Audio sync"],
  },
  timeline: [
    {
      year: "2023",
      title: "Junior Motion Graphic Designer",
      description:
        "Created animated and AI-generated videos for brands, developing a strong visual language across motion and storytelling.",
    },
    {
      year: "2021",
      title: "Video Editor",
      description:
        "Produced animated videos and edited content for clients, sharpening skills in pacing, rhythm, and post-production.",
    },
    {
      year: "2019",
      title: "Motion Graphics — Self-Taught Foundation",
      description:
        "Built core skills in motion graphics, learning animation principles, compositing, and visual storytelling from the ground up.",
    },
  ],
  testimonials: [
    {
      quote: "Amazing visuals and fast delivery.",
      name: "Sarah Khan",
      role: "Brand Strategist",
    },
    {
      quote: "Our brand engagement doubled.",
      name: "Michael Lee",
      role: "Marketing Lead",
    },
    {
      quote: "Highly creative and professional.",
      name: "David Roy",
      role: "Creative Director",
    },
  ],
  contact: {
    email: "tirmaresumit007@gmail.com",
    phone: "+91 97258 74339",
    location: "Ahmedabad, Gujarat",
    projectTypes: [
      "Brand film",
      "Product launch",
      "Explainer video",
      "AI generated video",
      "2D motion content",
    ],
  },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/sumit_0711_" },
    { label: "LinkedIn",  href: "https://www.linkedin.com/in/sumit-tirmare-71047620b" },
  ],
} as const;

export type PortfolioData = typeof portfolioData;
export type SkillName = (typeof portfolioData.skills)[number]["name"];
export type SkillIconName = (typeof portfolioData.skills)[number]["icon"];
export type SocialName = (typeof portfolioData.socials)[number]["label"];
