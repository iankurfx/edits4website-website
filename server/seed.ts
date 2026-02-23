import { storage } from "./storage";

/**
 * GUIDE: MANUALLY ADDING TEMPLATES
 * To add or change templates, edit the 'manualTemplates' array below.
 * Each entry creates one "Box" on the home page with 6 variants.
 */
export async function seedDatabase() {
  const existing = await storage.getCollections();
  if (existing.length > 0) return;

  console.log("Seeding database with CapCut templates...");

  // 50 Boxes (Templates), each with 6 Variants
  const manualTemplates = [
    // --- BOX 1: Tiki Tiki ---
    {
      title: "Tiki Tiki",
      description: "Smooth beat sync with modern glow",
      coverImage: "/templates/tiki.jpg",
      isTrending: true,
      variants: [
        { name: "1 tiki tiki", preview: "https://www.youtube.com/embed/sE91fffMMuo", link: "https://www.capcut.com/tv2/ZSaydGJCW/ TIKI TIKI" },
        { name: "2 tiki tiki", preview: "https://www.youtube.com/embed/-eNvgaAqW2M", link: "https://www.capcut.com/tv2/ZSayRYS3y/ TIKI TIKI - SLOWED" },
        { name: "3 tiki tiki", preview: "https://www.youtube.com/embed/V-a1xxNlakc", link: "https://www.capcut.com/tv2/ZSaydgQyN/ Tiki Tiki Trend" },
        { name: "4 tiki tiki", preview: "https://www.youtube.com/embed/8ctzxI_1jco", link: "https://www.capcut.com/tv2/ZSaydTpVu/ TIKI TIKI" },
        { name: "5 tiki tiki", preview: "https://www.youtube.com/embed/eeA1w_xpqvc", link: "https://www.capcut.com/tv2/ZSayRLKhK/ Tiki - Tiki V2" },
        { name: "6 tiki tiki", preview: "https://www.youtube.com/embed/i-y0qhH4ObQ", link: "https://www.capcut.com/tv2/ZSaydosKB/ TIKI - TIKI TREND" },
        { name: "7 tiki tiki", preview: "https://www.youtube.com/embed/DOG-9RjPCG4", link: "https://www.capcut.com/tv2/ZSayRXHfu/ tiki tiki trend" },
        { name: "8 tiki tiki", preview: "https://www.youtube.com/embed/uMrITyFfYlg", link: "https://www.capcut.com/tv2/ZSayRxtNh/ TIKI TIKI PHONK 2" },
        { name: "9 tiki tiki", preview: "https://www.youtube.com/embed/I3aOj6Xz5kg", link: "https://www.capcut.com/tv2/ZSayRyqvG/ tiki tiki phonk" },
        { name: "10 tiki tiki", preview: "https://www.youtube.com/embed/JGEdQptuwVo", link: "https://www.capcut.com/tv2/ZSayRPGar/ New trend tiki-tiki" },
      ]
    },
    // --- X REMIX ---
    {
      title: "X REMIX",
      description: "Fast transitions with energetic vibe",
      coverImage: "/templates/xremix.jpg",
      isTrending: true,
      isNew: false,
      variants: [
        { name: "1 X REMIX", preview: "https://www.youtube.com/embed/X0vZ1C3Duo8", link: "https://www.capcut.com/tv2/ZSayRWp2w/ X REMIX TREND" },
        { name: "2 X REMIX", preview: "https://www.youtube.com/embed/Qhlk-8EDRv4", link: "https://www.capcut.com/tv2/ZSayRvFdR/ X Remix" },
        { name: "3 X REMIX", preview: "https://www.youtube.com/embed/BkSfRUAuYns", link: "https://www.capcut.com/tv2/ZSay8edT7/ VELOCITY SLOWMO" },
        { name: "4 X REMIX", preview: "https://www.youtube.com/embed/fepD3Jvsx6c", link: "https://www.capcut.com/tv2/ZSay8RCSG/ X REMIX" },
        { name: "5 X REMIX", preview: "https://www.youtube.com/embed/4-hUbKzchQg", link: "https://www.capcut.com/tv2/ZSayR4byK/ X Remix || 4 clips" },
        { name: "6 X REMIX", preview: "https://www.youtube.com/embed/eCqB1Lxmx1c", link: "https://www.capcut.com/tv2/ZSayR7eXv/ y no te voy a negar" },
        { name: "7 X REMIX", preview: "https://www.youtube.com/embed/IR5_2rOuXs0", link: "https://www.capcut.com/template-detail/7465692436073811253?template_id=7465692436073811253&share_token=8430a094-a171-4931-a37f-ccbdc8acbee0&enter_from=template_detail&region=US&language=en&platform=copy_link&is_copy_link=1 X REMIX" },
        { name: "8 X REMIX", preview: "https://www.youtube.com/embed/8apXhF2yC2I", link: "https://www.capcut.com/tv2/ZSayRwWc5/ x remix" },
      ]
    },
    // --- MEJOR QUE YO ---
    {
      title: "mejor que yo",
      description: "Clean cinematic look with soft motion",
      coverImage: "/templates/mejoe.jpg",
      isTrending: false,
      isNew: false,
      variants: [
        { name: "1 mejor que yo", preview: "https://www.youtube.com/embed/aHuZvn3VwwE", link: "https://www.capcut.com/template-detail/default-tool?enter_from=app_share_silent_template" },
        { name: "2 mejor que yo", preview: "https://www.youtube.com/embed/-X7LCWFBSio", link: "https://www.capcut.com/template-detail/default-tool?enter_from=app_share_silent_template" },
        { name: "3 mejor que yo", preview: "https://www.youtube.com/embed/0W6_b65cgCs", link: "https://www.capcut.com/tv2/ZSay8jLdu/ mejor que Yo? soy yo" },
      ]
    },
    // ---GOZALO ---
    {
      title: "GOZALO",
      description: "Dark aesthetic edit with smooth flow",
      coverImage: "/templates/gozalo.jpg",
      isTrending: false,
      isNew: false,
      variants: [
        { name: "1 GOZALO", preview: "https://www.youtube.com/embed/cQsThCIJsCM", link: "https://www.capcut.com/tv2/ZSay8qrST/ GOZALO 2" },
        { name: "2 GOZALO", preview: "https://www.youtube.com/embed/XHg8rYySUMY", link: "https://www.capcut.com/tv2/ZSay8oUYg/ GOZALO PHONK" },
        { name: "3 GOZALO", preview: "https://www.youtube.com/embed/gtBitxZSr4o", link: "https://www.capcut.com/tv2/ZSay8QU2W/ GOZALO - VELOCITY" },
        { name: "4 GOZALO", preview: "https://www.youtube.com/embed/CC_k3ewNXsY", link: "https://www.capcut.com/tv2/ZSay8q7kj/ GOZALO PHONK" },
        { name: "5 GOZALO", preview: "https://www.youtube.com/embed/CZ6vgmkqfqw", link: "https://www.capcut.com/tv2/ZSay8gQJK/ Gozalo" },
        { name: "6 GOZALO", preview: "https://www.youtube.com/embed/7B0bk5fJmAo", link: "https://www.capcut.com/template-detail/7581719126377303349?template_id=7581719126377303349&share_token=cf60593a-4e43-4afe-95ce-d1b48501dc96&enter_from=template_detail&region=US&language=en&platform=copy_link&is_copy_link=1 GOZALO PHONK" },
        { name: "7 GOZALO", preview: "https://www.youtube.com/embed/evJRFEB-IGQ", link: "https://www.capcut.com/tv2/ZSay8TRob/ GOZALO V2" },
        { name: "8 GOZALO", preview: "https://www.youtube.com/embed/1ZPWBJ3jGU0", link: "https://www.capcut.com/tv2/ZSay8WPxe/ GOZALO" },
        { name: "9 GOZALO", preview: "https://www.youtube.com/embed/kyOZziYUFQ8", link: "https://www.capcut.com/tv2/ZSayLfE3s/ GOZALO [1:1]" }
      ]
    },
    // --- BOX 5 CHANEL ---
    {
      title: "CHANEL",
      description: "Neon style transitions with beat drops",
      coverImage: "/templates/chanel.jpg",
      isTrending: false,
      isNew: false,
      variants: [
        { name: "1 CHANEL", preview: "https://www.youtube.com/embed/bo4rVefhpVo", link: "https://www.capcut.com/template-detail/default-tool?enter_from=app_share_silent_template" },
        { name: "2 CHANEL", preview: "https://www.youtube.com/embed/4IS6PGK0_Rg", link: "https://www.capcut.com/tv2/ZSayLdN4D/ Slowmo Chanel Trend" },
        { name: "3 CHANEL", preview: "https://www.youtube.com/embed/yMt9z7vbzHM", link: "https://www.capcut.com/tv2/ZSayLx8bL/ CHANEL - Tyla" },
        { name: "4 CHANEL", preview: "https://www.youtube.com/embed/UstOqVhCxqI", link: "https://www.capcut.com/tv2/ZSayLcCoM/ chanel tyla" },
        { name: "5 CHANEL", preview: "https://www.youtube.com/embed/E9DAYOvyNcI", link: "https://www.capcut.com/tv2/ZSayLxM6e/ CHANEL X SHINY" },
        { name: "6 CHANEL", preview: "https://www.youtube.com/embed/sPT_lygiHEM", link: "https://www.capcut.com/tv2/ZSayLnKSB/ Tyla Chanel" },
        { name: "7 CHANEL", preview: "https://www.youtube.com/embed/HI-u0rvSvoA", link: "https://www.capcut.com/tv2/ZSayLsxgV/ Chanel  Tyla" }
      ]
    },
    // --- BOX 6 MIMOSA ---
    {
      title: "MIMOSA",
      description: "Minimal edit with elegant slow motion",
      coverImage: "/templates/mimosa.jpg",
      isTrending: false,
      isNew: false,
      variants: [
        { name: "1 MIMOSA", preview: "https://www.youtube.com/embed/THV9wTroX2o", link: "https://www.capcut.com/template-detail/default-tool?enter_from=app_share_silent_template" },
        { name: "2 MIMOSA", preview: "https://www.youtube.com/embed/ykzsgb9tXjc", link: "https://www.capcut.com/tv2/ZSayNbgu7/ NO NO NO NO NO" },
        { name: "3 MIMOSA", preview: "https://www.youtube.com/embed/hQJKttgDP1s", link: "https://www.capcut.com/tv2/ZSayN5RhX/ Mimosa 2000" },
        { name: "4 MIMOSA", preview: "https://www.youtube.com/embed/-C8ZOdhWV5s", link: "https://www.capcut.com/tv2/ZSayNs7RY/ Slowmo Mimosa 2000" },
        { name: "5 MIMOSA", preview: "https://www.youtube.com/embed/26bHtB3mJ6c", link: "https://www.capcut.com/tv2/ZSayN4P9M/ MIMOSA 2000" },
        { name: "6 MIMOSA", preview: "https://www.youtube.com/embed/5RncEHP6Lfg", link: "https://www.capcut.com/tv2/ZSayN7BmK/ Mimosa 2000" },
        { name: "7 MIMOSA", preview: "https://www.youtube.com/embed/lCAyQ9tVgkg", link: "https://www.capcut.com/tv2/ZSayFd7jp/ Mimosa 2000 v2" },
        { name: "8 MIMOSA", preview: "https://www.youtube.com/embed/AoPkr5y0LXs", link: "https://www.capcut.com/tv2/ZSayFdUBE/ Mimosa 2000" }
      ]
    },
    // --- BOX 7 fendi ---
    {
      title: "Fendi",
      description: "Glitch effects synced perfectly to beat",
      coverImage: "/templates/fendi.jpg",
      isTrending: false,
      isNew: false,
      variants: [
        { name: "1 FENDI", preview: "https://www.youtube.com/embed/oBNwIy4YSJ0", link: "https://www.capcut.com/tv2/ZSayNcPEE/ FENDI" },
        { name: "2 FENDI", preview: "https://www.youtube.com/embed/AMf8xruXQMM", link: "https://www.capcut.com/tv2/ZSayFegyV/ FENDI FENDI EDIT" },
        { name: "3 FENDI", preview: "https://www.youtube.com/embed/3ZMYL9hGD1k", link: "https://www.capcut.com/tv2/ZSayFbjQt/ Fendi" },
        { name: "4 FENDI", preview: "https://www.youtube.com/embed/McrNtNMEBic", link: "https://www.capcut.com/template-detail/7565406014296591669?template_id=7565406014296591669&share_token=69eeb438-108a-4f0f-82e6-8243d91649cb&enter_from=template_detail&region=US&language=en&platform=copy_link&is_copy_link=1 Fendi 2" },
        { name: "5 FENDI", preview: "https://www.youtube.com/embed/v84tkiwCums", link: "https://www.capcut.com/tv2/ZSayFDxVg/ FENDI FENDI FENDI" },
        { name: "6 FENDI", preview: "https://www.youtube.com/embed/5PwFV3DoZmE", link: "https://www.capcut.com/tv2/ZSayFkbmx/ FENDI TREND" }
      ]
    },
    // --- BOX 8 APPROVED ---
    {
      title: "APPROVED",
      description: "Urban style edit with fast cuts",
      coverImage: "/templates/approved.jpg",
      isTrending: false,
      isNew: false,
      variants: [
        { name: "1 APPROVED", preview: "https://www.youtube.com/embed/qIMpZEADD8E", link: "https://www.capcut.com/tv2/ZSayYfVco/ Approved!!" },
        { name: "2 APPROVED", preview: "https://www.youtube.com/embed/NH0VpB7NjvI", link: "https://www.capcut.com/tv2/ZSayYkkrq/ Approved" },
        { name: "3 APPROVED", preview: "https://www.youtube.com/embed/WkgZPcMiMHU", link: "https://www.capcut.com/tv2/ZSayYhqGj/ APPROVED" },
        { name: "4 APPROVED", preview: "https://www.youtube.com/embed/664tpNd72JI", link: "https://www.capcut.com/tv2/ZSayYAYtT/ approved approved" },
        { name: "5 APPROVED", preview: "https://www.youtube.com/embed/qOH8MHtARgc", link: "https://www.capcut.com/tv2/ZSayYCuQa/ aproved template" },
        { name: "6 APPROVED", preview: "https://www.youtube.com/embed/iAZRRHEr_ic", link: "https://www.capcut.com/tv2/ZSayYDAJj/ APPROVED TREND" }
      ]
    },
    // --- BOX 9 CONFESS YOUR LOVE ---
    {
      title: "CONFESS YOUR LOVE",
      description: "Retro themed transitions with smooth rhythm",
      coverImage: "/templates/confess your love.jpg",
      isTrending: false,
      isNew: false,
      variants: [
        { name: "1 CONFESS YOUR LOVE", preview: "https://www.youtube.com/embed/ZpG1cKc4-3A", link: "https://www.capcut.com/tv2/ZSay2esBB/ Confess Your Love" },
        { name: "2 CONFESS YOUR LOVE", preview: "https://www.youtube.com/embed/Ntx0CjDn0lc", link: "https://www.capcut.com/tv2/ZSayYWqSQ/ CONFESS YOUR LOVE" },
        { name: "3 CONFESS YOUR LOVE", preview: "https://www.youtube.com/embed/Bd-ym_X52O4", link: "https://www.capcut.com/tv2/ZSayYcHHX/ confess your love" },
        { name: "4 CONFESS YOUR LOVE", preview: "https://www.youtube.com/embed/CK4bJJPW31w", link: "https://www.capcut.com/tv2/ZSay2amg1/ CONFES YOURLOVE FUNK" },
        { name: "5 CONFESS YOUR LOVE", preview: "https://www.youtube.com/embed/fA5qB4TATSc", link: "https://www.capcut.com/tv2/ZSay2DXPD/ 8 CLIP" },
        { name: "6 CONFESS YOUR LOVE", preview: "https://www.youtube.com/embed/wITkPoXqZ8o", link: "https://www.capcut.com/tv2/ZSay2yfrd/ confess your love" },
        { name: "7 CONFESS YOUR LOVE", preview: "https://www.youtube.com/embed/zONjVpZ5a5o", link: "https://www.capcut.com/tv2/ZSay2yk5q/ CONFESS YOUR LOVE" },
        { name: "8 CONFESS YOUR LOVE", preview: "https://www.youtube.com/embed/Epw8MprP5jI", link: "https://www.capcut.com/tv2/ZSay2B8kP/ Confesso your love" },
        { name: "9 CONFESS YOUR LOVE", preview: "https://www.youtube.com/embed/lKw_yII7YNM", link: "https://www.capcut.com/tv2/ZSay2jwyT/ CONFESS YOUR LOVE" }
      ]
    },
    // --- BOX 10 BE MY FRIEND  ---
    {
      title: "Be my friend",
      description: "Soft blur effects with cinematic feel",
      coverImage: "/templates/be.jpg",
      isTrending: false,
      isNew: false,
      variants: [
        { name: "1 Be my friend", preview: "https://www.youtube.com/embed/-LyigZBIEec", link: "https://www.capcut.com/tv2/ZSmdTjBr8/" },
        { name: "2 Be my friend", preview: "https://www.youtube.com/embed/ePpUnJVaRjI", link: "https://www.capcut.com/tv2/ZSmdTtcp5/" },
        { name: "3 Be my friend", preview: "https://www.youtube.com/embed/pJ7mPXBS9No", link: "https://www.capcut.com/tv2/ZSmdTW54M/" },
        { name: "4 Be my friend", preview: "https://www.youtube.com/embed/OqkPWw0JuuM", link: "https://www.capcut.com/tv2/ZSmdTnuHg/" },
        { name: "5 Be my friend", preview: "https://www.youtube.com/embed/j07R79vcadk", link: "https://www.capcut.com/tv2/ZSmdwdLKS/" },
        { name: "6 Be my friend", preview: "https://www.youtube.com/embed/4-PIbzicsyE", link: "https://www.capcut.com/tv2/ZSmdTsNgs/" },
        { name: "7 Be my friend", preview: "https://www.youtube.com/embed/QZ0nzwqN1rE", link: "https://www.capcut.com/tv2/ZSmdTCMQQ/" },
        { name: "8 Be my friend", preview: "https://www.youtube.com/embed/UkbSsmyZth4", link: "https://www.capcut.com/tv2/ZSmdTbgos/" }
      ]
    },
    // --- BOX 11 Dil laga na mana tha ---
    {
      title: "Dil laga na mana tha",
      description: "High energy edit with sharp transitions",
      coverImage: "/templates/dil.jpg",
      isTrending: false,
      isNew: false,
      variants: [
        { name: "1 Dil laga na mana tha", preview: "https://www.youtube.com/embed/FgOaYppHAmA", link: "https://www.capcut.com/tv2/ZSmdTq1Y8/" },
        { name: "2 Dil laga na mana tha", preview: "https://www.youtube.com/embed/2dlbc6F_4HU", link: "https://www.capcut.com/tv2/ZSmdTKxw4/" },
        { name: "3 Dil laga na mana tha", preview: "https://www.youtube.com/embed/h1IW0pp2sz0", link: "https://www.capcut.com/template-detail/7598644994282491153?template_id=7598644994282491153&share_token=974285e7-761c-4476-aac9-d0d9068e293e&enter_from=template_detail&region=US&language=en&platform=copy_link&is_copy_link=1" },
        { name: "4 Dil laga na mana tha", preview: "https://www.youtube.com/embed/ZA2vHkbgaz0", link: "https://www.capcut.com/template-detail/7598824110940015925?template_id=7598824110940015925&share_token=a9dc6eca-50de-4b4d-afc7-7a67940c21a5&enter_from=template_detail&region=US&language=en&platform=copy_link&is_copy_link=1" },
        { name: "5 Dil laga na mana tha", preview: "https://www.youtube.com/embed/Grk2yb6z4UU", link: "https://www.capcut.com/tv2/ZSmdTWH82/" },
        { name: "6 Dil laga na mana tha", preview: "https://www.youtube.com/embed/Uac2pndM44Y", link: "https://www.capcut.com/template-detail/7600739225729862929?template_id=7600739225729862929&share_token=464ec2bf-ee75-4760-b583-9d3de7ed7f65&enter_from=template_detail&region=US&language=en&platform=copy_link&is_copy_link=1 " },
        { name: "7 Dil laga na mana tha", preview: "https://www.youtube.com/embed/Ibu9ycH1hDc", link: "https://www.capcut.com/tv2/ZSmdwkffW/" },
        { name: "8 Dil laga na mana tha", preview: "https://www.youtube.com/embed/wpjeeYGIyHw", link: "https://www.capcut.com/tv2/ZSmdwdnNf/" }
      ]
    },
    // --- BOX 12 Round fight ---
    {
      title: "Round fight",
      description: "Moody aesthetic with smooth beat sync",
      coverImage: "/templates/round.jpg",
      isTrending: false,
      isNew: false,
      variants: [
        { name: "1 Round fight", preview: "https://www.youtube.com/embed/AKlZvK3a4W0", link: "https://www.capcut.com/template-detail/default-tool?enter_from=app_share_silent_template" },
        { name: "2 Round fight", preview: "https://www.youtube.com/embed/guc66Nu2UHc", link: "https://www.capcut.com/tv2/ZSmdw6WBj/" },
        { name: "3 Round fight", preview: "https://www.youtube.com/embed/Oz4-SYWAs8U", link: "https://www.capcut.com/tv2/ZSmdwLrs6/" },
        { name: "4 Round fight", preview: "https://www.youtube.com/embed/vLhjhTk03cQ", link: "https://www.capcut.com/tv2/ZSmdwN8D6/" },
        { name: "5 Round fight", preview: "https://www.youtube.com/embed/mBMyrnBBA9Q", link: "https://www.capcut.com/tv2/ZSmdwUFL3/ " },
        { name: "6 Round fight", preview: "https://www.youtube.com/embed/cL1Gn7IfGV8", link: "https://www.capcut.com/tv2/ZSmdw85qA/" },
        { name: "7 Round fight", preview: "https://www.youtube.com/embed/pCru2S232go", link: "https://www.capcut.com/tv2/ZSmdwSm3G/" }
      ]
    },
    // --- BOX 13 So bundao ---
    {
      title: "So bundao",
      description: "Flashy effects with strong beat impact",
      coverImage: "/templates/so.jpg",
      isTrending: false,
      isNew: false,
      variants: [
        { name: "1 So bundao", preview: "https://www.youtube.com/embed/4w9jjSUVZRg", link: "https://www.capcut.com/tv2/ZSmdwkvMS/ " },
        { name: "2 So bundao", preview: "https://www.youtube.com/embed/cwEtVzu2Dhk", link: "https://www.capcut.com/tv2/ZSmdw9UVa/" },
        { name: "3 So bundao", preview: "https://www.youtube.com/embed/q_RI90R2Pn8", link: "https://www.capcut.com/tv2/ZSmdwEuwH/" },
        { name: "4 So bundao", preview: "https://www.youtube.com/embed/ghUirMH0MCU", link: "https://www.capcut.com/tv2/ZSmdwqc43/" },
        { name: "5 So bundao", preview: "https://www.youtube.com/embed/1_M2F576KRQ", link: "https://www.capcut.com/tv2/ZSmdwcPsS/" },
        { name: "6 So bundao", preview: "https://www.youtube.com/embed/afr_rHdTfHY", link: "https://www.capcut.com/tv2/ZSmdwTnUn/" },
        { name: "7 So bundao", preview: "https://www.youtube.com/embed/292Ch9oVEZ8", link: "https://www.capcut.com/tv2/ZSmdwX8T9/" }
      ]
    },
    // --- BOX 14 vece ni mira ---
    {
      title: "vece ni mira",
      description: "Elegant transitions with clean modern style",
      coverImage: "/templates/vece.jpg",
      isTrending: false,
      isNew: false,
      variants: [
        { name: "1 vece ni mira", preview: "https://www.youtube.com/embed/4LT9OIXjC_0", link: "https://www.capcut.com/template-detail/default-tool?enter_from=app_share_silent_template" },
        { name: "2 vece ni mira", preview: "https://www.youtube.com/embed/qwGtkZEk2cU", link: "https://www.capcut.com/template-detail/default-tool?enter_from=app_share_silent_template" },
        { name: "3 vece ni mira", preview: "https://www.youtube.com/embed/bMuSmdwqfQ4", link: "https://www.capcut.com/template-detail/default-tool?enter_from=app_share_silent_template" },
        { name: "4 vece ni mira", preview: "https://www.youtube.com/embed/7YmSc9AwFj4", link: "https://www.capcut.com/template-detail/default-tool?enter_from=app_share_silent_template" },
        { name: "5 vece ni mira", preview: "https://www.youtube.com/embed/O0SW6wMiw0s", link: "https://www.capcut.com/tv2/ZSmdKAMrP/" },
        { name: "6 vece ni mira", preview: "https://www.youtube.com/embed/HE45hdgbyME", link: "https://www.capcut.com/template-detail/default-tool?enter_from=app_share_silent_template" },
        { name: "7 vece ni mira", preview: "https://www.youtube.com/embed/LlIoKrYxKCA", link: "https://www.capcut.com/template-detail/default-tool?enter_from=app_share_silent_template" }
      ]
    },
    // --- BOX 15 Tose Naina ---
    {
      title: "Tose naina",
      description: "Dark theme with cinematic slow motion",
      coverImage: "/templates/tose.jpg",
      isTrending: false,
      isNew: false,
      variants: [
        { name: "tose naina", preview: "https://www.youtube.com/embed/UJCYayJCR30", link: "https://www.capcut.com/tv2/ZSme4JJm7/" }
      ]
    },
    // --- BOX 16 dooron dooron ---
    {
      title: "Dooron Dooron",
      description: "Smooth velocity edit with neon accents",
      coverImage: "/templates/dooron.jpg",
      isTrending: false,
      isNew: false,
      variants: [
        { name: "dooron dooron", preview: "https://www.youtube.com/embed/MmEKRWAKHI4", link: "https://www.capcut.com/tv2/ZSmeXEjSr/" }
      ]
    },
    // --- BOX 17  zaalima---
    {
      title: "zaalima",
      description: "Stylish transitions with soft glowing effect",
      coverImage: "/templates/zaalima.jpg",
      isTrending: false,
      isNew: false,
      variants: [
        { name: "zaalima", preview: "https://www.youtube.com/embed/iJ52w6LskgA", link: "https://www.capcut.com/tv2/ZSme4XTUC/" }
      ]
    },
    // --- BOX 18 udaiyan---
    {
      title: "udaiyan",
      description: "Beat-focused edit with fast visual cuts",
      coverImage: "/templates/udaiyan.jpg",
      isTrending: false,
      isNew: false,
      variants: [
        { name: "udaiyan", preview: "https://www.youtube.com/embed/01k_qAweDqg", link: "https://www.capcut.com/tv2/ZSmeCm5wq/" }
      ]
    },
    // --- Box 19 preety little baby ---
    {
      title: "preety little baby",
      description: "asthetic preety little baby",
      coverImage: "/templates/p.jpg",
      hasVariants: true,
      isTrending: false,
      isNew: false,
      variants: [
        { name: "preety little baby", preview: "https://www.youtube.com/embed/Un2VCFeL6MY", link: "https://www.capcut.com/tv2/ZSmRuHJdE/" }
      ]
    },
    // --- Box 20 cute ---
    {
      title: "cute",
      description: "cute template",
      coverImage: "/templates/cute.jpg",
      hasVariants: true,
      isTrending: false,
      isNew: false,
      variants: [
        { name: "cute", preview: "https://www.youtube.com/embed/YFhwY9I5Uiw", link: "https://www.capcut.com/tv2/ZSmRuB49S/" }
      ]
    },
    //---Box 21 dil dooba---
    {
      title: "dil dooba",
      description: "dil dooba template",
      coverImage: "/templates/dill.jpg",
      hasVariants: false,
      isTrending: false,
      isNew: true,
      variants: [
        { name: "dil dooba", preview: "https://www.youtube.com/embed/DhZo5LvCfeY", link: "https://www.capcut.com/tv2/ZSmRuB49S/" }
      ]
    },
    //---Box 22 zaalima---
    {
      title: "zaalima",
      description: "zaalima template",
      coverImage: "/templates/zaa.jpg",
      hasVariants: false,
      isTrending: true,
      isNew: true,
      variants: [
        { name: "zaalima", preview: "https://www.youtube.com/embed/I2mAM7d5Jpk", link: "https://www.capcut.com/tv2/ZSmRuB49S/" }
      ]
    },
  ];

  // Logic to insert the manual data
  for (const t of manualTemplates) {
    const slug = t.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");

    // Check duplication in case of reruns (though existing check stops it usually)
    const collection = await storage.createCollection({
      title: t.title,
      slug: slug + "-" + Math.random().toString(36).substr(2, 4), // Simple unique slug
      description: t.description,
      coverImage: t.coverImage,
      isTrending: t.isTrending || false,
      isNew: t.isNew || false,
    });

    for (const v of t.variants) {
      await storage.createVariant({
        collectionId: collection.id,
        name: v.name,
        previewVideoUrl: v.preview,
        templateLink: v.link,
      });
    }
  }

  console.log("Seeding complete.");
}

// Ensure the seed function runs automatically when executed directly via `tsx server/seed.ts`
if (process.argv[1] && process.argv[1].endsWith('seed.ts')) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
