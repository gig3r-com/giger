namespace Giger.Models.User.Stats
{
    public struct CyberwareLevel
    {
        public CyberwareLevel(int i)
        {
            Stat = (short)i;
        }

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

        public static implicit operator int(CyberwareLevel cl) => cl.Stat;
        public static implicit operator CyberwareLevel(int i) => new (i);
    }
}
