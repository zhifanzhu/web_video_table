import './App.css';
import React, { useRef, useEffect } from 'react'
import Select from 'react-select'

const hostname = '45.76.11.163';
const port = 8000;

const options = [
  { value: 'Unfinished', label: 'NotCheck' },
  { value: 'Success', label: 'Success' },
  { value: 'FrankMocap', label: 'FrankMocap' },
  { value: 'ObjMask', label: 'ObjMask' },
  { value: 'CAD', label: 'CAD' },
  { value: 'BadLabel', label: 'BadLabel' },
  { value: 'Unexplained', label: 'Unexplained' },
]

function App(props) {
  const [loaded, setLoaded] = React.useState(false);
  let comments = useRef(null);
  useEffect(() => {
    if (loaded) {
      return;
    }
    Promise.all([
      fetch(`http://${hostname}:${port}/api/get_all_comments`),
    ]).then(resp => Promise.all(resp.map(r => r.json())))
      .then(([df]) => {
        comments.current = df;
        // videos = Object.keys(df);
        setLoaded(true);
      });
  }, []);

  let videos = [
    'P01_01_42788_42839_action.mp4',
    'P01_01_42989_43044_action.mp4',
    'P01_05_2434_2474_action.mp4',
    'P01_05_4282_4319_action.mp4',
    'P01_05_24514_24586_action.mp4',
    'P01_05_33905_34022_action.mp4',
    'P01_05_34050_34176_action.mp4',
    'P01_05_34939_34978_action.mp4',
    'P01_05_73733_73854_action.mp4',
    'P01_05_74548_74613_action.mp4',
    'P01_07_6248_6278_action.mp4',
    'P01_09_2262_2307_action.mp4',
    'P01_09_4733_4774_action.mp4',
    'P01_09_7858_7928_action.mp4',
    'P01_09_9428_9503_action.mp4',
    'P01_09_12833_12912_action.mp4',
    'P01_09_12964_13062_action.mp4',
    'P01_09_12971_13050_action.mp4',
    'P01_09_13068_13119_action.mp4',
    'P01_09_13607_13675_action.mp4',
    'P01_09_13683_13852_action.mp4',
    'P01_09_15331_15444_action.mp4',
    'P01_09_19582_19726_action.mp4',
    'P01_09_19769_19871_action.mp4',
    'P01_09_44519_44565_action.mp4',
    'P01_09_45783_45826_action.mp4',
    'P01_09_46685_46735_action.mp4',
    'P01_09_164732_164832_action.mp4',
    'P01_09_169454_169515_action.mp4',
    'P01_09_170512_170547_action.mp4',
    'P01_09_174153_174187_action.mp4',
    'P01_09_174626_174776_action.mp4',
    'P01_09_176428_176476_action.mp4',
    'P01_09_176890_176920_action.mp4',
    'P01_09_177073_177253_action.mp4',
    'P01_09_187255_187285_action.mp4',
    'P01_09_188383_188483_action.mp4',
    'P01_14_53750_53791_action.mp4',
    'P01_14_59015_59062_action.mp4',
    'P01_103_4335_4372_action.mp4',
    'P01_104_1704_1800_action.mp4',
    'P01_104_2075_2170_action.mp4',
    'P02_01_12741_12883_action.mp4',
    'P02_03_31905_32028_action.mp4',
    'P02_03_32033_32113_action.mp4',
    'P02_03_32262_32297_action.mp4',
    'P02_03_47178_47238_action.mp4',
    'P02_03_72672_72704_action.mp4',
    'P02_07_5124_5158_action.mp4',
    'P02_09_715_755_action.mp4',
    'P02_09_10902_10932_action.mp4',
    'P02_09_17689_17737_action.mp4',
    'P02_09_25809_25881_action.mp4',
    'P02_09_67332_67375_action.mp4',
    'P02_12_15654_15699_action.mp4',
    'P02_12_24419_24580_action.mp4',
    'P02_12_65300_65467_action.mp4',
    'P02_102_9456_9607_action.mp4',
    'P02_102_10251_10415_action.mp4',
    'P02_109_17311_17430_action.mp4',
    'P02_121_10750_10814_action.mp4',
    'P02_121_10980_11010_action.mp4',
    'P02_121_15191_15300_action.mp4',
    'P02_121_15501_15554_action.mp4',
    'P02_121_16575_16625_action.mp4',
    'P02_121_16681_16751_action.mp4',
    'P02_122_27971_28097_action.mp4',
    'P02_122_28609_28645_action.mp4',
    'P02_124_3359_3400_action.mp4',
    'P02_124_3567_3712_action.mp4',
    'P02_124_6626_6734_action.mp4',
    'P02_124_11226_11412_action.mp4',
    'P02_128_4176_4331_action.mp4',
    'P02_130_3291_3342_action.mp4',
    'P02_130_6701_6826_action.mp4',
    'P02_130_6917_6950_action.mp4',
    'P02_130_7076_7123_action.mp4',
    'P02_130_11726_11789_action.mp4',
    'P02_130_15350_15400_action.mp4',
    'P02_130_15405_15564_action.mp4',
    'P02_130_15717_15770_action.mp4',
    'P02_130_29386_29418_action.mp4',
    'P02_130_47301_47376_action.mp4',
    'P02_130_51154_51267_action.mp4',
    'P02_130_51913_51951_action.mp4',
    'P03_04_14986_15020_action.mp4',
    'P03_04_43364_43402_action.mp4',
    'P03_04_43441_43478_action.mp4',
    'P03_04_49629_49671_action.mp4',
    'P03_13_1969_2084_action.mp4',
    'P03_24_29846_29884_action.mp4',
    'P03_101_379_467_action.mp4',
    'P03_101_20366_20416_action.mp4',
    'P03_101_20886_20930_action.mp4',
    'P03_113_6427_6587_action.mp4',
    'P03_113_6781_6906_action.mp4',
    'P03_120_5470_5521_action.mp4',
    'P03_120_5572_5619_action.mp4',
    'P03_120_36933_37018_action.mp4',
    'P03_120_37023_37085_action.mp4',
    'P03_120_37309_37345_action.mp4',
    'P03_123_240_333_action.mp4',
    'P03_123_474_509_action.mp4',
    'P03_123_867_984_action.mp4',
    'P03_123_2395_2426_action.mp4',
    'P03_123_3569_3638_action.mp4',
    'P04_02_55765_55819_action.mp4',
    'P04_02_56281_56449_action.mp4',
    'P04_03_40596_40627_action.mp4',
    'P04_06_22209_22327_action.mp4',
    'P04_13_3995_4174_action.mp4',
    'P04_13_10440_10515_action.mp4',
    'P04_24_14030_14073_action.mp4',
    'P04_25_292_388_action.mp4',
    'P04_101_2150_2206_action.mp4',
    'P04_101_9476_9583_action.mp4',
    'P04_109_21775_21924_action.mp4',
    'P04_110_7385_7500_action.mp4',
    'P04_110_10471_10562_action.mp4',
    'P04_110_25385_25503_action.mp4',
    'P04_110_30101_30135_action.mp4',
    'P04_110_30246_30287_action.mp4',
    'P04_110_31309_31375_action.mp4',
    'P04_110_31451_31505_action.mp4',
    'P04_121_19460_19513_action.mp4',
    'P04_121_27062_27120_action.mp4',
    'P04_121_27302_27342_action.mp4',
    'P04_121_27346_27498_action.mp4',
    'P04_121_30234_30264_action.mp4',
    'P04_121_30365_30399_action.mp4',
    'P04_121_37800_37850_action.mp4',
    'P04_121_38204_38255_action.mp4',
    'P04_121_38592_38662_action.mp4',
    'P04_121_39446_39500_action.mp4',
    'P04_121_39629_39692_action.mp4',
    'P04_121_39994_40044_action.mp4',
    'P04_121_41337_41410_action.mp4',
    'P04_121_41420_41471_action.mp4',
    'P04_121_41688_41725_action.mp4',
    'P04_121_42572_42616_action.mp4',
    'P04_121_43201_43233_action.mp4',
    'P04_121_46492_46525_action.mp4',
    'P04_121_47917_48023_action.mp4',
    'P04_121_48132_48217_action.mp4',
    'P04_121_50829_50883_action.mp4',
    'P04_121_51415_51445_action.mp4',
    'P04_121_51688_51730_action.mp4',
    'P04_121_52367_52406_action.mp4',
    'P04_121_53476_53517_action.mp4',
    'P04_121_67451_67491_action.mp4',
    'P04_121_78106_78150_action.mp4',
    'P04_121_78201_78239_action.mp4',
    'P04_121_80157_80225_action.mp4',
    'P05_08_10812_10970_action.mp4',
    'P06_01_2383_2433_action.mp4',
    'P06_05_72533_72570_action.mp4',
    'P06_05_78742_78861_action.mp4',
    'P06_07_48586_48628_action.mp4',
    'P06_14_1066_1137_action.mp4',
    'P06_101_40903_40968_action.mp4',
    'P06_101_45146_45178_action.mp4',
    'P06_101_45771_45906_action.mp4',
    'P06_101_55201_55266_action.mp4',
    'P06_101_84230_84280_action.mp4',
    'P06_101_85466_85550_action.mp4',
    'P06_101_85790_85900_action.mp4',
    'P06_102_919_963_action.mp4',
    'P06_102_8810_8864_action.mp4',
    'P06_102_10007_10075_action.mp4',
    'P06_102_12688_12733_action.mp4',
    'P06_102_21776_21930_action.mp4',
    'P06_102_24971_25063_action.mp4',
    'P06_103_11371_11424_action.mp4',
    'P06_103_11859_11896_action.mp4',
    'P06_103_13385_13464_action.mp4',
    'P06_103_24336_24470_action.mp4',
    'P06_107_2268_2299_action.mp4',
    'P06_107_2320_2423_action.mp4',
    'P06_107_3735_3838_action.mp4',
    'P06_108_17267_17302_action.mp4',
    'P06_108_17307_17407_action.mp4',
    'P06_108_17542_17676_action.mp4',
    'P06_108_29770_29816_action.mp4',
    'P06_108_29835_29966_action.mp4',
    'P06_108_29995_30031_action.mp4',
    'P06_108_30068_30101_action.mp4',
    'P06_108_30119_30283_action.mp4',
    'P07_08_3214_3348_action.mp4',
    'P07_110_5598_5650_action.mp4',
    'P07_110_5655_5727_action.mp4',
    'P07_110_5728_5854_action.mp4',
    'P07_110_5993_6079_action.mp4',
    'P07_110_7509_7600_action.mp4',
    'P08_16_706_761_action.mp4',
    'P08_17_9070_9245_action.mp4',
    'P08_17_13379_13453_action.mp4',
    'P08_17_17418_17508_action.mp4',
    'P08_17_18439_18560_action.mp4',
    'P08_17_33748_33807_action.mp4',
    'P08_21_3466_3523_action.mp4',
    'P08_21_19244_19300_action.mp4',
    'P08_21_23109_23209_action.mp4',
    'P08_21_24597_24763_action.mp4',
    'P08_21_26751_26811_action.mp4',
    'P08_21_32764_32933_action.mp4',
    'P08_21_40790_40906_action.mp4',
    'P08_21_46878_47061_action.mp4',
    'P08_21_58617_58683_action.mp4',
    'P08_21_67674_67763_action.mp4',
    'P08_21_70162_70211_action.mp4',
    'P08_21_72622_72659_action.mp4',
    'P08_21_72727_72758_action.mp4',
    'P08_21_75287_75376_action.mp4',
    'P08_21_77201_77232_action.mp4',
    'P08_21_82956_83010_action.mp4',
    'P08_21_83301_83335_action.mp4',
    'P09_02_9053_9116_action.mp4',
    'P09_02_21364_21532_action.mp4',
    'P09_104_17755_17900_action.mp4',
    'P10_04_18048_18094_action.mp4',
    'P10_04_23617_23747_action.mp4',
    'P10_04_38126_38290_action.mp4',
    'P10_04_41076_41218_action.mp4',
    'P10_04_67143_67251_action.mp4',
    'P10_04_72352_72435_action.mp4',
    'P10_04_72480_72588_action.mp4',
    'P10_04_174201_174238_action.mp4',
    'P10_04_180020_180087_action.mp4',
    'P10_04_187304_187380_action.mp4',
    'P11_103_5271_5328_action.mp4',
    'P11_104_11707_11762_action.mp4',
    'P11_104_30693_30740_action.mp4',
    'P11_104_30794_30831_action.mp4',
    'P11_104_42295_42328_action.mp4',
    'P11_104_42505_42542_action.mp4',
    'P12_02_14748_14870_action.mp4',
    'P12_04_92335_92483_action.mp4',
    'P12_101_21553_21667_action.mp4',
    'P12_101_29876_29996_action.mp4',
    'P15_02_26690_26728_action.mp4',
    'P17_01_2910_2946_action.mp4',
    'P17_01_6395_6546_action.mp4',
    'P18_01_265_302_action.mp4',
    'P18_01_7053_7137_action.mp4',
    'P18_03_19214_19309_action.mp4',
    'P18_06_17041_17090_action.mp4',
    'P18_06_23938_23986_action.mp4',
    'P18_07_2549_2647_action.mp4',
    'P20_03_333_381_action.mp4',
    'P21_01_34080_34230_action.mp4',
    'P22_01_105_146_action.mp4',
    'P22_01_10603_10699_action.mp4',
    'P22_01_12681_12863_action.mp4',
    'P22_01_58739_58824_action.mp4',
    'P22_01_59035_59094_action.mp4',
    'P22_07_71519_71675_action.mp4',
    'P22_07_74630_74716_action.mp4',
    'P22_07_87441_87481_action.mp4',
    'P22_07_90948_91031_action.mp4',
    'P22_107_2612_2719_action.mp4',
    'P22_107_6047_6099_action.mp4',
    'P22_107_20148_20187_action.mp4',
    'P22_117_35446_35492_action.mp4',
    'P23_02_22298_22370_action.mp4',
    'P23_02_38761_38802_action.mp4',
    'P24_05_77641_77700_action.mp4',
    'P24_05_85710_85814_action.mp4',
    'P24_08_58259_58379_action.mp4',
    'P24_09_48418_48481_action.mp4',
    'P24_09_97157_97207_action.mp4',
    'P24_09_105731_105912_action.mp4',
    'P25_09_1000_1031_action.mp4',
    'P25_09_15771_15803_action.mp4',
    'P25_101_2001_2110_action.mp4',
    'P27_101_3674_3717_action.mp4',
    'P27_101_4843_4881_action.mp4',
    'P27_105_12235_12300_action.mp4',
    'P27_105_13063_13097_action.mp4',
    'P27_105_19872_19947_action.mp4',
    'P28_103_1451_1564_action.mp4',
    'P28_103_47001_47126_action.mp4',
    'P28_103_75876_76042_action.mp4',
    'P28_103_76251_76382_action.mp4',
    'P28_103_84151_84250_action.mp4',
    'P28_103_84445_84534_action.mp4',
    'P28_112_11810_11900_action.mp4',
    'P28_112_12292_12476_action.mp4',
    'P30_05_20196_20254_action.mp4',
    'P30_05_45353_45500_action.mp4',
    'P30_05_59664_59768_action.mp4',
    'P30_05_115437_115556_action.mp4',
    'P30_05_124296_124435_action.mp4',
    'P30_05_150678_150735_action.mp4',
    'P30_05_187744_187790_action.mp4',
    'P30_05_188919_188961_action.mp4',
    'P30_07_2412_2444_action.mp4',
    'P30_101_12726_12762_action.mp4',
    'P30_101_12839_12872_action.mp4',
    'P30_107_44029_44092_action.mp4',
    'P30_107_44118_44156_action.mp4',
    'P30_107_47181_47280_action.mp4',
    'P30_107_47388_47422_action.mp4',
    'P30_107_47425_47461_action.mp4',
    'P30_107_51566_51653_action.mp4',
    'P30_107_56048_56098_action.mp4',
    'P30_110_430_480_action.mp4',
    'P30_111_2710_2863_action.mp4',
    'P30_111_4184_4235_action.mp4',
    'P30_111_6236_6278_action.mp4',
    'P30_111_22606_22766_action.mp4',
    'P30_111_34503_34631_action.mp4',
    'P35_109_16634_16762_action.mp4',
    'P35_109_24751_24888_action.mp4',
    'P37_101_8520_8583_action.mp4',
    'P37_101_9838_9950_action.mp4',
    'P37_101_13341_13509_action.mp4',
    'P37_101_16117_16162_action.mp4',
    'P37_101_16185_16303_action.mp4',
    'P37_101_34447_34488_action.mp4',
    'P37_101_61839_61877_action.mp4',
    'P37_101_61882_61913_action.mp4',
    'P37_101_66932_67072_action.mp4',
    'P37_101_74851_74884_action.mp4',
    'P37_102_1876_2000_action.mp4'];


  videos.sort();

  let rows = [];
  let index = 0;
  for (const video of videos) {
    index += 1;
    const src = `./Results-01-28/${video}`;
    let comp = null;
    if (!loaded) {
      comp = <label>Off-Line</label>
    } else {
      comp = <Select options={options}
            defaultValue={options.find(({ value }) => value === comments.current[video])}
            onChange={(e) => {
              comments.current[video] = e.value;
              console.log(comments.current[video]);
              fetch(`http://${hostname}:${port}/api/update_comment`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  video: video,
                  comment: comments.current[video],
                }),
              }).then(resp => resp.json())
                .then(data => {
                  ;
                  // console.log(data);
                }
                );
            }}
          />

    }
    rows.push(
      <tr key={video}>
        <td>{index}</td>
        <td>{video}</td>
        <td>
          <img src={src.replace("_action.mp4", "_input.png")} width={512}/>
        </td>
        <td>
          <video width={468} src={src} controls />
        </td>
        <td>{comp}</td>
      </tr>
    )
  }
  return <table><tbody>{rows}</tbody></table>
}

export default App;
