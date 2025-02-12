type Notes = {
  [key: string]: string[];
};

const NOTES: Notes = {
  mitul: [
    'temp'
  ],
  zahra: [
    'temp'
  ]
};

export const getNotes = (person: string): string[] => {
  return NOTES[person] || [];
}; 