type Notes = {
  [key: string]: string[];
};

const NOTES: Notes = {
  mitul: ['Note 1', 'Note 2'],
  zahra: ['Note 1', 'Note 2'],
};

export const getNotes = (person: string): string[] => {
  return NOTES[person] || [];
}; 