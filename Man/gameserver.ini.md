# Main Configure File
## gameserver.ini
### Format
'gameserver.ini' is a configuration file for the server, it has no section headers and can have comments by placing two forward slashes '//' in front of any line. Multi-line comments are not supported.

Sections are separated by '// [Section]'.

Each setting is on a new line, all settings are currently numbers, example settings below.
```ini
// [Server]
...
serverStatsPort = 88
serverStatsUpdate = 60
serverLogLevel = 1
```

As the INI is updated may be updated on rather simple text editors remotely I elected to write all documentation sepreatly.
Most of this comes from './src/GameServer.js' but no one decided to add into the INI.

This file should have the default values for each setting.

### Head
This currently contains non-essential content.
```ini
// Ogar configurations file
// Lines starting with slashes are comment lines
```

### Server
This is for basic server information.
```ini
// [Server]

// How many connections will the server accept
serverMaxConnections = 64

// The port the server will accept connections on (to play the game).
// Use ports 1025-49151 to prevent requireing SUDO
serverPort = 443

// serverGamemode: See ./Man/Gamemodes.md
serverGamemode = 0

// serverBots: Amount of player bots to spawn (Experimental)
serverBots = 0

// Base view distance of players. Warning: high values may cause lag
// X: Horasontal, Y: Virtical
serverViewBaseX = 1024
serverViewBaseY = 592

// Port for the stats server. Having a negative number will disable the stats server.
// Use ports 1025-49151 to prevent requireing SUDO
serverStatsPort = 88

// Amount of seconds per update for server stats
serverStatsUpdate = 60

// Logging level of the server. 0 = No logs, 1 = Logs the console, 2 = Logs console and ip connections
serverLogLevel = 1
```

### Border

Where the borders of the map are.
Vanilla values are:
Side   | Value
-------|--------------
top    | 0
right  | 11180.3398875
bottom | 11180.3398875
left   | 0

```ini
// [Border]

borderLeft = 0
borderRight = 6000
borderTop = 0
borderBottom = 6000
```

### Food Spawn
**REMEMBER: Time is measured in ticks! (~50 ms)**

Food is the little cells that you eat (Not the player cells though!)

```ini
// [Spawn]

// The interval between each food cell spawn in ticks
spawnInterval = 20

// The amount of food to spawn per interval
foodSpawnAmount = 10

// The amount of food on the map when the server starts
foodStartAmount = 100

// Maximum amount of food cells on the map (After this stuff stops spawning)
foodMaxAmount = 500

// Food size (In mass)
foodMass = 1

// Minimum amount of viruses on the map (They will randomly spawn if it goes below this number)
virusMinAmount = 10

// Maximum amount of viruses on the map.
// If this amount is reached, then ejected cells will pass through viruses.
virusMaxAmount = 50

// Starting virus size (In mass)
virusStartMass = 100

// Amount of times you need to feed a virus to shoot it
virusFeedAmount = 7
```

### Ejected Mass
Note: By default when you eject mass a "food" entity shoots out @ 12 mass but you will loose 16 mass. (Net loss of 12 mass)

```ini
// [Ejected Mass]

// Mass ejected from the cell
ejectMass = 12

// Mass removed from the cell
ejectMassLoss = 16

// Base speed of ejected cells
ejectSpeed = 160

// Chance for a player to spawn from ejected mass
ejectSpawnPlayer = 50
```

### Player

```ini
// [Player]
// playerRecombineTime: Base amount of ticks before a cell is allowed to recombine (1 tick = 1000 milliseconds)
// playerMassDecayRate: Amount of mass lost per tick (Multiplier) (1 tick = 1000 milliseconds)
// playerMinMassDecay: Minimum mass for decay to occur
// playerDisconnectTime: The amount of seconds it takes for a player cell to be removed after disconnection (If set to -1, cells are never removed)
playerStartMass = 10
playerMaxMass = 22500
playerMinMassEject = 32
playerMinMassSplit = 36
playerMaxCells = 16
playerRecombineTime = 30
playerMassDecayRate = .002
playerMinMassDecay = 9
playerMaxNickLength = 15
playerSpeed = 30
playerDisconnectTime = 60
```

### Gamemode:

```ini
// [Gamemode]
// Custom gamemode settings
// tourneyTimeLimit: Time limit of the game, in minutes.
// tourneyAutoFill: If set to a value higher than 0, the tournament match will automatically fill up with bots after value seconds
// tourneyAutoFillPlayers: The timer for filling the server with bots will not count down unless there is this amount of real players
tourneyMaxPlayers = 12
tourneyPrepTime = 10
tourneyEndTime = 30
tourneyTimeLimit = 20
tourneyAutoFill = 0
tourneyAutoFillPlayers = 1
```
