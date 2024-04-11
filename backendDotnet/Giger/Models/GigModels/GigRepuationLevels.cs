namespace Giger.Models.GigModels
{
    public struct GigRepuationLevels
    {
        private const short MINVALUE = 0;
        private const short MAXVALUE = 5;

        private short _level;
        public short Level
        {
            get
            {
                return _level;
            }

            set
            {
                if (value < MINVALUE)
                {
                    _level = MINVALUE;
                }
                if (value > MAXVALUE)
                {
                    _level = MAXVALUE;
                }
            }
        }
    }
}
