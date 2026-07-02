export const BRAND = {
  name: "Harman Homes",
  legalName: "RE/MAX Gold Realty Inc., Brokerage",
  agent: "Harman Sangha",
  role: "Sales Representative",
  phone: "416-953-0547",
  email: "mailto:harman@harman.homes",
  address: "2720 N Park Dr #50, Brampton, Ontario, L6S 0E9",
  website: "https://www.harman.homes",
  images: {
    agent:
      "https://www.harman.homes/files/agent_profile_pics/1760634721.png",
    agentHero:
      "https://www.harman.homes/themes/bannertheme/front_main_image/16257/photo.png",
    og: "https://www.harman.homes/files/og_images/16257/og_image.jpg",
    logo:
      "https://www.harman.homes/files/themeManager/16257/theme28/oj37tbzjtbxdwow18itr.png",
    blogFallbacks: {
      market:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=82",
      buying:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=82",
      selling:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=82",
      default:
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1400&q=82"
    }
  },
  palette: {
    ink: "#101216",
    charcoal: "#202020",
    slate: "#4b5563",
    mist: "#eef1f4",
    paper: "#ffffff",
    remaxBlue: "#003DA5",
    remaxRed: "#DC1C2E",
    silver: "#d7dbe0"
  },
  coverage: [
    "Brampton",
    "Caledon",
    "Mississauga",
    "Woodbridge",
    "Oakville",
    "Burlington",
    "Kitchener-Waterloo",
    "Richmond Hill"
  ]
} as const;
