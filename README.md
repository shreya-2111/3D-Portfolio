# Sumit Tirmare - Motion Graphic Designer Portfolio

A premium, interactive portfolio website showcasing motion graphic design work with stunning 3D animations and smooth interactions.

![Portfolio Preview](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-0.184.0-black?style=for-the-badge&logo=three.js)

## ✨ Features

- 🎨 **Premium 3D Animations** - Interactive Three.js scenes with React Three Fiber
- 🎭 **Motion Design Elements** - Floating shapes, particles, and cinematic effects
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- 🌙 **Dark Luxury Theme** - Modern design with neon accents
- 📧 **Working Contact Form** - Gmail integration with spam protection
- ⚡ **Optimized Performance** - Fast loading with code splitting
- ♿ **Accessible** - WCAG compliant with keyboard navigation
- 🔒 **Secure** - Input validation and XSS protection

## 🚀 Tech Stack

- **Framework:** Next.js 16.2.4 (App Router)
- **UI Library:** React 19.2.4
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **3D Graphics:** Three.js + React Three Fiber
- **Animations:** Framer Motion + GSAP
- **Icons:** React Icons
- **Email:** Nodemailer (Gmail SMTP)
- **Validation:** Zod

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/sumit-tirmare-portfolio.git

# Navigate to project
cd sumit-tirmare-portfolio

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your Gmail credentials to .env.local
# See contact form setup section below

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Contact Form Setup

The portfolio includes a working contact form that sends emails via Gmail SMTP.

### Prerequisites

1. Gmail account with 2-Step Verification enabled
2. Gmail App Password (not your regular password)

### Setup Steps

1. **Enable 2-Step Verification:**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification if not already enabled

2. **Create App Password:**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Create a new app password for "Portfolio"
   - Copy the 16-character password

3. **Update Environment Variables:**
   ```env
   GMAIL_USER=your.email@gmail.com
   GMAIL_APP_PASSWORD=your_16_character_app_password
   CONTACT_EMAIL=your.email@gmail.com
   ```

4. **Restart Development Server:**
   ```bash
   npm run dev
   ```

5. **Test the Form:**
   - Visit: `http://localhost:3000/api/test-email`
   - Or use the contact form on the website

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   └── portfolio/         # Portfolio components
│   │       ├── sections/      # Page sections
│   │       ├── HeroScene.tsx  # 3D hero animation
│   │       └── ...
│   ├── data/
│   │   └── portfolio.ts       # Portfolio content data
│   └── actions/
│       └── contact.ts         # Contact form server action
├── public/                     # Static assets
└── ...
```

## 🎨 Customization

### Update Personal Information

Edit `src/data/portfolio.ts` to update:
- Name, role, and bio
- Skills and experience
- Projects and testimonials
- Contact information
- Social media links

### Modify Sections

All sections are in `src/components/portfolio/sections/`:
- `HeroSection.tsx` - Landing section with 3D animation
- `AboutSection.tsx` - About me and stats
- `SkillsSection.tsx` - Skills showcase
- `ProjectsSection.tsx` - Portfolio projects
- `ExperienceSection.tsx` - Work timeline
- `ContactSection.tsx` - Contact form

### Customize 3D Animations

Edit `src/components/portfolio/HeroScene.tsx` to modify:
- Shapes and geometries
- Colors and materials
- Animation speeds
- Particle effects

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🐛 Troubleshooting

### Contact Form Issues

**"Gmail authentication failed"**
- Make sure you're using an App Password, not your regular Gmail password
- Remove spaces from the App Password in `.env.local`
- Verify 2-Step Verification is enabled

**"Missing environment variables"**
- Check `.env.local` exists in project root
- Verify all three variables are set
- Restart dev server after changes

**Test endpoint:** `http://localhost:3000/api/test-email`

### 3D Animation Performance

- Reduce particle count in `HeroScene.tsx`
- Disable animations on mobile devices
- Check WebGL support in browser

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Sumit Tirmare**
- Email: tirmaresumit007@gmail.com
- Location: Ahmedabad, Gujarat
- Instagram: [@sumit_0711_](https://instagram.com/sumit_0711_)
- LinkedIn: [Sumit Tirmare](https://linkedin.com/in/sumit-tirmare-71047620b)

## 🙏 Acknowledgments

- Three.js community for amazing 3D graphics
- Next.js team for the incredible framework
- Framer Motion for smooth animations
- All open source contributors

---

Made with ❤️ by Shreya Raval