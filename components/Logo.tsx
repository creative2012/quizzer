import React from "react";

interface LogoProps {
  color: string;
  display?: string;
  copyRight: boolean;
}
const Logo: React.FC<LogoProps> = ({ color, display, copyRight }) => {
  return (
    <div className={`${display} z-100`}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 1002.000000 324.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,324.000000) scale(0.100000,-0.100000)"
          fill={color}
          stroke="none"
        >
          <path
            d="M884 2637 l7 -267 -50 0 -51 0 0 230 0 230 -80 0 -80 0 0 -230 0
-230 -45 0 -45 0 0 260 0 260 -90 0 -90 0 0 -372 0 -373 350 0 350 0 0 373 0
372 -44 0 c-24 0 -65 3 -91 7 l-48 6 7 -266z"
          />
          <path
            d="M1610 2860 c-96 -4 -175 -7 -175 -8 0 -1 0 -254 0 -562 l0 -560 320
0 c176 0 352 5 390 10 174 25 284 72 379 160 110 104 159 228 159 405 -1 352
-186 520 -610 555 -131 10 -171 10 -463 0z m556 -323 c80 -42 120 -140 111
-268 -5 -80 -30 -152 -64 -181 -41 -37 -100 -48 -249 -48 l-144 0 0 254 0 255
23 4 c12 3 83 4 157 3 104 -1 142 -6 166 -19z"
          />
          <path
            d="M3087 2843 c-7 -12 -427 -1101 -427 -1107 0 -4 87 -6 193 -6 l193 0
18 58 c10 31 27 81 38 110 l19 52 247 0 247 0 39 -110 38 -110 200 0 c156 0
199 3 195 13 -2 6 -100 258 -217 560 l-213 547 -283 0 c-156 0 -285 -3 -287
-7z m360 -439 c40 -108 73 -200 73 -205 0 -5 -70 -9 -156 -9 -121 0 -155 3
-152 13 112 300 153 406 156 402 3 -3 38 -93 79 -201z"
          />
          <path
            d="M4080 2690 l0 -160 235 0 235 0 0 -400 0 -400 195 0 195 0 0 400 0
400 235 0 235 0 0 160 0 160 -665 0 -665 0 0 -160z"
          />
          <path
            d="M5535 2290 l0 -560 598 0 597 0 1 93 c0 50 4 118 8 150 l7 58 -130
-5 c-72 -3 -263 -8 -423 -12 l-293 -6 0 81 0 81 360 0 360 0 0 129 0 129 -360
-6 -360 -5 0 77 0 76 415 0 415 0 0 140 0 140 -597 0 -598 0 0 -560z"
          />
          <path
            d="M360 1950 l0 -109 133 -3 132 -3 0 -175 0 -175 -132 -3 -133 -3 0
-109 0 -110 350 0 350 0 0 110 0 110 -130 0 -130 0 0 180 0 180 130 0 130 0 0
110 0 110 -350 0 -350 0 0 -110z"
          />
          <path
            d="M3134 1514 c-306 -51 -474 -251 -474 -564 0 -289 142 -481 411 -557
53 -15 102 -18 279 -18 198 0 221 2 290 23 212 67 331 187 376 378 21 90 20
268 -1 349 -44 169 -151 289 -315 353 -127 50 -387 66 -566 36z m373 -320
c131 -36 194 -184 148 -342 -35 -117 -135 -172 -313 -172 -137 0 -244 46 -284
123 -26 51 -36 180 -19 245 15 56 71 116 126 137 94 36 234 40 342 9z"
          />
          <path
            d="M7475 1516 c-155 -31 -250 -80 -334 -172 -193 -211 -187 -626 13
-826 103 -103 223 -148 391 -148 202 0 345 73 414 211 35 70 34 73 52 -93 l12
-108 138 0 139 0 0 320 0 320 -330 0 -330 0 0 -125 0 -125 146 0 c132 0 145
-2 133 -16 -32 -38 -141 -74 -229 -74 -121 0 -216 40 -265 111 -71 101 -60
265 23 352 55 58 96 72 217 72 61 0 128 -6 150 -12 35 -11 111 -52 155 -84 12
-8 48 6 163 67 81 42 147 81 147 86 0 24 -125 129 -197 166 -134 69 -196 83
-378 88 -110 2 -182 -1 -230 -10z"
          />
          <path
            d="M1505 940 l0 -560 536 0 537 0 6 88 c3 48 11 120 16 161 6 41 9 75 8
76 -2 1 -115 -1 -253 -6 -137 -4 -303 -8 -367 -8 l-118 -1 0 405 0 405 -183 0
-182 0 0 -560z"
          />
          <path
            d="M4160 1151 c0 -191 4 -370 9 -397 28 -144 105 -258 211 -311 117 -59
170 -68 410 -68 177 0 226 3 278 18 193 55 309 165 368 347 15 47 18 106 22
408 l4 352 -196 0 -195 0 -3 -354 c-3 -405 0 -389 -94 -436 -41 -21 -66 -26
-156 -28 -170 -6 -250 33 -269 130 -4 24 -8 188 -9 366 l0 322 -190 0 -190 0
0 -349z"
          />
          <path
            d="M5585 940 l0 -560 197 0 197 0 -4 92 c-9 158 -26 730 -23 733 2 2 86
-183 187 -411 l184 -414 276 0 276 0 0 560 0 560 -189 0 -189 0 6 -202 c15
-455 17 -653 8 -633 -5 11 -88 202 -185 425 l-175 405 -283 3 -283 2 0 -560z"
          />
          <path
            d="M8425 940 l0 -560 598 0 597 0 0 98 c0 53 3 121 7 150 l6 54 -124 -6
c-68 -3 -260 -8 -426 -12 l-303 -6 0 81 0 81 365 0 365 0 0 129 0 129 -365 -6
-365 -5 0 77 0 76 420 0 420 0 0 140 0 140 -597 0 -598 0 0 -560z"
          />
          <path
            d="M360 765 l0 -415 103 0 102 0 -3 145 -4 145 251 0 251 0 0 125 0 125
-251 0 -251 0 4 145 3 145 -102 0 -103 0 0 -415z"
          />
        </g>
      </svg>
      <div className={` ${copyRight ? 'visible' : 'invisible'} absolute left-2 text-xs`}>&copy; The Date Lounge 2023</div>
    </div>
  );
};

export default Logo;
