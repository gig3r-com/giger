1. Build DatabaseSerializer using dotnet
    dotnet build DatabaseSerializer.csproj
    
2. Run 'DatabaseSerializer.exe - Shortcut' or \backendDotnet\DatabaseSerializer\bin\Debug\net8.0\DatabaseSerializer.exe

3. Output of the program can be found in \backendDotnet\DatabaseSerializer\bin
The ModelsExample directory contains JSONs with example data. It can be imported into MongoDb. 
Each file name matches database table.
The ModelsTypes directory contains information about types of the fields (in case it's needed to populate extra data manually).