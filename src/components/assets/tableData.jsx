import kenmotsu from "../assets/kenmotsu.JPG";
import taguchi from "../assets/taguchi.jpg";
import katahira from "../assets/katahira.JPG";

export const data = [
  {
    id: "1",
    name: "田口真人",
    mail: "taguchimakoto@cit.com",
    expression: {
      angry: 0.000011405189070501365,
      disgusted: 0.000004078576239407994,
      fearful: 4.2147638623646344e-7,
      happy: 0.0000010811368156282697,
      neutral: 0.9999457597732544,
      sad: 0.0000016456012872367864,
      surprised: 0.00002731213862716686,
    },
    // point: "1",
    image: taguchi,
  },
  {
    id: "2",
    name: "片平純太郎",
    mail: "katahirajunntarou@cit.com",
    // point: "1",
    expression: {
      angry: 0.06815319508314133,
      disgusted: 0.03415417671203613,
      fearful: 0.000003070120328629855,
      happy: 0.07406488806009293,
      neutral: 0.8181563019752502,
      sad: 0.005165013950318098,
      surprised: 0.0003034626424778253,
    },
    image: katahira,
  },
  {
    id: "3",
    name: "剣持祥希",
    mail: "kennmotsusyouki@cit.com",
    // point: "10",
    expression: {
      angry: 0.000011405189070501365,
      disgusted: 0.000004078576239407994,
      fearful: 4.2147638623646344e-7,
      happy: 0.9997716546058655,
      neutral: 0.00019080386846326292,
      sad: 0.0000061242176343512256,
      surprised: 0.000015435425666510127,
    },
    image: kenmotsu,
  },
];