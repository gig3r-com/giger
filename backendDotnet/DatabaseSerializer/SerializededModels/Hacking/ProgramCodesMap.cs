using MongoDB.Bson;

namespace Giger.SerializededModels.Hacking
{
    internal class ProgramCodesMap
    {
        public Models.Hacking.ProgramCodes[] CodesMapTable { get; set; }

        public ProgramCodesMap()
        {
            CodesMapTable = [
                new Models.Hacking.ProgramCodes()
                {
                    Id = Guid.NewGuid().ToString(),
                    ProgramCode = "q12we34r",
                    IsUsed = false,
                },
                new Models.Hacking.ProgramCodes()
                {
                    Id = Guid.NewGuid().ToString(),
                    ProgramCode = "q12we34r",
                    IsUsed = false,
                }
            ];
        }
    }
}
