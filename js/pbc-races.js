 var racialInfo = [];
racialInfo[0] = {
    name: 'Dragonborn',
    ability: 'Your Strength score increases by 2, and your Charisma score increases by 1.',
    age: 'Young dragonborn grow quickly. They walk hours after hatching, attain the size and development of a' +
    ' 10-year-old human child by the age of 3, and reach adulthood by 15. They live to be around 80.',
    alignment: 'Dragonborn tend to extremes, making a conscious choice for one side or the other in the cosmic war' +
    ' between good and evil (represented by Bahamut and Tiamat, respectively). Most dragonborn are good, but those' +
    ' who side with Tiamat can be terrible villains.',
    size: 'Dragonborn are taller and heavier than humans, standing well over 6 feet tall and averaging almost 250' +
    ' pounds. Your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: 'You can speak, read, and write Common and Draconic. Draconic is thought to be one of the oldest' +
    ' languages and is often used in the study of magic. The language sounds harsh to most other creatures and' +
    ' includes numerous hard consonants and sibilants.',
    other: ['Draconic Ancestry',
        'You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon' +
        ' and damage resistance are determined by the dragon type, as shown in the table.',
        'Breath Weapon',
        'You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, ' +
        ' and damage type of the exhalation. When you use your breath weapon, each creature in the area of the' +
        ' exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC' +
        ' for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes' +
        ' 2d6 damage on a failed save. and half as much damage on a successful one. The damage increases to 3d6 at' +
        ' 6th level. 4d6 at 11th level, and 5d6 at 16th level. After you use your breath weapon, you can\'t use it' +
        ' again until you complete a short or long rest.',
        'Damage Resistance',
        'You have resistance to the damage type associated with your draconic ancestry.']
};
racialInfo[1] = {
    name: 'Dwarf',
    ability: 'Your Con score increases by 2.',
    age: 'Dwarves mature at the same rate as humans, but they&#039;re considered young until they reach the age' +
    ' of 50. On average, they live about 350 years.',
    alignment: 'Most dwarves are lawful, believing firmly in the benefits of a well-ordered society. They tend' +
    ' toward good as well, with a strong sense of fair play and a belief that everyone deserves to share in the' +
    ' benefits of a just order.',
    size: 'Dwarves stand between 4 and 5 feet tall and average about 150 pounds. Your size is Medium.',
    speed: 'Your base walking speed is 25 feet. Your speed is not reduced by wearing heavy armor.',
    language: 'You can speak, read, and write Common and Dwarvish. Dwarvish is full of hard consonants and' +
    ' guttural sounds, and those characteristics spill over into whatever other language a dwarf might speak.',
    other: ['Darkvision',
        'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim' +
        ' light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You' +
        ' can&#039;t discern color in darkness, only shades of grey.',
        'Dwarven Resilience',
        'You have advantage on saving throws against poison, and you have resistance against poison damage.',
        'Dwarven Combat Training',
        'You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.',
        'Tool Proficiency',
        'You gain proficiency with the artisan&#039;s tools of your choice: smith&#039;s tools, brewer&#039;s' +
        ' supplies, or mason&#039;s tools.',
        'Stonecunning',
        'Whenever you make an Int (History) check related to the origin of stonework, you are' +
        ' considered proficient in the History skill and add double your proficiency bonus to the check, instead' +
        ' of your normal proficiency bonus.'],
    variants: [{
        name: 'Hill Dwarf',
        ability: 'Your Wis score increases by 1.',
        other: ['Dwarven Toughness',
            'Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.']
    }, {
        name: 'Mountain Dwarf',
        ability: 'Your Str score increases by 2.',
        other: ['Dwarven Armor Training',
            'You have proficiency with light and medium armor.']
    }]
};
racialInfo[2] = {
    name: 'Elf',
    ability: 'Your Dex score increases by 2.',
    age: 'Although elves reach physical maturity at about the same age as humans, the elven understanding of' +
    ' adulthood goes beyond physical growth to encompass worldly experience. An elf typically claims adulthood and' +
    ' an adult name around the age of 100 and can live to be 750 years old.',
    alignment: 'Elves love freedom, variety, and self-expression, so they lean strongly toward the gentler aspects' +
    ' of chaos. They value and protect others&#039; freedom as well as their own, and they are more often good than' +
    ' not. The drow are an exception; their exile into the Underdark has made them vicious and dangerous. Drow are' +
    ' more often evil than not.',
    size: 'Elves range from under 5 to over 6 feet tall and have slender builds. Your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: 'You can speak, read, and write Common and Elvish. Elvish is fluid, with subtle intonations and' +
    ' intricate grammar. Elven literature is rich and varied, and their songs and poems are famous among other races.' +
    ' Many bards learn their language so they can add Elvish ballads to their repertoires.',
    other: ['Darkvision',
        'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim' +
        ' light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You' +
        ' can&#039;t discern color in darkness, only shades of grey.',
        'Keen Senses',
        'You have proficiency in the Perception skill.',
        'Fey Ancestry',
        'You have advantage on saving throws against being charmed, and magic can&#039;t put you to sleep.',
        'Trance',
        'Elves don&#039;t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day.' +
        ' (The Common word for such meditation is &quot;trance.&quot;) While meditating, you can dream after a' +
        ' fashion; such dreams are actually mental exercises that have become reflexive through years of practice.' +
        ' After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.'],
    variants: [{
        name: 'Dark Elf (Drow)',
        ability: 'Your Cha score increases by 1.',
        other: ['Superior Darkvision',
            'Your darkvision has a radius of 120 feet.',
            'Sunlight Sensitivity',
            'You have disadvantage on attack rolls and on Wis (Perception) checks that rely on sight when you,' +
            ' the target of your attack, or whatever you are trying to perceive is in direct sunlight.',
            'Drow Magic',
            'You know the <em>dancing lights</em> cantrip. When you reach 3rd level, you can cast the <em>faerie' +
            ' fire</em> spell once per day. When you reach 5th level, you can also cast the <em>darkness</em> spell' +
            ' once per day. Cha is your spellcasting ability for these spells.',
            'Drow Weapon Training',
            'You have proficiency with rapiers, shortswords, and hand crossbows.']
    }, {
        name: 'High Elf',
        ability: 'Your Int score increases by 1.',
        other: ['Elf Weapon Training',
            'You have proficiency with the longsword, shortsword, shortbow, and longbow.',
            'Cantrip',
            'You know one Cantrip of your choice from the wizard spell list. Int is your spellcasting ability for it.',
            'Extra Language',
            'You can speak, read, and write one extra language of your choice.']
    }, {
        name: 'Wood Elf',
        ability: 'Your Wis score increases by 1.',
        other: ['Elf Weapon Training',
            'You have proficiency with the longsword, shortsword, shortbow, and longbow.',
            'Fleet of Foot',
            'Your base walking speed increases to 35 feet.',
            'Mask of the Wild',
            'You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow,' +
            ' mist, and other natural phenomena.']
    }]
};
racialInfo[3] = {
    name: 'Gnome',
    ability: 'Your Int score increases by 2.',
    age: 'Gnomes mature at the same rate humans do, and most are expected to settle down into an adult life by' +
    ' around age 40. They can live 350 to almost 500 years.',
    alignment: 'Gnomes are most often good. Those who lend toward law are sages, engineers, researchers, scholars,' +
    ' investigators, or inventors. Those who lend toward chaos are minstrels, tricksters, wanderers, or fanciful' +
    ' jewelers. Gnomes are good-hearted, and even the tricksters among them are more playful than vicious.',
    size: 'Gnomes are between 3 and 4 feet tall and average about 40 pounds. Your size is Small.',
    speed: 'Your base walking speed is 25 feet.',
    language: 'You can speak, read, and write Common and Gnomish. The Gnomish language, which uses the Dwarvish' +
    ' script, is renowned for its technical treatises and its catalogs of knowledge about the natural world.',
    other: ['Darkvision',
        'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim' +
        ' light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You' +
        ' can&#039;t discern color in darkness, only shades of grey.',
        'Gnome Cunning',
        'You have advantage on all Int, Wis, and Cha saving throws against magic.'],
    variants: [{
        name: 'Forest Gnome',
        ability: 'Your Dex score increases by 1.',
        other: ['Natural Illusionist',
            'You know the <em>minor illusion</em> cantrip. Int is your spellcasting ability for it.',
            'Speak with Small Beasts',
            'Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts. Forest' +
            ' gnomes love animals and often keep squirrels, badgers, rabbits, moles, woodpeckers, and other' +
            ' creatures as beloved pets.']
    }, {
        name: 'Rock Gnome',
        ability: 'Your Con score increases by 1.',
        other: ['Artificer&#039;s Lore',
            'Whenever you make an Int (History) check related to magic items, alchemical objects, or technological' +
            ' devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply.',
            'Tinker',
            'You have proficiency with artisan&#039;s tools (tinker&#039;s tools). Using those tools, you can spend' +
            ' 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device' +
            ' ceases to function after 24 hours (unless you spend 1 hour repairing it to keep the device' +
            ' functioning), or when you use your action to dismantle it; at that time, you can reclaim the' +
            ' materials used to create it. You can have up to three such devices active at a time. When you create' +
            ' a device, choose one of the following options:<ul><li><strong>Clockwork Toy</strong>: This toy is a' +
            ' clockwork animal, monster, or person, such as a frog, mouse, bird, dragon, or soldier. When placed on' +
            ' the ground, the toy moves 5 feet across the ground on each of your turns in a random direction. It' +
            ' makes noises as appropriate to the creature it represents.</li><li><strong>Fire Starter</strong>: The' +
            ' device produces a miniature flame, which you can use to light a candle, torch, or campfire. Using' +
            ' the device requires your action.</li><li><strong>Music Box</strong>: When opened, this music box' +
            ' plays a single song at a moderate volume. The box stops playing when it reaches the song&#039;s end' +
            ' or when it is closed.</li></ul>']
    }]
};
racialInfo[4] = {
    name: 'Half-Elf',
    ability: 'Your Cha score increases by 2, and two other ability scores of your choice increase by 1.',
    age: 'Half-elves mature at the same rate humans do and reach adulthood around the age of 20. They live much' +
    ' longer than humans, however, often exceeding 180 years.',
    alignment: 'Half-elves share the chaotic bent of their elven heritage. They value both personal freedom and' +
    ' creative expression, demonstrating neither love of leaders nor desire for followers. They chafe at rules,' +
    ' resent others&#039; demands, and sometimes prove unreliable, or at least unpredictable.',
    size: 'HaIf-elves are about the same size as humans, ranging from 5 to 6 feet tall. Your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: 'You can speak, read, and write Common, Elvish, and one extra language of your choice.',
    other: ['Darkvision',
        'Thanks to your elf-blood, you have superior vision in dark and dim conditions. You can see in dim light' +
        ' within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can&#039;t' +
        ' discern color in darkness, only shades of grey.',
        'Fey Ancestry',
        'You have advantage on saving throws against being charmed, and magic can&#039;t put you to sleep.',
        'Skill Versatility',
        'You gain proficiency in two skills of your choice.'],
    variants: []
};
racialInfo[5] = {
    name: 'Half-Orc',
    ability: 'Your Str score increases by 2, and your Con score increases by 1.',
    age: 'Half-orcs mature a tittle faster than humans, reaching adulthood around age 14. They age noticeably faster' +
    ' and rarely live longer than 75 years.',
    alignment: 'Half-orcs inherit a tendency toward chaos from their orc parents and are not strongly inclined toward' +
    ' good. Half-orcs raised among orcs and willing to live out their lives among them are usually evil.',
    size: 'Half-orcs are somewhat larger and bulkier than humans, and they range from 5 to well over 6 feet tall.' +
    ' Your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: 'You can speak, read, and write Common and Orc. Orc is a harsh, grating language with hard consonants.' +
    ' It has no script of its own but is written in the Dwarvish script.',
    other: ['Darkvision',
        'Thanks to your orc blood, you have superior vision in dark and dim conditions. You can see in dim light' +
        ' within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You ean&#039;t' +
        ' discern color in darkness, only shades of grey.',
        'Menacing',
        'You gain proficiency in the Intimidation skill.',
        'Relentless Endurance',
        'When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You' +
        ' can&#039;t use this feature again until you finish a long rest.',
        'Savage Attacks',
        'When you score a critical hit with a melee weapon attack, you can roll one of the weapon&#039;s damage' +
        ' dice one additional time and add it to the extra damage of the critical hit.']
};
racialInfo[6] = {
    name: 'Halfling',
    ability: 'Your Dex score increases by 2.',
    age: 'A halfling reaches adulthood at the age of 20 and generally lives into the middle of his or her second' +
    ' century.',
    alignment: 'Most halflings are lawful good. As a rule, they are good-hearted and kind, hate to see others in' +
    ' pain, and have no tolerance for oppression. They are also very orderly and traditional, leaning heavily on the' +
    ' support of their community and the comfort of their old ways.',
    size: 'Halflings average about 3 feet tall and weigh about 40 pounds. Your size is Small.',
    speed: 'Your base walking speed is 25 feet.',
    language: 'You can speak, read, and write Common and Halfling. The Halfling language isn&#039;t secret, but' +
    ' halflings are loath to share it with others. They write very little, so they don&#039;t have a rich body of' +
    ' literature. Their oral tradition, however, is very strong. Almost all halflings speak Common to converse with' +
    ' the people in whose lands they dwell or through which they are traveling.',
    other: ['Lucky',
        'When you roll a 1 on an attack roll, ability check, or saving throw, you can re-roll the die and must use' +
        ' the new roll.',
        'Brave',
        'You have advantage on saving throws against being frightened.',
        'Halfling Nimbleness',
        'You can move through the space of any creature that is of a size larger than yours.'],
    variants: [{
        name: 'Lightfoot Halfling',
        ability: 'Your Cha score increases by 1.',
        other: ['Naturally Stealthy',
            'You can attempt to hide even when you are obscured only by a creature that is at least one size larger' +
            ' than you.']
    }, {
        name: 'Stout Halfling',
        ability: 'Your Con score increases by 1.',
        other: ['Stout Resilience',
            'You have advantage on saving throws against poison, and you have resistance against poison damage.']
    }]
};
racialInfo[7] = {
    name: 'Human',
    ability: 'Your ability scores each increase by 1.',
    age: 'Humans reach adulthood in their late teens and live less than a century.',
    alignment: 'Humans tend toward no particular alignment. The best and the worst are found among them.',
    size: 'Humans vary widely in height and build, from barely 5 feet to well over 6 feet tall. Regardless of your' +
    ' position in that range, your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: 'You can speak, read, and write Common and one extra language of your choice. Humans typically learn' +
    ' the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their' +
    ' speech with words borrowed from other tongues: Orc curses, Elvish musical expressions, Dwarvish military' +
    ' phrases, and so on.',
    other: [],
    variants: [{
        name: 'Disabled'
    }, {
        name: 'Enabled',
        ability: 'Two different ability scores of your choice increase by 1.',
        other: ['Skills',
        'You gain proficiency in one skill of your choice.',
        'Feat',
        'You gain one feat of your choice.']
    }]
};
racialInfo[8] = {
    name: 'Tiefling',
    ability: 'Your Int score increases by 1, and your Cha score increases by 2.',
    age: 'Tieflings mature at the same rate as humans but live a few years longer.',
    alignment: 'Tieflings might not have an innate tendency toward evil, but many of them end up there. Evil or not,' +
    ' an independent nature inclines many tieflings toward a chaotic alignment.',
    size: 'Tieflings are about the same size and build as humans. Your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: 'You can speak, read, and write Common and Infernal.',
    other: ['Darkvision',
        'Thanks to your infernal heritage, you have superior vision in dark and dim conditions. You can see in dim' +
        ' light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You' +
        ' can&#039;t discern color in darkness, only shades of grey.',
        'Hellish Resistance',
        'You have resistance to fire damage.',
        'Infernal Legacy',
        'You know the <em>thaumaturgy</em> cantrip. Once you reach 3rd level, you can cast the <em>hellish' +
        ' rebuke</em> spell once per day as a 2nd-level spell. Once you reach 5th level, you can also cast the' +
        ' <em>darkness</em> spell once per day. Cha is your spellcasting ability for these spells.'],
    variants: []
};
racialInfo[9] = {
    name: 'Aasimar',
    ability: '',
    age: '',
    alignment: '',
    size: '',
    speed: '',
    language: '',
    other : [],
    variants: []
};
racialInfo[10] = {
    name: 'Eladrin',
    ability: '',
    age: '',
    alignment: '',
    size: '',
    speed: '',
    language: '',
    other : [],
    variants: []
};
racialInfo[11] = {
    name: 'Changeling',
    ability: '',
    age: '',
    alignment: '',
    size: '',
    speed: '',
    language: '',
    other : [],
    variants: []
};
racialInfo[12] = {
    name: 'Shifter',
    ability: '',
    age: '',
    alignment: '',
    size: '',
    speed: '',
    language: '',
    other : [],
    variants: []
};
racialInfo[13] = {
    name: 'Warforged',
    ability: '',
    age: '',
    alignment: '',
    size: '',
    speed: '',
    language: '',
    other : [],
    variants: []
};
racialInfo[14] = {
    name: 'Aarakocra',
    ability: '',
    age: '',
    alignment: '',
    size: '',
    speed: '',
    language: '',
    other : [],
    variants: []
};
racialInfo[15] = {
    name: 'Genasi',
    ability: '',
    age: '',
    alignment: '',
    size: '',
    speed: '',
    language: '',
    other : [],
    variants: []
};
racialInfo[16] = {
    name: 'Goliath',
    ability: '',
    age: '',
    alignment: '',
    size: '',
    speed: '',
    language: '',
    other : [],
    variants: []
};
racialInfo[17] = {
    name: 'Minotaur',
    ability: '',
    age: '',
    alignment: '',
    size: '',
    speed: '',
    language: '',
    other : [],
    variants: []
};
racialInfo[18] = {
    name: 'Revenant',
    ability: '',
    age: '',
    alignment: '',
    size: '',
    speed: '',
    language: '',
    other : [],
    variants: []
};