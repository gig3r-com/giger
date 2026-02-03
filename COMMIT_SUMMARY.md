# Data Loading Fixes and Gigs Table Implementation

## Summary
Fixed critical data loading issues including duplicate users, null ID handling, and implemented proper Gigs table with reputation system. All data now loads correctly with deduplication and proper database schema.

## Issues Fixed

### 1. User Duplicates (3x each user)
- **Problem**: Users appeared 3 times in lists due to duplicate records with same Handle but different IDs
- **Solution**: Changed deduplication to group by Handle instead of ID in DataLoadController
- **Impact**: 591 records → 196 unique users

### 2. Null IDs Breaking Data Load
- **Problem**: ~5,015 messages and ~460 transactions had null IDs, causing only 3 messages to load
- **Solution**: Added ID generation for null IDs before deduplication in load-conversations and load-accounts endpoints
- **Impact**: All 5,015 messages and 460 transactions now load successfully

### 3. Nested Entity Duplicate Tracking Errors
- **Problem**: EF Core threw "duplicate key" errors for nested entities (MedicalEvents, Goals, Relations, etc.)
- **Solution**: Added global deduplication for all 6 nested entity types with ID generation for nulls
- **Impact**: 196 users load with all nested data intact

### 4. Gigs Table Missing (Everyone Saw All Gigs)
- **Problem**: Gigs used TPH inheritance (stored in ObscurableInfos), filtering didn't work, all users saw all 260 gigs
- **Solution**: Added `.ToTable("Gigs")` in GigerDbContext to use Table-per-Type inheritance
- **Impact**: Separate Gigs table created, proper filtering now works (users see only 70 AVAILABLE gigs)

### 5. GigReputation Not Persisted
- **Problem**: GigReputation was marked [NotMapped], data lost on load, users couldn't see their reputation
- **Solution**: Split Dictionary into 4 separate queryable columns (FIXER, KILLER, HACKING, WELLBEING) with getter/setter for API compatibility
- **Impact**: Reputation now persisted and queryable in database

### 6. Batching for Large Datasets
- **Problem**: Loading users/conversations/accounts in one batch caused EF Core tracking conflicts
- **Solution**: Implemented batch processing (10-20 items) with ChangeTracker.Clear() between batches
- **Impact**: Reliable loading of large datasets without conflicts

## Files Changed

### Backend Code (C#)
- `backendDotnet/Giger/Controllers/DataLoadController.cs` (+170 lines)
  - Changed user deduplication to group by Handle
  - Added null ID generation for Messages and Transactions
  - Added global deduplication for 6 nested entity types (MedicalEvent, CriminalEvent, PrivateRecord, Relation, Goal, Meta)
  - Implemented batch processing for Users, Conversations, and Accounts
  - Added using for Giger.Models.EventModels and Giger.Models.User.Records

- `backendDotnet/Giger/Models/User/UserPrivate.cs` (+29 lines)
  - Removed [NotMapped] from GigReputation
  - Split into 4 separate columns: GigReputationFixer, GigReputationKiller, GigReputationHacking, GigReputationWellbeing
  - Added Dictionary property with getter/setter for backward compatibility

- `backendDotnet/Giger/Services/GigerDbContext.cs` (+17 lines)
  - Added `.ToTable("Gigs")` configuration for Table-per-Type inheritance
  - Moved Gig configuration before UserPrivate configuration

- `backendDotnet/Giger/Program.cs` (-5 lines)
  - Removed AUTO_LOAD_DATA feature (was causing issues with duplicates)
  - Simplified to manual script-based loading

### Documentation
- `README.md` (+134 lines)
  - Updated Quick Start section with script-based approach
  - Added sample credentials
  - Updated architecture description

- `DATA_LOADING_QUICK_REFERENCE.md` (+62 lines)
  - Removed AUTO_LOAD_DATA references
  - Updated to script-based workflow

- `DATA_LOADING_CI_CD.md` (+46 lines)
  - Updated startup behavior documentation
  - Removed AUTO_LOAD_DATA sections

- `QUICK_START.md` (+218 lines)
  - Complete rewrite for script-based approach
  - Added troubleshooting section

### Configuration
- `docker-compose.yaml` (-1 line)
  - Removed AUTO_LOAD_DATA environment variable

### New Utility Scripts (not committed)
- `debug-autoload.sh` - Debug script for troubleshooting
- `docker-compose.prod.yaml` - Production configuration template
- `full-clean-test.sh` - Complete clean restart test
- `inspect-database.sh` - Database inspection utility
- `test-autoload.sh` - Auto-load testing script
- `test-new-developer.sh` - New developer onboarding test

## Database Schema Changes

### New Tables
- `Gigs` - Separate table for gigs (was in ObscurableInfos)

### New Columns in UsersPublic
- `GigReputationFixer` (numeric)
- `GigReputationKiller` (numeric)
- `GigReputationHacking` (numeric)
- `GigReputationWellbeing` (numeric)

## Testing Results

### Before Fixes
- ❌ 591 users (3x duplicates)
- ❌ 3 messages loaded (out of 5,015)
- ❌ 1 transaction loaded (out of 460)
- ❌ Users failed to load due to nested entity conflicts
- ❌ All users saw all 260 gigs
- ❌ No reputation data visible

### After Fixes
- ✅ 196 unique users
- ✅ 5,015 messages loaded
- ✅ 460 transactions loaded
- ✅ 195 auths loaded
- ✅ 585 conversations loaded
- ✅ 260 gigs in separate table
- ✅ Users see only 70 AVAILABLE gigs (with auth enabled)
- ✅ All reputation data persisted and queryable

## Migration Notes

### Breaking Changes
- Database schema requires fresh start (`docker-compose down -v`)
- GigReputation API response unchanged (still returns Dictionary)
- Gigs now in separate table (queries must use Gigs DbSet)

### Auth Requirement
- In DEBUG mode, auth must be explicitly enabled via `/api/login/enableAuth`
- Without enabled auth, all users are treated as god users and see all gigs

## Next Steps (Future Work)
- Consider adding reputation-based gig filtering (not implemented yet)
- Remove DEBUG auth bypass for production
- Add indexes on reputation columns for performance
- Consider removing temporary debug scripts or moving to tools/ directory
