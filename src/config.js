// ✏️ Yahan se saari cheezein edit karo — baqi code chhene ki zaroorat nahi.

export const CONFIG = {
  name: "Muneeb Sir",
  title: "Muneeb Sir",
  sender: "Hamza",
  // Countdown ke liye (local time). Mahina 0 se shuru hota hai nahi — yahan ISO string hai.
  birthday: "2026-11-17T00:00:00",
  dateLabel: "17 November 2026",
  urduGreeting: "سالگرہ مبارک ہو",
  tagline:
    "Aap jaise ustaad rab ki bari nematon mein se hain. Aaj ka din sirf aap ke liye, dil se dua ke saath.",

  photo: "/photos/sir-2.jpg",
  music: "", // e.g. "/music.mp3" — khali ho to button nahi dikhega
};

export const MARQUEE = [
  "Sehat",
  "Barkat",
  "Sukoon",
  "Kamyabi",
  "Izzat",
  "Khushi",
  "Ilm",
  "Rehmat",
];

// "Aap se kya seekha" — sab ke liye aam aur izzat wali baatein; apni yaad se badal sakte ho.
export const QUALITIES = [
  { n: "01", title: "Ilm ki roshni", text: "Aap ne sirf sabaq nahi parhaya, sochna aur sawal poochna bhi sikhaya." },
  { n: "02", title: "Sabr aur shafqat", text: "Har baar ek hi baat dobara samjhane par bhi aap ke maathe par shikan nahi aayi." },
  { n: "03", title: "Sachchi rehnumai", text: "Jab raasta nazar nahi aaya, aap ki ek baat ne himmat aur disha dono di." },
  { n: "04", title: "Kirdar ki misaal", text: "Aap ki baaton se zyada aap ka kirdar hamara ustaad raha hai." },
];

export const DUAS = [
  { icon: "🌿", title: "Sehat", text: "Allah aap ko sehat-o-afiyat wali lambi umar ata farmaye, har bimari aur pareshani se mehfooz rakhe." },
  { icon: "🌙", title: "Rizq", text: "Rizq mein barkat ho, halal kamayi mein itni wusat ke aap ke dil ko sukoon mile." },
  { icon: "😊", title: "Khushi", text: "Aap ki zindagi khushiyon se bhari rahe, aur chehre ki muskurahat kabhi na bujhe." },
  { icon: "⭐", title: "Kamyabi", text: "Har maidan mein kamyabi aap ke qadam chume, aur Allah har mushkil asaan farmaye." },
  { icon: "🕊️", title: "Sukoon", text: "Ghar aur dil dono mein sukoon rahe, aur Allah ka khaas karam hamesha saath rahe." },
  { icon: "🤲", title: "Shukriya", text: "Jo kuch aap ne sikhaya uska shukriya. Allah is ilm ka ajr aap ko dono jahan mein de." },
];

export const GALLERY = [
  { src: "/photos/sir-1.jpg", caption: "Takht-e-izzat", pos: "50% 20%" },
  { src: "/photos/sir-3.jpg", caption: "Himmat ka sipahi", pos: "50% 25%" },
  { src: "/photos/sir-4.jpg", caption: "Ilm ka khazana", pos: "40% 25%" },
  { src: "/photos/sir-5.jpg", caption: "Shaan o shaukat", pos: "50% 25%" },
  { src: "/photos/sir-2.jpg", caption: "Yaadgar tasveer", pos: "50% 25%" },
];

// Khat — lambi dil ki baat. Paragraphs ki list.
export const LETTER = [
  "Assalam-o-alaikum Sir,",
  "Aaj ka din aap ke liye khaas hai, aur humare liye bhi, kyunke aap jaisi shakhsiyat ka saath naseeb walon ko milta hai. Aap ne jo waqt, mehnat aur tawajjuh humein di, uska badla alfaaz mein ada nahi ho sakta.",
  "Allah aap ko sehat, khushi, izzat aur dono jahan ki kamyabi ata farmaye. Aap ki zindagi mein barkat ho, aur aap ka saaya hum par salamat rahe. Aameen.",
  "Janamdin bohat bohat mubarak ho!",
];

export const SHARE_TEXT = `Happy Birthday ${CONFIG.name}! 🎂
Allah aap ko sehat, khushi, barkat aur sukoon bhari lambi zindagi ata farmaye. Aameen.
— ${CONFIG.sender}`;
