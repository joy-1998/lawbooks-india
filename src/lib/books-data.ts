export type BookCategory =
  | 'Constitutional Law'
  | 'Criminal Law'
  | 'Civil Law'
  | 'Corporate Law'
  | 'Tax Law'
  | 'Family Law';

export interface Book {
  id: number;
  slug: string;
  title: string;
  author: string;
  description: string;
  longDescription: string;
  category: BookCategory;
  price: number;
  coverImage: string;
  pageCount: number;
  publishedYear: number;
  isbn: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isBestseller: boolean;
  previewPages: number;
}

export const books: Book[] = [
  {
    id: 1,
    slug: 'constitution-of-india-commentary-and-analysis',
    title: 'Constitution of India — Commentary & Analysis',
    author: 'Dr. Rajesh Kumar Sharma',
    description:
      'An authoritative and exhaustive commentary on the foundational charter of the Republic of India. Synthesizes landmark judicial doctrines from Kesavananda Bharati to contemporary constitutional bench verdicts.',
    longDescription:
      'This treatise provides an in-depth, article-by-article analysis of the Indian Constitution, detailing historical context, constituent assembly debates, and subsequent landmark amendments. Tailored for advocates, constitutional scholars, and judicial candidates, it scrutinizes the evolving boundaries of fundamental rights, judicial review, and federalism.\n\nThe updated edition includes rigorous analysis of recent nine-judge and constitution bench decisions, privacy jurisprudence post-Puttaswamy, and emerging paradigms of substantive equality and affirmative action. Complete with comparative constitutional insights and cross-jurisdictional references.',
    category: 'Constitutional Law',
    price: 1499,
    coverImage: '/books/cover-1.jpg',
    pageCount: 1120,
    publishedYear: 2024,
    isbn: '978-81-945612-0-1',
    rating: 4.9,
    reviewCount: 342,
    isFeatured: true,
    isBestseller: true,
    previewPages: 2,
  },
  {
    id: 2,
    slug: 'indian-penal-code-comprehensive-guide',
    title: 'Indian Penal Code & Bharatiya Nyaya Sanhita — Comprehensive Guide',
    author: 'Justice (Retd.) Meera Nair',
    description:
      'A masterwork bridging established substantive penal jurisprudence with recent legislative reforms. Details essential ingredients, landmark precedents, and trial strategies across major criminal offences.',
    longDescription:
      'Penned by former High Court Justice Meera Nair, this volume navigates the intricate contours of general exceptions, mens rea, joint liability, and specific offences against persons and property. Each section features structured elements of crime, shifting burdens of proof, and evidentiary thresholds required for prosecution and defence.\n\nThe text incorporates side-by-side comparative tables with the Bharatiya Nyaya Sanhita (BNS), providing trial advocates and judicial trainees with an indispensable transitional compass. Illustrative case studies dissect complex homicide trials, cyber-enabled fraud, and financial crimes.',
    category: 'Criminal Law',
    price: 1299,
    coverImage: '/books/cover-2.jpg',
    pageCount: 960,
    publishedYear: 2024,
    isbn: '978-81-945612-1-8',
    rating: 4.8,
    reviewCount: 285,
    isFeatured: true,
    isBestseller: true,
    previewPages: 2,
  },
  {
    id: 3,
    slug: 'code-of-civil-procedure-principles-and-practice',
    title: 'Code of Civil Procedure — Principles & Practice',
    author: 'Senior Advocate P. Venkataraman',
    description:
      'An exhaustive manual covering civil pleadings, interlocutory applications, execution decrees, and appellate remedies. Designed for commercial litigators and civil court practitioners.',
    longDescription:
      'From institution of suits under Section 9 to territorial jurisdiction, res judicata, and summary judgments under Order XXXVII, this manual illuminates every nuance of civil court litigation. The work unravels procedural hurdles that frequently cause trial delays, offering practical drafting samples and step-by-step litigation roadmaps.\n\nSpecial emphasis is placed on modern Commercial Courts Act amendments, mandatory pre-institution mediation, discovery mechanics, and execution proceedings against recalcitrant judgment debtors. Invaluable for junior advocates and seasoned courtroom tacticians alike.',
    category: 'Civil Law',
    price: 1150,
    coverImage: '/books/cover-3.jpg',
    pageCount: 880,
    publishedYear: 2023,
    isbn: '978-81-945612-2-5',
    rating: 4.7,
    reviewCount: 198,
    isFeatured: false,
    isBestseller: true,
    previewPages: 2,
  },
  {
    id: 4,
    slug: 'supreme-court-practice-and-procedure',
    title: 'Supreme Court Practice & Procedure',
    author: 'Adv. Vikram Singh Chauhan',
    description:
      'The definitive handbook on Special Leave Petitions (SLPs), curative jurisdiction, and writ litigation before the Apex Court. Packed with registry guidelines, drafting tips, and oral argument strategies.',
    longDescription:
      'Navigating the corridors of the Supreme Court of India demands precision, procedural mastery, and acute persuasive skill. Advocate Vikram Singh Chauhan draws upon decades of appellate experience to break down Article 136 discretionary thresholds, caveat filings, public interest litigation (PIL) dynamics, and review jurisdiction.\n\nThis volume breaks down the Supreme Court Rules 2013, digital filing protocols, mention memo formalities, and constitution bench referral criteria. It contains real-world SLP petition templates and checklist indices to ensure flawless registry submissions.',
    category: 'Constitutional Law',
    price: 1350,
    coverImage: '/books/cover-4.jpg',
    pageCount: 740,
    publishedYear: 2024,
    isbn: '978-81-945612-3-2',
    rating: 4.9,
    reviewCount: 164,
    isFeatured: true,
    isBestseller: false,
    previewPages: 2,
  },
  {
    id: 5,
    slug: 'corporate-governance-and-companies-act-2013',
    title: 'Corporate Governance & Companies Act, 2013',
    author: 'Dr. Arundhati Roychoudhury',
    description:
      'A thorough practitioner guide to Indian corporate law, board liabilities, merger clearances, and minority shareholder protections under the Companies Act and SEBI regulations.',
    longDescription:
      'This volume critically dissects the corporate lifecycle from incorporation and capital restructuring to director fiduciary obligations and corporate dispute adjudication before NCLT and NCLAT. It meticulously covers key compliances, related-party transaction safeguards, and independent director liability contours.\n\nFeaturing dedicated chapters on SEBI (LODR) regulations, insider trading prevention, and cross-border merger structuring, this book bridges statutory mechanics with boardroom corporate reality. Highly recommended for in-house general counsels, company secretaries, and transactional lawyers.',
    category: 'Corporate Law',
    price: 1599,
    coverImage: '/books/cover-5.jpg',
    pageCount: 1040,
    publishedYear: 2023,
    isbn: '978-81-945612-4-9',
    rating: 4.6,
    reviewCount: 142,
    isFeatured: false,
    isBestseller: false,
    previewPages: 2,
  },
  {
    id: 6,
    slug: 'direct-tax-laws-and-international-taxation',
    title: 'Direct Tax Laws & International Taxation',
    author: 'CA & Adv. Hitesh S. Singhania',
    description:
      'A master guide to Income-tax Act provisions, transfer pricing disputes, GAAR, and Double Tax Avoidance Agreements (DTAA). Contains extensive litigation precedents from ITAT, High Courts, and Supreme Court.',
    longDescription:
      'Direct tax disputes in India require deep mastery of statutory interpretation and accounting standards. Authored by seasoned tax counsel Hitesh Singhania, this reference deciphers complex corporate reorganisations, digital service equalization levies, faceless assessment frameworks, and Section 148 reassessment notices.\n\nThe treatise provides comprehensive commentary on international tax developments including BEPS Pillar One and Two, permanent establishment exposure, and cross-border withholding obligations. It features practical drafting strategies for appeals before CIT(A) and the Appellate Tribunal.',
    category: 'Tax Law',
    price: 1799,
    coverImage: '/books/cover-6.jpg',
    pageCount: 1250,
    publishedYear: 2024,
    isbn: '978-81-945612-5-6',
    rating: 4.8,
    reviewCount: 210,
    isFeatured: true,
    isBestseller: false,
    previewPages: 2,
  },
  {
    id: 7,
    slug: 'modern-hindu-and-muslim-family-laws',
    title: 'Modern Hindu & Muslim Family Laws in India',
    author: 'Prof. Ananya Sen Gupta',
    description:
      'A sensitive, comprehensive examination of personal laws, matrimonial relief, succession rights, custody battles, and the Special Marriage Act across diverse community traditions in India.',
    longDescription:
      'Addressing matrimonial disputes, inheritance, and guardianship requires navigating intricate intersections of personal faith, custom, and secular constitutional guarantees. Prof. Sen Gupta balances statutory provisions—including the Hindu Marriage Act, Hindu Succession Amendment Act, and Muslim Personal Law (Shariat) Application Act—with gender justice jurisprudential trends.\n\nThe second half delves into complex partition suits, stridhan recovery, domestic violence protective orders, and maintenance rights under Section 125 CrPC / BNSS. Essential for family court practitioners, social justice advocates, and judicial officers.',
    category: 'Family Law',
    price: 899,
    coverImage: '/books/cover-7.jpg',
    pageCount: 650,
    publishedYear: 2023,
    isbn: '978-81-945612-6-3',
    rating: 4.5,
    reviewCount: 119,
    isFeatured: false,
    isBestseller: false,
    previewPages: 2,
  },
  {
    id: 8,
    slug: 'insolvency-and-bankruptcy-code-law-and-practice',
    title: 'Insolvency and Bankruptcy Code — Law & Practice',
    author: 'Adv. Tarun K. Bhasin',
    description:
      'An end-to-end reference on Corporate Insolvency Resolution Processes (CIRP), liquidation waterfalls, resolution applicant eligibility, and creditor committee dynamics under IBC 2016.',
    longDescription:
      'Since its inception, the Insolvency and Bankruptcy Code has redefined Indian commercial credit and distressed asset markets. This manual provides tactical breakdowns of Section 7 and 9 initiation petitions, Section 29A disqualifications, avoidance transactions (PUFE), and information utility protocols.\n\nTarun Bhasin draws upon significant NCLT and Supreme Court precedents (Swiss Ribbons, Essar Steel) to formulate strategies for Committee of Creditors (CoC) voting, forensic audits, and resolution plan approval. Includes model resolutions and process timelines.',
    category: 'Corporate Law',
    price: 1699,
    coverImage: '/books/cover-8.jpg',
    pageCount: 920,
    publishedYear: 2024,
    isbn: '978-81-945612-7-0',
    rating: 4.7,
    reviewCount: 175,
    isFeatured: false,
    isBestseller: false,
    previewPages: 2,
  },
  {
    id: 9,
    slug: 'goods-and-services-tax-acts-rules-and-precedents',
    title: 'Goods and Services Tax — Acts, Rules & Precedents',
    author: 'Dr. Vivek R. Deshmukh',
    description:
      'Complete commentary on CGST, SGST, IGST, input tax credit eligibility, reverse charge mechanism, anti-profiteering, and search, seizure, and summons proceedings.',
    longDescription:
      'GST litigation has emerged as one of the most volatile arenas of Indian indirect tax practice. This guide provides methodical analysis of supply concepts, valuation standards, fake invoicing crackdowns, blocking of input tax credit under Rule 86A, and constitutional challenges before High Courts.\n\nThe volume highlights detailed procedural mechanics for replying to show-cause notices (SCNs), filing appeals before the Appellate Authority and GSTAT, and obtaining anticipatory relief against coercive arrest actions. An invaluable tool for chartered accountants and tax advocates.',
    category: 'Tax Law',
    price: 1450,
    coverImage: '/books/cover-9.jpg',
    pageCount: 1100,
    publishedYear: 2024,
    isbn: '978-81-945612-8-7',
    rating: 4.6,
    reviewCount: 153,
    isFeatured: false,
    isBestseller: false,
    previewPages: 2,
  },
  {
    id: 10,
    slug: 'law-of-contracts-and-specific-relief',
    title: 'Law of Contracts & Specific Relief',
    author: 'Justice (Retd.) K. S. Ramanathan',
    description:
      'A scholarly and practical discourse on the Indian Contract Act 1872 and the Specific Relief Act 1963. Features cutting-edge chapters on smart contracts, liquidated damages, and force majeure clauses.',
    longDescription:
      'Forming the bedrock of commercial commerce, contract doctrine requires keen discernment of offer, acceptance, frustration, and breach remedies. Justice Ramanathan synthesizes classic English common law origins with decades of Indian Supreme Court jurisprudence on commercial reasonableness and standard form contracts.\n\nUpdated with post-2018 Specific Relief amendment standards prioritizing specific performance over damages, infrastructure contract injunction bars, and substitute performance procedures. Ideal for commercial arbitrators, transactional draftsmen, and university law faculty.',
    category: 'Civil Law',
    price: 999,
    coverImage: '/books/cover-10.jpg',
    pageCount: 780,
    publishedYear: 2023,
    isbn: '978-81-945612-9-4',
    rating: 4.8,
    reviewCount: 226,
    isFeatured: false,
    isBestseller: false,
    previewPages: 2,
  },
  {
    id: 11,
    slug: 'criminal-trial-practice-and-evidence-rules',
    title: 'Criminal Trial Practice & Evidence Rules',
    author: 'Senior Advocate Monica G. Khosla',
    description:
      'Tactical guidance on cross-examination techniques, bail applications, electronic evidence admissibility under Section 65B / BSA, and forensic proof in criminal courtrooms.',
    longDescription:
      'Mastering criminal litigation requires courtroom presence, psychological insight, and forensic command. Monica Khosla shares courtroom-tested techniques for framing cross-examination questions, identifying contradictions and omissions, impeaching hostile witnesses, and presenting expert ballistics and DNA evidence.\n\nThe work incorporates the Bharatiya Sakshya Adhiniyam (BSA) provisions, detailing custody chains for digital forensics, hash verification protocols, and mobile device extractions. Essential reading for defense counsels, public prosecutors, and trial bench judges.',
    category: 'Criminal Law',
    price: 1250,
    coverImage: '/books/cover-11.jpg',
    pageCount: 840,
    publishedYear: 2024,
    isbn: '978-81-945613-0-0',
    rating: 4.9,
    reviewCount: 312,
    isFeatured: false,
    isBestseller: false,
    previewPages: 2,
  },
  {
    id: 12,
    slug: 'divorce-custody-and-matrimonial-litigation',
    title: 'Divorce, Custody & Matrimonial Litigation Handbook',
    author: 'Adv. Sanya Kapoor & Adv. Devendra Joshi',
    description:
      'A pragmatic, client-centered guide to mutual consent divorce, irretrievable breakdown grounds, shared parenting plans, maintenance computation guidelines, and mediation settlement agreements.',
    longDescription:
      'Matrimonial conflict requires equal measures of compassionate counsel and assertive advocacy. This handbook covers the entire arc of marital litigation, from filing mutual divorce under Section 13B and contested cruelty petitions to securing child custody and visitation rights under the Guardians and Wards Act.\n\nIt features comprehensive maintenance affidavit drafting templates per Supreme Court guidelines in Rajnesh v. Neha, strategies for resolving concurrent Section 498A and Domestic Violence Act filings, and cross-border NRI matrimonial litigation protocols.',
    category: 'Family Law',
    price: 799,
    coverImage: '/books/cover-12.jpg',
    pageCount: 520,
    publishedYear: 2023,
    isbn: '978-81-945613-1-7',
    rating: 4.4,
    reviewCount: 94,
    isFeatured: false,
    isBestseller: false,
    previewPages: 2,
  },
];

// Query helper functions
export function getAllBooks(): Book[] {
  return books;
}

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug.toLowerCase() === slug.toLowerCase());
}

export function getBooksByCategory(category: BookCategory | string): Book[] {
  return books.filter(
    (b) => b.category.toLowerCase() === category.toLowerCase()
  );
}

export function getFeaturedBooks(): Book[] {
  return books.filter((b) => b.isFeatured);
}

export function getBestsellers(): Book[] {
  return books.filter((b) => b.isBestseller);
}

export function searchBooks(query: string): Book[] {
  if (!query || query.trim() === '') return books;
  const q = query.toLowerCase().trim();
  return books.filter(
    (b) =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.isbn.toLowerCase().includes(q)
  );
}
