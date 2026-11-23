// Copy the folder for each client. Edit the values below.
// Empty contact fields, stats and reviews are hidden on the published page.
window.COMPANY = {
  name: "Titan Concrete Pros",
  market: "Carmel & Fishers, IN",
  marketLine: "Serving Carmel & Fishers, Indiana",
  headline: "Residential & Commercial",
  headlineAccent: "Concrete Contractor in Carmel & Fishers, IN",
  intro: "Driveways, patios, pool decks, sidewalks and walkways poured right the first time. We also pour slabs, flatwork, equipment pads, foundations, footings and concrete walls, including retaining walls. We install waterproofing systems and handle **repair, cleaning, pressure washing and sealing**. Choose from brush finishes, exposed aggregate, stamped concrete and epoxy coatings. Licensed, insured and locally owned, with a **clear, upfront price** before any work begins.",
  phone: "+1 463-283-6867",
  email: "quotes@titanconcretepros.com",
  hours: "8am–6pm",
  logo: "titan-baltimore-assets/images/logo.webp",
  stats: [
    // { value: "20+", label: "Years in business" }
  ],
  reviews: [
    // { quote: "Verified customer review", author: "Customer name", location: "City, MD" }
  ],
  areaHeading: "Serving Carmel & Fishers, Indiana",
  footerLocation: "Serving Carmel & Fishers, Indiana",
  areaCopy: "We serve Carmel and Fishers, Indiana. Share your project address when you request your free estimate.",
  locations: ["Carmel, IN", "Fishers, IN"],
  photos: {
    hero: { src: "titan-baltimore-assets/images/hero-driveway.webp", mobile: "titan-baltimore-assets/images/hero-driveway-mobile.webp", tablet: "titan-baltimore-assets/images/hero-driveway-tablet.webp" },
    crew: { src: "titan-baltimore-assets/images/crew-at-work.webp", alt: "Tied steel reinforcement laid out before a concrete pour" }
  },
  // Each service maps to one project type. Match its project value to an ID in projectTypes.
  services: [
    { id: "driveway", anchor: "Driveways", title: "Concrete Driveways", estimate: "Get a driveway estimate", project: "driveways", description: "New and replacement driveways, with the slope, base and joints planned around how you park and where rainwater needs to go.", src: "titan-baltimore-assets/images/service-driveways.webp", alt: "Concrete driveway curving past a landscaped lawn" },
    { id: "sidewalk", anchor: "Sidewalks", title: "Sidewalks & Walkways", estimate: "Get a sidewalk or walkway estimate", project: "walkways", description: "Front walks, side paths and sidewalks laid out around steps, gates and the way you move through the property.", src: "titan-baltimore-assets/images/service-walkways.webp", alt: "Curving concrete walkway through landscaped beds" },
    { id: "commercial", anchor: "commercial-services", title: "Commercial Concrete Services", estimate: "Get a commercial estimate", project: "commercial", description: "We pour equipment pads, slabs, walkways and concrete walls for businesses in Carmel and Fishers. I handle the estimate and coordinate site access and the pour schedule with you.", src: "titan-baltimore-assets/images/service-commercial.webp", alt: "Concrete apron in front of two commercial shop bays" },
    { id: "patio", anchor: "Patios", title: "Patios & Pool Decks", estimate: "Get a patio or pool deck estimate", project: "patios", description: "Concrete patios and pool surrounds with finish and drainage options suited to outdoor seating and bare feet.", src: "titan-baltimore-assets/images/service-patios-pools.webp", alt: "Covered patio furnished with outdoor seating" },
    { id: "slab", anchor: "slabs-flatwork", title: "Slabs & Flatwork", estimate: "Get a slab estimate", project: "slabs", description: "We pour concrete slabs and flatwork for businesses and homeowners, including commercial equipment pads, garage slabs and shed pads. We plan the pour around what the slab will support and how you’ll access it.", src: "titan-baltimore-assets/images/service-slabs.webp", alt: "Concrete flatwork in front of garage bays" },
    { id: "foundation", anchor: "foundations", title: "Foundations & Footings", estimate: "Get a foundation or footing estimate", project: "foundation", description: "Poured foundations and footings for new construction and additions. We can discuss drainage and waterproofing where concrete will sit below grade.", src: "titan-baltimore-assets/images/service-foundations.webp", alt: "Concrete foundation formwork and steel reinforcement before a pour" },
    { id: "wall", title: "Concrete & Retaining Walls", estimate: "Get a concrete wall estimate", project: "walls", description: "Poured concrete walls for grade changes and below-grade spaces. We plan for drainage behind retaining walls and waterproofing where the wall protects an interior space.", src: "titan-baltimore-assets/images/service-concrete-walls.webp", alt: "Poured concrete walls beside a staircase" },
    { id: "waterproofing", title: "Waterproofing Systems", estimate: "Get a waterproofing estimate", project: "foundation", description: "For foundations and below-grade walls, we look at where water enters and whether exterior membranes and drainage belong in the scope.", src: "titan-baltimore-assets/images/service-waterproofing.webp", alt: "Exterior downspout directing runoff away from the edge of a concrete slab" },
    { id: "repair", title: "Concrete Repair", estimate: "Get a concrete repair estimate", project: "other", description: "We look at cracking, spalling and damaged edges before we recommend a repair or price a replacement.", src: "titan-baltimore-assets/images/service-repair.webp", alt: "Close-up of cracking in a concrete surface" },
    { id: "cleaning", title: "Concrete Cleaning & Pressure Washing", estimate: "Get a concrete cleaning estimate", project: "other", description: "We clean concrete driveways, patios and walks. Tell us what needs attention, from surface grime to stains near a garage or entry.", src: "titan-baltimore-assets/images/service-cleaning.webp", alt: "Exterior concrete with joints and a clean finished surface" },
    { id: "sealing", title: "Concrete Sealing", estimate: "Get a concrete sealing estimate", project: "other", description: "We’ll look at the condition and finish of your concrete before recommending a sealer or deciding how to prepare it.", src: "titan-baltimore-assets/images/service-sealing.webp", alt: "Finished concrete patio in evening light" }
  ],
  finishes: [
    ["Exposed aggregate", "Visible stone texture for outdoor surfaces."],
    ["Brush finish", "A broom-textured surface for driveways, walks and patios."],
    ["Stamped concrete", "Pressed patterns for patios, walks and other decorative pours."],
    ["Epoxy coating", "A coating option for suitable interior or garage slabs."]
  ],
  projectTypes: [
    { id: "driveways", label: "Driveways", icon: "road" },
    { id: "walkways", label: "Sidewalks / Walkways", icon: "walk" },
    { id: "slabs", label: "Slabs / Flatwork", icon: "slab" },
    { id: "commercial", label: "Commercial Concrete", icon: "commercial" },
    { id: "patios", label: "Patios / Pools", icon: "pool" },
    { id: "foundation", label: "Foundation", icon: "foundation" },
    { id: "walls", label: "Retaining Walls", icon: "wall" },
    { id: "other", label: "Other", icon: "dots" }
  ],
  projects: [
    // Add only verified Titan project photos. Use src, caption and alt for each photo.
  ],
  faqs: [
    ["How much does a concrete driveway cost?", "The estimate depends on the area, demolition, access, base work and finish. Tell us whether you’re replacing an existing driveway or pouring a new one so we can price the right scope."],
    ["What concrete finishes can I choose?", "We offer brush finish, exposed aggregate and stamped concrete. Epoxy is also available for suitable slabs. The right fit depends on how you’ll use the surface and how much traction you want."],
    ["When does a foundation need waterproofing?", "Waterproofing can be part of the scope when a foundation or concrete wall sits below grade and protects interior space. We look at where water collects and how it drains before discussing a system."],
    ["When can I walk or drive on new concrete?", "Ask us for the schedule for your pour. Foot traffic, vehicles and heavier loads have different wait times, and the mix and weather affect when the surface is ready."],
    ["Who does the estimate and when will I hear back?", "I prepare every estimate and manage every job. We call or email you back the same day to discuss the scope and prepare your quote that week."]
  ]
};
