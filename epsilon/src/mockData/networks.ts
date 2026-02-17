export const networks = [
  {
    "id": "net-ec",
    "name": "Echelon Grid",
    "admin": "clockwork",
    "subnetworks": [
      "Core",
      "Ops",
      "R&D",
      "Audit"
    ],
    "nodes": {
      "hq": "Echelon Tower",
      "backup": "ColdStore-7"
    },
    "data": {
      "motto": "Precision above all",
      "sector": "Finance"
    }
  },
  {
    "id": "net-ns",
    "name": "Neon Spine",
    "admin": "synthia",
    "subnetworks": [
      "Spine-Core",
      "SynthHub",
      "NightMarket"
    ],
    "nodes": {
      "arcology": "Helix-18",
      "uplink": "Spire-North"
    },
    "data": {
      "motto": "We automate desire",
      "sector": "BioTech"
    }
  },
  {
    "id": "net-bib",
    "name": "Black Ice Bazaar",
    "admin": "neonViper",
    "subnetworks": [
      "Mainframe",
      "SmugglerNet",
      "BountyBoard"
    ],
    "nodes": {
      "datavault": "Obsidian-1",
      "exchange": "DarkLine"
    },
    "data": {
      "motto": "Everything has a price",
      "sector": "Shadow Market"
    }
  }
] as const;
