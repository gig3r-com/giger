# Data Quality Handling in API-Based Data Loader

## Overview
The data loader now automatically handles various data quality issues found in the source JSON files, allowing clean loading without manual data cleanup.

## Issues Handled

### 1. **Null/Missing IDs**
- **Issue**: Some records have `null` or missing `_id` fields (e.g., User record 163)
- **Solution**: Automatically generates new GUIDs for records with null IDs
- **Implementation**: `PreprocessData` helper method

### 2. **Duplicate IDs Within Same File**
- **Issue**: JSON files contain duplicate IDs (e.g., Users.json has duplicate `8027ca65-a281-49a4-b85e-1053a7609efa`)
- **Solution**: Deduplicates by keeping the last occurrence of each ID
- **Implementation**: `PreprocessData` groups by ID and selects `.Last()`

### 3. **Duplicate IDs in HackConfigs**
- **Issue**: HackConfigs.json has only 4 unique IDs out of 92 records
- **Solution**: Same deduplication strategy as above
- **Result**: Successfully loads 4 unique configs

### 4. **Duplicate Transactions Across Accounts**
- **Issue**: 229 out of 231 unique transactions appear in multiple accounts
- **Solution**: Global transaction deduplication across all accounts
- **Implementation**: Uses `HashSet<string>` to track seen transaction IDs
- **Result**: Each transaction is attached to only one account (first occurrence)

### 5. **Null Required Fields**
- **Issue**: Required fields like `Surname` and `Id` have null values
- **Solution**: Made fields nullable in models (`string?`)
- **Affected Models**: `UserPublic.Id`, `UserPublic.Surname`

### 6. **Type Conversion Issues**
- **Issue**: Boolean fields receive non-boolean JSON values
- **Solution**: `FlexibleBooleanConverter` handles:
  - Strings: "true", "false", "1", "0", "yes", "no"
  - Numbers: 1, 0
  - Booleans: true, false
- **Applied To**: `ObscurableInfo.IsRevealed`

### 7. **Array Structure Issues**
- **Issue**: Conversation participants stored as nested arrays `[["user1", "user2"], ["user3", "user4"]]`
- **Solution**: `FlexibleStringListConverter` recursively flattens nested arrays
- **Result**: `["user1", "user2", "user3", "user4"]`

### 8. **MongoDB `_id` Field Mapping**
- **Issue**: JSON uses `_id` but models use `Id`
- **Solution**: Added `[JsonPropertyName("_id")]` attribute to all model `Id` properties
- **Affected**: All 16 models with ID fields

### 9. **Case Sensitivity**
- **Issue**: JSON has mixed PascalCase and camelCase properties
- **Solution**: Set `PropertyNameCaseInsensitive = true` in JSON options

## Files Modified

### Models
- **All models with Id field** (16 files): Added `[JsonPropertyName("_id")]` and using statement
- `UserPublic.cs`: Made `Id` and `Surname` nullable
- `Account.cs`: Made `OwnerId` nullable
- `Gig.cs`: Made `AuthorId` nullable
- `ObscuredCodesMap.cs`: Made `ExpectedRevealCode` nullable
- `ObscurableInfo.cs`: Added `FlexibleBooleanConverter` to `IsRevealed`
- `Conversation.cs`: Added `FlexibleStringListConverter` to `Participants` and `AnonymizedUsers`

### Controllers
- `DataLoadController.cs`:
  - Added `PreprocessData<T>` helper method
  - Applied preprocessing to all 12 load endpoints
  - Added special transaction deduplication for Accounts endpoint

### Data Layer
- `FlexibleJsonConverters.cs`: New file with 3 converters
  - `FlexibleBooleanConverter`: Handles various boolean representations
  - `FlexibleStringConverter`: Converts null to empty string
  - `FlexibleStringArrayConverter`: Skips objects in string arrays
  - `FlexibleStringListConverter`: Flattens nested arrays to List<string>

### Configuration
- `Program.cs`: 
  - Added custom JSON converters registration
  - Changed to `PropertyNameCaseInsensitive`
  - Disabled automatic database seeding

## Data Loading Results

```json
{
    "auths": 195,
    "users": 200,
    "accounts": 225,
    "gigs": 259,
    "networks": 7,
    "subnetworks": 27,
    "hackConfigs": 4,
    "programCodes": 99,
    "obscuredCodes": 477,
    "conversations": 585,
    "messages": 5015,
    "anonymizedUsers": 1,
    "logs": 1,
    "transactions": 231
}
```

**All data types now load successfully!**

## Usage

```bash
# Load all data
./scripts/load-data.sh

# Or load individual types via API
curl -X POST http://localhost:8080/api/DataLoad/load-users \
  -H "Content-Type: application/json" \
  -d @./data/mongo/Users.json
```

## Logging

The data loader logs warnings for:
- Generated IDs for null records
- Duplicate IDs found and deduplicated
- Skipped duplicate transactions

Check backend logs for details:
```bash
docker logs giger-backend-1
```
