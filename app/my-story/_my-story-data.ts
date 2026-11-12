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
      "On the 22nd of June, just two years after the first members of Generation Z were born, Samuel Kobina Gyasi was born to Mr. Emmanuel Gyasi and Mrs. Regina Baidoo, a woman whose discipline and warmth shaped him from the start. He was the second of three brothers, raised in Mpohor, Ghana.",
      "His earliest memories are of the sound of a sewing machine and the smell of finished cloth. In his father's shop he learned precision, patience, and respect for careful work. His mother's prayers taught him that a life built on faith is unshakeable.",
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
      "At ten years old, Samuel was elected Class Prefect at Ghana-China Friendship School, a role he held for three years. It was his first experience of leading. He was responsible for the order and progress of his classmates as well as his own.",
      "At Saint John's School in Sekondi-Takoradi, he studied General Science and served as Dining Hall Prefect, responsible for breakfast, lunch, and dinner for between 900 and 1,200 boys. The role taught him crowd management, clear communication with stakeholders, and the art of influencing without imposing.",
    ],
    quote: "A leader's worth shows in how they treat the people they serve.",
  },
  {
    year: "2017",
    tag: "Entrepreneurship",
    title: "Managing Director at Seventeen",
    image: "/my-story/4.png",
    imageAlt: "Samuel working as a young entrepreneur",
    imageSide: "right",
    body: [
      "Before his eighteenth birthday, Samuel worked as managing staff for a new car wash business in Mpohor. He dealt with profit and loss, staff decisions, and customers, and he learned to show up every day.",
      "The job taught him things school did not. He learned that leading an organisation starts with leading yourself, and that small responsibilities prepare you for larger ones.",
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
      "Samuel moved to Morocco to pursue Computer Science at the Ecole Supérieure de Management, de Commerce et d'Informatique (SUP Management) in Fez. He adapted to a new culture, a new language, and a demanding course, and he learned to think clearly under pressure.",
      "He graduated with distinction and the highest GPA in the school.",
    ],
    quote: "I believe a scholarship is a society's investment in an individual, with the expectation that the investment will return, multiplied, to the community.",
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
      "At the School of Collective Intelligence (SCI) in Rabat, Samuel completed a Master's programme that combined data science, organisational theory, and facilitation. Every module asked how groups think, decide, and create together.",
      "He also took on leadership roles during the programme. At the School of Collective Intelligence, he was School Ambassador from December 2023 to July 2025. From October 2024 to June 2025, he moderated SCI Talk, a weekly talk where researchers and practitioners present their work on the science of collective intelligence.",
      "He was class delegate for his cohort. As Academic Affairs Delegate of the International Students Club at UM6P, he led work that earned him the Innovation Award.",
      "From September 2024 to August 2025, he was Financial Secretary of GHASAM, the Ghanaian Students Association. He helped set up the GHASAM E-Fund, which raised nearly 20,000 MAD for student emergencies and loans. He formed the GHASAM Financial Committee to make the association's finances more accountable and transparent. He also replaced Excel spreadsheets with short PDF reports that students could read easily.",
      "He co-founded and served as President of the Collective Intelligence Consortium, a student-led organisation that trains students to facilitate collective intelligence and grow as leaders.",
      "His coursework gave him research skills. Living among many cultures and communities taught him that transformation begins with being willing to be made new.",
    ],
    quote: null,
  },
  {
    year: "2025 – Now",
    tag: "The Present Chapter",
    title: "Building, Serving, Rooting",
    image: "/my-story/7.png",
    imageAlt: "Samuel today, leader and mentor",
    imageSide: "left",
    body: [
      "Today, Samuel is a Junior Program Officer at the School of Collective Intelligence, UM6P. He helps students develop their careers and runs programmes that help teams and organisations think and decide together.",
      "At the Église Évangélique au Maroc (EEAM) in Rabat, a congregation of some 450 members, he serves as an elder and Vice President of the Presbyteral Council, and mentors the intercession and library teams. Outside these roles, he mentors people working through the same questions of purpose, fulfilment, leadership, and faith that he once faced alone.",
    ],
    quote: null,
  },
];

export const nowCards: NowCard[] = [
  {
    num: "01",
    title: "Junior Program Officer",
    org: "School of Collective Intelligence | UM6P, Morocco",
    body: "I design and coordinate programs on collective intelligence, and I guide students through career development, seminars, and projects with other institutions.",
    image: "/jpo.webp",
  },
  {
    num: "02",
    title: "Group Intelligence Facilitator",
    org: "Practitioner",
    body: "I use the science of collective intelligence to help groups hear every view, work through complex problems, and reach decisions they all stand behind.",
    image: "/group-intelligence-facilitator.webp",
  },
  {
    num: "03",
    title: "Mentor",
    org: "Personal Ministry",
    body: "I walk alongside people working through questions of purpose, leadership, and identity. It is my way of giving back what others once gave me.",
    image: "/personal-ministry.webp",
  },
];
