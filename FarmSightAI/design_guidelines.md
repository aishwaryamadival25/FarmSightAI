# Design Guidelines: AI-Driven Crop Disease Detection App

## Design Approach
**System Selected:** Material Design with Agricultural Theme Adaptation
**Justification:** This utility-focused agricultural application requires clarity, data hierarchy, and trust. Material Design's structured approach to information-dense interfaces combined with earth-tone customization creates a professional, reliable tool for farmers and agricultural professionals.

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 125 45% 35% (Deep agricultural green)
- Primary Variant: 125 40% 25% (Darker green for emphasis)
- Secondary: 35 55% 45% (Earth brown for accents)
- Success: 145 50% 40% (Healthy crop green)
- Warning: 45 85% 50% (Disease alert yellow)
- Error: 5 70% 50% (Critical disease red)
- Background: 0 0% 98% (Clean white base)
- Surface: 0 0% 100% (Card backgrounds)
- Text Primary: 0 0% 15%
- Text Secondary: 0 0% 45%

**Dark Mode:**
- Primary: 125 35% 55% (Lighter green for contrast)
- Primary Variant: 125 40% 65%
- Secondary: 35 30% 55%
- Success: 145 40% 50%
- Warning: 45 75% 60%
- Error: 5 65% 60%
- Background: 0 0% 10% (Deep charcoal)
- Surface: 0 0% 15% (Card backgrounds)
- Text Primary: 0 0% 95%
- Text Secondary: 0 0% 70%

### B. Typography

**Font Families:**
- Primary: 'Inter' - Modern, readable sans-serif for UI and data
- Headings: 'Inter' - Weights 600-700 for hierarchy
- Monospace: 'JetBrains Mono' - For confidence scores and environmental data

**Typographic Scale:**
- Hero/H1: text-4xl md:text-5xl, font-bold
- Section Headers/H2: text-3xl md:text-4xl, font-semibold
- Subsections/H3: text-xl md:text-2xl, font-semibold
- Card Titles/H4: text-lg md:text-xl, font-medium
- Body Text: text-base, font-normal
- Captions/Labels: text-sm, font-medium
- Environmental Data: text-sm, font-mono

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20
- Tight spacing: p-2, gap-2 (form fields, chips)
- Standard spacing: p-4, gap-4 (cards, sections)
- Generous spacing: p-8, gap-8 (major sections)
- Section padding: py-12 md:py-20

**Grid Structure:**
- Container: max-w-7xl mx-auto px-4
- Upload Section: Single column, centered, max-w-2xl
- Crop Categories: grid-cols-2 md:grid-cols-3 lg:grid-cols-5
- Disease Results: 2-column split (image + analysis)
- Environmental Factors: grid-cols-2 md:grid-cols-4

### D. Component Library

**Image Upload Zone:**
- Large drag-and-drop area with dashed border (border-dashed border-2)
- Icon: Upload cloud icon from Heroicons (cloud-arrow-up)
- Hover state: Subtle background tint with primary color
- File preview thumbnails in grid-cols-3 md:grid-cols-4
- Image dimensions displayed below thumbnails

**Crop Category Cards:**
- Rounded cards with subtle shadow (rounded-lg shadow-md)
- Category icon at top (wheat, rice, corn, tomato, potato icons)
- Category name and disease count
- Active state: Primary color border and background tint
- Hover: Subtle lift with shadow-lg transition

**Environmental Factors Form:**
- Grouped input fields with labels
- Icon prefixes for each field (thermometer, droplet, cloud-rain from Heroicons)
- Range sliders for continuous values (temperature, humidity)
- Dropdowns for categorical data (soil type, season)
- Input styling: rounded-md border-2 with focus ring

**Disease Detection Results Card:**
- Split layout: Uploaded image (left) | Analysis (right)
- Disease name header with severity badge
- Confidence score with progress bar visualization
- Expandable sections for: Symptoms, Causes, Treatment
- Color-coded severity indicators (success/warning/error palette)
- Environmental impact analysis below main result

**Analysis History:**
- Timeline-style list with thumbnail previews
- Date stamps and crop type labels
- Quick re-analysis button
- Filter by crop category and date range

**Navigation:**
- Top app bar with logo and user menu
- Sticky header on scroll
- Tab navigation for: Upload, History, Insights, Settings
- Mobile: Hamburger menu with slide-out drawer

**Data Visualization:**
- Confidence scores: Horizontal progress bars with percentage
- Environmental factors: Icon + value pairs in grid
- Disease prevalence: Simple bar charts using CSS (no complex libraries)
- Severity meter: Color-coded gauge indicator

**Buttons:**
- Primary: Solid primary color, white text, rounded-md
- Secondary: Outline style with primary border
- Icon buttons: Ghost style with hover background
- CTA: Larger padding (px-6 py-3), shadow-md

**Cards & Containers:**
- Consistent rounded-lg corners
- Shadow elevation: shadow-sm (default), shadow-md (hover), shadow-lg (active)
- Padding: p-6 for standard cards, p-4 for compact
- Dividers: border-gray-200 dark:border-gray-700

### E. Animations

**Minimal, Purposeful Motion:**
- Upload progress: Linear progress bar animation
- Result reveal: 300ms fade-in for disease detection results
- Card hover: transform scale(1.02) with 200ms transition
- Tab switching: 200ms opacity fade
- No scroll-triggered animations or parallax effects

## Images

**Hero Section Image:**
- Full-width banner (h-64 md:h-80) showing healthy crop field
- Overlay: Subtle dark gradient (from-black/40 to-transparent)
- Content positioned center-left with white text
- Description: Panoramic view of vibrant green wheat/corn field under clear sky, farmers in background

**Crop Category Icons:**
- Use Heroicons or simple SVG illustrations
- Wheat, rice, corn, tomato, potato representations
- Monochromatic, outlined style in primary color

**Disease Example Images:**
- Within result cards: Actual analyzed crop image
- Treatment cards: Visual guides for disease identification
- Description: Close-up macro photography of crop leaves showing disease symptoms

**Empty States:**
- Illustration for "No analysis yet" state
- Simple, flat-design graphics of upload action
- Description: Minimal line art of hand holding smartphone taking crop photo

## Page Structure

**Main Dashboard:**
1. App header with branding and navigation tabs
2. Hero section with welcome message and upload CTA
3. Crop category selection grid (5 cards)
4. Upload zone (prominent, centered)
5. Environmental factors input form (collapsible)
6. Recent analysis history preview (3-4 items)

**Analysis Results Page:**
1. Header breadcrumb (Home > Crop > Analysis)
2. Two-column layout: Image viewer | Disease information
3. Confidence metrics section
4. Environmental impact analysis
5. Treatment recommendations accordion
6. Related analyses carousel

**Critical Design Principles:**
- Information hierarchy: Disease name → Confidence → Treatment
- Trust indicators: Use checkmarks, verified badges for high-confidence results
- Agricultural professionalism: Earth tones, clear data, no playful elements
- Accessibility: High contrast ratios, clear labels, keyboard navigation
- Mobile-first: Responsive grid that stacks on small screens