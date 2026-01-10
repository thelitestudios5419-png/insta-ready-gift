// src/pages/Letter.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, easeOut } from 'framer-motion';

const LETTERS = {
  "Open when you miss me": `\nKayy ga bala athavan yetiye ka \nMala pn athavn yetiye 🥺 Long Distance madhye asa kiti vela miss karayla lagta na \nMala athavan yayala lagate tevha mi apale tuze photos bghat bsto khup bhari vatta pn bharun pn yeta\nAsa vatta tula atta mala mithit ka gheta yet nahi\nPahilya date cha selfie, nantr cafet madhale selfie apale traditional che photos apan trip che photos he sagala bghun khup bhari vatta\n\nAata jar khup miss vatat asel tar ekdam deep breath ghe ani sobatcha ek virtual hug ghe message bgh ek cute yeil tula 🤭🤭\n🫂 “I’m always here, bas phone madhye 😅!”\nAni mana madhe mhan: “ahe toh mazya sobat nahi kothe janar”\nTula pan thoda shant vatel.\n\nTar baby, until we meet again, miss karayla chalta pan mahit aahe na, jar miss karat aschil tar fakt mala mesage kar sang mala mala tuzi athavn yetiye mala pn khup bhari vatel ki koni tri ahe jo mazi athavan kadhto 🥺. mi always ready ahe tula smile karavayala. 😊💗\n\nLove you beyond screens and kilometers!\nAlways yours,\n❤️💌\n`,
  "Open when you're sad": `\nHey my sunshine,\n\nkaay zala bala ? Man khali vatat ahe ka? 🥺💕 Mi ithech ahe bala, Sad feel honar normal ahe, baby. Life madhe highs ahet, lows pn yetat pan mahit aahe na, tu ekti nahiyes ahes. Mi always tuzya sobat ahe. ❤️\n\nSad ahe tr kahi goshti tu karu shaktes jasaki, jya goshti manat yetat, tyanna chota diary madhe lihun bgh, nahi tr ka sad vattay te mala sang nahi tr, tuzya favorite song aaiktes nahi tr mi je letter lihala ahe smile cha te bgh ughadun \n\nTula mahitey tu hasatana kiti god distes ☺️. Ek athavala atta mala tula mahitey apan ekhadi cute gosht bghto jasaki ekhadya kutracha pillu kiva ekhada lahan sa bal tr aplya dokya madhe veg vegle chemicals tayar hotat ani ekdam joyful ani aanandi vatta he sagale emotional burst houn apan tyala anjarayala gonajrayla bghto 🤭 tasach Kahi tri mala hota tula bghitlya vrti mhanun mi control nahi karu shakat 🤭\n\nTuzya baby face che expressions, tuza hanse khup avdata mala 🥺\n\nSadness hi temporary aahe. Pn mi tuzya sobat permanent asnar ahe \n\nbaby, sad moments madhun emerge stronger and braver. Mi nehmi tuzya varti proud ahe. Rise up, shine on, and know that this too shall pass. \n\nLove you to the moon and back,\nAlways here, always yours,\n💖🫂\n`,
  "Open when you can't sleep": `\nKay zala, baby? Zop yet nahiye ka? Same mala pan yet nahiye! 🤭 Kiti ironic ahe na mhanun tuzya sathi he letter lihtoy.\n\nI know, yaar asa zop yet nasel tar vichar yayla lagtat. “Te nako karayala pahije hota,” mhanun te embarrassing moments sagle athavayla lagatat Even overthinking pn hote. Asa vatta ki parat te jagata ala asta tar tasa nasta kela mi ! 😅\n\nMala pan same vatta 🤭, but you know life is strange. Apan just jasti karun embarrassing moments che vivid athavni lakshat thevto. Pan apan he lakshat thevat nahi ki tyancha peksha chanagle moments kiti anand detat ani te tya embarrassing moments peksha kiti jast ahet ! Mi pan ata tech athavat hoto just mala zop yet nahiye mhanun mi aplya bus madhlya saglya athavani relive karat hoto. ✨\n\nTula mahitey ka, baby? Tu kiti god distes zopet asatana ekdam lahan bala asta na! Tyachya gat… yaar, kasala bhari time gela hota! 🥺\n\nMi ratra bhar tuzya kade baghat ghalvala, tari pan mala kami padala asa vatala. Apan doghe almost drunk aslya gat vagat hoto, zop alyamule ekmekana dokha tekun sagla bolat hoto. 😵‍💫\n\nTya saglya madhe mazi favorite moment athvatiye 🙈, jevha tu mhanalis, “baby vass yet ahe tuzya tondacha.” Mi side la jaun swash aat baher kela, tond pusut hoto… ani tevha tu donhi hatane mazya gaal dharales ani javal ghetlas ani mhanalis , “Asude re.” 🥹 I don’t know, mala khup bhari vatala hota. 🙈\n\nZop lagat naste tevha vait moments athvun overthinking karnya peksha, ashya sweet moments athavlya ki kiti bhari vatta bagh! ☺️ I know hard time chalu asel, maybe stress madhe asachil. Maybe jevha tu he open karashil tevha tu baher kothe tri aschil mi javal nasen tevha. 🥺 But you know, mi he kothe tri aikala hota ki aplyala athvan jyachi yete jo aplyala javalacha vatto 🥺\n\nMazi athavan jar yet asel tar mi tar jinkalo ahe! 🤭\n\nMi asa bolatch rahin khup bolat rahin 🤭, so baby, just relax yourself. Dole zaak aple changale moments athav. Swash var concentrate kar; breath in and breath out manually. Swash ghet ahes na ata? 🤭🤭 Asach swasha kade laksha deun body relax karun, zop dokyat kahi bhalate vichar aanu nako. Shant zop bala 🫂.\n\nUdya chi suruvat khup bhari karaychiye ha vichar kar!\n\nByee, baby 🫂💗\nSweet dreams ❤️💕 and take care, bachha 💕❤️\nalways know that i love you soo much 🙈💕🫂💗💋.\n...`,
  "Open when you want to smile": `\nHey my love! 🥰\n\nSmile karaycha ahe tula? Mag he vach! 🤭\n\nMala mahit ahe, kadhi kadhi divas thoda boring jato kiva ugach thoda 'low' vatayla lagta, ani tula vatta ki konitari pahije tula hasvayla. Tar baby, ha letter vachun tu ekdam 32 chya 32 daat(teeth) dakhvun hasnar ahes, mazi guarantee ahe! 😁✨\n\nAthavtay tula? Apali ti first date chi bus ride... 😂 Kiti vedya sarkha karat hoto apan! Tu adhi ja, mi nantr yeto, konala kalnar nahi... jashi kai apan mothi 'secret mission' var janar hoto! 🕵️‍♂️🕵️‍♀️ Ani te manapa la jaychya confusing bus, apan eka bus madhun utrun dusrya bus chi vaat baghat hoto vakad phatya varti, ani tyat hi tu kiti nervous hotis! 🥹 Tuzya tya expressions kade baghun ata vichar kela tari smile yete.\n\nAni ho, te kase visru shakto aplya last year chya trip chi last night chya bus ride madhe tu bollis "Baby, vass yet ahe tuzya tondacha!" 🤣 🙊 Deva! Mi kiti embarrassed zalo hoto, side la jaun swash check karat hoto... ani tu kiti cutely maze gaal dharun mhanalis, "Asude re." 🥹❤️ To kshan athavla na ki mala ajun hi khup 'special' ani 'funny' vatata. you are so special to me yaar 🥺🥺, mhanun tar tu mala itki avadtes!\n\nTula mahit ahe? Jevha tu hasates na, tevha jagatli sagli tension kuthe dur ch hota kalatch nahi. Tu hasatana ekdam lahan 'bachha' distes. 🧸✨ Tech hasu mala tuzya chehryavar nehmi pahaychay.\n\nJar ata smile ali asel, tar ek selfie kadh ani mala pathav bar! 🤳 Mala pan bghu de mazi 'princess' kiti bhari distiye hasatana.\n\nSmile karat raha, karan tu hasli ki maza full divas banun jato. Always remember, mi tula kadhi hi radu denar nahi (ani jar radlis, tar tula hasvaychi jababdari mazi!)\n\nKeep smiling, my sunshine! ☀️🥰 Love you to the moon and back! 🌙💞\n\nAlways yours, Tuzach veda baby! 🤪❤️\n`,
  "Open on our 1st year anniversary": `\nOne year complete zala... 🥺\n\nDamn yaar, khup motha time ahe na 1 year! But aplya sathi ekdam chatkan gela na? 😭✨\nWe created so many memories from the silly ones to the truly unforgettable ones. 💭❤️\n\nYa varsha madhe khup bhandlo, khup rusalo, phugalo pan... tu kadhi hi mazi sath sodli nahi. 🥹\nI am genuinely so grateful for that.\n\nMala kharach asa vatta ki mazya sobat rahun tula khup trass hot asel. 😔\nMi khup hyper vagto, khup dhandrat ahe, over emotional ahe, khup possessive pan ahe...\nAni ya saglyacha trass tula hot asel ha vichar ala ki asa vatta,\n"Tu mazya shivay changli rahshil ka?"\nHa vichar satat yeto... but tu kadhi hi mazi sath sodli nahi 🥺\n\nAsa kay ahe ga mazya madhye? Sang na 🥺\n\nOkay enough emotional stuff... \nApan khup bhari bhari memories banvlya na! 😍\nApali first date – Parvati, Saras Baug, ani Karad madhli pahili date! 🏞️💑\n\nFirst date mhanje magic moments madhe ✨\nPan life full circle karte bgh jithe Karad madhye first time date la gelo, tithech apan first kiss kela...\nTe pan ekdam unexpected hota! 🙈💋\n\nCollege madhe apla lapun chapun kelela prem!, ekmekancha haath dharna konachya nakalat baryach goshti karana 🙈❤️\nBhari divas gele college madhe apale… but i wish ajun thoda time milala asta 🥺\n\nHe varsha kharach khup special gela maza. \nI don’t know, mazya sobat ch asa hotay ka... pan tula bhetlyavar,\nadlichya saglya athavani vanish zalya... ekdam!\n\nDokyat fkt tu ani aple kshan yetat. 💭💖\n\nMi kharach regret nahi karat ki mi tula propose kela...\nYou are the best thing that ever, ever happened to me. 🥹❤️\n\nWords madhe truly express nahi karu shakto...\nBut mi try karto\n\nतु जशी गारट्याच्या वातावरणातली कोवळी किरणं,\nतु जशी तापत्या उन्हात झाडाची सावली.\n\nतुला पाहून मनामध्ये फुलपाखरं उडतात,\nतुला पाहताच माझे शब्दच कमी पडतात.\n\nकशी व्यक्त करू मनातली ही हुरहुर,\nभीतीच वाटते, जरी गेलीस तू थोडीशी दूर.\n\nजवळ असलीस की दरवळतो तुझा सुगंध,\nसुवासाने मंत्रमुग्ध होतो माझा जीव अखंड.\n\nअजून लिहिता आलं बरच काही, \nपण मी काही मोठा लेखक नाही,\n\nतुझ्यासाठी प्रेम व्यक्त करताना शब्द अडतात,\nपण हृदयातले प्रेमदिवे अनावरत जळतात.\n\n I love you beyond words. 💌💗\nHappy 1 year baby! 🥂💘\nLet’s create many more years of crazy, beautiful, love-filled memories together. 💑✨\n`,
  "Open on your birthday": `\nHey Baby,\n\nHappy, happy birthday to the most amazing person in my life! 🥳🎈 Aaj tujhya special divas ahe jara divas vegalach shine kartoy na  just like you always light up my world. ✨\n\nI wish tula hug karta ala asta khup tight madhe 🥺 But distance madhe yetoy na aplya madhe 🥲 pn tari jevha tu he letter open karashil, tula janvel mi tuzya sobat ahe\n\nHope aajchya divashi mi kahi complaints kelya and instead saglyach changlya moments che memories athavat astil. 🎁🥹\n\nEk karshil mazya sathi : pastry kiva cake aan, candles blow kar, ani ek wish mag tuzya sathi. mi may be lamb asen 🥺 asa vatel atleast ki tuza cake cut karta ala\n\n“You deserve every bit of magic in the world.” 🌟\n\nMi asech pray karto ki ya navya varshi\nSaglyat motha dream tuza fulfill vhava\nHealth, happiness, ani peace fill rahava ❤️🧘\n\nmi tujya sobat ahe, in day and night or in rain or shine. 🌧️☀️ Mi kadhi tuzi sath sodnar nahi, tuzya comfort ani support sathi nehmi tayar aahe.\n\nLove you more than all the stars in the sky, my birthday queen! 🌌👑\n`,
  "Open when you get a job": `\nCongratulations, babyyyy! 🥳🥳🥳🥳🥳🥳🥳🥳 \nFinallyyyy, job milala! I am sooooo sooo happy for you! 🥹🥹🥹\nKevadhe struggle karava lagala na? But at the end, sagala worth it vatat asel na? 😌 Shant vatat asel na ata  all of that crying, overthinking, struggle sagala worth it vatat asel. Pan aplyala ithe thambayacha nahiye.\nTuch mhantes na “mala khup paise kamavayache ahet”  we have to walk on a long road, ashyach motivation ani jiddi ne ajun motha palla paar padayacha aplyala. 💪 Ani ho, tuzya dream tu mage sodayacha nahiye. Ata time ahe bagh aplyala acting career madhe try karayacha  mi ahe tuzya sobat ya saglya madhe. Tu fakta tuzya var bharosa thev, sagla possible ahe tuzya sathi  💫 . Shevti Baby konachi ahe😁😁\nAni ho, now let’s talk about something 😁: Firstly, ata job lagalay tar saving karayala suruvat kar. Ani ho, mi paise khup kharch karto, you know that 🤧 Mala dhamki ghalun saving karayala sang.\nAplyala international trips karayche ahet ata. First trip konti karaychi? 🤔 Brr, te tharvuya apan nantr. Ani ho, maybe from one year of now, apan ekatra move in karu shakto kay vichar ahe. 🫣\nAplyala ajun khup pudhe jaychay, baby. Asach kaam karat raha, yaach jiddi ne sagla karat raha. 💪\nTula je pahije, tula te ek na ek divas nakki achieve hoil, I know that. 🥹🥹\n`,
  "Open when you’re feeling down": `\nHey jaan,\nKaay zala? Kahi vel asa yeto jya veli khup low vatta \nPehla tar ek deep breath ghe inhale… exhale… inhale… exhale...🌬️ Tar thoda shant vatel. \nMi nehmi ithe tuzya sobat ahe even phone madhun pan\n\Tuzya mind madhe negative thoughts cha vadal chaltay, na? Pan ek gosht lakshat ghe: “ sunshine isn't that far it just behind the clouds.” 🌤️\n\nJar tu tired aschil tar fakt ek kar pause ghe jara shant ho he Sagala je challay te yevdha matter nahi karat asa vichar kr aplya jiva peksha kahich jast mahatvacha nasta \n\nAthav na tya divshi apni Parvti la gelo hota? Tithlya shant vatavaran ani chimnya nchya aavajane ne kiti bhari vattat hota na same idea apply kar! Window kade ja, thoda fresh air ghe, ek glass Pani pan ghe. Ani window javal ubhi rahun pani pi khup shant vatel \n\nLakshat thev tu khup strong ahes tu he sagala handle karu shaktes\n\nAnd remember, it’s okay to feel down he feelings temporary ahet. maza promise ahe jar kahi zale tar phone kar, mi tuzya sobat present rahin. Together we’ll laugh, cry, plan, or fkt silent rahu🤝\n\nLove you more than words,\nAlways yours,\n❤️🫂\n`,
  "Open when you want to relive My favorite memories": `\nHey baby,\n\nMemories relive karayche ahet? Chala mag, flash back madhye jauya! ✨ Jevha mi aplya don varshancha vichar karto, tevha khup goshti samor yetat, pan kahi moments ashet na je mazya manat 'permanently' save jale ahet. 🧠💖\n\nSaglyat pahila mhanje apali First Date! 😂 Athav na, te bus sathi kelele tikdam. "Tu adhi ja, mi nantr yeto" apan kiti lapun chapun karat hoto sagala. Te Manapa chya bus chi vaat baghna, chukichya bus madhye chadhna, ani mag Vakad Phatya var utarna... kiti chaos hota na! 🚌 Tithe apan separate baslo hoto, pan maza dhyan fkt tuzya kadech hota. Ani ti bad Misal! 🍲 Doghana hi avadli nahi, pan tari hi ekmekan sobat aslyamule ti special vatali. Parvati chya tya paythya chadhtana tu thakali hotis, pan varti gelyavar jo view hota to view ani tu sobat, damn! \n\nNantr mazi 'all-time' favorite memory The "Asude Re" moment. 🥹🙈 Ti ratra, apan doghe zopet drunk aslya sarkhe bolat hoto bus madhe. Jevha mi side la houn tondacha vaas check karat hoto karan tula vass yet hota, tevha tu mazya galavar haath thevun mhanalis, "Asude re." ❤️ To ek 'simple' sentence hota, pan tyat kiti prem hota na! Tevha mala samajla ki tu mala 'as I am' accept kelays.\n\nAni te College che divas! 🏫 Lapun chapun ekmekancha haath dharna, te 'secret' glances... yaar i miss those days! 😉 Mag applya karad madhlya numerous dates, ani to First Kiss... 💋 sagla ekdam filmy aslya sarkha vatata ata🎬 vichar kela tar. apan kiti tri dates var gelo asu na karad madhe even if aplyala bhiti hoti koni tri bghel aplyala..🥺 tula mahitey na last sem madhe may be apan kay tr 1 month bhetalo nhvato cafes madhe.. ani mala khup craving hot hoti yaar tula hug karaychi, tula javal ghyaychi. apan mag tya last chya lab madhe hug karyacha tharavala... but yaar I don't know kayy zala yaar me kharach tharavala hota just hug karaycha but kasa kay mi kiss kela tula mala kharach kalal nahi yaar..🥹 mi kiti shiver karat hoto it was like my body was sensing something new mazya heartbeats khup jor jorat jayala laglya..\n\nI know mazya memories khup weak ahet 😅 but tuzya sobat ghalavlele kshan mala khup bhari vatatat \napale punya madhale te 2 3 months they are cherry on top 🥹🥹 I wish tasa aplyala parat ajun ekda rahata ala asta even khup restrictions hotya pn apan khup enjoy kela.. park madhe basana, punya la gadi varun phirana, ani apli punya chi last trip athavtay kiti vegala divas vatat hota toh.. apan pahila FS la gelo tithun dagadu seth nantr FC road and that Z bridge yaar.. time jasa jasa jaat hota I was craving more yaar.. I want to leave that moment again yaar..🥺🥺\n\nTu dilela te Wallet 🎁 maza pahila gift! Mi ajun hi te khup japun thevlay. Te wallet fkt ek vastu nahiye mazyasathi, tyat aplya tya divasachya saglya athavani ahet.\n\nHe tar fkt suruvat ahe, aplyala ajun khup memories banvaychyat aplya flat madhye, international trips var, ani aplya swapnatlya gharat! 🏡✈️\n\najun khup kahi lihaychay pn he khup motha zala ahe 😬 idk ya madhala kiti vachshil tu\n\nAta he vachun smile ali asel tar, dolyasamor te divas aan ani ek 'virtual hug' ghe mazyakadun! 🫂😘\n\nI love you more than all these memories combined! ❤️✨\n\nAlways yours, Tuzach bachha! 💋💌\n`,
  "Open when you’re thinking about our first date": `\nApali first date khup bhari zali hoti na! 🤭\n\nPahilyach date la apan Pune darshan ghyayla gelo hoto. Seatbelt ghal bachha, apan aplya first date chi ride gheuya. 😁\n\nAthavtay na, apan kevdhe tikadam lavale hote? Tu adhi ja, mi nantr jate, mhanje porina kalnar nahi, vagere... Nantr apan bus sathi thamblo. Almost ardha ek tas apan vaat baghat hoto “Manapa chi bus atta yeil, nantr yeil”. Mag ek kaka ale ani te bolle, “Hi bus dhara, ithun Tya stand varun  Manapa milel.” tya kaka cha aikun apan chadlo ani conductor la vicharlo, “Manapa chi bus milel ka tya stop varun?” Tar te nahi bolle. Mag apan vakad phatya var utaralo. Tithe mag Manapa chya bus chi vaat baghat thamblo. Tevha bus pan ali lavkar.\nTu kevdhi nervous hotis, khar mala ajun athavatay! 🥹 Nantr apan Manapa chi bus madhe baslo. Tithe tula gents chya side la basavla 😂, karan te barobar vatala nasta. Mi basloy, tu ubhi ahes mhanun tevha tula basavla hota. Mag apan Manapa stand var utaralo, parat tya bridge var gelo. Tithe bus dharali, tithe pan apan separate baslo hoto karan tu ladies seat var hotis ani maybe mi ubha hotoy, kadachit. Athav na? 😉\n\nNantr mag apan utaralo. Tevha first time road cross karatana tuza hath dharala mi 🥹, damn yaar that feeling🥰. Mi kasa tharavala hota ki Swargate varun aplyala Parvathi paythaychi bus milel, pan tithe bus ch nhavti. Tula almost ek–don kilometre mi chalvala. Tyat aplya doghana bhuk lagli hoti, mag ti misal khalli. tyat pan tula ani mala ti avdli nahi. 😕\n\nNantr apan var chadayala laglo Parvathi varti. kiti thakalo hota doghe pan! 😂 Varti jaun apan te mandir baghitla ani te Peshwa kalin museum ek baghitla. View athvatoy tula apan ekdam var pochalo hoto, kasala bhari hota yaar ! Mala ajun te athvatay, kevdha bhari disat hota sagala. Tyat ani tu sobat aslya mhanun te ajun ch bhari vatat hota 😁. Mag apan sagala phirat phirat eka thikani baslo hoto bag bolat tu tuzya dance, speech competitions baddal sagala sangat hotis. \nParat khali alo, apan tula ajun ek kilometre chalavala mi 😅. Mag saras baget gelo yaar, kasala bhari vatat hota! Apan tithlya bagetlya bench var basun bolat ahot ani time kadhi gela kalalach nahi na? ⏳ Tu mala tithhe pahilyanda ek gift ghetlas maza pahila gift! 🎁 Mala wallet konihi kadhi gift nahi kela, mala khara, tevha kasa react karu kalal nahi. Pan ata te athvun khup bhari vatat ahe.\n\nMag apan Particha cha pravasa suru kela. Tu chalun chalun khara thakali hotis, mi pan yedya sarkha tula hikdun tikda phirvat hotoy. 😅\n\nPan kay bhari divas gela yaar! I wish toch divas parat jagata ala asta tar kevdha bhari zala asta! 🥹🥹\n\nApalya pahilya date che photos he bagh. 🥹\n`,
  "Open when you’re Crying": `\nBala radat ahes ka . Kaay zala? Kiti pan kahi pn dukha yeil relationship madhe, work madhe, life madhe ek gosht lakshat thev tu ekti nahiyes. 💖\n\nBala asa vichar kar na ki mi tula javal ghetala ahe. Tula ghatta mithi marali ahe 🥺 tula tyach hug madhe kuravalat ahe, tuze dole pusun tuzya forehead var kiss kartoy . comforting vattay na ? Bala mag shant ho na radu nakos aga\n\nRemember, tears pan healing che paani ahe ek ek drop jar tula relief det asel tr rad. Pan radlya nantr, thoda vel swash ghe shant vatude sagala \n\nMi tr tuzya peksha khup emotional ahe. Tula pn mahitey 🤭 jasa mi sagala tuzya pashi sangun mokala hoto, tasa tu pn mala sang sagala bala. mi ready ahe kadhi pn sagala aaikayala \n\nMi tujhyasathi pray karteo tu lavkar upbeat feel karshil. Ik dark nights yetat pn tuch ekda mhanali hotis mala bgh ki chotya chotya steps takat rahilo tr ujed ek divshi nakkich yeil \n\nSo baby dont cry everything gonna be okay 🫂🫂 apan ahot  na ektra sagala thik hoil 🫂🫂\n`,
  "Open when we’ve had a fight": `\nYaar apan parat bhandlo ka 🥺\n\nI am really sorry yaar 😔.... I know tula ani mala bhandaycha nasta pn situations ashya create hotyat ki bhandna hotat yaa madhe na tuzi chuki ahe na mazi. \n\nWe just wanted to love each other unconditionally. \n\nTyat prema madhe bhandna hotat. I know raga raga madhe apan ekmekana kahi goshti bolun jato je apan mean pn nahi karat. But, apan yevdhe angry asto tya mule kalat ch nahi apan kayy bolat ahe. But later on aplyala realise hota apan he bolayala nako hota. \n\nApan each and every word regret karto je raga raga madhe bolto 🥺\n\nTula athvatay mi ekda bollo hoto ki bhau mala mhanala hota ki bhandana zali ki ego side thevun bolaycha. I know khup childish vatala hota tyachya kadun aaikala tevha. But in reality eka arthi khara bolla toh. Kiti hi mothi bhandana zalit tri apan ch bolun sort kele pahijet \n\nSilent treatment deun ekmekanchya mana madhe nako te thoughts anya peksha bollela chnagala na \n\nAni apala prem kontya pn bhandana peksha khup motha ahe 💗\n\nKontihi bhandana aplya relationship loose karnya chya worth cha nahiye \n\nI know mi may be jast overreact zalo asen kiva kahi tri chuk keli asel pn, pn bala mala nit samjavun sang na, shant man thevun mana pasun sagala samjavun sang na, tuza he chuktay tu asa nako karus. Mi nakkich aaikun ghein ga\n\nAni bhandana chi ek gosht chanagali aste khar bhandana zalit ki apala prem parat khup vadhata 🤭 tech prem vadhaycha asel tr apan reset button dabuya 🥺 parat ahe tasa sagala nit karuyat na.\n\nAlways know that bachha maza khup prem ahe tuzya varti khup mhanje khup prem ahe 🥺\n`,
  "Open on our 2nd year anniversary": `\nDamn, yaar 2 varsha zale aplyala! 🎉🥂\n\nKase gele ga he don varsh? Mostly long-distance madhye, kiti vel ekmekana screen var baghun kadhala asel na. 🤭\n\nAni ho, job pn lagale astil na aplyala doghana khup struggle kela asel na yaar , pan tuzya auditions cha kai challay? Try karaycha apan mi tar full support kartoy na tula?\n\nApan sobat ahot na ga ka apala breakup zalay, nahi vhyaycha 🤭 mi tula asa sodnar ahe hoyy tula trass dyayala koni tri pahije na , baby? 😘\n\nYa 2 varshat khup ups and downs aale astil, arguments over silly things 😅, pan saglya madhe tu kadhi hi mala sodal nahi. 🥹 Javal aso ki dur, tu mazya sobat ahes ha trust ani commitment apan tashich thevli ahe 💪❤️\n\nZala nasel tri aplyala  doghe jithe ahot, apalyala swapn complete Karayche ahet. 🌍✈️ International trips, weekend getaways, ani te ekatra flat move-in pan! cozy little home decorate karnar lights, paintings, ani aplya photos hung karnar. 🖼️✨ He sagala mala tuzya sobat experience karaychay\n\nAaj jevha he open karashil, taar 2 years complete zali astil khup motha time asto\n\nSweetheart, aplyala ajun khup pudhe jaychay Tu fakta tuzya var bharosa thev, mi ahe tuzya sobat  always and forever. 💫\n\nHappy 2nd Anniversary, my love! 🥰💞\n\nLove you to the moon and back! 🌙💕\n`,
};

// Robust TypingText   uses setTimeout and checks each character before appending.
function TypingText({ text = '', speed = 30 }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed(''); // reset when `text` changes

    // keep only a real string (avoid String(undefined) -> "undefined")
    const safeText = typeof text === 'string' ? text : '';
    if (safeText.length === 0) return;

    const chars = safeText.split('');
    let i = 0;
    let cancelled = false;
    let timerId = null;

    const tick = () => {
      if (cancelled) return;
      // guard against out-of-bounds or undefined char
      const ch = chars[i];
      if (typeof ch === 'undefined') {
        return; // stop silently
      }
      setDisplayed((prev) => prev + ch);
      i += 1;
      if (i < chars.length) {
        timerId = setTimeout(tick, speed);
      }
    };

    // start typing after a tiny delay (or 0)
    timerId = setTimeout(tick, speed);

    return () => {
      cancelled = true;
      if (timerId) clearTimeout(timerId);
    };
  }, [text, speed]);

  return <pre className="whitespace-pre-wrap text-left">{displayed}</pre>;
}

export default function Letter() {
  const { scenario } = useParams();

  // sanitize scenario: avoid literal "undefined" and non-strings
  let decodedScenario = '';
  if (typeof scenario === 'string' && scenario.length > 0 && scenario !== 'undefined') {
    try {
      decodedScenario = decodeURIComponent(scenario);
      if (decodedScenario === 'undefined') decodedScenario = '';
    } catch (e) {
      // if decode fails, fall back to raw scenario if safe
      decodedScenario = scenario === 'undefined' ? '' : scenario;
    }
  }

  // matching by normalized keys
  const normalizedScenario = decodedScenario.trim().toLowerCase();
  const matchingKey = Object.keys(LETTERS).find(
    (key) => key.trim().toLowerCase() === normalizedScenario
  );

  // ensure letterText is a string (avoid converting undefined -> "undefined")
  const letterText = matchingKey && typeof LETTERS[matchingKey] === 'string'
    ? LETTERS[matchingKey]
    : `\narre kayy tri zala letter la 😢😰\n`;

  // framer-motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: 'beforeChildren', staggerChildren: 0.15 },
    },
  };

  const headingVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-deep-rose-600 to-deep-rose-400 px-4 py-12">
      <AnimatePresence>
        <motion.div
          className="flex flex-col items-center w-full max-w-lg"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.h1
            variants={headingVariants}
            className="text-2xl sm:text-3xl font-bold tracking-wide text-soft-pink-400 mb-4 text-center"
          >
            {decodedScenario || 'Letter'}
          </motion.h1>

          <motion.div
            layout
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{
              layout: {
                type: "spring",
                stiffness: 90,
                damping: 26,
                mass: 0.8
              },
            }}
            className="bg-white rounded-3xl shadow-[0_12px_30px_rgba(0,0,0,0.25)] pt-3 px-6 pb-6 w-full text-deep-rose-500 text-[13px] leading-5 font-mono"
          >
            <TypingText text={letterText} speed={20} />
          </motion.div>


          <motion.div variants={headingVariants} className="mt-6">
            <Link to="/open-when" className="text-soft-pink-100 underline hover:text-deep-rose-300 text-base">
              ← Back to Letters
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
