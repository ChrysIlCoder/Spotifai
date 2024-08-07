const randomNames = [
  "Summer Vibes",
  "Chill Hits",
  "Top Albums",
  "Party Time",
  "Relax & Unwind",
  "Road Trip",
  "Workout Beats",
  "Night Grooves",
];

const usedNames = new Set<string>();

export const getAlbumSectionRandomName = (): string => {
  let name: string;
  do {
    name = randomNames[Math.floor(Math.random() * randomNames.length)];
  } while (usedNames.has(name) && usedNames.size < randomNames.length);

  usedNames.add(name);
  return name;
};
