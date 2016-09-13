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
    ability: 'Your Constitution score increases by 2.',
    age: 'Dwarves mature at the same rate as humans, but they\'re considered young until they reach the age' +
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
        ' can\'t discern color in darkness, only shades of grey.',
        'Dwarven Resilience',
        'You have advantage on saving throws against poison, and you have resistance against poison damage.',
        'Dwarven Combat Training',
        'You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.',
        'Tool Proficiency',
        'You gain proficiency with the artisan\'s tools of your choice: smith\'s tools, brewer\'s' +
        ' supplies, or mason\'s tools.',
        'Stonecunning',
        'Whenever you make an Intelligence (History) check related to the origin of stonework, you are' +
        ' considered proficient in the History skill and add double your proficiency bonus to the check, instead' +
        ' of your normal proficiency bonus.'],
    variants: [{
        name: 'Hill Dwarf',
        ability: 'Your Wisdom score increases by 1.',
        other: ['Dwarven Toughness',
            'Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.']
    }, {
        name: 'Mountain Dwarf',
        ability: 'Your Strength score increases by 2.',
        other: ['Dwarven Armor Training',
            'You have proficiency with light and medium armor.']
    }]
};
racialInfo[2] = {
    name: 'Elf',
    ability: 'Your Dexterity score increases by 2.',
    age: 'Although elves reach physical maturity at about the same age as humans, the elven understanding of' +
    ' adulthood goes beyond physical growth to encompass worldly experience. An elf typically claims adulthood and' +
    ' an adult name around the age of 100 and can live to be 750 years old.',
    alignment: 'Elves love freedom, variety, and self-expression, so they lean strongly toward the gentler aspects' +
    ' of chaos. They value and protect others\' freedom as well as their own, and they are more often good than' +
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
        ' can\'t discern color in darkness, only shades of grey.',
        'Keen Senses',
        'You have proficiency in the Perception skill.',
        'Fey Ancestry',
        'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.',
        'Trance',
        'Elves don\'t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day.' +
        ' (The Common word for such meditation is &quot;trance.&quot;) While meditating, you can dream after a' +
        ' fashion; such dreams are actually mental exercises that have become reflexive through years of practice.' +
        ' After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.'],
    variants: [{
        name: 'Dark Elf (Drow)',
        ability: 'Your Charisma score increases by 1.',
        other: ['Superior Darkvision',
            'Your darkvision has a radius of 120 feet.',
            'Sunlight Sensitivity',
            'You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you,' +
            ' the target of your attack, or whatever you are trying to perceive is in direct sunlight.',
            'Drow Magic',
            'You know the <em>dancing lights</em> cantrip. When you reach 3rd level, you can cast the <em>faerie' +
            ' fire</em> spell once per day. When you reach 5th level, you can also cast the <em>darkness</em> spell' +
            ' once per day. Charisma is your spellcasting ability for these spells.',
            'Drow Weapon Training',
            'You have proficiency with rapiers, shortswords, and hand crossbows.']
    }, {
        name: 'High Elf',
        ability: 'Your Intelligence score increases by 1.',
        other: ['Elf Weapon Training',
            'You have proficiency with the longsword, shortsword, shortbow, and longbow.',
            'Cantrip',
            'You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting' +
            ' ability for it.',
            'Extra Language',
            'You can speak, read, and write one extra language of your choice.']
    }, {
        name: 'Wood Elf',
        ability: 'Your Wisdom score increases by 1.',
        other: ['Elf Weapon Training',
            'You have proficiency with the longsword, shortsword, shortbow, and longbow.',
            'Fleet of Foot',
            'Your base walking speed increases to 35 feet.',
            'Mask of the Wild',
            'You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow,' +
            ' mist, and other natural phenomena.']
    }, {
        name: 'Eladrin',
        ability: 'Your Intelligence score increases by 1.',
        other: ['Elf Weapon Training',
            'You have proficiency with the longsword, shortsword, shortbow, and longbow.',
            'Fey Step',
            'You can cast the <em>misty step</em> spell once using this trait. You regain the ability to do so when' +
            ' you finish a short or long rest.']
    }]
};
racialInfo[3] = {
    name: 'Gnome',
    ability: 'Your Intelligence score increases by 2.',
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
        ' can\'t discern color in darkness, only shades of grey.',
        'Gnome Cunning',
        'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.'],
    variants: [{
        name: 'Forest Gnome',
        ability: 'Your Dexterity score increases by 1.',
        other: ['Natural Illusionist',
            'You know the <em>minor illusion</em> cantrip. Intelligence is your spellcasting ability for it.',
            'Speak with Small Beasts',
            'Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts. Forest' +
            ' gnomes love animals and often keep squirrels, badgers, rabbits, moles, woodpeckers, and other' +
            ' creatures as beloved pets.']
    }, {
        name: 'Rock Gnome',
        ability: 'Your Constitution score increases by 1.',
        other: ['Artificer\'s Lore',
            'Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or' +
            ' technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you' +
            ' normally apply.',
            'Tinker',
            'You have proficiency with artisan\'s tools (tinker\'s tools). Using those tools, you can spend' +
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
            ' plays a single song at a moderate volume. The box stops playing when it reaches the song\'s end' +
            ' or when it is closed.</li></ul>']
    }, {
        name: 'Deep Gnome',
        ability: 'Your Intelligence score increases by 2, and your Dexterity score increases by 1.',
        age: 'Deep gnomes are short-lived for gnomes. They mature at the same rate humans do and are considered' +
        ' full-grown adults by 25. They live 200 to 250 years, although hard toil and the dangers of the Underdark often' +
        ' claim them before their time.',
        alignment: 'Svirfneblin believe that survival depends on avoiding entanglements with other creatures and not' +
        ' making enemies, so they favour neutral alignments. They rarely wish others ill, and they are unlikely to' +
        ' take risks on behalf of others.',
        size: 'A typical svirfneblin stands about 3 to 3&frac12; feet tall and weighs 80 to 120 pounds. Your size is' +
        ' Small.',
        speed: ' Your base walking speed is 25 feet.',
        language: 'Your can speak, read, and write Common, Gnomish, and Undercommon. The svirfneblin dialect is more' +
        ' gutteral than surface Gnomish, and most svirfneblin know only a little bit of Common, but those who deal' +
        ' with outsiders (and that includes you as an adventurer) pick up enough Common to get by in other lands.',
        other: ['Superior Darkvision',
            'Your darkvision has a radius of 120 feet.',
            'Gnome Cunning',
            'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.',
            'Stone Camouflage',
            'You have advantage on Dexterity (stealth) checks to hide in rocky terrain.']
    }]
};
racialInfo[4] = {
    name: 'Half-Elf',
    ability: 'Your Charisma score increases by 2, and two other ability scores of your choice increase by 1.',
    age: 'Half-elves mature at the same rate humans do and reach adulthood around the age of 20. They live much' +
    ' longer than humans, however, often exceeding 180 years.',
    alignment: 'Half-elves share the chaotic bent of their elven heritage. They value both personal freedom and' +
    ' creative expression, demonstrating neither love of leaders nor desire for followers. They chafe at rules,' +
    ' resent others\' demands, and sometimes prove unreliable, or at least unpredictable.',
    size: 'HaIf-elves are about the same size as humans, ranging from 5 to 6 feet tall. Your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: 'You can speak, read, and write Common, Elvish, and one extra language of your choice.',
    other: ['Darkvision',
        'Thanks to your elf-blood, you have superior vision in dark and dim conditions. You can see in dim light' +
        ' within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t' +
        ' discern color in darkness, only shades of grey.',
        'Fey Ancestry',
        'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.',
        'Skill Versatility',
        'You gain proficiency in two skills of your choice.'],
    variants: []
};
racialInfo[5] = {
    name: 'Half-Orc',
    ability: 'Your Strength score increases by 2, and your Constitution score increases by 1.',
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
        ' within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You ean\'t' +
        ' discern color in darkness, only shades of grey.',
        'Menacing',
        'You gain proficiency in the Intimidation skill.',
        'Relentless Endurance',
        'When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You' +
        ' can\'t use this feature again until you finish a long rest.',
        'Savage Attacks',
        'When you score a critical hit with a melee weapon attack, you can roll one of the weapon\'s damage' +
        ' dice one additional time and add it to the extra damage of the critical hit.']
};
racialInfo[6] = {
    name: 'Halfling',
    ability: 'Your Dexterity score increases by 2.',
    age: 'A halfling reaches adulthood at the age of 20 and generally lives into the middle of his or her second' +
    ' century.',
    alignment: 'Most halflings are lawful good. As a rule, they are good-hearted and kind, hate to see others in' +
    ' pain, and have no tolerance for oppression. They are also very orderly and traditional, leaning heavily on the' +
    ' support of their community and the comfort of their old ways.',
    size: 'Halflings average about 3 feet tall and weigh about 40 pounds. Your size is Small.',
    speed: 'Your base walking speed is 25 feet.',
    language: 'You can speak, read, and write Common and Halfling. The Halfling language isn\'t secret, but' +
    ' halflings are loath to share it with others. They write very little, so they don\'t have a rich body of' +
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
        ability: 'Your Charisma score increases by 1.',
        other: ['Naturally Stealthy',
            'You can attempt to hide even when you are obscured only by a creature that is at least one size larger' +
            ' than you.']
    }, {
        name: 'Stout Halfling',
        ability: 'Your Constitution score increases by 1.',
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
    ability: 'Your Intelligence score increases by 1, and your Charisma score increases by 2.',
    age: 'Tieflings mature at the same rate as humans but live a few years longer.',
    alignment: 'Tieflings might not have an innate tendency toward evil, but many of them end up there. Evil or not,' +
    ' an independent nature inclines many tieflings toward a chaotic alignment.',
    size: 'Tieflings are about the same size and build as humans. Your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: 'You can speak, read, and write Common and Infernal.',
    other: ['Darkvision',
        'Thanks to your infernal heritage, you have superior vision in dark and dim conditions. You can see in dim' +
        ' light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You' +
        ' can\'t discern color in darkness, only shades of grey.',
        'Hellish Resistance',
        'You have resistance to fire damage.',
        'Infernal Legacy',
        'You know the <em>thaumaturgy</em> cantrip. Once you reach 3rd level, you can cast the <em>hellish' +
        ' rebuke</em> spell once per day as a 2nd-level spell. Once you reach 5th level, you can also cast the' +
        ' <em>darkness</em> spell once per day. Charisma is your spellcasting ability for these spells.'],
    variants: []
};
racialInfo[9] = {
    name: 'Aasimar',
    ability: 'Your Wisdom score increases by 1, and your Charisma score increases by 2.',
    age: 'Aasimar mature at the same rate as humans but live a few years longer.',
    alignment: 'Due to their celestial heritage, aasimar are often good. However, some aasimar fall into evil,' +
    ' rejecting their heritage.',
    size: 'Aasimar are build like well-proportioned humans. Your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: 'You can speak, read, and write Common and Celestial.',
    other: ['Darkvision',
        'Thanks to your celestial heritage, you have superior vision in dark and dim conditions. You can see in dim' +
        ' light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You' +
        ' can\'t discern color in darkness, only shades of grey.',
        'Celestial Resistance',
        'You have resistance to necrotic damage and radiant damage.',
        'Celestial Legacy',
        'You know the <em>light</em> cantrip. Once you reach 3rd level, you can cast the <em>lesser restoration</em>' +
        ' spell once with this trait, and you regain the ability to so when you finish a long rest. Once you reach' +
        ' 5th level, you can cast the <em>daylight</em> spell once with this trait as a 3rd-level spell, and you' +
        ' regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these' +
        ' spells.'],
    variants: []
};
/*racialInfo[10] = {
 name: 'Eladrin',
 ability: '',
 age: '',
 alignment: '',
 size: '',
 speed: '',
 language: '',
 other : [],
 variants: []
 };*/
racialInfo[11] = {
    name: 'Changeling',
    ability: 'Your Dexterity and Charisma scores increase by 1.',
    age: '...',
    alignment: '...',
    size: 'Changelings are built much like humans, but a little leaner. Your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: '...',
    other: ['Duplicity',
        'You gain proficiency in the Deception skill.',
        'Shapechanger',
        'As an action, you can polymorph into any humanoid of your size that you have seen, or back into your true' +
        ' form. However, your equipment does not change with you. If you die, you revert to your natural appearance.'],
    variants: []
};
racialInfo[12] = {
    name: 'Shifter',
    ability: 'Your Dexterity score increases by 1.',
    age: '...',
    alignment: '...',
    size: 'Shifters are about the same size as humans. Your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: '...',
    other: ['Darkvision',
        'Your lycanthropic heritage grants you the ability to see in dark conditions. You can see in dim light within' +
        ' 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color' +
        ' in darkness, only shades of gray.',
        'Shifting',
        'On your turn, you can shift as a bonus action. Shifting lasts for 1 minute or until you end it on your turn' +
        ' as a bonus action. While shifting, you gain temporary hit points equal to your level + your Constitution' +
        ' bonus (minimum of 1). You also gain a feature that depends on your shifter subrace, described below. You' +
        ' must finish a short or long rest before you can shift again.',],
    variants: [{
        name: 'Beasthide',
        ability: 'Your Constitution score increases by 1.',
        other: ['Shifting Feature',
            'While shifting, you gain a +1 bonus to AC.']
    }, {
        name: 'Cliffwalk',
        ability: 'Your Dexterity score increases by 1.',
        other: ['Shifting Feature',
            'While shifting, you gain a climb speed of 30 feet.']
    }, {
        name: 'Longstride',
        ability: 'Your Dexterity score increases by 1.',
        other: ['Shifting Feature',
            'While shifting, you can use the Dash action as a bonus action.']
    }, {
        name: 'Longtooth',
        ability: 'Your Strength score increases by 1.',
        other: ['Shifting Feature',
            'While shifting, you can make a bite attack as an action. This is a melee weapon attack that uses' +
            ' Strength for its attack roll and damage bonus and deals 1d6 piercing damage. If this attack hits a' +
            ' target that is your size or smaller, the target is also grappled.']
    }, {
        name: 'Razorclaw',
        ability: 'Your Dexterity score increases by 1.',
        other: ['Shifting Feature',
            'While shifting, you can make an unarmed strike as a bonus action. You can use your Dexterity for its' +
            ' attack roll and damage bonus, and this attack deals slashing damage.']
    }, {
        name: 'Wildhunt',
        ability: 'Your Wisdom score increases by 1.',
        other: ['Shifting Feature',
            'While shifting, you gain advantage on all Wisdom-based checks and saving throws.']
    }]
};
racialInfo[13] = {
    name: 'Warforged',
    ability: 'Your Strength and Constitution scores increase by 1.',
    age: '...',
    alignment: '...',
    size: 'Warforged are generally broader and heavier than humans. Your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: 'You can speak, read, and write Common and one other language of your choice.',
    other: ['Composite Plating',
        'Your construction incorporates wood and metal, granting you a +1 bonus to Armor Class.',
        'Living Construct',
        'Even though you were constructed, you are a living creature. You are immune to disease. You do not need to' +
        ' eat or breathe, but you can ingest food and drink if you wish. Instead of sleeping, you enter an inactive' +
        ' state for 4 hours each day. You do not dream in this state; you are fully aware of your surroundings and' +
        ' notice approaching enemies and other events as normal.'],
    variants: []
};
racialInfo[14] = {
    name: 'Minotaur',
    ability: 'Your Strength score increases by 1.',
    age: 'Minotaurs enter adulthood at around the age of 17 and can live up to 150 years.',
    alignment: 'Minotaurs believe in a strict code of honor, and thus tend toward law. They are loyal to the death' +
    ' and make implacable enemies, even as their brutal culture and disdain for weakness push them toward evil.',
    size: 'Minotaurs typically stand well over 6 feet tall and weigh an average of 300 pounds. Your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: 'You can speak, read, and write Common.',
    other: ['Conqueror\'s Virtue',
        'From a young age, you focused on one of the three virtues of strength, cunning, or intellect. Your choice of' +
        ' your Strength, Intelligence, or Wisdom score increases by 1.',
        'Horns',
        'You are never unarmed. You are proficient with your horns, which are a melee weapon that deals 1d10 piercing' +
        ' damage. Your horns grant you advantage on all checks made to shove a creature, but not to avoid being' +
        ' shoved yourself.',
        'Goring Rush',
        'When you use the Dash action during your turn, you can make a melee attack with your horns as a bonus' +
        ' action.',
        'Hammering Horns',
        'When you use the Attack action during your turn to make a melee attack, you can attempt to shove a creature' +
        ' with your horns as a bonus action. You cannot use this shove attempt to knock a creature prone.',
        'Labyrinthine Recall',
        'You can perfectly recall any path you have traveled.',
        'Sea Reaver',
        'You gain proficiency with navigator’s tools and vehicles (water).'],
    variants: []
};
racialInfo[15] = {
    name: 'Revenant',
    ability: '',
    age: '',
    alignment: '',
    size: '',
    speed: '',
    language: '',
    other: [],
    variants: []
};
racialInfo[16] = {
    name: 'Aarakocra',
    ability: 'Your Dexterity score increases by 2, and your Wisdom score increases by 1.',
    age: 'Aarakocra reach maturity by age 3. Compared to humans, aarakocra don\'t usually live longer than 30' +
    ' years.',
    alignment: 'Most aarakocra are good and rarely choose sides when it comes to law and chaos. Tribal leaders and' +
    ' warriors might be lawful, while explorers and adventurers might tend toward chaotic.',
    size: 'Aarakocra are about 5 feet tall. They have thin, lightwieght bodies that weigh between 80 and 100 pounds.' +
    ' Your size is Medium.',
    speed: 'Your base walking speed is 25 feet.',
    language: 'You can speak, read, and write Common, Aarakocra, and Auran.',
    other: ['Flight',
        'You have a flying speed of 50 feet. To use this speed, you can\'t be wearing medium or heavy armour.',
        'Talons',
        'You are proficient with your unarmed strikes, with deal 1d4 slashing damage on a hit.'],
    variants: []
};
racialInfo[17] = {
    name: 'Genasi',
    ability: 'Your Constitution score increases by 2.',
    age: 'Genasi mature at about the same rate as humans and reach adulthood in their late teens. They live somewhat' +
    ' longer than humans do, up to 120 years.',
    alignment: 'Independent and self-reliant, genasi tend toward a neutral alignment.',
    size: 'Genasi are as varied as their mortal parents but are generally built like humans, standing anywhere from' +
    ' 5 feet to over 6 feet tall. Your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: 'You can speak, read, and write Common and Primordial. Primordial is a guttural language, filled with' +
    ' harsh syllables and hard consonants.',
    other: [],
    variants: [{
        name: 'Air Genasi',
        ability: "Your Dexterity score increases by 1.",
        other: ['Unending Breath',
            'You can hold your breath indefinitely while you\'re not incapacitated.'],
    }, {
        name: 'Earth Genasi',
        ability: 'Your Strength score increases by 1.',
        other: ['Earth Walk',
            'You can move across difficult terrain made of earth or stone without expending extra movement.',
            'Merge with Stone',
            'You can cast the pass without trace spell once with this trait, requiring no material components, and' +
            ' you regain the ability to cast it this way when you finish a long rest. Constitution is your' +
            ' spellcasting ability for this spell.']
    }, {
        name: 'Fire Genasi',
        ability: 'Your Intelligence score increases by 1.',
        other: ['Darkvision',
            'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were' +
            ' dim light. Your ties to the Elemental Plane of Fire make your darkvision unusual: everything you see in' +
            ' darkness is in a shade of red.',
            'Fire Resistance',
            'You have resistance to fire damage.',
            'Reach to the Blaze',
            'You know the produce flame cantrip. Once you reach 3rd level, you can cast the burning hands spell once' +
            ' with this trait as a 1st-level spell, and you regain the ability to cast it this way when you finish a' +
            ' long rest. Constitution is your spellcasting ability for these spells.']
    }, {
        name: 'Water Genasi',
        ability: 'Your Wisdom score increases by 1.',
        other: ['Acid Resistance',
            'You have resistance to acid damage.',
            'Amphibious',
            'You can breathe air and water.',
            'Swim',
            'You have a swimming speed of 30 feet.',
            'Call to the Wave',
            'You know the <em>shape water</em> cantrip (see chapter 2). When you reach 3rd level, you can cast the' +
            ' <em>create or destroy water</em> spell as a 2nd-level spell once with this trait, and you regain the' +
            ' ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for' +
            ' these spells.']
    }]
};
racialInfo[18] = {
    name: 'Goliath',
    ability: 'Your Strength score increases by 2, and your Constitution score increases by 1.',
    age: 'Goliaths have lifespans comparable to humans. They enter adulthood in their late teens and usually live' +
    ' less than a century.',
    alignment: 'Goliath society, with its clear roles and tasks, has a strong lawful bent. The goliath sense of' +
    ' fairness, balanced with an emphasis on self-sufficiency and personal accountability, pushes them toward' +
    ' neutrality.',
    size: 'Goliaths are between 7 and 8 feet tall and weigh between 280 and 340 pounds. Your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: 'You can speak, read, and write Common and Giant.',
    other: ['Natural Athlete',
        'You have proficiency in the Athletics skill.',
        'Stone\'s Endurance',
        'You can focus yourself to occasionally shrug off injury. When you take damage, you can use your reaction to' +
        ' roll a d12. Add your Constitution modifier to the number rolled, and reduce the damage by that total. After' +
        ' you use this trait, you can\'t use it again until you finish a short or long rest.',
        'Powerful Build',
        'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or' +
        ' lift.',
        'Mountain Born',
        'You’re acclimated to high altitude, including elevations above 20,000 feet. You’re also naturally adapted to' +
        ' cold climates, as described in chapter 5 of the <em>Dungeon Master’s Guide.</em>'],
    variants: []
};