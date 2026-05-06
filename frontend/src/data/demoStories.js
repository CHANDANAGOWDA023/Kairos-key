export const demoStories = [
  {
    id: 1,
    title: "Grandmother's kitchen",
    age: 13,
    year: "2022",
    category: "Family",
    emotion: "tender",
    lesson: "Teaching is translation, not correction.",
    description:
      "Maya helped her grandmother learn WhatsApp while kneading scallion dough at the kitchen counter.",
    color: "#EC4899",
  },
  {
    id: 2,
    title: "Failed science fair motor",
    age: 14,
    year: "2023",
    category: "Failure",
    emotion: "frustrated",
    lesson: "A failed prototype can still teach the shape of the problem.",
    description:
      "Her compost sorter jammed during judging, but the failure made her curious about torque and design constraints.",
    color: "#FACC15",
  },
  {
    id: 3,
    title: "Biology class fermentation question",
    age: 15,
    year: "2024",
    category: "Hobby",
    emotion: "curious",
    lesson: "Small domestic rituals can become scientific questions.",
    description:
      "A sourdough starter turned into a notebook of experiments about temperature, yeast, and patience.",
    color: "#10B981",
  },
  {
    id: 4,
    title: "Student council silence",
    age: 16,
    year: "2025",
    category: "Conflict",
    emotion: "misunderstood",
    lesson: "Quiet people can lead by making the room more usable.",
    description:
      "Maya redesigned the volunteer signup system after realizing she did not need to be the loudest person to change the group.",
    color: "#3B82F6",
  },
];

export const storyNodes = [
  { id: "a", title: "Baking sourdough", x: 8, y: 42, tone: "patience" },
  { id: "b", title: "Biology class", x: 35, y: 20, tone: "curiosity" },
  { id: "c", title: "Grandmother's kitchen", x: 58, y: 46, tone: "family" },
  { id: "d", title: "Failed science fair", x: 82, y: 25, tone: "failure" },
  { id: "e", title: "Fermentation notebook", x: 25, y: 74, tone: "experimentation" },
  { id: "f", title: "Teaching younger sibling", x: 74, y: 78, tone: "mentorship" },
];

export const storyConnections = [
  ["a", "b"],
  ["a", "c"],
  ["b", "d"],
  ["b", "e"],
  ["c", "f"],
  ["d", "e"],
  ["e", "f"],
];
