using MongoDB.Bson;

namespace Giger.SerializededModels.Obscured
{
    public class ObscuredCodesMap
    {
        public Models.Obscured.ObscuredCodesMap[] CodesMapTable { get; set; }

        public ObscuredCodesMap()
        {
            CodesMapTable = [
                new Models.Obscured.ObscuredCodesMap()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    ObscurableId = "661737df07174e02083a9ef5",
                    ExpectedRevealCode = "q12we34r",
                    IsUsed = false,
                },
                new Models.Obscured.ObscuredCodesMap()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    ObscurableId = "2",
                    ExpectedRevealCode = "code1",
                    IsUsed = false,
                },
                new Models.Obscured.ObscuredCodesMap()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    ObscurableId = "2",
                    ExpectedRevealCode = "code2",
                    IsUsed = false,
                }
            ];
        }
    }
}