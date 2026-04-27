export const subnetworks = [
  {
    "id": "sub-ec-1",
    "name": "Core",
    "network": "Echelon Grid",
    "users": [
      "avalon",
      "silkRoad",
      "zeroDay"
    ],
    "firewall": "Aegis-IX",
    "operationSystem": "OmniKernel 7",
    "ice": [
      "Black ICE v3",
      "RiotGlass"
    ],
    "accessPoint": "Public kiosk : Sector-5",
    "pastHacks": [
      "ZeroNight",
      "Orchid Fall"
    ],
    "logs": [
      {
        "id": "log-net-ec-1-1",
        "timestamp": "2025-11-01T00:00:00",
        "sourceUser": "avalon",
        "targetUser": "avalon",
        "logType": "ICE_TRIP",
        "logData": "token expired",
        "subnetwork": "Core"
      }
    ]
  },
  {
    "id": "sub-ec-2",
    "name": "Ops",
    "network": "Echelon Grid",
    "users": [
      "ironBard",
      "zeroDay",
      "redLotus"
    ],
    "firewall": "Aegis-IX",
    "operationSystem": "GhostShell 12",
    "ice": [
      "RiotGlass",
      "Medusa"
    ],
    "accessPoint": "Rooftop relay",
    "pastHacks": [
      "Cascade Break",
      "Glass Spire"
    ],
    "logs": [
      {
        "id": "log-net-ec-2-1",
        "timestamp": "2025-11-02T00:00:00",
        "sourceUser": "zeroDay",
        "targetUser": "zeroDay",
        "logType": "ICE_TRIP",
        "logData": "port sweep",
        "subnetwork": "Ops"
      }
    ]
  },
  {
    "id": "sub-ec-3",
    "name": "R&D",
    "network": "Echelon Grid",
    "users": [
      "ghostcat",
      "blueComet",
      "redLotus",
      "avalon",
      "neonViper"
    ],
    "firewall": "Cerberus Gate",
    "operationSystem": "SomaOS 3",
    "ice": [
      "Black ICE v3",
      "NeedleStorm"
    ],
    "accessPoint": "Rooftop relay",
    "pastHacks": [
      "Glass Spire",
      "ZeroNight"
    ],
    "logs": [
      {
        "id": "log-net-ec-3-1",
        "timestamp": "2025-11-03T00:00:00",
        "sourceUser": "neonViper",
        "targetUser": "redLotus",
        "logType": "AUTH_FAIL",
        "logData": "token expired",
        "subnetwork": "R&D"
      }
    ]
  },
  {
    "id": "sub-ec-4",
    "name": "Audit",
    "network": "Echelon Grid",
    "users": [
      "ghostcat",
      "avalon",
      "zeroDay",
      "redLotus"
    ],
    "firewall": "Cerberus Gate",
    "operationSystem": "NixOS-Grid",
    "ice": [
      "Whiteout",
      "Black ICE v3"
    ],
    "accessPoint": "Public kiosk : Sector-5",
    "pastHacks": [
      "Blue Dawn",
      "Glass Spire"
    ],
    "logs": [
      {
        "id": "log-net-ec-4-1",
        "timestamp": "2025-11-04T00:00:00",
        "sourceUser": "zeroDay",
        "targetUser": "avalon",
        "logType": "AUTH_FAIL",
        "logData": "signature mismatch",
        "subnetwork": "Audit"
      }
    ]
  },
  {
    "id": "sub-ns-1",
    "name": "Spine-Core",
    "network": "Neon Spine",
    "users": [
      "silkRoad",
      "ghostcat",
      "neonViper",
      "blueComet",
      "ironBard"
    ],
    "firewall": "Aegis-IX",
    "operationSystem": "OmniKernel 7",
    "ice": [
      "NeedleStorm",
      "RiotGlass"
    ],
    "accessPoint": "Service mesh : Gate-Ω",
    "pastHacks": [
      "Orchid Fall",
      "Cascade Break"
    ],
    "logs": [
      {
        "id": "log-net-ns-1-1",
        "timestamp": "2025-11-01T00:00:00",
        "sourceUser": "neonViper",
        "targetUser": "silkRoad",
        "logType": "ICE_TRIP",
        "logData": "port sweep",
        "subnetwork": "Spine-Core"
      }
    ]
  },
  {
    "id": "sub-ns-2",
    "name": "SynthHub",
    "network": "Neon Spine",
    "users": [
      "redLotus",
      "silkRoad",
      "ghostcat",
      "synthia",
      "ironBard"
    ],
    "firewall": "Cerberus Gate",
    "operationSystem": "OmniKernel 7",
    "ice": [
      "NeedleStorm",
      "RiotGlass"
    ],
    "accessPoint": "Public kiosk : Sector-5",
    "pastHacks": [
      "Cascade Break",
      "Blue Dawn"
    ],
    "logs": [
      {
        "id": "log-net-ns-2-1",
        "timestamp": "2025-11-02T00:00:00",
        "sourceUser": "silkRoad",
        "targetUser": "silkRoad",
        "logType": "AUTH_FAIL",
        "logData": "token expired",
        "subnetwork": "SynthHub"
      }
    ]
  },
  {
    "id": "sub-ns-3",
    "name": "NightMarket",
    "network": "Neon Spine",
    "users": [
      "blueComet",
      "redLotus",
      "clockwork",
      "ghostcat",
      "ironBard",
      "silkRoad",
      "synthia"
    ],
    "firewall": "Wolfhound",
    "operationSystem": "NixOS-Grid",
    "ice": [
      "Black ICE v3",
      "RiotGlass"
    ],
    "accessPoint": "Maintenance shaft 12B",
    "pastHacks": [
      "Cascade Break",
      "Glass Spire"
    ],
    "logs": [
      {
        "id": "log-net-ns-3-1",
        "timestamp": "2025-11-03T00:00:00",
        "sourceUser": "ironBard",
        "targetUser": "blueComet",
        "logType": "PING",
        "logData": "signature mismatch",
        "subnetwork": "NightMarket"
      }
    ]
  },
  {
    "id": "sub-bib-1",
    "name": "Mainframe",
    "network": "Black Ice Bazaar",
    "users": [
      "ironBard",
      "silkRoad",
      "avalon",
      "clockwork",
      "redLotus",
      "synthia"
    ],
    "firewall": "Cerberus Gate",
    "operationSystem": "SomaOS 3",
    "ice": [
      "Black ICE v3",
      "Medusa"
    ],
    "accessPoint": "Public kiosk : Sector-5",
    "pastHacks": [
      "Cascade Break",
      "Glass Spire"
    ],
    "logs": [
      {
        "id": "log-net-bib-1-1",
        "timestamp": "2025-11-01T00:00:00",
        "sourceUser": "ironBard",
        "targetUser": "synthia",
        "logType": "AUTH_FAIL",
        "logData": "token expired",
        "subnetwork": "Mainframe"
      }
    ]
  },
  {
    "id": "sub-bib-2",
    "name": "SmugglerNet",
    "network": "Black Ice Bazaar",
    "users": [
      "ironBard",
      "ghostcat",
      "silkRoad",
      "redLotus"
    ],
    "firewall": "Aegis-IX",
    "operationSystem": "OmniKernel 7",
    "ice": [
      "Medusa",
      "Whiteout"
    ],
    "accessPoint": "Rooftop relay",
    "pastHacks": [
      "Orchid Fall",
      "Blue Dawn"
    ],
    "logs": [
      {
        "id": "log-net-bib-2-1",
        "timestamp": "2025-11-02T00:00:00",
        "sourceUser": "redLotus",
        "targetUser": "ironBard",
        "logType": "SCAN",
        "logData": "signature mismatch",
        "subnetwork": "SmugglerNet"
      }
    ]
  },
  {
    "id": "sub-bib-3",
    "name": "BountyBoard",
    "network": "Black Ice Bazaar",
    "users": [
      "zeroDay",
      "avalon",
      "blueComet",
      "silkRoad",
      "ironBard"
    ],
    "firewall": "SableWall v5",
    "operationSystem": "GhostShell 12",
    "ice": [
      "Black ICE v3",
      "Whiteout"
    ],
    "accessPoint": "Maintenance shaft 12B",
    "pastHacks": [
      "Glass Spire",
      "Cascade Break"
    ],
    "logs": [
      {
        "id": "log-net-bib-3-1",
        "timestamp": "2025-11-03T00:00:00",
        "sourceUser": "blueComet",
        "targetUser": "ironBard",
        "logType": "PING",
        "logData": "port sweep",
        "subnetwork": "BountyBoard"
      }
    ]
  }
] as const;
