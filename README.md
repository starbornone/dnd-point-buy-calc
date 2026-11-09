# D&D 5e Point-Buy Calculator

A point-buy calculator for **Dungeons & Dragons 5th Edition** (D&D 5e) that helps generate character ability scores with race-specific bonuses and variant handling. Built using **Next.js** and **TypeScript**, this web application dynamically calculates point costs for ability scores and applies racial modifiers based on the selected race or variant.

## Features

### Ability Score Calculator

- Allows users to manually adjust their character’s **Strength**, **Dexterity**, **Constitution**, **Intelligence**, **Wisdom**, and **Charisma** scores.
- Fills the Player's Handbook standard array: 15, 14, 13, 12, 10, 8.
- Automatically calculates and displays the point costs for each ability score based on D&D 5e point buy rules.

### Racial Modifiers

- **Dynamic racial modifiers** are applied when a user selects a race from the dropdown.
- The app includes all standard D&D 5e races such as **Dragonborn**, **Elf**, **Dwarf**, **Tiefling**, and **Human**.
- Variant races are also supported, such as **High Elf**, **Hill Dwarf**, and **Variant Human**.
- **Example**: Selecting **Dragonborn** automatically applies +2 to Strength and +1 to Charisma, updating the total character ability scores and point costs.

### Custom Attribute Selection for Certain Races

- Races like **Half-Elf**, **Variant Human**, and **Changeling** allow users to pick additional attribute bonuses.
- For example, **Variant Human** lets you choose two ability scores to increase by +1, and applies the ability increase from the chosen Player's Handbook feat.

### Variant Race Support

- Several races, including **Dwarves**, **Elves**, **Gnomes**, **Genasi**, and **Shifters**, include variants with their own unique bonuses.
- **Example**: Selecting **Hill Dwarf** grants +2 Constitution and +1 Wisdom, while selecting **Mountain Dwarf** grants +2 Strength and +2 Constitution.

### Live Modifier and Total Score Calculation

- The app dynamically updates the total ability scores and modifiers as users adjust their base ability scores or racial bonuses.
- Modifiers for each ability score are calculated in real time based on the D&D 5e rules (e.g., a score of 14 provides a +2 modifier).
  
### Responsive Design with Tailwind CSS

- The app uses **Tailwind CSS** for styling, offering a clean and responsive design across different screen sizes.
- A custom color palette is applied for a D&D look and feel.

### Global State Management with React Context API

- Uses **React Context API** for managing global state, such as the currently selected race, attribute scores, and racial bonuses.
- Ensures smooth updates across components without needing page reloads.

## Racial Modifiers and Variants

The app features the following races and variants with their respective racial modifiers:

- **Dragonborn**: Strength +2, Charisma +1, and one of the ten draconic ancestries
- **Dwarf**: smith's tools, brewer's supplies, or mason's tools, plus a subrace:
  - **Hill Dwarf**: Constitution +2, Wisdom +1
  - **Mountain Dwarf**: Strength +2, Constitution +2
- **Elf**: Perception, plus a subrace:
  - **High Elf**: Dexterity +2, Intelligence +1, one extra language, and one wizard cantrip
  - **Wood Elf**: Dexterity +2, Wisdom +1
  - **Drow**: Dexterity +2, Charisma +1, and dancing lights
  - **Eladrin**: Dexterity +2, Intelligence +1
- **Gnome**:
  - **Forest Gnome**: Intelligence +2, Dexterity +1, and minor illusion
  - **Rock Gnome**: Intelligence +2, Constitution +1, and tinker's tools
- **Half-Elf**: Charisma +2, +1 to any two other attributes, two skills, and one extra language
- **Halfling**:
  - **Lightfoot Halfling**: Dexterity +2, Charisma +1
  - **Stout Halfling**: Dexterity +2, Constitution +1
- **Half-Orc**: Strength +2, Constitution +1, and Intimidation
- **Human**:
  - **Human**: +1 to all ability scores, and one extra language
  - **Variant Human**: +1 to any two attributes, one extra language, one skill, and the ability increase from the chosen feat
- **Tiefling**: Charisma +2, Intelligence +1, and thaumaturgy
- **Aasimar** (*Volo's Guide to Monsters*): the light cantrip, plus a subrace:
  - **Protector**: Charisma +2, Wisdom +1
  - **Scourge**: Charisma +2, Constitution +1
  - **Fallen**: Charisma +2, Strength +1
- **Changeling**: Charisma +2, +1 to any other attribute, two of Deception, Insight, Intimidation, and Persuasion, and two extra languages
- **Shifter** (*Eberron: Rising from the Last War*): one extra language, plus a subrace:
  - **Beasthide**: Constitution +2, Strength +1, and Athletics
  - **Longtooth**: Strength +2, Dexterity +1, and Intimidation
  - **Swiftstride**: Dexterity +2, Charisma +1, and Acrobatics
  - **Wildhunt**: Wisdom +2, Dexterity +1, and Survival
- **Genasi**:
  - **Air Genasi**: Constitution +2, Dexterity +1
  - **Earth Genasi**: Constitution +2, Strength +1
  - **Fire Genasi**: Constitution +2, Intelligence +1, and produce flame
  - **Water Genasi**: Constitution +2, Wisdom +1, and shape water
- **Goliath**: Strength +2, Constitution +1, and Athletics
- **Aarakocra**: Dexterity +2, Wisdom +1
- **Warforged** (*Eberron: Rising from the Last War*): Constitution +2, +1 to any other ability, one skill, one extra language, and one tool
- **Tabaxi**: Dexterity +2, Charisma +1, Acrobatics, Stealth, and one extra language
- **Firbolg**: Wisdom +2, Strength +1
- **Kobold** (*Volo's Guide to Monsters*): Dexterity +2, Strength -2
- **Lizardfolk**: Constitution +2, Wisdom +1
- **Githyanki** (*Mordenkainen's Tome of Foes*): Strength +2, Intelligence +1, and mage hand
- **Githzerai**: Wisdom +2, Intelligence +1, and mage hand

## Known Bugs

## Languages still to add

- Japanese
- Macedonian
- Russian

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js**: `24.x`
- **npm** or **yarn`

### Setup

1. Clone the repository:

   ```bash
   git clone git@github.com:starbornone/DnD-Point-Buy-Calc.git
   cd DnD-Point-Buy-Calc
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.
