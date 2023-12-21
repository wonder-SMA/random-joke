import React, { FC, SVGProps } from "react";
import classNames from "classnames";
import "./upload-indicator.scss";

interface UploadIndicatorProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

const UploadIndicator: FC<UploadIndicatorProps> = ({
  className = "",
  ...props
}) => {
  const uploadIndicatorClass = classNames({
    "upload-indicator": true,
    [className]: className,
  });

  return (
    <div className={uploadIndicatorClass}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 880.000000 1280.000000"
        preserveAspectRatio="xMidYMid meet"
        className="upload-indicator__image"
        {...props}
      >
        <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)">
          <path
            d="M37 12538 c12 -811 95 -1332 310 -1928 357 -993 1025 -1875 2139
              -2827 270 -230 748 -607 1197 -943 142 -106 175 -136 165 -145 -7 -7 -103 -81
              -213 -166 -834 -640 -1430 -1175 -1911 -1714 -1003 -1126 -1551 -2346 -1689
              -3760 -23 -241 -35 -511 -35 -797 l0 -258 4400 0 4400 0 -5 307 c-9 510 -30
              801 -81 1145 -172 1162 -640 2199 -1423 3152 -505 616 -1136 1202 -2066 1921
              -122 93 -221 175 -221 180 0 6 111 93 246 195 730 551 1177 920 1591 1316
              1018 972 1601 1941 1840 3057 83 390 119 767 119 1248 l0 279 -4384 0 -4383 0
              4 -262z m8073 -462 c0 -55 -26 -290 -45 -416 -130 -828 -473 -1567 -1059
              -2280 -86 -104 -264 -306 -299 -339 -40 -36 -608 -220 -1027 -331 -897 -240
              -1538 -257 -2340 -64 -292 70 -731 209 -1092 346 l-107 41 -104 116 c-622 693
              -991 1353 -1182 2115 -63 253 -125 647 -125 802 l0 54 3690 0 3690 0 0 -44z
              m-3597 -5858 c507 -383 940 -735 1297 -1052 180 -159 648 -628 789 -791 690
              -791 1118 -1585 1341 -2488 28 -115 49 -211 46 -214 -2 -3 -100 76 -218 174
              -793 666 -1366 1116 -1763 1385 -1225 831 -1932 834 -3160 13 -416 -278 -999
              -732 -1827 -1422 -115 -95 -208 -170 -208 -165 0 37 106 422 165 597 382 1145
              1123 2137 2377 3182 294 245 1057 843 1075 843 2 0 41 -28 86 -62z"
          />
        </g>
      </svg>
    </div>
  );
};

export default UploadIndicator;
