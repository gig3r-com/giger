namespace Giger.Models.User.Stats
{
    public struct CyberwareLevel
    {
        private const short MINVALUE = 0;
        private const short MAXVALUE = 15;

        private short _stat;
        public short Stat
        {
            get
            {
                return _stat;
            }

            set
            {
                if (value < MINVALUE)
                {
                    _stat = MINVALUE;
                }
                if (value > MAXVALUE)
                {
                    _stat = MAXVALUE;
                }
            }
        }
    }
}
