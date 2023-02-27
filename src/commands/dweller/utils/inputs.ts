/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuestionCollection } from 'inquirer';

export const inputs: Array<QuestionCollection<any>> = [
  {
    type: 'input',
    name: 'name',
    message: 'Dweller name:',
    validate: (input: string) => input !== '' && input !== undefined,
  },
  {
    type: 'number',
    name: 'lvl',
    message: 'Dweller lvl:',
    default: 1,
    validate: (input: number) => !isNaN(input),
  },
  {
    type: 'list',
    name: 'gender',
    message: 'Dweller gender:',
    choices: ['F', 'M'],
  },

  {
    type: 'number',
    name: 'Strength',
    message: 'Dweller Strength:',
    default: 1,
    validate: (input: number) => !isNaN(input),
  },
  {
    type: 'number',
    name: 'Perception',
    message: 'Dweller Perception:',
    default: 1,
    validate: (input: number) => !isNaN(input),
  },
  {
    type: 'number',
    name: 'Endurance',
    message: 'Dweller Endurance:',
    default: 1,
    validate: (input: number) => !isNaN(input),
  },
  {
    type: 'number',
    name: 'Charisma',
    message: 'Dweller Charisma:',
    default: 1,
    validate: (input: number) => !isNaN(input),
  },
  {
    type: 'number',
    name: 'Intelligence',
    message: 'Dweller Intelligence:',
    default: 1,
    validate: (input: number) => !isNaN(input),
  },
  {
    type: 'number',
    name: 'Agility',
    message: 'Dweller Agility:',
    default: 1,
    validate: (input: number) => !isNaN(input),
  },
  {
    type: 'number',
    name: 'Luck',
    message: 'Dweller Luck:',
    default: 1,
    validate: (input: number) => !isNaN(input),
  },
  {
    type: 'list',
    name: 'vaultKid',
    message: 'Does the dweller are born in our vault?',
    choices: ['Yes', 'No'],
  },
];
