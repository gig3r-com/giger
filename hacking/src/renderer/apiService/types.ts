/*
 * What I need to be able to get from API.
 */

/*
 * Just public user data by ID.
 */
type User = {
  id: string,
  role: 'user' | 'admin' // [NEW] Simple string that represents users role in network
  network: string, // [NEW] Id of a network that user belongs to
  subnetwork: string, // [NEW] Id of a subnetwork that user belongs to
  exploits: string[] // [NEW] Names of exploit that user has
  // all data in my.id that is public
}

/*
 * I cann it differently, but its just all User data, even that what is hidden
 */
type Profile = {
  id: string,
  subnetwork: string, // [NEW] Id of a subnetwork that user belongs to (as above)
  mindHack: 'enabled' | 'disabled' | 'banned' // [NEW] Field needed for Mind Exploit mechanics, not shown anywhere in Giger app
  hackerName: string, // [NEW] Changable (from hacking terminal) name of the hacker, not shown anywhere in Giger app.
  // All data in my.id, contacts, medical, criminal, relations and records
}

/*
 * Entirely new. Its name should be visible somewhere in Gig3r app (alongside with subnetwork and name of an admin)
 */
type Network = {
  id: string,
  name: string,
  subnetworks: string[],
  adminId: string,
}

/*
 * Entirely new. Its name should be visible somewhere in Gig3r app (alongside with network and name of an admin)
 */
type Subnetwork = {
  id: string,
  name: string,
  networkId: string,
  users: string[], // Ids of users inside subnetwork
  firewall: 'EncryptGuard' | 'FirewallX' | 'VirtualVault',
  operatingSystem: 'ForceShield' | 'EvilTwin' | 'JoanOfArc',
  ice: string, // Will be similar as above, but there are not ready yet.
  pastHacks: string[], // Just timestomps of every instance that a user hacked into this subnetwork. I can edit it manually by PATCH or PUT.
}

/*
 * Big one: LOGS. Every user account should keep logs of actions performed on it. This includes:
 * - Sending a message (Only that message was sent and when, not its text or receiver)
 * - Transfering founds
 * - Copying data
 * - decrypting system (I can send request telling when it happens)
 * - triggering ICE (As above, I can send request telling when it happens)
 * Maybe some more.
 */
