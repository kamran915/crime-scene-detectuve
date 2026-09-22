import { CaseData } from '../types';

export const CASES_DATA: CaseData[] = [
  {
    id: 'case-1',
    caseNumber: 1,
    title: 'The Missing Laptop',
    location: 'University Computer Lab',
    difficulty: 'Easy',
    coverImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    synopsis: 'A high-end research prototype laptop has been stolen from the university computer lab. There are multiple suspects and some important clues at the crime scene. Your job is to find the evidence, analyze the clues and identify the real culprit.',
    targetTimeSeconds: 480, // 8 mins
    crucialEvidenceIds: ['cctv-footage', 'muddy-footprint', 'phone-ping', 'master-keycard'],
    culpritId: 'ahmed',
    reconstruction: {
      summary: 'Ahmed (Lab Assistant) stole the prototype laptop to sell on the black market to clear his mounting debts. His alibi of being at home crumbled when the 9:42 PM CCTV footage matched his muddy boots, his personal phone pinged the lab cell tower, and his master keycard was logged at the door.',
      culpritConfession: '"I never meant to hurt the project... I was drowning in overdue loans and they threatened my family. The buyer promised 15,000 dollars in cash. I thought the security camera had a blind spot at the side door."',
      details: 'Ahmed entered via the east emergency exit using his master keycard. He snipped the workstation security lock with tools from his staff kit, grabbed the prototype, and fled through the muddy botanical garden path.'
    },
    evidenceList: [
      {
        id: 'cctv-footage',
        name: 'CCTV Footage',
        type: 'Video',
        location: 'Computer Lab Entrance',
        time: '9:42 PM',
        description: 'The security camera captures a silhouette wearing a black hooded jacket and size 10 work boots slipping through the laboratory corridor.',
        important: true,
        position: { x: 78, y: 22 },
        hintText: 'Check the ceiling corner security dome near the emergency exit.',
        previewType: 'cctv',
        notes: 'Timestamp 21:42:17. Subject wears dark athletic gear and carries a reinforced tote.'
      },
      {
        id: 'muddy-footprint',
        name: 'Muddy Footprint',
        type: 'Forensic',
        location: 'Lab Floor near Workstation 4',
        time: '9:45 PM',
        description: 'A distinct tread print in damp red clay soil found directly beneath the ransacked desk.',
        important: true,
        position: { x: 42, y: 76 },
        hintText: 'Inspect the floor tiles between the desks.',
        previewType: 'footprint',
        notes: 'Red clay soil is unique to the campus botanical garden shortcut behind staff quarters.'
      },
      {
        id: 'laptop-dock',
        name: 'Sheared Kensington Lock',
        type: 'Physical',
        location: 'Workstation 4 Desk',
        time: '9:40 PM',
        description: 'The steel security cable securing the laptop was severed cleanly with professional heavy-duty diagonal cutters.',
        important: false,
        position: { x: 48, y: 52 },
        hintText: 'Examine the empty computer desk where the prototype was docked.',
        previewType: 'laptop-dock',
        notes: 'Tool markings match standard maintenance shop cable cutters.'
      },
      {
        id: 'phone-ping',
        name: 'Phone Location Ping',
        type: 'Digital',
        location: 'Cell Tower Sector 4',
        time: '9:44 PM',
        description: 'Telecommunications log shows Ahmed\'s registered phone pinged the campus laboratory mast at 9:44 PM, directly contradicting his claim of being asleep at home.',
        important: true,
        position: { x: 24, y: 64 },
        hintText: 'Look around the waste bin beside the side bench.',
        previewType: 'phone',
        notes: 'Tower mast ping accuracy within 50 meters of the science building.'
      },
      {
        id: 'master-keycard',
        name: 'Digital Access Swipe Log',
        type: 'Document',
        location: 'Rear Door Card Reader',
        time: '9:41 PM',
        description: 'Server door log registers Master Badge #084 used to open the rear security door without setting off the alarm.',
        important: true,
        position: { x: 16, y: 38 },
        hintText: 'Inspect the glowing RFID badge terminal near the door frame.',
        previewType: 'access-card',
        notes: 'Badge #084 is assigned exclusively to Assistant Ahmed for maintenance rounds.'
      }
    ],
    suspects: [
      {
        id: 'ali-khan',
        name: 'Ali Khan',
        role: 'Graduate Student',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        motive: 'Competes with the project lead for PhD scholarship.',
        alibi: 'Studying in the 24/7 central library reading room.',
        bio: 'Ali has top grades and works late nights. He was visibly stressed about upcoming lab evaluations.',
        connectedEvidenceIds: ['laptop-dock'],
        isCulprit: false,
        interrogation: [
          {
            id: 'ali-q1',
            question: 'Where were you between 9:00 PM and 10:30 PM?',
            answer: 'I was on the third floor of the main library studying microcontrollers. The librarian stamped my study permit at 9:15 PM.'
          },
          {
            id: 'ali-q2',
            question: 'Did you need the data on the prototype laptop?',
            answer: 'I backed up the public dataset days ago. Taking physical hardware would only jeopardize my thesis.'
          }
        ]
      },
      {
        id: 'ahmed',
        name: 'Ahmed',
        role: 'Lab Assistant',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        motive: 'Financial Problem: Heavy overdue debt and loan shark notices.',
        alibi: 'Claims he was in bed at home with a severe migraine since 8 PM.',
        bio: 'Ahmed had full access to the keys and laboratory security schedules. Colleagues noticed he was fielding aggressive phone calls recently.',
        connectedEvidenceIds: ['cctv-footage', 'muddy-footprint', 'phone-ping', 'master-keycard'],
        isCulprit: true,
        interrogation: [
          {
            id: 'ahmed-q1',
            question: 'You claimed you were at home asleep. Can anyone confirm that?',
            answer: 'My phone was on silent and I live alone in the staff annex. Ask anyone, I had terrible headaches all afternoon!'
          },
          {
            id: 'ahmed-q2',
            question: 'Your master keycard #084 was swiped at the rear entrance at 9:41 PM. Explain that.',
            answer: '...What? That\'s impossible! I must have dropped my badge earlier that morning. Anyone could have picked it up!'
          },
          {
            id: 'ahmed-q3',
            question: 'The CCTV footage shows someone your exact height in a black jacket and size 10 muddy boots.',
            answer: 'Black jackets are everywhere on campus! You don\'t have real proof it was me!'
          }
        ]
      },
      {
        id: 'bilal',
        name: 'Bilal',
        role: 'Undergrad Student',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        motive: 'Personal rivalry with the laptop owner over an internship position.',
        alibi: 'Attending an online machine learning lecture stream.',
        bio: 'Bilal is outspoken and complained openly about the lab team receiving unfair faculty favoritism.',
        connectedEvidenceIds: [],
        isCulprit: false,
        interrogation: [
          {
            id: 'bilal-q1',
            question: 'Did you have any reason to target Workstation 4?',
            answer: 'Look, I disliked the team lead, sure. But I was typing in the group Discord stream all night from my dorm.'
          }
        ]
      },
      {
        id: 'usman',
        name: 'Usman',
        role: 'Technician',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
        motive: 'Disgruntlement over overtime pay cuts.',
        alibi: 'Conducting scheduled hardware inventory in the basement workshop.',
        bio: 'Usman owns the tools used in the campus labs, but kept his workshop log strictly accounted for with cameras.',
        connectedEvidenceIds: ['laptop-dock'],
        isCulprit: false,
        interrogation: [
          {
            id: 'usman-q1',
            question: 'The lock was cut with cable cutters from the workshop.',
            answer: 'The toolbox hangs in the open hallway closet. Anyone on the staff floor could grab them and put them back.'
          }
        ]
      }
    ]
  },
  {
    id: 'case-2',
    caseNumber: 2,
    title: 'The Stolen Diary',
    location: 'Old Library Archives',
    difficulty: 'Medium',
    coverImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    synopsis: 'A priceless 18th-century explorer\'s manuscript diary vanished from the climate-controlled vault during an intentional 4-minute blackout. Examine the vault, follow the traces of UV powder, and identify the thief.',
    targetTimeSeconds: 600,
    crucialEvidenceIds: ['uv-traces', 'vault-override', 'torn-catalog'],
    culpritId: 'marcus',
    reconstruction: {
      summary: 'Archivist Marcus orchestrated the power blackout using a tripped breaker in the basement to disable the optical alarm sensors and extract the diary.',
      culpritConfession: '"That book belongs to private collectors who truly appreciate history, not locked in dark basement vaults to rot!"',
      details: 'Marcus hid the diary in an antique leather folio before security could initiate emergency lockdown.'
    },
    evidenceList: [
      {
        id: 'uv-traces',
        name: 'UV Dust Residue',
        type: 'Forensic',
        location: 'Archive Glass Display',
        time: '10:14 PM',
        description: 'Luminescent tracing powder glowing under blacklight shows fingertip prints on the vault handle.',
        important: true,
        position: { x: 50, y: 45 },
        hintText: 'Check the display pedestal glass.',
        previewType: 'fingerprint',
        notes: 'Matched to Marcus\'s cotton archival gloves.'
      },
      {
        id: 'vault-override',
        name: 'Breaker Fuse Trip',
        type: 'Physical',
        location: 'Sub-basement Breaker',
        time: '10:10 PM',
        description: 'A blown timed relay switch deliberately rigged to kill the room circuits for exactly 240 seconds.',
        important: true,
        position: { x: 22, y: 70 },
        hintText: 'Inspect the fuse box on the left pillar.',
        previewType: 'access-card',
        notes: 'Installed by someone with deep technical knowledge of the library wiring.'
      },
      {
        id: 'torn-catalog',
        name: 'Torn Auction Receipt',
        type: 'Document',
        location: 'Trash Chute',
        time: '10:20 PM',
        description: 'A crumpled broker agreement with a private collector overseas offering $85,000.',
        important: true,
        position: { x: 82, y: 60 },
        hintText: 'Look inside the paper disposal bin.',
        previewType: 'note',
        notes: 'Handwriting matches cataloguing records.'
      }
    ],
    suspects: [
      {
        id: 'marcus',
        name: 'Marcus Vance',
        role: 'Chief Archivist',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
        motive: 'Secret auction contract with European private buyer.',
        alibi: 'Claims he was cataloguing medieval scrolls in Hall B.',
        bio: 'Marcus has worked at the archives for 12 years and knows every security bypass.',
        connectedEvidenceIds: ['uv-traces', 'vault-override', 'torn-catalog'],
        isCulprit: true,
        interrogation: [
          {
            id: 'marcus-q1',
            question: 'Why did the UV powder highlight your gloves?',
            answer: 'I handle hundreds of rare books every day! Of course my gloves have forensic transfer.'
          }
        ]
      },
      {
        id: 'elena',
        name: 'Elena Rostova',
        role: 'Assistant Curator',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
        motive: 'Inheritance dispute.',
        alibi: 'At the public reference desk with visitors.',
        bio: 'Elena was the first to notify security when the lights went out.',
        connectedEvidenceIds: [],
        isCulprit: false,
        interrogation: [
          {
            id: 'elena-q1',
            question: 'Did you hear anything in the vault?',
            answer: 'I heard the magnetic door click right as the emergency lamps turned on.'
          }
        ]
      }
    ]
  },
  {
    id: 'case-3',
    caseNumber: 3,
    title: 'The Auction Murder',
    location: 'Grand Art Gallery',
    difficulty: 'Hard',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    synopsis: 'A billionaire art dealer was discovered dead in the VIP salon minutes before the sale of the Century Diamond. Poison traces in the champagne flute point to an insider.',
    targetTimeSeconds: 720,
    crucialEvidenceIds: ['cyanide-glass', 'smudged-brooch', 'safe-receipt'],
    culpritId: 'pierre',
    reconstruction: {
      summary: 'Auctioneer Pierre poisoned Lord Montgomery to prevent an appraisal audit that would expose Pierre\'s counterfeit diamond swap scheme.',
      culpritConfession: '"He was going to announce the fake in front of international press! I had no choice, my career was on the line!"',
      details: 'Pierre slipped aconite into the exclusive reserve bottle during the private toast.'
    },
    evidenceList: [
      {
        id: 'cyanide-glass',
        name: 'Laced Champagne Flute',
        type: 'Forensic',
        location: 'VIP Salon Table',
        time: '8:45 PM',
        description: 'Crystal glass containing residue of odorless monkshood toxin.',
        important: true,
        position: { x: 45, y: 55 },
        hintText: 'Inspect the round marble coffee table.',
        previewType: 'poison',
        notes: 'Instant-acting neurotoxin dissolved in vintage bubbly.'
      },
      {
        id: 'smudged-brooch',
        name: 'Auctioneer Lapel Pin',
        type: 'Physical',
        location: 'Under the Velvet Sofa',
        time: '8:50 PM',
        description: 'Gold enameled auction house pin dropped during an altercation.',
        important: true,
        position: { x: 75, y: 70 },
        hintText: 'Look underneath the edge of the velvet armchair.',
        previewType: 'access-card',
        notes: 'Registered to Head Auctioneer Pierre.'
      },
      {
        id: 'safe-receipt',
        name: 'Counterfeit Certificate',
        type: 'Document',
        location: 'Desk Drawer',
        time: '8:30 PM',
        description: 'An uncashed check and gemstone appraisal revealing the diamond on auction was synthetic cubic zirconia.',
        important: true,
        position: { x: 25, y: 35 },
        hintText: 'Search the mahogany credenza drawers.',
        previewType: 'note',
        notes: 'Proves Pierre had a life-or-death motive.'
      }
    ],
    suspects: [
      {
        id: 'pierre',
        name: 'Pierre Laurent',
        role: 'Master Auctioneer',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
        motive: 'Concealing multi-million dollar counterfeit diamond swap.',
        alibi: 'Greeting patrons on the main gallery terrace.',
        bio: 'Charismatic and elegant, Pierre had exclusive VIP access to the salon.',
        connectedEvidenceIds: ['cyanide-glass', 'smudged-brooch', 'safe-receipt'],
        isCulprit: true,
        interrogation: [
          {
            id: 'pierre-q1',
            question: 'Your personal lapel pin was found beside the body.',
            answer: 'I... I stopped in to ask him about the reserve price earlier. It must have unclasped then!'
          }
        ]
      }
    ]
  },
  {
    id: 'case-4',
    caseNumber: 4,
    title: 'The Poisoned Drink',
    location: 'Le Bistro Restaurant',
    difficulty: 'Hard',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    synopsis: 'A notorious restaurant critic collapsed after tasting the chef\'s secret sauce. Four kitchen staff members had unsupervised access to the finishing pass.',
    targetTimeSeconds: 600,
    crucialEvidenceIds: ['poison-vial', 'order-ticket'],
    culpritId: 'claire',
    reconstruction: {
      summary: 'Sommelier Claire slipped belladonna extract into the table decanter after the critic threatened to shut down her family vineyard with a ruinous review.',
      culpritConfession: '"He destroys people\'s livelihoods for sport with his vicious pen. He had it coming."',
      details: 'Claire used the sommelier station service towel to conceal the dropper vial.'
    },
    evidenceList: [
      {
        id: 'poison-vial',
        name: 'Amber Glass Dropper',
        type: 'Physical',
        location: 'Wine Cellar Drain',
        time: '9:15 PM',
        description: 'Tossed into the floor drain behind the vintage Bordeaux racks.',
        important: true,
        position: { x: 30, y: 65 },
        hintText: 'Inspect the cellar floor grate.',
        previewType: 'poison',
        notes: 'Traces of concentrated belladonna.'
      },
      {
        id: 'order-ticket',
        name: 'Special Request Ticket',
        type: 'Document',
        location: 'Service Station 2',
        time: '9:00 PM',
        description: 'Service slip marked "VIP 1 - Private Reserve Decanter only". Hand-delivered by Claire.',
        important: true,
        position: { x: 70, y: 40 },
        hintText: 'Check the ticket spindle by the bar.',
        previewType: 'note',
        notes: 'Handwritten note directs wine service away from regular servers.'
      }
    ],
    suspects: [
      {
        id: 'claire',
        name: 'Claire Dupont',
        role: 'Sommelier',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
        motive: 'Protecting family heritage vineyard from critical ruin.',
        alibi: 'Decanting wine in the private cellar.',
        bio: 'Certified master sommelier with expert knowledge of herbal extracts and wine chemistry.',
        connectedEvidenceIds: ['poison-vial', 'order-ticket'],
        isCulprit: true,
        interrogation: [
          {
            id: 'claire-q1',
            question: 'Why did you personally prepare Table 1\'s decanter?',
            answer: 'It was a 1982 vintage! I never trust standard waitstaff with bottles of that caliber.'
          }
        ]
      }
    ]
  }
];

export const INITIAL_ACHIEVEMENTS = [
  {
    id: 'first-investigation',
    title: 'First Investigation',
    description: 'Solve your first criminal case.',
    completed: true,
    icon: 'Award',
    badgeType: 'gold' as const
  },
  {
    id: 'sharp-eye',
    title: 'Sharp Eye',
    description: 'Find all crime scene evidence without false clicks.',
    completed: true,
    icon: 'Eye',
    badgeType: 'emerald' as const
  },
  {
    id: 'speed-detective',
    title: 'Speed Detective',
    description: 'Solve an entire case under target time.',
    completed: false,
    icon: 'Zap',
    badgeType: 'cyan' as const
  },
  {
    id: 'evidence-expert',
    title: 'Evidence Expert',
    description: 'Correctly connect all clues on the investigation board.',
    completed: true,
    icon: 'Share2',
    badgeType: 'amber' as const
  },
  {
    id: 'master-detective',
    title: 'Master Detective',
    description: 'Complete all available criminal cases in the archive.',
    completed: false,
    icon: 'Crown',
    badgeType: 'gold' as const
  }
];
