export const ATTRIBUTE_LIST = [
    'Strength',
    'Dexterity',
    'Constitution',
    'Intelligence',
    'Wisdom',
    'Charisma',
];

export const CLASS_LIST = [
    { name: "Barbarian", requirements: { Strength: 12, Constitution: 12 } },
    { name: "Bard", requirements: { Charisma: 12, Dexterity: 10 } },
    { name: "Cleric", requirements: { Wisdom: 12, Constitution: 10 } },
    { name: "Fighter", requirements: { Strength: 12, Constitution: 10 } },
    { name: "Rogue", requirements: { Dexterity: 12 } },
    { name: "Wizard", requirements: { Intelligence: 13 } },
  ];

export const SKILL_LIST = [
    { name: 'Acrobatics', attributeModifier: 'Dexterity' },
    { name: 'Animal Handling', attributeModifier: 'Wisdom' },
    { name: 'Arcana', attributeModifier: 'Intelligence' },
    { name: 'Athletics', attributeModifier: 'Strength' },
    { name: 'Deception', attributeModifier: 'Charisma' },
    { name: 'History', attributeModifier: 'Intelligence' },
    { name: 'Insight', attributeModifier: 'Wisdom' },
    { name: 'Intimidation', attributeModifier: 'Charisma' },
    { name: 'Investigation', attributeModifier: 'Intelligence' },
    { name: 'Medicine', attributeModifier: 'Wisdom' },
    { name: 'Nature', attributeModifier: 'Intelligence' },
    { name: 'Perception', attributeModifier: 'Wisdom' },
    { name: 'Performance', attributeModifier: 'Charisma' },
    { name: 'Persuasion', attributeModifier: 'Charisma' },
    { name: 'Religion', attributeModifier: 'Intelligence' },
    { name: 'Sleight of Hand', attributeModifier: 'Dexterity' },
    { name: 'Stealth', attributeModifier: 'Dexterity' },
    { name: 'Survival', attributeModifier: 'Wisdom' },

]