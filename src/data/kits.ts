// Configurable field-service kits, priced live.
//
// These back /kits and /kits/:slug. They exist as a reference tool for cold
// visits: Aine opens a kit on his phone in someone's compound, sets the numbers
// to match what he just walked, and reads out a figure. The same page is public,
// so a prospect can play with it themselves before calling.
//
// ---------------------------------------------------------------------------
// PRICES ARE OWNER-MAINTAINED. Everything below is a UGX starting figure based
// on Kampala market rates for imported/refurbished kit. They are indicative,
// NOT quotes, and they will drift with the dollar and with supplier deals.
//
// To adjust: change the `price` numbers in place. Nothing else needs touching,
// the totals and discounts recompute from them. Keep them as plain numbers
// (no separators) so arithmetic stays exact.
//
// Review them at least quarterly, and after any big FX move.
// ---------------------------------------------------------------------------

export interface KitChoice {
    id: string
    label: string
    /** UGX. When the field sets `multiplyBy`, this is the per-unit price. */
    price: number
    note?: string
    /**
     * Hardware limit, e.g. an 8-port NVR takes 8 cameras. The configurator warns
     * (it does not silently "fix" the choice) when the count exceeds this.
     */
    capacity?: { field: string; max: number }
}

/**
 * `tab` groups fields into the configurator's tab bar. Fields sharing a `tab`
 * value land in the same panel; a field without one gets its own tab titled
 * with its label. Count fields are never tabbed, they sit above the bar and
 * stay visible whichever tab is open, because the quantity is the number
 * people keep adjusting.
 */
export type KitField =
    | {
        id: string
        label: string
        kind: 'choice'
        help?: string
        tab?: string
        choices: KitChoice[]
        default: string
        /** Multiply the chosen price by the current value of this count field. */
        multiplyBy?: string
    }
    | {
        id: string
        label: string
        kind: 'count'
        help?: string
        tab?: string
        min: number
        max: number
        default: number
        unitLabel: string
    }
    | {
        id: string
        label: string
        kind: 'toggle'
        help?: string
        tab?: string
        price: number
        default: boolean
    }

/** A line that scales with a count field, e.g. cabling per camera. */
export interface PerUnitItem {
    label: string
    price: number
    countField: string
}

export interface Kit {
    slug: string
    name: string
    category: string
    icon: 'camera' | 'wifi' | 'ticket' | 'lab' | 'desktop'
    /** One line for the index card. */
    summary: string
    /** Who this is actually for. */
    goodFor: string
    fields: KitField[]
    perUnitItems: PerUnitItem[]
    /** Always included, regardless of configuration. */
    baseItems: { label: string; price: number }[]
    /** Applied to the largest matching threshold only. */
    discounts: { minSubtotal: number; percent: number }[]
    notes: string[]
}

/** Volume discounts. One ladder shared by every kit; edit here to change all. */
const DISCOUNTS = [
    { minSubtotal: 5_000_000, percent: 3 },
    { minSubtotal: 12_000_000, percent: 5 },
    { minSubtotal: 25_000_000, percent: 8 },
    { minSubtotal: 50_000_000, percent: 10 },
]

export const kits: Kit[] = [
    // -----------------------------------------------------------------------
    {
        slug: 'cctv',
        name: 'CCTV system',
        category: 'Cameras & recording',
        icon: 'camera',
        summary:
            'Cameras, recorder, storage and cabling, sized to your compound. Remote viewing on your phone.',
        goodFor: 'Schools, shops, bars, hostels and offices that want eyes on the gate and the yard.',
        fields: [
            {
                id: 'cameras',
                label: 'How many cameras?',
                kind: 'count',
                min: 2,
                max: 32,
                default: 4,
                unitLabel: 'cameras',
                help: 'Count the points you want covered: gate, yard, corridor, till, store.',
            },
            {
                id: 'resolution',
                tab: 'Cameras',
                label: 'Camera resolution',
                kind: 'choice',
                multiplyBy: 'cameras',
                default: '4mp',
                help: 'Higher resolution gives you more detail, but also costs more and uses more storage.',
                choices: [
                    { id: '2mp', label: '2MP (1080p) IP/PoE', price: 160_000, note: 'General coverage' },
                    { id: '4mp', label: '4MP (2K) IP/PoE', price: 300_000, note: 'Better face detail' },
                    { id: '8mp', label: '8MP (4K) IP/PoE', price: 550_000, note: 'High-detail coverage' },
                ],
            },
            {
                id: 'housing',
                tab: 'Cameras',
                label: 'Camera type',
                kind: 'choice',
                multiplyBy: 'cameras',
                default: 'bullet',
                choices: [
                    { id: 'bullet', label: 'Bullet, outdoor', price: 0, note: 'Visible deterrent' },
                    { id: 'dome', label: 'Dome, indoor', price: 0, note: 'Discreet' },
                    { id: 'vandal', label: 'Vandal-proof dome', price: 45_000, note: 'Reachable positions' },
                ],
            },
            {
                id: 'nvr',
                tab: 'Recorder',
                label: 'Recorder (NVR)',
                kind: 'choice',
                default: 'nvr8',
                help: 'The recorder must have at least as many channels as you have cameras.',
                choices: [
                    { id: 'nvr4', label: '4-channel PoE NVR', price: 450_000, capacity: { field: 'cameras', max: 4 } },
                    { id: 'nvr8', label: '8-channel PoE NVR', price: 650_000, capacity: { field: 'cameras', max: 8 } },
                    { id: 'nvr16', label: '16-channel PoE NVR', price: 1_300_000, capacity: { field: 'cameras', max: 16 } },
                    { id: 'nvr32', label: '32-channel PoE NVR', price: 2_500_000, capacity: { field: 'cameras', max: 32 } },
                ],
            },
            {
                id: 'storage',
                tab: 'Storage',
                label: 'Recording storage',
                kind: 'choice',
                default: '2tb',
                help: 'More cameras and higher resolution fill a disk faster. 2TB is a common starting point.',
                choices: [
                    { id: '1tb', label: '1TB surveillance drive', price: 300_000, note: 'Entry storage' },
                    { id: '2tb', label: '2TB surveillance drive', price: 400_000, note: 'Common starting point' },
                    { id: '4tb', label: '4TB surveillance drive', price: 700_000, note: 'Longer retention' },
                    { id: '6tb', label: '6TB surveillance drive', price: 1_000_000, note: 'Extended retention' },
                ],
            },
            {
                id: 'switch',
                tab: 'Extras',
                label: 'Add a PoE switch',
                kind: 'toggle',
                price: 350_000,
                default: false,
                help: 'Adds additional PoE ports when the NVR cannot directly power all cameras or cameras are distributed across the network.',
            },
            {
                id: 'ups',
                tab: 'Extras',
                label: 'Battery backup for the recorder',
                kind: 'toggle',
                price: 300_000,
                default: true,
                help: 'Keeps recording through a power cut, which is when incidents happen.',
            },
        ],
        perUnitItems: [
            { label: 'Cabling, connectors and brackets', price: 55_000, countField: 'cameras' },
            { label: 'Mounting and installation', price: 65_000, countField: 'cameras' },
        ],
        baseItems: [
            { label: 'Configuration and remote viewing setup', price: 150_000 },
            { label: 'Handover, labelling and walkthrough', price: 100_000 },
        ],
        discounts: DISCOUNTS,
        notes: [
            'Long cable runs over 80m or trenching across a compound are quoted separately.',
            'Storage estimates depend on resolution, bitrate, frame rate and whether recording is continuous or motion-based.',
            'Plate recognition requires a suitable LPR camera, lens and installation position; 8MP alone does not guarantee plate readability.',
        ],
    },

    // -----------------------------------------------------------------------
    {
        slug: 'wifi',
        name: 'Campus & office WiFi',
        category: 'Networks',
        icon: 'wifi',
        summary:
            'Full coverage across a compound with one login for everyone, controlled centrally.',
        goodFor: 'Schools, offices, SACCOs and hostels tired of one router not reaching the far block.',
        fields: [
            {
                id: 'aps',
                label: 'How many access points?',
                kind: 'count',
                min: 1,
                max: 40,
                default: 4,
                unitLabel: 'access points',
                help: 'Roughly one per classroom block, floor or 15m radius indoors.',
            },
            {
                id: 'apclass',
                tab: 'Access points',
                label: 'Access point type',
                kind: 'choice',
                multiplyBy: 'aps',
                default: 'indoor5',
                choices: [
                    {
                        id: 'indoor5',
                        label: 'Indoor ceiling AP (WiFi 5)',
                        price: 290_000,
                        note: 'Classrooms, offices',
                    },
                    {
                        id: 'indoor6',
                        label: 'Indoor ceiling AP (WiFi 6)',
                        price: 470_000,
                        note: 'Denser, faster',
                    },
                    {
                        id: 'outdoor',
                        label: 'Outdoor / long-range AP',
                        price: 520_000,
                        note: 'Yards, between blocks',
                    },
                ],
            },
            {
                id: 'gateway',
                tab: 'Router',
                label: 'Router / gateway',
                kind: 'choice',
                default: 'hex',
                help: 'This is what shapes bandwidth and keeps one user from eating the whole line.',
                choices: [
                    {
                        id: 'hex',
                        label: 'MikroTik hEX',
                        price: 300_000,
                        note: 'Small deployments',
                    },
                    {
                        id: 'hapax',
                        label: 'MikroTik hAP ax²',
                        price: 450_000,
                        note: 'Small to medium deployments',
                    },
                    {
                        id: 'rb4011',
                        label: 'MikroTik RB4011',
                        price: 1_300_000,
                        note: 'Larger deployments',
                    },
                    {
                        id: 'rb5009',
                        label: 'MikroTik RB5009',
                        price: 1_500_000,
                        note: 'High-performance gateway',
                    },
                ],
            },
            {
                id: 'poe',
                tab: 'Switch',
                label: 'PoE switch',
                kind: 'choice',
                default: 'poe8',
                help: 'Powers compatible access points over Ethernet. Check both the number of PoE ports and the switch power budget when sizing.',
                choices: [
                    {
                        id: 'poe8',
                        label: '8-port PoE+ switch (8 PoE ports)',
                        price: 350_000,
                        capacity: { field: 'aps', max: 8 },
                        note: 'Up to 8 powered APs',
                    },
                    {
                        id: 'poe16',
                        label: '16-port PoE+ switch (16 PoE ports)',
                        price: 750_000,
                        capacity: { field: 'aps', max: 16 },
                        note: 'Up to 16 powered APs',
                    },
                    {
                        id: 'poe24',
                        label: '24-port PoE+ switch (24 PoE ports)',
                        price: 1_250_000,
                        capacity: { field: 'aps', max: 24 },
                        note: 'Up to 24 powered APs',
                    },
                ],
            },
            {
                id: 'portal',
                tab: 'Extras',
                label: 'Central controller and login page',
                kind: 'toggle',
                price: 450_000,
                default: true,
                help: 'One login for everyone, and you can cut off a device without touching the hardware.',
            },
        ],
        perUnitItems: [
            { label: 'Cabling and data points', price: 70_000, countField: 'aps' },
            { label: 'Mounting, aiming and testing', price: 75_000, countField: 'aps' },
        ],
        baseItems: [
            { label: 'Network design and addressing plan', price: 250_000 },
            { label: 'Handover, labelling and staff walkthrough', price: 120_000 },
        ],
        discounts: DISCOUNTS,
        notes: [
            'Assumes an existing internet line. We can advise on providers but the subscription is yours.',
            'Coverage across separate buildings may need a point-to-point link, quoted after a site visit.',
            'PoE switch capacity depends on both the number of powered ports and the total PoE power budget.',
        ],
    },

    // -----------------------------------------------------------------------
    {
        slug: 'hotspot',
        name: 'Hotspot business setup',
        category: 'Networks & billing',
        icon: 'ticket',
        summary:
            "Turn a building's internet into income: voucher codes, time or data bundles, billing in your name.",
        goodFor: 'Hostels, bars, lodges, arcades and landlords who already pay for a line.',
        fields: [
            {
                id: 'aps',
                label: 'How many access points?',
                kind: 'count',
                min: 1,
                max: 30,
                default: 3,
                unitLabel: 'access points',
                help: 'One per floor or per block is a reasonable starting point.',
            },
            {
                id: 'apclass',
                tab: 'Access points',
                label: 'Access point type',
                kind: 'choice',
                multiplyBy: 'aps',
                default: 'indoor5',
                choices: [
                    {
                        id: 'indoor5',
                        label: 'Indoor ceiling AP (WiFi 5)',
                        price: 290_000,
                    },
                    {
                        id: 'indoor6',
                        label: 'Indoor ceiling AP (WiFi 6)',
                        price: 470_000,
                    },
                    {
                        id: 'outdoor',
                        label: 'Outdoor / long-range AP',
                        price: 520_000,
                    },
                ],
            },
            {
                id: 'router',
                tab: 'Router',
                label: 'Hotspot router',
                kind: 'choice',
                default: 'hex',
                help: 'The router runs the voucher system, so it has to match your expected user count.',
                choices: [
                    {
                        id: 'hex',
                        label: 'MikroTik hEX',
                        price: 300_000,
                        note: 'Small deployments',
                    },
                    {
                        id: 'hapax',
                        label: 'MikroTik hAP ax²',
                        price: 450_000,
                        note: 'Small to medium deployments',
                    },
                    {
                        id: 'rb4011',
                        label: 'MikroTik RB4011',
                        price: 1_300_000,
                        note: 'Larger deployments',
                    },
                    {
                        id: 'rb5009',
                        label: 'MikroTik RB5009',
                        price: 1_500_000,
                        note: 'High-performance hotspot gateway',
                    },
                ],
            },
            {
                id: 'poe',
                tab: 'Switch',
                label: 'PoE switch',
                kind: 'choice',
                default: 'poe8',
                help: 'Powers compatible access points over Ethernet. Check both PoE port count and total power budget.',
                choices: [
                    {
                        id: 'poe8',
                        label: '8-port PoE+ switch (8 PoE ports)',
                        price: 350_000,
                        capacity: { field: 'aps', max: 8 },
                        note: 'Up to 8 powered APs',
                    },
                    {
                        id: 'poe16',
                        label: '16-port PoE+ switch (16 PoE ports)',
                        price: 750_000,
                        capacity: { field: 'aps', max: 16 },
                        note: 'Up to 16 powered APs',
                    },
                    {
                        id: 'poe24',
                        label: '24-port PoE+ switch (24 PoE ports)',
                        price: 1_250_000,
                        capacity: { field: 'aps', max: 24 },
                        note: 'Up to 24 powered APs',
                    },
                ],
            },
            {
                id: 'billing',
                tab: 'Billing',
                label: 'Billing system',
                kind: 'choice',
                default: 'branded',
                choices: [
                    {
                        id: 'vouchers',
                        label: 'Printed voucher codes only',
                        price: 350_000,
                        note: 'Sell codes at the counter',
                    },
                    {
                        id: 'branded',
                        label: 'Voucher codes + login page in your name',
                        price: 750_000,
                        note: 'Your brand on the page',
                    },
                    {
                        id: 'momo',
                        label: 'Mobile money self-service',
                        price: 1_600_000,
                        note: 'Users buy without you',
                    },
                ],
            },
            {
                id: 'training',
                tab: 'Extras',
                label: 'Train your staff to sell and manage it',
                kind: 'toggle',
                price: 200_000,
                default: true,
            },
        ],
        perUnitItems: [
            { label: 'Cabling and data points', price: 70_000, countField: 'aps' },
            { label: 'Mounting and testing', price: 75_000, countField: 'aps' },
        ],
        baseItems: [
            { label: 'Hotspot configuration and bundle setup', price: 300_000 },
            { label: 'Handover and first-month support', price: 150_000 },
        ],
        discounts: DISCOUNTS,
        notes: [
            'Mobile money self-service needs a registered merchant account in your name. We set up the integration, you own the account.',
            'The internet subscription itself is not included.',
            'PoE switch capacity depends on both the number of powered ports and the total PoE power budget.',
        ],
    },

    // -----------------------------------------------------------------------
    {
        slug: 'lab-thin-client',
        name: 'Computer lab: server + thin clients',
        category: 'Institutional labs',
        icon: 'lab',
        summary:
            'One server driving many low-cost terminals. Cheaper per seat and far less to maintain.',
        goodFor: 'Schools and training centres putting in 15 seats or more on a tight budget.',
        fields: [
            {
                id: 'scope',
                tab: 'Scope',
                label: 'What are we doing?',
                kind: 'choice',
                default: 'scratch',
                choices: [
                    { id: 'scratch', label: 'Build the lab from scratch', price: 1_800_000, note: 'Layout, trunking, power, network' },
                    { id: 'upgrade', label: 'Upgrade an existing lab', price: 950_000, note: 'Reuse what still works' },
                    { id: 'network', label: 'Add a network to an existing lab', price: 600_000, note: 'Machines already there' },
                ],
            },
            {
                id: 'seats',
                label: 'How many seats?',
                kind: 'count',
                min: 5,
                max: 120,
                default: 20,
                unitLabel: 'seats',
            },
            {
                id: 'terminal',
                tab: 'Per seat',
                label: 'Terminal per seat',
                kind: 'choice',
                multiplyBy: 'seats',
                default: 'refurb',
                choices: [
                    { id: 'reuse', label: 'Repurpose existing PCs as terminals', price: 60_000, note: 'Conversion only' },
                    { id: 'refurb', label: 'Refurbished thin client', price: 300_000 },
                    { id: 'new', label: 'New thin client', price: 550_000 },
                ],
            },
            {
                id: 'monitor',
                tab: 'Per seat',
                label: 'Monitor per seat',
                kind: 'choice',
                multiplyBy: 'seats',
                default: 'reuse',
                choices: [
                    { id: 'reuse', label: 'Reuse existing monitors', price: 0, note: 'No extra cost' },
                    { id: 'r19', label: '19" refurbished', price: 220_000 },
                    { id: 'n22', label: '22" new', price: 400_000 },
                ],
            },
            {
                id: 'server',
                tab: 'Server',
                label: 'Server',
                kind: 'choice',
                default: 'mid',
                help: 'The server has to carry every seat at once, so size it for the full lab.',
                choices: [
                    { id: 'entry', label: 'Entry server (16GB RAM)', price: 4_600_000, capacity: { field: 'seats', max: 20 } },
                    { id: 'mid', label: 'Mid server (32GB RAM)', price: 7_200_000, capacity: { field: 'seats', max: 40 } },
                    { id: 'high', label: 'High-capacity server (64GB RAM)', price: 11_500_000, capacity: { field: 'seats', max: 80 } },
                    { id: 'dual', label: 'Two mid servers, split load', price: 14_000_000, capacity: { field: 'seats', max: 120 } },
                ],
            },
            {
                id: 'network',
                tab: 'Network',
                label: 'Lab switch',
                kind: 'choice',
                default: 'sw24',
                help: 'Select enough switch ports for the terminals plus the server and other network equipment.',
                choices: [
                    { id: 'sw24', label: '24-port gigabit switch', price: 620_000, capacity: { field: 'seats', max: 23 } },
                    { id: 'sw48', label: '48-port gigabit switch', price: 1_250_000, capacity: { field: 'seats', max: 47 } },
                    { id: 'sw96', label: 'Two 48-port switches', price: 2_400_000, capacity: { field: 'seats', max: 95 } },
                ],
            },
            {
                id: 'ups',
                tab: 'Power',
                label: 'Power backup',
                kind: 'choice',
                default: 'ups1k',
                help: 'At minimum the server needs backup, or a power cut corrupts the lot.',
                choices: [
                    { id: 'ups1k', label: '1kVA UPS (server only)', price: 900_000 },
                    { id: 'ups3k', label: '3kVA rack UPS', price: 2_700_000, note: 'Server plus switches' },
                    { id: 'ups5k', label: '5kVA with battery bank', price: 4_800_000, note: 'Whole lab, short sessions' },
                ],
            },
        ],
        perUnitItems: [
            { label: 'Data point and cabling per seat', price: 95_000, countField: 'seats' },
            { label: 'Seat setup and imaging', price: 55_000, countField: 'seats' },
        ],
        baseItems: [
            { label: 'Server build, imaging and user accounts', price: 900_000 },
            { label: 'Teacher training and handover', price: 400_000 },
        ],
        discounts: DISCOUNTS,
        notes: [
            'Desks, chairs and the room itself are not included.',
            'Thin clients suit teaching, browsing and office work. Heavy design or video editing needs standalone machines.',
        ],
    },

    // -----------------------------------------------------------------------
    {
        slug: 'lab-standalone',
        name: 'Computer lab: standalone PCs',
        category: 'Institutional labs',
        icon: 'desktop',
        summary:
            'Full desktops at every seat, networked and imaged. Heavier work, no single point of failure.',
        goodFor: 'Labs running design, programming or exams where each machine must stand alone.',
        fields: [
            {
                id: 'scope',
                tab: 'Scope',
                label: 'What are we doing?',
                kind: 'choice',
                default: 'scratch',
                choices: [
                    { id: 'scratch', label: 'Build the lab from scratch', price: 1_800_000, note: 'Layout, trunking, power, network' },
                    { id: 'upgrade', label: 'Upgrade an existing lab', price: 950_000, note: 'Reuse what still works' },
                    { id: 'network', label: 'Add a network to an existing lab', price: 600_000, note: 'Machines already there' },
                ],
            },
            {
                id: 'seats',
                label: 'How many seats?',
                kind: 'count',
                min: 5,
                max: 120,
                default: 15,
                unitLabel: 'seats',
            },
            {
                id: 'pc',
                tab: 'Per seat',
                label: 'Machine per seat',
                kind: 'choice',
                multiplyBy: 'seats',
                default: 'refurb',
                choices: [
                    { id: 'none', label: 'Machines already on site', price: 0, note: 'No extra cost' },
                    { id: 'refurb', label: 'Refurbished desktop (i5, 8GB, SSD)', price: 800_000 },
                    { id: 'mini', label: 'Mini PC (i5, 8GB, SSD)', price: 1_150_000 },
                    { id: 'new', label: 'New desktop (i5, 8GB, SSD)', price: 1_900_000 },
                ],
            },
            {
                id: 'monitor',
                tab: 'Per seat',
                label: 'Monitor per seat',
                kind: 'choice',
                multiplyBy: 'seats',
                default: 'reuse',
                choices: [
                    { id: 'reuse', label: 'Reuse existing monitors', price: 0, note: 'No extra cost' },
                    { id: 'r19', label: '19" refurbished', price: 220_000 },
                    { id: 'n22', label: '22" new', price: 400_000 },
                ],
            },
            {
                id: 'network',
                tab: 'Network',
                label: 'Lab switch',
                kind: 'choice',
                default: 'sw24',
                help: 'Select enough switch ports for the machines plus the server and network equipment.',
                choices: [
                    { id: 'sw24', label: '24-port gigabit switch', price: 620_000, capacity: { field: 'seats', max: 23 } },
                    { id: 'sw48', label: '48-port gigabit switch', price: 1_250_000, capacity: { field: 'seats', max: 47 } },
                    { id: 'sw96', label: 'Two 48-port switches', price: 2_400_000, capacity: { field: 'seats', max: 95 } },
                ],
            },
            {
                id: 'ups',
                tab: 'Power',
                label: 'Power backup',
                kind: 'choice',
                default: 'none',
                choices: [
                    { id: 'none', label: 'None', price: 0, note: 'No extra cost' },
                    { id: 'strip', label: 'Per-seat surge protection', price: 45_000, note: 'Priced per seat below' },
                    { id: 'ups3k', label: '3kVA UPS for the room', price: 2_700_000 },
                ],
            },
            {
                id: 'server',
                tab: 'Extras',
                label: 'Add a file / domain server',
                kind: 'toggle',
                price: 4_600_000,
                default: false,
                help: 'Central logins and shared storage, so student work is not stuck on one machine.',
            },
        ],
        perUnitItems: [
            { label: 'Data point and cabling per seat', price: 95_000, countField: 'seats' },
            { label: 'Machine setup and imaging', price: 65_000, countField: 'seats' },
        ],
        baseItems: [
            { label: 'Network design and addressing plan', price: 250_000 },
            { label: 'Teacher training and handover', price: 400_000 },
        ],
        discounts: DISCOUNTS,
        notes: [
            'Desks, chairs and the room itself are not included.',
            'Operating system and productivity licensing is quoted separately, since institutions often have their own agreements.',
        ],
    },
]

export function getKitBySlug(slug: string) {
    return kits.find((k) => k.slug === slug)
}

// ---------------------------------------------------------------------------
// Pricing engine
// ---------------------------------------------------------------------------

export type KitConfig = Record<string, string | number | boolean>

export interface QuoteLine {
    label: string
    detail?: string
    qty: number
    unit: number
    total: number
}

export interface KitQuote {
    lines: QuoteLine[]
    subtotal: number
    discountPercent: number
    discountAmount: number
    total: number
    /** Hardware limits the current configuration breaks, tagged by field so the
        tab bar can flag which panel needs attention. */
    warnings: { fieldId: string; message: string }[]
    /** The next discount tier, for a "spend X more" nudge. */
    nextTier?: { minSubtotal: number; percent: number; gap: number }
}

export function defaultConfig(kit: Kit): KitConfig {
    const cfg: KitConfig = {}
    for (const f of kit.fields) cfg[f.id] = f.default
    return cfg
}

function countOf(kit: Kit, cfg: KitConfig, fieldId: string): number {
    const f = kit.fields.find((x) => x.id === fieldId)
    if (!f || f.kind !== 'count') return 1
    const v = Number(cfg[fieldId])
    return Number.isFinite(v) ? v : f.default
}

export function priceKit(kit: Kit, cfg: KitConfig): KitQuote {
    const lines: QuoteLine[] = []
    const warnings: { fieldId: string; message: string }[] = []

    for (const f of kit.fields) {
        if (f.kind === 'choice') {
            const chosen = f.choices.find((c) => c.id === cfg[f.id]) ?? f.choices[0]
            const qty = f.multiplyBy ? countOf(kit, cfg, f.multiplyBy) : 1
            // A zero-price option is legitimate ("reuse existing monitors"), but it
            // should not clutter the breakdown with a 0 line.
            if (chosen.price > 0) {
                lines.push({
                    label: f.label,
                    detail: chosen.label,
                    qty,
                    unit: chosen.price,
                    total: chosen.price * qty,
                })
            }
            if (chosen.capacity) {
                const have = countOf(kit, cfg, chosen.capacity.field)
                if (have > chosen.capacity.max) {
                    warnings.push({
                        fieldId: f.id,
                        message: `${chosen.label} supports up to ${chosen.capacity.max}. You have ${have}, so pick a larger option.`,
                    })
                }
            }
        } else if (f.kind === 'toggle') {
            if (cfg[f.id] === true) {
                lines.push({ label: f.label, qty: 1, unit: f.price, total: f.price })
            }
        }
        // `count` fields carry no price of their own; they drive the multipliers.
    }

    for (const item of kit.perUnitItems) {
        const qty = countOf(kit, cfg, item.countField)
        if (qty > 0 && item.price > 0) {
            lines.push({ label: item.label, qty, unit: item.price, total: item.price * qty })
        }
    }

    for (const item of kit.baseItems) {
        lines.push({ label: item.label, qty: 1, unit: item.price, total: item.price })
    }

    const subtotal = lines.reduce((a, l) => a + l.total, 0)

    // Highest matching tier wins; tiers are not cumulative.
    const tier = [...kit.discounts]
        .sort((a, b) => b.minSubtotal - a.minSubtotal)
        .find((d) => subtotal >= d.minSubtotal)
    const discountPercent = tier?.percent ?? 0
    const discountAmount = Math.round((subtotal * discountPercent) / 100)

    const next = [...kit.discounts]
        .sort((a, b) => a.minSubtotal - b.minSubtotal)
        .find((d) => subtotal < d.minSubtotal)

    return {
        lines,
        subtotal,
        discountPercent,
        discountAmount,
        total: subtotal - discountAmount,
        warnings,
        nextTier: next ? { ...next, gap: next.minSubtotal - subtotal } : undefined,
    }
}

/** UGX 1,250,000 */
export function formatUGX(n: number): string {
    return `UGX ${Math.round(n).toLocaleString('en-US')}`
}

/** A short human summary of the current configuration, for the WhatsApp message. */
export function describeConfig(kit: Kit, cfg: KitConfig): string[] {
    const out: string[] = []
    for (const f of kit.fields) {
        if (f.kind === 'count') {
            out.push(`${cfg[f.id]} ${f.unitLabel}`)
        } else if (f.kind === 'choice') {
            const chosen = f.choices.find((c) => c.id === cfg[f.id])
            if (chosen) out.push(`${f.label}: ${chosen.label}`)
        } else if (f.kind === 'toggle' && cfg[f.id] === true) {
            out.push(f.label)
        }
    }
    return out
}

/**
 * WhatsApp link carrying the kit AND the exact configuration. The whole point:
 * the thread opens with the spec already written out, so the conversation
 * starts from a shared number instead of "how much for cameras?".
 */
export function kitWhatsappHref(kit: Kit, cfg: KitConfig, quote: KitQuote): string {
    const body = [
        `Hi, I was looking at the ${kit.name} on bitpulse.dev/kits.`,
        '',
        'My setup:',
        ...describeConfig(kit, cfg).map((l) => `- ${l}`),
        '',
        `Estimate shown: ${formatUGX(quote.total)}`,
        '',
        "I'd like a quote for this.",
    ].join('\n')
    return `https://wa.me/256777532858?text=${encodeURIComponent(body)}`
}

/** Cheapest sensible build, for the "from" figure on the index cards. */
export function kitFromPrice(kit: Kit): number {
    const cfg = defaultConfig(kit)
    for (const f of kit.fields) {
        if (f.kind === 'count') cfg[f.id] = f.min
        else if (f.kind === 'choice') {
            const cheapest = [...f.choices].sort((a, b) => a.price - b.price)[0]
            cfg[f.id] = cheapest.id
        } else if (f.kind === 'toggle') cfg[f.id] = false
    }
    return priceKit(kit, cfg).total
}
