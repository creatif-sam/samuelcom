export type ImageSide = "left" | "right";

export interface Chapter {
  year: string;
  tag: string;
  title: string;
  image: string;
  imageAlt: string;
  imageSide: ImageSide;
  inset?: { image: string; alt: string; caption: string; landscape?: boolean };
  body: string[];
  quote: string | null;
}

export interface NowCard {
  num: string;
  title: string;
  org: string;
  body: string;
  image: string;
}

export const chapters: Chapter[] = [
  {
    year: "1999",
    tag: "Origins",
    title: "A Life Begins in Mpohor",
    image: "/my-story/3.png",
    imageAlt: "Samuel with family in Mpohor",
    imageSide: "right",
    inset: {
      image: "/my-story/childhood.webp",
      alt: "Samuel as a young boy in a white embroidered outfit",
      caption: "The early years",
    },
    body: [
      "On the 22nd of June, just two years after the first members of Generation Z were born, Samuel Kobina Gyasi was born to Mr. Emmanuel Gyasi and Mrs. Regina Baidoo, a woman whose discipline and warmth became the first architecture of his soul. He entered the world as the newest member of a family of three brothers raised in Mpohor, Ghana.",
      "His earliest memories are woven with the sound of a sewing machine and the smell of finished cloth. His father's shop was not merely a trade — it was a lesson in precision, patience, and the dignity of craftsmanship. His mother's prayers taught him that a life built on faith is unshakeable.",
    ],
    quote: null,
  },
  {
    year: "2009 – 2017",
    tag: "Leadership Awakens",
    title: "Prefect, Student, Builder",
    image: "/my-story/2.png",
    imageAlt: "Samuel in his school years",
    imageSide: "left",
    body: [
      "At ten years old, Samuel was elected Class Prefect at Ghana-China Friendship School — a role he held for three years. It was his first encounter with what it means to lead: to be accountable not only for yourself but for the order and progress of those around you.",
      "At Saint John's School in Sekondi-Takoradi, he pursued a General Science curriculum and served as Dining Hall Prefect, responsible for breakfast, lunch, and dinner for between 900 and 1,200 boys. The role taught him crowd management, clear communication with stakeholders, and the art of influencing without imposing.",
    ],
    quote: "A leader's worth is measured not by what they command, but by the dignity they preserve in every person they serve.",
  },
  {
    year: "2017",
    tag: "Entrepreneurship",
    title: "Managing Director at Seventeen",
    image: "/my-story/4.png",
    imageAlt: "Samuel working — the early entrepreneur",
    imageSide: "right",
    body: [
      "Before his eighteenth birthday, Samuel worked as managing staff for a new car wash business in Mpohor. He encountered the full weight of entrepreneurial reality: profit and loss, staff decisions, customer relationships, and the daily discipline of showing up.",
      "The experience was an education no classroom could replicate. It built in him an understanding that leadership in institutions begins with leadership of self — and that instincts sharpened in small places prepare a person for large responsibility.",
    ],
    quote: null,
  },
  {
    year: "2020 – 2023",
    tag: "Scholar in Morocco",
    title: "Distinction Across Continents",
    image: "/my-story/5.png",
    imageAlt: "Samuel at SUP Management, Fez",
    imageSide: "left",
    body: [
      "Samuel moved to Morocco to pursue Computer Science at the Ecole Supérieure de Management, de Commerce et d'Informatique (SUP Management) in Fez. Navigating a new culture, a new language, and a demanding curriculum, he developed the rare ability to hold complexity without losing clarity.",
      "He graduated with distinction and the Highest GPA in the entire school — a recognition not only of academic excellence but of the discipline and purpose that had been forged over years.",
    ],
    quote: "I believe a scholarship is a society's investment in an individual — with the expectation that the investment will return, multiplied, to the community.",
  },
  {
    year: "2023 – 2025",
    tag: "Mastery",
    title: "Master's in Collective Intelligence · UM6P",
    image: "/my-story/6.png",
    imageAlt: "Samuel at UM6P, Morocco",
    imageSide: "right",
    inset: {
      image: "/my-story/innovation-award.webp",
      alt: "Samuel receiving the Innovation Award at UM6P",
      caption: "Innovation Award · ISC UM6P",
      landscape: true,
    },
    body: [
      "At the School of Collective Intelligence (SCI) in Rabat, Samuel completed a rigorous Master's programme fusing data science, organizational theory, and facilitation. The central question driving every module: how do groups think, decide, and create together?",
      "Leadership followed him into the programme. Within the School of Collective Intelligence he served as School Ambassador (December 2023 – July 2025) and as moderator of SCI Talk (October 2024 – June 2025), a weekly scientific talk where researchers and practitioners present their work on the science of collective intelligence.",
      "He was also class delegate for his cohort. Separately, as Academic Affairs Delegate of the International Students Club at UM6P (ISC UM6P), he led work that earned him the Innovation Award.",
      "As Financial Secretary of GHASAM, the Ghanaian Students Association (September 2024 – August 2025), he helped establish the GHASAM E-Fund, which raised nearly 20,000 MAD to support students facing emergencies and in need of loans. He formed the GHASAM Financial Committee to strengthen accountability and transparency, and replaced Excel spreadsheets with simplified, student-friendly PDF financial reports.",
      "He co-founded and served as President of the Collective Intelligence Consortium, a student-led organisation that trains students to facilitate collective intelligence and grow as leaders.",
      "While his coursework deepened his research vocabulary, it was the living laboratory of navigating cultures and communities that sharpened his understanding of transformation — as something that begins with the willingness to be made new.",
    ],
    quote: null,
  },
  {
    year: "2025 – Now",
    tag: "The Present Chapter",
    title: "Building, Serving, Rooting",
    image: "/my-story/7.png",
    imageAlt: "Samuel today — leader and mentor",
    imageSide: "left",
    body: [
      "Today, Samuel inhabits several interconnected spheres of service. As Junior Program Officer at the School of Collective Intelligence, UM6P, he helps students develop their careers and facilitates programmes that unlock the collective intelligence of teams and organisations.",
      "At the Église Évangélique au Maroc (EEAM) in Rabat, a congregation of some 450 members, he serves as an elder and Vice President of the Presbyteral Council, and mentors the intercession and library teams. Beyond institutions, he mentors individuals navigating the same questions of purpose, fulfilment, leadership, and faith that he once navigated alone.",
    ],
    quote: null,
  },
];

export const nowCards: NowCard[] = [
  {
    num: "01",
    title: "Junior Program Officer",
    org: "School of Collective Intelligence | UM6P, Morocco",
    body: "Designing and coordinating programs that unlock collective intelligence — guiding students through career development, seminars, and cross-institutional initiatives.",
    image: "/jpo.webp",
  },
  {
    num: "02",
    title: "Group Intelligence Facilitator",
    org: "Practitioner",
    body: "Applying the science of collective intelligence to help groups surface diverse perspectives, resolve complexity, and make decisions that reflect shared wisdom.",
    image: "/group-intelligence-facilitator.webp",
  },
  {
    num: "03",
    title: "Mentor",
    org: "Personal Ministry",
    body: "Walking alongside individuals navigating questions of purpose, leadership, and identity. A personal investment in others — giving back what was once given to me.",
    image: "/personal-ministry.webp",
  },
];
