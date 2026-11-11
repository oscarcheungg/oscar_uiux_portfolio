/* The strokes of 張熙宇 in public/home/signature.png, in writing order:
   centre lines traced from the artwork (thinned to one pixel, split at
   junctions, joined where a line carries straight on, ordered by character,
   then part — 弓 before 長; 臣, 巳, then the dots of 灬 — then top to bottom
   and left to right). Coordinates are the artwork's own pixels. The
   signature draws these, in order, as a mask over the artwork, so the real
   ink appears along each stroke as if being written. */

export const SIGNATURE_SIZE = { width: 2170, height: 725 };

/* Ink thickness in artwork pixels; the mask brush is a bit wider so it
   covers each stroke's edges. */
export const SIGNATURE_THICKNESS = 24.4;

export const SIGNATURE_STROKES: { d: string; length: number }[] = [
  { d: 'M543.3 253.3 L570 240 L603.3 233.3', length: 68.3 },
  { d: 'M606.7 236.7 L600 256.7', length: 22.8 },
  { d: 'M583.3 280 L570 293.3 L563.3 320', length: 48.3 },
  { d: 'M540 330 L560 326.7', length: 21.4 },
  { d: 'M563.3 346.7 L550 376.7', length: 35.5 },
  { d: 'M553.3 380 L590 380 L600 396.7 L600 436.7 L583.3 476.7 L570 493.3', length: 166 },
  { d: 'M443.3 506.7 L440 533.3', length: 28 },
  { d: 'M453.3 546.7 L463.3 553.3 L486.7 553.3 L513.3 543.3', length: 66.9 },
  { d: 'M710 210 L726.7 210 L736.7 200 L756.7 190 L790 180', length: 91.2 },
  { d: 'M730 213.3 L726.7 233.3 L716.7 253.3 L716.7 266.7 L710 273.3 L706.7 323.3 L700 326.7 L700 343.3 L696.7 346.7 L703.3 376.7', length: 181.3 },
  { d: 'M720 270 L750 263.3', length: 32.8 },
  { d: 'M713.3 290 L723.3 293.3', length: 11.4 },
  { d: 'M726.7 296.7 L723.3 310', length: 14.7 },
  { d: 'M726.7 313.3 L740 310', length: 14.7 },
  { d: 'M706.7 376.7 L733.3 370 L796.7 343.3 L806.7 343.3 L820 336.7 L836.7 336.7', length: 144.8 },
  { d: 'M603.3 416.7 L630 416.7 L666.7 400 L683.3 400', length: 86.9 },
  { d: 'M686.7 403.3 L686.7 423.3 L676.7 450 L666.7 513.3 L673.3 526.7 L693.3 523.3', length: 154.6 },
  { d: 'M806.7 403.3 L830 383.3', length: 33.6 },
  { d: 'M780 423.3 L753.3 453.3 L753.3 460 L716.7 500', length: 102.1 },
  { d: 'M723.3 440 L726.7 436.7 L753.3 436.7 L770 446.7 L796.7 453.3', length: 80.8 },
  { d: 'M846.7 473.3 L880 486.7', length: 38.9 },
  { d: 'M993.3 256.7 L1010 256.7 L1026.7 243.3 L1053.3 230 L1070 230 L1076.7 220 L1100 210', length: 127.1 },
  { d: 'M1073.3 233.3 L1070 276.7 L1060 290', length: 62.2 },
  { d: 'M1013.3 260 L1013.3 276.7 L1000 306.7 L993.3 340 L993.3 363.3 L990 366.7 L993.3 400 L996.7 403.3 L1020 403.3 L1053.3 390 L1066.7 376.7 L1110 366.7', length: 284.3 },
  { d: 'M1043.3 300 L1040 303.3 L1040 333.3', length: 34.7 },
  { d: 'M1090 296.7 L1086.7 313.3 L1066.7 336.7 L1066.7 370 L1063.3 373.3', length: 87.7 },
  { d: 'M1043.3 336.7 L1063.3 336.7', length: 20 },
  { d: 'M1166.7 243.3 L1203.3 223.3 L1226.7 220', length: 69.7 },
  { d: 'M1230 223.3 L1226.7 243.3 L1206.7 280', length: 65.1 },
  { d: 'M1163.3 250 L1163.3 290 L1156.7 310 L1156.7 346.7 L1160 356.7 L1170 366.7 L1186.7 373.3 L1220 373.3 L1263.3 360 L1280 346.7 L1273.3 333.3 L1273.3 320', length: 277.6 },
  { d: 'M1163.3 296.7 L1183.3 296.7 L1186.7 293.3', length: 24.7 },
  { d: 'M993.3 483.3 L973.3 510', length: 35 },
  { d: 'M1086.7 470 L1096.7 476.7', length: 12.8 },
  { d: 'M1166.7 450 L1186.7 466.7', length: 26.9 },
  { d: 'M1280 450 L1290 456.7', length: 12.8 },
  { d: 'M1306.7 466.7 L1320 483.3', length: 22.2 },
  { d: 'M1543.3 183.3 L1546.7 193.3', length: 11.4 },
  { d: 'M1420 293.3 L1430 293.3 L1506.7 256.7 L1570 236.7', length: 172.3 },
  { d: 'M1586.7 230 L1630 220 L1660 220 L1670 226.7 L1670 233.3', length: 96.9 },
  { d: 'M1420 276.7 L1416.7 290', length: 14.7 },
  { d: 'M1493.3 340 L1530 326.7 L1546.7 326.7 L1556.7 316.7 L1583.3 310', length: 102.4 },
  { d: 'M1520 400 L1540 393.3 L1556.7 393.3 L1566.7 380 L1590 380 L1633.3 366.7 L1670 366.7 L1673.3 363.3 L1710 363.3 L1713.3 366.7', length: 211.1 },
  { d: 'M1550 330 L1550 340 L1556.7 350 L1556.7 380', length: 52.8 },
  { d: 'M1560 396.7 L1556.7 496.7 L1550 530 L1536.7 560', length: 173 },
  { d: 'M1390 446.7 L1420 440 L1486.7 413.3', length: 110.5 },
  { d: 'M1490 563.3 L1513.3 573.3 L1530 570', length: 45.5 },
];
