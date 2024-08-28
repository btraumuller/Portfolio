import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        dmSans:['var(--font-dm-sans)'],
      },
      animatedBackgroundade: {
        "background": "linear-gradient(90deg, #000, transparent 30%, transparent 70%, #000)"
      },
      borderCard:{
        "border":"1px solid #000"
      },
      
      keyframes: {
        loop: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        aboutImage:{
          'to' : {transform: 'translateX(0)'},
        },
        aboutDescription:{
          'to':{
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        header:{
          '0%' :{
            background:'transparent',
            padding:'1rem 0',
          },
          '100%' :{
            background:'#002d72',
            padding:'0'
          }
        }
      },
      animation:{
        loop: 'loop linear infinite var(--duration) var(--direction) ',
        aboutImage:'aboutImage linear forwards',
        aboutDescription:'aboutDescription linear forwards',
        header: 'header linear .1s forwards'
      },
    },
  },
  plugins: [],
};
export default config;
