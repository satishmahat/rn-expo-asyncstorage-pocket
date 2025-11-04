import { create } from 'twrnc';

const tw = create({
  theme: {
    extend: {
      fontFamily: {
        syne: 'Syne-Regular',
        syneMedium: 'Syne-Medium',
        syneSemiBold: 'Syne-SemiBold',
        syneBold: 'Syne-Bold',
        syneExtraBold: 'Syne-ExtraBold',
      },
    },
  },
});

export default tw;

