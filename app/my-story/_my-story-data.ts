export type ImageSide = "left" | "right";

export interface Chapter {
  year: string;
  tag: string;
  title: string;
  image: string;
  imageAlt: string;
  imageSide: ImageSide;
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
    body: [
      "On the 22nd of June 1999, Samuel Kobina Gyasi was born to Mr. Emmanuel Gyasi and Mrs. Regina Baidoo,a woman whose discipline and warmth became the first architecture of his soul. He entered the world as the newest member of a family of three brothers raised in Mpohor, Ghana.",
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
      "At Saint John's School in Sekondi-Takoradi, he pursued a General Science curriculum and served as Dining Hall Prefect — managing the sustenance and order of the entire student body. Authority without relationship is hollow; the trust of peers is harder earned and more precious than any title.",
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
    imageAlt: "Samuel at SUP Management, Fès",
    imageSide: "left",
    body: [
      "Samuel moved to Morocco to pursue Computer Science at the Ecole Supérieure de Management, de Commerce et d'Informatique (Sup Management) in Fès. Navigating a new culture, a new language, and a demanding curriculum, he developed the rare ability to hold complexity without losing clarity.",
      "He graduated with distinction and the Highest GPA in the entire school — a recognition not only of academic excellence but of the discipline and purpose that had been forged over years. The scholarship that followed was not a reward for past effort; it was a commission for future work.",
    ],
    quote: "A scholarship is a society's investment in an individual — with the expectation that the investment will return, multiplied, to the community.",
  },
  {
    year: "2023 – 2025",
    tag: "Mastery",
    title: "Master's in Collective Intelligence · UM6P",
    image: "/my-story/6.png",
    imageAlt: "Samuel at UM6P, Morocco",
    imageSide: "right",
    body: [
      "At the School of Collective Intelligence (SCI) in Rabat, Samuel completed a rigorous Master's programme fusing data science, organizational theory, and facilitation. The central question driving every module: how do groups think, decide, and create together?",
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
      "In the Eglise Evangélique Au Maroc(EEAM-Rabat), he serves as an elder,mentoring the intercession and library teams. Beyond institutions, he mentors individuals navigating the same questions of faith and purpose he once navigated alone.",
    ],
    quote: null,
  },
];

export const nowCards: NowCard[] = [
  {
    num: "01",
    title: "Program Officer (Jnr)",
    org: "School of Collective Intelligence | UM6P, Morocco",
    body: "Designing and coordinating programs that unlock collective intelligence — guiding students through career development, seminars, and cross-institutional initiatives.",
    image: "/JPO.png",
  },
  {
    num: "02",
    title: "Group Intelligence Facilitator",
    org: "Practitioner",
    body: "Applying the science of collective intelligence to help groups surface diverse perspectives, resolve complexity, and make decisions that reflect shared wisdom.",
    image: "/Group%20Intelligence%20faci.png",
  },
  {
    num: "03",
    title: "Mentor",
    org: "Personal Ministry",
    body: "Walking alongside individuals navigating questions of purpose, leadership, and identity. A personal investment in others — giving back what was once given to me.",
    image: "/PersonalMinistry.png",
  },
];
